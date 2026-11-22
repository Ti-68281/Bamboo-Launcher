import fs from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import AdmZip from 'adm-zip'

export function ensureDir(dir: string): Promise<string | undefined> {
  return fs.mkdir(dir, { recursive: true })
}

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export async function readJson<T>(filePath: string, fallback?: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8')) as T
  } catch (error) {
    if (fallback !== undefined) return fallback
    throw error
  }
}

export async function writeJson(filePath: string, data: unknown): Promise<void> {
  await ensureDir(path.dirname(filePath))
  const temp = filePath + '.tmp'
  await fs.writeFile(temp, JSON.stringify(data, null, 2), 'utf8')
  await fs.rename(temp, filePath)
}

export function newId(prefix = ''): string {
  return prefix + crypto.randomUUID().replace(/-/g, '')
}

export function slugify(input: string, fallback = 'instance'): string {
  const cleaned = input
    .normalize('NFKD')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  return cleaned || fallback
}

export function sha256(buffer: Buffer | string): string {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

export function sha1(buffer: Buffer | string): string {
  return crypto.createHash('sha1').update(buffer).digest('hex')
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

export function friendlyError(error: unknown): string {
  const message = errorMessage(error)
  if (/ENOTFOUND|EAI_AGAIN|fetch failed|network timeout/i.test(message)) {
    return '网络连接失败，请检查网络或在设置中切换下载源。'
  }
  if (/ETIMEDOUT|timeout/i.test(message)) return '连接超时，请稍后重试或切换下载源。'
  if (/ENOSPC/i.test(message)) return '磁盘空间不足，请清理磁盘后重试。'
  if (/EACCES|EPERM/i.test(message)) return '没有权限访问目标文件夹，请换一个目录或以管理员身份运行。'
  if (/402|401|403/.test(message) && /curse/i.test(message)) {
    return 'CurseForge 请求被拒绝，请检查 API Key 是否有效。'
  }
  return message
}

export async function fetchWithTimeout(
  input: string | URL,
  init?: RequestInit & { timeoutMs?: number },
): Promise<Response> {
  const timeout = init?.timeoutMs ?? 25000
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(input, { ...init, signal: init?.signal ?? controller.signal })
    return response
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchJson<T>(
  input: string | URL,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const response = await fetchWithTimeout(input, {
    ...init,
    headers: {
      'user-agent': 'BambooLauncher/1.0 (Minecraft Java Launcher)',
      accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`HTTP ${response.status} ${response.statusText}${body ? ` — ${body.slice(0, 300)}` : ''}`)
  }
  return (await response.json()) as T
}

export async function downloadFile(
  url: string,
  destination: string,
  options: { headers?: Record<string, string>; timeoutMs?: number } = {},
): Promise<void> {
  await ensureDir(path.dirname(destination))
  const response = await fetchWithTimeout(url, {
    headers: {
      'user-agent': 'BambooLauncher/1.0 (Minecraft Java Launcher)',
      ...(options.headers ?? {}),
    },
    timeoutMs: options.timeoutMs ?? 120000,
  })
  if (!response.ok || !response.body) {
    throw new Error(`下载失败：HTTP ${response.status} ${response.statusText}`)
  }
  const temp = destination + `.part-${process.pid}`
  try {
    await pipeline(Readable.fromWeb(response.body as never), createWriteStream(temp))
    // Windows refuses rename() onto an existing path, so replace it explicitly.
    await fs.rm(destination, { force: true }).catch(() => undefined)
    await fs.rename(temp, destination)
  } catch (error) {
    await fs.unlink(temp).catch(() => undefined)
    throw error
  }
}

export function isSafeChild(parent: string, child: string): boolean {
  const resolvedParent = path.resolve(parent)
  const resolvedChild = path.resolve(child)
  return resolvedChild === resolvedParent || resolvedChild.startsWith(resolvedParent + path.sep)
}

export function extractZipSafe(
  zipPath: string,
  destination: string,
  stripPrefix?: string,
): { extracted: number } {
  const zip = new AdmZip(zipPath)
  let extracted = 0
  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue
    let entryName = entry.entryName.replace(/\\/g, '/')
    if (stripPrefix) {
      const prefix = stripPrefix.replace(/\\/g, '/').replace(/\/?$/, '/')
      if (!entryName.startsWith(prefix)) continue
      entryName = entryName.slice(prefix.length)
    }
    if (!entryName || entryName.includes('\0')) continue
    const target = path.join(destination, entryName)
    if (!isSafeChild(destination, target)) continue
    ensureDirSync(path.dirname(target))
    require('node:fs').writeFileSync(target, entry.getData())
    extracted++
  }
  return { extracted }
}

function ensureDirSync(dir: string): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('node:fs').mkdirSync(dir, { recursive: true })
}

export function mimeToDataUrl(buffer: Buffer, mime = 'image/png'): string {
  return `data:${mime};base64,${buffer.toString('base64')}`
}

export async function readDataUrl(filePath: string): Promise<string | undefined> {
  try {
    const buffer = await fs.readFile(filePath)
    return mimeToDataUrl(buffer)
  } catch {
    return undefined
  }
}

export function compareVersions(a: string, b: string): number {
  const parse = (version: string) =>
    version
      .split(/[.-]/)
      .map((part) => Number.parseInt(part, 10))
      .map((part) => (Number.isFinite(part) ? part : 0))
  const aa = parse(a)
  const bb = parse(b)
  for (let i = 0; i < Math.max(aa.length, bb.length); i++) {
    const x = aa[i] ?? 0
    const y = bb[i] ?? 0
    if (x !== y) return x > y ? 1 : -1
  }
  return 0
}

export async function copyFileSafe(from: string, to: string): Promise<void> {
  await ensureDir(path.dirname(to))
  await fs.copyFile(from, to)
}

export async function listDirectories(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => path.join(dir, e.name))
  } catch {
    return []
  }
}
