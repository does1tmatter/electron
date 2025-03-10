import fs from 'fs'
import { ipcMain, BrowserWindow, app } from 'electron'
import { notesDir } from '@main/constants'
import newWindow from './newWindow'

const eventHandlers = {
  mkDir: (event, path) => fs.mkdirSync(path),
  exists: (event, path) => fs.existsSync(path),
  readDir: (event, path) => (fs.existsSync(path) ? fs.readdirSync(path) : []),
  readFile: (event, path) => {
    if (!path.startsWith('.')) {
      path = `.${path}`
    }

    if (fs.existsSync(path)) {
      return JSON.parse(Buffer.from(fs.readFileSync(path)).toString())
    } else {
      return {}
    }
  },
  saveFile: (event, { path, data }) => {
    if (!path.startsWith('.')) {
      path = `.${path}`
    }

    const folders = path.split('/').filter((x) => Boolean(x) && !x.includes('.'))

    folders.reduce((acc, folder) => {
      if (!fs.existsSync(`${acc}/${folder}`)) {
        fs.mkdirSync(`${acc}/${folder}`)
      }
      return `${acc}/${folder}`
    }, '.')

    fs.writeFileSync(path, typeof data === 'string' ? data : JSON.stringify(data, null, 2))
  },
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
