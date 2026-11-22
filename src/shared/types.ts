export type PageId =
  | 'home'
  | 'instances'
  | 'downloads'
  | 'mods'
  | 'modpacks'
  | 'multiplayer'
  | 'skins'
  | 'stats'
  | 'java'
  | 'crash'
  | 'settings'

export type FeatureKey =
  | 'mods'
  | 'modpacks'
  | 'multiplayer'
  | 'skins'
  | 'stats'
  | 'java'
  | 'crash'

export type LoaderType =
  | 'vanilla'
  | 'forge'
  | 'fabric'
  | 'quilt'
  | 'neoforge'
  | 'liteloader'

export interface LoaderInfo {
  type: LoaderType
  version?: string
}

export interface Instance {
  id: string
  name: string
  gameDir: string
  versionId: string | null
  mcVersion: string | null
  loader: LoaderInfo
  accountId?: string
  javaPath?: string
  memoryMb: number
  minMemoryMb: number
  jvmArgs: string[]
  fullscreen: boolean
  width: number
  height: number
  playTimeMs: number
  lastSessionMs: number
  createdAt: number
  updatedAt: number
  lastPlayedAt?: number
  icon: string
  notes: string
  offlineSkin: boolean
  autoInstallJava: boolean
  jvmProfile: JvmProfile
}

export type JvmProfile = 'balanced' | 'performance' | 'compatibility' | 'custom'

export interface SkinInfo {
  model: 'classic' | 'slim'
  dataUrl: string
  updatedAt: number
}

export interface Account {
  id: string
  type: 'offline' | 'microsoft'
  name: string
  uuid: string
  createdAt: number
  skin?: SkinInfo
  xuid?: string
}

export interface FeatureVisibility {
  mods: boolean
  modpacks: boolean
  multiplayer: boolean
  skins: boolean
  stats: boolean
  java: boolean
  crash: boolean
}

export type ThemeId = 'bamboo' | 'moss' | 'moon'

export interface AppSettings {
  theme: ThemeId
  glass: 'clear' | 'balanced' | 'solid'
  reduceMotion: boolean
  compactSidebar: boolean
  features: FeatureVisibility
  downloadSource: 'official' | 'bmclapi'
  downloadConcurrency: number
  defaultMemoryMb: number
  defaultJvmProfile: JvmProfile
  closeLauncherOnLaunch: boolean
  minimizeOnLaunch: boolean
  autoDownloadJava: boolean
  autoScanJava: boolean
  autoCheckUpdate: boolean
  microsoftClientId: string
  curseForgeEnabled: boolean
  showPlayTimeInTitle: boolean
  language: 'zh-CN'
  dataRoot: string
}

export interface Bootstrap {
  appVersion: string
  platform: string
  dataRoot: string
  settings: AppSettings
  instances: Instance[]
  accounts: Account[]
  activeInstanceId: string | null
  activeAccountId: string | null
  running: LaunchState[]
  sessions: PlaySession[]
  recentCrashes: CrashAnalysis[]
  hasCurseForgeKey: boolean
  microsoftClientIdConfigured: boolean
  javaCache: JavaRuntime[]
  totalPlayTimeMs: number
}

export type LoaderTypeFilter = LoaderType | 'any'

export interface GameVersionInfo {
  id: string
  type: string
  releaseTime: string
  url: string
  installed: boolean
}

export interface LoaderVersionOption {
  version: string
  label: string
  stable?: boolean
  recommended?: boolean
}

export interface UpdateAsset {
  name: string
  url: string
  size?: number
}

export interface UpdateInfo {
  currentVersion: string
  latestVersion: string
  available: boolean
  source: 'github' | 'website' | 'repository' | 'none'
  releaseUrl?: string
  downloadUrl?: string
  downloadName?: string
  notes?: string
  publishedAt?: string
  checkedAt: number
  error?: string
}

export interface JavaRuntime {
  id: string
  path: string
  version: string
  majorVersion: number
  vendor: string
  source: 'auto' | 'manual' | 'downloaded'
  architecture: string
  addedAt: number
}

export interface PlaySession {
  id: string
  instanceId: string
  instanceName: string
  accountName: string
  startedAt: number
  endedAt: number
  durationMs: number
  exitCode: number | null
  crashed: boolean
}

export type LaunchPhase =
  | 'preparing'
  | 'downloading'
  | 'starting'
  | 'running'
  | 'exited'
  | 'crashed'
  | 'error'

export interface LaunchState {
  instanceId: string
  instanceName: string
  accountName: string
  phase: LaunchPhase
  message: string
  pid?: number
  startedAt?: number
  windowReadyAt?: number
  exitCode?: number | null
  error?: string
}

