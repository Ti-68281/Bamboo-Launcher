import { create } from 'zustand'
import type {
  Account,
  AppSettings,
  BambooEvent,
  Bootstrap,
  CrashAnalysis,
  FeatureKey,
  Instance,
  JobProgress,
  LanWorld,
  LaunchState,
  PageId,
  ToastPayload,
  UpdateInfo,
} from '@shared/types'

export interface Toast extends ToastPayload {
  id: string
  createdAt: number
}

export interface BambooState {
  bootstrap: Bootstrap | null
  booting: boolean
  bootError: string | null
  page: PageId
  jobs: Record<string, JobProgress>
  jobOrder: string[]
  toasts: Toast[]
  launches: Record<string, LaunchState>
  lanWorlds: LanWorld[]
  accountModalOpen: boolean
  commandOpen: boolean
  updateInfo: UpdateInfo | null
  updateChecking: boolean
  updateNotified: boolean
  checkForUpdates: (force?: boolean) => Promise<UpdateInfo | null>
  downloadUpdate: () => Promise<JobProgress | null>
  boot: () => Promise<void>
  refresh: () => Promise<void>
  setPage: (page: PageId) => void
  setActiveInstance: (id: string | null) => Promise<void>
  setActiveAccount: (id: string | null) => Promise<void>
  updateSettings: (patch: Partial<AppSettings>) => Promise<AppSettings | null>
  addToast: (toast: ToastPayload) => void
  dismissToast: (id: string) => void
  setAccountModalOpen: (open: boolean) => void
  setCommandOpen: (open: boolean) => void
  handleEvent: (event: BambooEvent) => void
  isFeatureVisible: (key: FeatureKey) => boolean
  selectInstance: (id: string) => Instance | undefined
  selectedAccount: () => Account | undefined
  runningFor: (instanceId: string) => LaunchState | undefined
  addCrash: (analysis: CrashAnalysis) => void
  setLanWorlds: (worlds: LanWorld[]) => void
}

const PAGE_KEY = 'bamboo:page'
const ALLOWED_PAGES: PageId[] = [
  'home',
  'instances',
  'downloads',
  'mods',
  'modpacks',
  'multiplayer',
  'skins',
  'stats',
  'java',
  'crash',
  'settings',
]

function initialPage(): PageId {
  try {
    const saved = localStorage.getItem(PAGE_KEY) as PageId | null
    if (saved && ALLOWED_PAGES.includes(saved)) return saved
  } catch {
    // localStorage can be unavailable in hardened environments.
  }
  return 'home'
}

let toastCounter = 0
let refreshTimer: ReturnType<typeof setTimeout> | null = null

