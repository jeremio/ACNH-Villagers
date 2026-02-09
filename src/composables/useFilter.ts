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
  const storeKey = `selected${type.charAt(0).toUpperCase() + type.slice(1)}` as const

  // Utilisation d'un computed pour la synchronisation bidirectionnelle
  const selectedValue = computed({
    get: () => {
      if (storeKey === 'selectedGender')
        return global.selectedGender
      if (storeKey === 'selectedHobby')
        return global.selectedHobby
      if (storeKey === 'selectedPersonality')
        return global.selectedPersonality
      if (storeKey === 'selectedSpecie')
        return global.selectedSpecie
      return 'all'
    },
    set: (value: string) => {
      if (storeKey === 'selectedGender')
        global.selectedGender = value
      else if (storeKey === 'selectedHobby')
        global.selectedHobby = value
      else if (storeKey === 'selectedPersonality')
        global.selectedPersonality = value
      else if (storeKey === 'selectedSpecie')
        global.selectedSpecie = value
    },
  })

  const onToggle = (event: Event) => {
    selectedValue.value = (event.target as HTMLInputElement).value
  }

  return {
    getPlural,
    selectedValue,
    onToggle,
  }
}
