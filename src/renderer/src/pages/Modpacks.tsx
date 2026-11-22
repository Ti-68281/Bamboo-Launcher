import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Boxes,
  Check,
  FileArchive,
  FolderOpen,
  Leaf,
  PackageOpen,
  Plus,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import type { JobProgress, ModpackInfo } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { loaderLabel, loaderTone, timeAgo } from '../lib/format'
import { Badge, EmptyState, InlineNotice, Modal, PageHeader, ProgressBar, Spinner } from '../components/ui'
import { InstanceGlyph } from '../components/InstanceGlyph'

export function ModpacksPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const addToast = useBamboo((s) => s.addToast)
  const jobs = useBamboo((s) => s.jobs)
  const setPage = useBamboo((s) => s.setPage)
  const refresh = useBamboo((s) => s.refresh)
  const [inspecting, setInspecting] = useState(false)
  const [info, setInfo] = useState<ModpackInfo | null>(null)
  const [name, setName] = useState('')
  const [installing, setInstalling] = useState(false)
  const [job, setJob] = useState<JobProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const activeJob = job ? jobs[job.id] ?? job : null
  const packs = (bootstrap?.instances ?? []).filter(
    (instance) => instance.notes?.includes('整合包') || instance.icon?.startsWith('data:'),
  )

  useEffect(() => {
    if (activeJob?.status === 'success') void refresh()
  }, [activeJob?.status])

  async function choosePack() {
    setError(null)
    setInspecting(true)
    try {
      const file = await window.bamboo.chooseFile([
        { name: 'Minecraft 整合包', extensions: ['mrpack', 'zip'] },
      ])
      if (!file) return
      const result = await window.bamboo.inspectModpack(file)
      setInfo(result)
      setName(result.name)
    } catch (err) {
      setError(messageOf(err))
      addToast({ kind: 'error', title: '无法识别整合包', message: messageOf(err) })
    } finally {
      setInspecting(false)
    }
  }

  async function install() {
    if (!info) return
    setInstalling(true)
    setError(null)
    try {
      const created = await window.bamboo.installModpack(info.path, name)
      setJob(created)
      setInfo(null)
      addToast({
        kind: 'info',
        title: '整合包开始生长',
        message: 'Bamboo 会自动安装游戏核心、加载器、模组与配置。',
      })
    } catch (err) {
      setError(messageOf(err))
      addToast({ kind: 'error', title: '安装没有开始', message: messageOf(err) })
    } finally {
      setInstalling(false)
    }
  }

  return (
    <div className="page modpacks-page">
      <PageHeader
        eyebrow="A WHOLE FOREST"
        title="整合包"
        subtitle="把别人的整片森林搬回家。拖入文件，剩下的交给竹林。"
        actions={
          <button className="btn btn-primary" type="button" onClick={() => void choosePack()} disabled={inspecting}>
            {inspecting ? <><Spinner size={15} /> 正在识别</> : <><Plus size={16} /> 选择整合包</>}
          </button>
        }
      />

      <section className="modpack-drop-hero glass-card">
        <div className="modpack-drop-art">
          <PackageOpen size={64} strokeWidth={1.1} />
          <span className="modpack-art-leaf l1"><Leaf size={21} /></span>
          <span className="modpack-art-leaf l2"><Leaf size={15} /></span>
          <span className="modpack-art-leaf l3"><Sparkles size={17} /></span>
        </div>
        <div className="modpack-drop-copy">
          <div className="hero-kicker"><UploadCloud size={13} /> DROP A FOREST</div>
          <h2>拖入整合包</h2>
          <p>支持 Modrinth、CurseForge、MultiMC / Prism，自动创建独立实例。</p>
          <div className="modpack-format-row">
            <span><i className="format-dot modrinth" /> Modrinth</span>
            <span><i className="format-dot curseforge" /> CurseForge</span>
            <span><i className="format-dot multimc" /> MultiMC / Prism</span>
          </div>
          <div className="modpack-drop-actions">
            <button className="btn btn-soft" type="button" onClick={() => void choosePack()} disabled={inspecting}>
              <FolderOpen size={15} /> 从文件选择
            </button>
            <span>或把 .zip / .mrpack 拖进窗口</span>
          </div>
        </div>
      </section>

      {error && <InlineNotice tone="danger" title="这次没有种成功">{error}</InlineNotice>}
      {job && activeJob && (
        <section className="modpack-install-progress glass-card">
          <div className="progress-leaf"><Spinner size={20} /></div>
          <div className="progress-copy">
            <strong>{activeJob.status === 'error' ? '安装中断' : activeJob.status === 'success' ? '安装完成' : '正在安装'}</strong>
            <span>{activeJob.detail}</span>
            <ProgressBar value={activeJob.progress} indeterminate={activeJob.indeterminate} tone={activeJob.status === 'error' ? 'danger' : 'bamboo'} />
          </div>
          <span className="progress-number">{activeJob.indeterminate ? '···' : `${Math.round(activeJob.progress)}%`}</span>
          {activeJob.status === 'success' && (
            <button className="btn btn-soft small" type="button" onClick={() => setPage('instances')}>
              查看实例 <ArrowRight size={14} />
            </button>
          )}
        </section>
      )}

      <div className="modpack-info-grid">
        <div className="info-tile">
          <span className="info-tile-icon"><FileArchive size={19} /></span>
          <div>
            <strong>一键还原配置</strong>
            <p>整合包内的 config、资源包、光影与默认设置会一并放入新实例。</p>
          </div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><Boxes size={19} /></span>
          <div>
            <strong>独立实例</strong>
            <p>每个整合包拥有自己的存档与 mods，不会污染其他世界。</p>
          </div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><Leaf size={19} /></span>
          <div>
            <strong>自动补齐</strong>
            <p>自动安装声明的加载器与核心；缺失文件会列出，不静默失败。</p>
          </div>
        </div>
      </div>

      <section className="packed-worlds">
        <div className="section-heading">
          <div>
            <span className="section-kicker">PACKED GROVES</span>
            <h2>从整合包长出的世界</h2>
          </div>
          <button className="text-button" type="button" onClick={() => setPage('instances')}>
            管理实例 <ArrowRight size={14} />
          </button>
        </div>
        {packs.length ? (
          <div className="pack-grid">
            {packs.map((pack) => (
              <button key={pack.id} type="button" className="pack-card glass-card" onClick={() => setPage('instances')}>
                <InstanceGlyph icon={pack.icon} size={48} />
                <span className="pack-copy">
                  <strong>{pack.name}</strong>
                  <small>Minecraft {pack.mcVersion} · {loaderLabel(pack.loader)}</small>
                  <span className="pack-foot">
                    <span className={`loader-badge ${loaderTone(pack.loader)}`}>{loaderLabel(pack.loader)}</span>
                    <span>{timeAgo(pack.lastPlayedAt)}</span>
                  </span>
                </span>
                <ArrowRight size={15} className="pack-arrow" />
              </button>
            ))}
          </div>
        ) : (
          <div className="glass-card empty-page-card">
            <EmptyState
              icon={<PackageOpen size={30} />}
              title="还没有从整合包长出的实例"
              description="拖一个整合包进来，Bamboo 会替你把土翻好。"
            />
          </div>
        )}
      </section>

      <Modal
        open={Boolean(info)}
        onClose={() => setInfo(null)}
        title="整合包已识别"
        subtitle="确认一下，再把它种进竹林。"
        width={620}
        footer={
          <>
            <button className="btn btn-ghost" type="button" onClick={() => setInfo(null)}>取消</button>
            <button className="btn btn-primary" type="button" disabled={installing || activeJob?.status === 'running'} onClick={() => void install()}>
              {installing ? '正在开始…' : <><UploadCloud size={15} /> 安装整合包</>}
            </button>
          </>
        }
      >
        {info && (
          <div className="pack-review">
            <div className="pack-review-head">
              {info.iconDataUrl ? (
                <img src={info.iconDataUrl} alt="" className="pack-review-icon" />
              ) : (
                <span className="pack-review-icon placeholder"><PackageOpen size={26} /></span>
              )}
              <div>
                <Badge tone={info.format === 'modrinth' ? 'green' : info.format === 'curseforge' ? 'amber' : 'blue'}>
                  {info.format === 'modrinth' ? 'Modrinth' : info.format === 'curseforge' ? 'CurseForge' : 'MultiMC / Prism'}
                </Badge>
                <h3>{info.name}</h3>
                <p>{info.summary || '整合包'}</p>
              </div>
            </div>
            <div className="form-grid two">
              <label className="field">
                <span>新实例名称</span>
                <input className="input" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <div className="field">
                <span>将自动准备</span>
                <div className="pack-facts">
                  <span><Check size={12} /> MC {info.mcVersion ?? '未知'}</span>
                  <span><Check size={12} /> {loaderLabel(info.loader)}</span>
                  <span><Check size={12} /> {info.modCount} 个文件</span>
                </div>
              </div>
            </div>
            <InlineNotice tone={info.format === 'curseforge' && !bootstrap?.hasCurseForgeKey ? 'warning' : 'info'}>
              {info.format === 'curseforge' && !bootstrap?.hasCurseForgeKey
                ? '这个 CurseForge 整合包需要 API Key 才能自动下载模组。你仍可以先安装核心与 overrides，缺失的模组可在稍后补齐。'
                : '安装会创建新的独立实例。现有存档与实例不会被修改。'}
            </InlineNotice>
          </div>
        )}
      </Modal>
    </div>
  )
}
