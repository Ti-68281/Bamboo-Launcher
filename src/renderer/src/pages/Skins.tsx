import { useEffect, useState } from 'react'
import {
  Check,
  Copy,
  DownloadCloud,
  ImagePlus,
  Info,
  Leaf,
  RefreshCw,
  ShieldCheck,
  Shirt,
  Sparkles,
  Upload,
  UserRound,
} from 'lucide-react'
import type { Account } from '@shared/types'
import { useBamboo, useCurrentAccount, messageOf } from '../store'
import { timeAgo } from '../lib/format'
import { Badge, EmptyState, InlineNotice, PageHeader, Segmented, Spinner } from '../components/ui'
import { SkinFace, SkinPreview } from '../components/SkinPreview'

export function SkinsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen)
  const setActiveAccount = useBamboo((s) => s.setActiveAccount)
  const setPage = useBamboo((s) => s.setPage)
  const addToast = useBamboo((s) => s.addToast)
  const active = useCurrentAccount()
  const [selectedId, setSelectedId] = useState(active?.id ?? '')
  const [model, setModel] = useState<'classic' | 'slim'>(active?.skin?.model ?? 'classic')
  const [busy, setBusy] = useState(false)
  const [skinVersion, setSkinVersion] = useState(0)
  const accounts = bootstrap?.accounts ?? []
  const selected = accounts.find((a) => a.id === selectedId) ?? active

  useEffect(() => {
    if (!selectedId && active?.id) setSelectedId(active.id)
  }, [active?.id, selectedId])

  useEffect(() => {
    if (selected) setModel(selected.skin?.model ?? 'classic')
  }, [selected?.id, selected?.skin?.updatedAt])

  async function upload() {
    if (!selected) return
    if (selected.type === 'microsoft') {
      addToast({ kind: 'info', title: '正版皮肤由 Microsoft 管理', message: '请在 minecraft.net 更换正版皮肤；离线皮肤只对离线账户开放。' })
      return
    }
    setBusy(true)
    try {
      const account = await window.bamboo.chooseAndUploadSkin(selected.id)
      if (account) {
        addToast({ kind: 'success', title: '皮肤已种下', message: `${account.name} 将使用新的皮肤，下次启动生效。` })
        setSkinVersion((v) => v + 1)
        const bootstrapNext = await window.bamboo.bootstrap()
        useBamboo.setState({ bootstrap: bootstrapNext })
      }
    } catch (error) {
      addToast({ kind: 'error', title: '皮肤没有换好', message: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  async function saveModel(next: 'classic' | 'slim') {
    if (!selected) return
    setModel(next)
    if (selected.type === 'microsoft' || !selected.skin) return
    try {
      await window.bamboo.setSkinModel(selected.id, next)
      addToast({ kind: 'success', title: '模型已切换', message: next === 'slim' ? '已设置为 Alex 细手臂模型。' : '已设置为 Steve 经典模型。' })
      const bootstrapNext = await window.bamboo.bootstrap()
      useBamboo.setState({ bootstrap: bootstrapNext })
    } catch (error) {
      addToast({ kind: 'error', title: '切换失败', message: messageOf(error) })
    }
  }

  async function activate(account: Account) {
    setSelectedId(account.id)
    await setActiveAccount(account.id)
  }

  if (!accounts.length) {
    return (
      <div className="page">
        <PageHeader eyebrow="YOUR SKIN" title="皮肤" subtitle="给离线世界的自己，换一件喜欢的衣服。" />
        <div className="glass-card empty-page-card">
          <EmptyState
            icon={<Shirt size={32} />}
            title="还没有旅行者"
            description="添加一个离线账户，就可以上传 64×64 的 PNG 皮肤。"
            action={<button className="btn btn-primary" type="button" onClick={() => setAccountModalOpen(true)}>添加账户</button>}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page skins-page">
      <PageHeader
        eyebrow="YOUR SKIN"
        title="皮肤"
        subtitle="离线账户也能有自己的样子。上传 PNG，Bamboo 会在启动时把它带进游戏。"
        actions={
          <button className="btn btn-ghost" type="button" onClick={() => setAccountModalOpen(true)}>
            <UserRound size={15} /> 账户管理
          </button>
        }
      />

      <div className="skin-account-strip">
        {accounts.map((account) => (
          <button
            key={account.id}
            type="button"
            className={`skin-account-chip ${selected?.id === account.id ? 'active' : ''}`}
            onClick={() => void activate(account)}
          >
            <SkinFace dataUrl={account.skin?.dataUrl} name={account.name} size={34} round />
            <span>
              <strong>{account.name}</strong>
              <small>{account.type === 'microsoft' ? 'Microsoft' : '离线账户'}</small>
            </span>
            {selected?.id === account.id && <Check size={14} />}
          </button>
        ))}
        <button type="button" className="skin-account-add" onClick={() => setAccountModalOpen(true)}>+ 新账户</button>
      </div>

      {selected && (
        <div className="skin-layout">
          <section className="skin-stage glass-card">
            <div className="skin-stage-glow" />
            <div className="skin-stage-top">
              <div>
                <span className="section-kicker">SKIN PREVIEW</span>
                <h2>{selected.name}</h2>
                <p>
                  {selected.type === 'microsoft' ? 'Microsoft 正版档案' : '离线漫游者'}
                  <span className="dot-sep" />
                  {selected.skin ? `更新于 ${timeAgo(selected.skin.updatedAt)}` : '默认外观'}
                </p>
              </div>
              <Badge tone={selected.type === 'microsoft' ? 'blue' : 'green'}>
                {selected.type === 'microsoft' ? '正版在线' : '离线可定制'}
              </Badge>
            </div>
            <div className="skin-canvas-wrap" key={`${selected.id}-${skinVersion}-${selected.skin?.updatedAt}`}>
              <SkinPreview
                dataUrl={selected.skin?.dataUrl}
                model={model}
                name={selected.name}
                width={252}
                height={340}
              />
              <div className="skin-canvas-bamboo" aria-hidden="true"><Leaf size={22} /></div>
              <div className="skin-canvas-bamboo two" aria-hidden="true"><Leaf size={15} /></div>
            </div>
            <div className="skin-stage-foot">
              <span><Shirt size={13} /> {model === 'slim' ? 'Alex · 细手臂' : 'Steve · 经典'}</span>
              <span><Sparkles size={13} /> 64 × 64 PNG</span>
              {selected.skin && (
                <button type="button" onClick={() => void window.bamboo.copyText(selected.skin?.dataUrl ?? '')}>
                  <Copy size={12} /> 复制数据
                </button>
              )}
            </div>
          </section>

          <section className="skin-controls">
            <div className="glass-card skin-control-card">
              <div className="skin-control-head">
                <div>
                  <span className="section-kicker">WARDROBE</span>
                  <h3>换一件衣服</h3>
                </div>
                <ImagePlus size={20} />
              </div>
              {selected.type === 'microsoft' ? (
                <InlineNotice tone="info" icon={<ShieldCheck size={17} />} title="正版皮肤由 Microsoft 管理">
                  你的皮肤已经跟随正版档案自动同步。若要更换，请到 minecraft.net 的个人资料页修改，Bamboo 会在下次登录时更新预览。
                </InlineNotice>
              ) : (
                <>
                  <button className="skin-upload-zone" type="button" onClick={() => void upload()} disabled={busy}>
                    <span className="skin-upload-icon">
                      {busy ? <Spinner size={22} /> : <Upload size={22} />}
                    </span>
                    <strong>{busy ? '正在读取 PNG…' : '选择一张皮肤'}</strong>
                    <span>支持 64×64 / 64×32 的 PNG，也可以直接拖进窗口</span>
                  </button>
                  <div className="skin-model-row">
                    <div>
                      <strong>手臂模型</strong>
                      <span>影响游戏内角色手臂的宽度。</span>
                    </div>
                    <Segmented
                      size="small"
                      value={model}
                      onChange={(value) => void saveModel(value)}
                      options={[
                        { value: 'classic', label: '经典' },
                        { value: 'slim', label: '细手臂' },
                      ]}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="glass-card skin-note-card">
              <div className="skin-note-icon"><Info size={18} /></div>
              <div>
                <h4>离线皮肤是怎么进入游戏的？</h4>
                <p>
                  启动离线账户时，Bamboo 会启动一个仅监听本机的皮肤桥接服务，并临时挂载 authlib-injector，让游戏从本地读取你的皮肤。不会上传到第三方。
                </p>
                <div className="skin-note-checks">
                  <span><Check size={12} /> 仅本机访问</span>
                  <span><Check size={12} /> 不改动游戏核心</span>
                  <span><Check size={12} /> 可在实例设置中关闭</span>
                </div>
                <button className="text-button small" type="button" onClick={() => setPage('instances')}>
                  检查实例开关 <DownloadCloud size={13} />
                </button>
              </div>
            </div>

            <div className="skin-tips glass-card">
              <span className="section-kicker">TIPS</span>
              <h4>画一张适合竹林的皮肤</h4>
              <p>留下清晰的 8×8 面部，使用相近的绿色与米色；过于细碎的花纹在低分辨率下会消失。</p>
              <div className="skin-palette" aria-hidden="true">
                <span style={{ background: '#92c98e' }} />
                <span style={{ background: '#d7e9b1' }} />
                <span style={{ background: '#264a35' }} />
                <span style={{ background: '#e7ddc4' }} />
                <span style={{ background: '#bb8e6a' }} />
                <span style={{ background: '#0d1c14' }} />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
