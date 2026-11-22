import dgram from 'node:dgram'
import os from 'node:os'
import { URL } from 'node:url'
import type { LanWorld, NetworkInfo } from '../../shared/types'
import { appEvents } from '../events'
import { fetchWithTimeout } from '../utils'

interface UpnpDevice {
  location: string
  controlUrl: string
  serviceType: string
}

export class NetworkService {
  private worlds = new Map<string, LanWorld>()
  private mapping: { port: number; externalIp?: string; controlUrl?: string; serviceType?: string } | null = null

  constructor() {
    appEvents.on('internal-lan', (world: LanWorld) => {
      this.worlds.set(`${world.address}:${world.port}`, world)
    })
  }

  async getInfo(port?: number | null): Promise<NetworkInfo> {
    const interfaces = os.networkInterfaces()
    const localIps: string[] = []
    for (const entries of Object.values(interfaces)) {
      if (!entries) continue
      for (const entry of entries) {
        if (entry.family === 'IPv4' && !entry.internal) localIps.push(entry.address)
      }
    }
    localIps.sort((a, b) => {
      const rank = (ip: string) => (ip.startsWith('192.168.') ? 0 : ip.startsWith('10.') ? 1 : 2)
      return rank(a) - rank(b)
    })
    const activePort = port ?? this.mapping?.port ?? null
    const externalIp = this.mapping?.port === activePort ? this.mapping.externalIp : undefined
    return {
      hostname: os.hostname(),
      localIps,
      primaryIp: localIps[0] ?? null,
      port: activePort,
      externalIp,
      mapped: Boolean(this.mapping),
      upnpMessage: this.mapping
        ? `已通过 UPnP 映射 TCP ${this.mapping.port}，外网玩家可尝试连接 ${this.mapping.externalIp ?? '外部地址'}:${this.mapping.port}。`
        : undefined,
      worlds: this.recentWorlds(),
    }
  }

  private recentWorlds(): LanWorld[] {
    const cutoff = Date.now() - 10 * 60_000
    return Array.from(this.worlds.values())
      .filter((w) => w.lastSeen > cutoff)
      .sort((a, b) => b.lastSeen - a.lastSeen)
  }

