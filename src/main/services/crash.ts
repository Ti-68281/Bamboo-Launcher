import fs from 'node:fs/promises'
import path from 'node:path'
import type { CrashAnalysis, Instance } from '../../shared/types'
import type { AppStore } from '../store'
import { listInstalledMods } from './modMetadata'
import { exists } from '../utils'

interface Rule {
  test: RegExp
  severity: CrashAnalysis['severity']
  reason: string
  suggestions: string[]
}

const RULES: Rule[] = [
  {
    test: /java\.lang\.OutOfMemoryError|Java heap space|GC overhead limit exceeded/i,
    severity: 'high',
    reason: '游戏内存不足（Java 堆溢出）',
    suggestions: [
      '在实例设置中提高最大内存（建议 4096–8192 MB）。',
      '关闭占用内存较大的光影或材质包。',
      '确保使用的是 64 位 Java，并且系统物理内存充足。',
    ],
  },
  {
    test: /UnsupportedClassVersionError|class file version \d+/i,
    severity: 'high',
    reason: 'Java 版本与游戏或模组不兼容',
    suggestions: [
      '在「Java 管理」中为该实例选择与 Minecraft 版本匹配的 Java。',
      '1.17–1.17.1 使用 Java 16，1.18–1.20.4 使用 Java 17，1.20.5+ 使用 Java 21，1.16.5 及更早使用 Java 8。',
    ],
  },
  {
    test: /Missing or unsupported mandatory dependencies|requires .* which is missing|Missing dependency/i,
    severity: 'high',
    reason: '缺少模组必需的前置依赖',
    suggestions: [
      '自动检测到的缺失依赖通常是 Fabric API、Architectury API、Cloth Config 等。',
      '在模组页安装缺失前置，并确保它们的游戏版本与加载器一致。',
      '如果刚更新过模组，请回退到整合包作者指定的版本。',
    ],
  },
  {
    test: /Incompatible mod set|incompatible mods|ModResolutionException|mixin.*apply|Mixin apply failed/i,
    severity: 'high',
    reason: '模组之间或模组与加载器版本不兼容',
    suggestions: [
      '先备份存档，然后逐批禁用最近添加的模组，定位冲突源。',
      '检查崩溃堆栈中出现的模组，更新到该 Minecraft 版本对应的版本。',
      '确认 Forge / Fabric 加载器版本与模组要求一致。',
    ],
  },
  {
    test: /java\.lang\.NoSuchMethodError|java\.lang\.NoClassDefFoundError|java\.lang\.ClassNotFoundException/i,
    severity: 'high',
    reason: '模组版本错配或缺少运行库',
    suggestions: [
      '这通常表示某个模组用了不存在的类或方法，常由版本混用引起。',
      '检查最近更新的模组，并为其安装对应游戏版本的版本。',
      '若为 Forge，确认没有把 Fabric 模组放入 mods 文件夹。',
    ],
  },
  {
    test: /Duplicate mods|duplicate mod|already registered|DuplicateModsFoundException/i,
    severity: 'medium',
    reason: 'mods 文件夹中存在重复模组',
    suggestions: [
      '删除文件名带 (1)、(2) 或重复 mod id 的模组文件。',
      '保留一个版本，并清理旧版本残留的 .jar.disabled 文件。',
    ],
  },
  {
    test: /GLFW error|OpenGL|Pixel format|Failed to create window|LWJGL|WGL/i,
    severity: 'medium',
    reason: '图形驱动或窗口创建失败',
    suggestions: [
      '更新显卡驱动，优先安装显卡厂商提供的正式版驱动。',
      '关闭光影和 OptiFine 的快速渲染，尝试降低分辨率。',
      '笔记本双显卡用户请强制 Java 使用独立显卡。',
    ],
  },
  {
    test: /AccessDeniedException|Access is denied|The process cannot access the file|Read-only file system/i,
    severity: 'medium',
    reason: '文件访问被拒绝',
    suggestions: [
      '关闭占用游戏文件夹的杀毒软件/同步盘，或把游戏目录加入白名单。',
      '避免把实例放在受保护的系统目录中。',
      '以普通用户权限重新启动 Bamboo。',
    ],
  },
  {
    test: /java\.lang\.StackOverflowError|Ticking (entity|block)|Exception in server tick loop|Unexpected error/i,
    severity: 'medium',
    reason: '游戏逻辑异常或特定实体/方块导致崩溃',
    suggestions: [
      '查看 likelyMods 中列出的模组，尝试禁用其中最近添加的模组。',
      '如果崩溃发生在进入特定世界时，先备份存档再新建世界测试。',
      '将崩溃报告与模组列表反馈给模组作者。',
    ],
  },
  {
    test: /Pixel format not accelerated|Could not initialize class org\.lwjgl/i,
    severity: 'medium',
    reason: '显卡不支持所需的 OpenGL 功能',
    suggestions: [
      '更新显卡驱动，并确认没有禁用硬件加速。',
      '较老显卡可尝试 Minecraft 1.12.2 + Forge + OptiFine。',
    ],
  },
]

