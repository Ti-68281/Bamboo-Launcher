import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import os from 'node:os'
import {
  fetchJavaRuntimeManifest,
  installJavaRuntimeTask,
  resolveJava,
} from '@xmcl/installer'
import type { JavaRuntime } from '../../shared/types'
import type { AppStore } from '../store'
import { ensureDir, exists, friendlyError, readJson } from '../utils'

const execFileAsync = promisify(execFile)

interface JavaManifestJson {
  javaVersion?: { majorVersion?: number; component?: string }
  inheritsFrom?: string
  id?: string
}

export class JavaService {
  constructor(private store: AppStore) {}

  private get runtimeRoot(): string {
    return path.join(this.store.paths.java, 'mojang')
  }

  javaExecutable(home: string): string {
    return path.join(home, 'bin', process.platform === 'win32' ? 'java.exe' : 'java')
  }

  async list(scan = false): Promise<JavaRuntime[]> {
    const cached = this.store.state.javaCache.filter(Boolean)
    const verified: JavaRuntime[] = []
    const seen = new Set<string>()
    for (const runtime of cached) {
      const key = path.normalize(runtime.path).toLowerCase()
      if (seen.has(key)) continue
      if (await exists(runtime.path)) {
        seen.add(key)
        verified.push(runtime)
      }
    }
    if (verified.length !== cached.length) {
      this.store.state.javaCache = verified
      await this.store.save()
    }
    if (scan) return this.scan()
    return verified.sort((a, b) => b.majorVersion - a.majorVersion)
  }

  private addCandidate(candidates: Set<string>, value: string | undefined, executable = false) {
    if (!value) return
    const resolved = path.resolve(value.replace(/^"|"$/g, '').trim())
    if (!resolved) return
    candidates.add(executable ? resolved : this.javaExecutable(resolved))
  }

  private async discoverExecutables(): Promise<string[]> {
    const candidates = new Set<string>()
    this.addCandidate(candidates, process.env.JAVA_HOME)
    this.addCandidate(candidates, process.env.JDK_HOME)
    this.addCandidate(candidates, process.env.GRAALVM_HOME)

    try {
      const { stdout } = await execFileAsync('where', ['java'], { windowsHide: true, timeout: 6000 })
      for (const line of stdout.split(/\r?\n/)) {
        if (line.trim().toLowerCase().endsWith('java.exe')) candidates.add(line.trim())
      }
    } catch {
      // `where` is not available on non-Windows or no Java is on PATH.
    }

    const scanRoots = new Set<string>()
    if (process.platform === 'win32') {
      const pf = process.env.ProgramFiles
      const pf86 = process.env['ProgramFiles(x86)']
      const local = process.env.LOCALAPPDATA
      const userProfile = process.env.USERPROFILE
      scanRoots.add(path.join(this.runtimeRoot))
      for (const base of [pf, pf86].filter(Boolean) as string[]) {
        scanRoots.add(path.join(base, 'Java'))
        scanRoots.add(path.join(base, 'Eclipse Adoptium'))
        scanRoots.add(path.join(base, 'Eclipse Foundation'))
        scanRoots.add(path.join(base, 'Microsoft'))
        scanRoots.add(path.join(base, 'Zulu'))
        scanRoots.add(path.join(base, 'BellSoft'))
        scanRoots.add(path.join(base, 'Amazon Corretto'))
        scanRoots.add(path.join(base, 'Semeru'))
        scanRoots.add(path.join(base, 'Common Files', 'Oracle', 'Java'))
      }
      if (local) {
        scanRoots.add(path.join(local, 'Programs', 'Eclipse Adoptium'))
        scanRoots.add(path.join(local, 'Programs', 'Microsoft'))
      }
      if (userProfile) {
        scanRoots.add(path.join(userProfile, '.jdks'))
        scanRoots.add(path.join(userProfile, 'scoop', 'apps'))
      }
    } else if (process.platform === 'darwin') {
      scanRoots.add('/Library/Java/JavaVirtualMachines')
      scanRoots.add(path.join(os.homedir(), 'Library/Java/JavaVirtualMachines'))
    } else {
      scanRoots.add('/usr/lib/jvm')
      scanRoots.add(path.join(os.homedir(), '.jdks'))
    }

    const walk = async (dir: string, depth: number) => {
      if (depth > 3) return
      let entries
      try {
        entries = await fs.readdir(dir, { withFileTypes: true })
      } catch {
        return
      }
      const direct = this.javaExecutable(dir)
      if (await exists(direct)) {
        candidates.add(direct)
        return
      }
      for (const entry of entries) {
        if (!entry.isDirectory()) continue
        const child = path.join(dir, entry.name)
        if (entry.name.toLowerCase() === 'bin' && depth > 0) {
          const exe = path.join(child, process.platform === 'win32' ? 'java.exe' : 'java')
          if (await exists(exe)) candidates.add(exe)
          continue
        }
        await walk(child, depth + 1)
      }
    }

    for (const root of scanRoots) {
      await walk(root, 0)
    }
    return Array.from(candidates)
  }

