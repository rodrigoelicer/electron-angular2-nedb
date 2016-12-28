import { app, BrowserWindow } from 'electron'

let mainWindow:Electron.BrowserWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600,resizable:false})
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
