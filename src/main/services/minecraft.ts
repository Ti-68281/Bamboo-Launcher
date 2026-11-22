import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { ChildProcess } from 'node:child_process'
import { shell } from 'electron'
import {
  createMinecraftProcessWatcher,
  launch,
  MinecraftFolder,
  Version,
} from '@xmcl/core'
import {
  getFabricLoaderArtifact,
  getLiteloaderVersionList,
  installDependenciesTask,
  installFabric,
  installForgeTask,
  installLiteloader,
  installNeoForged,
  installQuiltVersion,
  installTask,
} from '@xmcl/installer'
import type {
  Account,
  CrashAnalysis,
  GameVersionInfo,
  Instance,
  InstallGameOptions,
  InstallLoaderOptions,
  JavaRuntime,
  JobProgress,
  LanWorld,
  LaunchState,
  LoaderType,
  LoaderVersionOption,
  PlaySession,
  UpdateInstancePatch,
} from '../../shared/types'
import type { AppStore } from '../store'
import { JobManager, type JobContext } from '../jobs'
import { appEvents } from '../events'
import { AccountService } from './accounts'
import { JavaService } from './java'
import { CrashService } from './crash'
import { SkinBridgeService } from './skinBridge'
import {
  compareVersions,
  ensureDir,
  errorMessage,
  exists,
  fetchJson,
  fetchWithTimeout,
  friendlyError,
  newId,
  readJson,
  slugify,
} from '../utils'

interface VersionManifestEntry {
  id: string
  type: string
  url: string
  time: string
  releaseTime: string
}

interface VersionManifest {
  latest: { release: string; snapshot: string }
  versions: VersionManifestEntry[]
}

interface ForgeVersionMeta {
  version: string
  type: string
}

interface RunningGame {
  instanceId: string
  process: ChildProcess
  accountName: string
  startedAt: number
  sessionId: string
  lanTimer?: NodeJS.Timeout
  nativeExitHandled?: boolean
  intentionalStop?: boolean
}

interface AuthResult {
  accessToken: string
  uuid: string
  name: string
  userType: 'mojang'
  isMicrosoft: boolean
}

const FORGE_BASE = 'https://maven.minecraftforge.net'
const BMCL_BASE = 'https://bmclapi2.bangbang93.com'

export class MinecraftService {
  private manifestCache = new Map<string, { at: number; manifest: VersionManifest }>()
  private loaderListCache = new Map<string, { at: number; list: LoaderVersionOption[] }>()
  private running = new Map<string, RunningGame>()
  private launchStates = new Map<string, LaunchState>()
  private logs = new Map<string, string[]>()
  private skinBridges = new Map<string, { stop?: () => Promise<void> }>()

  constructor(
    private store: AppStore,
    private jobs: JobManager,
    private accounts: AccountService,
    private java: JavaService,
    private crash: CrashService,
    private skinBridge: SkinBridgeService,
  ) {}

  getRunning(): LaunchState[] {
    return Array.from(this.launchStates.values())
  }

  getRunningGame(instanceId: string): RunningGame | undefined {
    return this.running.get(instanceId)
  }

  private emitLaunch(state: LaunchState): void {
    this.launchStates.set(state.instanceId, state)
    appEvents.emitBamboo({ type: 'launch', payload: state })
  }

  private setLaunch(
    instance: Instance,
    accountName: string,
    phase: LaunchState['phase'],
    message: string,
    extra: Partial<LaunchState> = {},
  ): void {
    const previous = this.launchStates.get(instance.id)
    const state: LaunchState = {
      instanceId: instance.id,
      instanceName: instance.name,
      accountName,
      phase,
      message,
      startedAt: previous?.startedAt,
      pid: previous?.pid,
      windowReadyAt: previous?.windowReadyAt,
      ...extra,
    }
    this.emitLaunch(state)
  }

  // ------------------------------ Versions ------------------------------

  async listVersions(force = false): Promise<GameVersionInfo[]> {
    const manifest = await this.getManifest(force)
    const installed = new Set(await this.installedVersionIds())
    return manifest.versions.map((v) => ({
      id: v.id,
      type: v.type,
      releaseTime: v.releaseTime,
      url: v.url,
      installed: installed.has(v.id),
    }))
  }

  private async installedVersionIds(): Promise<string[]> {
    try {
      const entries = await fs.readdir(this.store.paths.versions, { withFileTypes: true })
      const result: string[] = []
      for (const entry of entries) {
        if (!entry.isDirectory()) continue
        if (await exists(path.join(this.store.paths.versions, entry.name, `${entry.name}.json`))) {
          result.push(entry.name)
        }
      }
      return result
    } catch {
      return []
    }
  }

