import type { FilterableProperty } from '@/interfaces/Character'
import { computed } from 'vue'
import { useGlobalStore } from '@/store/global'

export function useFilter(type: FilterableProperty) {
  const global = useGlobalStore()

  const pluralMap: Record<FilterableProperty, string> = {
    gender: 'genders',
    hobby: 'hobbies',
    personality: 'personalities',
    specie: 'species',
  }

  const getPlural = () => pluralMap[type]

  // Création de la clé pour accéder au store global
  const storeKey = `selected${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof global

  // Utilisation d'un computed pour la synchronisation bidirectionnelle
  const selectedValue = computed({
    get: () => global[storeKey] as string,
    set: (value: string) => {
      (global[storeKey] as any) = value
    },
  })

  const onToggle = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    selectedValue.value = value
  }

  return {
    getPlural,
    selectedValue,
    onToggle,
  }
}
