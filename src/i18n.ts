import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

// Les traductions sont integrees au bundle (precompilees par
// @intlify/unplugin-vue-i18n, ~1,3 Ko gzip par langue). Un chargement
// asynchrone apres le montage laissait les cles brutes affichees : t() ne
// suit que la locale, pas l'ajout de messages.
const i18n = createI18n({
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages,
})

document.documentElement.lang = i18n.global.locale.value

function getInitialLocale(): string {
  // Priorite: localStorage > navigateur > defaut
  const stored = localStorage.getItem('app-locale')
  if (stored && ['en', 'fr'].includes(stored)) {
    return stored
  }

  const browserLocale = navigator.language.substring(0, 2)
  return ['en', 'fr'].includes(browserLocale) ? browserLocale : 'fr'
}

export function setLocale(locale: string): void {
  if (!['en', 'fr'].includes(locale))
    return

  i18n.global.locale.value = locale as any
  localStorage.setItem('app-locale', locale)

  document.documentElement.lang = locale
}

export default i18n
