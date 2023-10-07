const routes = [
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@renderer/views/404.vue')
  // },
  {
    path: '/',
    name: 'Home',
    component: () => import('@renderer/views/Home.vue')
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: () => import('@renderer/views/Note.vue')
  }
]

export default routes
