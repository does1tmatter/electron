import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@renderer/router/routes'

import Performance from '@renderer/utils/performance'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/// Routing performance monitoring
var end = null
router.beforeEach((to, from, next) => {
  end = Performance.startExecute(`${from.path} => ${to.path}`)
  next()
  setTimeout(() => end(), 0)
})

export default router
