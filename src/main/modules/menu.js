const { Menu, ipcMain, BrowserWindow } = require('electron')
ipcMain.on('context', () => {
  const contextTemplate = [
    {
      label: '剪切',
      role: 'cut'
    },
    {
      label: '复制',
      role: 'copy'
    }
  ]
  const contextMenu = Menu.buildFromTemplate(contextTemplate)
  contextMenu.popup({
    window: BrowserWindow.getFocusedWindow()
  })
})
