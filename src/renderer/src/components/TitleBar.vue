<script setup>
import { ref } from 'vue'
import getDate from '@renderer/utils/getDate'
import TitleIcon from '@renderer/components/TitleIcon.vue'
import useNotes from '@renderer/composables/useNotes'
import useElectron from '@renderer/composables/useElectron'

const { invoke } = useElectron()
const { saveNote, newWindow } = useNotes()

const isNotMac = ref(import.meta.env.platform !== 'darwin')
const IsWeb = ref(import.meta.env.BUILD_TARGET)

const onMinimize = () => invoke('windowMini')
const onClose = () => invoke('windowClose')

const onSave = async () => {
  // const data = 'bobr kurwa ky bydle'
  // saveNote(getDate(), data)
  newWindow()
}
</script>

<template>
  <template v-if="isNotMac && !IsWeb">
    <div class="flex">
      <div class="w-full min-h-full titlebar" />
      <div class="flex gap-2 items-center justify-end w-full">
        <TitleIcon icon="ri:chat-new-line" @click="onSave" />
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
