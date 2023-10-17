import { onUnmounted, computed } from 'vue'
import { notesDir } from '@main/constants'

export default () => {
  const ipcRenderer = computed(() => window.electron?.ipcRenderer)

  const invoke = (channel, args) => ipcRenderer.value.invoke(channel, args)

  const newWindow = (path) => ipcRenderer.value.invoke('newWindow', path)

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

  const fetchNotes = async () => {
    try {
      if (!(await invoke('exists', `.${notesDir}/`))) {
        await invoke('mkDir', `.${notesDir}/`)
        return []
      } else {
        let notes = []
        const noteDir = await invoke('readDir', `.${notesDir}/`)

        for (const date of noteDir) {
          const dateDir = await invoke('readDir', `.${notesDir}/${date}/`)

          for (const file of dateDir) {
            if (file) {
              const data = await invoke('readFile', `.${notesDir}/${date}/${file}`)
              notes.push(data)
            }
          }
        }

        return notes
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchNote = async (filePath) => {
    if (!(await invoke('exists', `${notesDir}/${filePath}.json`))) {
      return {}
    } else {
      return await invoke('readFile', `${notesDir}/${filePath}.json`)
    }
  }

  const postNote = async (folder, note = '') => {
    let filePath
    let fullPath = `.${notesDir}`
    if (!(await invoke('exists', fullPath))) {
      await invoke('mkDir', fullPath)
    }
    fullPath = `.${notesDir}/${folder}`
    if (!(await invoke('exists', fullPath))) {
      await invoke('mkDir', fullPath)
      filePath = `${fullPath}/1`
    } else {
      const noteLength = await invoke('readDir', fullPath)
      filePath = `${fullPath}/${(noteLength.length ?? 0) + 1}`
    }

    invoke('saveFile', { path: `${filePath}.json`, data: { filePath: filePath.replace('.', ''), note } })
    return filePath.replace('.', '')
  }

  return {
    invoke,
    send,
    vueListen,
    listen,
    newWindow,
    fetchNotes,
    fetchNote,
    postNote
  }
}
