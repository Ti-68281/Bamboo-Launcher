import type {
  Account,
  AppSettings,
  BambooApi,
  BambooEvent,
  Bootstrap,
  CrashAnalysis,
  GameVersionInfo,
  InstalledMod,
  Instance,
  JavaRuntime,
  JobProgress,
  ModProject,
  ModVersion,
  NetworkInfo,
  PlaySession,
  StatsOverview,
} from '@shared/types'
import skinUrl from './assets/sample-skin.png?url'

const now = Date.now()
const DAY = 86_400_000

let skinDataUrl: string | undefined
const mockListeners = new Set<(event: BambooEvent) => void>()

function emitMock(event: BambooEvent) {
  for (const listener of mockListeners) listener(event)
}

async function loadSkin(): Promise<string | undefined> {
  if (skinDataUrl) return skinDataUrl
  try {
    const response = await fetch(skinUrl)
    const blob = await response.blob()
    skinDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
    return skinDataUrl
  } catch {
    return undefined
  }
}

function makeSession(instance: Instance, daysAgo: number, minutes: number, crashed = false): PlaySession {
  const startedAt = now - daysAgo * DAY - 3 * 3_600_000
  return {
    id: `mock_session_${instance.id}_${daysAgo}_${minutes}`,
    instanceId: instance.id,
    instanceName: instance.name,
    accountName: '竹间风',
    startedAt,
    endedAt: startedAt + minutes * 60_000,
    durationMs: minutes * 60_000,
    exitCode: crashed ? 1 : 0,
    crashed,
  }
}

const settings: AppSettings = {
  theme: 'bamboo',
  glass: 'balanced',
  reduceMotion: false,
  compactSidebar: false,
  features: {
    mods: true,
    modpacks: true,
    multiplayer: true,
    skins: true,
    stats: true,
    java: true,
    crash: true,
  },
  downloadSource: 'official',
  downloadConcurrency: 12,
  defaultMemoryMb: 6144,
  defaultJvmProfile: 'balanced',
  closeLauncherOnLaunch: false,
  minimizeOnLaunch: false,
  autoDownloadJava: true,
  autoScanJava: true,
  autoCheckUpdate: true,
  microsoftClientId: '',
  curseForgeEnabled: false,
  showPlayTimeInTitle: true,
  language: 'zh-CN',
  dataRoot: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data',
}

const instances: Instance[] = [
  {
    id: 'inst_bamboo_1',
    name: '竹影生存',
    gameDir: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\bamboo-survival',
    versionId: 'fabric-loader-0.16.10-1.21.4',
    mcVersion: '1.21.4',
    loader: { type: 'fabric', version: '0.16.10' },
    accountId: 'acc_offline_1',
    memoryMb: 6144,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1280,
    height: 720,
    playTimeMs: 76 * 3_600_000 + 24 * 60_000,
    lastSessionMs: 2 * 3_600_000 + 13 * 60_000,
    createdAt: now - 80 * DAY,
    updatedAt: now - 1 * DAY,
    lastPlayedAt: now - 1 * DAY,
    icon: 'bamboo',
    notes: '主世界生存，少量优化模组。',
    offlineSkin: true,
    autoInstallJava: true,
    jvmProfile: 'balanced',
  },
  {
    id: 'inst_forge_1',
    name: '机械竹林',
    gameDir: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\mechanical-bamboo',
    versionId: '1.20.1-forge-47.2.0',
    mcVersion: '1.20.1',
    loader: { type: 'forge', version: '47.2.0' },
    accountId: 'acc_offline_1',
    memoryMb: 8192,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1600,
    height: 900,
    playTimeMs: 41 * 3_600_000 + 8 * 60_000,
    lastSessionMs: 3 * 3_600_000,
    createdAt: now - 52 * DAY,
    updatedAt: now - 5 * DAY,
    lastPlayedAt: now - 5 * DAY,
    icon: 'sprout',
    notes: 'Create 整合包测试。',
    offlineSkin: true,
    autoInstallJava: true,
    jvmProfile: 'performance',
  },
  {
    id: 'inst_vanilla_1',
    name: '原版·月下',
    gameDir: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\vanilla-moon',
    versionId: '1.21.4',
    mcVersion: '1.21.4',
    loader: { type: 'vanilla' },
    accountId: 'acc_ms_1',
    memoryMb: 4096,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1280,
    height: 720,
    playTimeMs: 12 * 3_600_000 + 45 * 60_000,
    lastSessionMs: 45 * 60_000,
    createdAt: now - 20 * DAY,
    updatedAt: now - 9 * DAY,
    lastPlayedAt: now - 9 * DAY,
    icon: 'leaf',
    notes: '',
    offlineSkin: false,
    autoInstallJava: true,
    jvmProfile: 'balanced',
  },
]

