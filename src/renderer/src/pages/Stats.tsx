import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock3,
  Flame,
  Leaf,
  Play,
  Sprout,
  Timer,
  TrendingUp,
} from 'lucide-react'
import type { StatsOverview } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { formatDate, formatDuration } from '../lib/format'
import { Badge, EmptyState, PageHeader, Spinner } from '../components/ui'
import { InstanceGlyph } from '../components/InstanceGlyph'

export function StatsPage() {
  const addToast = useBamboo((s) => s.addToast)
  const setPage = useBamboo((s) => s.setPage)
  const bootstrap = useBamboo((s) => s.bootstrap)
  const [stats, setStats] = useState<StatsOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    void load()
  }, [bootstrap?.sessions.length, bootstrap?.instances.length])

  async function load() {
    try {
      setStats(await window.bamboo.getStats())
    } catch (error) {
      addToast({ kind: 'error', title: '读取统计失败', message: messageOf(error) })
    } finally {
      setLoading(false)
    }
  }

  const maxDay = Math.max(1, ...(stats?.daily.map((d) => d.durationMs) ?? [0]))
  const total = stats?.totalPlayTimeMs ?? 0
  const today = stats?.todayPlayTimeMs ?? 0
  const week = stats?.weekPlayTimeMs ?? 0
  const recent = stats?.sessions.slice(0, 8) ?? []
  const totalHours = Math.floor(total / 3_600_000)
  const totalMinutes = Math.floor((total % 3_600_000) / 60_000)

  return (
    <div className="page stats-page">
      <PageHeader
        eyebrow="TIME WELL SPENT"
        title="统计"
        subtitle="不是浪费时间，是把时间种进了另一个世界。"
        actions={
          <button className="btn btn-ghost" type="button" onClick={() => void load()}>
            <BarChart3 size={15} /> 刷新数据
          </button>
        }
      />

      {loading ? (
        <div className="stats-loading"><Spinner size={24} /> 正在数竹叶…</div>
      ) : (
        <>
          <div className="stats-hero-grid">
            <section className="stats-total glass-card">
              <div className="stats-total-glow" />
              <span className="section-kicker">ALL TIME</span>
              <div className="stats-total-number">
                {totalHours > 0 ? totalHours : totalMinutes}
                <span>{totalHours > 0 ? '小时' : '分钟'}</span>
              </div>
              <p>在方块世界里度过的总时间</p>
              <div className="stats-total-foot">
                <span><CalendarDays size={13} /> {stats?.sessions.length ?? 0} 次出发记录</span>
                <span><Flame size={13} /> 最长一次 {formatDuration(Math.max(0, ...(stats?.sessions.map((s) => s.durationMs) ?? [0])), 'short')}</span>
              </div>
            </section>
            <div className="stat-metric-card glass-card">
              <span className="stat-metric-icon"><Timer size={19} /></span>
              <span className="stat-metric-label">今天</span>
              <strong>{formatDuration(today, 'short')}</strong>
              <p>{today > 0 ? '竹林今天很热闹。' : '今天还没有回去看看。'}</p>
            </div>
            <div className="stat-metric-card glass-card">
              <span className="stat-metric-icon"><TrendingUp size={19} /></span>
              <span className="stat-metric-label">最近 7 天</span>
              <strong>{formatDuration(week, 'short')}</strong>
              <p>{week > 0 ? '稳定的竹风。' : '等待下一次出发。'}</p>
            </div>
          </div>

          <div className="stats-chart-row">
            <section className="glass-card stats-chart-card">
              <div className="section-heading compact">
                <div>
                  <span className="section-kicker">LAST 7 DAYS</span>
                  <h2>一周的竹影</h2>
                </div>
                <span className="chart-legend"><i /> 游玩时长</span>
              </div>
              <div className="stats-chart">
                {(stats?.daily ?? []).map((day, index) => (
                  <div className="stats-chart-col" key={day.date}>
                    <span className="stats-chart-value">{day.durationMs > 0 ? formatDuration(day.durationMs, 'short') : ''}</span>
                    <div className="stats-chart-track">
                      <div
                        className={`stats-chart-bar ${index === (stats?.daily.length ?? 1) - 1 ? 'today' : ''}`}
                        style={{ height: `${Math.max(2, (day.durationMs / maxDay) * 100)}%` }}
                      >
                        <span className="bar-leaf" />
                      </div>
                    </div>
                    <span className="stats-chart-label">{day.date.slice(5).replace('-', '/')}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card stats-ranking">
              <div className="section-heading compact">
                <div>
                  <span className="section-kicker">FAVORITE GROVES</span>
                  <h2>最常去的地方</h2>
                </div>
              </div>
              {stats?.byInstance.filter((i) => i.playTimeMs > 0).length ? (
                <div className="ranking-list">
                  {stats.byInstance.filter((i) => i.playTimeMs > 0).slice(0, 5).map((item, index) => {
                    const instance = bootstrap?.instances.find((i) => i.id === item.instanceId)
                    return (
                      <button
                        type="button"
                        className="ranking-row"
                        key={item.instanceId}
                        onClick={() => {
                          void useBamboo.getState().setActiveInstance(item.instanceId)
                          setPage('instances')
                        }}
                      >
                        <span className="ranking-number">{String(index + 1).padStart(2, '0')}</span>
                        <InstanceGlyph icon={instance?.icon} size={34} />
                        <span className="ranking-copy">
                          <strong>{item.name}</strong>
                          <small>{item.launches} 次出发 · {item.lastPlayedAt ? `上次 ${formatDate(item.lastPlayedAt)}` : '尚无记录'}</small>
                        </span>
                        <span className="ranking-time">{formatDuration(item.playTimeMs, 'short')}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    )
                  })}
                </div>
              ) : (
                <EmptyState compact icon={<Sprout size={24} />} title="还没有游玩记录" description="启动一次游戏，这里就会长出第一根竹子。" />
              )}
            </section>
          </div>

          <section className="glass-card stats-sessions">
            <div className="section-heading compact">
              <div>
                <span className="section-kicker">JOURNEY LOG</span>
                <h2>出发记录</h2>
              </div>
              <span className="muted tiny">最近 {recent.length} 次</span>
            </div>
            {recent.length ? (
              <div className="session-table">
                <div className="session-table-head">
                  <span>世界</span>
                  <span>账户</span>
                  <span>开始</span>
                  <span>时长</span>
                  <span>结果</span>
                </div>
                {recent.map((session) => (
                  <div className="session-table-row" key={session.id}>
                    <span className="session-world"><span className="session-dot" />{session.instanceName}</span>
                    <span>{session.accountName}</span>
                    <span>{formatDate(session.startedAt)}</span>
                    <span>{formatDuration(session.durationMs, 'short')}</span>
                    <span>
                      {session.crashed ? <Badge tone="red">崩溃</Badge> : <Badge tone="green"><Leaf size={10} /> 正常</Badge>}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState compact icon={<Clock3 size={24} />} title="时间还停在出发前" description="去启动一个世界吧，回来就能看到记录。" action={<button className="btn btn-soft small" type="button" onClick={() => setPage('instances')}><Play size={13} /> 去实例</button>} />
            )}
          </section>
        </>
      )}
    </div>
  )
}
