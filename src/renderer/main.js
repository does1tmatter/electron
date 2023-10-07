import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@renderer/assets/css/app.css'
import AppSuspense from '@renderer/AppSuspense.vue'
import router from '@renderer/router'

const app = createApp(AppSuspense)
const store = createPinia()

app.use(router)
app.use(store)

app.mount('#app')
