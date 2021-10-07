import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'

import App from './App.vue'
import store from './store'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
    locale: 'fr',
    messages,
    globalInjection: true,
})

const app = createApp(App)
app.use(i18n)
app.use(store);
app.mount('#app')
