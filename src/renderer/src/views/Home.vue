<script setup>
import { ref } from 'vue'
import useNotes from '@renderer/composables/useNotes'
import { useTextareaAutosize } from '@vueuse/core'
import getDate from '@renderer/utils/getDate'

const { notes } = useNotes()
const { textarea, input } = useTextareaAutosize()

const currentNote = ref(notes.value?.[0] ?? { filename: `./notes/${getDate()}/1.json`, note: '' })

const edit = ref(false)
const onEdit = () => {
  edit.value = !edit.value
}

input.value = currentNote.value.note ?? null
const message =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, est aliquam ducimus voluptatem maiores eos molestiae doloremque iure itaque, amet hic! Beatae velit tempora ipsa saepe. Doloribus excepturi qui sapiente!'
</script>

<template>
  <div class="flex flex-col justify-between gap-2 h-full">
    <textarea
      ref="textarea"
      v-model="input"
      class="tracking-wide w-full autofocus font-thin bg-transparent text-left focus:outline-none scrollbar resize-none pr-4 text-justify resize-none"
      :placeholder="message"
      :class="{ 'select-none': edit }"
    />
    <div class="text-right opacity-30 font-extralight tracking-wide text-xs">
      {{ currentNote.filename }}
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
