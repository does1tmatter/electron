import { BrowserWindow, screen } from 'electron'
import { is } from '@electron-toolkit/utils'
import noteSettings from '@main/noteSettings'
import { defaultNoteWidth, defaultNoteHeight } from '@main/constants'
import { getRandom } from '@utils'

export default (event) => {
  let x = 0
  let y = 0
  if (event?.sender) {
    const parentWindow = BrowserWindow.fromWebContents(event.sender)
    ;[x, y] = parentWindow.getPosition()
    x += defaultNoteWidth + 60
    y += Math.round(defaultNoteHeight / 6)
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    if (x + defaultNoteWidth > width || y + defaultNoteHeight > height) {
      x = 100
      y = getRandom(30, height / 4)
    }
  } else {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    x = width - 500
    y = Math.round((height * 10) / 100)
  }

  let win = new BrowserWindow({
    ...noteSettings,
    x,
    y
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
