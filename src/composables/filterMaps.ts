import type { FilterableProperty } from '@/interfaces/Character'

// Cle de l'etat correspondante dans le store global
export const storeKeyMap: Record<FilterableProperty, `selected${string}`> = {
  gender: 'selectedGender',
  hobby: 'selectedHobby',
  personality: 'selectedPersonality',
  specie: 'selectedSpecie',
}

// Cle i18n au pluriel utilisee pour les libelles
export const pluralMap: Record<FilterableProperty, string> = {
  gender: 'genders',
  hobby: 'hobbies',
  personality: 'personalities',
  specie: 'species',
}

export const FILTER_TYPES = Object.keys(storeKeyMap) as FilterableProperty[]

// Valeur signifiant "aucun filtre" (absente de l'URL)
export const DEFAULT_FILTER_VALUE = 'all'
