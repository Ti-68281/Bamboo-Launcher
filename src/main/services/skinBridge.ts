import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import AdmZip from 'adm-zip'
import type { AppStore } from '../store'
import { downloadFile, ensureDir, exists, fetchJson, sha256 } from '../utils'

interface LocalProfile {
  uuid: string
  name: string
  skinPath: string
  model: 'classic' | 'slim'
  accessToken: string
}

interface SkinBridgeSession {
  jar: string
  server: string
  accessToken: string
  uuid: string
  name: string
}

interface AuthlibArtifact {
  version: string
  download_url: string
  checksums?: { sha256?: string }
}

export class SkinBridgeService {
  private server: http.Server | null = null
  private port = 0
  private tokenToProfile = new Map<string, LocalProfile>()
  private uuidToProfile = new Map<string, LocalProfile>()
  private keyPem: string | null = null
  private publicKeyPem: string | null = null
  private downloading: Promise<string> | null = null

  constructor(private store: AppStore) {}

  get running(): boolean {
    return Boolean(this.server)
  }

  private get keyPath(): string {
    return path.join(this.store.paths.runtime, 'skin-bridge-key.pem')
  }

  async ensureAuthlibInjector(): Promise<string> {
    if (await exists(this.store.paths.authlib)) {
      try {
        const stat = await fs.stat(this.store.paths.authlib)
        if (stat.isDirectory()) {
          // Older builds accidentally created a directory at this path.
          await fs.rm(this.store.paths.authlib, { recursive: true, force: true })
        } else {
          const zip = new AdmZip(this.store.paths.authlib)
          if (zip.getEntries().some((e) => e.entryName === 'META-INF/MANIFEST.MF')) {
            return this.store.paths.authlib
          }
        }
      } catch {
        // Corrupted cache will be replaced.
      }
    }
    if (this.downloading) return this.downloading
    this.downloading = (async () => {
      const metadataUrls = [
        'https://authlib-injector.yushi.moe/artifact/latest.json',
        'https://bmclapi2.bangbang93.com/mirrors/authlib-injector/artifact/latest.json',
      ]
      let artifact: AuthlibArtifact | null = null
      let lastError: unknown
      for (const url of metadataUrls) {
        try {
          artifact = await fetchJson<AuthlibArtifact>(url, { timeoutMs: 20000 })
          if (artifact?.download_url) break
        } catch (error) {
          lastError = error
        }
      }
      if (!artifact?.download_url) {
        throw new Error(`无法获取 authlib-injector：${String(lastError ?? '网络错误')}`)
      }
      await ensureDir(path.dirname(this.store.paths.authlib))
      await downloadFile(artifact.download_url, this.store.paths.authlib, {
        timeoutMs: 120000,
      })
      return this.store.paths.authlib
    })().finally(() => {
      this.downloading = null
    })
    return this.downloading
  }