  private async getManifest(force = false): Promise<VersionManifest> {
    const source = this.store.settings.downloadSource
    const cached = this.manifestCache.get(source)
    if (!force && cached && Date.now() - cached.at < 5 * 60_000) return cached.manifest
    const urls =
      source === 'bmclapi'
        ? [`${BMCL_BASE}/mc/game/version_manifest_v2.json`, 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json']
        : ['https://piston-meta.mojang.com/mc/game/version_manifest_v2.json', `${BMCL_BASE}/mc/game/version_manifest_v2.json`]
    let lastError: unknown
    for (const url of urls) {
      try {
        const manifest = await fetchJson<VersionManifest>(url, { timeoutMs: 30000 })
        if (!Array.isArray(manifest.versions)) throw new Error('版本清单格式异常')
        this.manifestCache.set(source, { at: Date.now(), manifest })
        return manifest
      } catch (error) {
        lastError = error
      }
    }
    throw new Error(`无法获取 Minecraft 版本清单：${friendlyError(lastError)}`)
  }

  private async getVersionMeta(id: string): Promise<VersionManifestEntry> {
    const manifest = await this.getManifest()
    const meta = manifest.versions.find((v) => v.id === id)
    if (!meta) throw new Error(`找不到 Minecraft 版本 ${id}。`)
    return meta
  }

  private downloadOptions() {
    const source = this.store.settings.downloadSource
    const concurrency = this.store.settings.downloadConcurrency
    if (source === 'bmclapi') {
      return {
        assetsHost: [`${BMCL_BASE}/assets`, 'https://resources.download.minecraft.net'],
        mavenHost: [`${BMCL_BASE}/maven`, 'https://libraries.minecraft.net'],
        librariesDownloadConcurrency: concurrency,
        assetsDownloadConcurrency: concurrency,
      }
    }
    return {
      assetsHost: ['https://resources.download.minecraft.net', `${BMCL_BASE}/assets`],
      mavenHost: ['https://libraries.minecraft.net', `${BMCL_BASE}/maven`],
      librariesDownloadConcurrency: concurrency,
      assetsDownloadConcurrency: concurrency,
    }
  }

  private coreDownloadOptions(versionId: string) {
    const source = this.store.settings.downloadSource
    const base = this.downloadOptions()
    if (source !== 'bmclapi') return base
    return {
      ...base,
      json: [`${BMCL_BASE}/version/${versionId}/json`],
      client: [`${BMCL_BASE}/version/${versionId}/client`],
    }
  }

  private runTask(
    task: { startAndWait: (context?: Record<string, unknown>) => Promise<unknown> },
    report: JobContext['report'],
    detail: string,
    progressRange: [number, number] = [0, 100],
  ): Promise<unknown> {
    return task.startAndWait({
      onUpdate(taskState: { progress: number; total: number; name?: string }) {
        const total = Number(taskState.total)
        if (Number.isFinite(total) && total > 0) {
          const percent =
            progressRange[0] + (progressRange[1] - progressRange[0]) * (taskState.progress / total)
          report(percent, `${detail} ${Math.round(percent)}%`)
        } else {
          // Keep the UI honest: no fake percentage when the downloader has no total.
        }
      },
    })
  }

  async listLoaderVersions(mcVersion: string, loader: LoaderType): Promise<LoaderVersionOption[]> {
    if (loader === 'vanilla') return []
    const cacheKey = `${loader}:${mcVersion}`
    const cached = this.loaderListCache.get(cacheKey)
    if (cached && Date.now() - cached.at < 10 * 60_000) return cached.list
    let list: LoaderVersionOption[] = []
    try {
      if (loader === 'fabric') {
        list = await this.listFabricLoaders(mcVersion)
      } else if (loader === 'quilt') {
        list = await this.listQuiltLoaders(mcVersion)
      } else if (loader === 'forge') {
        list = await this.listForgeLoaders(mcVersion)
      } else if (loader === 'neoforge') {
        list = await this.listNeoForgeLoaders(mcVersion)
      } else if (loader === 'liteloader') {
        list = await this.listLiteLoaderVersions(mcVersion)
      }
    } catch (error) {
      throw new Error(`无法获取 ${labelForLoader(loader)} 版本列表：${friendlyError(error)}`)
    }
    if (!list.length) {
      throw new Error(`没有找到适用于 Minecraft ${mcVersion} 的 ${labelForLoader(loader)} 版本。`)
    }
    this.loaderListCache.set(cacheKey, { at: Date.now(), list })
    return list
  }

  private async listFabricLoaders(mcVersion: string): Promise<LoaderVersionOption[]> {
    const data = await fetchJson<
      Array<{
        loader: { version: string; stable: boolean }
      }>
    >(`https://meta.fabricmc.net/v2/versions/loader/${encodeURIComponent(mcVersion)}`, {
      timeoutMs: 30000,
    })
    return data.slice(0, 60).map((item) => ({
      version: item.loader.version,
      label: `${item.loader.version}${item.loader.stable ? ' · 稳定' : ' · 测试'}`,
      stable: item.loader.stable,
    }))
  }

  private async listQuiltLoaders(mcVersion: string): Promise<LoaderVersionOption[]> {
    const data = await fetchJson<
      Array<{
        loader: { version: string; stable?: boolean }
      }>
    >(`https://meta.quiltmc.org/v3/versions/loader/${encodeURIComponent(mcVersion)}`, {
      timeoutMs: 30000,
    })
    return data.slice(0, 60).map((item) => ({
      version: item.loader.version,
      label: `${item.loader.version}${item.loader.stable ? ' · 稳定' : ''}`,
      stable: item.loader.stable,
    }))
  }

  private async listForgeLoaders(mcVersion: string): Promise<LoaderVersionOption[]> {
    let versions: ForgeVersionMeta[] = []
    try {
      const xml = await fetchWithTimeout(`${FORGE_BASE}/net/minecraftforge/forge/maven-metadata.xml`, {
        timeoutMs: 30000,
      }).then((r) => r.text())
      const all = Array.from(xml.matchAll(/<version>([^<]+)<\/version>/g)).map((m) => m[1])
      const prefix = `${mcVersion}-`
      versions = all
        .filter((v) => v.startsWith(prefix))
        .map((v) => ({ version: v.slice(prefix.length), type: 'common' }))
      const promotions = await fetchJson<{ promos: Record<string, string> }>(
        'https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json',
        { timeoutMs: 15000 },
      ).catch(() => ({ promos: {} as Record<string, string> }))
      const recommended = promotions.promos[`${mcVersion}-recommended`]
      const latest = promotions.promos[`${mcVersion}-latest`]
      const map = new Map<string, string>()
      for (const version of versions) map.set(version.version, 'common')
      if (latest) map.set(latest, 'latest')
      if (recommended) map.set(recommended, 'recommended')
      versions = Array.from(map.entries()).map(([version, type]) => ({ version, type }))
      versions.sort((a, b) => {
        const rank = (t: string) => (t === 'recommended' ? 0 : t === 'latest' ? 1 : 2)
        const rankDiff = rank(a.type) - rank(b.type)
        if (rankDiff !== 0) return rankDiff
        return compareVersions(b.version, a.version)
      })
    } catch {
      const data = await fetchWithTimeout(
        'https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json',
        { timeoutMs: 20000 },
      ).then((r) => r.json() as Promise<{ promos: Record<string, string> }>)
      const recommended = data.promos[`${mcVersion}-recommended`]
      const latest = data.promos[`${mcVersion}-latest`]
      versions = []
      if (recommended) versions.push({ version: recommended, type: 'recommended' })
      if (latest && latest !== recommended) versions.push({ version: latest, type: 'latest' })
    }
    if (!versions.length) {
      throw new Error(`Forge 官方仓库没有 ${mcVersion} 的安装包。`)
    }
    return versions.slice(0, 50).map((v) => ({
      version: v.version,
      label:
        v.type === 'recommended'
          ? `${v.version} · 推荐`
          : v.type === 'latest'
            ? `${v.version} · 最新`
            : v.version,
      recommended: v.type === 'recommended',
      stable: v.type !== 'latest',
    }))
  }

  private async listNeoForgeLoaders(mcVersion: string): Promise<LoaderVersionOption[]> {
    const xml = await fetchWithTimeout(
      'https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml',
      { timeoutMs: 30000 },
    ).then((r) => r.text())
    const all = Array.from(xml.matchAll(/<version>([^<]+)<\/version>/g)).map((m) => m[1])
    let prefix = ''
    if (mcVersion === '1.20.1') prefix = '47.'
    else {
      const match = mcVersion.match(/^1\.(\d+)(?:\.(\d+))?$/)
      if (!match) return []
      prefix = `${match[1]}.${match[2] ?? '0'}.`
    }
    const filtered = all.filter((v) => v.startsWith(prefix)).sort((a, b) => compareVersions(b, a))
    return filtered.slice(0, 50).map((version) => ({ version, label: version, stable: true }))
  }

  private async listLiteLoaderVersions(mcVersion: string): Promise<LoaderVersionOption[]> {
    const data = await getLiteloaderVersionList()
    const group = data.versions[mcVersion]
    const versions: LoaderVersionOption[] = []
    if (group?.release) {
      versions.push({ version: group.release.version, label: `${group.release.version} · 正式`, stable: true })
    }
    if (group?.snapshot) {
      versions.push({ version: group.snapshot.version, label: `${group.snapshot.version} · 快照`, stable: false })
    }
    return versions
  }

  // ------------------------------ Install ------------------------------

  async installGame(options: InstallGameOptions): Promise<JobProgress> {
    const title = `安装 Minecraft ${options.mcVersion}${options.loader !== 'vanilla' ? ` · ${labelForLoader(options.loader)}` : ''}`
    return this.jobs.start('game', title, async (context) => {
      let createdInstance: Instance | undefined
      try {
        const meta = await this.getVersionMeta(options.mcVersion)
        context.report(1, '读取版本信息…')
        await ensureDir(this.store.paths.shared)
        context.report(3, '开始下载游戏核心、资源与运行库…')
        const coreTask = installTask(meta, this.store.paths.shared, this.coreDownloadOptions(meta.id))
        await this.runTask(
          coreTask as unknown as { startAndWait: (context?: Record<string, unknown>) => Promise<unknown> },
          context.report,
          '下载游戏文件',
          [3, 72],
        )
        context.report(74, '游戏核心安装完成')
        let finalVersionId = meta.id
        let finalLoaderVersion = ''
        if (options.loader !== 'vanilla') {
          const loaderVersion = options.loaderVersion || (await this.listLoaderVersions(meta.id, options.loader))[0]?.version
          if (!loaderVersion) throw new Error('没有可用的加载器版本。')
          finalLoaderVersion = loaderVersion
          context.report(75, `准备安装 ${labelForLoader(options.loader)} ${loaderVersion}…`)
          const requiredJava = this.java.fallbackMajor(meta.id)
          const javaRuntime = await this.java.selectForInstance(
            options.javaPath,
            requiredJava,
            this.store.settings.autoDownloadJava,
            (progress, _total, detail) => {
              context.report(75 + progress * 0.1, detail)
            },
          )
          context.report(86, `正在安装 ${labelForLoader(options.loader)} ${loaderVersion}…`)
          finalVersionId = await this.installLoaderVersion(
            meta.id,
            options.loader,
            loaderVersion,
            javaRuntime,
            context,
            [86, 97],
          )
        }
        context.report(98, '正在创建实例…')
        if (options.createInstance !== false) {
          createdInstance = await this.createInstanceRecord({
            name: options.instanceName?.trim() || `${options.mcVersion} · Bamboo`,
            mcVersion: meta.id,
            loaderType: options.loader,
            loaderVersion: finalLoaderVersion,
            versionId: finalVersionId,
          })
          context.setMeta({ instanceId: createdInstance.id })
          appEvents.emitBamboo({ type: 'instances-changed' })
        }
        context.report(100, '安装完成，可以开始游戏了')
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'success',
            title: '安装完成',
            message: createdInstance ? `实例「${createdInstance.name}」已就绪。` : `${meta.id} 已安装。`,
            actionPage: createdInstance ? 'instances' : 'downloads',
          },
        })
        return { instanceId: createdInstance?.id, versionId: finalVersionId }
      } catch (error) {
        if (createdInstance) {
          this.store.state.instances = this.store.state.instances.filter((i) => i.id !== createdInstance!.id)
          await this.store.save()
        }
        throw new Error(friendlyError(error))
      }
    })
  }

  private async installLoaderVersion(
    mcVersion: string,
    loader: LoaderType,
    loaderVersion: string,
    javaRuntime: JavaRuntime,
    context: JobContext,
    range: [number, number],
  ): Promise<string> {
    const progress = (percent: number, detail: string) => {
      context.report(range[0] + ((range[1] - range[0]) * percent) / 100, detail)
    }
    if (loader === 'fabric') {
      const artifact = await getFabricLoaderArtifact(mcVersion, loaderVersion)
      const versionId = await installFabric(artifact, this.store.paths.shared)
      progress(70, '下载 Fabric 依赖库…')
      const resolved = await Version.parse(this.store.paths.shared, versionId)
      const task = installDependenciesTask(resolved, this.downloadOptions())
      await this.runTask(task as never, context.report, '下载加载器依赖', [range[0] + 5, range[1] - 1])
      progress(100, 'Fabric 安装完成')
      return versionId
    }
    if (loader === 'quilt') {
      progress(10, '生成 Quilt 启动配置…')
      const versionId = await installQuiltVersion({
        minecraftVersion: mcVersion,
        version: loaderVersion,
        minecraft: this.store.paths.shared,
      })
      const resolved = await Version.parse(this.store.paths.shared, versionId)
      const task = installDependenciesTask(resolved, this.downloadOptions())
      await this.runTask(task as never, context.report, '下载 Quilt 依赖', [range[0] + 8, range[1] - 1])
      progress(100, 'Quilt 安装完成')
      return versionId
    }
    if (loader === 'forge') {
      const fullVersion = `${mcVersion}-${loaderVersion}`
      const base =
        this.store.settings.downloadSource === 'bmclapi' ? `${BMCL_BASE}/maven` : FORGE_BASE
      const installerUrl = `${base}/net/minecraftforge/forge/${fullVersion}/forge-${fullVersion}-installer.jar`
      progress(5, `运行 Forge 安装器 ${loaderVersion}…`)
      const task = installForgeTask(
        {
          mcversion: mcVersion,
          version: loaderVersion,
          installer: { path: installerUrl },
        },
        this.store.paths.shared,
        {
          java: javaRuntime.path,
          mavenHost: [
            this.store.settings.downloadSource === 'bmclapi' ? `${BMCL_BASE}/maven` : FORGE_BASE,
            FORGE_BASE,
          ],
          librariesDownloadConcurrency: this.store.settings.downloadConcurrency,
        },
      )
      const versionId = (await this.runTask(
        task as never,
        context.report,
        '安装 Forge',
        [range[0] + 5, range[1] - 3],
      )) as string
      if (!versionId) throw new Error('Forge 安装器没有返回版本 ID。')
      progress(100, 'Forge 安装完成')
      return versionId
    }
    if (loader === 'neoforge') {
      progress(5, `运行 NeoForge 安装器 ${loaderVersion}…`)
      const versionId = await installNeoForged('neoforge', loaderVersion, this.store.paths.shared, {
        java: javaRuntime.path,
        mavenHost: ['https://maven.neoforged.net/releases'],
      })
      progress(100, 'NeoForge 安装完成')
      return versionId
    }
    if (loader === 'liteloader') {
      const data = await getLiteloaderVersionList()
      const group = data.versions[mcVersion]
      let meta = group?.release
      if (group?.snapshot?.version === loaderVersion) meta = group.snapshot
      if (!meta) {
        const all = [group?.release, group?.snapshot].filter(Boolean)
        meta = all.find((m) => m?.version === loaderVersion) ?? all[0]
      }
      if (!meta) throw new Error(`LiteLoader 不支持 Minecraft ${mcVersion}。`)
      progress(20, '安装 LiteLoader…')
      const versionId = await installLiteloader(meta, this.store.paths.shared, {
        versionId: `${mcVersion}-liteloader-${meta.version}`,
      })
      const resolved = await Version.parse(this.store.paths.shared, versionId)
      const task = installDependenciesTask(resolved, this.downloadOptions())
      await this.runTask(task as never, context.report, '下载 LiteLoader 依赖', [range[0] + 10, range[1] - 1])
      progress(100, 'LiteLoader 安装完成')
      return versionId
    }
    return mcVersion
  }

  /**
   * Provision a new instance for a modpack. The caller owns the outer job and
   * supplies a JobContext so modpack download progress stays in one task.
   */
  async provisionForModpack(
    mcVersion: string,
    loader: LoaderType,
    loaderVersion: string | undefined,
    name: string,
    context: JobContext,
  ): Promise<Instance> {
    const meta = await this.getVersionMeta(mcVersion)
    context.report(2, `下载 Minecraft ${mcVersion} 核心…`)
    const coreTask = installTask(meta, this.store.paths.shared, this.coreDownloadOptions(meta.id))
    await this.runTask(
      coreTask as unknown as { startAndWait: (context?: Record<string, unknown>) => Promise<unknown> },
      context.report,
      '下载游戏文件',
      [2, 45],
    )
    let finalVersionId = meta.id
    let finalLoaderVersion = loaderVersion ?? ''
    if (loader !== 'vanilla') {
      const versionToInstall =
        loaderVersion || (await this.listLoaderVersions(meta.id, loader))[0]?.version
      if (!versionToInstall) throw new Error(`${labelForLoader(loader)} 没有可用版本。`)
      finalLoaderVersion = versionToInstall
      context.report(47, `准备 ${labelForLoader(loader)} ${versionToInstall}…`)
      const javaRuntime = await this.java.selectForInstance(
        undefined,
        this.java.fallbackMajor(meta.id),
        this.store.settings.autoDownloadJava,
        (progress, _total, detail) => context.report(47 + progress * 0.05, detail),
      )
      finalVersionId = await this.installLoaderVersion(
        meta.id,
        loader,
        versionToInstall,
        javaRuntime,
        context,
        [52, 72],
      )
    }
    const instance = await this.createInstanceRecord({
      name,
      mcVersion,
      loaderType: loader,
      loaderVersion: finalLoaderVersion,
      versionId: finalVersionId,
    })
    appEvents.emitBamboo({ type: 'instances-changed' })
    return instance
  }

  async installLoader(options: InstallLoaderOptions): Promise<JobProgress> {
    const instance = this.store.getInstance(options.instanceId)
    if (!instance) throw new Error('实例不存在。')
    return this.jobs.start('loader', `为 ${instance.name} 安装 ${labelForLoader(options.loader)}`, async (context) => {
      if (!instance.mcVersion) throw new Error('实例缺少 Minecraft 版本信息。')
      const version = options.version || (await this.listLoaderVersions(instance.mcVersion, options.loader))[0]?.version
      if (!version) throw new Error('请选择一个加载器版本。')
      const javaRuntime = await this.java.selectForInstance(
        instance.javaPath,
        this.java.fallbackMajor(instance.mcVersion),
        this.store.settings.autoDownloadJava,
        (p, _t, detail) => context.report(p * 0.1, detail),
      )
      const versionId = await this.installLoaderVersion(
        instance.mcVersion,
        options.loader,
        version,
        javaRuntime,
        context,
        [10, 100],
      )
      instance.versionId = versionId
      instance.loader = { type: options.loader, version }
      instance.updatedAt = Date.now()
      await this.store.save()
      appEvents.emitBamboo({ type: 'instances-changed' })
      return { versionId }
    })
  }

  async createInstance(input: {
    name: string
    mcVersion: string
    loaderType: LoaderType
    loaderVersion: string
    versionId: string
  }): Promise<Instance> {
    return this.createInstanceRecord(input)
  }

  async createInstanceFromExisting(input: {
    name: string
    mcVersion: string
    loader: LoaderType
    loaderVersion?: string
    versionId: string
  }): Promise<Instance> {
    if (!(await exists(this.store.paths.versions))) throw new Error('游戏资源目录不可用。')
    const instance = await this.createInstanceRecord({
      name: input.name,
      mcVersion: input.mcVersion,
      loaderType: input.loader,
      loaderVersion: input.loaderVersion ?? '',
      versionId: input.versionId,
    })
    appEvents.emitBamboo({ type: 'instances-changed' })
    return instance
  }

  private async createInstanceRecord(input: {
    name: string
    mcVersion: string
    loaderType: LoaderType
    loaderVersion: string
    versionId: string
  }): Promise<Instance> {
    const id = newId('inst_').slice(0, 20)
    const dirName = `${slugify(input.name, 'instance')}-${id.slice(-6)}`
    const gameDir = path.join(this.store.paths.instances, dirName)
    for (const sub of ['mods', 'resourcepacks', 'shaderpacks', 'saves', 'config', 'logs', 'crash-reports']) {
      await ensureDir(path.join(gameDir, sub))
    }
    const available = Math.floor(os.totalmem() / 1024 / 1024)
    const memory = Math.max(1024, Math.min(this.store.settings.defaultMemoryMb, Math.max(1024, available - 2048)))
    const now = Date.now()
    const instance: Instance = {
      id,
      name: input.name || input.mcVersion,
      gameDir,
      versionId: input.versionId,
      mcVersion: input.mcVersion,
      loader: { type: input.loaderType, version: input.loaderVersion || undefined },
      accountId: this.store.state.activeAccountId ?? undefined,
      memoryMb: memory,
      minMemoryMb: 1024,
      jvmArgs: [],
      fullscreen: false,
      width: 1280,
      height: 720,
      playTimeMs: 0,
      lastSessionMs: 0,
      createdAt: now,
      updatedAt: now,
      icon: ['sprout', 'bamboo', 'panda', 'leaf'][Math.floor(Math.random() * 4)],
      notes: '',
      offlineSkin: true,
      autoInstallJava: true,
      jvmProfile: this.store.settings.defaultJvmProfile,
    }
    this.store.state.instances.unshift(instance)
    this.store.state.activeInstanceId = instance.id
    await this.store.save()
    return instance
  }

  async updateInstance(id: string, patch: UpdateInstancePatch): Promise<Instance> {
    const instance = this.store.getInstance(id)
    if (!instance) throw new Error('实例不存在。')
    if (patch.name !== undefined) instance.name = patch.name.trim() || instance.name
    if (patch.javaPath !== undefined) instance.javaPath = patch.javaPath || undefined
    if (patch.memoryMb !== undefined) {
      const max = Math.floor(os.totalmem() / 1024 / 1024)
      instance.memoryMb = Math.max(1024, Math.min(Number(patch.memoryMb) || 4096, max))
    }
    if (patch.minMemoryMb !== undefined) instance.minMemoryMb = Math.max(512, Math.min(Number(patch.minMemoryMb) || 1024, instance.memoryMb))
    if (patch.jvmArgs !== undefined) instance.jvmArgs = patch.jvmArgs.filter(Boolean)
    if (patch.fullscreen !== undefined) instance.fullscreen = Boolean(patch.fullscreen)
    if (patch.width !== undefined) instance.width = Math.max(640, Math.min(7680, Number(patch.width) || 1280))
    if (patch.height !== undefined) instance.height = Math.max(480, Math.min(4320, Number(patch.height) || 720))
    if (patch.jvmProfile !== undefined) instance.jvmProfile = patch.jvmProfile
    if (patch.notes !== undefined) instance.notes = patch.notes
    if (patch.offlineSkin !== undefined) instance.offlineSkin = Boolean(patch.offlineSkin)
    if (patch.autoInstallJava !== undefined) instance.autoInstallJava = Boolean(patch.autoInstallJava)
    if (patch.accountId !== undefined) instance.accountId = patch.accountId || undefined
    if (patch.icon !== undefined) instance.icon = patch.icon
    instance.updatedAt = Date.now()
    await this.store.save()
    appEvents.emitBamboo({ type: 'instances-changed' })
    return instance
  }

  async deleteInstance(id: string): Promise<void> {
    const instance = this.store.getInstance(id)
    if (!instance) return
    if (this.running.has(id)) throw new Error('实例正在运行，请先结束游戏。')
    this.store.state.instances = this.store.state.instances.filter((i) => i.id !== id)
    if (this.store.state.activeInstanceId === id) {
      this.store.state.activeInstanceId = this.store.state.instances[0]?.id ?? null
    }
    await this.store.save()
    try {
      if (await exists(instance.gameDir)) await shell.trashItem(instance.gameDir)
    } catch {
      // Keep the launcher consistent even if the recycle-bin operation fails.
    }
    appEvents.emitBamboo({ type: 'instances-changed' })
  }

  // ------------------------------ Launch ------------------------------

  async launchGame(instanceId: string): Promise<JobProgress> {
    const instance = this.store.getInstance(instanceId)
    if (!instance) throw new Error('实例不存在。')
    if (this.running.has(instanceId)) {
      throw new Error('这个实例已经在运行了。')
    }
    const account = this.resolveAccount(instance)
    if (!account) throw new Error('还没有账户，请先在账户面板中登录或创建离线账户。')
    const title = `启动 ${instance.name}`
    return this.jobs.start('game', title, async (context) => {
      try {
        this.setLaunch(instance, account.name, 'preparing', '检查游戏文件与 Java…', {
          startedAt: Date.now(),
        })
        context.report(3, '检查账户…')
        const auth = await this.accounts.getLaunchAuth(account.id)
        if (!instance.versionId) throw new Error('实例尚未绑定游戏版本。')
        const versionJson = path.join(this.store.paths.versions, instance.versionId, `${instance.versionId}.json`)
        if (!(await exists(versionJson))) {
          throw new Error(`游戏版本 ${instance.versionId} 尚未安装，请在「下载」页安装。`)
        }
        context.report(8, '解析版本与运行库…')
        const requiredMajor = await this.java.getJavaMajorForVersion(instance.versionId)
        const javaRuntime = await this.java.selectForInstance(
          instance.javaPath,
          requiredMajor,
          instance.autoInstallJava && this.store.settings.autoDownloadJava,
          (progress, _total, detail) => {
            this.setLaunch(instance, account.name, 'downloading', detail)
            context.report(8 + progress * 0.35, detail)
          },
        )
        context.report(45, `使用 Java ${javaRuntime.majorVersion} (${javaRuntime.vendor})`)
        const resolved = await Version.parse(this.store.paths.shared, instance.versionId)
        let authResult: AuthResult = auth
        if (!auth.isMicrosoft && instance.offlineSkin && account.skinFile) {
          context.report(50, '启动离线皮肤桥接…')
          try {
            const skinPath = path.join(this.store.paths.skins, account.skinFile)
            if (await exists(skinPath)) {
              const session = await this.skinBridge.startForAccount({
                accountId: account.id,
                uuid: account.uuid,
                name: account.name,
                skinPath,
                model: account.skin?.model ?? 'classic',
              })
              authResult = { ...auth, accessToken: session.accessToken }
              this.skinBridges.set(instance.id, {})
              ;(resolved as unknown as { bambooSkinBridge?: Record<string, string> }).bambooSkinBridge = {
                jar: session.jar,
                server: session.server,
              }
            }
          } catch (error) {
            appEvents.emitBamboo({
              type: 'toast',
              payload: {
                kind: 'warning',
                title: '离线皮肤未启用',
                message: `皮肤桥接失败，将以默认皮肤启动：${errorMessage(error)}`,
              },
            })
          }
        }
        this.setLaunch(instance, account.name, 'starting', '正在创建 Minecraft 进程…')
        context.report(78, '构建 JVM 启动参数…')
        const extraJVMArgs = buildJvmArgs(instance)
        const bridge = (resolved as unknown as {
          bambooSkinBridge?: { jar: string; server: string }
        }).bambooSkinBridge
        const gameProfile = { name: authResult.name, id: authResult.uuid }
        const process = await launch({
          gameProfile,
          accessToken: authResult.accessToken,
          userType: 'mojang',
          properties: {},
          launcherName: 'Bamboo',
          launcherBrand: 'Bamboo Launcher',
          versionType: 'Bamboo',
          gamePath: instance.gameDir,
          resourcePath: this.store.paths.shared,
          javaPath: javaRuntime.path,
          minMemory: instance.minMemoryMb,
          maxMemory: instance.memoryMb,
          version: resolved,
          extraJVMArgs,
          resolution: instance.fullscreen
            ? { fullscreen: true }
            : { width: instance.width, height: instance.height },
          extraExecOption: { cwd: instance.gameDir, windowsHide: false },
          yggdrasilAgent: bridge
            ? {
                jar: bridge.jar,
                server: bridge.server,
              }
            : undefined,
        })
        const session: RunningGame = {
          instanceId: instance.id,
          process,
          accountName: account.name,
          startedAt: Date.now(),
          sessionId: newId('session_'),
        }
        this.running.set(instance.id, session)
        this.attachWatcher(instance, session)
        this.attachStdout(instance, session)
        this.setLaunch(instance, account.name, 'starting', '游戏进程已创建，等待窗口出现…', {
          pid: process.pid,
        })
        context.report(100, '游戏已启动')
        return { pid: process.pid }
      } catch (error) {
        this.setLaunch(instance, account.name, 'error', friendlyError(error), {
          error: friendlyError(error),
        })
        throw error
      }
    })
  }

  private resolveAccount(instance: Instance): ReturnType<AppStore['getAccount']> {
    if (instance.accountId) {
      const account = this.store.getAccount(instance.accountId)
      if (account) return account
    }
    return this.store.activeAccount
  }

  private attachWatcher(instance: Instance, session: RunningGame): void {
    const watcher = createMinecraftProcessWatcher(session.process)
    watcher.on('minecraft-window-ready', () => {
      this.emitLaunch({
        instanceId: instance.id,
        instanceName: instance.name,
        accountName: session.accountName,
        phase: 'running',
        message: '游戏运行中',
        startedAt: session.startedAt,
        pid: session.process.pid,
        windowReadyAt: Date.now(),
      })
      appEvents.emit('game-running', { instanceId: instance.id })
    })
    watcher.on('error', (error) => {
      if (session.lanTimer) clearInterval(session.lanTimer)
      this.running.delete(instance.id)
      this.setLaunch(instance, session.accountName, 'error', `游戏进程启动失败：${errorMessage(error)}`, {
        error: errorMessage(error),
        exitCode: null,
      })
    })
    watcher.on('minecraft-exit', async (event) => {
      if (session.nativeExitHandled) return
      session.nativeExitHandled = true
      if (session.lanTimer) clearInterval(session.lanTimer)
      const endedAt = Date.now()
      const duration = Math.max(0, endedAt - session.startedAt)
      const crashed =
        !session.intentionalStop &&
        (Boolean(event.crashReport) || (typeof event.code === 'number' && event.code !== 0))
      this.running.delete(instance.id)
      this.skinBridges.delete(instance.id)
      if (this.skinBridges.size === 0) {
        // The local bridge does not need a running game, but keeping the server
        // alive makes subsequent launches instant. It is stopped on app quit.
      }
      const playSession: PlaySession = {
        id: session.sessionId,
        instanceId: instance.id,
        instanceName: instance.name,
        accountName: session.accountName,
        startedAt: session.startedAt,
        endedAt,
        durationMs: duration,
        exitCode: event.code,
        crashed,
      }
      instance.playTimeMs = (instance.playTimeMs ?? 0) + duration
      instance.lastSessionMs = duration
      instance.lastPlayedAt = endedAt
      this.store.state.sessions.push(playSession)
      if (this.store.state.sessions.length > 800) {
        this.store.state.sessions = this.store.state.sessions.slice(-800)
      }
      await this.store.save()
      if (crashed) {
        this.setLaunch(instance, session.accountName, 'crashed', '游戏崩溃了，正在分析原因…', {
          exitCode: event.code,
          error: `进程退出码 ${event.code ?? '未知'}`,
        })
        let analysis: CrashAnalysis | null = null
        try {
          analysis = await this.crash.analyze(
            instance.id,
            event.crashReportLocation || undefined,
            event.code,
          )
        } catch (error) {
          appEvents.emitBamboo({
            type: 'toast',
            payload: {
              kind: 'warning',
              title: '崩溃分析未找到报告',
              message: errorMessage(error),
            },
          })
        }
        this.setLaunch(instance, session.accountName, 'crashed', analysis?.reason ?? '游戏崩溃', {
          exitCode: event.code,
          error: analysis?.reason,
        })
        if (analysis) appEvents.emitBamboo({ type: 'crash', payload: analysis })
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'error',
            title: '游戏崩溃',
            message: analysis ? `${analysis.reason}，已生成分析报告。` : '游戏异常退出。',
            actionPage: 'crash',
          },
        })
      } else {
        this.setLaunch(instance, session.accountName, 'exited', '游戏已退出', {
          exitCode: event.code,
        })
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'info',
            title: '游戏已退出',
            message: `本次游玩 ${formatDuration(duration)}。`,
            actionPage: 'stats',
          },
        })
      }
      appEvents.emitBamboo({ type: 'instances-changed' })
    })
  }

  private attachStdout(instance: Instance, session: RunningGame): void {
    const lines: string[] = []
    this.logs.set(instance.id, lines)
    const scanner = (chunk: Buffer | string) => {
      const text = chunk.toString()
      for (const line of text.split(/\r?\n/)) {
        if (!line.trim()) continue
        lines.push(line)
        if (lines.length > 300) lines.shift()
        const lanMatch =
          line.match(/Started serving on port (\d+)/i) ??
          line.match(/Local game hosted on port (\d+)/i) ??
          line.match(/Listening on (?:port )?(\d+)/i)
        if (lanMatch) {
          const port = Number(lanMatch[1])
          if (port > 0) {
            const world: LanWorld = {
              motd: `${instance.name} 的本地世界`,
              port,
              address: primaryLocalIp(),
              lastSeen: Date.now(),
              source: 'log',
            }
            appEvents.emitBamboo({ type: 'lan-world', payload: world })
            appEvents.emit('internal-lan', world)
          }
        }
      }
    }
    session.process.stdout?.on('data', scanner)
    session.process.stderr?.on('data', scanner)
    session.lanTimer = setInterval(async () => {
      try {
        const logFile = path.join(instance.gameDir, 'logs', 'latest.log')
        const stat = await fs.stat(logFile).catch(() => null)
        if (!stat) return
        const data = await fs.readFile(logFile, 'utf8')
        const tail = data.slice(-16_000)
        const match =
          tail.match(/Started serving on port (\d+)/i) ??
          tail.match(/Local game hosted on port (\d+)/i) ??
          tail.match(/Listening on (?:port )?(\d+)/i)
        if (match) {
          const port = Number(match[1])
          if (port > 0) {
            const world: LanWorld = {
              motd: `${instance.name} 的本地世界`,
              port,
              address: primaryLocalIp(),
              lastSeen: Date.now(),
              source: 'log',
            }
            appEvents.emitBamboo({ type: 'lan-world', payload: world })
            appEvents.emit('internal-lan', world)
            if (session.lanTimer) clearInterval(session.lanTimer)
            session.lanTimer = undefined
          }
        }
      } catch {
        // The log may be rotated while the game is starting.
      }
    }, 2500)
    session.process.once('exit', () => {
      if (session.lanTimer) clearInterval(session.lanTimer)
    })
  }

  async killGame(instanceId: string): Promise<void> {
    const running = this.running.get(instanceId)
    if (!running) return
    running.intentionalStop = true
    running.process.kill()
    // On Windows, a child JVM process tree should be terminated through taskkill.
    if (process.platform === 'win32' && running.process.pid) {
      try {
        const { execFile } = await import('node:child_process')
        await new Promise<void>((resolve) => {
          execFile('taskkill', ['/PID', String(running.process.pid), '/T', '/F'], { windowsHide: true }, () => resolve())
        })
      } catch {
        // kill() above is enough for most cases.
      }
    }
  }
}

