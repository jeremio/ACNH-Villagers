import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

type MessageSchema = typeof en

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n<[MessageSchema], 'en' | 'fr'>({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      fr,
    },
  })

  vueApp.use(i18n)
})
