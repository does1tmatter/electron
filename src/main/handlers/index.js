import fs from 'fs'
import { ipcMain, BrowserWindow, app } from 'electron'
import newWindow from './newWindow'

const eventHandlers = {
  mkDir: (event, path) => fs.mkdirSync(path),
  exists: (event, path) => fs.existsSync(path),
  readDir: (event, path) => (fs.existsSync(path) ? fs.readdirSync(path) : []),
  readFile: (event, path) => JSON.parse(Buffer.from(fs.readFileSync(path)).toString()),
  saveFile: (event, { path, data }) => fs.writeFileSync(path, data),
  windowClose: (event) => BrowserWindow.fromWebContents(event.sender)?.close(),
  windowMini: (event) => BrowserWindow.fromWebContents(event.sender)?.minimize(),
  windowMaximize: (event) => BrowserWindow.fromWebContents(event.sender)?.maximize(),
  windowUnmaximize: (event) => BrowserWindow.fromWebContents(event.sender)?.unmaximize(),
  windowIsMaximized: (event) => BrowserWindow.fromWebContents(event.sender)?.isMaximized(),
  appClose: () => app.quit(),
  newWindow
}

const registerEventHandlers = () =>
  Object.entries(eventHandlers).forEach(([ipcChannelName, ipcListener]) => {
    ipcMain.handle(ipcChannelName, ipcListener)
  })

export { registerEventHandlers, newWindow }
export default eventHandlers
