import { useEffect, useState } from 'react'
import {
  Check,
  Coffee,
  Cpu,
  DownloadCloud,
  FolderOpen,
  HardDrive,
  Loader2,
  Plus,
  RefreshCw,
  ScanLine,
  Sparkles,
  Terminal,
} from 'lucide-react'
import type { JavaRuntime } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { formatDate } from '../lib/format'
import { Badge, EmptyState, InlineNotice, PageHeader, Spinner, Toggle } from '../components/ui'

const DOWNLOADS = [
  { major: 25, label: 'Java 25', hint: 'Minecraft 26.x / 未来版本', tone: 'green' },
  { major: 21, label: 'Java 21', hint: 'Minecraft 1.20.5 – 1.21.x', tone: 'blue' },
  { major: 17, label: 'Java 17', hint: 'Minecraft 1.18 – 1.20.4', tone: 'blue' },
  { major: 16, label: 'Java 16', hint: 'Minecraft 1.17 – 1.17.1', tone: 'amber' },
  { major: 8, label: 'Java 8', hint: 'Minecraft 1.16.5 及更早', tone: 'neutral' },
] as const

export function JavaPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const addToast = useBamboo((s) => s.addToast)
  const jobs = useBamboo((s) => s.jobs)
  const updateSettings = useBamboo((s) => s.updateSettings)
  const [list, setList] = useState<JavaRuntime[]>(bootstrap?.javaCache ?? [])
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [downloadJobId, setDownloadJobId] = useState<string | null>(null)
  const [downloadMajor, setDownloadMajor] = useState<number | null>(null)

  useEffect(() => {
    void load()
  }, [])

  useEffect(() => {
    if (!downloadJobId) return
    const job = jobs[downloadJobId]
    if (!job || job.status === 'running') return
    if (job.status === 'success') {
      addToast({ kind: 'success', title: 'Java 已下载', message: job.detail })
      void load()
    } else {
      addToast({ kind: 'error', title: 'Java 下载失败', message: job.error ?? job.detail })
    }
    setDownloadJobId(null)
    setDownloadMajor(null)
  }, [jobs, downloadJobId])

  async function load() {
    setLoading(true)
    try {
      setList(await window.bamboo.listJava())
    } catch (error) {
      addToast({ kind: 'error', title: '读取 Java 失败', message: messageOf(error) })
    } finally {
      setLoading(false)
    }
  }

  async function scan() {
    setScanning(true)
    try {
      const found = await window.bamboo.scanJava()
      setList(found)
      addToast({ kind: 'success', title: '扫描完成', message: `找到 ${found.length} 个可用的 Java 运行时。` })
    } catch (error) {
      addToast({ kind: 'error', title: '扫描失败', message: messageOf(error) })
    } finally {
      setScanning(false)
    }
  }

  async function addManual() {
    try {
      const found = await window.bamboo.addJava()
      if (found) {
        setList(found)
        addToast({ kind: 'success', title: 'Java 已添加', message: '现在可以在实例设置中选择它。' })
      }
    } catch (error) {
      addToast({ kind: 'error', title: '添加 Java 失败', message: messageOf(error) })
    }
  }

  async function download(major: number) {
    try {
      const job = await window.bamboo.downloadJava(major)
      setDownloadJobId(job.id)
      setDownloadMajor(major)
      addToast({ kind: 'info', title: `开始下载 Java ${major}`, message: '进度会显示在右下角，完成后会自动出现在列表。' })
    } catch (error) {
      addToast({ kind: 'error', title: '下载没有开始', message: messageOf(error) })
    }
  }

  return (
    <div className="page java-page">
      <PageHeader
        eyebrow="JAVA RUNTIME"
        title="Java"
        subtitle="每片竹林都需要合适的土壤。Bamboo 会为游戏版本自动选择 Java。"
        actions={
          <>
            <button className="btn btn-ghost" type="button" onClick={() => void addManual()}>
              <Plus size={15} /> 手动添加
            </button>
            <button className="btn btn-primary" type="button" onClick={() => void scan()} disabled={scanning}>
              {scanning ? <Spinner size={15} /> : <ScanLine size={16} />} 扫描本机
            </button>
          </>
        }
      />

      <div className="java-layout">
        <section className="java-installed glass-card">
          <div className="java-section-head">
            <div>
              <span className="section-kicker">DETECTED RUNTIMES</span>
              <h2>已检测到的 Java</h2>
            </div>
            <Badge tone={list.length ? 'green' : 'amber'}>{list.length} 个可用</Badge>
          </div>
          {loading ? (
            <div className="java-loading"><Spinner /> 正在读取…</div>
          ) : list.length ? (
            <div className="java-list">
              {list.map((runtime) => {
                const recommended = runtime.majorVersion === 21
                return (
                  <div className={`java-row ${recommended ? 'recommended' : ''}`} key={runtime.id}>
                    <div className={`java-version-badge java-${runtime.majorVersion}`}>
                      <span>Java</span>
                      <strong>{runtime.majorVersion}</strong>
                    </div>
                    <div className="java-main">
                      <div className="java-title">
                        <strong>{runtime.vendor}</strong>
                        <Badge tone={runtime.source === 'downloaded' ? 'green' : runtime.source === 'manual' ? 'blue' : 'neutral'}>
                          {runtime.source === 'downloaded' ? 'Bamboo 下载' : runtime.source === 'manual' ? '手动添加' : '自动发现'}
                        </Badge>
                        {recommended && <Badge tone="green"><Check size={10} /> 推荐</Badge>}
                      </div>
                      <button
                        className="java-path"
                        type="button"
                        onClick={() => {
                          void window.bamboo.copyText(runtime.path)
                          addToast({ kind: 'success', title: '路径已复制', message: runtime.path })
                        }}
                        title={runtime.path}
                      >
                        <Terminal size={12} /> {runtime.path}
                      </button>
                      <span className="java-meta">
                        {runtime.version} · {runtime.architecture} · 添加于 {formatDate(runtime.addedAt)}
                      </span>
                    </div>
                    <span className="java-ready"><span className="running-dot" /> 可用</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon={<Coffee size={28} />}
              title="还没有发现 Java"
              description="Bamboo 可以扫描常见安装位置，或直接下载 Mojang 官方运行时。"
              action={<button className="btn btn-primary" type="button" onClick={() => void scan()}>开始扫描</button>}
            />
          )}
          <div className="java-scan-note">
            <ScanLine size={13} />
            自动扫描 Java、Adoptium、Microsoft OpenJDK、Zulu、Corretto、GraalVM 等常见目录；也可以手动指定安装位置。
          </div>
        </section>

        <aside className="java-side">
          <section className="glass-card java-download-card">
            <div className="java-section-head">
              <div>
                <span className="section-kicker">DOWNLOAD</span>
                <h2>获取 Java</h2>
              </div>
              <DownloadCloud size={19} />
            </div>
            <p className="java-download-copy">来自 Mojang 官方运行时，自动解压到 Bamboo 数据目录，不修改系统环境变量。</p>
            <div className="java-download-grid">
              {DOWNLOADS.map((item) => (
                <button
                  key={item.major}
                  type="button"
                  className="java-download-tile"
                  disabled={downloadJobId !== null}
                  onClick={() => void download(item.major)}
                >
                  <span className={`java-download-num tone-${item.tone}`}>{item.major}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.hint}</small>
                  </span>
                  {downloadMajor === item.major ? <Loader2 size={15} className="spin" /> : <DownloadCloud size={15} />}
                </button>
              ))}
            </div>
            <InlineNotice tone="info" icon={<Sparkles size={15} />}>
              下载约 40–80 MB。安装完成后，启动器会优先使用匹配游戏版本的运行时。
            </InlineNotice>
          </section>

          <section className="glass-card java-settings-card">
            <div className="java-section-head">
              <div>
                <span className="section-kicker">AUTOMATION</span>
                <h2>自动管理</h2>
              </div>
              <Cpu size={19} />
            </div>
            <div className="switch-row">
              <div>
                <strong>启动时自动下载 Java</strong>
                <span>缺少匹配版本时，从 Mojang 获取。</span>
              </div>
              <Toggle
                checked={bootstrap?.settings.autoDownloadJava ?? true}
                onChange={(value) => void updateSettings({ autoDownloadJava: value })}
              />
            </div>
            <div className="switch-row">
              <div>
                <strong>启动时自动扫描</strong>
                <span>在本机寻找新安装的 Java。</span>
              </div>
              <Toggle
                checked={bootstrap?.settings.autoScanJava ?? true}
                onChange={(value) => void updateSettings({ autoScanJava: value })}
              />
            </div>
            <div className="java-mapping">
              <span className="section-kicker">VERSION MAP</span>
              <div><span>26.x+</span><Badge tone="green">Java 25</Badge></div>
              <div><span>1.20.5 – 1.21.x</span><Badge tone="green">Java 21</Badge></div>
              <div><span>1.18 – 1.20.4</span><Badge tone="blue">Java 17</Badge></div>
              <div><span>1.17 – 1.17.1</span><Badge tone="amber">Java 16</Badge></div>
              <div><span>≤ 1.16.5</span><Badge>Java 8</Badge></div>
            </div>
            <button className="btn btn-ghost small java-open-folder" type="button" onClick={() => void window.bamboo.openDataFolder()}>
              <FolderOpen size={14} /> 打开运行库目录
            </button>
          </section>
        </aside>
      </div>

      <div className="java-notes-grid">
        <div className="info-tile">
          <span className="info-tile-icon"><HardDrive size={18} /></span>
          <div><strong>64 位优先</strong><p>现代 Minecraft 建议使用 64 位 Java，才能分配超过 1GB 内存。</p></div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><Coffee size={18} /></span>
          <div><strong>游戏版本匹配</strong><p>Java 版本过高或过低都会导致启动失败，Bamboo 会自动读取版本要求。</p></div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><RefreshCw size={18} /></span>
          <div><strong>随时重扫</strong><p>安装新的 JDK 后点击「扫描本机」，无需重启启动器。</p></div>
        </div>
      </div>
    </div>
  )
}
