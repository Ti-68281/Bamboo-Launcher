import fs from 'node:fs/promises'
import path from 'node:path'
import type {
  InstalledMod,
  Instance,
  InstallProjectOptions,
  JobProgress,
  LoaderTypeFilter,
  ModPlatform,
  ModProject,
  ModVersion,
  SearchProjectsOptions,
  SearchProjectsResult,
} from '../../shared/types'
import type { AppStore } from '../store'
import { JobManager, type JobContext } from '../jobs'
import { appEvents } from '../events'
import { downloadFile, ensureDir, errorMessage, exists, fetchJson, friendlyError } from '../utils'
import { listInstalledMods } from './modMetadata'

const MODRINTH = 'https://api.modrinth.com/v2'
const CURSEFORGE = 'https://api.curseforge.com/v1'
const CF_GAME_ID = 432
const CF_CLASS_MOD = 6
const CF_CLASS_MODPACK = 4471

const loaderToModrinthCategory: Record<string, string> = {
  fabric: 'fabric',
  forge: 'forge',
  quilt: 'quilt',
  neoforge: 'neoforge',
}

const loaderToCurseForge: Record<string, number> = {
  forge: 1,
  fabric: 4,
  quilt: 5,
  neoforge: 6,
}

interface ModrinthSearchResponse {
  hits: Array<{
    project_id: string
    slug: string
    title: string
    description: string
    author: string
    downloads: number
    follows: number
    icon_url?: string
    categories: string[]
    versions: string[]
    project_type: string
    date_modified: string
    loaders?: string[]
    client_side?: string
  }>
  total_hits: number
  offset: number
  limit: number
}

interface ModrinthVersion {
  id: string
  project_id: string
  name: string
  version_number: string
  game_versions: string[]
  loaders: string[]
  date_published: string
  files: Array<{
    url: string
    filename: string
    primary: boolean
    size: number
    hashes: Record<string, string>
  }>
  dependencies: Array<{
    version_id: string | null
    project_id: string | null
    file_name: string | null
    dependency_type: 'required' | 'optional' | 'incompatible' | 'embedded'
  }>
  changelog?: string
}

interface CurseForgeSearchResponse {
  data: Array<{
    id: number
    name: string
    slug: string
    summary: string
    downloadCount: number
    thumbsUpCount: number
    dateModified: string
    logo?: { thumbnailUrl?: string }
    categories?: Array<{ name: string }>
    authors?: Array<{ name: string }>
    latestFilesIndexes?: Array<{ gameVersion: string; modLoader?: number }>
    links?: { websiteUrl?: string }
  }>
  pagination: { totalCount: number; index: number; pageSize: number }
}

interface CurseForgeFileResponse {
  data: Array<{
    id: number
    displayName: string
    fileName: string
    fileDate: string
    gameVersions: string[]
    downloadUrl: string | null
    dependencies?: Array<{ modId: number; relationType: number }>
  }>
}

export class ModService {
  private versionCache = new Map<string, { at: number; versions: ModVersion[] }>()

  constructor(
    private store: AppStore,
    private jobs: JobManager,
  ) {}

  getCurseForgeKey(): string | null {
    return this.store.decrypt(this.store.state.curseForgeKey)
  }

  async setCurseForgeKey(key: string | null): Promise<{ configured: boolean }> {
    const trimmed = key?.trim() ?? ''
    if (!trimmed) {
      this.store.state.curseForgeKey = undefined
      this.store.settings.curseForgeEnabled = false
    } else {
      this.store.state.curseForgeKey = this.store.encrypt(trimmed)
      this.store.settings.curseForgeEnabled = true
    }
    await this.store.save()
    return { configured: Boolean(trimmed) }
  }

  async testCurseForgeKey(key?: string): Promise<{ ok: boolean; message: string }> {
    const apiKey = key?.trim() || this.getCurseForgeKey()
    if (!apiKey) return { ok: false, message: '还没有填写 CurseForge API Key。' }
    try {
      const data = await this.cfRequest<{ data?: unknown }>('/games/432', apiKey, { timeoutMs: 15000 })
      if (data?.data) return { ok: true, message: 'API Key 验证通过，可以搜索 CurseForge 项目。' }
      return { ok: false, message: 'CurseForge 返回了意外的响应。' }
    } catch (error) {
      return { ok: false, message: friendlyError(error) }
    }
  }

