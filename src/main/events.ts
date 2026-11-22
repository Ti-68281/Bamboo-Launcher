import { EventEmitter } from 'node:events'
import { BrowserWindow } from 'electron'
import type { BambooEvent } from '../shared/types'

class AppEvents extends EventEmitter {
  emitBamboo(event: BambooEvent): void {
    for (const win of BrowserWindow.getAllWindows()) {
      if (!win.isDestroyed()) win.webContents.send('bamboo:event', event)
    }
  }
}

export const appEvents = new AppEvents()
