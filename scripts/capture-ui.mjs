import { chromium } from 'playwright-core'
import fs from 'node:fs/promises'
import path from 'node:path'

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const outDir = path.resolve('docs/screens')
await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch({
  executablePath: edge,
  headless: true,
  args: ['--disable-gpu', '--force-device-scale-factor=1', '--hide-scrollbars'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))

await page.goto('http://127.0.0.1:5180/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await page.screenshot({ path: path.join(outDir, 'home.png') })

const pages = [
  ['实例', 'instances'],
  ['下载', 'downloads'],
  ['模组', 'mods'],
  ['整合包', 'modpacks'],
  ['联机', 'multiplayer'],
  ['皮肤', 'skins'],
  ['统计', 'stats'],
  ['Java', 'java'],
  ['诊断', 'crash'],
  ['设置', 'settings'],
]

for (const [label, file] of pages) {
  const nav = page.locator('.nav-item').filter({ hasText: label }).first()
  try {
    await nav.click({ timeout: 5000 })
    await page.waitForTimeout(700)
    await page.screenshot({ path: path.join(outDir, `${file}.png`) })
    const title = await page.locator('.page-header h1').first().textContent().catch(() => '')
    console.log(`captured ${file}: ${title}`)
  } catch (error) {
    console.log(`failed ${file}: ${error.message}`)
    await page.screenshot({ path: path.join(outDir, `failed-${file}.png`) })
  }
}

// Account modal
await page.locator('.titlebar-account').click()
await page.waitForTimeout(500)
await page.screenshot({ path: path.join(outDir, 'accounts.png') })
await page.keyboard.press('Escape')

// Command palette
await page.keyboard.press('Control+K')
await page.waitForTimeout(450)
await page.screenshot({ path: path.join(outDir, 'command.png') })

console.log('ERRORS:', errors.length)
for (const error of errors.slice(0, 40)) console.log(error)
await browser.close()
