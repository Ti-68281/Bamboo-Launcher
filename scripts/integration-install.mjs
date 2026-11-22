import { chromium } from 'playwright-core'

const browser = await chromium.connectOverCDP(process.env.CDP_URL ?? 'http://127.0.0.1:9222')
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('file:'))
if (!page) throw new Error('No Electron page')
page.setDefaultTimeout(600000)

await page.evaluate(() => {
  window.__bambooEvents = []
  window.__bambooOff?.()
  window.__bambooOff = window.bamboo.onEvent((event) => {
    window.__bambooEvents.push({ ...event, at: Date.now() })
    if (window.__bambooEvents.length > 300) window.__bambooEvents.splice(0, 100)
  })
})

async function waitJob(jobId, timeoutMs = 480000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const job = await page.evaluate(
      (id) => (window.__bambooEvents || []).filter((e) => e.type === 'job' && e.payload.id === id).at(-1)?.payload,
      jobId,
    )
    if (job && ['success', 'error', 'cancelled'].includes(job.status)) return job
    await page.waitForTimeout(1500)
  }
  throw new Error(`Job ${jobId} timeout`)
}

const before = await page.evaluate(async () => {
  let boot = await window.bamboo.bootstrap()
  if (!boot.accounts.length) {
    await window.bamboo.addOfflineAccount({ name: 'BambooLeaf' })
    boot = await window.bamboo.bootstrap()
  }
  if (!boot.activeAccountId && boot.accounts[0]) {
    await window.bamboo.setActiveAccount(boot.accounts[0].id)
  }
  return {
    accounts: boot.accounts.map((a) => a.name),
    activeAccountId: boot.activeAccountId,
    java: boot.javaCache.length,
  }
})
console.log('BEFORE', before)

console.log('Downloading Java 8...')
const javaJob = await page.evaluate(() => window.bamboo.downloadJava(8))
const javaResult = await waitJob(javaJob.id)
console.log('JAVA_JOB', JSON.stringify(javaResult, null, 2))
const javaList = await page.evaluate(() => window.bamboo.listJava())
console.log('JAVA_LIST', JSON.stringify(javaList.map((j) => ({ major: j.majorVersion, vendor: j.vendor, version: j.version, path: j.path })), null, 2))

console.log('Installing Minecraft 1.8.9...')
const installJob = await page.evaluate(() =>
  window.bamboo.installGame({
    mcVersion: '1.8.9',
    loader: 'vanilla',
    instanceName: 'Smoke 1.8.9',
    createInstance: true,
  }),
)
console.log('INSTALL_JOB', installJob.id)
const installResult = await waitJob(installJob.id)
console.log('INSTALL_RESULT', JSON.stringify(installResult, null, 2))

const bootAfter = await page.evaluate(async () => {
  const boot = await window.bamboo.bootstrap()
  return {
    instances: boot.instances.map((i) => ({
      id: i.id,
      name: i.name,
      versionId: i.versionId,
      mcVersion: i.mcVersion,
      gameDir: i.gameDir,
      accountId: i.accountId,
    })),
    active: boot.activeInstanceId,
    java: boot.javaCache.map((j) => j.majorVersion),
  }
})
console.log('AFTER_INSTALL', JSON.stringify(bootAfter, null, 2))

const target = bootAfter.instances.find((i) => i.name === 'Smoke 1.8.9')
if (target && installResult.status === 'success') {
  console.log('Launching Minecraft 1.8.9...')
  const launchJob = await page.evaluate((id) => window.bamboo.launch(id), target.id)
  console.log('LAUNCH_JOB', launchJob.id)
  const launchResult = await waitJob(launchJob.id, 180000)
  console.log('LAUNCH_RESULT', JSON.stringify(launchResult, null, 2))
  await page.waitForTimeout(18000)
  const events = await page.evaluate(() =>
    (window.__bambooEvents || [])
      .filter((e) => e.type === 'launch' || e.type === 'crash' || e.type === 'toast')
      .slice(-14),
  )
  console.log('EVENTS', JSON.stringify(events, null, 2))
  const running = await page.evaluate(async () => (await window.bamboo.bootstrap()).running)
  console.log('RUNNING', JSON.stringify(running, null, 2))
  try {
    await page.evaluate((id) => window.bamboo.killGame(id), target.id)
    console.log('KILLED')
  } catch (error) {
    console.log('KILL_ERROR', error.message)
  }
  await page.waitForTimeout(3000)
}

const stats = await page.evaluate(async () => {
  const stats = await window.bamboo.getStats()
  return {
    total: stats.totalPlayTimeMs,
    today: stats.todayPlayTimeMs,
    sessions: stats.sessions.length,
    recent: stats.sessions.slice(0, 3),
  }
})
console.log('STATS', JSON.stringify(stats, null, 2))
await browser.close()
