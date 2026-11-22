import fs from 'node:fs/promises'
import path from 'node:path'

const OWNER = 'Ti-68281'
const REPO = 'Bamboo-Launcher'
const TAG = 'v1.0.1'
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN

if (!TOKEN) {
  console.error('Missing GH_TOKEN (fine-grained token with Contents read/write).')
  process.exit(1)
}

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
    if (response.status === 404) return null
    throw new Error(`${options.method ?? 'GET'} ${url} -> ${response.status}: ${text.slice(0, 500)}`)
  }
  return text ? JSON.parse(text) : null
}

async function main() {
  const root = path.resolve(import.meta.dirname, '..')
  const zipPath = path.join(root, 'release', 'Bamboo-Portable-1.0.1.zip')
  const notes = await fs.readFile(path.join(root, 'docs', 'RELEASE-1.0.1.md'), 'utf8')
  const stat = await fs.stat(zipPath)

  let release = await api(`https://api.github.com/repos/${OWNER}/${REPO}/releases/tags/${TAG}`)
  if (!release) {
    const ref = await api(`https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/main`)
    release = await api(`https://api.github.com/repos/${OWNER}/${REPO}/releases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag_name: TAG,
        target_commitish: ref.object.sha,
        name: 'Bamboo 1.0.1',
        body: notes,
        draft: false,
        prerelease: false,
      }),
    })
    console.log(`release created: ${release.html_url}`)
  } else {
    console.log(`release exists: ${release.html_url}`)
  }

  const existing = (release.assets ?? []).find((asset) => asset.name === path.basename(zipPath))
  if (existing) {
    console.log(`asset exists: ${existing.browser_download_url}`)
    return
  }

  console.log(`uploading ${path.basename(zipPath)} (${(stat.size / 1024 / 1024).toFixed(1)} MB)…`)
  const uploadUrl = release.upload_url.replace('{?name,label}', '')
  const asset = await api(
    `${uploadUrl}?name=${encodeURIComponent(path.basename(zipPath))}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/zip' },
      body: await fs.readFile(zipPath),
    },
  )
  console.log(`asset uploaded: ${asset.browser_download_url}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