export class CrashService {
  constructor(private store: AppStore) {}

  async findLatestReport(instance: Instance): Promise<string | undefined> {
    const roots = [
      path.join(instance.gameDir, 'crash-reports'),
      path.join(this.store.paths.shared, 'crash-reports'),
    ]
    const candidates: Array<{ file: string; mtime: number }> = []
    for (const root of roots) {
      let names
      try {
        names = await fs.readdir(root)
      } catch {
        continue
      }
      for (const name of names) {
        if (!/^crash-.*\.txt$/i.test(name)) continue
        const file = path.join(root, name)
        const stat = await fs.stat(file).catch(() => null)
        if (stat) candidates.push({ file, mtime: stat.mtimeMs })
      }
    }
    return candidates.sort((a, b) => b.mtime - a.mtime)[0]?.file
  }

  async analyze(
    instanceId?: string,
    crashPath?: string,
    exitCode?: number | null,
  ): Promise<CrashAnalysis | null> {
    const instance =
      (instanceId ? this.store.getInstance(instanceId) : undefined) ??
      this.store.activeInstance ??
      this.store.instances[0]
    if (!instance) throw new Error('还没有可分析的实例。')
    let reportPath = crashPath
    if (!reportPath) reportPath = await this.findLatestReport(instance)
    let logPath: string | undefined
    for (const candidate of [
      path.join(instance.gameDir, 'logs', 'latest.log'),
      path.join(this.store.paths.shared, 'logs', 'latest.log'),
    ]) {
      if (await exists(candidate)) {
        logPath = candidate
        break
      }
    }
    const sourcePath = reportPath ?? logPath
    if (!sourcePath) {
      throw new Error('没有找到崩溃报告或 latest.log。请先启动一次游戏，或确认实例目录是否正确。')
    }
    const stat = await fs.stat(sourcePath)
    const id = `crash_${stat.mtimeMs}_${Buffer.from(sourcePath).toString('base64url').slice(-10)}`
    const existing = this.store.state.crashes.find((c) => c.id === id)
    if (existing) return existing

    let content = ''
    try {
      const raw = await fs.readFile(sourcePath, 'utf8')
      content = raw.slice(0, 1_500_000)
    } catch (error) {
      throw new Error(`无法读取崩溃文件：${error instanceof Error ? error.message : String(error)}`)
    }
    const isReport = Boolean(reportPath)
    const rule = RULES.find((r) => r.test.test(content))
    const exception = extractException(content)
    const likelyMods = await this.findLikelyMods(instance, content)
    const descriptionLine = content.match(/Description:\s*([^\r\n]+)/i)?.[1]?.trim()
    const actualReason = rule?.reason ?? (isReport ? '游戏发生了未归类的崩溃' : '游戏异常退出，未生成崩溃报告')
    const summaryParts = [
      descriptionLine ? `崩溃描述：${descriptionLine}` : '',
      exception ? `异常：${truncate(exception, 180)}` : '',
      likelyMods.length
        ? `可能相关的模组：${likelyMods.map((m) => m.name).join('、')}`
        : '未能在堆栈中定位到明确的模组文件。',
    ].filter(Boolean)
    const suggestions = [
      ...(rule?.suggestions ?? [
        '先查看完整崩溃报告中的 Description 与 Caused by 段落，它们通常最接近根因。',
        '禁用最近添加的模组，再逐个启用，以定位冲突源。',
        '如果问题出现在更新后，尝试回退游戏版本或模组版本。',
      ]),
    ]
    if (likelyMods.length) {
      suggestions.push(`优先检查这些模组：${likelyMods.map((m) => m.name).join('、')}。`)
    }
    if (!isReport) {
      suggestions.push('这次没有生成 crash-report，请确认游戏在退出前完整写入了日志，并尝试关闭占用日志文件的程序。')
    }
    const analysis: CrashAnalysis = {
      id,
      instanceId: instance.id,
      instanceName: instance.name,
      createdAt: Date.now(),
      severity: rule?.severity ?? (isReport ? 'medium' : 'low'),
      reason: actualReason,
      summary: summaryParts.join('\n'),
      likelyMods,
      suggestions: Array.from(new Set(suggestions)),
      exception: exception || undefined,
      reportPath: sourcePath,
      logExcerpt: buildExcerpt(content),
      exitCode: exitCode ?? null,
    }
    this.store.state.crashes.unshift(analysis)
    this.store.state.crashes = this.store.state.crashes.slice(0, 30)
    await this.store.save()
    return analysis
  }

