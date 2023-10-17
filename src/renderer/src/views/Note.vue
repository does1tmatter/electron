<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNotes, useElectron} from '@renderer/composables'
import { useTextareaAutosize, useEventBus, useAsyncState } from '@vueuse/core'
import { getDate } from '@utils'

const { textarea, input } = useTextareaAutosize()
const { on: onAppEvent } = useEventBus('app')
const route = useRoute()

const currentNote = ref({})

const { fetchNotes } = useElectron()

const {
  state: notes,
  isLoading: isNotesLoading,
  execute: readNotes
} = useAsyncState(async () => {
  const data = await fetchNotes()
  console.log('data', data)
  return data
}, [], {
  immediate: false,
  resetOnExecute: false,
  onSuccess: (data) => {
    console.debug('onSuccess', data)
  }
})

await readNotes()
if (route.params?.date && route.params?.id) {
  currentNote.value = notes.value.find(n => n.filePath === `/notes/${route.params.date}/${route.params.id}`)
} else {
  if (notes.value.length) {
    currentNote.value = notes.value[0]
  }
}

input.value = currentNote.value?.note
watch(input, (value) => {
  currentNote.value.note = value
})

onAppEvent(async event => await ({
  'read-notes': readNotes
})[event]?.())

console.debug('route params', route.params)
console.debug('current note', currentNote.value)
console.debug('all notes', notes.value)
</script>

<template>
  <div class="flex flex-col justify-between gap-2 h-full">
    <textarea
      ref="textarea"
      v-model="input"
      class="tracking-wide w-full autofocus font-thin bg-transparent text-left focus:outline-none scrollbar resize-none pr-4 text-justify resize-none"
      :placeholder="currentNote?.note ?? 'Empty note'"
    />
    <div class="text-right opacity-30 font-extralight tracking-wide text-xs">
      {{ currentNote?.filePath ?? 'unsaved' }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
.scrollbar::-webkit-scrollbar-corner {
  @apply bg-transparent outline-none border-0;
}
.scrollbar::-webkit-scrollbar {
  @apply bg-transparent w-2 cursor-pointer z-[1000] select-none;
}

.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scrollbar::-webkit-scrollbar-thumb {
  @apply bg-neutral-800 rounded-sm hover:bg-neutral-600 transition-all duration-[1200ms] active:bg-neutral-300;
}
</style>
