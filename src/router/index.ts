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
        breadcrumbs: [
          {
            title: 'Contact List',
            disabled: false,
            to: { name: 'contact-list-view' },
          },
          {
            title: 'Add Contact',
            disabled: true,
          },
        ],
      },
    },
    {
      path: '/edit-contact/:id',
      name: 'edit-contact-view',
      component: () => import('@/pages/ContactForm.vue'),
      meta: {
        pageTitle: 'Edit Contact',
        breadcrumbs: [
          {
            title: 'Contact List',
            disabled: false,
            to: { name: 'contact-list-view' },
          },
          {
            title: 'Edit Contact',
            disabled: true,
          },
        ],
      },
    },
    { path: '/', redirect: '/contact-list' },
    { path: '/:pathMatch(.*)*', redirect: '/contact-list' },
  ],
})

export default router
