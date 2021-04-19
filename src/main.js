import {createApp} from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import mitt from 'mitt';
import router from './router';
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
    locale: 'fr',
    messages
})
const emitter = mitt();
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(i18n)
app.use(router)
app.use(vuetify)
app.mount('#app')
