import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import i18n from '@/i18n'
import router from './router'

// Import des polices critiques
import 'vfonts/FiraCode.css'
import '@/styles/variables.css'

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

// Configuration des avertissements en developpement
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

// Gestion des erreurs non capturees
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})
