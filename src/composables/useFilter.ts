import type { Ref } from 'vue'
import { ref } from 'vue'
import { useGlobalStore } from '@/store/global'

type FilterType = 'gender' | 'hobby' | 'personality' | 'specie'

interface GlobalStoreType {
  selectedGender: Ref<string>
  selectedHobby: Ref<string>
  selectedPersonality: Ref<string>
  selectedSpecie: Ref<string>
}

const plurals: Record<FilterType, string> = {
  gender: 'genders',
  hobby: 'hobbies',
  personality: 'personalities',
  specie: 'species',
}

export function useFilter(type: FilterType) {
  const global = useGlobalStore()

  const getPlural = () => `${plurals[type]}`

  const key = `selected${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof GlobalStoreType

  const selectedValue = ref('all')

  const onToggle = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    selectedValue.value = value
    // Update the global store
    global[key] = value
  }

  return {
    getPlural,
    selectedValue,
    onToggle,
  }
}