  private async cfRequest<T>(
    pathname: string,
    apiKey = this.getCurseForgeKey(),
    options: { timeoutMs?: number } = {},
  ): Promise<T> {
    if (!apiKey) throw new Error('CURSEFORGE_API_KEY_REQUIRED: 请在设置中填写 CurseForge API Key。')
    try {
      return await fetchJson<T>(`${CURSEFORGE}${pathname}`, {
        headers: { 'x-api-key': apiKey },
        timeoutMs: options.timeoutMs ?? 25000,
      })
    } catch (error) {
      const message = errorMessage(error)
      if (/\b(401|403)\b/.test(message)) throw new Error('CurseForge API Key 无效或已被限制。')
      if (/\b404\b/.test(message)) throw new Error('CurseForge 上找不到这个项目或文件。')
      throw error
    }
  }

  async searchProjects(options: SearchProjectsOptions): Promise<SearchProjectsResult> {
    const limit = Math.max(1, Math.min(40, options.limit ?? 20))
    const offset = Math.max(0, options.offset ?? 0)
    if (options.platform === 'curseforge') {
      if (!this.getCurseForgeKey()) {
        return {
          projects: [],
          total: 0,
          needsApiKey: true,
          error: 'CurseForge 需要 API Key。你可以先使用无需密钥的 Modrinth，或在设置中接入 CurseForge。',
        }
      }
      try {
        const query = new URLSearchParams({
          gameId: String(CF_GAME_ID),
          classId: String(options.projectType === 'modpack' ? CF_CLASS_MODPACK : CF_CLASS_MOD),
          searchFilter: options.query.trim(),
          sortField: '2',
          sortOrder: 'desc',
          index: String(offset),
          pageSize: String(limit),
        })
        if (options.gameVersion) query.set('gameVersion', options.gameVersion)
        if (options.loader !== 'any' && options.loader !== 'liteloader' && options.loader !== 'vanilla') {
          const loaderType = loaderToCurseForge[options.loader]
          if (loaderType) query.set('modLoaderType', String(loaderType))
        }
        const data = await this.cfRequest<CurseForgeSearchResponse>(`/mods/search?${query.toString()}`)
        return {
          total: data.pagination?.totalCount ?? data.data?.length ?? 0,
          projects: (data.data ?? []).map((mod) => ({
            id: String(mod.id),
            platform: 'curseforge' as const,
            slug: mod.slug,
            name: mod.name,
            summary: mod.summary,
            author: mod.authors?.[0]?.name ?? 'CurseForge 作者',
            downloads: mod.downloadCount,
            follows: mod.thumbsUpCount,
            iconUrl: mod.logo?.thumbnailUrl,
            categories: mod.categories?.map((c) => c.name) ?? [],
            gameVersions: Array.from(new Set(mod.latestFilesIndexes?.map((x) => x.gameVersion) ?? [])),
            loaders: [],
            websiteUrl: mod.links?.websiteUrl,
            updatedAt: Date.parse(mod.dateModified),
          })),
        }
      } catch (error) {
        return { projects: [], total: 0, error: friendlyError(error) }
      }
    }
    try {
      const facets: string[][] = [[`project_type:${options.projectType}`]]
      if (options.loader !== 'any' && options.loader !== 'vanilla' && options.loader !== 'liteloader') {
        facets.push([`categories:${loaderToModrinthCategory[options.loader]}`])
      }
      if (options.gameVersion) facets.push([`versions:${options.gameVersion}`])
      const query = new URLSearchParams({
        query: options.query.trim(),
        limit: String(limit),
        offset: String(offset),
        index: options.query.trim() ? 'relevance' : 'downloads',
        facets: JSON.stringify(facets),
      })
      const data = await fetchJson<ModrinthSearchResponse>(`${MODRINTH}/search?${query.toString()}`, {
        timeoutMs: 25000,
      })
      return {
        total: data.total_hits,
        projects: data.hits.map((hit) => ({
          id: hit.project_id,
          platform: 'modrinth',
          slug: hit.slug,
          name: hit.title,
          summary: hit.description,
          author: hit.author,
          downloads: hit.downloads,
          follows: hit.follows,
          iconUrl: hit.icon_url,
          categories: hit.categories,
          gameVersions: hit.versions,
          loaders: hit.loaders ?? [],
          websiteUrl: `https://modrinth.com/${options.projectType}/${hit.slug}`,
          updatedAt: Date.parse(hit.date_modified),
        })),
      }
    } catch (error) {
      return { projects: [], total: 0, error: friendlyError(error) }
    }
  }

