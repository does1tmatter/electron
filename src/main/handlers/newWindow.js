import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import noteSettings from '@main/noteSettings'

export default (event) => {
  const modalPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5173/#/' : `file://${__dirname}/index.html`
  const parentWindow = BrowserWindow.fromWebContents(event.sender)
  const [x, y] = parentWindow.getPosition()

  let win = new BrowserWindow({
    ...noteSettings,
    x: x + 40,
    y: y + 40
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', function () {
    win = null
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
