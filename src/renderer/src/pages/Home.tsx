import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Clock3,
  Compass,
  DownloadCloud,
  Leaf,
  PackageOpen,
  Play,
  Plus,
  Puzzle,
  RadioTower,
  Settings2,
  Square,
  Sprout,
  Users,
} from 'lucide-react'
import type { Instance } from '@shared/types'
import { useActiveInstance, useBamboo, useCurrentAccount, messageOf } from '../store'
import { formatDay, formatDuration, greeting, loaderLabel, loaderTone, timeAgo } from '../lib/format'
import { BambooArt } from '../components/BambooArt'
import { InstanceGlyph } from '../components/InstanceGlyph'
import { SkinPreview } from '../components/SkinPreview'
import { EmptyState } from '../components/ui'

export function HomePage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const setPage = useBamboo((s) => s.setPage)
  const setActiveInstance = useBamboo((s) => s.setActiveInstance)
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen)
  const launches = useBamboo((s) => s.launches)
  const jobs = useBamboo((s) => s.jobs)
  const addToast = useBamboo((s) => s.addToast)
  const activeInstance = useActiveInstance()
  const account = useCurrentAccount()
  const [modCount, setModCount] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [showAllInstances, setShowAllInstances] = useState(false)

  const activeLaunch = activeInstance ? launches[activeInstance.id] : undefined
  const gameRunning = activeLaunch?.phase === 'running'
  const launchingPhase =
    activeLaunch && ['starting', 'preparing', 'downloading'].includes(activeLaunch.phase)
  const launchJob = Object.values(jobs)
    .filter(
      (job) =>
        job.kind === 'game' &&
        job.status === 'running' &&
        job.title.startsWith('启动') &&
        activeInstance &&
        job.title.includes(activeInstance.name),
    )
    .sort((a, b) => b.startedAt - a.startedAt)[0]
  const launching = Boolean(busy || launchingPhase)
  const features = bootstrap?.settings.features

  useEffect(() => {
    let cancelled = false
    if (!activeInstance) {
      setModCount(null)
      return
    }
    window.bamboo
      .getInstalledMods(activeInstance.id)
      .then((mods) => !cancelled && setModCount(mods.filter((m) => m.enabled).length))
      .catch(() => !cancelled && setModCount(null))
    return () => {
      cancelled = true
    }
  }, [activeInstance?.id, activeInstance?.updatedAt])

  const stats = useMemo(() => {
    const sessions = bootstrap?.sessions ?? []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const days = Array.from({ length: 7 }, (_, index) => {
      const start = today.getTime() - (6 - index) * 86400000
      const end = start + 86400000
      return {
        label: formatDay(start).replace('/', '/'),
        value: sessions
          .filter((s) => s.startedAt >= start && s.startedAt < end)
          .reduce((sum, s) => sum + s.durationMs, 0),
      }
    })
    const week = days.reduce((sum, day) => sum + day.value, 0)
    return { days, week }
  }, [bootstrap?.sessions])

  const recent = [...(bootstrap?.instances ?? [])].sort((a, b) => {
    if (bootstrap?.activeInstanceId === a.id) return -1
    if (bootstrap?.activeInstanceId === b.id) return 1
    return (b.lastPlayedAt ?? b.createdAt) - (a.lastPlayedAt ?? a.createdAt)
  })
  const visibleRecent = showAllInstances ? recent : recent.slice(0, 3)

  async function start(instance: Instance) {
    if (!account) {
      setAccountModalOpen(true)
      addToast({ kind: 'info', title: '先选一个身份', message: '登录或创建一个离线账户，就可以出发了。' })
      return
    }
    setBusy(true)
    try {
      await setActiveInstance(instance.id)
      await window.bamboo.launch(instance.id)
    } catch (error) {
      addToast({ kind: 'error', title: '没有启动成功', message: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  async function stop(instance: Instance) {
    try {
      await window.bamboo.killGame(instance.id)
    } catch (error) {
      addToast({ kind: 'error', title: '结束游戏失败', message: messageOf(error) })
    }
  }

  const maxDay = Math.max(1, ...stats.days.map((d) => d.value))

  return (
    <div className="page home-page">
      <div className="home-topline">
        <div>
          <div className="home-greeting">{greeting()}</div>
          <div className="home-date">
            {new Intl.DateTimeFormat('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            }).format(new Date()).replace('星期', ' · 星期')}
          </div>
        </div>
      </div>

      <section className={`home-hero glass-card ${!activeInstance ? 'empty-hero' : ''}`}>
        <div className="hero-haze" />
        <BambooArt />
        <div className="hero-copy">
          <h1>
            把世界，
            <br />
            种成一片<span>竹林</span>。
          </h1>
          <p className="hero-sub">
            {activeInstance
              ? '风穿过竹叶，新的旅程已经准备好。'
              : '先种下第一个世界，再去更远的地方。'}
          </p>

          {activeInstance ? (
            <div className="hero-current">
              <button
                className="hero-current-main"
                type="button"
                onClick={() => setPage('instances')}
                title="管理实例"
              >
                <InstanceGlyph icon={activeInstance.icon} size={40} />
                <span>
                  <strong>{activeInstance.name}</strong>
                  <small>
                    Minecraft {activeInstance.mcVersion ?? '未知版本'} · {loaderLabel(activeInstance.loader)}
                    {activeInstance.loader.version ? ` ${activeInstance.loader.version}` : ''}
                  </small>
                </span>
              </button>
              <span className={`loader-badge ${loaderTone(activeInstance.loader)}`}>
                {loaderLabel(activeInstance.loader)}
              </span>
            </div>
          ) : (
            <div className="hero-current ghost">
              <span className="hero-current-empty">
                <Sprout size={18} />
                还没有世界
              </span>
            </div>
          )}

          {launching && activeInstance ? (
            <LaunchProgress
              instance={activeInstance}
              state={activeLaunch}
              job={launchJob}
            />
          ) : (
            <div className="hero-actions">
              {activeInstance ? (
                gameRunning ? (
                  <>
                    <button className="launch-button running" type="button" onClick={() => stop(activeInstance)}>
                      <span className="launch-icon">
                        <Square size={15} fill="currentColor" />
                      </span>
                      <span>
                        <small>正在运行</small>
                        结束游戏
                      </span>
                    </button>
                    <button className="hero-secondary" type="button" onClick={() => setPage('instances')}>
                      <Compass size={16} />
                      查看实例
                    </button>
                  </>
                ) : (
                  <>
                    <button className="launch-button" type="button" onClick={() => void start(activeInstance)}>
                      <span className="launch-icon">
                        <Play size={17} fill="currentColor" />
                      </span>
                      <span>
                        <small>{account ? `以 ${account.name} 身份` : '需要先添加账户'}</small>
                        启动游戏
                      </span>
                      <ArrowRight size={18} className="launch-arrow" />
                    </button>
                    <button className="hero-secondary" type="button" onClick={() => setPage('instances')}>
                      <Settings2 size={16} />
                      实例设置
                    </button>
                  </>
                )
              ) : (
                <button className="launch-button" type="button" onClick={() => setPage('downloads')}>
                  <span className="launch-icon">
                    <Plus size={18} />
                  </span>
                  <span>
                    <small>从零开始</small>
                    安装第一个世界
                  </span>
                  <ArrowRight size={18} className="launch-arrow" />
                </button>
              )}
            </div>
          )}

          {activeInstance && (
            <div className="hero-status">
              Java {bootstrap?.javaCache[0]?.majorVersion ?? '待配置'}
              <span>·</span>
              {modCount === null ? '读取模组' : `${modCount} 个模组`}
            </div>
          )}
        </div>

        <div className="hero-account-card">
          <div className="hero-account-top">
            <button className="mini-link" type="button" onClick={() => setAccountModalOpen(true)}>
              切换账户
            </button>
          </div>
          {account ? (
            <>
              <div className="hero-account-preview">
                <SkinPreview
                  dataUrl={account.skin?.dataUrl}
                  model={account.skin?.model}
                  name={account.name}
                  width={150}
                  height={190}
                />
              </div>
              <div className="hero-account-name">
                <strong>{account.name}</strong>
                <span>{account.type === 'microsoft' ? 'Microsoft' : '离线账户'}</span>
              </div>
            </>
          ) : (
            <div className="hero-account-empty">
              <div className="hero-account-empty-icon">
                <Users size={26} />
              </div>
              <strong>还没有旅行者</strong>
              <p>登录 Microsoft 账户，或创建一个离线身份。</p>
              <button className="btn btn-soft" type="button" onClick={() => setAccountModalOpen(true)}>
                添加账户
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="quick-grid">
        <QuickCard
          icon={<DownloadCloud size={20} />}
          label="种下新世界"
          hint="下载游戏核心与加载器"
          onClick={() => setPage('downloads')}
          tone="green"
        />
        {features?.mods !== false && (
          <QuickCard
            icon={<Puzzle size={20} />}
            label="收集模组"
            hint="Modrinth 与 CurseForge"
            onClick={() => setPage('mods')}
            tone="warm"
          />
        )}
        {features?.modpacks !== false && (
          <QuickCard
            icon={<PackageOpen size={20} />}
            label="打开整合包"
            hint="拖入即自动安装"
            onClick={() => setPage('modpacks')}
            tone="blue"
          />
        )}
        {features?.multiplayer !== false && (
          <QuickCard
            icon={<RadioTower size={20} />}
            label="联机"
            hint="局域网与端口映射"
            onClick={() => setPage('multiplayer')}
            tone="violet"
          />
        )}
      </section>

      <div className="home-lower">
        <section className="home-section recent-instances">
          <div className="section-heading">
            <h2>最近</h2>
            <button className="text-button" type="button" onClick={() => setPage('instances')}>
              全部 <ArrowRight size={14} />
            </button>
          </div>
          {recent.length ? (
            <div className={`instance-mini-grid ${showAllInstances ? 'show-all' : ''}`}>
              {visibleRecent.map((instance) => {
                const launch = launches[instance.id]
                const isRunning =
                  launch && ['running', 'starting', 'preparing', 'downloading'].includes(launch.phase)
                return (
                  <button
                    type="button"
                    key={instance.id}
                    className={`instance-mini-card ${bootstrap?.activeInstanceId === instance.id ? 'active' : ''}`}
                    onClick={() => {
                      void setActiveInstance(instance.id)
                      setPage('instances')
                    }}
                  >
                    <div className="instance-mini-head">
                      <InstanceGlyph icon={instance.icon} size={42} />
                      <span className={`loader-badge ${loaderTone(instance.loader)}`}>
                        {loaderLabel(instance.loader)}
                      </span>
                    </div>
                    <strong>{instance.name}</strong>
                    <span className="instance-mini-version">Minecraft {instance.mcVersion}</span>
                    <div className="instance-mini-foot">
                      <span>
                        <Clock3 size={12} />
                        {timeAgo(instance.lastPlayedAt)}
                      </span>
                      {isRunning ? (
                        <span className="mini-running">
                          <span className="running-dot" /> 运行中
                        </span>
                      ) : (
                        <span className="mini-play">
                          <Play size={12} fill="currentColor" />
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
              {recent.length > 3 && !showAllInstances && (
                <button className="instance-more-card" type="button" onClick={() => setShowAllInstances(true)}>
                  <Plus size={18} />
                  <span>还有 {recent.length - 3} 个世界</span>
                </button>
              )}
            </div>
          ) : (
            <EmptyState
              compact
              icon={<Sprout size={24} />}
              title="还没有实例"
              description="去下载一个 Minecraft 版本。"
              action={
                <button className="btn btn-primary" type="button" onClick={() => setPage('downloads')}>
                  去下载
                </button>
              }
            />
          )}
        </section>

        <section className="home-section playtime-card glass-card">
          <div className="section-heading compact">
            <h2>本周</h2>
            <span className="week-total">{formatDuration(stats.week, 'short')}</span>
          </div>
          <div className="mini-chart">
            {stats.days.map((day, index) => (
              <div className="mini-bar-col" key={day.label}>
                <span className="mini-bar-value">{day.value > 0 ? formatDuration(day.value, 'short') : ''}</span>
                <div className="mini-bar-track">
                  <div
                    className={`mini-bar ${index === stats.days.length - 1 ? 'today' : ''}`}
                    style={{ height: `${Math.max(3, (day.value / maxDay) * 100)}%` }}
                  />
                </div>
                <span className="mini-bar-label">{day.label}</span>
              </div>
            ))}
          </div>
          <div className="playtime-foot">
            <span>
              <Clock3 size={13} /> 累计 {formatDuration(bootstrap?.totalPlayTimeMs ?? 0, 'short')}
            </span>
            <button className="text-button small" type="button" onClick={() => setPage('stats')}>
              全部统计 <ArrowRight size={13} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function LaunchProgress({
  instance,
  state,
  job,
}: {
  instance: Instance
  state?: import('@shared/types').LaunchState
  job?: import('@shared/types').JobProgress
}) {
  const phase = state?.phase
  const fallback = phase === 'starting' ? 82 : phase === 'downloading' ? 46 : 12
  const progress = Math.max(fallback, job?.progress ?? 0)
  const stage = progress >= 76 ? 2 : progress >= 36 ? 1 : 0
  const stages = ['检查', '准备', '启动']
  return (
    <div className="launch-progress">
      <div className="launch-progress-head">
        <span className="launch-progress-icon">
          <Leaf size={16} />
        </span>
        <span>
          <strong>{instance.name}</strong>
          <small>{job?.detail || state?.message || '正在准备游戏…'}</small>
        </span>
        <b>{Math.round(progress)}%</b>
      </div>
      <div className="launch-growth">
        <div className="launch-growth-track">
          <span className="launch-growth-fill" style={{ width: `${Math.min(100, progress)}%` }} />
          <span className="launch-growth-leaf" style={{ left: `${Math.min(97, progress)}%` }} />
        </div>
        <div className="launch-stages">
          {stages.map((label, index) => (
            <span key={label} className={index <= stage ? 'active' : ''}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickCard({
  icon,
  label,
  hint,
  onClick,
  tone,
}: {
  icon: React.ReactNode
  label: string
  hint: string
  onClick: () => void
  tone: 'green' | 'warm' | 'blue' | 'violet'
}) {
  return (
    <button type="button" className={`quick-card tone-${tone}`} onClick={onClick}>
      <span className="quick-icon">{icon}</span>
      <span className="quick-copy">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <ArrowRight size={15} className="quick-arrow" />
    </button>
  )
}
