<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['icon', 'alt'])
</script>

<template>
  <button :alt="alt" class="outline-none focus:outline focus:outline-neutral-400/20 hover:bg-neutral-900 focus:bg-neutral-900 active:bg-neutral-800/70 transition-all py-1.5 px-4 rounded-b-sm">
    <Icon :icon="icon" class="w-4.5 text-white" />
  </button>
</template>