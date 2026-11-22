import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { nativeImage } from 'electron'
import { MicrosoftAuthenticator, offline } from '@xmcl/user'
import type {
  Account,
  Account as PublicAccount,
  MicrosoftLoginResult,
  MicrosoftLoginStart,
  OfflineLoginInput,
} from '../../shared/types'
import type { AppStore, StoredAccount } from '../store'
import { ensureDir, errorMessage, fetchJson, readDataUrl } from '../utils'

interface MicrosoftAuth {
  minecraftAccessToken: string
  minecraftExpiresAt: number
  microsoftAccessToken: string
  microsoftRefreshToken: string
  uhs: string
}

interface DeviceFlow {
  flowId: string
  deviceCode: string
  interval: number
  expiresAt: number
  clientId: string
}

interface MicrosoftTokenResponse {
  token_type: string
  scope: string
  expires_in: number
  access_token: string
  refresh_token?: string
  error?: string
  error_description?: string
}

interface MinecraftProfile {
  id: string
  name: string
  skins?: Array<{
    id: string
    state: string
    url: string
    variant: string
  }>
}

const MICROSOFT_TENANT = 'consumers'
const XBOX_SCOPE = 'XboxLive.signin offline_access'

export class AccountService {
  private flows = new Map<string, DeviceFlow>()
  private skinCache = new Map<string, { mtime: number; dataUrl: string }>()

  constructor(private store: AppStore) {}

  private get clientId(): string | undefined {
    return this.store.settings.microsoftClientId.trim() || process.env.BAMBOO_MS_CLIENT_ID?.trim()
  }

  private authorizeUrl(pathname: string): string {
    return `https://login.microsoftonline.com/${MICROSOFT_TENANT}/oauth2/v2.0/${pathname}`
  }

  async list(): Promise<PublicAccount[]> {
    const accounts = this.store.state.accounts
    const result: PublicAccount[] = []
    for (const account of accounts) {
      result.push(await this.toPublic(account))
    }
    return result
  }

  async toPublic(account: StoredAccount): Promise<PublicAccount> {
    let skin
    if (account.skinFile) {
      const file = path.join(this.store.paths.skins, account.skinFile)
      const stat = await fs.stat(file).catch(() => null)
      if (stat) {
        const cached = this.skinCache.get(file)
        if (cached && cached.mtime === stat.mtimeMs) {
          skin = { model: account.skin?.model ?? 'classic', dataUrl: cached.dataUrl, updatedAt: stat.mtimeMs }
        } else {
          const dataUrl = await readDataUrl(file)
          if (dataUrl) {
            this.skinCache.set(file, { mtime: stat.mtimeMs, dataUrl })
            skin = { model: account.skin?.model ?? 'classic', dataUrl, updatedAt: stat.mtimeMs }
          }
        }
      }
    }
    return {
      id: account.id,
      type: account.type,
      name: account.name,
      uuid: account.uuid,
      createdAt: account.createdAt,
      xuid: account.xuid,
      skin,
    }
  }

  async addOffline(input: OfflineLoginInput): Promise<Account> {
    const name = input.name.trim()
    if (!/^[A-Za-z0-9_]{3,16}$/.test(name)) {
      throw new Error('离线用户名需为 3–16 位英文、数字或下划线。')
    }
    const exists = this.store.state.accounts.find(
      (a) => a.type === 'offline' && a.name.toLowerCase() === name.toLowerCase(),
    )
    if (exists) {
      throw new Error(`已存在名为 ${name} 的离线账户。`)
    }
    const auth = offline(name)
    const account: StoredAccount = {
      id: `offline_${auth.selectedProfile.id.slice(0, 12)}_${crypto.randomUUID().slice(0, 4)}`,
      type: 'offline',
      name,
      uuid: auth.selectedProfile.id,
      createdAt: Date.now(),
    }
    if (input.skinPath) {
      const saved = await this.saveSkinFile(account.id, input.skinPath, input.model ?? 'classic')
      account.skinFile = saved.file
      account.skin = { model: saved.model, updatedAt: Date.now() }
    }
    this.store.state.accounts.push(account)
    if (!this.store.state.activeAccountId) this.store.state.activeAccountId = account.id
    await this.store.save()
    return this.toPublic(account)
  }

