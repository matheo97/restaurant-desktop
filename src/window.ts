import { BrowserWindow } from 'electron'
import path from 'path'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export const isProduction = process.env.NODE_ENV === 'production'

export const createWindow = (): void => {
  // Create the browser window.
  const icon = path.join(
    __dirname,
    `assets/icons/${
      process.platform === 'darwin' ? 'mac/icons.icns' : 'win/icon.ico'
    }`
  )
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    icon,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
    },
  })
  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  // Open the DevTools.
  if (!isProduction) mainWindow.webContents.openDevTools()
}
