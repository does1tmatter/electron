import { app, shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { registerEventHandlers } from '@main/handlers'
import noteSettings from '@main/noteSettings'
import trayInit from '@main/tray'
import { newWindow } from '@main/handlers'

let loadWindow
function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    ...noteSettings,
    x: width - 500,
    y: Math.round((height * 10) / 100)
  })

  registerEventHandlers()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    loadWindow.destroy()
    mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    // shell.openExternal(details.url)
    // newWindow(details.url, query)
    const { url } = details
    console.log({ url })
    if (url.startsWith('dynamic://page')) {
      // Parse parameters from the URL
      const urlParams = new URL(url)
      const date = urlParams.searchParams.get('date')
      const id = urlParams.searchParams.get('id')

      // Construct the dynamic URL
      const dynamicURL = `/notes/${date}/${id}`
      console.log({ dynamicURL })
      // Create a new BrowserWindow for the dynamic URL
      newWindow(dynamicURL)

      return { action: 'allow', overrideBrowserWindow: true }
    }
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loadWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/loader.html`)
  } else {
    loadWindow.loadFile(join(__dirname, '../renderer/loader.html'))
  }

  trayInit()
  loadWindow.show()
  loadWindow.setAlwaysOnTop(true)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  setTimeout(() => {
    createWindow()
  }, 1500)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