const sessions: PlaySession[] = [
  makeSession(instances[0], 0, 132),
  makeSession(instances[1], 1, 84),
  makeSession(instances[0], 2, 45),
  makeSession(instances[2], 3, 26),
  makeSession(instances[0], 4, 168),
  makeSession(instances[1], 5, 62),
  makeSession(instances[0], 6, 38),
  makeSession(instances[0], 9, 120),
  makeSession(instances[1], 12, 90),
]

const javaCache: JavaRuntime[] = [
  {
    id: 'java_21',
    path: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\java\\mojang\\java-runtime-delta\\bin\\java.exe',
    version: '21.0.5',
    majorVersion: 21,
    vendor: 'Mojang',
    source: 'downloaded',
    architecture: 'x64',
    addedAt: now - 40 * DAY,
  },
  {
    id: 'java_17',
    path: 'C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.12.7-hotspot\\bin\\java.exe',
    version: '17.0.12',
    majorVersion: 17,
    vendor: 'Eclipse Temurin',
    source: 'auto',
    architecture: 'x64',
    addedAt: now - 60 * DAY,
  },
  {
    id: 'java_8',
    path: 'C:\\Program Files\\Java\\jre1.8.0_431\\bin\\java.exe',
    version: '1.8.0_431',
    majorVersion: 8,
    vendor: 'Oracle',
    source: 'auto',
    architecture: 'x64',
    addedAt: now - 70 * DAY,
  },
]

let accounts: Account[] = [
  {
    id: 'acc_offline_1',
    type: 'offline',
    name: '竹间风',
    uuid: '7d7c7b6f6d6f4a7db9d8c1b2a3d4e5f6',
    createdAt: now - 80 * DAY,
    skin: { model: 'classic', dataUrl: '', updatedAt: now - 2 * DAY },
  },
  {
    id: 'acc_ms_1',
    type: 'microsoft',
    name: 'BambooLeaf',
    uuid: '2b1a9c8d7e6f5a4b3c2d1e0f9a8b7c6d',
    createdAt: now - 30 * DAY,
    skin: { model: 'classic', dataUrl: '', updatedAt: now - 1 * DAY },
  },
]

const crash: CrashAnalysis = {
  id: 'crash_mock_1',
  instanceId: 'inst_forge_1',
  instanceName: '机械竹林',
  createdAt: now - 5 * DAY,
  severity: 'high',
  reason: '模组之间或模组与加载器版本不兼容',
  summary:
    '崩溃描述：Rendering overlay\\n异常：java.lang.NoSuchMethodError: net.minecraft.class_332.method_1234\\n可能相关的模组：Create、JEI',
  likelyMods: [
    { name: 'Create', id: 'create', fileName: 'create-1.20.1-0.5.1.f.jar' },
    { name: 'Just Enough Items', id: 'jei', fileName: 'jei-1.20.1-forge-15.2.0.27.jar' },
  ],
  suggestions: [
    '先备份存档，然后逐批禁用最近添加的模组，定位冲突源。',
    '检查最近更新的模组，并安装对应 Minecraft 1.20.1 的版本。',
    '确认 Forge 加载器版本与模组要求一致。',
  ],
  exception: 'java.lang.NoSuchMethodError: net.minecraft.class_332.method_1234',
  reportPath: 'C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\mechanical-bamboo\\crash-reports\\crash-2026-10-20_21.32.11-client.txt',
  logExcerpt:
    'Description: Rendering overlay\njava.lang.NoSuchMethodError: net.minecraft.class_332.method_1234\n\tat com.simibubi.create.CreateClient.onRender(CreateClient.java:112)\n\tat net.minecraft.class_332.handler(class_332.java:221)',
  exitCode: 1,
}

