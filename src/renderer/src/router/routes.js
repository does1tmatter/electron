const routes = [
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@renderer/views/404.vue')
  // },
  {
    path: '/',
    name: 'Home',
    component: () => import('@renderer/views/Note.vue')
  },
  {
    path: '/notes/:date/:id',
    name: 'Note',
    component: () => import('@renderer/views/Note.vue')
  }
]

export default routes
