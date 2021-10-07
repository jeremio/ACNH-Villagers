<template>
  <div class="home">
    <div v-if="info">
      <Filters :data="info"></Filters>
    </div>
    <div v-if="info" style="width: 100%;">
      <Menu></Menu>
      <div>
        <Mosaique :data="datafiltered" v-if="datafiltered.length > 0"></Mosaique>
        <div v-else>Pas de villageois avec ces filtres</div>
      </div>
    </div>
    <div v-else> Pas de contenu</div>
  </div>
</template>

<script setup>
import Mosaique from '../components/Mosaique.vue'
import Filters from '../components/Filters.vue'
import Menu from "../components/menu/Menu.vue"
import infoVillagers from '../assets/villagers.json'
import _filter from 'lodash/filter'
import { useStore } from 'vuex'


import {computed, ref} from 'vue'

const store = useStore()

const info = ref([...infoVillagers])

const selectedGender = computed(() => store.state.selectedGender)
const selectedPersonality = computed(() => store.state.selectedPersonality)
const selectedHobby = computed(() => store.state.selectedHobby)
const selectedSpecies = computed(() => store.state.selectedSpecies)

const datafiltered = computed(() => {
  if (info.value) {
    let array = info.value
    if (selectedGender.value !== 'all') {
      let plop = array
      array = _filter(plop, a => a.gender === selectedGender.value)
    }
    if (selectedPersonality.value !== 'all') {
      let plop2 = array
      array = _filter(plop2, a => a.personality === selectedPersonality.value)
    }
    if (selectedHobby.value !== 'all') {
      let plop3 = array
      array = _filter(plop3, a => a.hobby === selectedHobby.value)
    }
    if (selectedSpecies.value !== 'all') {
      let plop4 = array
      array = _filter(plop4, a => a.species === selectedSpecies.value)
    }
    return array
  }
  return []
})

</script>

<style scoped>

.home {
  display: flex;
  flex-direction: row;
}
</style>
