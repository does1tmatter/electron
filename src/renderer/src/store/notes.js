import { defineStore } from 'pinia'
import { ref, unref, computed } from 'vue'
import useElectron from '@renderer/composables/useElectron'

export const useNotesStore = defineStore('notesStore', () => {
  const notes = ref([])
  const noteCount = computed(() => notes.value.length)
  const notesDir = './notes'

  const { invoke } = useElectron()

  const saveNote = async (folder, note) => {
    let filename
    if (!(await invoke('exists', notesDir))) {
      await invoke('mkDir', notesDir)
    }
    const fullPath = `${notesDir}/${folder}`
    if (!(await invoke('exists', fullPath))) {
      await invoke('mkDir', fullPath)
      filename = `${fullPath}/1.json`
    } else {
      const noteLength = await invoke('readDir', fullPath)
      filename = `${fullPath}/${noteLength.length + 1}.json`
    }
    notes.value.push({ filename, note })
    invoke('saveFile', { path: filename, data: JSON.stringify(unref(notes)) })
  }

  const readNotes = async () => {
    if (!(await invoke('exists', notesDir))) {
      await invoke('mkDir', notesDir)
    } else {
      const dir = await invoke('readDir', notesDir)
      dir.forEach(async (date) => {
        const dateDir = await invoke('readDir', `${notesDir}/${date}/`)
        dateDir.forEach(async (file) => {
          const data = await invoke('readFile', `${notesDir}/${date}/${file}`)
          notes.value.push(...data)
        })
      })
    }
  }

  return {
    noteCount,
    notesDir,
    notes,
    saveNote,
    readNotes
  }
})
