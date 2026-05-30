import type { FilterableProperty } from '@/interfaces/Character'
import { toRef } from 'vue'
import { pluralMap, storeKeyMap } from '@/composables/filterMaps'
import { useGlobalStore } from '@/store/global'

export function useFilter(type: FilterableProperty) {
  const global = useGlobalStore()

  const getPlural = () => pluralMap[type]

  const selectedValue = toRef(global, storeKeyMap[type])

  return {
    getPlural,
    selectedValue,
  }
}
