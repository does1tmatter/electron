export function DesktopMsg (option) {
  const msgfunc = new window.Notification(option.title, option)
  return new Promise((resolve) => {
    msgfunc.onclick = () => {
      resolve(true)
    }
  })
}
