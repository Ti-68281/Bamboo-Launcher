import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Coffee,
  Copy,
  Database,
  DownloadCloud,
  ExternalLink,
  Eye,
  EyeOff,
  FolderOpen,
  Gauge,
  Github,
  Globe2,
  HardDrive,
  Info,
  KeyRound,
  Mail,
  MonitorCog,
  Palette,
  Puzzle,
  RefreshCw,
  Save,
  Sparkles,
  Sprout,
  UserRound,
} from 'lucide-react'
import type { FeatureKey, ThemeId } from '@shared/types'
import { useBamboo, messageOf } from '../store'
import { Badge, InlineNotice, PageHeader, Segmented, Spinner, Toggle } from '../components/ui'

const FEATURE_LABELS: Array<{ key: FeatureKey; label: string; hint: string; icon: typeof Puzzle }> = [
  { key: 'mods', label: '模组', hint: '搜索、安装与开关 Mod', icon: Puzzle },
  { key: 'modpacks', label: '整合包', hint: '拖入整合包自动安装', icon: Cloud },
  { key: 'multiplayer', label: '联机', hint: '局域网扫描与端口映射', icon: Gauge },
  { key: 'skins', label: '皮肤', hint: '离线皮肤与角色预览', icon: Sparkles },
  { key: 'stats', label: '游玩统计', hint: '时长、世界与出发记录', icon: MonitorCog },
  { key: 'java', label: 'Java 管理', hint: '扫描与下载运行时', icon: Coffee },
  { key: 'crash', label: '崩溃诊断', hint: '崩溃原因与模组定位', icon: RefreshCw },
]

const THEMES: Array<{ id: ThemeId; name: string; hint: string; swatches: string[] }> = [
  { id: 'bamboo', name: '新竹', hint: '清透、温润、带一点晨光', swatches: ['#0b1710', '#8fce9b', '#d8efa9', '#e8dfc7'] },
  { id: 'moss', name: '苔庭', hint: '更深、更静、像雨后的林地', swatches: ['#10150e', '#7f9d65', '#c7d49a', '#d9d0b8'] },
  { id: 'moon', name: '月竹', hint: '冷调、月光、薄雾', swatches: ['#09131a', '#8dbcc2', '#c8e4dd', '#dbe7e8'] },
]

