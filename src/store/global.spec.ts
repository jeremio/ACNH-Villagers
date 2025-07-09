import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGlobalStore } from './global'

// Mocking fetch
globalThis.fetch = vi.fn()

describe('global Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with correct default values', () => {
    const store = useGlobalStore()
    expect(store.selectedGender).toBe('all')
    expect(store.selectedHobby).toBe('all')
    expect(store.selectedPersonality).toBe('all')
    expect(store.selectedSpecie).toBe('all')
    expect(store.villagers).toEqual([])
    expect(store.fetchError).toBeNull()
  })

  it('resets filters to their default values', () => {
    const store = useGlobalStore()
    // Modify state
    store.selectedGender = 'Male'
    store.selectedSpecie = 'Cat'

    // Reset
    store.resetFilters()

    // Assert
    expect(store.selectedGender).toBe('all')
    expect(store.selectedHobby).toBe('all')
    expect(store.selectedPersonality).toBe('all')
    expect(store.selectedSpecie).toBe('all')
  })

  it('handles fetch error correctly', async () => {
    const store = useGlobalStore()
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    await store.setVillagers()

    expect(store.fetchError).not.toBeNull()
    expect(store.villagers).toEqual([])
  })

  it('filters villagers with multiple filters', () => {
    const store = useGlobalStore()
    store.villagers = [
      { id: 1, name: { 'name-EUfr': 'Raymond' }, gender: 'Male', hobby: 'Music', specie: 'Cat', personality: 'Smug' },
      { id: 2, name: { 'name-EUfr': 'Monique' }, gender: 'Female', hobby: 'Fashion', specie: 'Cat', personality: 'Snooty' },
      { id: 3, name: { 'name-EUfr': 'Tom' }, gender: 'Male', hobby: 'Music', specie: 'Cat', personality: 'Cranky' },
      { id: 4, name: { 'name-EUfr': 'Patty' }, gender: 'Female', hobby: 'Fashion', specie: 'Cow', personality: 'Peppy' },
    ] as any

    store.selectedGender = 'Male'
    store.selectedHobby = 'Music'

    expect(store.filteredVillagers.length).toBe(2)
    expect(store.filteredVillagers[0].name['name-EUfr']).toBe('Raymond')
    expect(store.filteredVillagers[1].name['name-EUfr']).toBe('Tom')
  })
})
