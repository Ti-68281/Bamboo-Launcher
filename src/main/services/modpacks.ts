import fs from 'node:fs/promises'
import path from 'node:path'
import AdmZip from 'adm-zip'
import type {
  Instance,
  JobProgress,
  LoaderType,
  ModpackInfo,
} from '../../shared/types'
import type { AppStore } from '../store'
import { JobManager, type JobContext } from '../jobs'
import { appEvents } from '../events'
import { MinecraftService } from './minecraft'
import { ModService } from './mods'
import {
  downloadFile,
  ensureDir,
  exists,
  friendlyError,
  isSafeChild,
  mimeToDataUrl,
  newId,
  readJson,
  writeJson,
} from '../utils'

interface ModrinthIndex {
  formatVersion: number
  game: string
  versionId: string
  name: string
  summary?: string
  files: Array<{
    path: string
    hashes: Record<string, string>
    env?: { client?: 'required' | 'optional' | 'unsupported'; server?: string }
    downloads: string[]
    fileSize: number
  }>
  dependencies: Record<string, string>
}

interface CurseForgeManifest {
  minecraft: {
    version: string
    modLoaders: Array<{ id: string; primary: boolean }>
  }
  manifestType: string
  manifestVersion: number
  name: string
  version: string
  author: string
  files: Array<{
    projectID: number
    fileID: number
    required: boolean
  }>
  overrides: string
}

interface MultiMcPack {
  components: Array<{ uid: string; version: string }>
}

export class ModpackService {
  constructor(
    private store: AppStore,
    private jobs: JobManager,
    private minecraft: MinecraftService,
    private mods: ModService,
  ) {}