  async getProjectVersions(
    platform: ModPlatform,
    projectId: string,
    mcVersion: string,
    loader: LoaderTypeFilter,
  ): Promise<ModVersion[]> {
    const cacheKey = `${platform}:${projectId}:${mcVersion}:${loader}`
    const cached = this.versionCache.get(cacheKey)
    if (cached && Date.now() - cached.at < 3 * 60_000) return cached.versions
    let versions: ModVersion[] = []
    if (platform === 'modrinth') {
      const query = new URLSearchParams({
        game_versions: JSON.stringify([mcVersion]),
      })
      if (loader !== 'any' && loader !== 'vanilla' && loader !== 'liteloader') {
        query.set('loaders', JSON.stringify([loader]))
      }
      const data = await fetchJson<ModrinthVersion[]>(
        `${MODRINTH}/project/${encodeURIComponent(projectId)}/version?${query.toString()}`,
        { timeoutMs: 25000 },
      )
      versions = data.map((version) => {
        const file = version.files.find((f) => f.primary) ?? version.files[0]
        return {
          id: version.id,
          name: version.name,
          versionNumber: version.version_number,
          gameVersions: version.game_versions,
          loaders: version.loaders,
          fileName: file?.filename ?? '',
          downloadUrl: file?.url,
          changelog: version.changelog,
          dependencies: version.dependencies.map((dep) => ({
            projectId: dep.project_id ?? undefined,
            versionId: dep.version_id ?? undefined,
            fileName: dep.file_name ?? undefined,
            dependencyType: dep.dependency_type,
            platform: 'modrinth' as const,
          })),
        }
      })
    } else {
      if (!this.getCurseForgeKey()) throw new Error('CURSEFORGE_API_KEY_REQUIRED: 请先在设置中接入 CurseForge。')
      const query = new URLSearchParams({
        gameVersion: mcVersion,
        pageSize: '50',
      })
      if (loader !== 'any' && loader !== 'vanilla' && loader !== 'liteloader') {
        const loaderType = loaderToCurseForge[loader]
        if (loaderType) query.set('modLoaderType', String(loaderType))
      }
      const data = await this.cfRequest<CurseForgeFileResponse>(
        `/mods/${encodeURIComponent(projectId)}/files?${query.toString()}`,
      )
      versions = (data.data ?? []).map((file) => ({
        id: String(file.id),
        name: file.displayName,
        versionNumber: file.displayName,
        gameVersions: file.gameVersions.filter((v) => /^\d+\.\d+/.test(v)),
        loaders: file.gameVersions.filter((v) => /forge|fabric|quilt|neoforge/i.test(v)),
        fileName: file.fileName,
        downloadUrl: file.downloadUrl ?? curseForgeCdnUrl(file.id, file.fileName),
        dependencies: (file.dependencies ?? []).map((dep) => ({
          projectId: String(dep.modId),
          dependencyType:
            dep.relationType === 3
              ? ('required' as const)
              : dep.relationType === 2
                ? ('optional' as const)
                : dep.relationType === 5
                  ? ('incompatible' as const)
                  : ('embedded' as const),
          platform: 'curseforge' as const,
        })),
      }))
    }
    versions.sort((a, b) => b.versionNumber.localeCompare(a.versionNumber, undefined, { numeric: true }))
    this.versionCache.set(cacheKey, { at: Date.now(), versions })
    return versions
  }

  async getCurseForgeFile(
    modId: number | string,
    fileId: number | string,
  ): Promise<{ fileName: string; downloadUrl: string; gameVersions: string[] }> {
    if (!this.getCurseForgeKey()) {
      throw new Error('CURSEFORGE_API_KEY_REQUIRED: 整合包包含 CurseForge 模组，需要先配置 API Key。')
    }
    const response = await this.cfRequest<{
      data: {
        id: number
        fileName: string
        downloadUrl: string | null
        gameVersions: string[]
      }
    }>(`/mods/${encodeURIComponent(String(modId))}/files/${encodeURIComponent(String(fileId))}`)
    const file = response.data
    const downloadUrl = file.downloadUrl ?? curseForgeCdnUrl(file.id, file.fileName)
    if (!downloadUrl) throw new Error(`CurseForge 没有提供 ${file.fileName} 的下载地址。`)
    return { fileName: file.fileName, downloadUrl, gameVersions: file.gameVersions }
  }

