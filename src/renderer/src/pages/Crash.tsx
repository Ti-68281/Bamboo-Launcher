import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  CircleCheck,
  FileWarning,
  HeartPulse,
  ListChecks,
  Loader2,
  Puzzle,
  RefreshCw,
  Sparkles,
  Trash2,
  Wrench,
} from 'lucide-react'
import type { CrashAnalysis } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { formatDate, timeAgo } from '../lib/format'
import { Badge, EmptyState, InlineNotice, PageHeader, Spinner } from '../components/ui'

export function CrashPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const activeInstance = useBamboo((s) => s.bootstrap?.instances.find((i) => i.id === s.bootstrap?.activeInstanceId))
  const setActiveInstance = useBamboo((s) => s.setActiveInstance)
  const addToast = useBamboo((s) => s.addToast)
  const [crashes, setCrashes] = useState<CrashAnalysis[]>(bootstrap?.recentCrashes ?? [])
  const [selectedId, setSelectedId] = useState(bootstrap?.recentCrashes[0]?.id ?? '')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [instanceId, setInstanceId] = useState(activeInstance?.id ?? bootstrap?.instances[0]?.id ?? '')
  const selected = crashes.find((c) => c.id === selectedId) ?? crashes[0]

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    const latest = bootstrap?.recentCrashes[0]
    if (!latest) return
    setCrashes((current) =>
      current.some((item) => item.id === latest.id) ? current : [latest, ...current],
    )
    setSelectedId((current) => current || latest.id)
  }, [bootstrap?.recentCrashes[0]?.id])

  async function load() {
    setLoading(true)
    try {
      const list = await window.bamboo.listCrashes()
      setCrashes(list)
      if (!selectedId && list[0]) setSelectedId(list[0].id)
    } catch (error) {
      addToast({ kind: 'error', title: '读取崩溃记录失败', message: messageOf(error) })
    } finally {
      setLoading(false)
    }
  }

  async function analyze() {
    setAnalyzing(true)
    try {
      const result = await window.bamboo.analyzeCrash(instanceId || undefined)
      if (result) {
        setCrashes((current) => [result, ...current.filter((c) => c.id !== result.id)])
        setSelectedId(result.id)
        addToast({ kind: 'success', title: '分析完成', message: result.reason })
      } else {
        addToast({ kind: 'info', title: '没有找到可分析的崩溃', message: '请先启动一次游戏，或检查实例目录。' })
      }
    } catch (error) {
      addToast({ kind: 'warning', title: '暂时没有可分析的报告', message: messageOf(error) })
    } finally {
      setAnalyzing(false)
    }
  }

  async function clear() {
    try {
      await window.bamboo.clearCrashes()
      setCrashes([])
      setSelectedId('')
      addToast({ kind: 'success', title: '已清空诊断记录' })
    } catch (error) {
      addToast({ kind: 'error', title: '清空失败', message: messageOf(error) })
    }
  }

  const affected = useMemo(() => {
    if (!selected) return undefined
    return bootstrap?.instances.find((i) => i.id === selected.instanceId)
  }, [selected, bootstrap?.instances])

  return (
    <div className="page crash-page">
      <PageHeader
        eyebrow="CRASH DIAGNOSTICS"
        title="诊断"
        subtitle="不猜原因。读取日志、堆栈和模组列表，把问题定位到具体枝叶。"
        actions={
          <>
            <select
              className="select compact-select"
              value={instanceId}
              onChange={(event) => {
                setInstanceId(event.target.value)
                void setActiveInstance(event.target.value)
              }}
            >
              {(bootstrap?.instances ?? []).map((instance) => (
                <option key={instance.id} value={instance.id}>{instance.name}</option>
              ))}
            </select>
            <button className="btn btn-primary" type="button" disabled={analyzing || !instanceId} onClick={() => void analyze()}>
              {analyzing ? <><Loader2 size={15} className="spin" /> 正在分析</> : <><HeartPulse size={16} /> 分析最近崩溃</>}
            </button>
          </>
        }
      />

      <div className="crash-layout">
        <aside className="crash-history glass-card">
          <div className="crash-history-head">
            <div>
              <span className="section-kicker">RECENT REPORTS</span>
              <h2>诊断记录</h2>
            </div>
            <span className="crash-count">{crashes.length}</span>
          </div>
          {loading ? (
            <div className="crash-loading"><Spinner /> 正在读取…</div>
          ) : crashes.length ? (
            <div className="crash-list">
              {crashes.map((crash) => (
                <button
                  type="button"
                  key={crash.id}
                  className={`crash-row ${selected?.id === crash.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(crash.id)}
                >
                  <span className={`crash-dot ${crash.severity}`} />
                  <span className="crash-row-copy">
                    <strong>{crash.reason}</strong>
                    <small>{crash.instanceName} · {timeAgo(crash.createdAt)}</small>
                  </span>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              compact
              icon={<HeartPulse size={25} />}
              title="还没有诊断记录"
              description="游戏崩溃后会自动分析；也可以手动分析最近一份报告。"
              action={<button className="btn btn-soft small" type="button" onClick={() => void analyze()} disabled={analyzing}>分析一次</button>}
            />
          )}
          {crashes.length > 0 && (
            <button className="crash-clear" type="button" onClick={() => void clear()}>
              <Trash2 size={13} /> 清空记录
            </button>
          )}
        </aside>

        {selected ? (
          <section className="crash-detail glass-card">
            <div className={`crash-detail-banner severity-${selected.severity}`}>
              <span className="crash-banner-icon">
                <AlertTriangle size={22} />
              </span>
              <div>
                <span className="section-kicker">LIKELY CAUSE</span>
                <h2>{selected.reason}</h2>
                <p>{selected.instanceName} · {formatDate(selected.createdAt)}</p>
              </div>
              <Badge tone={selected.severity === 'high' ? 'red' : selected.severity === 'medium' ? 'amber' : 'neutral'}>
                {selected.severity === 'high' ? '高概率问题' : selected.severity === 'medium' ? '需要留意' : '轻微异常'}
              </Badge>
            </div>

            <div className="crash-detail-body">
              <div className="crash-summary-block">
                <span className="section-kicker">WHAT HAPPENED</span>
                <p className="crash-summary-text">{selected.summary}</p>
                {selected.exception && <code className="crash-exception">{selected.exception}</code>}
              </div>

              {selected.likelyMods.length > 0 && (
                <div className="crash-section">
                  <div className="crash-section-head">
                    <Puzzle size={16} />
                    <h3>可能相关的模组</h3>
                    <span>{selected.likelyMods.length} 个</span>
                  </div>
                  <div className="likely-mods">
                    {selected.likelyMods.map((mod) => (
                      <div className="likely-mod" key={`${mod.id}-${mod.fileName}`}>
                        <span className="likely-mod-icon"><Puzzle size={15} /></span>
                        <span>
                          <strong>{mod.name}</strong>
                          <small>{mod.fileName ?? mod.id ?? '未知文件'}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="crash-section">
                <div className="crash-section-head">
                  <Wrench size={16} />
                  <h3>下一步可以这样试</h3>
                </div>
                <ol className="crash-suggestions">
                  {selected.suggestions.map((suggestion, index) => (
                    <li key={suggestion}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {suggestion}
                    </li>
                  ))}
                </ol>
              </div>

              {selected.logExcerpt && (
                <details className="crash-log">
                  <summary><ListChecks size={15} /> 查看堆栈摘要</summary>
                  <pre>{selected.logExcerpt}</pre>
                </details>
              )}
            </div>

            <footer className="crash-detail-foot">
              <div>
                {affected && (
                  <span className="crash-affected">
                    <Sparkles size={13} /> 受影响实例：{affected.name}
                  </span>
                )}
                {selected.exitCode !== null && selected.exitCode !== undefined && (
                  <span className="crash-exit">退出码 {selected.exitCode}</span>
                )}
              </div>
              <div className="crash-actions">
                {selected.reportPath && (
                  <button className="btn btn-soft small" type="button" onClick={() => void window.bamboo.openCrashReport(selected.reportPath!)}>
                    <FileWarning size={14} /> 打开报告
                  </button>
                )}
                {affected && (
                  <button className="btn btn-ghost small" type="button" onClick={() => void setActiveInstance(affected.id)}>
                    选中实例 <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </footer>
          </section>
        ) : (
          <section className="crash-detail crash-empty glass-card">
            <div className="crash-empty-art">
              <CircleCheck size={42} />
              <span className="leaf-dot one" />
              <span className="leaf-dot two" />
            </div>
            <h2>目前没有崩溃记录</h2>
            <p>如果游戏异常退出，Bamboo 会自动读取 crash-report 与 latest.log，分析 Java、模组依赖、内存、图形驱动等常见原因。</p>
            <div className="crash-feature-row">
              <span><Puzzle size={14} /> 定位疑似模组</span>
              <span><Wrench size={14} /> 给出修复建议</span>
              <span><FileWarning size={14} /> 一键打开报告</span>
            </div>
            <button className="btn btn-primary" type="button" disabled={!instanceId || analyzing} onClick={() => void analyze()}>
              {analyzing ? '正在分析…' : '分析最近一份报告'}
            </button>
          </section>
        )}
      </div>

      <InlineNotice tone="neutral" icon={<RefreshCw size={15} />}>
        崩溃分析基于本地日志和模组元数据，不会上传你的文件。若模组作者需要日志，请直接分享 crash-report。
      </InlineNotice>
    </div>
  )
}
