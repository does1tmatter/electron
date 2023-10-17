import { storeToRefs } from 'pinia'
import { useNotesStore } from '@renderer/store/notes'
import useElectron from '@renderer/composables/useElectron'

export default () => {
  const notesStore = useNotesStore()
  const { saveNote, readNotes } = useNotesStore()
  const { notesCount, notes } = storeToRefs(notesStore)
  const { invoke } = useElectron()

  const newWindow = () => {
    invoke('newWindow')
  }

  return {
    notes,
    notesCount,
    saveNote,
    readNotes,
    newWindow
  }
}
