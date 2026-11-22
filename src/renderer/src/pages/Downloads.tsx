import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  DownloadCloud,
  FolderOpen,
  HardDriveDownload,
  Leaf,
  Loader2,
  PackageCheck,
  RefreshCw,
  Search,
  Server,
  Sparkles,
  Sprout,
} from 'lucide-react'
import type { GameVersionInfo, InstallGameOptions, JobProgress, LoaderType, LoaderVersionOption } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { formatDate, loaderLabel, loaderTone } from '../lib/format'
import { Badge, InlineNotice, PageHeader, ProgressBar, Segmented, Spinner } from '../components/ui'

const LOADERS: Array<{ type: LoaderType; short: string; hint: string }> = [
  { type: 'vanilla', short: 'V', hint: '纯净原版' },
  { type: 'fabric', short: 'F', hint: '轻量模组' },
  { type: 'forge', short: 'FG', hint: '经典生态' },
  { type: 'quilt', short: 'Q', hint: 'Fabric 分支' },
  { type: 'neoforge', short: 'NF', hint: '新一代 Forge' },
  { type: 'liteloader', short: 'LL', hint: '旧版轻量' },
]

export function DownloadsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const addToast = useBamboo((s) => s.addToast)
  const updateSettings = useBamboo((s) => s.updateSettings)
  const setPage = useBamboo((s) => s.setPage)
  const jobs = useBamboo((s) => s.jobs)
  const [versions, setVersions] = useState<GameVersionInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'release' | 'snapshot' | 'all'>('release')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<GameVersionInfo | null>(null)
  const [loader, setLoader] = useState<LoaderType>('vanilla')
  const [loaderVersions, setLoaderVersions] = useState<LoaderVersionOption[]>([])
  const [loaderVersion, setLoaderVersion] = useState('')
  const [loaderLoading, setLoaderLoading] = useState(false)
  const [loaderError, setLoaderError] = useState<string | null>(null)
  const [instanceName, setInstanceName] = useState('')
  const [createInstance, setCreateInstance] = useState(true)
  const [job, setJob] = useState<JobProgress | null>(null)
  const [showAll, setShowAll] = useState(false)

  const source = bootstrap?.settings.downloadSource ?? 'official'
  const activeJob =
    job && jobs[job.id] ? jobs[job.id] : job

  useEffect(() => {
    void loadVersions()
  }, [])

  useEffect(() => {
    if (!selected || loader === 'vanilla') {
      setLoaderVersions([])
      setLoaderVersion('')
      setLoaderError(null)
      return
    }
    let cancelled = false
    setLoaderLoading(true)
    setLoaderError(null)
    setLoaderVersions([])
    setLoaderVersion('')
    window.bamboo
      .listLoaderVersions(selected.id, loader)
      .then((list) => {
        if (cancelled) return
        setLoaderVersions(list)
        setLoaderVersion(list[0]?.version ?? '')
      })
      .catch((err) => !cancelled && setLoaderError(messageOf(err)))
      .finally(() => !cancelled && setLoaderLoading(false))
    return () => {
      cancelled = true
    }
  }, [selected?.id, loader])

  async function loadVersions(force = false) {
    if (force) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      const list = await window.bamboo.listVersions(force)
      setVersions(list)
      const latest =
        list.find((item) => item.type === 'release' && item.installed) ??
        list.find((item) => item.type === 'release')
      setSelected((current) => {
        if (current && list.some((item) => item.id === current.id)) return current
        return latest ?? null
      })
    } catch (err) {
      setError(messageOf(err))
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (!selected) return
    setInstanceName((current) =>
      !current || /^Minecraft\s/.test(current) ? `Minecraft ${selected.id}` : current,
    )
  }, [selected?.id])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return versions.filter((version) => {
      if (filter === 'release' && version.type !== 'release') return false
      if (filter === 'snapshot' && version.type !== 'snapshot' && version.type !== 'old_beta' && version.type !== 'old_alpha') return false
      if (query && !version.id.toLowerCase().includes(query)) return false
      return true
    })
  }, [versions, filter, search])

  const shown = showAll ? filtered : filtered.slice(0, 80)
  const latestRelease = versions.find((v) => v.type === 'release')
  const canInstall =
    Boolean(selected) &&
    (loader === 'vanilla' || Boolean(loaderVersion)) &&
    (!activeJob || activeJob.status !== 'running')

  async function install() {
    if (!selected) return
    const options: InstallGameOptions = {
      mcVersion: selected.id,
      loader,
      loaderVersion: loader === 'vanilla' ? undefined : loaderVersion,
      instanceName: createInstance ? instanceName || `Minecraft ${selected.id}` : undefined,
      createInstance,
    }
    try {
      const created = await window.bamboo.installGame(options)
      setJob(created)
      addToast({
        kind: 'info',
        title: '开始种下新世界',
        message: `${selected.id}${loader !== 'vanilla' ? ` · ${loaderLabel({ type: loader })}` : ''} 正在安装，进度可在右下角查看。`,
      })
    } catch (err) {
      addToast({ kind: 'error', title: '无法开始安装', message: messageOf(err) })
    }
  }

  return (
    <div className="page downloads-page">
      <PageHeader
        eyebrow="PLANT A NEW WORLD"
        title="下载"
        subtitle="从原版核心到模组加载器，一次种好，直接出发。"
        actions={
          <>
            <div className="download-source-switch">
              <span className="source-label">
                <Server size={14} /> 下载源
              </span>
              <Segmented
                size="small"
                value={source}
                onChange={(value) => void updateSettings({ downloadSource: value })}
                options={[
                  { value: 'official', label: '官方' },
                  { value: 'bmclapi', label: 'BMCLAPI' },
                ]}
              />
            </div>
            <button className="btn btn-ghost" type="button" onClick={() => void loadVersions(true)} disabled={refreshing}>
              <RefreshCw size={15} className={refreshing ? 'spin' : ''} /> 刷新
            </button>
          </>
        }
      />

      {source === 'bmclapi' && (
        <InlineNotice tone="info" icon={<Leaf size={17} />} title="已切换到 BMCLAPI 镜像">
          中国大陆网络通常会更快；如果镜像缺少文件，会自动回退到官方源。
        </InlineNotice>
      )}

      <div className="download-layout">
        <section className="version-browser glass-card">
          <div className="version-browser-head">
            <div>
              <span className="section-kicker">VERSION LIBRARY</span>
              <h2>游戏版本</h2>
            </div>
            <Badge tone="green">{versions.filter((v) => v.installed).length} 个已安装</Badge>
          </div>
          <div className="version-toolbar">
            <div className="search-field">
              <Search size={15} />
              <input
                placeholder="搜索版本号，例如 1.20.1"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <Segmented
              size="small"
              value={filter}
              onChange={(value) => {
                setFilter(value)
                setShowAll(false)
              }}
              options={[
                { value: 'release', label: '正式版' },
                { value: 'snapshot', label: '快照' },
                { value: 'all', label: '全部' },
              ]}
            />
          </div>

          {loading ? (
            <div className="version-loading">
              <Spinner size={24} />
              <span>正在读取 Mojang 版本清单…</span>
            </div>
          ) : error ? (
            <InlineNotice
              tone="danger"
              title="版本清单获取失败"
              action={<button className="btn btn-ghost small" type="button" onClick={() => void loadVersions()}>重试</button>}
            >
              {error}
            </InlineNotice>
          ) : (
            <>
              <div className="version-list">
                {shown.map((version) => (
                  <button
                    key={version.id}
                    type="button"
                    className={`version-row ${selected?.id === version.id ? 'selected' : ''}`}
                    onClick={() => setSelected(version)}
                  >
                    <span className={`version-type-mark ${version.type}`}>
                      {version.type === 'release' ? <Sprout size={15} /> : <Sparkles size={15} />}
                    </span>
                    <span className="version-row-main">
                      <strong>
                        {version.id}
                        {version.id === latestRelease?.id && <Badge tone="green">最新</Badge>}
                        {version.installed && <Badge tone="blue">已安装</Badge>}
                      </strong>
                      <small>{formatDate(Date.parse(version.releaseTime))} 发布</small>
                    </span>
                    <span className="version-type-label">
                      {version.type === 'release' ? '正式版' : version.type === 'snapshot' ? '快照' : '远古版本'}
                    </span>
                    <span className="version-radio">
                      {selected?.id === version.id && <Check size={13} />}
                    </span>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && <div className="version-empty">没有匹配的版本，换个关键词试试。</div>}
              {filtered.length > 80 && !showAll && (
                <button className="version-show-more" type="button" onClick={() => setShowAll(true)}>
                  <ChevronDown size={15} /> 显示全部 {filtered.length} 个版本
                </button>
              )}
            </>
          )}
        </section>

        <aside className="install-panel glass-card">
          <div className="install-panel-glow" />
          <div className="install-panel-head">
            <span className="section-kicker">INSTALLATION</span>
            <h2>安装配置</h2>
            <p>选择加载器后，Bamboo 会自动处理依赖、Java 和实例目录。</p>
          </div>

          {selected ? (
            <>
              <div className="chosen-version">
                <span className={`version-type-mark large ${selected.type}`}>
                  {selected.type === 'release' ? <Sprout size={20} /> : <Sparkles size={20} />}
                </span>
                <div>
                  <span>准备安装</span>
                  <strong>Minecraft {selected.id}</strong>
                  <small>
                    {selected.type === 'release' ? '正式版' : '快照'} · {formatDate(Date.parse(selected.releaseTime))}
                  </small>
                </div>
                {selected.installed && <Badge tone="blue">已有文件</Badge>}
              </div>

              <label className="field">
                <span>实例名称</span>
                <input
                  className="input"
                  value={instanceName}
                  placeholder={`Minecraft ${selected.id}`}
                  disabled={!createInstance}
                  onChange={(event) => setInstanceName(event.target.value)}
                />
              </label>

              <div className="field">
                <span>模组加载器</span>
                <div className="loader-grid">
                  {LOADERS.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      className={`loader-option ${loader === item.type ? 'active' : ''}`}
                      onClick={() => setLoader(item.type)}
                    >
                      <span className={`loader-sigil ${loaderTone({ type: item.type })}`}>{item.short}</span>
                      <span>
                        <strong>{item.type === 'vanilla' ? '原版' : loaderLabel({ type: item.type })}</strong>
                        <small>{item.hint}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {loader !== 'vanilla' && (
                <div className="field loader-version-field">
                  <span>
                    {loaderLabel({ type: loader })} 版本
                    {loaderLoading && <Spinner size={12} />}
                  </span>
                  {loaderError ? (
                    <InlineNotice tone="warning" title="无法读取加载器版本">
                      {loaderError}
                    </InlineNotice>
                  ) : (
                    <select
                      className="select"
                      value={loaderVersion}
                      disabled={loaderLoading}
                      onChange={(event) => setLoaderVersion(event.target.value)}
                    >
                      {loaderLoading && <option>正在获取版本…</option>}
                      {!loaderLoading && !loaderVersions.length && <option>没有可用版本</option>}
                      {loaderVersions.map((item) => (
                        <option value={item.version} key={item.version}>{item.label}</option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              <button
                type="button"
                className={`switch-row install-create-switch ${createInstance ? 'on' : ''}`}
                onClick={() => setCreateInstance(!createInstance)}
              >
                <div>
                  <strong>自动创建实例</strong>
                  <span>安装完成后直接出现在「实例」里。</span>
                </div>
                <span className={`fake-checkbox ${createInstance ? 'checked' : ''}`}>{createInstance && <Check size={13} />}</span>
              </button>

              <div className="install-checks">
                <span><Check size={12} /> Java 自动匹配</span>
                <span><Check size={12} /> 共享资源库</span>
                <span><Check size={12} /> 失败自动重试</span>
              </div>

              <button className="btn btn-primary install-button" type="button" disabled={!canInstall} onClick={() => void install()}>
                {activeJob?.status === 'running' ? (
                  <>
                    <Loader2 size={17} className="spin" /> 正在安装…
                  </>
                ) : (
                  <>
                    <HardDriveDownload size={17} /> 安装{loader !== 'vanilla' ? ` · ${loaderLabel({ type: loader })}` : ''}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {activeJob && activeJob.status === 'running' && (
                <div className="install-progress-card">
                  <div className="install-progress-head">
                    <span>{activeJob.detail}</span>
                    <strong>{activeJob.indeterminate ? '···' : `${Math.round(activeJob.progress)}%`}</strong>
                  </div>
                  <ProgressBar value={activeJob.progress} indeterminate={activeJob.indeterminate} />
                  <p>安装过程可以离开本页，进度会一直保留在右下角。</p>
                </div>
              )}
              {activeJob?.status === 'success' && (
                <div className="install-success">
                  <span className="install-success-icon"><PackageCheck size={20} /></span>
                  <div>
                    <strong>新世界已经种好</strong>
                    <p>实例已创建，可以直接启动。</p>
                  </div>
                  <button className="btn btn-soft small" type="button" onClick={() => setPage('instances')}>去实例</button>
                </div>
              )}

              <div className="install-location">
                <FolderOpen size={13} />
                <span title={bootstrap?.dataRoot}>数据目录 · {bootstrap?.dataRoot}</span>
                <button type="button" onClick={() => void window.bamboo.openDataFolder()}>打开</button>
              </div>
            </>
          ) : (
            <div className="install-placeholder">
              <Boxes size={30} />
              <span>从左侧选择一个版本</span>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
