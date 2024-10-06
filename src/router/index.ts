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
    else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Villagers ANCH` || 'Villagers ANCH'
  // Définir ou mettre à jour la description de la page
  let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.head.appendChild(metaDescription)
  }

  metaDescription.setAttribute('content', (to.meta.metaDesc as string) || 'liste villageois, habitants, animaux, voisins disponibles dans le jeu')

  next()
})

export default router