  private async saveSkinFile(
    accountId: string,
    sourcePath: string,
    model: 'classic' | 'slim',
  ): Promise<{ file: string; model: 'classic' | 'slim'; dataUrl: string }> {
    const raw = await fs.readFile(sourcePath)
    if (raw.length > 2 * 1024 * 1024) throw new Error('皮肤文件过大，请选择小于 2MB 的 PNG。')
    const image = nativeImage.createFromBuffer(raw)
    if (image.isEmpty()) throw new Error('无法读取这张图片，请选择有效的 PNG 文件。')
    const size = image.getSize()
    const valid = (size.width === 64 && size.height === 64) || (size.width === 64 && size.height === 32)
    if (!valid) {
      throw new Error(`皮肤尺寸必须为 64×64 或 64×32，当前为 ${size.width}×${size.height}。`)
    }
    // Re-encoding strips ancillary PNG chunks and validates the bitmap.
    const png = image.toPNG()
    const file = `${accountId}.png`
    await ensureDir(this.store.paths.skins)
    await fs.writeFile(path.join(this.store.paths.skins, file), png)
    this.skinCache.delete(path.join(this.store.paths.skins, file))
    return {
      file,
      model,
      dataUrl: `data:image/png;base64,${png.toString('base64')}`,
    }
  }

  async saveSkin(accountId: string, sourcePath: string, model: 'classic' | 'slim'): Promise<Account> {
    const account = this.store.getAccount(accountId)
    if (!account) throw new Error('账户不存在。')
    const saved = await this.saveSkinFile(accountId, sourcePath, model)
    account.skinFile = saved.file
    account.skin = { model, updatedAt: Date.now() }
    await this.store.save()
    return this.toPublic(account)
  }

  async setSkinModel(accountId: string, model: 'classic' | 'slim'): Promise<Account> {
    const account = this.store.getAccount(accountId)
    if (!account) throw new Error('账户不存在。')
    if (!account.skinFile) throw new Error('该账户还没有皮肤。')
    account.skin = { model, updatedAt: Date.now() }
    await this.store.save()
    return this.toPublic(account)
  }

  async logout(accountId: string): Promise<void> {
    const account = this.store.state.accounts.find((a) => a.id === accountId)
    if (!account) return
    this.store.state.accounts = this.store.state.accounts.filter((a) => a.id !== accountId)
    if (this.store.state.activeAccountId === accountId) {
      this.store.state.activeAccountId = this.store.state.accounts[0]?.id ?? null
    }
    if (account.skinFile) {
      await fs.unlink(path.join(this.store.paths.skins, account.skinFile)).catch(() => undefined)
    }
    await this.store.save()
  }

  // -------------------------- Microsoft OAuth --------------------------

  async startMicrosoftLogin(): Promise<MicrosoftLoginStart> {
    if (!this.clientId) {
      throw new Error(
        'MICROSOFT_CLIENT_ID_REQUIRED: 微软登录需要一个 Azure 应用客户端 ID。请在「设置 → 账户与服务」中填写。',
      )
    }
    const body = new URLSearchParams({
      client_id: this.clientId,
      scope: XBOX_SCOPE,
    })
    let data: Record<string, unknown>
    try {
      data = await fetchJson(this.authorizeUrl('devicecode'), {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body,
      })
    } catch (error) {
      const message = errorMessage(error)
      if (/AADSTS|invalid_client|unauthorized_client/i.test(message)) {
        throw new Error('微软应用 ID 无效，或该应用未启用「允许公共客户端设备代码流」。')
      }
      throw new Error(`无法启动微软登录：${message}`)
    }
    const flowId = crypto.randomUUID()
    const interval = Number(data.interval ?? 5)
    this.flows.set(flowId, {
      flowId,
      deviceCode: String(data.device_code),
      interval,
      expiresAt: Date.now() + Number(data.expires_in ?? 900) * 1000,
      clientId: this.clientId!,
    })
    return {
      flowId,
      userCode: String(data.user_code),
      verificationUri: String(data.verification_uri ?? 'https://microsoft.com/devicelogin'),
      expiresIn: Number(data.expires_in ?? 900),
      interval,
      message: String(data.message ?? ''),
    }
  }