const mods: InstalledMod[] = [
  {
    fileName: 'fabric-api-0.110.5+1.21.4.jar',
    path: '',
    name: 'Fabric API',
    version: '0.110.5+1.21.4',
    modId: 'fabric-api',
    description: 'Fabric 生态的核心前置与常用接口。',
    authors: ['FabricMC'],
    enabled: true,
    size: 2_231_334,
    loaderHint: 'fabric',
  },
  {
    fileName: 'sodium-fabric-0.6.5+mc1.21.4.jar',
    path: '',
    name: 'Sodium',
    version: '0.6.5',
    modId: 'sodium',
    description: '现代化的渲染优化模组，大幅提升帧率。',
    authors: ['Caffeine MC'],
    enabled: true,
    size: 1_110_233,
    loaderHint: 'fabric',
  },
  {
    fileName: 'iris-fabric-1.8.8+mc1.21.4.jar',
    path: '',
    name: 'Iris Shaders',
    version: '1.8.8',
    modId: 'iris',
    description: '让 Minecraft 支持光影包。',
    authors: ['IrisShaders'],
    enabled: true,
    size: 1_983_112,
    loaderHint: 'fabric',
  },
  {
    fileName: 'xaeros-minimap-fabric-25.1.0.jar',
    path: '',
    name: "Xaero's Minimap",
    version: '25.1.0',
    modId: 'xaerominimap',
    description: '轻量的小地图与路径点。',
    authors: ['Xaero'],
    enabled: false,
    size: 634_111,
    loaderHint: 'fabric',
  },
]

let bootstrap: Bootstrap = {
  appVersion: '1.0.1',
  platform: 'win32',
  dataRoot: settings.dataRoot,
  settings,
  instances,
  accounts,
  activeInstanceId: instances[0].id,
  activeAccountId: accounts[0].id,
  running: [],
  sessions,
  recentCrashes: [crash],
  hasCurseForgeKey: false,
  microsoftClientIdConfigured: false,
  javaCache,
  totalPlayTimeMs: instances.reduce((sum, item) => sum + item.playTimeMs, 0),
}

const versions: GameVersionInfo[] = [
  ...['1.21.5', '1.21.4', '1.21.3', '1.21.1', '1.21', '1.20.6', '1.20.4', '1.20.1', '1.19.4', '1.18.2', '1.17.1', '1.16.5', '1.12.2', '1.8.9', '1.7.10'].map(
    (id, index) => ({
      id,
      type: 'release',
      releaseTime: new Date(now - index * 24 * DAY * 12).toISOString(),
      url: '',
      installed: ['1.21.4', '1.20.1', '1.12.2'].includes(id),
    }),
  ),
  ...['24w46a', '24w45a', '24w44a'].map((id, index) => ({
    id,
    type: 'snapshot',
    releaseTime: new Date(now - index * 7 * DAY).toISOString(),
    url: '',
    installed: false,
  })),
]