export type JobKind =
  | 'game'
  | 'loader'
  | 'mod'
  | 'modpack'
  | 'java'
  | 'skin'
  | 'microsoft'
  | 'other'

export type JobStatus = 'running' | 'success' | 'error' | 'cancelled'

export interface JobProgress {
  id: string
  kind: JobKind
  title: string
  detail: string
  progress: number
  indeterminate: boolean
  status: JobStatus
  startedAt: number
  finishedAt?: number
  error?: string
  meta?: Record<string, unknown>
}

export interface InstalledMod {
  fileName: string
  path: string
  name: string
  version: string
  modId: string
  description: string
  authors: string[]
  enabled: boolean
  size: number
  iconDataUrl?: string
  loaderHint: string
}

export type ModPlatform = 'modrinth' | 'curseforge'

export interface ModProject {
  id: string
  platform: ModPlatform
  slug: string
  name: string
  summary: string
  author: string
  downloads: number
  follows: number
  iconUrl?: string
  categories: string[]
  gameVersions: string[]
  loaders: string[]
  websiteUrl?: string
  updatedAt?: number
}

export interface ModVersion {
  id: string
  name: string
  versionNumber: string
  gameVersions: string[]
  loaders: string[]
  fileName: string
  downloadUrl?: string
  changelog?: string
  dependencies: Array<{
    projectId?: string
    versionId?: string
    fileName?: string
    dependencyType: 'required' | 'optional' | 'incompatible' | 'embedded'
    platform: ModPlatform
    name?: string
  }>
}

export interface ModpackInfo {
  path: string
  name: string
  format: 'modrinth' | 'curseforge' | 'multimc' | 'unknown'
  mcVersion?: string
  loader?: LoaderInfo
  modCount: number
  summary: string
  iconDataUrl?: string
}

export interface CrashAnalysis {
  id: string
  instanceId: string
  instanceName: string
  createdAt: number
  severity: 'low' | 'medium' | 'high'
  reason: string
  summary: string
  likelyMods: Array<{ name: string; id?: string; fileName?: string }>
  suggestions: string[]
  exception?: string
  reportPath?: string
  logExcerpt?: string
  exitCode?: number | null
}

export interface LanWorld {
  motd: string
  port: number
  address: string
  lastSeen: number
  source: 'broadcast' | 'log'
}

export interface NetworkInfo {
  hostname: string
  localIps: string[]
  primaryIp: string | null
  port: number | null
  externalIp?: string
  mapped?: boolean
  upnpMessage?: string
  worlds: LanWorld[]
}

export interface StatsOverview {
  totalPlayTimeMs: number
  todayPlayTimeMs: number
  weekPlayTimeMs: number
  sessions: PlaySession[]
  byInstance: Array<{
    instanceId: string
    name: string
    playTimeMs: number
    launches: number
    lastPlayedAt?: number
  }>
  daily: Array<{ date: string; durationMs: number }>
}

export interface ToastPayload {
  kind: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  actionPage?: PageId
}

export type BambooEvent =
  | { type: 'job'; payload: JobProgress }
  | { type: 'launch'; payload: LaunchState }
  | { type: 'toast'; payload: ToastPayload }
  | { type: 'crash'; payload: CrashAnalysis }
  | { type: 'instances-changed' }
  | { type: 'accounts-changed' }
  | { type: 'lan-world'; payload: LanWorld }
  | { type: 'window-state'; payload: { maximized: boolean } }
  | { type: 'navigate'; payload: PageId }

export interface InstallGameOptions {
  mcVersion: string
  loader: LoaderType
  loaderVersion?: string
  instanceName?: string
  createInstance?: boolean
  javaPath?: string
}

export interface InstallLoaderOptions {
  instanceId: string
  loader: LoaderType
  version?: string
}

export interface OfflineLoginInput {
  name: string
  skinPath?: string
  model?: 'classic' | 'slim'
}

export interface MicrosoftLoginStart {
  flowId: string
  userCode: string
  verificationUri: string
  expiresIn: number
  interval: number
  message: string
}

export interface MicrosoftLoginResult {
  account: Account
  alreadySignedIn: boolean
}

export interface SearchProjectsOptions {
  query: string
  platform: ModPlatform
  projectType: 'mod' | 'modpack'
  loader: LoaderTypeFilter
  gameVersion?: string
  offset?: number
  limit?: number
}

export interface SearchProjectsResult {
  projects: ModProject[]
  total: number
  error?: string
  needsApiKey?: boolean
}

export interface InstallProjectOptions {
  instanceId: string
  platform: ModPlatform
  projectId: string
  projectName: string
  versionId?: string
  installDependencies: boolean
}

export interface CreateInstanceInput {
  name: string
  mcVersion: string
  loader: LoaderType
  loaderVersion?: string
  icon?: string
}

