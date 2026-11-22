import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  ImagePlus,
  KeyRound,
  Loader2,
  LogIn,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserRound,
  Users,
  Wifi,
} from 'lucide-react'
import type { Account, MicrosoftLoginStart } from '@shared/types'
import { useBamboo, useCurrentAccount, messageOf } from '../store'
import { timeAgo } from '../lib/format'
import { Badge, InlineNotice, Modal, Segmented, Spinner, Toggle } from '../components/ui'
import { SkinFace, SkinPreview } from '../components/SkinPreview'

type AddMode = 'offline' | 'microsoft'

export function AccountModal() {
  const open = useBamboo((s) => s.accountModalOpen)
  const setOpen = useBamboo((s) => s.setAccountModalOpen)
  const bootstrap = useBamboo((s) => s.bootstrap)
  const active = useCurrentAccount()
  const refresh = useBamboo((s) => s.refresh)
  const setActiveAccount = useBamboo((s) => s.setActiveAccount)
  const addToast = useBamboo((s) => s.addToast)
  const setPage = useBamboo((s) => s.setPage)
  const [mode, setMode] = useState<AddMode>('offline')
  const [name, setName] = useState('')
  const [skinPath, setSkinPath] = useState('')
  const [model, setModel] = useState<'classic' | 'slim'>('classic')
  const [creating, setCreating] = useState(false)
  const [flow, setFlow] = useState<MicrosoftLoginStart | null>(null)
  const [msStatus, setMsStatus] = useState('')
  const [msStarting, setMsStarting] = useState(false)
  const [workingAccount, setWorkingAccount] = useState<string | null>(null)
  const accounts = bootstrap?.accounts ?? []

  useEffect(() => {
    if (!open) {
      setFlow(null)
      setMsStatus('')
      setName('')
      setSkinPath('')
    }
  }, [open])

  useEffect(() => {
    if (!flow) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const poll = async () => {
      try {
        const result = await window.bamboo.pollMicrosoftLogin(flow.flowId)
        if (cancelled) return
        if (result) {
          setMsStatus('登录成功，正在同步档案…')
          await refresh()
          await setActiveAccount(result.account.id)
          addToast({ kind: 'success', title: '欢迎回来', message: `${result.account.name} 已登录 Microsoft 账户。` })
          setOpen(false)
          setFlow(null)
          return
        }
        timer = setTimeout(poll, Math.max(5000, flow.interval * 1000))
      } catch (error) {
        if (cancelled) return
        setMsStatus(messageOf(error))
      }
    }
    timer = setTimeout(poll, Math.max(5000, flow.interval * 1000))
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [flow?.flowId])

  async function startMicrosoft() {
    setMsStarting(true)
    setMsStatus('正在向 Microsoft 请求设备代码…')
    try {
      const started = await window.bamboo.startMicrosoftLogin()
      setFlow(started)
      setMsStatus('等待你在浏览器中完成授权…')
    } catch (error) {
      const message = messageOf(error)
      setMsStatus(message)
      if (message.includes('MICROSOFT_CLIENT_ID_REQUIRED')) {
        addToast({ kind: 'warning', title: '需要先配置 Azure 应用 ID', message: '已打开设置页，填入客户端 ID 后再回来登录。' })
        setOpen(false)
        setPage('settings')
      }
    } finally {
      setMsStarting(false)
    }
  }

  async function chooseSkin() {
    try {
      const file = await window.bamboo.chooseFile([{ name: 'PNG 皮肤', extensions: ['png'] }])
      if (file) setSkinPath(file)
    } catch (error) {
      addToast({ kind: 'error', title: '无法选择文件', message: messageOf(error) })
    }
  }

  async function createOffline() {
    if (!name.trim()) return
    setCreating(true)
    try {
      const account = await window.bamboo.addOfflineAccount({ name, skinPath: skinPath || undefined, model })
      await refresh()
      await setActiveAccount(account.id)
      addToast({ kind: 'success', title: '离线旅行者已创建', message: `${account.name} 可以出发了。` })
      setOpen(false)
    } catch (error) {
      addToast({ kind: 'error', title: '创建失败', message: messageOf(error) })
    } finally {
      setCreating(false)
    }
  }

  async function switchAccount(account: Account) {
    setWorkingAccount(account.id)
    try {
      await setActiveAccount(account.id)
      addToast({ kind: 'success', title: '已切换账户', message: `当前旅行者：${account.name}` })
    } finally {
      setWorkingAccount(null)
    }
  }

  async function logout(account: Account) {
    setWorkingAccount(account.id)
    try {
      await window.bamboo.logoutAccount(account.id)
      await refresh()
      addToast({ kind: 'info', title: '账户已移除', message: `${account.name} 的本地登录信息已清除。` })
    } catch (error) {
      addToast({ kind: 'error', title: '移除失败', message: messageOf(error) })
    } finally {
      setWorkingAccount(null)
    }
  }

  async function refreshAccount(account: Account) {
    setWorkingAccount(account.id)
    try {
      await window.bamboo.refreshMicrosoftAccount(account.id)
      await refresh()
      addToast({ kind: 'success', title: '登录状态已刷新' })
    } catch (error) {
      addToast({ kind: 'error', title: '刷新失败', message: messageOf(error) })
    } finally {
      setWorkingAccount(null)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      width={860}
      className="account-modal"
      title="旅行者档案"
      subtitle="选择身份，或让新的旅行者加入竹林。"
    >
      <div className="account-layout">
        <aside className="account-list-panel">
          <div className="account-list-label">
            <span>本机账户</span>
            <Badge tone="neutral">{accounts.length}</Badge>
          </div>
          <div className="account-list">
            {accounts.map((account) => (
              <div className={`account-item ${active?.id === account.id ? 'active' : ''}`} key={account.id}>
                <button type="button" className="account-item-main" onClick={() => void switchAccount(account)}>
                  <SkinFace dataUrl={account.skin?.dataUrl} name={account.name} size={38} round />
                  <span>
                    <strong>{account.name}</strong>
                    <small>{account.type === 'microsoft' ? 'Microsoft 正版' : '离线账户'}</small>
                  </span>
                  {active?.id === account.id ? <Check size={14} /> : <ChevronRight size={14} />}
                </button>
                <div className="account-item-actions">
                  {account.type === 'microsoft' && (
                    <button type="button" title="刷新登录" onClick={() => void refreshAccount(account)} disabled={workingAccount === account.id}>
                      {workingAccount === account.id ? <Spinner size={12} /> : <RefreshCw size={12} />}
                    </button>
                  )}
                  <button type="button" title="移除账户" onClick={() => void logout(account)} disabled={workingAccount === account.id}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            {!accounts.length && (
              <div className="account-list-empty">
                <Users size={22} />
                <span>还没有旅行者</span>
                <small>离线或 Microsoft 都可以。</small>
              </div>
            )}
          </div>
          <div className="account-list-tip">
            <ShieldCheck size={14} />
            登录凭据使用系统密钥环加密，仅保存在本机。
          </div>
        </aside>

        <div className="account-form-panel">
          <Segmented
            value={mode}
            onChange={(value) => {
              setMode(value)
              setFlow(null)
              setMsStatus('')
            }}
            options={[
              { value: 'offline', label: '离线账户', icon: <UserRound size={14} /> },
              { value: 'microsoft', label: 'Microsoft', icon: <LogIn size={14} /> },
            ]}
          />

          {mode === 'offline' ? (
            <div className="account-form-card">
              <div className="account-form-intro">
                <span className="account-form-icon"><UserRound size={22} /></span>
                <div>
                  <h3>创建一个离线身份</h3>
                  <p>无需密码，适合单人游戏与离线服务器。3–16 位英文、数字或下划线。</p>
                </div>
              </div>
              <label className="field">
                <span>游戏内名称</span>
                <input
                  className="input"
                  value={name}
                  maxLength={16}
                  placeholder="例如 BambooLeaf"
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && void createOffline()}
                />
              </label>
              <div className="offline-skin-row">
                <button type="button" className="offline-skin-picker" onClick={() => void chooseSkin()}>
                  <span className="offline-skin-icon"><ImagePlus size={18} /></span>
                  <span>
                    <strong>{skinPath ? skinPath.split(/[\\/]/).pop() : '可选：选择皮肤 PNG'}</strong>
                    <small>64×64 或 64×32，创建后也可以在皮肤页更换。</small>
                  </span>
                </button>
                <Segmented
                  size="small"
                  value={model}
                  onChange={setModel}
                  options={[
                    { value: 'classic', label: '经典' },
                    { value: 'slim', label: '细手臂' },
                  ]}
                />
              </div>
              <button className="btn btn-primary account-submit" type="button" disabled={!name.trim() || creating} onClick={() => void createOffline()}>
                {creating ? <><Loader2 size={15} className="spin" /> 正在创建</> : <><ArrowRight size={15} /> 创建并选中</>}
              </button>
              <InlineNotice tone="info" icon={<Wifi size={15} />}>
                离线账户只能加入离线验证服务器；正版服务器会拒绝登录。皮肤通过本地桥接生效。
              </InlineNotice>
            </div>
          ) : (
            <div className="account-form-card">
              <div className="account-form-intro">
                <span className="account-form-icon microsoft"><LogIn size={22} /></span>
                <div>
                  <h3>登录 Microsoft 账户</h3>
                  <p>拉取你的正版档案与皮肤，访问正版服务器。Bamboo 不会看到你的密码。</p>
                </div>
              </div>
              {flow ? (
                <div className="device-flow">
                  <div className="device-code-label">在浏览器中输入这段代码</div>
                  <button
                    className="device-code"
                    type="button"
                    onClick={() => {
                      void window.bamboo.copyText(flow.userCode)
                      addToast({ kind: 'success', title: '代码已复制', message: flow.userCode })
                    }}
                  >
                    {flow.userCode}
                    <Copy size={16} />
                  </button>
                  <button className="btn btn-primary" type="button" onClick={() => void window.bamboo.openExternal(flow.verificationUri)}>
                    <ExternalLink size={15} /> 打开 Microsoft 登录页
                  </button>
                  <div className="device-flow-status">
                    <Spinner size={14} />
                    <span>{msStatus || '等待你在浏览器中完成授权…'}</span>
                  </div>
                  <div className="device-flow-foot">
                    <Clock3 size={12} /> 代码将在约 {Math.round(flow.expiresIn / 60)} 分钟后过期
                    <button type="button" onClick={() => { setFlow(null); setMsStatus('') }}>取消</button>
                  </div>
                </div>
              ) : (
                <>
                  {!bootstrap?.microsoftClientIdConfigured ? (
                    <InlineNotice
                      tone="warning"
                      icon={<KeyRound size={17} />}
                      title="需要先配置 Azure 应用 ID"
                      action={<button className="btn btn-soft small" type="button" onClick={() => { setOpen(false); setPage('settings') }}>去设置</button>}
                    >
                      这是 Microsoft 的开发者要求。配置一次后，所有微软账户都可使用。
                    </InlineNotice>
                  ) : (
                    <InlineNotice tone="success" icon={<ShieldCheck size={16} />} title="OAuth 设备代码流">
                      点击下方按钮后，在 Microsoft 页面输入一次性代码即可，密码不会经过 Bamboo。
                    </InlineNotice>
                  )}
                  <button className="btn btn-primary account-submit" type="button" disabled={msStarting || !bootstrap?.microsoftClientIdConfigured} onClick={() => void startMicrosoft()}>
                    {msStarting ? <><Loader2 size={15} className="spin" /> 正在连接</> : <><LogIn size={15} /> 使用 Microsoft 登录</>}
                  </button>
                  {msStatus && <div className="ms-status">{msStatus}</div>}
                  <div className="microsoft-feature-list">
                    <span><Check size={12} /> 自动同步正版皮肤</span>
                    <span><Check size={12} /> 支持正版服务器</span>
                    <span><Check size={12} /> 令牌本机加密</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
