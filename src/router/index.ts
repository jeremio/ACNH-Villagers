import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Accueil' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = `${to.meta.title as string} | Villagers ANCH`
  else
    document.title = 'Villagers ANCH'

  // Définir ou mettre à jour la description de la page
  let metaDescription = document.querySelector('meta[name="description"]')

  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }

  const description = (to.meta.metaDesc as string) || 'liste villageois, habitants, animaux, voisins disponibles dans le jeu'
  metaDescription.setAttribute('content', description)

  next()
})

// Gestion des erreurs de routage
router.onError((error) => {
  console.error('Router error:', error)

  // Rediriger vers une page d'erreur si nécessaire
  if (error.message.includes('Loading chunk')) {
    window.location.reload()
  }
})

export default router
