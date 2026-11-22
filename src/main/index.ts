import path from 'node:path'
import fs from 'node:fs'
import { app, BrowserWindow, Menu, nativeImage, shell, Tray } from 'electron'
import { getStore } from './store'
import { createServices, ensureDataDirs, registerIpcHandlers, type AppServices } from './ipc'
import { appEvents } from './events'

const isDev = !app.isPackaged
let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let services: AppServices | null = null
let quitting = false
let cleanupDone = false

app.setName('Bamboo')

function isWritableDirectory(dir: string): boolean {
  try {
    fs.mkdirSync(dir, { recursive: true })
    const probe = path.join(dir, `.bamboo-write-${process.pid}`)
    fs.writeFileSync(probe, 'bamboo')
    fs.unlinkSync(probe)
    return true
  } catch {
    return false
  }
}

function resolveUserDataPath(): string {
  const candidates = [
    process.env.BAMBOO_USER_DATA,
    app.isPackaged ? path.join(app.getPath('appData'), 'Bamboo') : path.join(app.getAppPath(), '.bamboo-dev'),
    app.isPackaged ? path.join(path.dirname(process.execPath), 'BambooData') : undefined,
    path.join(app.getPath('temp'), 'BambooData'),
  ].filter(Boolean) as string[]
  for (const candidate of candidates) {
    if (isWritableDirectory(candidate)) return candidate
  }
  return path.join(app.getPath('temp'), 'BambooData')
}

const bambooUserData = resolveUserDataPath()
if (!process.env.BAMBOO_USER_DATA && app.isPackaged && bambooUserData !== path.join(app.getPath('appData'), 'Bamboo')) {
  console.warn('[bamboo] AppData is not writable, using fallback user data directory:', bambooUserData)
}
app.setPath('userData', bambooUserData)
app.setAppUserModelId('com.bamboo.launcher')

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  void app.whenReady().then(start)
}

function iconPath(): string {
  const candidates = [
    path.join(process.resourcesPath, 'icon.png'),
    path.join(process.resourcesPath, 'resources', 'icon.png'),
    path.join(app.getAppPath(), 'resources', 'icon.png'),
    path.join(__dirname, '../../resources/icon.png'),
  ]
  return candidates.find((candidate) => require('node:fs').existsSync(candidate)) ?? candidates[0]
}

async function start(): Promise<void> {
  try {
    const store = await getStore()
    await ensureDataDirs(store)
    services = createServices(store)
    registerIpcHandlers(services)
    createWindow()
    createTrayIfNeeded(store.settings.closeLauncherOnLaunch)

    appEvents.on('game-running', () => {
      const settings = store.settings
      if (settings.closeLauncherOnLaunch && mainWindow) {
        createTrayIfNeeded(true)
        mainWindow.hide()
        return
      }
      if (settings.minimizeOnLaunch && mainWindow) {
        mainWindow.minimize()
      }
    })
  } catch (error) {
    console.error('[bamboo] startup failed', error)
    app.quit()
  }
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1420,
    height: 880,
    minWidth: 1080,
    minHeight: 700,
    show: false,
    frame: false,
    title: 'Bamboo',
    backgroundColor: '#0a1410',
    backgroundMaterial: process.platform === 'win32' ? 'acrylic' : undefined,
    roundedCorners: true,
    icon: iconPath(),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      spellcheck: false,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('maximize', () => {
    if (mainWindow) appEvents.emitBamboo({ type: 'window-state', payload: { maximized: true } })
  })
  mainWindow.on('unmaximize', () => {
    if (mainWindow) appEvents.emitBamboo({ type: 'window-state', payload: { maximized: false } })
  })
  mainWindow.on('close', (event) => {
    if (quitting || cleanupDone) return
    const gameRunning = services?.minecraft
      .getRunning()
      .some((state) => ['running', 'starting', 'preparing', 'downloading'].includes(state.phase))
    if (gameRunning) {
      event.preventDefault()
      createTrayIfNeeded(true)
      mainWindow?.hide()
      tray?.displayBalloon({
        title: 'Bamboo 仍在照看这片竹林',
        content: '游戏结束后可从系统托盘恢复窗口或退出启动器。',
        iconType: 'info',
      })
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) void shell.openExternal(url)
    return { action: 'deny' }
  })
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const current = mainWindow?.webContents.getURL() ?? ''
    if (url !== current) {
      event.preventDefault()
      if (/^https?:\/\//i.test(url)) void shell.openExternal(url)
    }
  })

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  if (isDev) {
    mainWindow.webContents.on('before-input-event', (_event, input) => {
      if (input.key === 'F12' || (input.control && input.shift && input.key.toLowerCase() === 'i')) {
        mainWindow?.webContents.toggleDevTools()
      }
    })
  }

  if (process.env.BAMBOO_CAPTURE) {
    mainWindow.webContents.once('did-finish-load', () => {
      setTimeout(async () => {
        try {
          const image = await mainWindow?.webContents.capturePage()
          if (image && process.env.BAMBOO_CAPTURE) {
            require('node:fs').writeFileSync(process.env.BAMBOO_CAPTURE, image.toPNG())
          }
        } catch (error) {
          console.error('[bamboo] screenshot failed', error)
        }
      }, 4500)
    })
  }
}

function createTrayIfNeeded(enabled: boolean): void {
  if (!enabled || tray) return
  try {
    const image = nativeImage.createFromPath(iconPath())
    tray = new Tray(image.isEmpty() ? nativeImage.createEmpty() : image.resize({ width: 20, height: 20 }))
    tray.setToolTip('Bamboo 启动器')
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: '显示 Bamboo',
          click: () => {
            if (!mainWindow) createWindow()
            mainWindow?.show()
            mainWindow?.focus()
          },
        },
        { type: 'separator' },
        {
          label: '退出',
          click: () => {
            quitting = true
            app.quit()
          },
        },
      ]),
    )
    tray.on('double-click', () => {
      mainWindow?.show()
      mainWindow?.focus()
    })
  } catch (error) {
    console.error('[bamboo] tray failed', error)
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && !tray) app.quit()
})

app.on('activate', () => {
  if (!mainWindow) createWindow()
  else mainWindow.show()
})

app.on('before-quit', (event) => {
  if (cleanupDone) return
  event.preventDefault()
  quitting = true
  const doCleanup = async () => {
    try {
      await services?.network.cleanup()
      await services?.skinBridge.stop()
    } finally {
      cleanupDone = true
      app.quit()
    }
  }
  void doCleanup()
})

process.on('uncaughtException', (error) => {
  console.error('[bamboo] uncaught exception', error)
})
process.on('unhandledRejection', (error) => {
  console.error('[bamboo] unhandled rejection', error)
})
