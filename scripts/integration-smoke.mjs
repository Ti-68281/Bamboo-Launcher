import { chromium } from 'playwright-core'
import path from 'node:path'

const browser = await chromium.connectOverCDP('http://127.0.0.1:9222')
const contexts = browser.contexts()
const pages = contexts.flatMap((context) => context.pages())
const page = pages.find((item) => item.url().startsWith('file:')) ?? pages[0]
if (!page) throw new Error('No Electron page found')
page.setDefaultTimeout(120000)
console.log('PAGE', page.url())

const result = await page.evaluate(async () => {
  const api = window.bamboo
  const out = {}
  const boot = await api.bootstrap()
  out.initial = {
    accounts: boot.accounts.map((a) => a.name),
    instances: boot.instances.length,
    dataRoot: boot.dataRoot,
    hasCf: boot.hasCurseForgeKey,
  }

  let account = boot.accounts.find((a) => a.type === 'offline')
  if (!account) {
    account = await api.addOfflineAccount({ name: 'BambooLeaf', model: 'slim' })
  }
  out.account = { name: account.name, type: account.type, uuid: account.uuid }
  await api.setActiveAccount(account.id)

  const skinPath = String.raw`D:\覃思源学习资料\竹启动器\src\renderer\src\assets\sample-skin.png`
  const withSkin = await api.saveSkinFromPath(account.id, skinPath, 'slim')
  out.skin = {
    hasSkin: Boolean(withSkin.skin?.dataUrl),
    model: withSkin.skin?.model,
    bytes: withSkin.skin?.dataUrl?.length ?? 0,
  }

  const java = await api.scanJava()
  out.java = java.map((j) => ({
    major: j.majorVersion,
    version: j.version,
    vendor: j.vendor,
    source: j.source,
  }))

  const versions = await api.listVersions()
  out.versions = {
    total: versions.length,
    latestRelease: versions.find((v) => v.type === 'release')?.id,
    firstFive: versions.slice(0, 5).map((v) => `${v.id}:${v.type}:${v.installed}`),
  }

  const loaderVersions = await api.listLoaderVersions('1.20.1', 'fabric')
  out.fabric = {
    count: loaderVersions.length,
    first: loaderVersions[0],
  }

  const search = await api.searchProjects({
    query: 'sodium',
    platform: 'modrinth',
    projectType: 'mod',
    loader: 'fabric',
    gameVersion: '1.21.4',
    limit: 6,
  })
  out.modrinth = {
    total: search.total,
    error: search.error,
    names: search.projects.map((p) => p.name),
  }
  const first = search.projects[0]
  if (first) {
    const projectVersions = await api.getProjectVersions('modrinth', first.id, '1.21.4', 'fabric')
    out.projectVersions = {
      count: projectVersions.length,
      first: projectVersions[0]
        ? {
            version: projectVersions[0].versionNumber,
            file: projectVersions[0].fileName,
            hasUrl: Boolean(projectVersions[0].downloadUrl),
            dependencies: projectVersions[0].dependencies.length,
          }
        : null,
    }
  }

  const cf = await api.searchProjects({
    query: 'jei',
    platform: 'curseforge',
    projectType: 'mod',
    loader: 'forge',
    gameVersion: '1.20.1',
  })
  out.curseforge = { needsApiKey: cf.needsApiKey, error: cf.error }

  const network = await api.getNetworkInfo()
  out.network = {
    hostname: network.hostname,
    ips: network.localIps,
    primary: network.primaryIp,
  }

  const settings = await api.updateSettings({ downloadConcurrency: 12 })
  out.settings = { concurrency: settings.downloadConcurrency }

  const boot2 = await api.bootstrap()
  out.after = {
    accounts: boot2.accounts.map((a) => a.name),
    activeAccount: boot2.activeAccountId,
  }
  return out
})

console.log(JSON.stringify(result, null, 2))
await browser.close()
