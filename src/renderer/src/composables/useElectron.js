import { onUnmounted, computed } from 'vue'

export default () => {
  const ipcRenderer = computed(() => window.electron?.ipcRenderer)

  const invoke = (channel, args) => ipcRenderer.value.invoke(channel, args)

  const send = (channel, args) => ipcRenderer.value.send(channel, args)

  const vueListen = (channel, callback) => {
    ipcRenderer.value.on(channel, callback)

    onUnmounted(() => {
      ipcRenderer.value.removeListener(channel, callback)
    })
  }

  const listen = (channel, callback) => {
    ipcRenderer.value.on(channel, callback)

    return () => {
      ipcRenderer.value.removeListener(channel, callback)
    }
  }

  return {
    invoke,
    send,
    vueListen,
    listen
  }
}
