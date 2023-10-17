<script setup>
import { ref } from 'vue'
import { getDate } from '@utils'
import { useElectron, useNotes } from '@renderer/composables'
import TitleIcon from '@renderer/components/TitleIcon.vue'
import { useEventBus } from '@vueuse/core'

const { saveNote } = useNotes()
const { invoke, newWindow } = useElectron()
const { emit } = useEventBus('app')

const isNotMac = ref(import.meta.env.platform !== 'darwin')
const IsWeb = ref(import.meta.env.BUILD_TARGET)

const onMinimize = () => invoke('windowMini')
const onClose = () => invoke('windowClose')

const onNewNote = async () => {
  try {
    const notePath = await saveNote(getDate(), 'New note')
    emit('read-notes')
    newWindow(notePath)
  } catch (error) {
    console.debug('error', error)
  }
}
</script>

<template>
  <template v-if="isNotMac && !IsWeb">
    <div class="flex">
      <div class="w-full min-h-full titlebar" />
      <div class="flex gap-2 items-center justify-end w-full">
        <TitleIcon icon="ri:chat-new-line" @click="onNewNote" />
        <TitleIcon icon="solar:minimize-square-3-outline" @click="onMinimize" />
        <TitleIcon icon="material-symbols:tab-close-outline" @click="onClose" />
      </div>
    </div>
  </template>
</template>

<style>
.titlebar {
  -webkit-app-region: drag;
}
</style>