  async inspect(filePath: string): Promise<ModpackInfo> {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) throw new Error('请选择一个整合包文件。')
    if (stat.size > 2 * 1024 * 1024 * 1024) throw new Error('整合包文件过大（超过 2GB）。')
    const zip = new AdmZip(filePath)
    const entries = new Map(zip.getEntries().map((entry) => [entry.entryName.replace(/\\/g, '/'), entry]))
    const iconEntry = entries.get('icon.png') ?? entries.get('pack.png') ?? entries.get('logo.png')
    let iconDataUrl: string | undefined
    if (iconEntry && iconEntry.header.size < 1024 * 1024) {
      iconDataUrl = mimeToDataUrl(iconEntry.getData(), 'image/png')
    }
    const base = {
      path: filePath,
      name: path.basename(filePath).replace(/\.(zip|mrpack)$/i, ''),
      modCount: 0,
      summary: '',
      iconDataUrl,
    }
    const mrIndex = entries.get('modrinth.index.json')
    if (mrIndex) {
      const index = JSON.parse(mrIndex.getData().toString('utf8')) as ModrinthIndex
      return {
        ...base,
        format: 'modrinth',
        name: index.name || base.name,
        mcVersion: index.dependencies?.minecraft,
        loader: loaderFromModrinthDependencies(index.dependencies ?? {}),
        modCount: index.files.filter((f) => f.env?.client !== 'unsupported').length,
        summary: index.summary ?? 'Modrinth 整合包',
      }
    }
    const cfManifest = entries.get('manifest.json')
    if (cfManifest) {
      const manifest = JSON.parse(cfManifest.getData().toString('utf8')) as CurseForgeManifest
      if (manifest.manifestType === 'minecraftModpack') {
        const loaderId = manifest.minecraft?.modLoaders?.find((m) => m.primary)?.id ?? manifest.minecraft?.modLoaders?.[0]?.id ?? ''
        return {
          ...base,
          format: 'curseforge',
          name: manifest.name || base.name,
          mcVersion: manifest.minecraft?.version,
          loader: loaderFromCurseForge(loaderId),
          modCount: manifest.files?.length ?? 0,
          summary: `${manifest.author ? `作者 ${manifest.author} · ` : ''}CurseForge 整合包 v${manifest.version}`,
        }
      }
    }
    const mmc = entries.get('mmc-pack.json')
    if (mmc) {
      const pack = JSON.parse(mmc.getData().toString('utf8')) as MultiMcPack
      const cfg = entries.get('instance.cfg')?.getData().toString('utf8') ?? ''
      const name = cfg.match(/^name=(.+)$/m)?.[1]?.trim() || base.name
      const mcVersion = pack.components.find((c) => c.uid === 'net.minecraft')?.version
      const loader = loaderFromMultiMc(pack.components)
      const jarCount = Array.from(entries.keys()).filter(
        (key) => /(^|\/)(\.minecraft|minecraft)?\/?mods\/[^/]+\.jar$/i.test(key),
      ).length
      return {
        ...base,
        format: 'multimc',
        name,
        mcVersion,
        loader,
        modCount: jarCount,
        summary: 'MultiMC / Prism 实例包',
      }
    }
    throw new Error('无法识别这个整合包。支持 Modrinth (.mrpack)、CurseForge 和 MultiMC/Prism 格式。')
  }

  async install(filePath: string, instanceName?: string): Promise<JobProgress> {
    const info = await this.inspect(filePath)
    return this.jobs.start('modpack', `安装整合包 ${info.name}`, async (context) => {
      if (!info.mcVersion) throw new Error('整合包没有声明 Minecraft 版本。')
      const loader = info.loader?.type ?? 'vanilla'
      const loaderVersion = info.loader?.version
      context.report(1, '创建实例并安装游戏核心…')
      const instance = await this.minecraft.provisionForModpack(
        info.mcVersion,
        loader,
        loaderVersion,
        instanceName?.trim() || info.name,
        context,
      )
      context.report(72, '游戏环境就绪，开始安装整合包内容…')
      let result: { installed: number; skipped: number; errors: string[] }
      if (info.format === 'modrinth') {
        result = await this.installModrinth(filePath, instance, context)
      } else if (info.format === 'curseforge') {
        result = await this.installCurseForge(filePath, instance, context)
      } else {
        result = await this.installMultiMc(filePath, instance, context)
      }
      if (info.iconDataUrl) instance.icon = info.iconDataUrl
      instance.notes = `由整合包 ${path.basename(filePath)} 安装`
      instance.updatedAt = Date.now()
      await writeJson(path.join(instance.gameDir, 'bamboo-modpack.json'), {
        source: filePath,
        format: info.format,
        name: info.name,
        installedAt: Date.now(),
        installed: result.installed,
        skipped: result.skipped,
      })
      await this.store.save()
      appEvents.emitBamboo({ type: 'instances-changed' })
      context.report(
        100,
        result.skipped
          ? `整合包已安装，${result.skipped} 个文件未能下载（可在实例模组页补齐）。`
          : '整合包安装完成',
      )
      appEvents.emitBamboo({
        type: 'toast',
        payload: {
          kind: result.skipped ? 'warning' : 'success',
          title: result.skipped ? '整合包部分安装' : '整合包安装完成',
          message: result.skipped
            ? `实例「${instance.name}」已创建，${result.skipped} 个文件缺失：${result.errors.slice(0, 2).join('；')}`
            : `实例「${instance.name}」已就绪，共安装 ${result.installed} 个文件。`,
          actionPage: 'instances',
        },
      })
      return {
        instanceId: instance.id,
        installed: result.installed,
        skipped: result.skipped,
        errors: result.errors,
      }
    })
  }

  private async installModrinth(
    filePath: string,
    instance: Instance,
    context: JobContext,
  ): Promise<{ installed: number; skipped: number; errors: string[] }> {
    const zip = new AdmZip(filePath)
    const indexEntry = zip.getEntry('modrinth.index.json')
    if (!indexEntry) throw new Error('缺少 modrinth.index.json。')
    const index = JSON.parse(indexEntry.getData().toString('utf8')) as ModrinthIndex
    const files = index.files.filter((f) => f.env?.client !== 'unsupported')
    let installed = 0
    let skipped = 0
    const errors: string[] = []
    await this.installFilesWithProgress(
      files.map((file) => ({
        path: file.path,
        urls: file.downloads,
        fileName: path.basename(file.path),
      })),
      instance,
      context,
      [73, 92],
      (ok, error, fileName) => {
        if (ok) installed++
        else {
          skipped++
          if (error) errors.push(`${fileName}: ${friendlyError(error)}`)
        }
      },
    )
    context.report(93, '解压整合包配置与资源…')
    const overrides = zip
      .getEntries()
      .filter((e) => e.entryName.startsWith('overrides/') || e.entryName.startsWith('client-overrides/'))
    await this.extractEntries(overrides, instance.gameDir, ['overrides/', 'client-overrides/'])
    this.applyServerOverrides(instance)
    return { installed, skipped, errors }
  }

  private async installCurseForge(
    filePath: string,
    instance: Instance,
    context: JobContext,
  ): Promise<{ installed: number; skipped: number; errors: string[] }> {
    const zip = new AdmZip(filePath)
    const manifestEntry = zip.getEntry('manifest.json')
    if (!manifestEntry) throw new Error('缺少 CurseForge manifest.json。')
    const manifest = JSON.parse(manifestEntry.getData().toString('utf8')) as CurseForgeManifest
    let installed = 0
    let skipped = 0
    const errors: string[] = []
    const entries = manifest.files ?? []
    if (!this.mods.getCurseForgeKey() && entries.length > 0) {
      skipped = entries.length
      errors.push('未配置 CurseForge API Key，模组文件已跳过')
    }
    for (let i = 0; i < entries.length; i++) {
      if (!this.mods.getCurseForgeKey()) break
      const file = entries[i]
      context.report(73 + (i / Math.max(1, entries.length)) * 18, `下载 CurseForge 模组 ${i + 1}/${entries.length}…`)
      try {
        const artifact = await this.mods.getCurseForgeFile(file.projectID, file.fileID)
        const modsDir = path.join(instance.gameDir, 'mods')
        await ensureDir(modsDir)
        const destination = path.join(modsDir, path.basename(artifact.fileName))
        if (!(await exists(destination))) {
          await downloadFile(artifact.downloadUrl, destination, { timeoutMs: 180000 })
        }
        installed++
      } catch (error) {
        skipped++
        if (errors.length < 5) errors.push(friendlyError(error))
        if (errors.length === 1 && /CURSEFORGE_API_KEY_REQUIRED/.test(String(error))) {
          errors[0] = '未配置 CurseForge API Key，模组文件已跳过'
        }
      }
    }
    context.report(92, '解压整合包 overrides…')
    const overrides = zip.getEntries().filter((e) => e.entryName.startsWith(`${manifest.overrides || 'overrides'}/`))
    await this.extractEntries(overrides, instance.gameDir, [`${manifest.overrides || 'overrides'}/`])
    this.applyServerOverrides(instance)
    return { installed, skipped, errors }
  }

  private async installMultiMc(
    filePath: string,
    instance: Instance,
    context: JobContext,
  ): Promise<{ installed: number; skipped: number; errors: string[] }> {
    const zip = new AdmZip(filePath)
    context.report(75, '复制 MultiMC 实例文件…')
    const all = zip.getEntries().filter((entry) => !entry.isDirectory || true)
    const roots = ['.minecraft/', 'minecraft/']
    let extracted = 0
    for (const entry of all) {
      if (entry.isDirectory) continue
      const name = entry.entryName.replace(/\\/g, '/')
      let relative = ''
      if (name.startsWith('.minecraft/')) relative = name.slice('.minecraft/'.length)
      else if (name.startsWith('minecraft/')) relative = name.slice('minecraft/'.length)
      else if (!name.includes('/')) relative = name
      else continue
      if (!relative || relative.startsWith('..')) continue
      const target = path.join(instance.gameDir, relative)
      if (!isSafeChild(instance.gameDir, target)) continue
      await ensureDir(path.dirname(target))
      await fs.writeFile(target, entry.getData())
      extracted++
      if (extracted % 30 === 0) {
        context.report(75 + Math.min(20, (extracted / Math.max(1, all.length)) * 20), '复制实例文件…')
      }
    }
    context.report(96, '整理 MultiMC 实例…')
    return { installed: extracted, skipped: 0, errors: [] }
  }

  private async installFilesWithProgress(
    files: Array<{ path: string; urls: string[]; fileName: string }>,
    instance: Instance,
    context: JobContext,
    range: [number, number],
    onResult: (ok: boolean, error?: unknown, fileName?: string) => void,
  ): Promise<void> {
    let cursor = 0
    let done = 0
    const worker = async () => {
      while (cursor < files.length) {
        const index = cursor++
        const file = files[index]
        try {
          const relative = file.path.replace(/\\/g, '/')
          const target = path.join(instance.gameDir, relative)
          if (!isSafeChild(instance.gameDir, target)) throw new Error('非法文件路径')
          await ensureDir(path.dirname(target))
          if (!(await exists(target))) {
            if (!file.urls.length) throw new Error('没有下载地址')
            await downloadFile(file.urls[0], target, { timeoutMs: 180000 })
          }
          onResult(true, undefined, file.fileName)
        } catch (error) {
          onResult(false, error, file.fileName)
        } finally {
          done++
          context.report(
            range[0] + (done / Math.max(1, files.length)) * (range[1] - range[0]),
            `下载整合包内容 ${done}/${files.length}…`,
          )
        }
      }
    }
    const workers = Array.from({ length: Math.min(5, Math.max(1, files.length)) }, () => worker())
    await Promise.all(workers)
  }

  private async extractEntries(
    entries: AdmZip.IZipEntry[],
    targetRoot: string,
    prefixes: string[],
  ): Promise<void> {
    for (const entry of entries) {
      if (entry.isDirectory) continue
      let relative = entry.entryName.replace(/\\/g, '/')
      for (const prefix of prefixes) {
        if (relative.startsWith(prefix)) {
          relative = relative.slice(prefix.length)
          break
        }
      }
      if (!relative || relative.startsWith('..')) continue
      const target = path.join(targetRoot, relative)
      if (!isSafeChild(targetRoot, target)) continue
      await ensureDir(path.dirname(target))
      await fs.writeFile(target, entry.getData())
    }
  }

  private applyServerOverrides(instance: Instance): void {
    // Server-only overrides are intentionally excluded; client packs should not
    // import level.dat or server.properties from a pack.
    void instance
  }
}

