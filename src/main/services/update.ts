import fs from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { app, net, shell } from 'electron'
import type { JobProgress, UpdateInfo } from '../../shared/types'
import type { AppStore } from '../store'
import { JobManager } from '../jobs'
import { appEvents } from '../events'
import { compareVersions, errorMessage } from '../utils'

const GITHUB_REPO = 'Ti-68281/Bamboo-Launcher'
const GITHUB_RELEASES = `https://github.com/${GITHUB_REPO}/releases`
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`
const WEBSITE = 'https://bamboo.xbkjz.icu'

interface GithubRelease {
  tag_name?: string
  name?: string
  body?: string
  html_url?: string
  published_at?: string
  draft?: boolean
  prerelease?: boolean
  assets?: Array<{ name: string; browser_download_url: string; size?: number }>
}

interface WebsiteVersion {
  version?: string
  latestVersion?: string
  downloadUrl?: string
  download_url?: string
  releaseUrl?: string
  release_url?: string
  notes?: string
  changelog?: string
  publishedAt?: string
}

function cleanVersion(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/^v/i, '')
    .replace(/^版本\s*/u, '')
}

function normalizeVersion(value: string): string {
  const match = value.match(/\d+(?:\.\d+){1,3}(?:[-+][\w.-]+)?/)
  return match ? match[0] : value
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`~]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 1600)
}

function isAllowedUpdateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    return [
      'github.com',
      'objects.githubusercontent.com',
      'github-releases.githubusercontent.com',
      'githubusercontent.com',
      'bamboo.xbkjz.icu',
    ].some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}

export class UpdateService {
  private cached: { at: number; info: UpdateInfo } | null = null

  constructor(
    private store: AppStore,
    private jobs: JobManager,
  ) {}

  get currentVersion(): string {
    return cleanVersion(app.getVersion())
  }

  async check(force = false): Promise<UpdateInfo> {
    if (!force && this.cached && Date.now() - this.cached.at < 15 * 60_000) {
      return this.cached.info
    }
    const currentVersion = this.currentVersion
    const candidates: UpdateInfo[] = []
    const errors: string[] = []

    const release = await this.fetchGithubRelease().catch((error) => {
      errors.push(`GitHub：${errorMessage(error)}`)
      return null
    })
    if (release) {
      const latestVersion = cleanVersion(release.tag_name || release.name)
      const assets = release.assets ?? []
      const asset =
        assets.find((item) => /bamboo.*\.exe$/i.test(item.name) && !/blockmap/i.test(item.name)) ??
        assets.find((item) => /\.exe$/i.test(item.name)) ??
        assets.find((item) => /bamboo.*\.zip$/i.test(item.name)) ??
        assets.find((item) => /\.zip$/i.test(item.name)) ??
        assets[0]
      candidates.push({
        currentVersion,
        latestVersion: normalizeVersion(latestVersion),
        available: false,
        source: 'github',
        releaseUrl: release.html_url || GITHUB_RELEASES,
        downloadUrl: asset?.browser_download_url,
        downloadName: asset?.name,
        notes: release.body ? stripMarkdown(release.body) : undefined,
        publishedAt: release.published_at,
        checkedAt: Date.now(),
      })
    }

    const website = await this.fetchWebsiteVersion().catch((error) => {
      errors.push(`官网：${errorMessage(error)}`)
      return null
    })
    if (website) candidates.push(website)

    const repositoryVersion = await this.fetchRepositoryVersion().catch((error) => {
      errors.push(`仓库：${errorMessage(error)}`)
      return null
    })
    if (repositoryVersion) candidates.push(repositoryVersion)

    const withVersion = candidates.filter((candidate) => candidate.latestVersion && candidate.latestVersion !== '0')
    withVersion.sort((a, b) => {
      const diff = compareVersions(b.latestVersion, a.latestVersion)
      if (diff !== 0) return diff
      if (a.downloadUrl && !b.downloadUrl) return -1
      if (b.downloadUrl && !a.downloadUrl) return 1
      return 0
    })
    const latest = withVersion[0]
    const latestVersion =
      latest && compareVersions(latest.latestVersion, currentVersion) > 0
        ? latest.latestVersion
        : currentVersion
    const info: UpdateInfo = latest
      ? {
          ...latest,
          currentVersion,
          latestVersion,
          available: compareVersions(latestVersion, currentVersion) > 0,
          checkedAt: Date.now(),
          error: errors.length && !latest.downloadUrl ? errors[0] : undefined,
        }
      : {
          currentVersion,
          latestVersion: currentVersion,
          available: false,
          source: 'none',
          checkedAt: Date.now(),
          error: errors[0] || '暂时无法获取版本信息',
        }
    this.cached = { at: Date.now(), info }
    return info
  }

