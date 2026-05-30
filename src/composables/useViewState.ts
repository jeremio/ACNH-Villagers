import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGlobalStore } from '@/store/global'

export type ViewState
  = 'loading' | 'error' | 'noData' | 'emptyFilters' | 'success'

/**
 * Derive l'etat d'affichage de la page a partir du store global :
 * chargement, erreur, absence de donnees, filtres sans resultat, succes.
 */
export function useViewState() {
  const store = useGlobalStore()
  const { villagers, filteredVillagers, fetchError, loading } = storeToRefs(store)

  const viewState = computed<ViewState>(() => {
    if (loading.value)
      return 'loading'
    if (fetchError.value)
      return 'error'
    // Fetch reussi mais aucune donnee retournee
    if (villagers.value.length === 0)
      return 'noData'
    // Donnees presentes mais aucun resultat ne correspond aux filtres
    if (filteredVillagers.value.length === 0)
      return 'emptyFilters'
    return 'success'
  })

  return { viewState }
}
