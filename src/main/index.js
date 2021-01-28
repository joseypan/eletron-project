'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let loginWindow
let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  loginWindow = new BrowserWindow({
    height: 612,
    useContentSize: true,
    width: 375,
    frame: false,
    maximizable: false
  })
  // loginWindow.webContents.closeDevTools()
  loginWindow.loadURL(winURL)
  loginWindow.setMenu(null)
  loginWindow.on('closed', () => {
    loginWindow = null
  })
  loginWindow.hookWindowMessage(278, () => {
    loginWindow.setEnabled(false)
    setTimeout(() => {
      loginWindow.setEnabled(true)
    }, 100)
    return true
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (loginWindow === null) {
    createWindow()
  }
})

ipcMain.on('userLogin', (e, data) => {
  loginWindow.close()
  createMainWin()
})
// 创建新窗口
function createMainWin () {
  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/#/main`
      : `file://${__dirname}/index.html/#/main`
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 863
  })
  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