const foundProjects: ModProject[] = [
  {
    id: 'sodium',
    platform: 'modrinth',
    slug: 'sodium',
    name: 'Sodium',
    summary: '现代化、极速的 Minecraft 渲染引擎。在不改变原版外观的前提下大幅提升帧率。',
    author: 'CaffeineMC',
    downloads: 48_000_000,
    follows: 92_000,
    categories: ['optimization', 'fabric'],
    gameVersions: ['1.21.4', '1.21.1'],
    loaders: ['fabric'],
    iconUrl: '',
  },
  {
    id: 'iris',
    platform: 'modrinth',
    slug: 'iris',
    name: 'Iris Shaders',
    summary: '让 Minecraft 支持光影包，兼容 OptiFine 光影并保持出色的性能。',
    author: 'IrisShaders',
    downloads: 18_000_000,
    follows: 45_000,
    categories: ['shaders', 'fabric'],
    gameVersions: ['1.21.4'],
    loaders: ['fabric'],
  },
  {
    id: 'fabric-api',
    platform: 'modrinth',
    slug: 'fabric-api',
    name: 'Fabric API',
    summary: 'Fabric 模组生态的核心前置库，几乎所有 Fabric 模组都需要它。',
    author: 'FabricMC',
    downloads: 120_000_000,
    follows: 71_000,
    categories: ['library', 'fabric'],
    gameVersions: ['1.21.4'],
    loaders: ['fabric'],
  },
  {
    id: 'jei',
    platform: 'modrinth',
    slug: 'jei',
    name: 'Just Enough Items',
    summary: '查看物品与配方，是模组生存中不可或缺的物品浏览器。',
    author: 'mezz',
    downloads: 92_000_000,
    follows: 88_000,
    categories: ['utility', 'forge'],
    gameVersions: ['1.21.4'],
    loaders: ['fabric', 'forge', 'neoforge'],
  },
  {
    id: 'create',
    platform: 'modrinth',
    slug: 'create',
    name: 'Create',
    summary: '让机械、齿轮与自动化成为可能的大型科技模组，拥有极高的美观度。',
    author: 'simibubi',
    downloads: 35_000_000,
    follows: 65_000,
    categories: ['technology', 'forge', 'neoforge'],
    gameVersions: ['1.21.4'],
    loaders: ['forge', 'neoforge', 'fabric'],
  },
  {
    id: 'modmenu',
    platform: 'modrinth',
    slug: 'mod-menu',
    name: 'Mod Menu',
    summary: '在游戏内查看、配置与启用 Fabric 模组。',
    author: 'Terraformers',
    downloads: 54_000_000,
    follows: 31_000,
    categories: ['utility', 'fabric'],
    gameVersions: ['1.21.4'],
    loaders: ['fabric'],
  },
]

function fakeJob(kind: JobProgress['kind'], title: string): JobProgress {
  return {
    id: `mock_job_${Date.now()}`,
    kind,
    title,
    detail: '演示模式：这是静态预览。',
    progress: 0,
    indeterminate: true,
    status: 'running',
    startedAt: Date.now(),
  }
}