  async pollMicrosoftLogin(flowId: string): Promise<MicrosoftLoginResult | null> {
    const flow = this.flows.get(flowId)
    if (!flow) throw new Error('登录流程已失效，请重新发起登录。')
    if (Date.now() > flow.expiresAt) {
      this.flows.delete(flowId)
      throw new Error('设备代码已过期，请重新发起微软登录。')
    }
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(this.authorizeUrl('token'), {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
          client_id: flow.clientId,
          device_code: flow.deviceCode,
        }),
        signal: controller.signal,
      })
      const data = (await response.json().catch(() => ({}))) as MicrosoftTokenResponse
      if (!response.ok || data.error) {
        if (data.error === 'authorization_pending') return null
        if (data.error === 'slow_down') {
          flow.interval += 5
          return null
        }
        if (data.error === 'expired_token') {
          this.flows.delete(flowId)
          throw new Error('设备代码已过期，请重新发起微软登录。')
        }
        if (data.error === 'authorization_declined') {
          this.flows.delete(flowId)
          throw new Error('你取消了微软登录授权。')
        }
        throw new Error(data.error_description || data.error || '微软登录失败。')
      }
      if (!data.access_token) throw new Error('微软未返回访问令牌，请重试。')

      const account = await this.finishMicrosoftLogin(data)
      this.flows.delete(flowId)
      return { account, alreadySignedIn: false }
    } finally {
      clearTimeout(timer)
    }
  }

  private async finishMicrosoftLogin(token: MicrosoftTokenResponse): Promise<Account> {
    const authenticator = new MicrosoftAuthenticator()
    let profile: MinecraftProfile
    let minecraftToken: string
    try {
      const xbox = await authenticator.acquireXBoxToken(token.access_token)
      const xsts = xbox.minecraftXstsResponse
      const uhs = xsts.DisplayClaims.xui[0].uhs
      const minecraft = await authenticator.loginMinecraftWithXBox(uhs, xsts.Token)
      minecraftToken = minecraft.access_token
      profile = await fetchJson<MinecraftProfile>('https://api.minecraftservices.com/minecraft/profile', {
        headers: { authorization: `Bearer ${minecraftToken}` },
      })
      const auth: MicrosoftAuth = {
        minecraftAccessToken: minecraft.access_token,
        minecraftExpiresAt: Date.now() + (minecraft.expires_in || 86400) * 1000,
        microsoftAccessToken: token.access_token,
        microsoftRefreshToken: token.refresh_token ?? '',
        uhs,
      }
      if (!token.refresh_token) {
        throw new Error('微软未返回刷新令牌，请确认应用允许 offline_access。')
      }
      const existing = this.store.state.accounts.find(
        (a) => a.type === 'microsoft' && a.uuid.toLowerCase() === profile.id.toLowerCase(),
      )
      let account: StoredAccount
      if (existing) {
        account = existing
        account.name = profile.name
        account.auth = this.store.encrypt(JSON.stringify(auth))
      } else {
        account = {
          id: `ms_${profile.id.slice(0, 12)}`,
          type: 'microsoft',
          name: profile.name,
          uuid: profile.id,
          createdAt: Date.now(),
          auth: this.store.encrypt(JSON.stringify(auth)),
          xuid: xsts.DisplayClaims.xui[0].xid,
        }
        this.store.state.accounts.push(account)
      }
      this.store.state.activeAccountId = account.id
      if (profile.skins?.length) {
        await this.downloadMicrosoftSkin(account, profile.skins[0])
      }
      await this.store.save()
      return this.toPublic(account)
    } catch (error) {
      const message = errorMessage(error)
      if (/does not own|ownership|entitlement|404/i.test(message)) {
        throw new Error('该微软账户没有拥有 Minecraft Java 版，或档案尚未创建。请先在 minecraft.net 完成购买/设置。')
      }
      if (/Xbox|XSTS|2148916233|2148916235/i.test(message)) {
        throw new Error('Xbox 验证失败。请先在 Xbox 官网创建档案，并确认账户地区可用。')
      }
      throw error
    }
  }

  private async downloadMicrosoftSkin(account: StoredAccount, skin: { url: string; variant: string }) {
    try {
      const response = await fetch(skin.url)
      if (!response.ok) return
      const buffer = Buffer.from(await response.arrayBuffer())
      const image = nativeImage.createFromBuffer(buffer)
      if (image.isEmpty()) return
      const png = image.toPNG()
      const file = `${account.id}.png`
      await ensureDir(this.store.paths.skins)
      await fs.writeFile(path.join(this.store.paths.skins, file), png)
      account.skinFile = file
      account.skin = {
        model: skin.variant?.toUpperCase() === 'SLIM' ? 'slim' : 'classic',
        updatedAt: Date.now(),
      }
    } catch {
      // A missing skin should never block account login.
    }
  }

  async refreshMicrosoftAccount(accountId: string): Promise<Account> {
    const account = this.store.getAccount(accountId)
    if (!account || account.type !== 'microsoft') throw new Error('不是微软账户。')
    await this.refreshMicrosoftAuth(account, true)
    await this.store.save()
    return this.toPublic(account)
  }

  private parseAuth(account: StoredAccount): MicrosoftAuth | null {
    const raw = this.store.decrypt(account.auth)
    if (!raw) return null
    try {
      return JSON.parse(raw) as MicrosoftAuth
    } catch {
      return null
    }
  }

  private async refreshMicrosoftAuth(account: StoredAccount, force = false): Promise<MicrosoftAuth> {
    const current = this.parseAuth(account)
    if (!current) throw new Error('微软登录凭据已损坏，请重新登录。')
    if (!force && current.minecraftExpiresAt > Date.now() + 120_000) return current
    if (!current.microsoftRefreshToken) throw new Error('微软登录已过期，请重新登录。')
    if (!this.clientId) throw new Error('未配置微软应用 ID，请先在设置中填写。')
    let refreshed: MicrosoftTokenResponse
    try {
      const response = await fetch(this.authorizeUrl('token'), {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.clientId,
          refresh_token: current.microsoftRefreshToken,
          scope: XBOX_SCOPE,
        }),
      })
      refreshed = (await response.json().catch(() => ({}))) as MicrosoftTokenResponse
      if (!response.ok || refreshed.error) {
        throw new Error(refreshed.error_description || refreshed.error || '刷新令牌失败')
      }
    } catch (error) {
      throw new Error(`微软登录已过期，请重新登录：${errorMessage(error)}`)
    }
    try {
      const authenticator = new MicrosoftAuthenticator()
      const xbox = await authenticator.acquireXBoxToken(refreshed.access_token)
      const xsts = xbox.minecraftXstsResponse
      const uhs = xsts.DisplayClaims.xui[0].uhs
      const minecraft = await authenticator.loginMinecraftWithXBox(uhs, xsts.Token)
      const next: MicrosoftAuth = {
        minecraftAccessToken: minecraft.access_token,
        minecraftExpiresAt: Date.now() + (minecraft.expires_in || 86400) * 1000,
        microsoftAccessToken: refreshed.access_token,
        microsoftRefreshToken: refreshed.refresh_token || current.microsoftRefreshToken,
        uhs,
      }
      account.auth = this.store.encrypt(JSON.stringify(next))
      return next
    } catch (error) {
      throw new Error(`刷新微软登录失败：${errorMessage(error)}`)
    }
  }

  async getLaunchAuth(accountId: string): Promise<{
    accessToken: string
    uuid: string
    name: string
    userType: 'mojang'
    isMicrosoft: boolean
  }> {
    const account = this.store.getAccount(accountId)
    if (!account) throw new Error('请先选择一个账户。')
    if (account.type === 'offline') {
      const auth = offline(account.name, account.uuid)
      return {
        accessToken: auth.accessToken,
        uuid: account.uuid,
        name: account.name,
        userType: 'mojang',
        isMicrosoft: false,
      }
    }
    const auth = await this.refreshMicrosoftAuth(account)
    await this.store.save()
    return {
      accessToken: auth.minecraftAccessToken,
      uuid: account.uuid,
      name: account.name,
      userType: 'mojang',
      isMicrosoft: true,
    }
  }
}
