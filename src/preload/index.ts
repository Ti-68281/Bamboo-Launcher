import { contextBridge, ipcRenderer, webUtils } from 'electron'
import type {
  AppSettings,
  BambooApi,
  BambooEvent,
  CreateInstanceInput,
  InstallGameOptions,
  InstallLoaderOptions,
  InstallProjectOptions,
  LoaderType,
  ModPlatform,
  OfflineLoginInput,
  SearchProjectsOptions,
  UpdateInstancePatch,
} from '../shared/types'

const invoke = <T>(channel: string, ...args: unknown[]): Promise<T> =>
  ipcRenderer.invoke(channel, ...args) as Promise<T>

const api: BambooApi = {
  bootstrap: () => invoke('bamboo:bootstrap'),
  refreshBootstrap: () => invoke('bamboo:bootstrap'),
  updateSettings: (patch: Partial<AppSettings>) => invoke('bamboo:settings:update', patch),
  setActiveInstance: (id) => invoke('bamboo:active-instance', id),
  setActiveAccount: (id) => invoke('bamboo:active-account', id),

  listVersions: (force) => invoke('bamboo:versions', force),
  listLoaderVersions: (mcVersion: string, loader: LoaderType) =>
    invoke('bamboo:loader-versions', mcVersion, loader),
  installGame: (options: InstallGameOptions) => invoke('bamboo:install-game', options),
  createInstance: (input: CreateInstanceInput) => invoke('bamboo:create-instance', input),
  installLoader: (options: InstallLoaderOptions) => invoke('bamboo:install-loader', options),
  deleteInstance: (id) => invoke('bamboo:delete-instance', id),
  updateInstance: (id, patch: UpdateInstancePatch) => invoke('bamboo:update-instance', id, patch),
  openInstanceFolder: (id, sub) => invoke('bamboo:open-instance-folder', id, sub),
  openDataFolder: () => invoke('bamboo:open-data-folder'),

  addOfflineAccount: (input: OfflineLoginInput) => invoke('bamboo:offline-login', input),
  startMicrosoftLogin: () => invoke('bamboo:ms-login-start'),
  pollMicrosoftLogin: (flowId) => invoke('bamboo:ms-login-poll', flowId),
  logoutAccount: (id) => invoke('bamboo:logout', id),
  refreshMicrosoftAccount: (id) => invoke('bamboo:ms-refresh', id),
  chooseAndUploadSkin: (accountId) => invoke('bamboo:skin-upload', accountId),
  saveSkinFromPath: (accountId, path, model) => invoke('bamboo:skin-save-path', accountId, path, model),
  setSkinModel: (accountId, model) => invoke('bamboo:skin-model', accountId, model),

  launch: (instanceId) => invoke('bamboo:launch', instanceId),
  killGame: (instanceId) => invoke('bamboo:kill', instanceId),

  listJava: () => invoke('bamboo:java-list'),
  scanJava: () => invoke('bamboo:java-scan'),
  addJava: () => invoke('bamboo:java-add'),
  downloadJava: (majorVersion) => invoke('bamboo:java-download', majorVersion),

  getInstalledMods: (instanceId) => invoke('bamboo:mods-list', instanceId),
  setModEnabled: (instanceId, fileName, enabled) =>
    invoke('bamboo:mods-toggle', instanceId, fileName, enabled),
  deleteMod: (instanceId, fileName) => invoke('bamboo:mods-delete', instanceId, fileName),
  searchProjects: (options: SearchProjectsOptions) => invoke('bamboo:projects-search', options),
  getProjectVersions: (platform: ModPlatform, projectId, mcVersion, loader) =>
    invoke('bamboo:project-versions', platform, projectId, mcVersion, loader),
  installProject: (options: InstallProjectOptions) => invoke('bamboo:project-install', options),
  setCurseForgeKey: (key) => invoke('bamboo:cf-key-set', key),
  testCurseForgeKey: (key) => invoke('bamboo:cf-key-test', key),

  inspectModpack: (filePath) => invoke('bamboo:modpack-inspect', filePath),
  installModpack: (filePath, instanceName) => invoke('bamboo:modpack-install', filePath, instanceName),
  handleDrop: (filePath) => invoke('bamboo:drop', filePath),

  getNetworkInfo: (port) => invoke('bamboo:network-info', port),
  discoverLanWorlds: () => invoke('bamboo:lan-discover'),
  mapPort: (port) => invoke('bamboo:port-map', port),
  unmapPort: (port) => invoke('bamboo:port-unmap', port),

  checkForUpdates: (force) => invoke('bamboo:update-check', force),
  downloadUpdate: () => invoke('bamboo:update-download'),

  getStats: () => invoke('bamboo:stats'),
  analyzeCrash: (instanceId, crashPath) => invoke('bamboo:crash-analyze', instanceId, crashPath),
  listCrashes: () => invoke('bamboo:crashes-list'),
  openCrashReport: (path) => invoke('bamboo:crash-open', path),
  clearCrashes: () => invoke('bamboo:crash-clear'),

  chooseDirectory: (defaultPath) => invoke('bamboo:choose-directory', defaultPath),
  chooseFile: (filters) => invoke('bamboo:choose-file', filters),
  getPathForFile: (file: File) => webUtils.getPathForFile(file),
  openExternal: (url) => invoke('bamboo:open-external', url),
  copyText: (text) => invoke('bamboo:copy-text', text),
  minimizeWindow: () => invoke('bamboo:window-minimize'),
  toggleMaximizeWindow: () => invoke('bamboo:window-toggle-maximize'),
  closeWindow: () => invoke('bamboo:window-close'),
  onEvent: (handler: (event: BambooEvent) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, payload: BambooEvent) => handler(payload)
    ipcRenderer.on('bamboo:event', listener)
    return () => ipcRenderer.removeListener('bamboo:event', listener)
  },
}

contextBridge.exposeInMainWorld('bamboo', api)
