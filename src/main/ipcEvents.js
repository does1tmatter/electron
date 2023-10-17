import { ipcMain } from 'electron'
import eventHandlers from '@main/handlers'

const registerEventHandlers = () =>
  Object.entries(eventHandlers).forEach(([ipcChannelName, ipcListener]) => {
    ipcMain.handle(ipcChannelName, ipcListener)
  })

export { registerEventHandlers }
