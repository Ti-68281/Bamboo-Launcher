import fs from 'node:fs/promises'
import path from 'node:path'
import AdmZip from 'adm-zip'
import type { InstalledMod } from '../../shared/types'
import { mimeToDataUrl } from '../utils'

export interface JarModInfo {
  modId: string
  name: string
  version: string
  description: string
  authors: string[]
  loaderHint: string
  iconDataUrl?: string
}

const cache = new Map<string, { mtime: number; info: JarModInfo }>()

function stripFormatting(text: string): string {
  return text
    .replace(/§[0-9a-fk-or]/gi, '')
    .replace(/\\n/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function tomlString(section: string, key: string): string {
  const match = section.match(new RegExp(`^\\s*${key}\\s*=\\s*["']([^"']*)["']`, 'm'))
  return match?.[1]?.trim() ?? ''
}

function tomlArray(section: string, key: string): string[] {
  const match = section.match(new RegExp(`^\\s*${key}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'm'))
  if (!match) return []
  return Array.from(match[1].matchAll(/["']([^"']+)["']/g)).map((m) => m[1].trim()).filter(Boolean)
}

function parseToml(text: string): { info: Partial<JarModInfo>; logoFile?: string } {
  const firstMod = text.split(/\[\[mods\]\]/i)[1] ?? text
  const section = firstMod.split(/\[\[/)[0]
  const modId = tomlString(section, 'modId')
  const name = tomlString(section, 'displayName') || modId
  const version = tomlString(section, 'version')
  const description = tomlString(section, 'description')
  const authors = tomlArray(section, 'authors')
  const logoFile = tomlString(section, 'logoFile')
  return {
    info: {
      modId,
      name,
      version,
      description: stripFormatting(description),
      authors,
    },
    logoFile,
  }
}

function readIcon(zip: AdmZip, iconPath: string | undefined): string | undefined {
  if (!iconPath) return undefined
  try {
    const normalized = iconPath.replace(/^\/+/, '')
    const entry = zip.getEntry(normalized) ?? zip.getEntry(normalized.toLowerCase())
    if (!entry || entry.header.size > 512 * 1024) return undefined
    return mimeToDataUrl(entry.getData(), 'image/png')
  } catch {
    return undefined
  }
}

export async function readJarModInfo(jarPath: string): Promise<JarModInfo> {
  const stat = await fs.stat(jarPath)
  const cached = cache.get(jarPath)
  if (cached && cached.mtime === stat.mtimeMs) return cached.info
  const fallback: JarModInfo = {
    modId: '',
    name: path.basename(jarPath).replace(/\.jar(\.disabled)?$/i, ''),
    version: '',
    description: '',
    authors: [],
    loaderHint: 'unknown',
  }
  let info = fallback
  try {
    const zip = new AdmZip(jarPath)
    const fabricEntry = zip.getEntry('fabric.mod.json')
    if (fabricEntry) {
      const json = JSON.parse(fabricEntry.getData().toString('utf8')) as {
        id?: string
        name?: string
        version?: string
        description?: string
        authors?: Array<string | { name?: string }>
        icon?: string | Record<string, string>
        schemaVersion?: number
      }
      const icon = typeof json.icon === 'string' ? json.icon : json.icon?.['128'] ?? json.icon?.['64']
      info = {
        modId: json.id ?? '',
        name: json.name ?? json.id ?? fallback.name,
        version: json.version ?? '',
        description: stripFormatting(json.description ?? ''),
        authors: (json.authors ?? []).map((a) => (typeof a === 'string' ? a : a.name ?? '')).filter(Boolean),
        loaderHint: 'fabric',
        iconDataUrl: readIcon(zip, icon),
      }
    } else {
      const quiltEntry = zip.getEntry('quilt.mod.json')
      const tomlEntry =
        zip.getEntry('META-INF/neoforge.mods.toml') ??
        zip.getEntry('META-INF/mods.toml')
      const mcmodEntry = zip.getEntry('mcmod.info')
      if (quiltEntry) {
        const json = JSON.parse(quiltEntry.getData().toString('utf8')) as {
          quilt_loader?: {
            id?: string
            version?: string
            metadata?: { name?: string; description?: string; contributors?: Record<string, string>; icon?: string | Record<string, string> }
          }
        }
        const meta = json.quilt_loader?.metadata
        const icon = typeof meta?.icon === 'string' ? meta.icon : meta?.icon?.['128']
        info = {
          modId: json.quilt_loader?.id ?? '',
          name: meta?.name ?? json.quilt_loader?.id ?? fallback.name,
          version: json.quilt_loader?.version ?? '',
          description: stripFormatting(meta?.description ?? ''),
          authors: Object.values(meta?.contributors ?? {}).filter(Boolean),
          loaderHint: 'quilt',
          iconDataUrl: readIcon(zip, icon),
        }
      } else if (tomlEntry) {
        const parsed = parseToml(tomlEntry.getData().toString('utf8'))
        info = {
          ...fallback,
          ...parsed.info,
          loaderHint: zip.getEntry('META-INF/neoforge.mods.toml') ? 'neoforge' : 'forge',
          name: parsed.info.name || fallback.name,
          iconDataUrl: readIcon(zip, parsed.logoFile),
        }
      } else if (mcmodEntry) {
        const parsed = JSON.parse(mcmodEntry.getData().toString('utf8')) as
          | Array<Record<string, unknown>>
          | { modList?: Array<Record<string, unknown>> }
        const first = Array.isArray(parsed) ? parsed[0] : parsed.modList?.[0]
        if (first) {
          const authors = Array.isArray(first.authorList)
            ? (first.authorList as string[])
            : String(first.authorList ?? first.author ?? '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
          info = {
            modId: String(first.modid ?? first.modId ?? ''),
            name: String(first.name ?? first.modid ?? fallback.name),
            version: String(first.version ?? ''),
            description: stripFormatting(String(first.description ?? '')),
            authors,
            loaderHint: 'liteloader/forge',
            iconDataUrl: readIcon(zip, first.logoFile ? String(first.logoFile) : undefined),
          }
        }
      } else {
        // LiteLoader metadata
        const liteloaderEntry = zip.getEntry('litemod.json')
        if (liteloaderEntry) {
          const json = JSON.parse(liteloaderEntry.getData().toString('utf8')) as Record<string, unknown>
          info = {
            modId: String(json.name ?? json.modid ?? ''),
            name: String(json.name ?? fallback.name),
            version: String(json.version ?? ''),
            description: stripFormatting(String(json.description ?? '')),
            authors: [String(json.author ?? '')].filter(Boolean),
            loaderHint: 'liteloader',
          }
        }
      }
    }
  } catch {
    info = fallback
  }
  cache.set(jarPath, { mtime: stat.mtimeMs, info })
  return info
}

export async function listInstalledMods(instanceDir: string): Promise<InstalledMod[]> {
  const modsDir = path.join(instanceDir, 'mods')
  let entries
  try {
    entries = await fs.readdir(modsDir, { withFileTypes: true })
  } catch {
    return []
  }
  const results: InstalledMod[] = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!/\.jar(\.disabled)?$/i.test(entry.name)) continue
    const fullPath = path.join(modsDir, entry.name)
    let size = 0
    try {
      size = (await fs.stat(fullPath)).size
    } catch {
      continue
    }
    const info = await readJarModInfo(fullPath).catch(() => null)
    if (!info) continue
    results.push({
      fileName: entry.name,
      path: fullPath,
      name: info.name,
      version: info.version,
      modId: info.modId,
      description: info.description,
      authors: info.authors,
      enabled: !entry.name.toLowerCase().endsWith('.disabled'),
      size,
      iconDataUrl: info.iconDataUrl,
      loaderHint: info.loaderHint,
    })
  }
  return results.sort((a, b) => a.name.localeCompare(b.name))
}
