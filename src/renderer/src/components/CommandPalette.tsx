import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  BarChart3,
  Coffee,
  DownloadCloud,
  FolderOpen,
  HeartPulse,
  House,
  Layers3,
  PackageOpen,
  Puzzle,
  RadioTower,
  Search,
  Settings2,
  Sparkles,
  UserRound,
} from 'lucide-react'
import type { FeatureKey, PageId } from '@shared/types'
import { useBamboo } from '../store'

interface CommandItem {
  id: string
  label: string
  hint: string
  icon: typeof House
  keywords: string
  run: () => void
}

export function CommandPalette() {
  const open = useBamboo((s) => s.commandOpen)
  const setOpen = useBamboo((s) => s.setCommandOpen)
  const setPage = useBamboo((s) => s.setPage)
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen)
  const features = useBamboo((s) => s.bootstrap?.settings.features)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<CommandItem[]>(() => {
    const nav: Array<{ page: PageId; label: string; hint: string; icon: typeof House; feature?: FeatureKey }> = [
      { page: 'home', label: '首页', hint: '回到竹林', icon: House },
      { page: 'instances', label: '实例', hint: '管理游戏目录', icon: Layers3 },
      { page: 'downloads', label: '下载', hint: '安装游戏与加载器', icon: DownloadCloud },
      { page: 'mods', label: '模组', hint: '搜索与安装 Mod', icon: Puzzle, feature: 'mods' },
      { page: 'modpacks', label: '整合包', hint: '拖入或浏览整合包', icon: PackageOpen, feature: 'modpacks' },
      { page: 'multiplayer', label: '联机', hint: '局域网世界', icon: RadioTower, feature: 'multiplayer' },
      { page: 'skins', label: '皮肤', hint: '离线皮肤管理', icon: Sparkles, feature: 'skins' },
      { page: 'stats', label: '统计', hint: '游戏时长', icon: BarChart3, feature: 'stats' },
      { page: 'java', label: 'Java', hint: '运行时管理', icon: Coffee, feature: 'java' },
      { page: 'crash', label: '诊断', hint: '崩溃分析', icon: HeartPulse, feature: 'crash' },
      { page: 'settings', label: '设置', hint: '外观与功能入口', icon: Settings2 },
    ]
    const result: CommandItem[] = nav
      .filter((item) => !item.feature || features?.[item.feature] !== false)
      .map((item) => ({
        id: item.page,
        label: item.label,
        hint: item.hint,
        icon: item.icon,
        keywords: `${item.label} ${item.hint} ${item.page}`,
        run: () => setPage(item.page),
      }))
    result.push(
      {
        id: 'account',
        label: '切换或添加账户',
        hint: '离线 / Microsoft',
        icon: UserRound,
        keywords: '账户 登录 离线 microsoft account login',
        run: () => setAccountModalOpen(true),
      },
      {
        id: 'data-folder',
        label: '打开数据目录',
        hint: '查看实例与日志',
        icon: FolderOpen,
        keywords: '文件夹 数据 目录 存储 folder data',
        run: () => void window.bamboo.openDataFolder(),
      },
      {
        id: 'install',
        label: '安装新的游戏版本',
        hint: '前往下载页',
        icon: DownloadCloud,
        keywords: '下载 安装 新版本 minecraft download install',
        run: () => setPage('downloads'),
      },
    )
    return result
  }, [features, setAccountModalOpen, setPage])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => item.keywords.toLowerCase().includes(normalized))
  }, [items, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelected(0)
    setTimeout(() => inputRef.current?.focus(), 40)
  }, [open])

  useEffect(() => setSelected(0), [query])

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(!open)
        return
      }
      if (!open) return
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelected((index) => Math.min(filtered.length - 1, index + 1))
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelected((index) => Math.max(0, index - 1))
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        const item = filtered[selected]
        if (item) {
          setOpen(false)
          item.run()
        }
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [open, filtered, selected, setOpen])

  if (!open) return null
  return createPortal(
    <div className="command-layer" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <div className="command-panel">
        <div className="command-search">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            placeholder="去哪儿？输入页面、功能或动作…"
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="command-results">
          {filtered.length === 0 && <div className="command-empty">没有找到，换个词试试。</div>}
          {filtered.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                className={`command-item ${index === selected ? 'selected' : ''}`}
                onMouseEnter={() => setSelected(index)}
                onClick={() => {
                  setOpen(false)
                  item.run()
                }}
              >
                <span className="command-icon">
                  <Icon size={17} />
                </span>
                <span className="command-copy">
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
                <ArrowRight size={14} className="command-arrow" />
              </button>
            )
          })}
        </div>
        <div className="command-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
          <span><kbd>Enter</kbd> 前往</span>
          <span>Bamboo 快速通道</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
