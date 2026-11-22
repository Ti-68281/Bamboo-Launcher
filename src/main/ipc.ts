import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { app, BrowserWindow, clipboard, dialog, ipcMain, shell } from 'electron'
import type {
  AppSettings,
  Bootstrap,
  CreateInstanceInput,
  InstallGameOptions,
  InstallLoaderOptions,
  InstallProjectOptions,
  OfflineLoginInput,
  SearchProjectsOptions,
  UpdateInstancePatch,
} from '../shared/types'
import type { AppStore } from './store'
import { JobManager } from './jobs'
import { AccountService } from './services/accounts'
import { JavaService } from './services/java'
import { CrashService } from './services/crash'
import { SkinBridgeService } from './services/skinBridge'
import { MinecraftService } from './services/minecraft'
import { ModService } from './services/mods'
import { ModpackService } from './services/modpacks'
import { NetworkService } from './services/network'
import { StatsService } from './services/stats'
import { UpdateService } from './services/update'
import { appEvents } from './events'
import { ensureDir, errorMessage, exists, friendlyError } from './utils'

export interface AppServices {
  store: AppStore
  jobs: JobManager
  accounts: AccountService
  java: JavaService
  crash: CrashService
  skinBridge: SkinBridgeService
  minecraft: MinecraftService
  mods: ModService
  modpacks: ModpackService
  network: NetworkService
  stats: StatsService
  update: UpdateService
}

export function createServices(store: AppStore): AppServices {
  const jobs = new JobManager()
  const accounts = new AccountService(store)
  const java = new JavaService(store)
  const crash = new CrashService(store)
  const skinBridge = new SkinBridgeService(store)
  const minecraft = new MinecraftService(store, jobs, accounts, java, crash, skinBridge)
  const mods = new ModService(store, jobs)
  const modpacks = new ModpackService(store, jobs, minecraft, mods)
  const network = new NetworkService()
  const stats = new StatsService(store)
  const update = new UpdateService(store, jobs)
  return { store, jobs, accounts, java, crash, skinBridge, minecraft, mods, modpacks, network, stats, update }
}

async function bootstrap(services: AppServices): Promise<Bootstrap> {
  const { store, accounts, minecraft, mods } = services
  const publicAccounts = await accounts.list()
  return {
    appVersion: app.getVersion(),
    platform: process.platform,
    dataRoot: store.paths.dataRoot,
    settings: store.settings,
    instances: store.instances,
    accounts: publicAccounts,
    activeInstanceId: store.state.activeInstanceId,
    activeAccountId: store.state.activeAccountId,
    running: minecraft.getRunning(),
    sessions: [...store.state.sessions].sort((a, b) => b.startedAt - a.startedAt).slice(0, 120),
    recentCrashes: store.state.crashes.slice(0, 12),
    hasCurseForgeKey: Boolean(mods.getCurseForgeKey()),
    microsoftClientIdConfigured: Boolean(
      store.settings.microsoftClientId.trim() || process.env.BAMBOO_MS_CLIENT_ID,
    ),
    javaCache: store.state.javaCache,
    totalPlayTimeMs: store.instances.reduce((sum, i) => sum + (i.playTimeMs ?? 0), 0),
  }
}

