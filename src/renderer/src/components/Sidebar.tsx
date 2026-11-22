import { useEffect, useState } from 'react'
import {
  BarChart3,
  Coffee,
  DownloadCloud,
  HeartPulse,
  House,
  Layers3,
  PackageOpen,
  PanelLeftClose,
  Puzzle,
  RadioTower,
  Settings2,
  Sparkles,
  Sprout,
  UserRound,
} from 'lucide-react'
import type { FeatureKey, PageId } from '@shared/types'
import { useBamboo, useCurrentAccount } from '../store'
import { SkinFace } from './SkinPreview'

interface NavItem {
  key: PageId
  label: string
  icon: typeof House
  feature?: FeatureKey
}

const NAV_GROUPS: NavItem[][] = [
  [
    { key: 'home', label: '首页', icon: House },
    { key: 'instances', label: '实例', icon: Layers3 },
    { key: 'downloads', label: '下载', icon: DownloadCloud },
  ],
  [
    { key: 'mods', label: '模组', icon: Puzzle, feature: 'mods' },
    { key: 'modpacks', label: '整合包', icon: PackageOpen, feature: 'modpacks' },
    { key: 'multiplayer', label: '联机', icon: RadioTower, feature: 'multiplayer' },
  ],
  [
    { key: 'skins', label: '皮肤', icon: Sparkles, feature: 'skins' },
    { key: 'stats', label: '统计', icon: BarChart3, feature: 'stats' },
    { key: 'java', label: 'Java', icon: Coffee, feature: 'java' },
    { key: 'crash', label: '诊断', icon: HeartPulse, feature: 'crash' },
  ],
]

export function Sidebar() {
  const page = useBamboo((s) => s.page)
  const setPage = useBamboo((s) => s.setPage)
  const features = useBamboo((s) => s.bootstrap?.settings.features)
  const compactSetting = useBamboo((s) => s.bootstrap?.settings.compactSidebar ?? false)
  const updateSettings = useBamboo((s) => s.updateSettings)
  const openAccount = useBamboo((s) => s.setAccountModalOpen)
  const account = useCurrentAccount()
  const appVersion = useBamboo((s) => s.bootstrap?.appVersion ?? '1.0.1')
  const [compact, setCompact] = useState(compactSetting)

  useEffect(() => {
    setCompact(compactSetting)
  }, [compactSetting])

  function toggleCompact() {
    const next = !compact
    setCompact(next)
    void updateSettings({ compactSidebar: next })
  }

  return (
    <aside className={`sidebar ${compact ? 'compact' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M13 42c0-14 2-25 10-35M25 42c0-11 4-19 12-24M17 26c-6-3-9-7-10-13 6 .2 10 3 13 8M25 16c2-8 7-12 14-13 0 7-4 12-10 15"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M11 42h7M23 42h7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity=".5"
            />
          </svg>
        </div>
        <div className="brand-type">
          <span className="brand-cn">竹</span>
          <span className="brand-en">BAMBOO</span>
        </div>
        <button
          className="sidebar-collapse"
          type="button"
          title={compact ? '展开侧栏' : '收起侧栏'}
          aria-label={compact ? '展开侧栏' : '收起侧栏'}
          onClick={toggleCompact}
        >
          <span className={`collapse-icon ${compact ? 'flipped' : ''}`}>
            <PanelLeftClose size={17} strokeWidth={2} />
          </span>
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_GROUPS.map((items, groupIndex) => {
          const visible = items.filter((item) => !item.feature || features?.[item.feature] !== false)
          if (!visible.length) return null
          return (
            <div className="nav-group" key={groupIndex}>
              {visible.map((item) => {
                const Icon = item.icon
                const active = page === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`nav-item ${active ? 'active' : ''}`}
                    onClick={() => setPage(item.key)}
                    title={compact ? item.label : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="nav-icon">
                      <Icon size={18} strokeWidth={active ? 2.15 : 1.8} />
                    </span>
                    <span className="nav-text">{item.label}</span>
                    {active && <span className="nav-active-leaf" aria-hidden="true" />}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-settings nav-item" type="button" onClick={() => setPage('settings')}>
          <span className="nav-icon">
            <Settings2 size={18} strokeWidth={page === 'settings' ? 2.1 : 1.7} />
          </span>
          {!compact && <span className="nav-text">设置</span>}
        </button>

        <button className="sidebar-account" type="button" onClick={() => openAccount(true)}>
          {account ? (
            <SkinFace dataUrl={account.skin?.dataUrl} name={account.name} size={38} round />
          ) : (
            <span className="sidebar-account-empty">
              <UserRound size={18} />
            </span>
          )}
          <span className="sidebar-account-copy">
            <strong>{account?.name ?? '未登录'}</strong>
            <small>
              <span className={`account-type-dot ${account?.type ?? 'none'}`} />
              {account ? (account.type === 'microsoft' ? 'Microsoft 账户' : '离线账户') : '点击添加账户'}
            </small>
          </span>
        </button>

        <div className="sidebar-footer">
          <span className="footer-sprout">
            <Sprout size={12} />
          </span>
          <span>v{appVersion}</span>
        </div>
      </div>
    </aside>
  )
}
