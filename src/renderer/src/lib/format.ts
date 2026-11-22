import type { LoaderType } from '@shared/types'

export function formatDuration(ms: number, style: 'long' | 'short' = 'long'): string {
  if (!ms || ms < 0) return style === 'short' ? '0m' : '0 分钟'
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (style === 'short') {
    if (hours >= 100) return `${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }
  if (hours > 0) return `${hours} 小时 ${minutes} 分钟`
  if (minutes > 0) return `${minutes} 分钟`
  return '不到 1 分钟'
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '0'
  if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(1)} 亿`
  if (value >= 10_000) return `${(value / 10_000).toFixed(1)} 万`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}

export function formatDate(timestamp?: number): string {
  if (!timestamp) return '从未'
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDay(timestamp: number): string {
  return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric' }).format(
    new Date(timestamp),
  )
}

export function timeAgo(timestamp?: number): string {
  if (!timestamp) return '从未启动'
  const diff = Date.now() - timestamp
  if (diff < 60_000) return '刚刚'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`
  return formatDate(timestamp)
}

export function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 5) return '夜深了，竹影正静'
  if (hour < 11) return '早上好，听一阵竹风'
  if (hour < 14) return '午间好，去林间走走'
  if (hour < 18) return '下午好，光落在竹叶上'
  return '晚上好，星星落在竹林里'
}

export function loaderLabel(loader?: { type: LoaderType; version?: string } | null): string {
  if (!loader || loader.type === 'vanilla') return '原版'
  const labels: Record<LoaderType, string> = {
    vanilla: '原版',
    forge: 'Forge',
    fabric: 'Fabric',
    quilt: 'Quilt',
    neoforge: 'NeoForge',
    liteloader: 'LiteLoader',
  }
  return labels[loader.type] ?? loader.type
}

export function loaderTone(loader?: { type: LoaderType } | null): string {
  switch (loader?.type) {
    case 'fabric':
      return 'tone-fabric'
    case 'forge':
      return 'tone-forge'
    case 'quilt':
      return 'tone-quilt'
    case 'neoforge':
      return 'tone-neoforge'
    case 'liteloader':
      return 'tone-lite'
    default:
      return 'tone-vanilla'
  }
}

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

export function parseJvmArgs(input: string): string[] {
  const args: string[] = []
  const regex = /"([^"]*)"|'([^']*)'|(\S+)/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(input))) {
    args.push(match[1] ?? match[2] ?? match[3])
  }
  return args
}

export function joinJvmArgs(args: string[]): string {
  return args
    .map((arg) => (arg.includes(' ') ? `"${arg.replace(/"/g, '\\"')}"` : arg))
    .join(' ')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
