import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    selectedGender: 'all',
    selectedPersonality: 'all',
    selectedHobby: 'all',
    selectedSpecies: 'all',
    language: 'fr',
  }),
})
