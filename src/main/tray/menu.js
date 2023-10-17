import { Menu } from 'electron'
import { newWindow } from '@main/handlers'

export default Menu.buildFromTemplate([
  { label: 'New Note', type: 'normal', click: newWindow },
  { label: 'Normal', type: 'normal' },
  { label: 'Radio', type: 'radio' },
  { label: 'Separator', type: 'separator' },
  { label: 'Checkbox', type: 'checkbox' }
])
