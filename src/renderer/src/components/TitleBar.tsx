import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronsUpDown, Copy, Minus, Play, Search, Square, X } from 'lucide-react'
import { useBamboo } from '../store'
import { formatDuration } from '../lib/format'
import { SkinFace } from './SkinPreview'

const PAGE_LABELS: Record<string, string> = {
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

export function TitleBar() {
  const page = useBamboo((s) => s.page)
  const setPage = useBamboo((s) => s.setPage)
  const setCommandOpen = useBamboo((s) => s.setCommandOpen)
  const bootstrap = useBamboo((s) => s.bootstrap)
  const launches = useBamboo((s) => s.launches)
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen)
  const [maximized, setMaximized] = useState(false)
  const [now, setNow] = useState(Date.now())

  const running = Object.values(launches).find((launch) =>
    ['running', 'starting', 'preparing', 'downloading'].includes(launch.phase),
  )
  const account =
    bootstrap?.accounts.find((a) => a.id === bootstrap.activeAccountId) ?? bootstrap?.accounts[0]

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const unsubscribe = window.bamboo.onEvent((event) => {
      if (event.type === 'window-state') setMaximized(event.payload.maximized)
    })
    return unsubscribe
  }, [])

  return (
    <header className="titlebar">
      <div className="titlebar-left">
        <div className="titlebar-brandmark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="17" height="17">
            <path
              d="M6 21c0-7 1-12 5-17M11 21c0-5 2-9 6-11M7.5 12.5C4.8 11 3 8.8 2.6 6c2.8.1 5.2 1.6 6.7 4.2M11.5 9.2C12.6 5.5 15.2 3 18.8 2.5c-.1 3.4-2 6.1-5.4 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="titlebar-wordmark">BAMBOO</span>
        <span className="titlebar-divider" />
        <span className="titlebar-page">{PAGE_LABELS[page] ?? '首页'}</span>
        {running && (
          <button className="running-pill" onClick={() => setPage('instances')} type="button">
            <span className="running-dot" />
            <Play size={11} fill="currentColor" />
            <span>{running.instanceName}</span>
            <span className="running-time">
              {formatDuration(now - (running.windowReadyAt ?? running.startedAt ?? now), 'short')}
            </span>
          </button>
        )}
      </div>
      <div className="titlebar-right no-drag">
        <button
          className="command-hint"
          type="button"
          title="快速前往 (Ctrl+K)"
          aria-label="快速前往"
          onClick={() => setCommandOpen(true)}
        >
          <Search size={15} strokeWidth={2} />
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="titlebar-account"
          type="button"
          onClick={() => setAccountModalOpen(true)}
          title="账户"
        >
          {account ? (
            <>
              <SkinFace dataUrl={account.skin?.dataUrl} name={account.name} size={24} round />
              <span>{account.name}</span>
              <ChevronsUpDown size={13} />
            </>
          ) : (
            <>
              <span className="account-empty-dot" />
              <span>登录账户</span>
              <ArrowUpRight size={13} />
            </>
          )}
        </button>
        <div className="window-controls">
          <button
            className="window-button"
            type="button"
            title="最小化"
            aria-label="最小化"
            onClick={() => void window.bamboo.minimizeWindow()}
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <button
            className="window-button"
            type="button"
            title={maximized ? '还原' : '最大化'}
            aria-label={maximized ? '还原' : '最大化'}
            onClick={async () => setMaximized(await window.bamboo.toggleMaximizeWindow())}
          >
            {maximized ? <Copy size={14} strokeWidth={2.4} /> : <Square size={15} strokeWidth={2.2} />}
          </button>
          <button
            className="window-button close"
            type="button"
            title="关闭"
            aria-label="关闭"
            onClick={() => void window.bamboo.closeWindow()}
          >
            <X size={19} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
