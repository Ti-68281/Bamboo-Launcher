import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  FolderOpen,
  KeyRound,
  Loader2,
  PackageSearch,
  Puzzle,
  RefreshCw,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react'
import type {
  Instance,
  InstalledMod,
  JobProgress,
  ModPlatform,
  ModProject,
  ModVersion,
  SearchProjectsResult,
} from '@shared/types'
import { useActiveInstance, useBamboo, messageOf } from '../store'
import { formatNumber, loaderLabel, loaderTone } from '../lib/format'
import {
  Badge,
  EmptyState,
  InlineNotice,
  Modal,
  PageHeader,
  Segmented,
  Spinner,
  Toggle,
  useDebouncedValue,
} from '../components/ui'

type ModTab = 'discover' | 'installed'

export function ModsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const setPage = useBamboo((s) => s.setPage)
  const setActiveInstance = useBamboo((s) => s.setActiveInstance)
  const addToast = useBamboo((s) => s.addToast)
  const jobs = useBamboo((s) => s.jobs)
  const instance = useActiveInstance()
  const [tab, setTab] = useState<ModTab>('discover')
  const [platform, setPlatform] = useState<ModPlatform>('modrinth')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 500)
  const [projects, setProjects] = useState<ModProject[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsApiKey, setNeedsApiKey] = useState(false)
  const [offset, setOffset] = useState(0)
  const [selectedProject, setSelectedProject] = useState<ModProject | null>(null)
  const [installed, setInstalled] = useState<InstalledMod[]>([])
  const [installedLoading, setInstalledLoading] = useState(false)
  const [installedQuery, setInstalledQuery] = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const requestId = useRef(0)
  const lastModJob = useRef(0)

  const hasKey = bootstrap?.hasCurseForgeKey
  const loader = instance?.loader.type ?? 'vanilla'

  useEffect(() => {
    if (!instance) return
    void loadInstalled()
  }, [instance?.id])

  useEffect(() => {
    if (!instance) return
    void runSearch(true)
  }, [instance?.id, instance?.mcVersion, platform, debouncedQuery])

  useEffect(() => {
    const recent = Object.values(jobs)
      .filter((job) => job.kind === 'mod' && job.status === 'success')
      .sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))[0]
    if (recent?.finishedAt && recent.finishedAt > lastModJob.current) {
      lastModJob.current = recent.finishedAt
      if (instance) void loadInstalled()
    }
  }, [jobs, instance?.id])

  async function loadInstalled() {
    if (!instance) return
    setInstalledLoading(true)
    try {
      setInstalled(await window.bamboo.getInstalledMods(instance.id))
    } catch (error) {
      addToast({ kind: 'error', title: '读取模组失败', message: messageOf(error) })
    } finally {
      setInstalledLoading(false)
    }
  }

  async function runSearch(reset: boolean) {
    if (!instance) return
    const id = ++requestId.current
    if (reset) {
      setLoading(true)
      setError(null)
      setNeedsApiKey(false)
    } else {
      setLoadingMore(true)
    }
    const currentOffset = reset ? 0 : offset
    try {
      const result = await window.bamboo.searchProjects({
        query: debouncedQuery,
        platform,
        projectType: 'mod',
        loader: instance.loader.type,
        gameVersion: instance.mcVersion ?? undefined,
        offset: currentOffset,
        limit: 20,
      })
      if (id !== requestId.current) return
      applyResult(result, reset)
    } catch (err) {
      if (id !== requestId.current) return
      setError(messageOf(err))
    } finally {
      if (id === requestId.current) {
        setLoading(false)
        setLoadingMore(false)
      }
    }
  }

  function applyResult(result: SearchProjectsResult, reset: boolean) {
    setProjects((current) => (reset ? result.projects : [...current, ...result.projects]))
    setTotal(result.total)
    setOffset((reset ? 0 : offset) + result.projects.length)
    setError(result.error ?? null)
    setNeedsApiKey(Boolean(result.needsApiKey))
  }

  async function toggleMod(mod: InstalledMod) {
    if (!instance) return
    setToggling(mod.fileName)
    try {
      setInstalled(await window.bamboo.setModEnabled(instance.id, mod.fileName, !mod.enabled))
    } catch (error) {
      addToast({ kind: 'error', title: '切换模组失败', message: messageOf(error) })
    } finally {
      setToggling(null)
    }
  }

  async function removeMod(mod: InstalledMod) {
    if (!instance) return
    try {
      setInstalled(await window.bamboo.deleteMod(instance.id, mod.fileName))
      addToast({ kind: 'success', title: '模组已移除', message: `${mod.name} 已从实例中删除。` })
    } catch (error) {
      addToast({ kind: 'error', title: '删除失败', message: messageOf(error) })
    }
  }

  const filteredInstalled = useMemo(() => {
    const normalized = installedQuery.toLowerCase().trim()
    if (!normalized) return installed
    return installed.filter(
      (mod) =>
        mod.name.toLowerCase().includes(normalized) ||
        mod.fileName.toLowerCase().includes(normalized) ||
        mod.modId.toLowerCase().includes(normalized),
    )
  }, [installed, installedQuery])

  if (!instance) {
    return (
      <div className="page">
        <PageHeader title="模组" subtitle="先有一片属于自己的竹林，再种下模组。" />
        <div className="glass-card empty-page-card">
          <EmptyState
            icon={<Puzzle size={32} />}
            title="还没有可以种模组的实例"
            description="安装一个带 Forge、Fabric 或其他加载器的实例，然后再回来。"
            action={<button className="btn btn-primary" type="button" onClick={() => setPage('downloads')}>去创建实例</button>}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page mods-page">
      <PageHeader
        eyebrow="MOD GARDEN"
        title="模组"
        subtitle={`为「${instance.name}」寻找新的枝叶 · ${instance.mcVersion} · ${loaderLabel(instance.loader)}`}
        actions={
          <>
            <button className="btn btn-ghost" type="button" onClick={() => void window.bamboo.openInstanceFolder(instance.id, 'mods')}>
              <FolderOpen size={15} /> 打开 mods
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => void loadInstalled()}>
              <RefreshCw size={15} /> 刷新
            </button>
          </>
        }
      />

      {instance.loader.type === 'vanilla' && (
        <InlineNotice
          tone="warning"
          icon={<Puzzle size={17} />}
          title="当前实例是原版，无法加载模组"
          action={
            <button className="btn btn-soft small" type="button" onClick={() => setPage('instances')}>
              去安装加载器
            </button>
          }
        >
          原版只能安装资源包与光影。要使用 Mod，请先在「实例 → 安装加载器」中选择 Fabric、Forge 等加载器。
        </InlineNotice>
      )}

      <div className="mods-toolbar">
        <div className="instance-scope">
          <span className={`scope-dot ${loaderTone(instance.loader)}`} />
          <span>
            <small>正在装饰</small>
            <strong>{instance.name}</strong>
          </span>
          <select
            className="scope-select"
            value={instance.id}
            onChange={(event) => void setActiveInstance(event.target.value)}
            aria-label="切换实例"
          >
            {(bootstrap?.instances ?? []).map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'discover', label: '发现模组', icon: <Sparkles size={14} /> },
            { value: 'installed', label: `已安装 ${installed.length}`, icon: <PackageSearch size={14} /> },
          ]}
        />
        <div className="mod-filters">
          <Badge tone="green">MC {instance.mcVersion}</Badge>
          <Badge tone="blue">{loaderLabel(instance.loader)}</Badge>
        </div>
      </div>

      {tab === 'discover' ? (
        <>
          <div className="discover-toolbar">
            <div className="search-field mod-search">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setOffset(0)
                }}
                placeholder="搜索模组、作者或功能，例如 sodium、地图…"
              />
              {query && <button type="button" onClick={() => setQuery('')}>清除</button>}
            </div>
            <Segmented
              value={platform}
              onChange={(value) => {
                setPlatform(value)
                setOffset(0)
              }}
              options={[
                { value: 'modrinth', label: 'Modrinth' },
                { value: 'curseforge', label: 'CurseForge' },
              ]}
            />
            <button className="icon-button soft" type="button" onClick={() => void runSearch(true)} title="刷新搜索">
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>
          </div>

          {platform === 'curseforge' && !hasKey && (
            <InlineNotice
              tone="warning"
              icon={<KeyRound size={18} />}
              title="CurseForge 需要 API Key"
              action={
                <button className="btn btn-soft small" type="button" onClick={() => setPage('settings')}>
                  <Settings2 size={14} /> 去接入
                </button>
              }
            >
              CurseForge 不提供匿名公开 API。Bamboo 已准备好接入逻辑，只需在设置里填入你自己的 CurseForge API Key。现在仍可使用无需密钥的 Modrinth。
            </InlineNotice>
          )}
          {needsApiKey && platform === 'curseforge' && (
            <InlineNotice
              tone="warning"
              icon={<KeyRound size={18} />}
              title="还没有配置密钥"
              action={<button className="btn btn-soft small" type="button" onClick={() => setPage('settings')}>前往设置</button>}
            >
              配置后即可搜索、下载和安装 CurseForge 的 Mod。
            </InlineNotice>
          )}
          {error && !needsApiKey && (
            <InlineNotice tone="danger" title="搜索没有完成" action={<button className="btn btn-ghost small" type="button" onClick={() => void runSearch(true)}>重试</button>}>
              {error}
            </InlineNotice>
          )}

          {loading ? (
            <div className="project-grid">
              {Array.from({ length: 6 }, (_, index) => (
                <div className="project-card skeleton" key={index}>
                  <span className="skeleton-icon" />
                  <div className="skeleton-lines">
                    <span /><span /><span />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length ? (
            <>
              <div className="project-grid">
                {projects.map((project) => (
                  <button
                    type="button"
                    key={`${project.platform}:${project.id}`}
                    className="project-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-card-top">
                      {project.iconUrl ? (
                        <img className="project-icon" src={project.iconUrl} alt="" loading="lazy" />
                      ) : (
                        <span className="project-icon placeholder"><Puzzle size={20} /></span>
                      )}
                      <div className="project-title">
                        <strong>{project.name}</strong>
                        <span><User size={11} /> {project.author || '未知作者'}</span>
                      </div>
                      <span className="project-arrow"><ArrowRight size={15} /></span>
                    </div>
                    <p className="project-summary">{project.summary || '这个模组还没有写下简介。'}</p>
                    <div className="project-card-foot">
                      <span><Download size={12} /> {formatNumber(project.downloads)}</span>
                      {project.categories.slice(0, 2).map((category) => (
                        <span className="project-tag" key={category}>{category}</span>
                      ))}
                      <span className={`platform-chip ${project.platform}`}>
                        {project.platform === 'modrinth' ? 'Modrinth' : 'CurseForge'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {projects.length < total && (
                <div className="load-more-wrap">
                  <button className="btn btn-ghost" type="button" disabled={loadingMore} onClick={() => void runSearch(false)}>
                    {loadingMore ? <><Spinner size={15} /> 正在生长…</> : <>加载更多 <ArrowRight size={14} /></>}
                  </button>
                  <span>{projects.length} / {total}</span>
                </div>
              )}
            </>
          ) : (
            !error && !needsApiKey && (
              <div className="glass-card empty-page-card">
                <EmptyState
                  icon={<PackageSearch size={30} />}
                  title={query ? '没有找到这枚种子' : '试试搜索一个模组'}
                  description={query ? '换一个关键词，或确认实例的游戏版本/加载器。' : '例如 Sodium、JEI、Create、Iris，都会在这里找到。'}
                />
              </div>
            )
          )}
        </>
      ) : (
        <section className="installed-section">
          <div className="installed-toolbar">
            <div className="search-field">
              <Search size={15} />
              <input value={installedQuery} onChange={(e) => setInstalledQuery(e.target.value)} placeholder="在已安装模组里查找…" />
            </div>
            <span className="installed-count">
              {installed.filter((m) => m.enabled).length} 启用 · {installed.filter((m) => !m.enabled).length} 禁用
            </span>
          </div>
          {installedLoading ? (
            <div className="mods-loading"><Spinner /> 正在读取模组…</div>
          ) : filteredInstalled.length ? (
            <div className="installed-list glass-card">
              {filteredInstalled.map((mod) => (
                <div className="installed-row" key={mod.fileName}>
                  {mod.iconDataUrl ? (
                    <img src={mod.iconDataUrl} alt="" className="installed-icon" />
                  ) : (
                    <span className="installed-icon placeholder"><Puzzle size={19} /></span>
                  )}
                  <div className="installed-copy">
                    <div className="installed-name">
                      <strong>{mod.name}</strong>
                      <span className="installed-version">{mod.version || '未知版本'}</span>
                      {mod.loaderHint !== 'unknown' && <Badge tone="neutral">{mod.loaderHint}</Badge>}
                    </div>
                    <p>{mod.description || mod.fileName}</p>
                  </div>
                  <div className="installed-actions">
                    <Toggle
                      checked={mod.enabled}
                      disabled={toggling === mod.fileName}
                      onChange={() => void toggleMod(mod)}
                      label={mod.enabled ? '禁用模组' : '启用模组'}
                    />
                    <button className="icon-button danger-hover" type="button" onClick={() => void removeMod(mod)} title="删除模组">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card empty-page-card">
              <EmptyState
                icon={<Puzzle size={30} />}
                title={installedQuery ? '没有匹配的已安装模组' : '这片林子还没有模组'}
                description="去发现页挑选，或把 .jar 文件直接拖进 Bamboo。"
                action={<button className="btn btn-primary" type="button" onClick={() => setTab('discover')}>去发现</button>}
              />
            </div>
          )}
        </section>
      )}

      <ProjectDetailModal
        project={selectedProject}
        instance={instance}
        hasCurseForgeKey={Boolean(hasKey)}
        onClose={() => setSelectedProject(null)}
        onOpenSettings={() => {
          setSelectedProject(null)
          setPage('settings')
        }}
        onInstalled={() => void loadInstalled()}
      />
    </div>
  )
}

function ProjectDetailModal({
  project,
  instance,
  hasCurseForgeKey,
  onClose,
  onOpenSettings,
  onInstalled,
}: {
  project: ModProject | null
  instance: Instance
  hasCurseForgeKey: boolean
  onClose: () => void
  onOpenSettings: () => void
  onInstalled: () => void
}) {
  const addToast = useBamboo((s) => s.addToast)
  const [versions, setVersions] = useState<ModVersion[]>([])
  const [versionId, setVersionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [installDependencies, setInstallDependencies] = useState(true)
  const [installing, setInstalling] = useState(false)
  const [job, setJob] = useState<JobProgress | null>(null)
  const jobs = useBamboo((s) => s.jobs)
  const activeJob = job ? jobs[job.id] ?? job : null

  useEffect(() => {
    if (!project) return
    if (project.platform === 'curseforge' && !hasCurseForgeKey) {
      setVersions([])
      setError('CURSEFORGE_API_KEY_REQUIRED')
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    setVersions([])
    setVersionId('')
    setJob(null)
    setInstalling(false)
    window.bamboo
      .getProjectVersions(project.platform, project.id, instance.mcVersion ?? '', instance.loader.type)
      .then((list) => {
        if (cancelled) return
        setVersions(list)
        setVersionId(list[0]?.id ?? '')
      })
      .catch((err) => !cancelled && setError(messageOf(err)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [project?.id, project?.platform, hasCurseForgeKey, instance.mcVersion, instance.loader.type])

  useEffect(() => {
    if (activeJob?.status === 'success') {
      onInstalled()
    }
  }, [activeJob?.status])

  async function install() {
    if (!project || !versionId) return
    setInstalling(true)
    try {
      const created = await window.bamboo.installProject({
        instanceId: instance.id,
        platform: project.platform,
        projectId: project.id,
        projectName: project.name,
        versionId,
        installDependencies,
      })
      setJob(created)
    } catch (err) {
      addToast({ kind: 'error', title: '安装失败', message: messageOf(err) })
    } finally {
      setInstalling(false)
    }
  }

  const version = versions.find((v) => v.id === versionId)
  const needsLoader = instance.loader.type === 'vanilla'

  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      width={720}
      title={
        project ? (
          <span className="mod-modal-title">
            {project.iconUrl ? <img src={project.iconUrl} alt="" /> : <span className="mod-modal-icon"><Puzzle size={20} /></span>}
            {project.name}
          </span>
        ) : ''
      }
      subtitle={project ? `${project.platform === 'modrinth' ? 'Modrinth' : 'CurseForge'} · ${project.author}` : ''}
      footer={
        project ? (
          <>
            <button className="btn btn-ghost" type="button" onClick={onClose}>关闭</button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={!versionId || installing || activeJob?.status === 'running' || needsLoader}
              onClick={() => void install()}
              title={needsLoader ? '请先为实例安装模组加载器' : undefined}
            >
              {needsLoader ? (
                <><Puzzle size={15} /> 需要加载器</>
              ) : activeJob?.status === 'running' ? (
                <><Loader2 size={15} className="spin" /> {activeJob.detail}</>
              ) : (
                <><Download size={15} /> 安装到当前实例</>
              )}
            </button>
          </>
        ) : undefined
      }
    >
      {project && (
        <div className="mod-detail">
          <p className="mod-detail-summary">{project.summary || '这个项目还没有简介。'}</p>
          {needsLoader && (
            <InlineNotice tone="warning" icon={<Puzzle size={15} />} title="当前实例为原版">
              安装加载器后才能启用 Mod。你可以先关闭此窗口，在实例页一键安装 Fabric、Forge 等加载器。
            </InlineNotice>
          )}
          <div className="mod-detail-meta">
            <span><Download size={13} /> {formatNumber(project.downloads)} 次下载</span>
            <span><Sparkles size={13} /> {formatNumber(project.follows)} 收藏</span>
            <Badge tone="green">MC {instance.mcVersion}</Badge>
            <Badge tone="blue">{loaderLabel(instance.loader)}</Badge>
          </div>
          {project.categories.length > 0 && (
            <div className="mod-categories">
              {project.categories.slice(0, 8).map((category) => <span key={category}>{category}</span>)}
            </div>
          )}
          <div className="mod-install-box">
            <div className="mod-install-box-head">
              <span className="section-kicker">CHOOSE A VERSION</span>
              <button className="text-button small" type="button" onClick={() => project.websiteUrl && void window.bamboo.openExternal(project.websiteUrl)}>
                <ExternalLink size={13} /> 项目主页
              </button>
            </div>
            {loading ? (
              <div className="mods-loading"><Spinner /> 正在寻找适配的版本…</div>
            ) : error === 'CURSEFORGE_API_KEY_REQUIRED' ? (
              <InlineNotice
                tone="warning"
                icon={<KeyRound size={17} />}
                title="需要 CurseForge API Key"
                action={<button className="btn btn-soft small" type="button" onClick={onOpenSettings}>去设置</button>}
              >
                这个项目来自 CurseForge，配置密钥后才能读取文件。
              </InlineNotice>
            ) : error ? (
              <InlineNotice tone="danger" title="读取版本失败">{error}</InlineNotice>
            ) : versions.length ? (
              <>
                <label className="field">
                  <span>文件版本</span>
                  <select className="select" value={versionId} onChange={(event) => setVersionId(event.target.value)}>
                    {versions.map((item) => (
                      <option key={item.id} value={item.id}>{item.versionNumber} · {item.fileName}</option>
                    ))}
                  </select>
                </label>
                {version?.changelog && <div className="changelog">{version.changelog.slice(0, 500)}</div>}
                <button type="button" className="switch-row file-deps-row" onClick={() => setInstallDependencies(!installDependencies)}>
                  <div>
                    <strong>自动安装必需前置</strong>
                    <span>Bamboo 会递归解析并安装必需依赖，降低手动找 Mod 的负担。</span>
                  </div>
                  <span className={`fake-checkbox ${installDependencies ? 'checked' : ''}`}>{installDependencies && <Check size={13} />}</span>
                </button>
                {version?.dependencies.filter((d) => d.dependencyType === 'required').length ? (
                  <div className="dependency-hint">
                    <SlidersHorizontal size={13} />
                    此版本声明了 {version.dependencies.filter((d) => d.dependencyType === 'required').length} 个必需依赖
                  </div>
                ) : null}
              </>
            ) : (
              <EmptyState compact icon={<PackageSearch size={22} />} title="没有适配版本" description="这个模组可能不支持当前游戏版本或加载器。" />
            )}
            {activeJob?.status === 'error' && (
              <InlineNotice tone="danger" title="安装没有完成">{activeJob.error}</InlineNotice>
            )}
            {activeJob?.status === 'success' && (
              <InlineNotice tone="success" title="已经种进实例">
                {activeJob.meta?.fileName ? String(activeJob.meta.fileName) : '模组文件已安装。'}
              </InlineNotice>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