  private async findLikelyMods(
    instance: Instance,
    content: string,
  ): Promise<Array<{ name: string; id?: string; fileName?: string }>> {
    const mods = await listInstalledMods(instance.gameDir)
    const lower = content.toLowerCase()
    const matched: Array<{ name: string; id?: string; fileName?: string }> = []
    for (const mod of mods) {
      const normalized = mod.fileName.replace(/\.jar(\.disabled)?$/i, '').toLowerCase()
      const nameToken = mod.name.toLowerCase()
      const idToken = mod.modId.toLowerCase()
      let hit = false
      if (mod.fileName && lower.includes(mod.fileName.toLowerCase())) hit = true
      if (!hit && idToken.length >= 3 && lower.includes(idToken)) hit = true
      if (!hit && nameToken.length >= 4 && lower.includes(nameToken)) hit = true
      if (!hit && normalized.length >= 5 && lower.includes(normalized.split('-').slice(0, 2).join('-'))) {
        // Package names often share the first tokens with the jar file name.
        hit = true
      }
      if (hit) matched.push({ name: mod.name, id: mod.modId || undefined, fileName: mod.fileName })
      if (matched.length >= 6) break
    }
    return matched
  }

  list(): CrashAnalysis[] {
    return this.store.state.crashes
  }

  async clear(): Promise<void> {
    this.store.state.crashes = []
    await this.store.save()
  }
}

function extractException(content: string): string {
  const lines = content.split(/\r?\n/)
  const preferred = lines.find(
    (line) =>
      /(?:^|\s)(?:[a-zA-Z_$][\w$]*\.)+[A-Za-z_$][\w$]*(?:Exception|Error)(?::|$)/.test(line.trim()) &&
      !/Description:/.test(line),
  )
  return (preferred ?? lines.find((line) => /Caused by:/.test(line)) ?? '').trim()
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text
}

function buildExcerpt(content: string): string {
  const lines = content.split(/\r?\n/)
  const important: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^(Description:|Caused by:|--+ .* --+$|\s+at )/.test(line) || /Exception|Error/.test(line)) {
      important.push(line)
    }
    if (important.length > 80) break
  }
  return important.slice(0, 80).join('\n')
}
