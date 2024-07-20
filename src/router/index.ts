import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home-view',
      component: () => import('@/pages/Home.vue'),
      meta: {
        pageTitle: 'Home',
      },
    },
    { path: '/', redirect: '/home' },
  ],
})

export default router
