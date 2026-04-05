import type { FilterableProperty } from '@/interfaces/Character'
import { toRef } from 'vue'
import { useGlobalStore } from '@/store/global'

const storeKeyMap: Record<FilterableProperty, `selected${string}`> = {
  gender: 'selectedGender',
  hobby: 'selectedHobby',
  personality: 'selectedPersonality',
  specie: 'selectedSpecie',
}

const pluralMap: Record<FilterableProperty, string> = {
  gender: 'genders',
  hobby: 'hobbies',
  personality: 'personalities',
  specie: 'species',
}

export function useFilter(type: FilterableProperty) {
  const global = useGlobalStore()
  const storeKey = storeKeyMap[type]

  const getPlural = () => pluralMap[type]

  const selectedValue = toRef(global, storeKey)

  const onToggle = (event: Event) => {
    selectedValue.value = (event.target as HTMLInputElement).value
  }

  return {
    getPlural,
    selectedValue,
    onToggle,
  }
}
