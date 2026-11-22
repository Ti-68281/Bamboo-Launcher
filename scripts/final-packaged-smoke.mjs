import { chromium } from 'playwright-core'
import path from 'node:path'

const browser = await chromium.connectOverCDP(process.env.CDP_URL ?? 'http://127.0.0.1:9229')
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('file:'))
if (!page) throw new Error('no packaged page')
page.setDefaultTimeout(120000)

const result = await page.evaluate(async (modpackPath) => {
  const api = window.bamboo
  let boot = await api.bootstrap()
  const pack = await api.inspectModpack(modpackPath)
  const network = await api.getNetworkInfo()
  const search = await api.searchProjects({
    query: 'fabric api',
    platform: 'modrinth',
    projectType: 'mod',
    loader: 'fabric',
    gameVersion: '1.20.1',
    limit: 3,
  })
  return {
    dataRoot: boot.dataRoot,
    settingsTheme: boot.settings.theme,
    accounts: boot.accounts.length,
    instances: boot.instances.length,
    modpack: {
      name: pack.name,
      format: pack.format,
      mcVersion: pack.mcVersion,
      loader: pack.loader,
      modCount: pack.modCount,
    },
    network: { hostname: network.hostname, primaryIp: network.primaryIp },
    modrinth: { total: search.total, names: search.projects.map((p) => p.name), error: search.error },
  }
}, path.resolve('.test-artifacts/BambooTest.mrpack'))
console.log(JSON.stringify(result, null, 2))

await page.evaluate(async () => {
  const boot = await window.bamboo.bootstrap()
  await window.bamboo.updateSettings({ features: { ...boot.settings.features, mods: false } })
})
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
const modNavAfterHide = await page.locator('.nav-item').filter({ hasText: '模组' }).count()
console.log('mods nav count after hide:', modNavAfterHide)
await page.evaluate(async () => {
  const boot = await window.bamboo.bootstrap()
  await window.bamboo.updateSettings({ features: { ...boot.settings.features, mods: true } })
})
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1400)
const modNavAfterRestore = await page.locator('.nav-item').filter({ hasText: '模组' }).count()
console.log('mods nav count after restore:', modNavAfterRestore)
await page.screenshot({ path: 'docs/screens/packaged-final.png' })
await browser.close()
