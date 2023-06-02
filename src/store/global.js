import {defineStore} from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('global', () => {
  const selectedGender = ref('all')
  const selectedPersonality = ref('all')
  const selectedHobby = ref('all')
  const selectedSpecies = ref('all')
  const language = ref('fr')

  return {
    selectedGender,
    selectedPersonality,
    selectedHobby,
    selectedSpecies,
    language
  }
})
