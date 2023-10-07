import { storeToRefs } from 'pinia'
import { useNotesStore } from '@renderer/store/notes'

export default () => {
  const notesStore = useNotesStore()
  const { saveNote, readNotes } = useNotesStore()
  const { notesCount, notes } = storeToRefs(notesStore)

  return {
    notes,
    notesCount,
    saveNote,
    readNotes
  }
}
