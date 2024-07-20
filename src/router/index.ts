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
    {
      path: '/add-contact',
      name: 'add-contact-view',
      component: () => import('@/pages/ContactForm.vue'),
      meta: {
        pageTitle: 'Add Contact',
      },
    },
    {
      path: '/edit-contact/:id',
      name: 'hadd-contact-view',
      component: () => import('@/pages/ContactForm.vue'),
      meta: {
        pageTitle: 'Edit Contact',
      },
    },
    { path: '/', redirect: '/home' },
  ],
})

export default router