  async installed(instanceId: string): Promise<InstalledMod[]> {
    const instance = this.requireInstance(instanceId)
    return listInstalledMods(instance.gameDir)
  }

  async setEnabled(instanceId: string, fileName: string, enabled: boolean): Promise<InstalledMod[]> {
    const instance = this.requireInstance(instanceId)
    const modsDir = path.join(instance.gameDir, 'mods')
    const safeName = path.basename(fileName)
    const full = path.join(modsDir, safeName)
    if (!(await exists(full))) throw new Error('模组文件不存在。')
    const isDisabled = safeName.toLowerCase().endsWith('.disabled')
    if (enabled && isDisabled) {
      await fs.rename(full, path.join(modsDir, safeName.slice(0, -'.disabled'.length)))
    } else if (!enabled && !isDisabled) {
      await fs.rename(full, full + '.disabled')
    }
    return listInstalledMods(instance.gameDir)
  }

  async delete(instanceId: string, fileName: string): Promise<InstalledMod[]> {
    const instance = this.requireInstance(instanceId)
    const modsDir = path.join(instance.gameDir, 'mods')
    const safeName = path.basename(fileName)
    await fs.unlink(path.join(modsDir, safeName)).catch(() => undefined)
    return listInstalledMods(instance.gameDir)
  }

