import { join } from 'path'
import icon from '../../resources/icon.png?asset'

export default {
  width: 380,
  height: 450,
  minWidth: 200,
  show: false,
  frame: false,
  transparent: true,
  autoHideMenuBar: true,
  titleBarStyle: 'hidden',
  ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    experimentalFeatures: true,
    scrollBounce: process.platform === 'darwin',
    sandbox: false
  }
}