  async scan(): Promise<JavaRuntime[]> {
    const executables = await this.discoverExecutables()
    const existing = new Map(this.store.state.javaCache.map((j) => [path.normalize(j.path).toLowerCase(), j]))
    const results: JavaRuntime[] = []
    const seen = new Set<string>()
    for (const executable of executables) {
      const key = path.normalize(executable).toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      try {
        const info = await resolveJava(executable)
        if (!info) continue
        const previous = existing.get(key)
        const major = info.majorVersion || Number.parseInt(info.version.split('.')[0], 10) || 0
        results.push({
          id: previous?.id ?? `java_${Buffer.from(executable).toString('base64url').slice(0, 24)}`,
          path: executable,
          version: info.version,
          majorVersion: major,
          vendor: detectVendor(executable, info.version),
          source: previous?.source ?? 'auto',
          architecture: process.arch === 'x64' ? 'x64' : process.arch,
          addedAt: previous?.addedAt ?? Date.now(),
        })
      } catch {
        // Some `java` shims are Windows Store redirects and cannot be inspected.
      }
    }
    results.sort((a, b) => b.majorVersion - a.majorVersion)
    this.store.state.javaCache = results
    await this.store.save()
    return results
  }

  async addManual(javaPath: string): Promise<JavaRuntime[]> {
    const candidate = javaPath.toLowerCase().endsWith('java.exe') || javaPath.endsWith('/java')
      ? javaPath
      : this.javaExecutable(javaPath)
    const info = await resolveJava(candidate)
    if (!info) throw new Error('无法识别这个 Java，请选择 Java 安装目录或 bin/java.exe。')
    const major = info.majorVersion || Number.parseInt(info.version.split('.')[0], 10) || 0
    const normalized = path.normalize(candidate).toLowerCase()
    const existing = this.store.state.javaCache.find((j) => path.normalize(j.path).toLowerCase() === normalized)
    if (existing) {
      existing.source = 'manual'
      existing.version = info.version
      existing.majorVersion = major
    } else {
      this.store.state.javaCache.push({
        id: `java_${Buffer.from(candidate).toString('base64url').slice(0, 24)}`,
        path: candidate,
        version: info.version,
        majorVersion: major,
        vendor: detectVendor(candidate, info.version),
        source: 'manual',
        architecture: process.arch === 'x64' ? 'x64' : process.arch,
        addedAt: Date.now(),
      })
    }
    await this.store.save()
    return this.list(false)
  }

  targetForMajor(major: number): { target: string; expectedMajor: number } {
    if (major >= 25) return { target: 'java-runtime-epsilon', expectedMajor: 25 }
    if (major >= 21) return { target: 'java-runtime-delta', expectedMajor: 21 }
    if (major >= 17) return { target: 'java-runtime-gamma', expectedMajor: 17 }
    if (major >= 16) return { target: 'java-runtime-alpha', expectedMajor: 16 }
    return { target: 'jre-legacy', expectedMajor: 8 }
  }

  async downloadJava(
    major: number,
    onProgress?: (progress: number, total: number, detail: string) => void,
  ): Promise<JavaRuntime> {
    const { target, expectedMajor } = this.targetForMajor(major)
    const destination = path.join(this.runtimeRoot, target)
    const executable = this.javaExecutable(destination)
    if (await exists(executable)) {
      const info = await resolveJava(executable).catch(() => undefined)
      if (info) {
        return this.upsertDownloaded(executable, info.version, info.majorVersion, target)
      }
    }
    onProgress?.(0, 100, '获取 Mojang Java 运行时清单…')
    let manifest
    try {
      manifest = await fetchJavaRuntimeManifest({ target })
    } catch (error) {
      throw new Error(`无法获取 Java ${expectedMajor} 运行时：${friendlyError(error)}`)
    }
    if (!manifest?.files || Object.keys(manifest.files).length === 0) {
      throw new Error(`当前系统没有可用的 Java ${expectedMajor} 官方运行时。`)
    }
    await ensureDir(destination)
    onProgress?.(2, 100, `正在下载 Java ${expectedMajor}…`)
    try {
      const task = installJavaRuntimeTask({ destination, manifest })
      await task.startAndWait({
        onUpdate(task: { progress: number; total: number }) {
          const total = task.total > 0 ? task.total : 0
          if (total > 0) {
            onProgress?.(Math.max(2, Math.min(97, (task.progress / total) * 95 + 2)), 100, `正在下载 Java ${expectedMajor}…`)
          }
        },
      })
    } catch (error) {
      throw new Error(`Java ${expectedMajor} 安装失败：${friendlyError(error)}`)
    }
    if (!(await exists(executable))) {
      throw new Error(`Java 运行时安装完成，但未找到 ${executable}`)
    }
    const info = await resolveJava(executable)
    if (!info) throw new Error('Java 运行时已下载，但无法执行。')
    onProgress?.(100, 100, `Java ${info.majorVersion} 已就绪`)
    return this.upsertDownloaded(executable, info.version, info.majorVersion, target)
  }

