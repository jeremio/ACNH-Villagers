import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

// General Font
// import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

// then it works

import messages from '@intlify/unplugin-vue-i18n/messages'
import App from './App.vue'

const i18n = createI18n({
  locale: 'fr',
  messages,
  globalInjection: true,
})

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.mount('#app')