const base: Partial<BambooApi> = {
  bootstrap: async () => {
    const skin = await loadSkin()
    if (skin) {
      accounts = accounts.map((account) => ({
        ...account,
        skin: account.skin ? { ...account.skin, dataUrl: skin } : undefined,
      }))
    }
    bootstrap = { ...bootstrap, accounts }
    return structuredClone(bootstrap)
  },
  refreshBootstrap: async () => base.bootstrap!(),
  updateSettings: async (patch) => {
    bootstrap.settings = {
      ...bootstrap.settings,
      ...patch,
      features: { ...bootstrap.settings.features, ...(patch.features ?? {}) },
    }
    settings.features = bootstrap.settings.features
    return bootstrap.settings
  },
  setActiveInstance: async (id) => {
    bootstrap.activeInstanceId = id
  },
  setActiveAccount: async (id) => {
    bootstrap.activeAccountId = id
  },
  listVersions: async () => versions,
  listLoaderVersions: async (_mc, loader) =>
    loader === 'vanilla'
      ? []
      : [
          { version: '0.16.10', label: '0.16.10 · 稳定', stable: true },
          { version: '0.16.9', label: '0.16.9 · 稳定', stable: true },
        ],
  installGame: async () => fakeJob('game', '安装 Minecraft'),
  createInstance: async () => instances[0],
  installLoader: async () => fakeJob('loader', '安装加载器'),
  deleteInstance: async () => undefined,
  updateInstance: async () => instances[0],
  openInstanceFolder: async () => undefined,
  openDataFolder: async () => undefined,
  addOfflineAccount: async (input) => {
    const account: Account = {
      id: `acc_${Date.now()}`,
      type: 'offline',
      name: input.name,
      uuid: crypto.randomUUID().replace(/-/g, ''),
      createdAt: Date.now(),
    }
    accounts = [...accounts, account]
    bootstrap.accounts = accounts
    return account
  },
  startMicrosoftLogin: async () => {
    throw new Error('演示模式不支持 Microsoft 登录。')
  },
  pollMicrosoftLogin: async () => null,
  logoutAccount: async () => undefined,
  refreshMicrosoftAccount: async () => accounts[0],
  chooseAndUploadSkin: async () => null,
  saveSkinFromPath: async () => accounts[0],
  setSkinModel: async (_id, model) => ({ ...accounts[0], skin: accounts[0].skin ? { ...accounts[0].skin, model } : undefined }),
  launch: async (instanceId) => {
    const instance = instances.find((item) => item.id === instanceId) ?? instances[0]
    const job: JobProgress = {
      id: `mock_launch_${Date.now()}`,
      kind: 'game',
      title: `启动 ${instance.name}`,
      detail: '检查账户…',
      progress: 3,
      indeterminate: false,
      status: 'running',
      startedAt: Date.now(),
    }
    const base = {
      instanceId: instance.id,
      instanceName: instance.name,
      accountName: accounts[0]?.name ?? '竹间风',
    }
    emitMock({ type: 'job', payload: job })
    emitMock({
      type: 'launch',
      payload: { ...base, phase: 'preparing', message: '检查游戏文件与 Java…', startedAt: Date.now() },
    })
    const timers = [
      setTimeout(() => {
        emitMock({ type: 'launch', payload: { ...base, phase: 'preparing', message: '正在解析运行库…', startedAt: Date.now() } })
        emitMock({ type: 'job', payload: { ...job, progress: 18, detail: '检查账户与运行库…' } })
      }, 500),
      setTimeout(() => {
        emitMock({ type: 'launch', payload: { ...base, phase: 'downloading', message: '正在准备资源文件…', startedAt: Date.now() } })
        emitMock({ type: 'job', payload: { ...job, progress: 46, detail: '解析版本与运行库…' } })
      }, 1100),
      setTimeout(() => {
        emitMock({ type: 'launch', payload: { ...base, phase: 'starting', message: '正在创建 Minecraft 进程…', startedAt: Date.now() } })
        emitMock({ type: 'job', payload: { ...job, progress: 82, detail: '构建 JVM 启动参数…' } })
      }, 1800),
      setTimeout(() => {
        emitMock({
          type: 'launch',
          payload: {
            ...base,
            phase: 'running',
            message: '游戏已启动',
            startedAt: Date.now() - 1800,
            windowReadyAt: Date.now(),
            pid: 12345,
          },
        })
        emitMock({ type: 'job', payload: { ...job, status: 'success', progress: 100, detail: '启动完成', finishedAt: Date.now() } })
      }, 2600),
    ]
    void timers
    return job
  },
  killGame: async () => undefined,
  listJava: async () => javaCache,
  scanJava: async () => javaCache,
  addJava: async () => null,
  downloadJava: async () => fakeJob('java', '下载 Java'),
  getInstalledMods: async () => mods,
  setModEnabled: async (_id, fileName, enabled) => {
    const index = mods.findIndex((m) => m.fileName === fileName)
    if (index >= 0) mods[index] = { ...mods[index], enabled }
    return mods
  },
  deleteMod: async (_id, fileName) => mods.filter((m) => m.fileName !== fileName),
  searchProjects: async (options) => ({
    projects: foundProjects.filter(
      (project) => options.platform === 'modrinth' || options.platform === 'curseforge',
    ),
    total: foundProjects.length,
    needsApiKey: options.platform === 'curseforge',
    error: options.platform === 'curseforge' ? '演示模式未接入 CurseForge。' : undefined,
  }),
  getProjectVersions: async (_platform, projectId) => [
    {
      id: `${projectId}-1`,
      name: '最新版本',
      versionNumber: '1.0.0',
      gameVersions: ['1.21.4'],
      loaders: ['fabric'],
      fileName: `${projectId}-1.0.0.jar`,
      downloadUrl: '',
      dependencies: [],
    },
  ],
  installProject: async () => fakeJob('mod', '安装模组'),
  setCurseForgeKey: async () => ({ configured: false }),
  testCurseForgeKey: async () => ({ ok: false, message: '演示模式不可用。' }),
  inspectModpack: async () => {
    throw new Error('演示模式不支持读取本地文件。')
  },
  installModpack: async () => fakeJob('modpack', '安装整合包'),
  handleDrop: async () => ({ kind: 'unknown', message: '演示模式不处理文件。' }),
  getNetworkInfo: async () => ({
    hostname: 'BAMBOO-PC',
    localIps: ['192.168.31.86'],
    primaryIp: '192.168.31.86',
    port: 52341,
    upnpMessage: undefined,
    worlds: [
      { motd: '竹影生存 · 欢迎', port: 52341, address: '192.168.31.86', lastSeen: Date.now(), source: 'broadcast' },
    ],
  } satisfies NetworkInfo),
  discoverLanWorlds: async () => [
    { motd: '竹影生存 · 欢迎', port: 52341, address: '192.168.31.86', lastSeen: Date.now(), source: 'broadcast' },
  ],
  mapPort: async () => {
    throw new Error('演示模式无法访问路由器。')
  },
  unmapPort: async () => undefined,
  checkForUpdates: async () => ({
    currentVersion: '1.0.1',
    latestVersion: '1.0.1',
    available: false,
    source: 'github',
    releaseUrl: 'https://github.com/Ti-68281/Bamboo-Launcher/releases',
    checkedAt: Date.now(),
  }),
  downloadUpdate: async () => fakeJob('other', '下载更新'),
  getStats: async () =>
    ({
      totalPlayTimeMs: bootstrap.totalPlayTimeMs,
      todayPlayTimeMs: 132 * 60_000,
      weekPlayTimeMs: 555 * 60_000,
      sessions,
      byInstance: instances.map((instance) => ({
        instanceId: instance.id,
        name: instance.name,
        playTimeMs: instance.playTimeMs,
        launches: sessions.filter((s) => s.instanceId === instance.id).length,
        lastPlayedAt: instance.lastPlayedAt,
      })),
      daily: [6, 5, 4, 3, 2, 1, 0].map((daysAgo, index) => ({
        date: new Date(now - daysAgo * DAY).toISOString().slice(0, 10),
        durationMs: [38, 62, 168, 26, 45, 84, 132][index] * 60_000,
      })),
    }) satisfies StatsOverview,
  analyzeCrash: async () => crash,
  listCrashes: async () => [crash],
  openCrashReport: async () => undefined,
  clearCrashes: async () => undefined,
  chooseDirectory: async () => null,
  chooseFile: async () => null,
  getPathForFile: () => '',
  openExternal: async (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  },
  copyText: async (text) => navigator.clipboard?.writeText(text),
  minimizeWindow: async () => undefined,
  toggleMaximizeWindow: async () => false,
  closeWindow: async () => undefined,
  onEvent: (handler) => {
    mockListeners.add(handler)
    return () => mockListeners.delete(handler)
  },
}

export function createMockApi(): BambooApi {
  return new Proxy(base, {
    get(target, property: string) {
      if (property in target) return (target as Record<string, unknown>)[property]
      return async () => null
    },
  }) as BambooApi
}