  private async upsertDownloaded(
    executable: string,
    version: string,
    major: number,
    target: string,
  ): Promise<JavaRuntime> {
    const normalized = path.normalize(executable).toLowerCase()
    const existing = this.store.state.javaCache.find((j) => path.normalize(j.path).toLowerCase() === normalized)
    const runtime: JavaRuntime = existing ?? {
      id: `java_${target}`,
      path: executable,
      version,
      majorVersion: major,
      vendor: 'Mojang',
      source: 'downloaded',
      architecture: process.arch === 'x64' ? 'x64' : process.arch,
      addedAt: Date.now(),
    }
    runtime.version = version
    runtime.majorVersion = major
    runtime.vendor = 'Mojang'
    runtime.source = 'downloaded'
    if (!existing) this.store.state.javaCache.push(runtime)
    await this.store.save()
    return runtime
  }

  async getJavaMajorForVersion(versionId: string | null): Promise<number> {
    if (!versionId) return 21
    try {
      let current = versionId
      for (let i = 0; i < 6; i++) {
        const file = path.join(this.store.paths.versions, current, `${current}.json`)
        const json = await readJson<JavaManifestJson | null>(file, null)
        if (!json) break
        if (json.javaVersion?.majorVersion) return json.javaVersion.majorVersion
        if (!json.inheritsFrom) break
        current = json.inheritsFrom
      }
    } catch {
      // Fall through to vanilla mapping.
    }
    return this.fallbackMajor(versionId)
  }

  fallbackMajor(mcVersion: string): number {
    const match = mcVersion.match(/^(\d+)\.(\d+)(?:\.(\d+))?/)
    if (!match) return 21
    const major = Number(match[1])
    const minor = Number(match[2])
    const patch = Number(match[3] ?? 0)
    if (major > 1) return 25
    if (minor >= 20 && patch >= 5) return 21
    if (minor >= 18) return 17
    if (minor === 17) return 16
    return 8
  }

  async selectForInstance(
    preferredPath: string | undefined,
    requiredMajor: number,
    autoDownload: boolean,
    onProgress?: (progress: number, total: number, detail: string) => void,
  ): Promise<JavaRuntime> {
    const all = await this.list(false)
    if (preferredPath) {
      const preferred = all.find((j) => path.normalize(j.path).toLowerCase() === path.normalize(preferredPath).toLowerCase())
      if (preferred) return preferred
      if (await exists(preferredPath)) {
        const info = await resolveJava(preferredPath)
        if (info) {
          const runtime: JavaRuntime = {
            id: `java_manual_${Date.now()}`,
            path: preferredPath,
            version: info.version,
            majorVersion: info.majorVersion,
            vendor: detectVendor(preferredPath, info.version),
            source: 'manual',
            architecture: process.arch,
            addedAt: Date.now(),
          }
          this.store.state.javaCache.push(runtime)
          await this.store.save()
          return runtime
        }
      }
    }
    const matching = all
      .filter((j) => j.majorVersion === requiredMajor)
      .sort((a, b) => (a.source === 'downloaded' ? -1 : 0) - (b.source === 'downloaded' ? -1 : 0))
    if (matching[0]) return matching[0]
    const compatible = all
      .filter((j) => j.majorVersion >= requiredMajor && j.majorVersion <= requiredMajor + 8)
      .sort((a, b) => a.majorVersion - b.majorVersion)
    if (compatible[0]) return compatible[0]
    if (!autoDownload) {
      throw new Error(
        `没有找到适配的 Java ${requiredMajor}。请前往「Java 管理」下载或手动添加。`,
      )
    }
    onProgress?.(0, 100, `未找到 Java ${requiredMajor}，准备自动下载…`)
    const downloaded = await this.downloadJava(requiredMajor, onProgress)
    return downloaded
  }
}

function detectVendor(javaPath: string, version: string): string {
  const lower = javaPath.toLowerCase()
  if (lower.includes('adoptium') || lower.includes('temurin')) return 'Eclipse Temurin'
  if (lower.includes('zulu')) return 'Azul Zulu'
  if (lower.includes('corretto') || lower.includes('amazon')) return 'Amazon Corretto'
  if (lower.includes('microsoft')) return 'Microsoft OpenJDK'
  if (lower.includes('graal')) return 'GraalVM'
  if (lower.includes('bellsoft') || lower.includes('liberica')) return 'BellSoft Liberica'
  if (lower.includes('mojang') || lower.includes('java-runtime') || lower.includes('jre-legacy')) return 'Mojang'
  if (/openjdk/i.test(version)) return 'OpenJDK'
  return 'Java'
}