  async installProject(options: InstallProjectOptions): Promise<JobProgress> {
    const instance = this.requireInstance(options.instanceId)
    if (!instance.mcVersion) throw new Error('实例没有 Minecraft 版本信息。')
    const loader = instance.loader.type
    return this.jobs.start(
      'mod',
      `安装模组 ${options.projectName}`,
      async (context) => {
        const versions = await this.getProjectVersions(
          options.platform,
          options.projectId,
          instance.mcVersion!,
          loader,
        )
        const version = options.versionId
          ? versions.find((v) => v.id === options.versionId || v.versionNumber === options.versionId)
          : versions[0]
        if (!version) throw new Error('没有找到适用于当前实例的模组版本。')
        if (!version.downloadUrl) throw new Error('该模组版本没有可下载文件，可能需要 CurseForge 官方下载权限。')
        context.report(10, `准备安装 ${version.fileName}…`)
        const seen = new Set<string>()
        await this.downloadModFile(instance, version.downloadUrl, version.fileName, context)
        if (options.installDependencies) {
          context.report(35, '解析前置依赖…')
          await this.installDependencies(
            instance,
            options.platform,
            version,
            context,
            seen,
            0,
            options.installDependencies,
          )
        }
        context.report(100, '模组安装完成')
        const mods = await listInstalledMods(instance.gameDir)
        const installed = mods.find((m) => m.fileName === version.fileName)
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'success',
            title: '模组已安装',
            message: installed ? `${installed.name} 已添加到 ${instance.name}。` : `${version.fileName} 已添加到 ${instance.name}。`,
            actionPage: 'mods',
          },
        })
        return { fileName: version.fileName }
      },
    )
  }

  installLocalMod(instanceId: string, filePath: string): JobProgress {
    const instance = this.requireInstance(instanceId)
    const fileName = path.basename(filePath)
    return this.jobs.start('mod', `安装本地模组 ${fileName}`, async (context) => {
      if (!/\.jar$/i.test(fileName)) throw new Error('请拖入 .jar 格式的模组文件。')
      const destination = path.join(instance.gameDir, 'mods', fileName)
      await ensureDir(path.dirname(destination))
      if (await exists(destination)) throw new Error(`mods 文件夹中已存在 ${fileName}。`)
      context.report(30, '复制模组文件…')
      await fs.copyFile(filePath, destination)
      context.report(100, '模组安装完成')
      appEvents.emitBamboo({
        type: 'toast',
        payload: {
          kind: 'success',
          title: '模组已添加',
          message: `${fileName} 已放入 ${instance.name}。`,
          actionPage: 'mods',
        },
      })
      return { fileName }
    })
  }

  private async installDependencies(
    instance: Instance,
    platform: ModPlatform,
    version: ModVersion,
    context: JobContext,
    seen: Set<string>,
    depth: number,
    installDependencies: boolean,
  ): Promise<void> {
    if (!installDependencies || depth > 3) return
    const required = version.dependencies.filter((d) => d.dependencyType === 'required')
    let index = 0
    for (const dependency of required) {
      index++
      const key = `${platform}:${dependency.projectId ?? ''}:${dependency.versionId ?? ''}`
      if (seen.has(key) || (!dependency.projectId && !dependency.versionId)) continue
      seen.add(key)
      context.report(
        35 + Math.min(45, (index / Math.max(1, required.length)) * 35),
        `安装前置依赖 ${index}/${required.length}…`,
      )
      try {
        if (platform === 'modrinth') {
          let depVersion: ModrinthVersion | undefined
          if (dependency.versionId) {
            depVersion = await fetchJson<ModrinthVersion>(
              `${MODRINTH}/version/${encodeURIComponent(dependency.versionId)}`,
              { timeoutMs: 20000 },
            ).catch(() => undefined)
          }
          if (!depVersion && dependency.projectId) {
            const query = new URLSearchParams({
              game_versions: JSON.stringify([instance.mcVersion ?? '']),
              loaders: JSON.stringify([instance.loader.type]),
            })
            const list = await fetchJson<ModrinthVersion[]>(
              `${MODRINTH}/project/${encodeURIComponent(dependency.projectId)}/version?${query.toString()}`,
              { timeoutMs: 20000 },
            ).catch(() => [])
            depVersion = list[0]
          }
          if (depVersion) {
            const file = depVersion.files.find((f) => f.primary) ?? depVersion.files[0]
            if (file) {
              await this.downloadModFile(instance, file.url, file.filename, context)
              const modVersion: ModVersion = {
                id: depVersion.id,
                name: depVersion.name,
                versionNumber: depVersion.version_number,
                gameVersions: depVersion.game_versions,
                loaders: depVersion.loaders,
                fileName: file.filename,
                downloadUrl: file.url,
                dependencies: depVersion.dependencies.map((dep) => ({
                  projectId: dep.project_id ?? undefined,
                  versionId: dep.version_id ?? undefined,
                  fileName: dep.file_name ?? undefined,
                  dependencyType: dep.dependency_type,
                  platform: 'modrinth',
                })),
              }
              await this.installDependencies(
                instance,
                'modrinth',
                modVersion,
                context,
                seen,
                depth + 1,
                true,
              )
            }
          }
        } else {
          if (!dependency.projectId) continue
          const depVersions = await this.getProjectVersions(
            'curseforge',
            dependency.projectId,
            instance.mcVersion ?? '',
            instance.loader.type,
          ).catch(() => [])
          const depVersion = depVersions[0]
          if (depVersion?.downloadUrl) {
            await this.downloadModFile(instance, depVersion.downloadUrl, depVersion.fileName, context)
          }
        }
      } catch (error) {
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'warning',
            title: '前置依赖安装失败',
            message: `${dependency.fileName ?? dependency.projectId}：${friendlyError(error)}`,
          },
        })
      }
    }
  }

  private async downloadModFile(
    instance: Instance,
    url: string,
    fileName: string,
    context: JobContext,
  ): Promise<void> {
    const safeName = path.basename(fileName).replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
    if (!safeName || !/\.(jar|zip|disabled)$/i.test(safeName)) {
      throw new Error(`不支持的文件类型：${fileName}`)
    }
    const modsDir = path.join(instance.gameDir, 'mods')
    await ensureDir(modsDir)
    const destination = path.join(modsDir, safeName)
    if (await exists(destination)) {
      context.report(50, `${safeName} 已存在，跳过下载。`)
      return
    }
    context.report(30, `下载 ${safeName}…`, { indeterminate: false })
    await downloadFile(url, destination, { timeoutMs: 180000 })
    if (!(await exists(destination))) throw new Error(`模组文件下载失败：${safeName}`)
  }

  private requireInstance(instanceId: string): Instance {
    const instance = this.store.getInstance(instanceId)
    if (!instance) throw new Error('实例不存在。')
    return instance
  }
}

function curseForgeCdnUrl(fileId: number, fileName: string): string {
  const id = String(fileId)
  if (id.length < 7) return ''
  return `https://edge.forgecdn.net/files/${id.slice(0, 4)}/${id.slice(4, 7)}/${encodeURIComponent(fileName)}`
}
