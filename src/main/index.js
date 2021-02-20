'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu, Notification } from 'electron'
// 注意这个autoUpdater不是electron中的autoUpdater
import { autoUpdater } from 'electron-updater'
const path = require('path')
function updateHandle () {
  let uploadUrl = 'http://192.168.18.160:8080/file/download/'
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不需要更新'
  }
  // const os = require('os')
  let not1 = new Notification({
    title: '进入方法',
    body: '进入方法'
  })
  not1.show()
  autoUpdater.autoDownload = false
  autoUpdater.setFeedURL(uploadUrl)
  autoUpdater
    .checkForUpdates()
    .then(res => {
      let not2 = new Notification({
        title: res,
        body: '成功'
      })
      not2.show()
    })
    .catch(err => {
      let not4 = new Notification({
        title: err,
        body: '失败'
      })
      not4.show()
    })
  autoUpdater.on('error', () => {
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking)
  })
  autoUpdater.on('update-available', () => {
    let not3 = new Notification({
      title: '有更新文件',
      body: '有更新文件'
    })
    not3.show()
    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available', () => {
    sendUpdateMessage(message.updateNotAva)
  })
  autoUpdater.on('download-progress', progressObj => {
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on(
    'update-downloaded',
    (
      event,
      releaseNotes,
      releaseName,
      releaseDate,
      updateUrl,
      quitAndUpdate
    ) => {
      ipcMain.on('isUpdateNow', (e, arg) => {
        console.log(e, arg)
        alert('开始更新')
        autoUpdater.quitAndInstall()
      })
      mainWindow.webContents.send('isUpdateNow')
    }
  )
  // ipcMain.on('checkForUpdate', () => {
  //   autoUpdater.checkForUpdates()
  // })
}
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage (text) {
  mainWindow.webContents.send('message', text)
}
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
app.on('ready', updateHandle)

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
