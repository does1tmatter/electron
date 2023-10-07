<script setup>
import { computed, onMounted } from 'vue'
import TitleBar from '@renderer/components/TitleBar.vue'
import useNotes from '@renderer/composables/useNotes'

const { readNotes, notes } = useNotes()

onMounted(async () => {
  await readNotes()
})
</script>

<template>
  <div
    class="min-h-screen relative bg-black opacity-50 text-white/90 rounded-md hover:bg-black/80 hover:opacity-100 transition-opacity transition-colors duration-500"
  >
    <div class="absolute top-0 right-0 w-full z-20">
      <TitleBar />
    </div>
    <div class="w-full absolute top-0 right-0 h-full pt-8 pb-2 pl-4 pr-2 z-10">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </div>
</template>
