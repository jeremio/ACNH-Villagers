import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import router from './router'

// Import des polices critiques
import 'vfonts/FiraCode.css'
import '@/styles/variables.css'

// Configuration de l'internationalisation avec lazy loading
const i18n = createI18n({
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    // Messages de base pour éviter les erreurs de chargement
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
        tryRecover: 'Essayer de récupérer',
        showDetails: 'Afficher les détails',
        hideDetails: 'Masquer les détails',
        technicalDetails: 'Détails techniques',
        autoRecovery: 'Récupération automatique dans {seconds} secondes...',
      },
    },
  },
})

// Chargement lazy des traductions complètes
loadLocaleMessages(i18n.global.locale.value)

function getInitialLocale(): string {
  // Priorité: localStorage > navigateur > défaut
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

// Fonction pour changer de langue avec chargement lazy
export async function setLocale(locale: string) {
  if (!['en', 'fr'].includes(locale))
    return

  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale as any
  localStorage.setItem('app-locale', locale)

  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = locale
}

// Configuration de l'application
const app = createApp(App)

// Configuration du gestionnaire d'erreur global
app.config.errorHandler = (error, instance, info) => {
  console.error('Global error handler:', error, instance, info)

  // Log vers service externe en production
  if (import.meta.env.PROD) {
    // logErrorToExternalService({ error, instance, info })
  }
}

// Configuration des avertissements en développement
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue warning:', msg, instance, trace)
  }
}

// Installation des plugins
app.use(router)
app.use(i18n)
app.use(createPinia())

// Montage de l'application avec gestion d'erreur
try {
  app.mount('#app')
}
catch (error) {
  console.error('Failed to mount app:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Application Failed to Load</h1>
      <p>Please refresh the page or try again later.</p>
      <button onclick="window.location.reload()">Refresh Page</button>
    </div>
  `
}

// Gestion des erreurs non capturées
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault() // Empêcher l'affichage dans la console du navigateur
})

// Performance monitoring (optionnel)
if (import.meta.env.PROD && 'performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      console.log('App load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms')
    }, 0)
  })
}
