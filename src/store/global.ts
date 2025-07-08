import type { Character } from '@/interfaces/Character'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  // State
  const villagers = ref<Character[]>([])
  const selectedGender = ref('all')
  const selectedHobby = ref('all')
  const selectedPersonality = ref('all')
  const selectedSpecie = ref('all')
  const language = ref('fr')
  const fetchError = ref<string | null>(null)

  // Actions
  async function setVillagers() {
    try {
      const response = await fetch('/villagers.json')
      if (!response.ok)
        throw new Error('Network response was not ok')

      const data = await response.json()
      villagers.value = data as Character[]
      fetchError.value = null
    }
    catch (error) {
      fetchError.value = 'There has been a problem with your fetch operation'
      console.error(fetchError.value, error)
    }
  }

  function resetFilters() {
    selectedGender.value = 'all'
    selectedHobby.value = 'all'
    selectedPersonality.value = 'all'
    selectedSpecie.value = 'all'
  }

  // Getters
  const filteredVillagers = computed(() => {
    let array = villagers.value
    if (selectedGender.value !== 'all')
      array = array.filter(item => item.gender === selectedGender.value)

    if (selectedPersonality.value !== 'all')
      array = array.filter(item => item.personality === selectedPersonality.value)

    if (selectedHobby.value !== 'all')
      array = array.filter(item => item.hobby === selectedHobby.value)

    if (selectedSpecie.value !== 'all')
      array = array.filter(item => item.specie === selectedSpecie.value)

    return array
  })

  return {
    // State
    villagers,
    selectedGender,
    selectedPersonality,
    selectedHobby,
    selectedSpecie,
    language,
    fetchError,
    // Actions
    setVillagers,
    resetFilters,
    // Getters
    filteredVillagers,
  }
})
