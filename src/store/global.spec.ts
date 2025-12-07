import type { Character } from '@/interfaces/Character'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGlobalStore } from './global'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('global Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockFetch.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      const store = useGlobalStore()

      expect(store.selectedGender).toBe('all')
      expect(store.selectedHobby).toBe('all')
      expect(store.selectedPersonality).toBe('all')
      expect(store.selectedSpecie).toBe('all')
      expect(store.villagers).toEqual([])
      expect(store.fetchError).toBeNull()
    })
  })

  describe('setVillagers', () => {
    it('should fetch and set villagers successfully', async () => {
      const mockVillagers: Character[] = [
        {
          'id': 1,
          'file-name': 'test1',
          'name': { 'name-EUfr': 'Test1', 'name-EUen': 'Test1' },
          'gender': 'Male',
          'birthday-string': 'October 20th',
          'personality': 'Lazy',
          'hobby': 'Music',
          'specie': 'Cat',
        },
        {
          'id': 2,
          'file-name': 'test2',
          'name': { 'name-EUfr': 'Test2', 'name-EUen': 'Test2' },
          'gender': 'Female',
          'birthday-string': 'October 20th',
          'personality': 'Normal',
          'hobby': 'Nature',
          'specie': 'Dog',
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockVillagers,
      })

      const store = useGlobalStore()
      await store.setVillagers()

      expect(store.villagers).toEqual(mockVillagers)
      expect(store.fetchError).toBe(null)
      expect(mockFetch).toHaveBeenCalledWith('/villagers.json')
    })

    it('should handle fetch HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const store = useGlobalStore()
      await store.setVillagers()

      expect(store.fetchError).toContain('Failed to load villagers')
      expect(store.villagers).toEqual([])
    })

    it('should handle invalid data format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'data' }),
      })

      const store = useGlobalStore()
      await store.setVillagers()

      expect(store.fetchError).toContain('Invalid data format')
    })

    it('should handle fetch network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const store = useGlobalStore()
      await store.setVillagers()

      expect(store.fetchError).not.toBeNull()
      expect(store.villagers).toEqual([])
    })
  })

  describe('resetFilters', () => {
    it('should reset all filters to their default values', () => {
      const store = useGlobalStore()
      store.selectedGender = 'Male'
      store.selectedHobby = 'Music'
      store.selectedPersonality = 'Lazy'
      store.selectedSpecie = 'Cat'

      store.resetFilters()

      expect(store.selectedGender).toBe('all')
      expect(store.selectedHobby).toBe('all')
      expect(store.selectedPersonality).toBe('all')
      expect(store.selectedSpecie).toBe('all')
    })
  })

  describe('clearError', () => {
    it('should clear error state', () => {
      const store = useGlobalStore()
      store.fetchError = 'Some error'

      store.clearError()

      expect(store.fetchError).toBe(null)
    })
  })

  describe('filteredVillagers', () => {
    it('should filter villagers by gender', () => {
      const store = useGlobalStore()
      store.villagers = [
        {
          'id': 1,
          'file-name': 'male1',
          'name': { 'name-EUfr': 'Mâle1', 'name-EUen': 'Male1' },
          'gender': 'Male',
          'personality': 'Lazy',
          'hobby': 'Music',
          'specie': 'Cat',
          'birthday-string': '1/1',
        },
        {
          'id': 2,
          'file-name': 'female1',
          'name': { 'name-EUfr': 'Femelle1', 'name-EUen': 'Female1' },
          'gender': 'Female',
          'personality': 'Normal',
          'hobby': 'Nature',
          'specie': 'Dog',
          'birthday-string': '2/2',
        },
        {
          'id': 3,
          'file-name': 'male2',
          'name': { 'name-EUfr': 'Mâle2', 'name-EUen': 'Male2' },
          'gender': 'Male',
          'personality': 'Jock',
          'hobby': 'Fitness',
          'specie': 'Bear',
          'birthday-string': '3/3',
        },
      ]

      store.selectedGender = 'Male'

      expect(store.filteredVillagers).toHaveLength(2)
      expect(store.filteredVillagers.every(v => v.gender === 'Male')).toBe(true)
    })

    it('should filter villagers with multiple filters', () => {
      const store = useGlobalStore()
      store.villagers = [
        {
          'id': 1,
          'file-name': 'raymond',
          'name': { 'name-EUfr': 'Raymond', 'name-EUen': 'Raymond' },
          'gender': 'Male',
          'hobby': 'Music',
          'specie': 'Cat',
          'personality': 'Smug',
          'birthday-string': '1/1',
        },
        {
          'id': 2,
          'file-name': 'monique',
          'name': { 'name-EUfr': 'Monique', 'name-EUen': 'Monique' },
          'gender': 'Female',
          'hobby': 'Fashion',
          'specie': 'Cat',
          'personality': 'Snooty',
          'birthday-string': '2/2',
        },
        {
          'id': 3,
          'file-name': 'tom',
          'name': { 'name-EUfr': 'Tom', 'name-EUen': 'Tom' },
          'gender': 'Male',
          'hobby': 'Music',
          'specie': 'Cat',
          'personality': 'Cranky',
          'birthday-string': '3/3',
        },
        {
          'id': 4,
          'file-name': 'patty',
          'name': { 'name-EUfr': 'Patty', 'name-EUen': 'Patty' },
          'gender': 'Female',
          'hobby': 'Fashion',
          'specie': 'Cow',
          'personality': 'Peppy',
          'birthday-string': '4/4',
        },
      ]

      store.selectedGender = 'Male'
      store.selectedHobby = 'Music'

      expect(store.filteredVillagers).toHaveLength(2)
      expect(store.filteredVillagers[0]?.name['name-EUfr']).toBe('Raymond')
      expect(store.filteredVillagers[1]?.name['name-EUfr']).toBe('Tom')
    })

    it('should return all villagers when no filters are applied', () => {
      const store = useGlobalStore()
      store.villagers = [
        {
          'id': 1,
          'file-name': 'test1',
          'name': { 'name-EUfr': 'Test1', 'name-EUen': 'Test1' },
          'gender': 'Male',
          'personality': 'Lazy',
          'hobby': 'Music',
          'specie': 'Cat',
          'birthday-string': '1/1',
        },
        {
          'id': 2,
          'file-name': 'test2',
          'name': { 'name-EUfr': 'Test2', 'name-EUen': 'Test2' },
          'gender': 'Female',
          'personality': 'Normal',
          'hobby': 'Nature',
          'specie': 'Dog',
          'birthday-string': '2/2',
        },
      ]

      expect(store.filteredVillagers).toHaveLength(2)
    })
  })

  describe('filterStats', () => {
    it('should compute filter statistics correctly', () => {
      const store = useGlobalStore()
      store.villagers = [
        {
          'id': 1,
          'file-name': 'test1',
          'name': { 'name-EUfr': 'Test1', 'name-EUen': 'Test1' },
          'gender': 'Male',
          'personality': 'Lazy',
          'hobby': 'Music',
          'specie': 'Cat',
          'birthday-string': '1/1',
        },
        {
          'id': 2,
          'file-name': 'test2',
          'name': { 'name-EUfr': 'Test2', 'name-EUen': 'Test2' },
          'gender': 'Female',
          'personality': 'Normal',
          'hobby': 'Nature',
          'specie': 'Dog',
          'birthday-string': '2/2',
        },
      ]

      expect(store.filterStats.total).toBe(2)
      expect(store.filterStats.filtered).toBe(2)
      expect(store.filterStats.activeFilters).toEqual([])

      store.selectedGender = 'Male'
      store.selectedHobby = 'Music'

      expect(store.filterStats.filtered).toBe(1)
      expect(store.filterStats.activeFilters).toEqual(['gender', 'hobby'])
    })
  })
})