export function registerIpcHandlers(services: AppServices): void {
  const { store, jobs, accounts, java, crash, minecraft, mods, modpacks, network, stats, skinBridge, update } =
    services

  ipcMain.handle('bamboo:bootstrap', () => bootstrap(services))

  ipcMain.handle('bamboo:settings:update', async (_event, patch: Partial<AppSettings>) => {
    const current = store.settings
    const allowed: Array<keyof AppSettings> = [
      'theme',
      'glass',
      'reduceMotion',
      'compactSidebar',
      'downloadSource',
      'downloadConcurrency',
      'defaultMemoryMb',
      'defaultJvmProfile',
      'closeLauncherOnLaunch',
      'minimizeOnLaunch',
      'autoDownloadJava',
      'autoScanJava',
      'autoCheckUpdate',
      'microsoftClientId',
      'curseForgeEnabled',
      'showPlayTimeInTitle',
    ]
    for (const key of allowed) {
      if (!(key in patch)) continue
      const value = patch[key]
      if (value === undefined) continue
      ;(current as unknown as Record<string, unknown>)[key] = value
    }
    if (patch.features) {
      current.features = { ...current.features, ...patch.features }
    }
    if (patch.downloadConcurrency !== undefined) {
      current.downloadConcurrency = Math.max(2, Math.min(64, Number(patch.downloadConcurrency) || 12))
    }
    if (patch.defaultMemoryMb !== undefined) {
      current.defaultMemoryMb = Math.max(1024, Math.min(32768, Number(patch.defaultMemoryMb) || 4096))
    }
    if (patch.theme && !['bamboo', 'moss', 'moon'].includes(patch.theme)) current.theme = 'bamboo'
    if (patch.glass && !['clear', 'balanced', 'solid'].includes(patch.glass)) current.glass = 'balanced'
    await store.save()
    return current
  })

  ipcMain.handle('bamboo:active-instance', async (_event, id: string | null) => {
    store.state.activeInstanceId = id && store.getInstance(id) ? id : null
    await store.save()
  })

  ipcMain.handle('bamboo:active-account', async (_event, id: string | null) => {
    if (id && store.getAccount(id)) {
      store.state.activeAccountId = id
      for (const instance of store.instances) {
        if (!instance.accountId) instance.accountId = id
      }
      await store.save()
      appEvents.emitBamboo({ type: 'accounts-changed' })
    }
  })

  // Versions / instances
  ipcMain.handle('bamboo:versions', (_event, force?: boolean) => minecraft.listVersions(Boolean(force)))
  ipcMain.handle('bamboo:loader-versions', (_event, mcVersion: string, loader: InstallGameOptions['loader']) =>
    minecraft.listLoaderVersions(mcVersion, loader),
  )
  ipcMain.handle('bamboo:install-game', (_event, options: InstallGameOptions) => minecraft.installGame(options))
  ipcMain.handle('bamboo:install-loader', (_event, options: InstallLoaderOptions) =>
    minecraft.installLoader(options),
  )
  ipcMain.handle('bamboo:create-instance', async (_event, input: CreateInstanceInput) => {
    const instance = await minecraft.createInstanceFromExisting({
      name: input.name,
      mcVersion: input.mcVersion,
      loader: input.loader,
      loaderVersion: input.loaderVersion,
      versionId: await resolveVersionId(store, input),
    })
    store.state.activeInstanceId = instance.id
    await store.save()
    return instance
  })
  ipcMain.handle('bamboo:update-instance', (_event, id: string, patch: UpdateInstancePatch) =>
    minecraft.updateInstance(id, patch),
  )
  ipcMain.handle('bamboo:delete-instance', (_event, id: string) => minecraft.deleteInstance(id))
  ipcMain.handle('bamboo:open-instance-folder', (_event, id: string, sub?: string) => {
    const instance = store.getInstance(id)
    if (!instance) throw new Error('实例不存在。')
    const target = sub ? path.join(instance.gameDir, sub) : instance.gameDir
    return shell.openPath(target)
  })
  ipcMain.handle('bamboo:open-data-folder', () => shell.openPath(store.paths.dataRoot))

  // Accounts
  ipcMain.handle('bamboo:offline-login', (_event, input: OfflineLoginInput) => accounts.addOffline(input))
  ipcMain.handle('bamboo:ms-login-start', () => accounts.startMicrosoftLogin())
  ipcMain.handle('bamboo:ms-login-poll', (_event, flowId: string) => accounts.pollMicrosoftLogin(flowId))
  ipcMain.handle('bamboo:logout', async (_event, id: string) => {
    await accounts.logout(id)
    appEvents.emitBamboo({ type: 'accounts-changed' })
  })
  ipcMain.handle('bamboo:ms-refresh', async (_event, id: string) => {
    const account = await accounts.refreshMicrosoftAccount(id)
    appEvents.emitBamboo({ type: 'accounts-changed' })
    return account
  })
  ipcMain.handle('bamboo:skin-upload', async (_event, accountId: string) => {
    const result = await dialog.showOpenDialog({
      title: '选择 Minecraft 皮肤',
      properties: ['openFile'],
      filters: [{ name: 'PNG 皮肤', extensions: ['png'] }],
    })
    if (result.canceled || !result.filePaths[0]) return null
    const account = await accounts.saveSkin(accountId, result.filePaths[0], 'classic')
    appEvents.emitBamboo({ type: 'accounts-changed' })
    return account
  })
  ipcMain.handle(
    'bamboo:skin-save-path',
    async (_event, accountId: string, skinPath: string, model: 'classic' | 'slim') => {
      const account = await accounts.saveSkin(accountId, skinPath, model)
      appEvents.emitBamboo({ type: 'accounts-changed' })
      return account
    },
  )
  ipcMain.handle('bamboo:skin-model', async (_event, accountId: string, model: 'classic' | 'slim') => {
    const account = await accounts.setSkinModel(accountId, model)
    appEvents.emitBamboo({ type: 'accounts-changed' })
    return account
  })

  // Launch
  ipcMain.handle('bamboo:launch', (_event, id: string) => minecraft.launchGame(id))
  ipcMain.handle('bamboo:kill', (_event, id: string) => minecraft.killGame(id))

  // Java
  ipcMain.handle('bamboo:java-list', () => java.list(false))
  ipcMain.handle('bamboo:java-scan', () => java.scan())
  ipcMain.handle('bamboo:java-add', async () => {
    const result = await dialog.showOpenDialog({
      title: '选择 Java 安装目录或 java.exe',
      properties: ['openFile', 'openDirectory'],
      filters: process.platform === 'win32' ? [{ name: 'Java 可执行文件', extensions: ['exe'] }] : [],
    })
    if (result.canceled || !result.filePaths[0]) return null
    return java.addManual(result.filePaths[0])
  })
  ipcMain.handle('bamboo:java-download', (_event, major: number) => {
    if (![8, 16, 17, 21, 25].includes(major)) throw new Error('仅支持下载 Java 8 / 16 / 17 / 21 / 25。')
    return jobs.start('java', `下载 Java ${major}`, async (context) => {
      const runtime = await java.downloadJava(major, (progress, _total, detail) =>
        context.report(progress, detail),
      )
      appEvents.emitBamboo({
        type: 'toast',
        payload: {
          kind: 'success',
          title: 'Java 已就绪',
          message: `Java ${runtime.majorVersion}（${runtime.vendor}）已添加到 Java 管理。`,
          actionPage: 'java',
        },
      })
      return { path: runtime.path, major: runtime.majorVersion }
    })
  })

  // Mods
  ipcMain.handle('bamboo:mods-list', (_event, instanceId: string) => mods.installed(instanceId))
  ipcMain.handle('bamboo:mods-toggle', (_event, instanceId: string, fileName: string, enabled: boolean) =>
    mods.setEnabled(instanceId, fileName, enabled),
  )
  ipcMain.handle('bamboo:mods-delete', (_event, instanceId: string, fileName: string) =>
    mods.delete(instanceId, fileName),
  )
  ipcMain.handle('bamboo:projects-search', (_event, options: SearchProjectsOptions) =>
    mods.searchProjects(options),
  )
  ipcMain.handle(
    'bamboo:project-versions',
    (_event, platform: 'modrinth' | 'curseforge', projectId: string, mcVersion: string, loader: string) =>
      mods.getProjectVersions(platform, projectId, mcVersion, loader as never),
  )
  ipcMain.handle('bamboo:project-install', (_event, options: InstallProjectOptions) =>
    mods.installProject(options),
  )
  ipcMain.handle('bamboo:cf-key-set', (_event, key: string | null) => mods.setCurseForgeKey(key))
  ipcMain.handle('bamboo:cf-key-test', (_event, key?: string) => mods.testCurseForgeKey(key))

  // Modpacks & drag-drop
  ipcMain.handle('bamboo:modpack-inspect', (_event, filePath: string) => modpacks.inspect(filePath))
  ipcMain.handle('bamboo:modpack-install', (_event, filePath: string, name?: string) =>
    modpacks.install(filePath, name),
  )
  ipcMain.handle('bamboo:drop', async (_event, filePath: string) => {
    const ext = path.extname(filePath).toLowerCase()
    const activeInstance = store.activeInstance
    if (ext === '.jar') {
      if (!activeInstance) throw new Error('请先创建一个实例，再拖入模组。')
      return {
        kind: 'mod',
        message: `正在将 ${path.basename(filePath)} 安装到 ${activeInstance.name}`,
        job: mods.installLocalMod(activeInstance.id, filePath),
      }
    }
    if (ext === '.png') {
      const account = store.activeAccount
      if (!account) throw new Error('请先登录或创建账户，再拖入皮肤。')
      const job = jobs.start('skin', '设置离线皮肤', async (context) => {
        context.report(30, '校验皮肤尺寸与 PNG 数据…')
        await accounts.saveSkin(account.id, filePath, 'classic')
        context.report(100, '皮肤已更新')
        appEvents.emitBamboo({ type: 'accounts-changed' })
        return { accountId: account.id }
      })
      return { kind: 'skin', message: '正在校验并设置皮肤', job }
    }
    if (ext === '.zip' || ext === '.mrpack') {
      const info = await modpacks.inspect(filePath)
      const job = await modpacks.install(filePath)
      return {
        kind: 'modpack',
        message: `已识别 ${info.format === 'modrinth' ? 'Modrinth' : info.format === 'curseforge' ? 'CurseForge' : 'MultiMC'} 整合包「${info.name}」，正在自动安装`,
        job,
      }
    }
    throw new Error('无法识别拖入的文件。支持整合包 (.zip/.mrpack)、模组 (.jar) 和皮肤 (.png)。')
  })

  // Network
  ipcMain.handle('bamboo:network-info', (_event, port?: number | null) => network.getInfo(port))
  ipcMain.handle('bamboo:lan-discover', () => network.discover())
  ipcMain.handle('bamboo:port-map', (_event, port: number) => network.mapPort(port))
  ipcMain.handle('bamboo:port-unmap', (_event, port: number) => network.unmapPort(port))

  // Updates
  ipcMain.handle('bamboo:update-check', (_event, force?: boolean) => update.check(Boolean(force)))
  ipcMain.handle('bamboo:update-download', () => update.download())

  // Stats and crash diagnostics
  ipcMain.handle('bamboo:stats', () => stats.get())
  ipcMain.handle('bamboo:crashes-list', () => crash.list())
  ipcMain.handle('bamboo:crash-analyze', (_event, instanceId?: string, crashPath?: string) =>
    crash.analyze(instanceId, crashPath),
  )
  ipcMain.handle('bamboo:crash-open', async (_event, reportPath: string) => {
    if (!reportPath) throw new Error('没有崩溃报告路径。')
    const result = await shell.openPath(reportPath)
    if (result) throw new Error(result)
  })
  ipcMain.handle('bamboo:crash-clear', () => crash.clear())

  // Dialogs and shell
  ipcMain.handle('bamboo:choose-directory', async (_event, defaultPath?: string) => {
    const result = await dialog.showOpenDialog({
      title: '选择文件夹',
      defaultPath: defaultPath || store.paths.dataRoot,
      properties: ['openDirectory', 'createDirectory'],
    })
    return result.canceled ? null : result.filePaths[0] ?? null
  })
  ipcMain.handle(
    'bamboo:choose-file',
    async (_event, filters?: Array<{ name: string; extensions: string[] }>) => {
      const result = await dialog.showOpenDialog({
        title: '选择文件',
        properties: ['openFile'],
        filters: filters?.length ? filters : undefined,
      })
      return result.canceled ? null : result.filePaths[0] ?? null
    },
  )
  ipcMain.handle('bamboo:open-external', async (_event, url: string) => {
    const parsed = new URL(url)
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('不允许打开这个链接。')
    await shell.openExternal(url)
  })
  ipcMain.handle('bamboo:copy-text', (_event, text: string) => {
    clipboard.writeText(String(text))
  })

  // Window controls
  ipcMain.handle('bamboo:window-minimize', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize()
  })
  ipcMain.handle('bamboo:window-toggle-maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return false
    if (win.isMaximized()) win.unmaximize()
    else win.maximize()
    return win.isMaximized()
  })
  ipcMain.handle('bamboo:window-close', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close()
  })

  // Clean shutdown of local services is wired in index.ts.
  void skinBridge
}