function buildJvmArgs(instance: Instance): string[] {
  const performance = [
    '-XX:+UseG1GC',
    '-XX:+ParallelRefProcEnabled',
    '-XX:MaxGCPauseMillis=200',
    '-XX:+UnlockExperimentalVMOptions',
    '-XX:+DisableExplicitGC',
    '-XX:+AlwaysPreTouch',
    '-XX:G1NewSizePercent=30',
    '-XX:G1MaxNewSizePercent=40',
    '-XX:G1HeapRegionSize=8M',
    '-XX:G1ReservePercent=20',
    '-XX:G1HeapWastePercent=5',
    '-XX:G1MixedGCCountTarget=4',
    '-XX:InitiatingHeapOccupancyPercent=15',
    '-XX:G1MixedGCLiveThresholdPercent=90',
    '-XX:G1RSetUpdatingPauseTimePercent=5',
    '-XX:SurvivorRatio=32',
    '-XX:+PerfDisableSharedMem',
    '-XX:MaxTenuringThreshold=1',
  ]
  const balanced = [
    '-XX:+UseG1GC',
    '-XX:+ParallelRefProcEnabled',
    '-XX:MaxGCPauseMillis=200',
    '-XX:+UnlockExperimentalVMOptions',
    '-XX:+DisableExplicitGC',
  ]
  let args: string[]
  switch (instance.jvmProfile) {
    case 'performance':
      args = [...performance]
      break
    case 'compatibility':
      args = []
      break
    case 'custom':
      args = [...instance.jvmArgs]
      break
    default:
      args = [...balanced]
  }
  if (instance.jvmProfile !== 'custom') args.push(...instance.jvmArgs)
  args.push('-Dfile.encoding=UTF-8')
  return Array.from(new Set(args))
}

function labelForLoader(loader: LoaderType): string {
  const labels: Record<LoaderType, string> = {
    vanilla: '原版',
    forge: 'Forge',
    fabric: 'Fabric',
    quilt: 'Quilt',
    neoforge: 'NeoForge',
    liteloader: 'LiteLoader',
  }
  return labels[loader]
}

function primaryLocalIp(): string {
  const interfaces = os.networkInterfaces()
  for (const entries of Object.values(interfaces)) {
    if (!entries) continue
    for (const entry of entries) {
      if (entry.family === 'IPv4' && !entry.internal) return entry.address
    }
  }
  return '127.0.0.1'
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  if (minutes < 60) return `${minutes} 分钟`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `${hours} 小时 ${rest} 分钟`
}
