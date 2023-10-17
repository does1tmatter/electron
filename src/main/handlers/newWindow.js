import { BrowserWindow, screen } from 'electron'
import { is } from '@electron-toolkit/utils'
import noteSettings from '@main/noteSettings'
import { defaultNoteWidth, defaultNoteHeight } from '@main/constants'
import { getRandom } from '@utils'

export default (event, path = '/') => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  const position = {
    x: getRandom(100, width - defaultNoteWidth - 100),
    y: getRandom(30, height / 4)
  }

  if (position.x + defaultNoteWidth > width || position.y + defaultNoteHeight > height) {
    position.x = getRandom(100, width / 6)
    position.y = getRandom(30, height / 4)
  }

  let win = new BrowserWindow({
    ...noteSettings,
    ...position
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', function () {
    win = null
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log(process.env['ELECTRON_RENDERER_URL'] + '/#' + path)
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#' + path)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