async function resolveVersionId(store: AppStore, input: CreateInstanceInput): Promise<string> {
  if (input.loader === 'vanilla') {
    if (await exists(path.join(store.paths.versions, input.mcVersion, `${input.mcVersion}.json`))) {
      return input.mcVersion
    }
    throw new Error(`Minecraft ${input.mcVersion} 尚未安装。`)
  }
  const list = await fs.readdir(store.paths.versions, { withFileTypes: true }).catch(() => [])
  const candidates: string[] = []
  for (const entry of list) {
    if (!entry.isDirectory()) continue
    if (!entry.name.startsWith(input.mcVersion)) continue
    if (!entry.name.toLowerCase().includes(input.loader)) continue
    if (input.loaderVersion && !entry.name.includes(input.loaderVersion)) continue
    candidates.push(entry.name)
  }
  if (!candidates.length) {
    throw new Error(`没有找到已安装的 ${input.loader} ${input.loaderVersion ?? ''}，请先在下载页安装。`)
  }
  return candidates.sort().at(-1)!
}

export async function ensureDataDirs(store: AppStore): Promise<void> {
  for (const dir of [
    store.paths.shared,
    store.paths.instances,
    store.paths.java,
    store.paths.skins,
    store.paths.cache,
    store.paths.logs,
    store.paths.runtime,
    store.paths.versions,
  ]) {
    await ensureDir(dir)
  }
  void os
  void friendlyError
  void errorMessage
}