export interface UpdateInstancePatch {
  name?: string
  javaPath?: string
  memoryMb?: number
  minMemoryMb?: number
  jvmArgs?: string[]
  fullscreen?: boolean
  width?: number
  height?: number
  jvmProfile?: JvmProfile
  notes?: string
  offlineSkin?: boolean
  autoInstallJava?: boolean
  accountId?: string
  icon?: string
}

export interface BootstrapOptions {
  mock?: boolean
}

export interface BambooApi {
  bootstrap(): Promise<Bootstrap>
  refreshBootstrap(): Promise<Bootstrap>
  updateSettings(patch: Partial<AppSettings>): Promise<AppSettings>
  setActiveInstance(id: string | null): Promise<void>
  setActiveAccount(id: string | null): Promise<void>

  listVersions(force?: boolean): Promise<GameVersionInfo[]>
  listLoaderVersions(
    mcVersion: string,
    loader: LoaderType,
  ): Promise<LoaderVersionOption[]>
  installGame(options: InstallGameOptions): Promise<JobProgress>
  createInstance(input: CreateInstanceInput): Promise<Instance>
  installLoader(options: InstallLoaderOptions): Promise<JobProgress>
  deleteInstance(id: string): Promise<void>
  updateInstance(id: string, patch: UpdateInstancePatch): Promise<Instance>
  openInstanceFolder(id: string, sub?: string): Promise<void>
  openDataFolder(): Promise<void>

  addOfflineAccount(input: OfflineLoginInput): Promise<Account>
  startMicrosoftLogin(): Promise<MicrosoftLoginStart>
  pollMicrosoftLogin(flowId: string): Promise<MicrosoftLoginResult | null>
  logoutAccount(id: string): Promise<void>
  refreshMicrosoftAccount(id: string): Promise<Account>
  chooseAndUploadSkin(accountId: string): Promise<Account | null>
  saveSkinFromPath(accountId: string, path: string, model: 'classic' | 'slim'): Promise<Account>
  setSkinModel(accountId: string, model: 'classic' | 'slim'): Promise<Account>

  launch(instanceId: string): Promise<JobProgress>
  killGame(instanceId: string): Promise<void>

  listJava(): Promise<JavaRuntime[]>
  scanJava(): Promise<JavaRuntime[]>
  addJava(): Promise<JavaRuntime[] | null>
  downloadJava(majorVersion: number): Promise<JobProgress>

  getInstalledMods(instanceId: string): Promise<InstalledMod[]>
  setModEnabled(instanceId: string, fileName: string, enabled: boolean): Promise<InstalledMod[]>
  deleteMod(instanceId: string, fileName: string): Promise<InstalledMod[]>
  searchProjects(options: SearchProjectsOptions): Promise<SearchProjectsResult>
  getProjectVersions(
    platform: ModPlatform,
    projectId: string,
    mcVersion: string,
    loader: LoaderTypeFilter,
  ): Promise<ModVersion[]>
  installProject(options: InstallProjectOptions): Promise<JobProgress>
  setCurseForgeKey(key: string | null): Promise<{ configured: boolean }>
  testCurseForgeKey(key?: string): Promise<{ ok: boolean; message: string }>

  inspectModpack(filePath: string): Promise<ModpackInfo>
  installModpack(filePath: string, instanceName?: string): Promise<JobProgress>
  handleDrop(filePath: string): Promise<{ kind: 'mod' | 'modpack' | 'skin' | 'unknown'; message: string; job?: JobProgress }>

  getNetworkInfo(port?: number | null): Promise<NetworkInfo>
  discoverLanWorlds(): Promise<LanWorld[]>
  mapPort(port: number): Promise<NetworkInfo>
  unmapPort(port: number): Promise<void>

  getStats(): Promise<StatsOverview>
  analyzeCrash(instanceId?: string, crashPath?: string): Promise<CrashAnalysis | null>
  listCrashes(): Promise<CrashAnalysis[]>
  openCrashReport(path: string): Promise<void>
  clearCrashes(): Promise<void>

  checkForUpdates(force?: boolean): Promise<UpdateInfo>
  downloadUpdate(): Promise<JobProgress>

  chooseDirectory(defaultPath?: string): Promise<string | null>
  chooseFile(filters?: Array<{ name: string; extensions: string[] }>): Promise<string | null>
  getPathForFile(file: File): string
  openExternal(url: string): Promise<void>
  copyText(text: string): Promise<void>
  minimizeWindow(): Promise<void>
  toggleMaximizeWindow(): Promise<boolean>
  closeWindow(): Promise<void>
  onEvent(handler: (event: BambooEvent) => void): () => void
}
