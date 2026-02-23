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
  const loading = ref(false)

  // Actions
  async function setVillagers() {
    try {
      loading.value = true
      fetchError.value = null
      const response = await fetch('/villagers.json')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validation basique des données
      if (!Array.isArray(data)) {
        throw new TypeError('Invalid data format: expected array')
      }

      villagers.value = data as Character[]
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      fetchError.value = `Failed to load villagers: ${errorMessage}`
      console.error('Fetch error:', error)
    }
    finally {
      loading.value = false
    }
  }

  function resetFilters() {
    selectedGender.value = 'all'
    selectedHobby.value = 'all'
    selectedPersonality.value = 'all'
    selectedSpecie.value = 'all'
  }

  function clearError() {
    fetchError.value = null
  }

  // Getters - Version optimisée avec un seul passage
  const filteredVillagers = computed(() => {
    if (!villagers.value.length)
      return []

    return villagers.value.filter((character) => {
      // Vérification de tous les filtres en une seule passe
      return (selectedGender.value === 'all' || character.gender === selectedGender.value)
        && (selectedPersonality.value === 'all' || character.personality === selectedPersonality.value)
        && (selectedHobby.value === 'all' || character.hobby === selectedHobby.value)
        && (selectedSpecie.value === 'all' || character.specie === selectedSpecie.value)
    })
  })

  // Getter pour les statistiques (optionnel, pour debug/info)
  const filterStats = computed(() => ({
    total: villagers.value.length,
    filtered: filteredVillagers.value.length,
    activeFilters: [
      selectedGender.value !== 'all' ? 'gender' : null,
      selectedPersonality.value !== 'all' ? 'personality' : null,
      selectedHobby.value !== 'all' ? 'hobby' : null,
      selectedSpecie.value !== 'all' ? 'specie' : null,
    ].filter(Boolean),
  }))

  return {
    // State
    villagers,
    selectedGender,
    selectedPersonality,
    selectedHobby,
    selectedSpecie,
    language,
    fetchError,
    loading,
    // Actions
    setVillagers,
    resetFilters,
    clearError,
    // Getters
    filteredVillagers,
    filterStats,
  }
})
