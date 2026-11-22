import { chromium } from 'playwright-core'
import path from 'node:path'

const browser = await chromium.connectOverCDP(process.env.CDP_URL ?? 'http://127.0.0.1:9227')
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('file:'))
if (!page) throw new Error('no packaged page')
page.setDefaultTimeout(120000)
await page.evaluate(() => {
  window.__skinEvents = []
  window.__skinOff?.()
  window.__skinOff = window.bamboo.onEvent((event) => window.__skinEvents.push(event))
})
const skinPath = path.resolve('src/renderer/src/assets/sample-skin.png')
const result = await page.evaluate(async (skinPathArg) => {
  const api = window.bamboo
  const boot = await api.bootstrap()
  const account = boot.accounts.find((a) => a.name === 'BambooLeaf')
  if (!account) throw new Error('BambooLeaf missing')
  await api.setActiveAccount(account.id)
  const withSkin = await api.saveSkinFromPath(account.id, skinPathArg, 'slim')
  let instance = boot.instances.find((i) => i.name === 'Skin Bridge Test')
  if (!instance) {
    instance = await api.createInstance({
      name: 'Skin Bridge Test',
      mcVersion: '1.8.9',
      loader: 'vanilla',
      loaderVersion: '',
    })
  }
  await api.updateInstance(instance.id, { offlineSkin: true, accountId: account.id })
  const job = await api.launch(instance.id)
  return {
    account: { id: withSkin.id, name: withSkin.name, hasSkin: Boolean(withSkin.skin?.dataUrl), model: withSkin.skin?.model },
    instance: { id: instance.id, name: instance.name },
    jobId: job.id,
  }
}, skinPath)
console.log(JSON.stringify(result, null, 2))
for (let i = 0; i < 60; i++) {
  await page.waitForTimeout(1000)
  const running = await page.evaluate(async () => (await window.bamboo.bootstrap()).running)
  if (running.some((x) => x.phase === 'running' || x.phase === 'crashed' || x.phase === 'error')) {
    console.log('RUNNING', JSON.stringify(running, null, 2))
    break
  }
}
const events = await page.evaluate(() =>
  window.__skinEvents.filter((e) => e.type === 'launch' || e.type === 'toast').slice(-12),
)
console.log('EVENTS', JSON.stringify(events, null, 2))
await browser.close()
