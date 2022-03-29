import { app, nativeImage, BrowserWindow, Tray, Menu, dialog } from 'electron'
import path from 'path'
import { createWindow } from './window'

let tray: Tray = null

export const createTray = () => {
  const icon = path.join(__dirname, '/assets/logos/logo.png')
  const trayicon = nativeImage.createFromPath(icon)
  if (!tray) tray = new Tray(trayicon.resize({ width: 16 }))
  const items: Record<string, unknown>[] = [
    {
      label: 'Open',
      click: () => {
        const windows = BrowserWindow.getAllWindows()
        if (windows.length === 0) {
          createWindow()
        } else {
          windows[0].show()
        }
      },
    },
    {
      label: 'Quit',
      click: () => {
        dialog
          .showMessageBox({
            type: 'warning',
            title: 'Do you really want to quit?',
            buttons: ['Yes', 'No'],
            message: 'Do you really want to quit?',
          })
          .then(({ response }) => {
            if (response === 0) {
              app.quit()
            }
          })
      },
    },
  ]

  const contextMenu = Menu.buildFromTemplate(items)
  tray.setContextMenu(contextMenu)
}
