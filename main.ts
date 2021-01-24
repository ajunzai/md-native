const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const Store = require('electron-store')
//* 主进程初始化，渲染进程才能使用
Store.initRenderer()

let mainWindow
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  const loadUrl = isDev ? 'http://localhost:3000' : ''
  mainWindow.loadURL(loadUrl)
  mainWindow.webContents.openDevTools()
})
