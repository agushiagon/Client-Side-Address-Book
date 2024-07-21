import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import type { App } from 'vue'

const options = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: true,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
}

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(Toast, options)
    .use(pinia)
}
