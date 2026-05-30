import { toRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DEFAULT_FILTER_VALUE,
  FILTER_TYPES,
  storeKeyMap,
} from '@/composables/filterMaps'
import { useGlobalStore } from '@/store/global'

/**
 * Synchronise les filtres du store avec les query params de l'URL.
 * Les filtres deviennent ainsi partageables, bookmarkables et survivent
 * au rafraichissement de la page. A appeler une seule fois depuis la vue.
 */
export function useFilterUrlSync() {
  const route = useRoute()
  const router = useRouter()
  const global = useGlobalStore()

  const models = FILTER_TYPES.map(type => toRef(global, storeKeyMap[type]))

  // URL -> store : initialisation et navigation arriere/avant
  watch(
    () => route.query,
    (query) => {
      FILTER_TYPES.forEach((type, index) => {
        const value = query[type]
        models[index].value
          = typeof value === 'string' ? value : DEFAULT_FILTER_VALUE
      })
    },
    { immediate: true },
  )

  // store -> URL : refleter les filtres actifs dans les query params
  watch(
    () => models.map(model => model.value),
    (values) => {
      const query = { ...route.query }
      FILTER_TYPES.forEach((type, index) => {
        if (values[index] === DEFAULT_FILTER_VALUE)
          delete query[type]
        else
          query[type] = values[index]
      })
      router.replace({ query })
    },
  )
}
