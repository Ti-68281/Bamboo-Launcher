import { useEffect, useRef } from 'react'
import { AlertTriangle, Leaf, RefreshCw } from 'lucide-react'
import { useBamboo } from './store'
import { TitleBar } from './components/TitleBar'
import { Sidebar } from './components/Sidebar'
import { Toasts } from './components/Toasts'
import { JobShelf } from './components/JobShelf'
import { DropOverlay } from './components/DropOverlay'
import { CommandPalette } from './components/CommandPalette'
import { AccountModal } from './components/AccountModal'
import { HomePage } from './pages/Home'
import { InstancesPage } from './pages/Instances'
import { DownloadsPage } from './pages/Downloads'
import { ModsPage } from './pages/Mods'
import { ModpacksPage } from './pages/Modpacks'
import { MultiplayerPage } from './pages/Multiplayer'
import { SkinsPage } from './pages/Skins'
import { StatsPage } from './pages/Stats'
import { JavaPage } from './pages/Java'
import { CrashPage } from './pages/Crash'
import { SettingsPage } from './pages/Settings'

const PAGES = {
  home: HomePage,
  instances: InstancesPage,
  downloads: DownloadsPage,
  mods: ModsPage,
  modpacks: ModpacksPage,
  multiplayer: MultiplayerPage,
  skins: SkinsPage,
  stats: StatsPage,
  java: JavaPage,
  crash: CrashPage,
  settings: SettingsPage,
}

const TITLES: Record<string, string> = {
  home: '首页',
  instances: '实例',
  downloads: '下载',
  mods: '模组',
  modpacks: '整合包',
  multiplayer: '联机',
  skins: '皮肤',
  stats: '统计',
  java: 'Java',
  crash: '诊断',
  settings: '设置',
}

export default function App() {
  const boot = useBamboo((s) => s.boot)
  const booting = useBamboo((s) => s.booting)
  const bootError = useBamboo((s) => s.bootError)
  const page = useBamboo((s) => s.page)
  const settings = useBamboo((s) => s.bootstrap?.settings)
  const scroller = useRef<HTMLElement>(null)

  useEffect(() => {
    void boot()
    const unsubscribe = window.bamboo.onEvent(useBamboo.getState().handleEvent)
    return unsubscribe
  }, [boot])

  useEffect(() => {
    if (!settings) return
    document.documentElement.dataset.theme = settings.theme
    document.documentElement.dataset.glass = settings.glass
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false'
  }, [settings?.theme, settings?.glass, settings?.reduceMotion])

  useEffect(() => {
    document.title = `Bamboo · ${TITLES[page] ?? '竹启动器'}`
    scroller.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [page])

  if (booting) {
    return (
      <div className="boot-screen">
        <div className="boot-orb o1" />
        <div className="boot-orb o2" />
        <div className="boot-mark">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M13 42c0-14 2-25 10-35M25 42c0-11 4-19 12-24M17 26c-6-3-9-7-10-13 6 .2 10 3 13 8M25 16c2-8 7-12 14-13 0 7-4 12-10 15"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="boot-wordmark">BAMBOO</div>
        <div className="boot-caption">正在把竹林铺开…</div>
        <div className="boot-bar"><span /></div>
      </div>
    )
  }

  if (bootError) {
    return (
      <div className="error-screen">
        <div className="error-card glass-card">
          <span className="error-icon"><AlertTriangle size={28} /></span>
          <h1>竹林暂时没有醒来</h1>
          <p>{bootError}</p>
          <button className="btn btn-primary" type="button" onClick={() => void boot()}>
            <RefreshCw size={15} /> 再试一次
          </button>
          <small>如果问题持续，请检查数据目录权限或查看应用日志。</small>
        </div>
      </div>
    )
  }

  const Page = PAGES[page] ?? HomePage

  return (
    <div className="app-shell">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb orb-a" />
        <span className="ambient-orb orb-b" />
        <span className="ambient-orb orb-c" />
        <span className="ambient-grain" />
      </div>
      <TitleBar />
      <div className="app-body">
        <Sidebar />
        <main className="page-scroller" ref={scroller}>
          <div className="page-transition" key={page}>
            <Page />
          </div>
          <div className="page-bottom-mark" aria-hidden="true">
            <Leaf size={13} />
            <span>Bamboo · grow slow, play well</span>
          </div>
        </main>
      </div>
      <JobShelf />
      <Toasts />
      <DropOverlay />
      <CommandPalette />
      <AccountModal />
    </div>
  )
}
