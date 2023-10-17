import { computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useElectron } from '@renderer/composables'
import { getDate } from '@utils'

export default () => {
  const { fetchNote, fetchNotes, postNote } = useElectron()

  const saveNote = async (date = getDate(), note = '') => await postNote(date, note)

  const {
    state: notes,
    isLoading: isNotesLoading,
    execute: readNotes
  } = useAsyncState(() => fetchNotes(), [], {
    immediate: false,
    resetOnExecute: false,
    onSuccess: (data) => {
      console.debug('onSuccess', data)
    }
  })

  const {
    state: note,
    isLoading: isNoteLoading,
    execute: readNote
  } = useAsyncState((path) => fetchNote(path), [], {
    immediate: false,
    resetOnExecute: false
  })

  const noteCount = computed(() => notes.value.length)

  return {
    notes,
    noteCount,
    isNotesLoading,
    readNotes,
    note,
    isNoteLoading,
    readNote,
    saveNote
  }
}
