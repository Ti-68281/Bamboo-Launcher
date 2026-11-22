import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Publish the working tree to GitHub through the REST Git Data API.
 * Requires a token with Contents: Read and write (classic scope: repo).
 *
 * Usage:
 *   $env:GH_TOKEN = 'github_pat_...'
 *   node scripts/publish-github.mjs
 */

const OWNER = 'Ti-68281'
const REPO = 'Bamboo-Launcher'
const BRANCH = 'main'
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN

if (!TOKEN) {
  console.error('Missing GH_TOKEN (fine-grained token with Contents read/write).')
  process.exit(1)
}

const root = path.resolve(import.meta.dirname, '..')
const EXCLUDED_DIRS = new Set([
  '.git',
  '.tools',
  '.pnpm-store',
  'node_modules',
  'out',
  'release',
  'docs/evidence',
  '.pack',
])
const EXCLUDED_FILES = new Set([
  '.site-home.html',
  '.github-tree.json',
  '.github-device.json',
  '.github-token',
  '.curlrc-bamboo',
  '.release-upload-url.txt',
])

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${TOKEN}`,
      'User-Agent': 'Bamboo-Launcher-Publisher',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {}),
    },
  })
  const text = await response.text()
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${url} -> ${response.status}: ${text.slice(0, 500)}`)
  }
  return text ? JSON.parse(text) : null
}

function shouldInclude(relative) {
  const normalized = relative.replaceAll('\\', '/')
  if (EXCLUDED_FILES.has(normalized)) return false
  if (normalized.endsWith('.log')) return false
  for (const dir of EXCLUDED_DIRS) {
    if (normalized === dir || normalized.startsWith(`${dir}/`)) return false
  }
  return true
}

async function walk(directory, base = '') {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const relative = base ? `${base}/${entry.name}` : entry.name
    if (!shouldInclude(relative)) continue
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full, relative)))
    else if (entry.isFile()) files.push({ full, relative })
  }
  return files
}

async function main() {
  const files = await walk(root)
  console.log(`publishing ${files.length} files to ${OWNER}/${REPO}@${BRANCH}`)

  const ref = await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`)
  const baseCommit = await api(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/commits/${ref.object.sha}`,
  )
  const baseTree = baseCommit.tree.sha

  const tree = []
  let index = 0
  for (const file of files) {
    const buffer = await fs.readFile(file.full)
    const blob = await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/blobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: buffer.toString('base64'), encoding: 'base64' }),
    })
    tree.push({ path: file.relative, mode: '100644', type: 'blob', sha: blob.sha })
    index += 1
    if (index % 20 === 0 || index === files.length) console.log(`  blobs ${index}/${files.length}`)
  }

  const newTree = await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base_tree: baseTree, tree }),
  })
  const commit = await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Release Bamboo Launcher v1.0.1',
      tree: newTree.sha,
      parents: [ref.object.sha],
    }),
  })
  await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sha: commit.sha, force: false }),
  })
  console.log(`published ${commit.html_url}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