export function SettingsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const updateSettings = useBamboo((s) => s.updateSettings)
  const refresh = useBamboo((s) => s.refresh)
  const addToast = useBamboo((s) => s.addToast)
  const updateInfo = useBamboo((s) => s.updateInfo)
  const updateChecking = useBamboo((s) => s.updateChecking)
  const checkForUpdates = useBamboo((s) => s.checkForUpdates)
  const downloadUpdate = useBamboo((s) => s.downloadUpdate)
  const jobs = useBamboo((s) => s.jobs)
  const settings = bootstrap?.settings
  const updateJob = Object.values(jobs).find(
    (job) => job.kind === 'other' && job.title.startsWith('下载更新') && job.status === 'running',
  )
  const [msClientId, setMsClientId] = useState(settings?.microsoftClientId ?? '')
  const [cfKey, setCfKey] = useState('')
  const [showCf, setShowCf] = useState(false)
  const [testingCf, setTestingCf] = useState(false)
  const [savingMs, setSavingMs] = useState(false)
  const [savingCf, setSavingCf] = useState(false)
  const [showMsGuide, setShowMsGuide] = useState(false)
  const [memory, setMemory] = useState(settings?.defaultMemoryMb ?? 4096)
  const [concurrency, setConcurrency] = useState(settings?.downloadConcurrency ?? 12)

  useEffect(() => {
    setMsClientId(settings?.microsoftClientId ?? '')
    setMemory(settings?.defaultMemoryMb ?? 4096)
    setConcurrency(settings?.downloadConcurrency ?? 12)
  }, [settings?.microsoftClientId, settings?.defaultMemoryMb, settings?.downloadConcurrency])

  if (!settings) return null

  async function saveMicrosoft() {
    setSavingMs(true)
    try {
      await updateSettings({ microsoftClientId: msClientId.trim() })
      await refresh()
      addToast({ kind: 'success', title: '微软应用 ID 已保存', message: '现在可以在账户面板发起设备代码登录。' })
    } finally {
      setSavingMs(false)
    }
  }

  async function saveCurseForge() {
    setSavingCf(true)
    try {
      const result = await window.bamboo.setCurseForgeKey(cfKey.trim() || null)
      await refresh()
      setCfKey('')
      addToast({
        kind: result.configured ? 'success' : 'info',
        title: result.configured ? 'CurseForge 已接入' : '已清除 CurseForge Key',
        message: result.configured ? '现在可以搜索和安装 CurseForge 项目。' : 'CurseForge 搜索将提示需要密钥。',
      })
    } catch (error) {
      addToast({ kind: 'error', title: '保存失败', message: messageOf(error) })
    } finally {
      setSavingCf(false)
    }
  }

  async function testCurseForge() {
    setTestingCf(true)
    try {
      const result = await window.bamboo.testCurseForgeKey(cfKey.trim() || undefined)
      addToast({ kind: result.ok ? 'success' : 'error', title: result.ok ? '连接成功' : '连接失败', message: result.message })
    } catch (error) {
      addToast({ kind: 'error', title: '测试失败', message: messageOf(error) })
    } finally {
      setTestingCf(false)
    }
  }

  function toggleFeature(key: FeatureKey) {
    const next = { ...settings!.features, [key]: !settings!.features[key] }
    void updateSettings({ features: next })
  }

  return (
    <div className="page settings-page">
      <PageHeader
        eyebrow="MAKE IT YOURS"
        title="设置"
        subtitle="把竹林调成你喜欢的风。所有设置都会保存在本地。"
        actions={
          <button className="btn btn-ghost" type="button" onClick={() => void window.bamboo.openDataFolder()}>
            <FolderOpen size={15} /> 数据目录
          </button>
        }
      />

      <div className="settings-layout">
        <div className="settings-main">
          <section className="settings-card glass-card">
            <SettingsHeader icon={<Palette size={19} />} kicker="APPEARANCE" title="外观" hint="毛玻璃、主题与动效" />
            <div className="theme-grid">
              {THEMES.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  className={`theme-card ${settings.theme === theme.id ? 'active' : ''}`}
                  onClick={() => void updateSettings({ theme: theme.id })}
                >
                  <span className={`theme-preview theme-${theme.id}`}>
                    <span className="theme-preview-side" />
                    <span className="theme-preview-hero" />
                    <span className="theme-preview-card" />
                  </span>
                  <span className="theme-copy">
                    <strong>{theme.name}</strong>
                    <small>{theme.hint}</small>
                  </span>
                  {settings.theme === theme.id && <span className="theme-check"><Check size={12} /></span>}
                </button>
              ))}
            </div>
            <div className="settings-row">
              <div>
                <strong>毛玻璃强度</strong>
                <span>通透、均衡或更实的背景，影响所有面板。</span>
              </div>
              <Segmented
                value={settings.glass}
                onChange={(value) => void updateSettings({ glass: value })}
                options={[
                  { value: 'clear', label: '通透' },
                  { value: 'balanced', label: '均衡' },
                  { value: 'solid', label: '柔和' },
                ]}
              />
            </div>
            <div className="switch-row">
              <div>
                <strong>收起侧边栏</strong>
                <span>只保留图标，给世界更多空间。</span>
              </div>
              <Toggle checked={settings.compactSidebar} onChange={(value) => void updateSettings({ compactSidebar: value })} />
            </div>
            <div className="switch-row">
              <div>
                <strong>减少动效</strong>
                <span>关闭竹叶漂浮与大部分过渡动画。</span>
              </div>
              <Toggle checked={settings.reduceMotion} onChange={(value) => void updateSettings({ reduceMotion: value })} />
            </div>
          </section>

          <section className="settings-card glass-card">
            <SettingsHeader icon={<Eye size={19} />} kicker="VISIBILITY" title="功能入口" hint="只保留你需要的入口" />
            <div className="feature-toggle-grid">
              {FEATURE_LABELS.map(({ key, label, hint, icon: Icon }) => (
                <div className={`feature-toggle ${settings.features[key] ? 'on' : ''}`} key={key}>
                  <span className="feature-toggle-icon"><Icon size={17} /></span>
                  <div>
                    <strong>{label}</strong>
                    <span>{hint}</span>
                  </div>
                  <Toggle checked={settings.features[key]} onChange={() => toggleFeature(key)} />
                </div>
              ))}
            </div>
            <p className="settings-footnote">关闭后，侧边栏、首页快捷入口和快速通道都会隐藏对应入口；底层数据不会被删除。</p>
          </section>

          <section className="settings-card glass-card">
            <SettingsHeader icon={<DownloadCloud size={19} />} kicker="DOWNLOADS" title="下载与性能" hint="资源来源和并发数" />
            <div className="settings-row">
              <div>
                <strong>下载源</strong>
                <span>官方源稳定；BMCLAPI 对国内网络更友好，失败时自动回退。</span>
              </div>
              <Segmented
                value={settings.downloadSource}
                onChange={(value) => void updateSettings({ downloadSource: value })}
                options={[
                  { value: 'official', label: '官方' },
                  { value: 'bmclapi', label: 'BMCLAPI' },
                ]}
              />
            </div>
            <label className="field">
              <span>并发下载数 <strong>{concurrency}</strong></span>
              <input
                type="range"
                min={2}
                max={32}
                step={2}
                value={concurrency}
                onChange={(event) => setConcurrency(Number(event.target.value))}
                onMouseUp={() => void updateSettings({ downloadConcurrency: concurrency })}
                onTouchEnd={() => void updateSettings({ downloadConcurrency: concurrency })}
                onKeyUp={() => void updateSettings({ downloadConcurrency: concurrency })}
                onBlur={() => void updateSettings({ downloadConcurrency: concurrency })}
              />
              <div className="range-labels"><span>2 · 稳定</span><span>12 · 推荐</span><span>32 · 极速</span></div>
            </label>
            <div className="switch-row">
              <div>
                <strong>启动后最小化启动器</strong>
                <span>游戏出现窗口后自动收起，方便快速进入。</span>
              </div>
              <Toggle checked={settings.minimizeOnLaunch} onChange={(value) => void updateSettings({ minimizeOnLaunch: value })} />
            </div>
            <div className="switch-row">
              <div>
                <strong>启动后关闭启动器</strong>
                <span>游戏运行后隐藏到系统托盘；离线皮肤需要启动器保持运行。</span>
              </div>
              <Toggle checked={settings.closeLauncherOnLaunch} onChange={(value) => void updateSettings({ closeLauncherOnLaunch: value })} />
            </div>
          </section>

          <section className="settings-card glass-card">
            <SettingsHeader icon={<Gauge size={19} />} kicker="DEFAULTS" title="游戏默认值" hint="新实例会继承这些设置" />
            <label className="field">
              <span>默认最大内存 <strong>{memory} MB</strong></span>
              <input
                type="range"
                min={1024}
                max={16384}
                step={512}
                value={memory}
                onChange={(event) => setMemory(Number(event.target.value))}
                onMouseUp={() => void updateSettings({ defaultMemoryMb: memory })}
                onTouchEnd={() => void updateSettings({ defaultMemoryMb: memory })}
                onKeyUp={() => void updateSettings({ defaultMemoryMb: memory })}
                onBlur={() => void updateSettings({ defaultMemoryMb: memory })}
              />
              <div className="range-labels"><span>1 GB</span><span>8 GB</span><span>16 GB</span></div>
            </label>
            <div className="settings-row">
              <div>
                <strong>默认 JVM 预设</strong>
                <span>均衡适合大多数设备；性能模式启用 Aikar 风格 G1 参数。</span>
              </div>
              <Segmented
                value={settings.defaultJvmProfile}
                onChange={(value) => void updateSettings({ defaultJvmProfile: value })}
                options={[
                  { value: 'balanced', label: '均衡' },
                  { value: 'performance', label: '性能' },
                  { value: 'compatibility', label: '兼容' },
                ]}
              />
            </div>
          </section>
        </div>

        <aside className="settings-side">
          <section className="settings-card glass-card">
            <SettingsHeader icon={<UserRound size={19} />} kicker="ACCOUNTS" title="Microsoft 登录" hint="配置 Azure 应用" />
            <p className="settings-copy">
              Bamboo 使用 OAuth 2.0 设备代码流，不会接触或保存你的密码。需要一个启用了「公共客户端流」的 Azure 应用 ID。
            </p>
            <label className="field">
              <span>Azure 客户端 ID</span>
              <input
                className="input mono"
                value={msClientId}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                onChange={(event) => setMsClientId(event.target.value)}
              />
            </label>
            <div className="settings-button-row">
              <button className="btn btn-soft small" type="button" disabled={savingMs} onClick={() => void saveMicrosoft()}>
                {savingMs ? <Spinner size={14} /> : <Save size={14} />} 保存
              </button>
              <button className="text-button small" type="button" onClick={() => setShowMsGuide(!showMsGuide)}>
                如何获取 ID？ <ChevronDown size={13} className={showMsGuide ? 'rotate' : ''} />
              </button>
            </div>
            {showMsGuide && (
              <div className="ms-guide">
                <ol>
                  <li>在 Azure Portal 注册一个应用（个人 Microsoft 账户即可）。</li>
                  <li>账户类型选择「个人 Microsoft 账户」。</li>
                  <li>在「身份验证」中启用「允许公共客户端流」。</li>
                  <li>不需要填写重定向 URI；设备代码流由 Microsoft 托管。</li>
                  <li>复制「应用程序(客户端) ID」粘贴到上方并保存。</li>
                </ol>
                <button className="text-button small" type="button" onClick={() => void window.bamboo.openExternal('https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade')}>
                  打开 Azure 应用注册 <ExternalLink size={12} />
                </button>
              </div>
            )}
            <InlineNotice tone={bootstrap?.microsoftClientIdConfigured ? 'success' : 'warning'} icon={<UserRound size={15} />}>
              {bootstrap?.microsoftClientIdConfigured ? '应用 ID 已配置，可以发起微软登录。' : '尚未配置，离线账户不受影响。'}
            </InlineNotice>
          </section>

          <section className="settings-card glass-card">
            <SettingsHeader icon={<KeyRound size={19} />} kicker="CURSEFORGE" title="CurseForge 接入" hint="搜索与下载生态" />
            <p className="settings-copy">
              CurseForge 的官方 API 需要个人密钥。Bamboo 只将它加密保存在本机，不发送到除 CurseForge 之外的服务。
            </p>
            <div className={`service-status ${bootstrap?.hasCurseForgeKey ? 'on' : ''}`}>
              <span className="service-status-dot" />
              {bootstrap?.hasCurseForgeKey ? 'CurseForge 已连接' : 'CurseForge 未连接'}
              {bootstrap?.hasCurseForgeKey && <Badge tone="green">API Key 已保存</Badge>}
            </div>
            <label className="field">
              <span>API Key</span>
              <div className="password-field">
                <input
                  className="input mono"
                  type={showCf ? 'text' : 'password'}
                  value={cfKey}
                  placeholder={bootstrap?.hasCurseForgeKey ? '已保存，输入新值可替换' : '粘贴 CurseForge API Key'}
                  onChange={(event) => setCfKey(event.target.value)}
                />
                <button type="button" className="icon-button" onClick={() => setShowCf(!showCf)} aria-label="显示密钥">
                  {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>
            <div className="settings-button-row">
              <button className="btn btn-primary small" type="button" disabled={savingCf} onClick={() => void saveCurseForge()}>
                {savingCf ? <Spinner size={14} /> : <Save size={14} />} 保存 Key
              </button>
              <button className="btn btn-ghost small" type="button" disabled={testingCf || (!cfKey && !bootstrap?.hasCurseForgeKey)} onClick={() => void testCurseForge()}>
                {testingCf ? <Spinner size={14} /> : <RefreshCw size={14} />} 测试连接
              </button>
            </div>
            <button className="text-button small" type="button" onClick={() => void window.bamboo.openExternal('https://console.curseforge.com/')}>
              获取 CurseForge API Key <ExternalLink size={12} />
            </button>
            <InlineNotice tone="info" icon={<Info size={15} />}>
              Modrinth 无需密钥，始终可用。CurseForge 部分作者禁止第三方 API 下载时，仍需在网页端手动获取文件。
            </InlineNotice>
          </section>

          <section className="settings-card glass-card">
            <SettingsHeader icon={<Database size={19} />} kicker="STORAGE" title="存储" hint="数据目录与磁盘" />
            <div className="storage-path">
              <HardDrive size={17} />
              <span title={bootstrap?.dataRoot}>{bootstrap?.dataRoot}</span>
              <button type="button" onClick={() => { void window.bamboo.copyText(bootstrap?.dataRoot ?? ''); addToast({ kind: 'success', title: '路径已复制' }) }} title="复制路径">
                <Copy size={14} />
              </button>
            </div>
            <div className="storage-stats">
              <div><span>实例</span><strong>{bootstrap?.instances.length ?? 0}</strong></div>
              <div><span>账户</span><strong>{bootstrap?.accounts.length ?? 0}</strong></div>
              <div><span>诊断记录</span><strong>{bootstrap?.recentCrashes.length ?? 0}</strong></div>
            </div>
            <button className="btn btn-ghost small storage-open" type="button" onClick={() => void window.bamboo.openDataFolder()}>
              <FolderOpen size={14} /> 打开数据目录
            </button>
          </section>

          <section className="about-card glass-card">
            <div className="about-brand">
              <span className="about-mark">
                <Sprout size={20} />
              </span>
              <div>
                <strong>Bamboo</strong>
                <span>v{bootstrap?.appVersion ?? '1.0.1'}</span>
              </div>
              <Badge tone="green">Java Edition</Badge>
            </div>
            <div className="update-panel">
              <div className="update-status">
                <span className={updateInfo?.available ? 'available' : 'latest'}>
                  {updateInfo?.available ? `可更新至 v${updateInfo.latestVersion}` : updateInfo ? `已是最新 v${updateInfo.currentVersion}` : '尚未检查更新'}
                </span>
                {updateInfo?.source && updateInfo.source !== 'none' && (
                  <small>{updateInfo.source === 'github' ? 'GitHub' : updateInfo.source === 'website' ? '官网' : '仓库'}</small>
                )}
              </div>
              <div className="update-actions">
                <button
                  className="btn btn-ghost small"
                  type="button"
                  disabled={updateChecking}
                  onClick={() => void checkForUpdates(true)}
                >
                  <RefreshCw size={13} className={updateChecking ? 'spin' : ''} /> 检查更新
                </button>
                {updateInfo?.available ? (
                  updateInfo.downloadUrl ? (
                    <button
                      className="btn btn-soft small"
                      type="button"
                      disabled={Boolean(updateJob)}
                      onClick={() => void downloadUpdate()}
                    >
                      <DownloadCloud size={13} /> {updateJob ? '下载中…' : '下载更新'}
                    </button>
                  ) : (
                    <button
                      className="btn btn-soft small"
                      type="button"
                      onClick={() => void window.bamboo.openExternal(updateInfo.releaseUrl ?? 'https://github.com/Ti-68281/Bamboo-Launcher/releases')}
                    >
                      <ExternalLink size={13} /> 打开发布页
                    </button>
                  )
                ) : updateInfo?.error ? (
                  <span className="update-error">检查失败</span>
                ) : null}
              </div>
              <div className="switch-row update-toggle-row">
                <div>
                  <strong>自动检查更新</strong>
                  <span>启动时从 GitHub 与官网获取最新版本。</span>
                </div>
                <Toggle
                  checked={settings.autoCheckUpdate}
                  onChange={(value) => void updateSettings({ autoCheckUpdate: value })}
                />
              </div>
            </div>
            <div className="about-links">
              <button type="button" onClick={() => void window.bamboo.openExternal('https://github.com/Ti-68281/Bamboo-Launcher')}><Github size={12} /> GitHub</button>
              <button type="button" onClick={() => void window.bamboo.openExternal('https://bamboo.xbkjz.icu/')}><Globe2 size={12} /> 官网</button>
              <button type="button" onClick={() => void window.bamboo.openExternal('https://www.minecraft.net/')}><ArrowUpRight size={12} /> Minecraft</button>
            </div>
          </section>

          <section className="contact-card glass-card">
            <div className="contact-head">
              <span className="contact-mark"><Mail size={17} /></span>
              <strong>联系作者</strong>
            </div>
            <button
              type="button"
              className="contact-mail"
              onClick={() => {
                void window.bamboo.copyText('Ti68281@xbkjz.icu')
                addToast({ kind: 'success', title: '邮箱已复制', message: 'Ti68281@xbkjz.icu' })
              }}
            >
              <span>Ti68281@xbkjz.icu</span>
              <Copy size={12} />
            </button>
            <button
              type="button"
              className="contact-mail"
              onClick={() => {
                void window.bamboo.copyText('xiaobao@xbkjz.cn')
                addToast({ kind: 'success', title: '邮箱已复制', message: 'xiaobao@xbkjz.cn' })
              }}
            >
              <span>xiaobao@xbkjz.cn</span>
              <Copy size={12} />
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}

function SettingsHeader({
  icon,
  kicker,
  title,
  hint,
}: {
  icon: React.ReactNode
  kicker: string
  title: string
  hint: string
}) {
  return (
    <div className="settings-card-head">
      <span className="settings-head-icon">{icon}</span>
      <div>
        <span className="section-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{hint}</p>
      </div>
    </div>
  )
}
