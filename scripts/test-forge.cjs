const { installForge } = require('@xmcl/installer')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')

const core = path.join(os.tmpdir(), 'bamboo-node-install-test')
const java = String.raw`D:\覃思源学习资料\竹启动器\.bamboo-test4\data\java\mojang\jre-legacy\bin\java.exe`

async function main() {
  const xml = await fetch('https://maven.minecraftforge.net/net/minecraftforge/forge/maven-metadata.xml').then((r) => r.text())
  const versions = [...xml.matchAll(/<version>([^<]+)<\/version>/g)]
    .map((m) => m[1])
    .filter((v) => v.startsWith('1.8.9-'))
  console.log('forge versions', versions.length, versions.slice(-5))
  const version = versions.at(-1).slice('1.8.9-'.length)
  const full = `1.8.9-${version}`
  const installerUrl = `https://maven.minecraftforge.net/net/minecraftforge/forge/${full}/forge-${full}-installer.jar`
  console.log('installing forge', version, installerUrl)
  let last = -1
  const id = await installForge(
    { mcversion: '1.8.9', version, installer: { path: installerUrl } },
    core,
    {
      java,
      mavenHost: ['https://maven.minecraftforge.net'],
      librariesDownloadConcurrency: 8,
      progress: undefined,
    },
  )
  console.log('INSTALLED', id)
  const dir = path.join(core, 'versions', id)
  console.log('files', fs.existsSync(dir) ? fs.readdirSync(dir) : 'missing')
}

main().catch((error) => {
  console.error('FAIL', error)
  if (error?.errors) for (const inner of error.errors) console.error('INNER', inner)
  process.exit(1)
})
