import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    // Messages de base pour eviter les erreurs de chargement
    en: {
      loading: 'Loading...',
      error: {
        boundaryTitle: 'An error occurred',
        boundaryMessage: 'Please try reloading the page.',
        reload: 'Reload',
        tryRecover: 'Try to recover',
        showDetails: 'Show details',
        hideDetails: 'Hide details',
        technicalDetails: 'Technical details',
        autoRecovery: 'Auto-recovery in {seconds} seconds...',
      },
    },
    fr: {
      loading: 'Chargement...',
      error: {
        boundaryTitle: 'Une erreur est survenue',
        boundaryMessage: 'Veuillez essayer de recharger la page.',
        reload: 'Recharger',
        tryRecover: 'Essayer de recuperer',
        showDetails: 'Afficher les details',
        hideDetails: 'Masquer les details',
        technicalDetails: 'Details techniques',
        autoRecovery: 'Recuperation automatique dans {seconds} secondes...',
      },
    },
  },
})

// Chargement lazy des traductions completes
loadLocaleMessages(i18n.global.locale.value)

function getInitialLocale(): string {
  // Priorite: localStorage > navigateur > defaut
  const stored = localStorage.getItem('app-locale')
  if (stored && ['en', 'fr'].includes(stored)) {
    return stored
  }

  const browserLocale = navigator.language.substring(0, 2)
  return ['en', 'fr'].includes(browserLocale) ? browserLocale : 'fr'
}

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`./locales/${locale}.json`)
    i18n.global.mergeLocaleMessage(locale, messages.default)
  }
  catch (error) {
    console.warn(`Failed to load locale ${locale}:`, error)
  }
}

export async function setLocale(locale: string) {
  if (!['en', 'fr'].includes(locale))
    return

  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale as any
  localStorage.setItem('app-locale', locale)

  document.documentElement.lang = locale
}

export default i18n