  private async ensureKeyPair(): Promise<void> {
    if (this.keyPem && this.publicKeyPem) return
    await ensureDir(this.store.paths.runtime)
    let pem: string
    try {
      pem = await fs.readFile(this.keyPath, 'utf8')
      if (!pem.includes('PRIVATE KEY')) throw new Error('invalid key')
    } catch {
      const pair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      })
      pem = pair.privateKey
      await fs.writeFile(this.keyPath, pem, { mode: 0o600 })
    }
    this.keyPem = pem
    this.publicKeyPem = crypto.createPublicKey(pem).export({ type: 'spki', format: 'pem' }).toString()
  }

  private signTextures(profile: LocalProfile): { value: string; signature: string } {
    const textureHash = crypto.createHash('sha256').update(profile.uuid + profile.skinPath).digest('hex')
    const payload = {
      timestamp: Date.now(),
      profileId: profile.uuid.replace(/-/g, ''),
      profileName: profile.name,
      textures: {
        SKIN: {
          url: `http://127.0.0.1:${this.port}/textures/${textureHash}.png`,
          metadata: profile.model === 'slim' ? { model: 'slim' } : {},
        },
      },
    }
    const value = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64')
    const signature = crypto.sign('RSA-SHA1', Buffer.from(value, 'utf8'), this.keyPem!).toString('base64')
    return { value, signature }
  }

  private profileBody(profile: LocalProfile, includeProperties = true) {
    const textures = includeProperties ? this.signTextures(profile) : null
    const properties = textures
      ? [
          {
            name: 'textures',
            value: textures.value,
            signature: textures.signature,
          },
          { name: 'uploadableTextures', value: 'skin' },
        ]
      : []
    return {
      id: profile.uuid.replace(/-/g, ''),
      name: profile.name,
      properties,
    }
  }

  async startForAccount(input: {
    accountId: string
    uuid: string
    name: string
    skinPath: string
    model: 'classic' | 'slim'
  }): Promise<SkinBridgeSession> {
    const jar = await this.ensureAuthlibInjector()
    await this.ensureKeyPair()
    if (!this.server) await this.startServer()
    const existing = this.uuidToProfile.get(input.uuid.replace(/-/g, '').toLowerCase())
    const accessToken = existing?.accessToken ?? `bamboo-local-${crypto.randomUUID()}`
    const profile: LocalProfile = {
      uuid: input.uuid,
      name: input.name,
      skinPath: input.skinPath,
      model: input.model,
      accessToken,
    }
    this.tokenToProfile.set(accessToken, profile)
    this.uuidToProfile.set(input.uuid.replace(/-/g, '').toLowerCase(), profile)
    return {
      jar,
      server: `http://127.0.0.1:${this.port}`,
      accessToken,
      uuid: input.uuid,
      name: input.name,
    }
  }

  private async startServer(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const server = http.createServer((req, res) => {
        void this.handle(req, res).catch((error) => {
          this.writeJson(res, 500, {
            error: 'InternalServerError',
            errorMessage: String(error),
          })
        })
      })
      server.on('error', reject)
      server.listen(0, '127.0.0.1', () => {
        const address = server.address()
        if (!address || typeof address === 'string') {
          reject(new Error('皮肤桥接服务启动失败'))
          return
        }
        this.port = address.port
        this.server = server
        resolve()
      })
    })
  }

  private readBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      let size = 0
      req.on('data', (chunk: Buffer) => {
        size += chunk.length
        if (size > 1024 * 1024) {
          reject(new Error('Request too large'))
          req.destroy()
          return
        }
        chunks.push(chunk)
      })
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      req.on('error', reject)
    })
  }

  private writeJson(res: ServerResponse, status: number, body: unknown): void {
    const text = JSON.stringify(body)
    res.writeHead(status, {
      'content-type': 'application/json; charset=utf-8',
      'content-length': Buffer.byteLength(text),
      'cache-control': 'no-store',
    })
    res.end(text)
  }

  private noContent(res: ServerResponse): void {
    res.writeHead(204, { 'cache-control': 'no-store' })
    res.end()
  }

  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const host = req.headers.host ?? `127.0.0.1:${this.port}`
    const url = new URL(req.url ?? '/', `http://${host}`)
    const pathname = decodeURIComponent(url.pathname)

    if (req.method === 'GET' && pathname === '/') {
      this.writeJson(res, 200, {
        meta: {
          serverName: 'Bamboo Local Skin Bridge',
          implementationName: 'Bamboo Launcher',
          implementationVersion: '1.0.0',
          links: { homepage: 'https://github.com/' },
          feature: { non_email_login: false },
        },
        skinDomains: ['*'],
        signaturePublickey: this.publicKeyPem,
      })
      return
    }

    if (req.method === 'GET' && pathname.startsWith('/textures/')) {
      const profile = Array.from(this.uuidToProfile.values()).find((p) => {
        const hash = crypto.createHash('sha256').update(p.uuid + p.skinPath).digest('hex')
        return pathname === `/textures/${hash}.png`
      })
      if (!profile) {
        res.writeHead(404)
        res.end()
        return
      }
      const data = await fs.readFile(profile.skinPath)
      res.writeHead(200, {
        'content-type': 'image/png',
        'content-length': data.length,
        'cache-control': 'public, max-age=600',
      })
      res.end(data)
      return
    }

    if (req.method === 'GET' && pathname.startsWith('/skins/MinecraftSkins/')) {
      const username = decodeURIComponent(pathname.slice('/skins/MinecraftSkins/'.length)).replace(/\.png$/i, '')
      const profile = Array.from(this.uuidToProfile.values()).find(
        (p) => p.name.toLowerCase() === username.toLowerCase(),
      )
      if (!profile) {
        res.writeHead(404)
        res.end()
        return
      }
      const data = await fs.readFile(profile.skinPath)
      res.writeHead(200, { 'content-type': 'image/png', 'content-length': data.length })
      res.end(data)
      return
    }

    if (req.method === 'POST' && pathname === '/authserver/authenticate') {
      const body = JSON.parse((await this.readBody(req)) || '{}') as {
        clientToken?: string
        username?: string
      }
      const name = body.username || this.uuidToProfile.values().next().value?.name || 'BambooPlayer'
      const profile =
        Array.from(this.uuidToProfile.values()).find((p) => p.name === name) ??
        Array.from(this.uuidToProfile.values())[0]
      if (!profile) {
        this.writeJson(res, 403, {
          error: 'ForbiddenOperationException',
          errorMessage: 'No local profile registered.',
        })
        return
      }
      this.writeJson(res, 200, {
        accessToken: profile.accessToken,
        clientToken: body.clientToken || crypto.randomUUID().replace(/-/g, ''),
        availableProfiles: [
          { id: profile.uuid.replace(/-/g, ''), name: profile.name, properties: [] },
        ],
        selectedProfile: { id: profile.uuid.replace(/-/g, ''), name: profile.name, properties: [] },
        user: { id: sha256(profile.name).slice(0, 32), properties: [] },
      })
      return
    }

    if (req.method === 'POST' && pathname === '/authserver/refresh') {
      const body = JSON.parse((await this.readBody(req)) || '{}') as { accessToken?: string }
      const profile = body.accessToken ? this.tokenToProfile.get(body.accessToken) : undefined
      if (!profile) {
        this.writeJson(res, 403, {
          error: 'ForbiddenOperationException',
          errorMessage: 'Invalid token.',
        })
        return
      }
      this.writeJson(res, 200, {
        accessToken: profile.accessToken,
        clientToken: crypto.randomUUID().replace(/-/g, ''),
        selectedProfile: { id: profile.uuid.replace(/-/g, ''), name: profile.name, properties: [] },
        user: { id: sha256(profile.name).slice(0, 32), properties: [] },
      })
      return
    }

    if (req.method === 'POST' && pathname === '/authserver/validate') {
      this.noContent(res)
      return
    }

    if (req.method === 'POST' && pathname === '/authserver/invalidate') {
      this.noContent(res)
      return
    }

    if (req.method === 'POST' && pathname === '/sessionserver/session/minecraft/join') {
      this.noContent(res)
      return
    }

    if (
      req.method === 'GET' &&
      (pathname.startsWith('/sessionserver/session/minecraft/profile/') ||
        pathname.startsWith('/session/minecraft/profile/'))
    ) {
      const uuid = pathname.split('/').pop()?.replace(/-/g, '').toLowerCase() ?? ''
      const profile = this.uuidToProfile.get(uuid)
      if (!profile) {
        this.noContent(res)
        return
      }
      this.writeJson(res, 200, this.profileBody(profile))
      return
    }

    if (req.method === 'POST' && pathname === '/api/profiles/minecraft') {
      const names = JSON.parse((await this.readBody(req)) || '[]') as string[]
      const profiles = Array.from(this.uuidToProfile.values())
        .filter((p) => names.some((n) => n.toLowerCase() === p.name.toLowerCase()))
        .map((p) => ({ id: p.uuid.replace(/-/g, ''), name: p.name, properties: [] }))
      this.writeJson(res, 200, profiles)
      return
    }

    if (req.method === 'GET' && pathname.startsWith('/api/user/profile/')) {
      this.noContent(res)
      return
    }

    this.writeJson(res, 404, { error: 'NotFound', errorMessage: pathname })
  }

  async stop(): Promise<void> {
    const server = this.server
    this.server = null
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()))
    }
  }
}