export const useBamboo = create<BambooState>((set, get) => ({
  bootstrap: null,
  booting: true,
  bootError: null,
  page: initialPage(),
  jobs: {},
  jobOrder: [],
  toasts: [],
  launches: {},
  lanWorlds: [],
  accountModalOpen: false,
  commandOpen: false,
  updateInfo: null,
  updateChecking: false,
  updateNotified: false,

  checkForUpdates: async (force = false) => {
    if (get().updateChecking) return get().updateInfo
    set({ updateChecking: true })
    try {
      const info = await window.bamboo.checkForUpdates(force)
      set({ updateInfo: info, updateChecking: false })
      if (info.available && !get().updateNotified) {
        set({ updateNotified: true })
        get().addToast({
          kind: 'info',
          title: `发现新版本 v${info.latestVersion}`,
          message: info.notes?.split('\n')[0].slice(0, 90) || '前往设置检查并下载更新。',
          actionPage: 'settings',
        })
      } else if (force) {
        get().addToast({
          kind: info.available ? 'info' : 'success',
          title: info.available ? `可更新至 v${info.latestVersion}` : '已是最新版本',
          message: info.available ? '设置页可以下载更新。' : `当前版本 v${info.currentVersion}。`,
          actionPage: 'settings',
        })
      }
      return info
    } catch (error) {
      set({ updateChecking: false })
      if (force) {
        get().addToast({ kind: 'error', title: '检查更新失败', message: messageOf(error) })
      }
      return null
    }
  },

  downloadUpdate: async () => {
    try {
      const job = await window.bamboo.downloadUpdate()
      return job
    } catch (error) {
      get().addToast({ kind: 'error', title: '无法下载更新', message: messageOf(error) })
      return null
    }
  },

  boot: async () => {
    set({ booting: true, bootError: null })
    try {
      const bootstrap = await window.bamboo.bootstrap()
      const launches: Record<string, LaunchState> = {}
      for (const launch of bootstrap.running) launches[launch.instanceId] = launch
      set({ bootstrap, booting: false, launches })
      const current = get().page
      if (!isPageVisible(bootstrap, current)) set({ page: 'home' })
      if (bootstrap.settings.autoCheckUpdate) {
        setTimeout(() => void get().checkForUpdates(false), 1200)
      }
    } catch (error) {
      set({
        booting: false,
        bootError: error instanceof Error ? error.message : String(error),
      })
    }
  },

  refresh: async () => {
    try {
      const bootstrap = await window.bamboo.bootstrap()
      const launches = { ...get().launches }
      for (const launch of bootstrap.running) launches[launch.instanceId] = launch
      set({ bootstrap, launches })
      if (!isPageVisible(bootstrap, get().page)) set({ page: 'home' })
    } catch (error) {
      get().addToast({
        kind: 'error',
        title: '刷新失败',
        message: error instanceof Error ? error.message : String(error),
      })
    }
  },

  setPage: (page) => {
    const bootstrap = get().bootstrap
    if (bootstrap && !isPageVisible(bootstrap, page)) return
    try {
      localStorage.setItem(PAGE_KEY, page)
    } catch {
      // Ignore storage errors.
    }
    set({ page })
  },

  setActiveInstance: async (id) => {
    try {
      await window.bamboo.setActiveInstance(id)
      set((state) =>
        state.bootstrap
          ? { bootstrap: { ...state.bootstrap, activeInstanceId: id } }
          : {},
      )
    } catch (error) {
      get().addToast({ kind: 'error', title: '切换实例失败', message: messageOf(error) })
    }
  },

  setActiveAccount: async (id) => {
    try {
      await window.bamboo.setActiveAccount(id)
      await get().refresh()
    } catch (error) {
      get().addToast({ kind: 'error', title: '切换账户失败', message: messageOf(error) })
    }
  },

  updateSettings: async (patch) => {
    try {
      const settings = await window.bamboo.updateSettings(patch)
      set((state) =>
        state.bootstrap
          ? { bootstrap: { ...state.bootstrap, settings } }
          : {},
      )
      return settings
    } catch (error) {
      get().addToast({ kind: 'error', title: '保存设置失败', message: messageOf(error) })
      return null
    }
  },

  addToast: (toast) => {
    const id = `toast_${Date.now().toString(36)}_${toastCounter++}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id, createdAt: Date.now() }].slice(-5),
    }))
    setTimeout(() => get().dismissToast(id), toast.kind === 'error' ? 7600 : 4800)
  },

  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  setAccountModalOpen: (open) => set({ accountModalOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),

  handleEvent: (event) => {
    if (event.type === 'job') {
      const job = event.payload
      set((state) => {
        const jobs = { ...state.jobs, [job.id]: job }
        const jobOrder = state.jobOrder.includes(job.id)
          ? state.jobOrder
          : [job.id, ...state.jobOrder].slice(0, 12)
        return { jobs, jobOrder }
      })
      if (job.status === 'success') {
        if (['game', 'loader', 'modpack'].includes(job.kind)) {
          if (refreshTimer) clearTimeout(refreshTimer)
          refreshTimer = setTimeout(() => void get().refresh(), 350)
        }
      }
      return
    }
    if (event.type === 'launch') {
      set((state) => ({ launches: { ...state.launches, [event.payload.instanceId]: event.payload } }))
      if (['running', 'exited', 'crashed', 'error'].includes(event.payload.phase)) {
        if (refreshTimer) clearTimeout(refreshTimer)
        refreshTimer = setTimeout(() => void get().refresh(), 400)
      }
      return
    }
    if (event.type === 'toast') {
      get().addToast(event.payload)
      return
    }
    if (event.type === 'crash') {
      get().addCrash(event.payload)
      return
    }
    if (event.type === 'instances-changed' || event.type === 'accounts-changed') {
      if (refreshTimer) clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => void get().refresh(), 300)
      return
    }
    if (event.type === 'lan-world') {
      const world = event.payload
      set((state) => {
        const others = state.lanWorlds.filter(
          (w) => !(w.address === world.address && w.port === world.port),
        )
        return { lanWorlds: [world, ...others].slice(0, 8) }
      })
    }
  },

  isFeatureVisible: (key) => {
    const features = get().bootstrap?.settings.features
    if (!features) return true
    return features[key] !== false
  },

  selectInstance: (id) => get().bootstrap?.instances.find((instance) => instance.id === id),

  selectedAccount: () => {
    const bootstrap = get().bootstrap
    if (!bootstrap) return undefined
    return (
      bootstrap.accounts.find((account) => account.id === bootstrap.activeAccountId) ??
      bootstrap.accounts[0]
    )
  },

  runningFor: (instanceId) => {
    const launch = get().launches[instanceId]
    if (!launch) return undefined
    return ['starting', 'preparing', 'downloading', 'running'].includes(launch.phase)
      ? launch
      : undefined
  },

  addCrash: (analysis) => {
    set((state) => {
      if (!state.bootstrap) return {}
      const recentCrashes = [
        analysis,
        ...state.bootstrap.recentCrashes.filter((c) => c.id !== analysis.id),
      ].slice(0, 20)
      return { bootstrap: { ...state.bootstrap, recentCrashes } }
    })
  },

  setLanWorlds: (worlds) => set({ lanWorlds: worlds }),
}))

export function isPageVisible(bootstrap: Bootstrap | null, page: PageId): boolean {
  if (!bootstrap) return true
  if (page in bootstrap.settings.features) {
    return bootstrap.settings.features[page as FeatureKey] !== false
  }
  return true
}

export function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message.replace(/^Error invoking remote method '[^']+': (Error: )?/, '')
  return String(error)
}

export function useActiveInstance(): Instance | undefined {
  return useBamboo((state) => {
    const bootstrap = state.bootstrap
    if (!bootstrap) return undefined
    return (
      bootstrap.instances.find((instance) => instance.id === bootstrap.activeInstanceId) ??
      bootstrap.instances[0]
    )
  })
}

export function useCurrentAccount(): Account | undefined {
  return useBamboo((state) => {
    const bootstrap = state.bootstrap
    if (!bootstrap) return undefined
    return (
      bootstrap.accounts.find((account) => account.id === bootstrap.activeAccountId) ??
      bootstrap.accounts[0]
    )
  })
}
