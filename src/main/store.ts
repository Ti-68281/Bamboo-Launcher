import { app, safeStorage } from 'electron'
import fs from 'node:fs/promises'
import path from 'node:path'
import type {
  Account,
  AppSettings,
  CrashAnalysis,
  Instance,
  JavaRuntime,
  PlaySession,
} from '../shared/types'

export interface AppPaths {
  dataRoot: string
  shared: string
  instances: string
  java: string
  skins: string
  cache: string
  logs: string
  runtime: string
  versions: string
  authlib: string
}

export interface StoredAccount extends Omit<Account, 'skin'> {
  auth?: string
  skinFile?: string
  skin?: { model: 'classic' | 'slim'; updatedAt: number }
}

export interface StoredState {
  schemaVersion: 1
  settings: AppSettings
  accounts: StoredAccount[]
  activeAccountId: string | null
  instances: Instance[]
  activeInstanceId: string | null
  sessions: PlaySession[]
  crashes: CrashAnalysis[]
  javaCache: JavaRuntime[]
  curseForgeKey?: string
  createdAt: number
}

export function makePaths(dataRoot: string): AppPaths {
  return {
    dataRoot,
    shared: path.join(dataRoot, 'minecraft'),
    instances: path.join(dataRoot, 'instances'),
    java: path.join(dataRoot, 'java'),
    skins: path.join(dataRoot, 'skins'),
    cache: path.join(dataRoot, 'cache'),
    logs: path.join(dataRoot, 'logs'),
    runtime: path.join(dataRoot, 'runtime'),
    versions: path.join(dataRoot, 'minecraft', 'versions'),
    authlib: path.join(dataRoot, 'runtime', 'authlib-injector.jar'),
  }
}

export const DEFAULT_SETTINGS: AppSettings = {
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
  defaultMemoryMb: 4096,
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
  dataRoot: '',
}

function defaultDataRoot(): string {
  return path.join(app.getPath('userData'), 'data')
}

function mergeSettings(raw: Partial<AppSettings> | undefined, dataRoot: string): AppSettings {
  const merged: AppSettings = {
    ...DEFAULT_SETTINGS,
    ...raw,
    features: { ...DEFAULT_SETTINGS.features, ...(raw?.features ?? {}) },
    dataRoot,
  }
  if (!['bamboo', 'moss', 'moon'].includes(merged.theme)) merged.theme = 'bamboo'
  if (!['clear', 'balanced', 'solid'].includes(merged.glass)) merged.glass = 'balanced'
  if (!['official', 'bmclapi'].includes(merged.downloadSource)) merged.downloadSource = 'official'
  if (!['balanced', 'performance', 'compatibility', 'custom'].includes(merged.defaultJvmProfile)) {
    merged.defaultJvmProfile = 'balanced'
  }
  merged.defaultMemoryMb = Math.max(1024, Math.min(32768, Number(merged.defaultMemoryMb) || 4096))
  merged.downloadConcurrency = Math.max(2, Math.min(64, Number(merged.downloadConcurrency) || 12))
  return merged
}

export class AppStore {
  state!: StoredState
  paths!: AppPaths
  private saveChain: Promise<void> = Promise.resolve()
  private loaded = false

  async init(): Promise<void> {
    const dataRoot = defaultDataRoot()
    this.paths = makePaths(dataRoot)
    await Promise.all(
      [
        dataRoot,
        this.paths.shared,
        this.paths.instances,
        this.paths.java,
        this.paths.skins,
        this.paths.cache,
        this.paths.logs,
        this.paths.runtime,
        this.paths.versions,
      ].map((p) => fs.mkdir(p, { recursive: true }).catch(() => undefined)),
    )
    const file = path.join(dataRoot, 'bamboo.json')
    let raw: Partial<StoredState> = {}
    try {
      raw = JSON.parse(await fs.readFile(file, 'utf8')) as Partial<StoredState>
    } catch {
      raw = {}
    }
    this.state = {
      schemaVersion: 1,
      settings: mergeSettings(raw.settings, dataRoot),
      accounts: Array.isArray(raw.accounts) ? raw.accounts : [],
      activeAccountId: raw.activeAccountId ?? null,
      instances: Array.isArray(raw.instances) ? raw.instances : [],
      activeInstanceId: raw.activeInstanceId ?? null,
      sessions: Array.isArray(raw.sessions) ? raw.sessions : [],
      crashes: Array.isArray(raw.crashes) ? raw.crashes : [],
      javaCache: Array.isArray(raw.javaCache) ? raw.javaCache : [],
      curseForgeKey: typeof raw.curseForgeKey === 'string' ? raw.curseForgeKey : undefined,
      createdAt: raw.createdAt ?? Date.now(),
    }
    if (this.state.activeInstanceId && !this.state.instances.some((i) => i.id === this.state.activeInstanceId)) {
      this.state.activeInstanceId = this.state.instances[0]?.id ?? null
    }
    if (this.state.activeAccountId && !this.state.accounts.some((a) => a.id === this.state.activeAccountId)) {
      this.state.activeAccountId = this.state.accounts[0]?.id ?? null
    }
    this.loaded = true
    await this.save()
  }

  get dataRoot(): string {
    return this.paths.dataRoot
  }

  get settings(): AppSettings {
    return this.state.settings
  }

  get instances(): Instance[] {
    return this.state.instances
  }

  get activeInstance(): Instance | undefined {
    return this.state.instances.find((i) => i.id === this.state.activeInstanceId) ?? this.state.instances[0]
  }

  get activeAccount(): StoredAccount | undefined {
    return (
      this.state.accounts.find((a) => a.id === this.state.activeAccountId) ??
      this.state.accounts[0]
    )
  }

  getAccount(id: string): StoredAccount | undefined {
    return this.state.accounts.find((a) => a.id === id)
  }

  getInstance(id: string): Instance | undefined {
    return this.state.instances.find((i) => i.id === id)
  }

  async save(): Promise<void> {
    if (!this.loaded) return
    const snapshot = JSON.stringify(this.state, null, 2)
    const file = path.join(this.paths.dataRoot, 'bamboo.json')
    const temp = file + '.tmp'
    this.saveChain = this.saveChain.then(async () => {
      await fs.writeFile(temp, snapshot, 'utf8')
      await fs.rename(temp, file)
    }).catch((error) => {
      console.error('[store] save failed', error)
    })
    return this.saveChain
  }

  async update(mutator: (state: StoredState) => void): Promise<void> {
    mutator(this.state)
    await this.save()
  }

  encrypt(value: string): string {
    try {
      if (safeStorage.isEncryptionAvailable()) {
        return 'enc:' + safeStorage.encryptString(value).toString('base64')
      }
    } catch {
      // Fallback below keeps the launcher usable on systems without an OS keyring.
    }
    return 'plain:' + Buffer.from(value, 'utf8').toString('base64')
  }

  decrypt(value: string | undefined): string | null {
    if (!value) return null
    try {
      if (value.startsWith('enc:')) {
        return safeStorage.decryptString(Buffer.from(value.slice(4), 'base64'))
      }
      if (value.startsWith('plain:')) {
        return Buffer.from(value.slice(6), 'base64').toString('utf8')
      }
    } catch {
      return null
    }
    return null
  }
}

let store: AppStore | null = null

export async function getStore(): Promise<AppStore> {
  if (!store) {
    store = new AppStore()
    await store.init()
  }
  return store
}