  async discover(timeoutMs = 4200): Promise<LanWorld[]> {
    const discovered = new Map<string, LanWorld>()
    const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })
    await new Promise<void>((resolve) => {
      let settled = false
      const done = () => {
        if (settled) return
        settled = true
        try {
          socket.close()
        } catch {
          // Already closed.
        }
        resolve()
      }
      socket.on('error', () => done())
      try {
        socket.bind(4445, () => {
          try {
            socket.addMembership('224.0.2.60')
          } catch {
            // Some adapters do not support multicast; unicast LAN discovery can still work.
          }
          socket.on('message', (message, rinfo) => {
            const text = message.toString('utf8')
            const portMatch = text.match(/\[AD\](\d+)\[\/AD\]/i)
            if (!portMatch) return
            const port = Number(portMatch[1])
            if (!port) return
            const motd = text.match(/\[MOTD\]([\s\S]*?)\[\/MOTD\]/i)?.[1] ?? 'Minecraft 局域网世界'
            const world: LanWorld = {
              motd: motd.replace(/§./g, '').trim(),
              port,
              address: rinfo.address,
              lastSeen: Date.now(),
              source: 'broadcast',
            }
            discovered.set(`${world.address}:${world.port}`, world)
          })
        })
      } catch {
        done()
      }
      setTimeout(done, timeoutMs)
    })
    for (const world of discovered.values()) {
      this.worlds.set(`${world.address}:${world.port}`, world)
    }
    return Array.from(discovered.values()).sort((a, b) => b.lastSeen - a.lastSeen)
  }

  private async discoverUpnp(): Promise<UpnpDevice | null> {
    const socket = dgram.createSocket('udp4')
    const locations = new Set<string>()
    await new Promise<void>((resolve) => {
      let settled = false
      const done = () => {
        if (settled) return
        settled = true
        try {
          socket.close()
        } catch {
          // Already closed.
        }
        resolve()
      }
      socket.on('error', () => done())
      socket.bind(0, () => {
        const search = Buffer.from(
          'M-SEARCH * HTTP/1.1\r\n' +
            'HOST: 239.255.255.250:1900\r\n' +
            'MAN: "ssdp:discover"\r\n' +
            'MX: 3\r\n' +
            'ST: urn:schemas-upnp-org:device:InternetGatewayDevice:1\r\n\r\n',
        )
        socket.send(search, 0, search.length, 1900, '239.255.255.250', () => undefined)
      })
      socket.on('message', (message) => {
        const text = message.toString('utf8')
        const location = text.match(/^LOCATION:\s*(.+)$/im)?.[1]?.trim()
        if (location) locations.add(location)
      })
      setTimeout(done, 3800)
    })
    for (const location of locations) {
      const device = await this.describeUpnpDevice(location)
      if (device) return device
    }
    return null
  }

  private async describeUpnpDevice(location: string): Promise<UpnpDevice | null> {
    try {
      const response = await fetchWithTimeout(location, { timeoutMs: 5000 })
      if (!response.ok) return null
      const xml = await response.text()
      const services = Array.from(xml.matchAll(/<service>([\s\S]*?)<\/service>/gi))
      for (const service of services) {
        const body = service[1]
        const serviceType = body.match(/<serviceType>([^<]+)<\/serviceType>/i)?.[1]?.trim() ?? ''
        const controlPath = body.match(/<controlURL>([^<]+)<\/controlURL>/i)?.[1]?.trim()
        if (!controlPath) continue
        if (!/WANIPConnection|WANPPPConnection/i.test(serviceType)) continue
        const base = new URL(location)
        const control = new URL(controlPath, base)
        return { location, controlUrl: control.toString(), serviceType }
      }
      return null
    } catch {
      return null
    }
  }

  private soapEnvelope(service: string, action: string, args: string): string {
    return `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:${action} xmlns:u="${service}">
      ${args}
    </u:${action}>
  </s:Body>
</s:Envelope>`
  }

  private async soUpnp(
    device: UpnpDevice,
    action: string,
    args: string,
    timeoutMs = 8000,
  ): Promise<string> {
    const response = await fetchWithTimeout(device.controlUrl, {
      method: 'POST',
      headers: {
        'content-type': 'text/xml; charset="utf-8"',
        soapaction: `"${device.serviceType}#${action}"`,
      },
      body: this.soapEnvelope(device.serviceType, action, args),
      timeoutMs,
    })
    const text = await response.text()
    if (!response.ok) throw new Error(`路由器返回 ${response.status}：${text.slice(0, 160)}`)
    return text
  }

  async mapPort(port: number): Promise<NetworkInfo> {
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('端口号无效。')
    const info = await this.getInfo(port)
    const localIp = info.primaryIp
    if (!localIp) throw new Error('没有检测到局域网 IP，无法进行端口映射。')
    const device = await this.discoverUpnp()
    if (!device) {
      throw new Error('路由器没有响应 UPnP。请确认路由器已启用 UPnP，或使用其他内网穿透方式。')
    }
    const args = `
      <NewRemoteHost></NewRemoteHost>
      <NewExternalPort>${port}</NewExternalPort>
      <NewProtocol>TCP</NewProtocol>
      <NewInternalPort>${port}</NewInternalPort>
      <NewInternalClient>${localIp}</NewInternalClient>
      <NewEnabled>1</NewEnabled>
      <NewPortMappingDescription>Bamboo Launcher LAN</NewPortMappingDescription>
      <NewLeaseDuration>0</NewLeaseDuration>`
    await this.soUpnp(device, 'AddPortMapping', args)
    let externalIp: string | undefined
    try {
      const xml = await this.soUpnp(device, 'GetExternalIPAddress', '')
      externalIp = xml.match(/<NewExternalIPAddress>([^<]*)<\/NewExternalIPAddress>/i)?.[1]?.trim()
    } catch {
      // The port mapping succeeded even if the router hides its external IP.
    }
    this.mapping = { port, externalIp, controlUrl: device.controlUrl, serviceType: device.serviceType }
    return {
      ...info,
      port,
      externalIp,
      mapped: true,
      upnpMessage: `已通过 UPnP 映射 TCP ${port}。外网玩家可尝试连接 ${externalIp ?? '路由器外部 IP'}:${port}。`,
    }
  }

  async unmapPort(port: number): Promise<void> {
    if (!this.mapping || this.mapping.port !== port) return
    const device: UpnpDevice = {
      location: '',
      controlUrl: this.mapping.controlUrl ?? '',
      serviceType: this.mapping.serviceType ?? '',
    }
    if (device.controlUrl) {
      await this.soUpnp(
        device,
        'DeletePortMapping',
        `<NewRemoteHost></NewRemoteHost><NewExternalPort>${port}</NewExternalPort><NewProtocol>TCP</NewProtocol>`,
      ).catch(() => undefined)
    }
    this.mapping = null
  }

  async cleanup(): Promise<void> {
    if (this.mapping) await this.unmapPort(this.mapping.port).catch(() => undefined)
  }
}
