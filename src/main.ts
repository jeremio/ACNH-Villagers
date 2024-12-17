import App from '@/App.vue'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import router from './router'

// General Font
// import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(createPinia())
app.mount('#app')
