import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(await fsp.readFile(path.join(root, 'package.json'), 'utf8'))
const version = pkg.version
const release = path.join(root, 'release')
const target = path.join(release, 'Bamboo-Portable')
const stage = path.join(root, '.pack', 'app')
const electronDist = path.join(root, 'node_modules', 'electron', 'dist')
const asarCli = path.join(root, 'node_modules', '@electron', 'asar', 'bin', 'asar.mjs')
const sevenZip = path.join(root, 'node_modules', '7zip-bin', 'win', 'x64', '7za.exe')
const rcedit = path.join(root, '.tools', 'winCodeSign', 'rcedit-x64.exe')

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: root, ...options })
  if (result.status !== 0) throw new Error(`${command} failed with ${result.status}`)
}

await fsp.rm(release, { recursive: true, force: true })
await fsp.rm(stage, { recursive: true, force: true })
await fsp.mkdir(target, { recursive: true })
await fsp.mkdir(stage, { recursive: true })

await fsp.cp(electronDist, target, { recursive: true })
await fsp.cp(path.join(root, 'out'), path.join(stage, 'out'), { recursive: true })
await fsp.copyFile(path.join(root, 'package.json'), path.join(stage, 'package.json'))

const asarPath = path.join(target, 'resources', 'app.asar')
run(process.execPath, [asarCli, 'pack', stage, asarPath])

await fsp.rm(path.join(target, 'resources', 'default_app.asar'), { force: true })
await fsp.copyFile(path.join(root, 'resources', 'icon.png'), path.join(target, 'resources', 'icon.png'))
await fsp.copyFile(path.join(root, 'resources', 'PORTABLE-README.txt'), path.join(target, 'README.txt'))
await fsp.rename(path.join(target, 'electron.exe'), path.join(target, 'Bamboo.exe'))

if (fs.existsSync(rcedit)) {
  run(rcedit, [
    path.join(target, 'Bamboo.exe'),
    '--set-icon',
    path.join(root, 'build', 'icon.ico'),
    '--set-version-string',
    'ProductName',
    'Bamboo',
    '--set-version-string',
    'FileDescription',
    'Bamboo Launcher',
    '--set-version-string',
    'CompanyName',
    'Bamboo Launcher',
    '--set-file-version',
    version,
    '--set-product-version',
    version,
  ])
} else {
  console.warn('rcedit not found; executable will keep the Electron icon.')
}

const zip = path.join(release, `Bamboo-Portable-${version}.zip`)
if (fs.existsSync(sevenZip)) {
  run(sevenZip, ['a', '-tzip', '-mx=5', zip, 'Bamboo-Portable'], { cwd: release })
} else {
  console.warn('7zip-bin not found; zip was not created.')
}

const asarSize = (await fsp.stat(asarPath)).size
const zipSize = fs.existsSync(zip) ? (await fsp.stat(zip)).size : 0
console.log(
  JSON.stringify(
    {
      version,
      portable: target,
      zip,
      asarMB: +(asarSize / 1024 / 1024).toFixed(2),
      zipMB: +(zipSize / 1024 / 1024).toFixed(2),
    },
    null,
    2,
  ),
)