  private async fetchGithubRelease(): Promise<GithubRelease | null> {
    const response = await net.fetch(`${GITHUB_API}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Bamboo-Launcher',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(12000),
    })
    if (response.status === 404) return null
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return (await response.json()) as GithubRelease
  }

  private async fetchWebsiteVersion(): Promise<UpdateInfo | null> {
    for (const endpoint of [`${WEBSITE}/version.json`, `${WEBSITE}/update.json`]) {
      try {
        const response = await net.fetch(endpoint, {
          headers: { 'User-Agent': 'Bamboo-Launcher' },
          signal: AbortSignal.timeout(10000),
        })
        if (!response.ok) continue
        const data = (await response.json()) as WebsiteVersion
        const version = normalizeVersion(cleanVersion(data.version ?? data.latestVersion))
        if (!/\d+\.\d+/.test(version)) continue
        const rawDownload = data.downloadUrl ?? data.download_url
        const downloadUrl = rawDownload ? new URL(rawDownload, WEBSITE).toString() : undefined
        return {
          currentVersion: this.currentVersion,
          latestVersion: version,
          available: false,
          source: 'website',
          releaseUrl: data.releaseUrl ?? data.release_url ?? `${WEBSITE}/#download`,
          downloadUrl: downloadUrl && isAllowedUpdateUrl(downloadUrl) ? downloadUrl : undefined,
          downloadName: downloadUrl ? path.basename(new URL(downloadUrl).pathname) : undefined,
          notes: stripMarkdown(data.notes ?? data.changelog ?? ''),
          publishedAt: data.publishedAt,
          checkedAt: Date.now(),
        }
      } catch {
        // Try the next endpoint / HTML fallback.
      }
    }

    try {
      const response = await net.fetch(WEBSITE, {
        headers: { 'User-Agent': 'Bamboo-Launcher' },
        signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) return null
      const html = await response.text()
      const download = html.match(/\/downloads\/Bamboo-Portable-(\d+\.\d+\.\d+)\.zip/i)
      const fallback = html.match(/(?:FALLBACK_VERSION|hero-version)[^\n]{0,80}?(\d+\.\d+\.\d+)/i)
      const version = cleanVersion(download?.[1] ?? fallback?.[1] ?? '')
      if (!version) return null
      const downloadUrl = download ? new URL(`/downloads/Bamboo-Portable-${download[1]}.zip`, WEBSITE).toString() : undefined
      return {
        currentVersion: this.currentVersion,
        latestVersion: version,
        available: false,
        source: 'website',
        releaseUrl: `${WEBSITE}/#download`,
        downloadUrl,
        downloadName: downloadUrl ? path.basename(new URL(downloadUrl).pathname) : undefined,
        checkedAt: Date.now(),
      }
    } catch {
      return null
    }
  }

  private async fetchRepositoryVersion(): Promise<UpdateInfo | null> {
    const response = await net.fetch(
      `https://raw.githubusercontent.com/${GITHUB_REPO}/main/package.json`,
      {
        headers: { 'User-Agent': 'Bamboo-Launcher' },
        signal: AbortSignal.timeout(10000),
      },
    )
    if (!response.ok) return null
    const data = (await response.json()) as { version?: string }
    const latestVersion = normalizeVersion(cleanVersion(data.version))
    if (!/\d+\.\d+/.test(latestVersion)) return null
    return {
      currentVersion: this.currentVersion,
      latestVersion,
      available: false,
      source: 'repository',
      releaseUrl: GITHUB_RELEASES,
      checkedAt: Date.now(),
    }
  }

  async download(): Promise<JobProgress> {
    const info = this.cached?.info ?? (await this.check(true))
    if (!info.available) throw new Error('当前已经是最新版本。')
    if (!info.downloadUrl) throw new Error('暂时没有可用的更新下载地址，请打开发布页手动下载。')
    if (!isAllowedUpdateUrl(info.downloadUrl)) throw new Error('更新地址不在允许的域名内。')
    const fileName = path.basename(info.downloadName || new URL(info.downloadUrl).pathname)
    const safeName = fileName.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_') || `Bamboo-${info.latestVersion}.zip`
    const destination = path.join(this.store.paths.cache, 'updates', safeName)
    const version = info.latestVersion

    return this.jobs.start('other', `下载更新 v${version}`, async (context) => {
      await fs.mkdir(path.dirname(destination), { recursive: true })
      const temp = destination + '.part'
      context.report(0, '连接更新服务器…', { indeterminate: true })
      const response = await net.fetch(info.downloadUrl!, {
        headers: { 'User-Agent': 'Bamboo-Launcher', Accept: 'application/octet-stream' },
      })
      if (!response.ok || !response.body) throw new Error(`下载失败：HTTP ${response.status}`)
      const total = Number(response.headers.get('content-length') ?? 0)
      if (total > 1024 * 1024 * 1024) throw new Error('更新文件异常过大，已取消下载。')
      let received = 0
      const counter = new Transform({
        transform(chunk: Buffer, _encoding, callback) {
          received += chunk.length
          if (total > 0) {
            context.report(
              Math.min(99, (received / total) * 100),
              `正在下载更新… ${(received / 1024 / 1024).toFixed(1)} MB`,
            )
          } else {
            context.report(35, '正在下载更新…', { indeterminate: true })
          }
          callback(null, chunk)
        },
      })
      await pipeline(Readable.fromWeb(response.body as never), counter, createWriteStream(temp))
      await fs.rm(destination, { force: true }).catch(() => undefined)
      await fs.rename(temp, destination)
      context.report(100, '更新已下载')
      shell.showItemInFolder(destination)
      appEvents.emitBamboo({
        type: 'toast',
        payload: {
          kind: 'success',
          title: `更新 v${version} 已下载`,
          message: '已打开文件所在位置，请关闭 Bamboo 后安装。',
          actionPage: 'settings',
        },
      })
      return { path: destination, version }
    })
  }
}