function loaderFromModrinthDependencies(deps: Record<string, string>): {
  type: LoaderType
  version?: string
} {
  if (deps['fabric-loader']) return { type: 'fabric', version: deps['fabric-loader'] }
  if (deps['quilt-loader']) return { type: 'quilt', version: deps['quilt-loader'] }
  if (deps['neoforge']) return { type: 'neoforge', version: deps['neoforge'] }
  if (deps['forge']) return { type: 'forge', version: deps['forge'] }
  return { type: 'vanilla' }
}

function loaderFromCurseForge(id: string): { type: LoaderType; version?: string } {
  const lower = id.toLowerCase()
  const loader = lower.split('-')[0]
  const version = id.slice(loader.length + 1)
  if (loader === 'fabric') return { type: 'fabric', version }
  if (loader === 'quilt') return { type: 'quilt', version }
  if (loader === 'neoforge') return { type: 'neoforge', version }
  if (loader === 'forge') return { type: 'forge', version }
  return { type: 'vanilla' }
}

function loaderFromMultiMc(components: Array<{ uid: string; version: string }>): {
  type: LoaderType
  version?: string
} {
  for (const component of components) {
    switch (component.uid) {
      case 'net.fabricmc.fabric-loader':
        return { type: 'fabric', version: component.version }
      case 'org.quiltmc.quilt-loader':
        return { type: 'quilt', version: component.version }
      case 'net.minecraftforge':
        return { type: 'forge', version: component.version }
      case 'net.neoforged':
        return { type: 'neoforge', version: component.version }
      default:
        break
    }
  }
  return { type: 'vanilla' }
}
