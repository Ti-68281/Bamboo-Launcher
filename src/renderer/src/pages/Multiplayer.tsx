import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Globe2,
  Loader2,
  MapPin,
  Network,
  Play,
  RadioTower,
  RefreshCw,
  Router,
  ScanLine,
  ShieldCheck,
  Wifi,
} from 'lucide-react'
import type { LanWorld, NetworkInfo } from '@shared/types'
import { useActiveInstance, useBamboo, messageOf } from '../store'
import { loaderLabel } from '../lib/format'
import { Badge, EmptyState, InlineNotice, PageHeader, Spinner } from '../components/ui'

export function MultiplayerPage() {
  const bootstrap = useBamboo((s) => s.bootstrap)
  const storeWorlds = useBamboo((s) => s.lanWorlds)
  const setLanWorlds = useBamboo((s) => s.setLanWorlds)
  const addToast = useBamboo((s) => s.addToast)
  const account = useBamboo((s) => s.bootstrap?.accounts.find((a) => a.id === s.bootstrap?.activeAccountId))
  const instance = useActiveInstance()
  const [info, setInfo] = useState<NetworkInfo | null>(null)
  const [port, setPort] = useState('25565')
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [mapping, setMapping] = useState(false)
  const [mapped, setMapped] = useState(false)
  const [mapMessage, setMapMessage] = useState<string | null>(null)

  useEffect(() => {
    void refresh()
  }, [])

  useEffect(() => {
    if (storeWorlds.length) {
      setPort(String(storeWorlds[0].port))
      setInfo((current) =>
        current
          ? {
              ...current,
              port: storeWorlds[0].port,
              worlds: mergeWorlds(storeWorlds, current.worlds),
            }
          : current,
      )
    }
  }, [storeWorlds])

  async function refresh() {
    setLoading(true)
    try {
      const network = await window.bamboo.getNetworkInfo(Number(port) || null)
      setInfo(network)
      if (network.worlds?.length) {
        setLanWorlds(network.worlds)
        setPort(String(network.worlds[0].port))
      }
    } catch (error) {
      addToast({ kind: 'error', title: '读取网络信息失败', message: messageOf(error) })
    } finally {
      setLoading(false)
    }
  }

  async function scan() {
    setScanning(true)
    try {
      const worlds = await window.bamboo.discoverLanWorlds()
      setLanWorlds(worlds)
      if (worlds.length) {
        setPort(String(worlds[0].port))
        addToast({ kind: 'success', title: '发现局域网世界', message: `共找到 ${worlds.length} 个，端口 ${worlds[0].port}。` })
      } else {
        addToast({ kind: 'info', title: '暂时没有发现', message: '请先在游戏的暂停菜单选择「对局域网开放」，再扫描一次。' })
      }
      setInfo(await window.bamboo.getNetworkInfo(worlds[0]?.port ?? (Number(port) || null)))
    } catch (error) {
      addToast({ kind: 'error', title: '扫描失败', message: messageOf(error) })
    } finally {
      setScanning(false)
    }
  }

  async function mapPort() {
    if (!port) return
    setMapping(true)
    setMapMessage(null)
    try {
      const next = await window.bamboo.mapPort(Number(port))
      setInfo(next)
      setMapped(true)
      setMapMessage(next.upnpMessage ?? '端口映射成功。')
      addToast({ kind: 'success', title: '端口已映射', message: next.upnpMessage })
    } catch (error) {
      const message = messageOf(error)
      setMapMessage(message)
      addToast({ kind: 'warning', title: '路由器没有回应', message })
    } finally {
      setMapping(false)
    }
  }

  async function unmap() {
    try {
      await window.bamboo.unmapPort(Number(port))
      setMapped(false)
      setMapMessage('已移除 UPnP 映射。')
    } catch (error) {
      addToast({ kind: 'error', title: '移除映射失败', message: messageOf(error) })
    }
  }

  function copy(text: string, label: string) {
    void window.bamboo.copyText(text)
    addToast({ kind: 'success', title: '已复制', message: label })
  }

  const worlds = mergeWorlds(storeWorlds, info?.worlds ?? [])
  const primary = info?.primaryIp
  const external = info?.externalIp
  const address = primary ? `${primary}:${port}` : ''

  return (
    <div className="page multiplayer-page">
      <PageHeader
        eyebrow="LAN & FRIENDS"
        title="联机"
        subtitle="同一个屋檐下，或隔着一条网线，一起回到那片森林。"
        actions={
          <>
            <button className="btn btn-ghost" type="button" onClick={() => void refresh()} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'spin' : ''} /> 刷新
            </button>
            <button className="btn btn-primary" type="button" onClick={() => void scan()} disabled={scanning}>
              {scanning ? <Spinner size={15} /> : <ScanLine size={16} />}
              扫描局域网
            </button>
          </>
        }
      />

      <div className="lan-layout">
        <section className="lan-hero glass-card">
          <div className="lan-radar" aria-hidden="true">
            <span className="radar-ring r1" />
            <span className="radar-ring r2" />
            <span className="radar-ring r3" />
            <span className="radar-center"><RadioTower size={26} /></span>
          </div>
          <div className="lan-hero-copy">
            <span className="hero-kicker"><LeafIcon /> SAME FOREST, SAME WORLD</span>
            <h1>世界已经打开</h1>
            <p>在游戏内选择「对局域网开放」，Bamboo 会自动识别端口。</p>
            <div className="lan-steps">
              <div><span>1</span>打开游戏世界</div>
              <ArrowRight size={14} />
              <div><span>2</span>对局域网开放</div>
              <ArrowRight size={14} />
              <div><span>3</span>分享地址</div>
            </div>
            <div className="lan-hero-actions">
              {instance ? (
                <button className="btn btn-soft" type="button" onClick={() => void window.bamboo.launch(instance.id)}>
                  <Play size={15} fill="currentColor" /> 启动 {instance.name}
                </button>
              ) : (
                <span className="muted">还没有可以启动的实例。</span>
              )}
              {instance && <span className="lan-target">目标实例 · {loaderLabel(instance.loader)} · {instance.mcVersion}</span>}
            </div>
          </div>
        </section>

        <aside className="lan-address-card glass-card">
          <div className="lan-card-head">
            <span className="section-kicker">YOUR ADDRESS</span>
            <Badge tone={worlds.length ? 'green' : 'neutral'}>
              {worlds.length ? '局域网已发现' : '等待世界开放'}
            </Badge>
          </div>
          <div className="address-display">
            <span>内网地址</span>
            <strong>{address || '尚未检测到端口'}</strong>
            <small>{info?.hostname ?? '本机'} · {info?.localIps.length ?? 0} 个网络接口</small>
          </div>
          <div className="lan-field-row">
            <label className="field grow">
              <span>局域网端口</span>
              <input className="input mono" value={port} onChange={(event) => setPort(event.target.value.replace(/\D/g, '').slice(0, 5))} />
            </label>
            <button className="icon-button soft address-copy" type="button" disabled={!address} onClick={() => copy(address, '内网地址已复制')} title="复制地址">
              <Copy size={16} />
            </button>
          </div>
          <div className="lan-ip-list">
            {info?.localIps.map((ip) => (
              <button type="button" key={ip} onClick={() => copy(`${ip}:${port}`, `${ip}:${port} 已复制`)}>
                <Wifi size={12} /> {ip} <Copy size={11} />
              </button>
            ))}
            {!info?.localIps.length && <span>没有检测到可用的 IPv4 地址。</span>}
          </div>
          <div className="lan-map-block">
            <div className="lan-map-head">
              <span><Router size={14} /> 路由器端口映射</span>
              <Badge tone={mapped ? 'green' : 'amber'}>{mapped ? '已开启' : '未开启'}</Badge>
            </div>
            <p>开启 UPnP 后，Bamboo 会尝试把 TCP 端口映射到公网，让外网朋友也能加入。需要路由器支持并启用 UPnP。</p>
            {mapped && external && (
              <div className="public-address">
                <Globe2 size={14} />
                <span>{external}:{port}</span>
                <button type="button" onClick={() => copy(`${external}:${port}`, '公网地址已复制')}><Copy size={12} /></button>
              </div>
            )}
            {mapMessage && (
              <div className={`map-message ${mapped ? 'success' : 'warning'}`}>
                {mapped ? <Check size={13} /> : <ShieldCheck size={13} />} {mapMessage}
              </div>
            )}
            {mapped ? (
              <button className="btn btn-ghost small" type="button" onClick={() => void unmap()}>移除映射</button>
            ) : (
              <button className="btn btn-soft small" type="button" disabled={mapping || !port} onClick={() => void mapPort()}>
                {mapping ? <Spinner size={14} /> : <Network size={14} />}
                尝试开启 UPnP
              </button>
            )}
          </div>
          <InlineNotice tone="neutral" icon={<ShieldCheck size={15} />}>
            公网可达性取决于路由器与运营商网络。Bamboo 不会把你的世界上传到第三方中继。
          </InlineNotice>
        </aside>
      </div>

      <section className="lan-worlds">
        <div className="section-heading">
          <div>
            <span className="section-kicker">NEARBY WORLDS</span>
            <h2>附近的竹林</h2>
          </div>
          <span className="muted tiny">Minecraft LAN 广播 · 224.0.2.60</span>
        </div>
        {worlds.length ? (
          <div className="lan-world-grid">
            {worlds.map((world) => (
              <div className="lan-world-card glass-card" key={`${world.address}:${world.port}`}>
                <div className="lan-world-icon">
                  <MapPin size={19} />
                </div>
                <div className="lan-world-copy">
                  <strong>{world.motd}</strong>
                  <span>{world.address}:{world.port}</span>
                  <small>{world.source === 'broadcast' ? '由局域网广播发现' : '从游戏日志自动识别'}</small>
                </div>
                <button
                  className="btn btn-soft small"
                  type="button"
                  onClick={() => copy(`${world.address}:${world.port}`, '世界地址已复制')}
                >
                  <Copy size={13} /> 复制
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card empty-page-card">
            <EmptyState
              icon={<Network size={30} />}
              title="附近还没有发现世界"
              description="让朋友在游戏里对局域网开放世界，然后点击右上角「扫描局域网」。也可以手动分享你的 IP 和端口。"
              action={<button className="btn btn-soft" type="button" onClick={() => void scan()} disabled={scanning}>再扫描一次</button>}
            />
          </div>
        )}
      </section>

      <div className="lan-notes-grid">
        <div className="info-tile">
          <span className="info-tile-icon"><Wifi size={18} /></span>
          <div><strong>同 Wi-Fi 最稳</strong><p>优先尝试内网地址；它不需要经过路由器映射，延迟最低。</p></div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><Router size={18} /></span>
          <div><strong>不同网络？</strong><p>开启 UPnP 映射后再分享公网地址；若运营商使用 CGNAT，可能需要其他穿透方式。</p></div>
        </div>
        <div className="info-tile">
          <span className="info-tile-icon"><ExternalLink size={18} /></span>
          <div><strong>原版就能联机</strong><p>双方游戏版本与加载器尽量一致；模组世界还需要朋友安装相同模组。</p></div>
        </div>
      </div>
    </div>
  )
}

function mergeWorlds(a: LanWorld[], b: LanWorld[]): LanWorld[] {
  const map = new Map<string, LanWorld>()
  for (const world of [...a, ...b]) map.set(`${world.address}:${world.port}`, world)
  return Array.from(map.values()).sort((x, y) => y.lastSeen - x.lastSeen)
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M20 4C10 4 4 9 4 17c0 1 .2 2 .5 3C14 20 20 14 20 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 21c2-6 6-9 11-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
