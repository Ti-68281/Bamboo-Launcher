import { useEffect, useState } from 'react'
import {
  Boxes,
  ChevronRight,
  Clock3,
  Coffee,
  FolderOpen,
  Layers3,
  Loader2,
  MoreHorizontal,
  PackageOpen,
  Play,
  Plus,
  Puzzle,
  Settings2,
  Sparkles,
  Square,
  Trash2,
} from 'lucide-react'
import type {
  Account,
  Instance,
  InstalledMod,
  JavaRuntime,
  JvmProfile,
  LoaderType,
  LoaderVersionOption,
} from '@shared/types'
import { useBamboo, useCurrentAccount, messageOf } from '../store'
import {
  formatDuration,
  formatDate,
  joinJvmArgs,
  loaderLabel,
  loaderTone,
  parseJvmArgs,
  timeAgo,
} from '../lib/format'
import { InstanceGlyph } from '../components/InstanceGlyph'
import { Badge, EmptyState, InlineNotice, Modal, PageHeader, Segmented, Spinner, Toggle } from '../components/ui'
import { SkinFace } from '../components/SkinPreview'

export function InstancesPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const setPage = useBamboo((s) => s.setPage)
  const setActiveInstance = useBamboo((s) => s.setActiveInstance)
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen)
  const refresh = useBamboo((s) => s.refresh)
  const addToast = useBamboo((s) => s.addToast)
  const launches = useBamboo((s) => s.launches)
  const account = useCurrentAccount()
  const instances = bootstrap?.instances ?? []
  const selected =
    instances.find((i) => i.id === bootstrap?.activeInstanceId) ?? instances[0]
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [loaderOpen, setLoaderOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mods, setMods] = useState<InstalledMod[]>([])
  const [modsLoading, setModsLoading] = useState(false)
  const [recentSessions, setRecentSessions] = useState(
    (bootstrap?.sessions ?? []).filter((s) => s.instanceId === selected?.id).slice(0, 4),
  )

  const launchState = selected ? launches[selected.id] : undefined
  const running = launchState && ['running', 'starting', 'preparing', 'downloading'].includes(launchState.phase)

  useEffect(() => {
    if (!selected) return
    setRecentSessions(
      (bootstrap?.sessions ?? []).filter((s) => s.instanceId === selected.id).slice(0, 4),
    )
  }, [bootstrap?.sessions, selected?.id, selected?.playTimeMs])

  useEffect(() => {
    if (!selected) {
      setMods([])
      return
    }
    let cancelled = false
    setModsLoading(true)
    window.bamboo
      .getInstalledMods(selected.id)
      .then((list) => !cancelled && setMods(list))
      .catch(() => !cancelled && setMods([]))
      .finally(() => !cancelled && setModsLoading(false))
    return () => {
      cancelled = true
    }
  }, [selected?.id, selected?.updatedAt, bootstrap?.instances.length])

  async function choose(instance: Instance) {
    await setActiveInstance(instance.id)
  }

  async function launch() {
    if (!selected) return
    if (!account) {
      setAccountModalOpen(true)
      return
    }
    setBusy(true)
    try {
      await window.bamboo.launch(selected.id)
    } catch (error) {
      addToast({ kind: 'error', title: '启动失败', message: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  async function stop() {
    if (!selected) return
    try {
      await window.bamboo.killGame(selected.id)
    } catch (error) {
      addToast({ kind: 'error', title: '结束游戏失败', message: messageOf(error) })
    }
  }

  async function remove() {
    if (!selected) return
    try {
      await window.bamboo.deleteInstance(selected.id)
      setDeleteOpen(false)
      await refresh()
      addToast({ kind: 'success', title: '实例已移除', message: '游戏文件夹已移入回收站。' })
    } catch (error) {
      addToast({ kind: 'error', title: '删除实例失败', message: messageOf(error) })
    }
  }

  if (!instances.length) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="YOUR GROVES"
          title="实例"
          subtitle="每个实例，都是一片可以独立生长的小世界。"
          actions={
            <button className="btn btn-primary" type="button" onClick={() => setPage('downloads')}>
              <Plus size={16} /> 新建实例
            </button>
          }
        />
        <div className="glass-card empty-page-card">
          <EmptyState
            icon={<Layers3 size={34} />}
            title="还没有任何实例"
            description="去下载页安装一个 Minecraft 版本，Bamboo 会自动为它创建实例。"
            action={
              <button className="btn btn-primary" type="button" onClick={() => setPage('downloads')}>
                <SproutIcon /> 安装第一个世界
              </button>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page instances-page">
      <PageHeader
        eyebrow="YOUR GROVES"
        title="实例"
        subtitle={`${instances.length} 个独立实例 · 配置、模组与存档互不打扰`}
        actions={
          <>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => void window.bamboo.openDataFolder()}
            >
              <FolderOpen size={16} /> 数据目录
            </button>
            <button className="btn btn-primary" type="button" onClick={() => setPage('downloads')}>
              <Plus size={16} /> 新建实例
            </button>
          </>
        }
      />

      <div className="instances-layout">
        <aside className="instances-list">
          {instances.map((instance) => {
            const state = launches[instance.id]
            const isRunning =
              state && ['running', 'starting', 'preparing', 'downloading'].includes(state.phase)
            return (
              <button
                key={instance.id}
                type="button"
                className={`instance-row ${selected?.id === instance.id ? 'selected' : ''}`}
                onClick={() => void choose(instance)}
              >
                <InstanceGlyph icon={instance.icon} size={46} />
                <span className="instance-row-copy">
                  <strong>{instance.name}</strong>
                  <small>
                    {instance.mcVersion} · {loaderLabel(instance.loader)}
                    {instance.loader.version ? ` ${instance.loader.version}` : ''}
                  </small>
                  <span className="instance-row-meta">
                    <Clock3 size={11} /> {formatDuration(instance.playTimeMs, 'short')}
                    <span className="dot-sep" />
                    {timeAgo(instance.lastPlayedAt)}
                  </span>
                </span>
                {isRunning ? (
                  <span className="instance-live">
                    <span className="running-dot" />
                  </span>
                ) : (
                  <ChevronRight size={16} className="instance-chevron" />
                )}
              </button>
            )
          })}
          <button type="button" className="instance-add-row" onClick={() => setPage('downloads')}>
            <span className="instance-add-icon">
              <Plus size={18} />
            </span>
            <span>
              <strong>种下新的世界</strong>
              <small>安装版本或整合包</small>
            </span>
          </button>
        </aside>

        {selected && (
          <section className="instance-detail glass-card">
            <div className="instance-detail-glow" />
            <header className="instance-detail-head">
              <div className="instance-detail-identity">
                <InstanceGlyph icon={selected.icon} size={68} />
                <div>
                  <div className="instance-detail-kicker">
                    <span className={`loader-badge ${loaderTone(selected.loader)}`}>
                      {loaderLabel(selected.loader)}
                    </span>
                    <span className="instance-version">Minecraft {selected.mcVersion}</span>
                    {selected.loader.version && (
                      <span className="instance-version muted">{selected.loader.version}</span>
                    )}
                  </div>
                  <h2>{selected.name}</h2>
                  <p>
                    创建于 {formatDate(selected.createdAt)} · 上次游玩 {timeAgo(selected.lastPlayedAt)}
                  </p>
                </div>
              </div>
              <div className="instance-detail-actions">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => void window.bamboo.openInstanceFolder(selected.id)}
                >
                  <FolderOpen size={15} /> 文件夹
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setSettingsOpen(true)}>
                  <Settings2 size={15} /> 设置
                </button>
                <button className="btn btn-ghost danger-text" type="button" onClick={() => setDeleteOpen(true)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </header>

            <div className="instance-stats-grid">
              <div className="instance-stat">
                <span className="instance-stat-icon"><Clock3 size={17} /></span>
                <span>
                  <small>累计游玩</small>
                  <strong>{formatDuration(selected.playTimeMs)}</strong>
                </span>
              </div>
              <div className="instance-stat">
                <span className="instance-stat-icon"><Puzzle size={17} /></span>
                <span>
                  <small>启用模组</small>
                  <strong>{modsLoading ? '…' : `${mods.filter((m) => m.enabled).length} 个`}</strong>
                </span>
              </div>
              <div className="instance-stat">
                <span className="instance-stat-icon"><Coffee size={17} /></span>
                <span>
                  <small>Java 运行时</small>
                  <strong>
                    {selected.javaPath
                      ? `手动 · ${selected.javaPath.split(/[\\/]/).slice(-3, -1).join('/') || 'Java'}`
                      : '自动匹配'}
                  </strong>
                </span>
              </div>
            </div>

            <div className="instance-detail-grid">
              <div className="instance-panel">
                <div className="instance-panel-head">
                  <div>
                    <span className="section-kicker">LAUNCH PAD</span>
                    <h3>出发准备</h3>
                  </div>
                  <span className="status-soft">
                    <span className={`account-type-dot ${account?.type ?? 'none'}`} />
                    {account?.name ?? '未登录'}
                  </span>
                </div>
                <div className="launch-specs">
                  <div>
                    <span>内存</span>
                    <strong>{selected.memoryMb} MB</strong>
                  </div>
                  <div>
                    <span>窗口</span>
                    <strong>{selected.fullscreen ? '全屏' : `${selected.width} × ${selected.height}`}</strong>
                  </div>
                  <div>
                    <span>JVM</span>
                    <strong>{profileLabel(selected.jvmProfile)}</strong>
                  </div>
                  <div>
                    <span>离线皮肤</span>
                    <strong>{selected.offlineSkin ? '已启用' : '关闭'}</strong>
                  </div>
                </div>
                {running ? (
                  <button className="launch-button compact running" type="button" onClick={() => void stop()}>
                    <span className="launch-icon"><Square size={14} fill="currentColor" /></span>
                    <span>
                      <small>{launchState?.message ?? '游戏运行中'}</small>
                      结束游戏
                    </span>
                  </button>
                ) : (
                  <button className="launch-button compact" type="button" disabled={busy} onClick={() => void launch()}>
                    <span className="launch-icon"><Play size={15} fill="currentColor" /></span>
                    <span>
                      <small>{busy ? '正在准备…' : account ? `以 ${account.name} 的身份` : '需要先添加账户'}</small>
                      {busy ? '启动中' : '启动游戏'}
                    </span>
                    <ChevronRight size={17} className="launch-arrow" />
                  </button>
                )}
                <div className="instance-sub-actions">
                  <button type="button" onClick={() => setPage('mods')}>
                    <Puzzle size={14} /> 管理模组
                  </button>
                  <button type="button" onClick={() => setLoaderOpen(true)}>
                    <Boxes size={14} /> 安装加载器
                  </button>
                  <button type="button" onClick={() => setPage('crash')}>
                    <Sparkles size={14} /> 崩溃诊断
                  </button>
                </div>
              </div>

              <div className="instance-panel">
                <div className="instance-panel-head">
                  <div>
                    <span className="section-kicker">RECENT MODS</span>
                    <h3>这片林子的模组</h3>
                  </div>
                  <button className="text-button small" type="button" onClick={() => setPage('mods')}>
                    查看全部 <ChevronRight size={13} />
                  </button>
                </div>
                <div className="mini-mod-list">
                  {modsLoading ? (
                    <div className="mini-mod-loading"><Spinner /> 正在读取模组…</div>
                  ) : mods.length ? (
                    mods.slice(0, 4).map((mod) => (
                      <div className="mini-mod-row" key={mod.fileName}>
                        {mod.iconDataUrl ? (
                          <img src={mod.iconDataUrl} alt="" />
                        ) : (
                          <span className="mini-mod-placeholder"><Puzzle size={15} /></span>
                        )}
                        <span>
                          <strong>{mod.name}</strong>
                          <small>{mod.version || '未知版本'}</small>
                        </span>
                        <Badge tone={mod.enabled ? 'green' : 'neutral'}>{mod.enabled ? '启用' : '禁用'}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="mini-mod-empty">
                      <Puzzle size={20} />
                      <span>还没有模组，去竹林集市看看。</span>
                      <button className="text-button small" type="button" onClick={() => setPage('mods')}>
                        浏览模组
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="instance-session-strip">
              <div>
                <span className="section-kicker">MEMORIES</span>
                <h3>最近游玩</h3>
              </div>
              <div className="session-chips">
                {recentSessions.length ? (
                  recentSessions.map((session) => (
                    <div className="session-chip" key={session.id}>
                      <span>{formatDate(session.startedAt)}</span>
                      <strong>{formatDuration(session.durationMs, 'short')}</strong>
                      {session.crashed && <Badge tone="red">崩溃</Badge>}
                    </div>
                  ))
                ) : (
                  <span className="muted">还没有出发记录。</span>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {selected && (
        <InstanceSettingsModal
          open={settingsOpen}
          instance={selected}
          accounts={bootstrap?.accounts ?? []}
          onClose={() => setSettingsOpen(false)}
          onSaved={async () => {
            setSettingsOpen(false)
            await refresh()
            addToast({ kind: 'success', title: '设置已保存', message: '下一次启动时生效。' })
          }}
        />
      )}
      {selected && (
        <LoaderInstallModal
          open={loaderOpen}
          instance={selected}
          onClose={() => setLoaderOpen(false)}
        />
      )}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="把这片竹林移走？"
        subtitle="实例文件夹会被移到回收站，存档与配置不会立即永久删除。"
        width={500}
        footer={
          <>
            <button className="btn btn-ghost" type="button" onClick={() => setDeleteOpen(false)}>再想想</button>
            <button className="btn btn-danger" type="button" onClick={() => void remove()}>
              <Trash2 size={15} /> 移到回收站
            </button>
          </>
        }
      >
        <InlineNotice tone="warning" icon={<Trash2 size={18} />} title={selected?.name}>
          如果游戏正在运行，需要先结束游戏。这个操作不会自动取消对历史游玩时长的记录。
        </InlineNotice>
      </Modal>
    </div>
  )
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M12 21V9M12 13c-5 0-7-3-7-7 4 0 7 2 7 7ZM12 10c4 0 6-2 6-6-4 0-6 2-6 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function profileLabel(profile: JvmProfile): string {
  return { balanced: '均衡', performance: '性能', compatibility: '兼容', custom: '自定义' }[profile]
}

function InstanceSettingsModal({
  open,
  instance,
  accounts,
  onClose,
  onSaved,
}: {
  open: boolean
  instance: Instance
  accounts: Account[]
  onClose: () => void
  onSaved: () => Promise<void>
}) {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const addToast = useBamboo((s) => s.addToast)
  const [name, setName] = useState(instance.name)
  const [memory, setMemory] = useState(instance.memoryMb)
  const [accountId, setAccountId] = useState(instance.accountId ?? '')
  const [javaPath, setJavaPath] = useState(instance.javaPath ?? '')
  const [profile, setProfile] = useState<JvmProfile>(instance.jvmProfile)
  const [jvmText, setJvmText] = useState(joinJvmArgs(instance.jvmArgs))
  const [width, setWidth] = useState(instance.width)
  const [height, setHeight] = useState(instance.height)
  const [fullscreen, setFullscreen] = useState(instance.fullscreen)
  const [offlineSkin, setOfflineSkin] = useState(instance.offlineSkin)
  const [autoJava, setAutoJava] = useState(instance.autoInstallJava)
  const [notes, setNotes] = useState(instance.notes)
  const [javaList, setJavaList] = useState<JavaRuntime[]>(bootstrap?.javaCache ?? [])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setName(instance.name)
    setMemory(instance.memoryMb)
    setAccountId(instance.accountId ?? '')
    setJavaPath(instance.javaPath ?? '')
    setProfile(instance.jvmProfile)
    setJvmText(joinJvmArgs(instance.jvmArgs))
    setWidth(instance.width)
    setHeight(instance.height)
    setFullscreen(instance.fullscreen)
    setOfflineSkin(instance.offlineSkin)
    setAutoJava(instance.autoInstallJava)
    setNotes(instance.notes)
    window.bamboo.listJava().then(setJavaList).catch(() => undefined)
  }, [open, instance])

  async function save() {
    setSaving(true)
    try {
      await window.bamboo.updateInstance(instance.id, {
        name,
        memoryMb: memory,
        accountId,
        javaPath: javaPath || undefined,
        jvmProfile: profile,
        jvmArgs: profile === 'custom' ? parseJvmArgs(jvmText) : instance.jvmArgs,
        width,
        height,
        fullscreen,
        offlineSkin,
        autoInstallJava: autoJava,
        notes,
      })
      await onSaved()
    } catch (error) {
      addToast({ kind: 'error', title: '保存失败', message: messageOf(error) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="实例设置"
      subtitle={`${instance.mcVersion} · ${loaderLabel(instance.loader)}`}
      width={720}
      footer={
        <>
          <button className="btn btn-ghost" type="button" onClick={onClose}>取消</button>
          <button className="btn btn-primary" type="button" disabled={saving} onClick={() => void save()}>
            {saving ? <><Loader2 size={15} className="spin" /> 保存中</> : '保存设置'}
          </button>
        </>
      }
    >
      <div className="form-section">
        <div className="form-section-title">基本</div>
        <div className="form-grid two">
          <label className="field">
            <span>实例名称</span>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span>使用账户</span>
            <select className="select" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              <option value="">跟随全局账户</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="field">
          <span>备注</span>
          <input className="input" value={notes} placeholder="例如：光影测试、和朋友联机…" onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>

      <div className="form-section">
        <div className="form-section-title">性能与 Java</div>
        <div className="memory-row">
          <label className="field grow">
            <span>最大内存 <strong>{memory} MB</strong></span>
            <input
              type="range"
              min={1024}
              max={16384}
              step={512}
              value={memory}
              onChange={(e) => setMemory(Number(e.target.value))}
            />
            <div className="range-labels"><span>1 GB</span><span>8 GB</span><span>16 GB</span></div>
          </label>
        </div>
        <label className="field">
          <span>Java 运行时</span>
          <select className="select" value={javaPath} onChange={(e) => setJavaPath(e.target.value)}>
            <option value="">自动选择（推荐）</option>
            {javaList.map((java) => (
              <option key={java.id} value={java.path}>
                Java {java.majorVersion} · {java.vendor} · {java.path}
              </option>
            ))}
          </select>
        </label>
        <div className="field">
          <span>JVM 预设</span>
          <Segmented
            value={profile}
            onChange={setProfile}
            options={[
              { value: 'balanced', label: '均衡' },
              { value: 'performance', label: '性能' },
              { value: 'compatibility', label: '兼容' },
              { value: 'custom', label: '自定义' },
            ]}
          />
        </div>
        {profile === 'custom' && (
          <label className="field">
            <span>自定义 JVM 参数</span>
            <textarea
              className="input code-input"
              rows={3}
              value={jvmText}
              onChange={(e) => setJvmText(e.target.value)}
              placeholder="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"
            />
          </label>
        )}
        <div className="switch-row">
          <div>
            <strong>自动下载缺失的 Java</strong>
            <span>没有匹配运行时，将从 Mojang 获取对应版本。</span>
          </div>
          <Toggle checked={autoJava} onChange={setAutoJava} />
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">画面</div>
        <div className="form-grid three">
          <label className="field">
            <span>宽度</span>
            <input className="input" type="number" min={640} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
          </label>
          <label className="field">
            <span>高度</span>
            <input className="input" type="number" min={480} value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          </label>
          <div className="field">
            <span>启动方式</span>
            <Segmented
              value={fullscreen ? 'fullscreen' : 'window'}
              onChange={(value) => setFullscreen(value === 'fullscreen')}
              options={[
                { value: 'window', label: '窗口' },
                { value: 'fullscreen', label: '全屏' },
              ]}
            />
          </div>
        </div>
        <div className="switch-row">
          <div>
            <strong>离线皮肤桥接</strong>
            <span>使用离线账户时，通过本地 authlib-injector 应用你的自定义皮肤。</span>
          </div>
          <Toggle checked={offlineSkin} onChange={setOfflineSkin} />
        </div>
      </div>
    </Modal>
  )
}

function LoaderInstallModal({
  open,
  instance,
  onClose,
}: {
  open: boolean
  instance: Instance
  onClose: () => void
}) {
  const addToast = useBamboo((s) => s.addToast)
  const [loader, setLoader] = useState<LoaderType>('fabric')
  const [versions, setVersions] = useState<LoaderVersionOption[]>([])
  const [version, setVersion] = useState('')
  const [loading, setLoading] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !instance.mcVersion) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setVersions([])
    setVersion('')
    window.bamboo
      .listLoaderVersions(instance.mcVersion, loader)
      .then((list) => {
        if (cancelled) return
        setVersions(list)
        setVersion(list[0]?.version ?? '')
      })
      .catch((err) => !cancelled && setError(messageOf(err)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [open, instance.mcVersion, loader])

  async function install() {
    if (!version) return
    setInstalling(true)
    try {
      await window.bamboo.installLoader({ instanceId: instance.id, loader, version })
      addToast({ kind: 'info', title: '开始安装加载器', message: '任务进度显示在右下角，完成后实例会自动更新。' })
      onClose()
    } catch (error) {
      addToast({ kind: 'error', title: '安装加载器失败', message: messageOf(error) })
    } finally {
      setInstalling(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="安装模组加载器"
      subtitle={`为 ${instance.name} 换上一层新的土壤`}
      width={560}
      footer={
        <>
          <button className="btn btn-ghost" type="button" onClick={onClose}>取消</button>
          <button className="btn btn-primary" type="button" disabled={!version || installing || loading} onClick={() => void install()}>
            {installing ? '正在安装…' : '开始安装'}
          </button>
        </>
      }
    >
      <div className="field">
        <span>加载器</span>
        <div className="loader-choice-grid">
          {(['fabric', 'forge', 'quilt', 'neoforge', 'liteloader'] as LoaderType[]).map((item) => (
            <button
              key={item}
              type="button"
              className={`loader-choice ${loader === item ? 'active' : ''} ${loaderTone({ type: item })}`}
              onClick={() => setLoader(item)}
            >
              <span>{loaderLabel({ type: item })}</span>
              <small>{loaderHint(item)}</small>
            </button>
          ))}
        </div>
      </div>
      <label className="field">
        <span>版本</span>
        <select className="select" value={version} onChange={(e) => setVersion(e.target.value)} disabled={loading}>
          {loading && <option>正在读取版本…</option>}
          {!loading && versions.length === 0 && <option>没有可用版本</option>}
          {versions.map((item) => (
            <option key={item.version} value={item.version}>{item.label}</option>
          ))}
        </select>
      </label>
      {error && <InlineNotice tone="danger" title="无法读取版本">{error}</InlineNotice>}
      <InlineNotice tone="warning" title="备份一下更安心">
        安装加载器会更新实例绑定的游戏版本，建议先备份存档。安装完成后原版本文件仍会保留。
      </InlineNotice>
    </Modal>
  )
}

function loaderHint(loader: LoaderType): string {
  return {
    vanilla: '不安装加载器',
    fabric: '轻量 · 更新快',
    forge: '模组生态广',
    quilt: 'Fabric 分支',
    neoforge: 'Forge 新分支',
    liteloader: '旧版轻量',
  }[loader]
}
