import { config } from 'dotenv'
import { app, BrowserWindow } from 'electron'
import { createTray } from './tray'
import { createWindow } from './window'
import './main/axios'
import './updater'

config()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const initialize = (): void => {
  createTray()
  createWindow()
}

app.on('ready', initialize)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on(
  'certificate-error',
  (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault()
    callback(true)
  }
)
