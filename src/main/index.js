'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
const path = require('path')
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
let tray
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
  createMainWin()
  loginWindow.close()
})
// 创建新窗口
function createMainWin () {
  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/#/main`
      : `file://${__dirname}/index.html#/main`
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 863
  })
  mainWindow.loadURL(winURL)
  createTray()
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  require('./modules/menu')
}
function createTray () {
  tray = new Tray(path.join(__static, '/menubar.jpg'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开应用',
      click: () => {
        mainWindow.show()
      }
    },
    { type: 'separator' },
    {
      label: '最小化',
      click: () => {
        mainWindow.hide()
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ]) // ...菜单
  tray.setToolTip('josey做的应用')
  tray.setContextMenu(contextMenu)
  tray.on('right-click', () => {
    // 右键点击
    mainWindow.hide() // 隐藏小窗口
    tray.popUpContextMenu(contextMenu) // 打开菜单
  })
  tray.on('click', () => {
    // 左键点击
    if (process.platform === 'darwin') {
      // 如果是macOS
      // toggleWindow() // 打开或关闭小窗口
    } else {
      // 如果是windows
      // mainWindow.hide() // 隐藏小窗口
      // if (mainWindow === null) { // 如果主窗口不存在就创建一个
      //   createWindow()
      //   mainWindow.show()
      // } else { // 如果主窗口在，就显示并激活
      mainWindow.show()
      mainWindow.focus()
      // }
    }
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
