import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contact-list',
      name: 'contact-list-view',
      component: () => import('@/pages/ContactList.vue'),
      meta: {
        pageTitle: 'Contact List',
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
      name: 'edit-contact-view',
      component: () => import('@/pages/ContactForm.vue'),
      meta: {
        pageTitle: 'Edit Contact',
      },
    },
    { path: '/', redirect: '/contact-list' },
  ],
})

export default router
