<template>
  <v-app>
    <h1 class="title">{{ $t('title') }}</h1>
    <div v-if="info" class="content">
      <Filters :data="info"></Filters>
      <Mosaique :data="datafiltered"></Mosaique>
    </div>
    <div v-else> Pas de contenu</div>
  </v-app>
</template>

<script>
import Mosaique from '../components/Mosaique.vue'
import Filters from '../components/Filters.vue'
import info from '../assets/villagers.json'
import _filter from 'lodash/filter'

export default {
  name: "Home.vue",
  components: {Mosaique, Filters},
  data() {
    return {
      info: info,
      selectedGender: 'all',
      selectedPersonality: 'all',
      selectedHobby: 'all',
      selectedSpecies: 'all'
    }
  },
  computed: {
    datafiltered() {
      let array = this.info
      if (this.selectedGender !== 'all') {
        let plop = array
        array = _filter(plop, a => a.gender === this.selectedGender)
      }
      if (this.selectedPersonality !== 'all') {
        let plop2 = array
        array = _filter(plop2, a => a.personality === this.selectedPersonality)
      }
      if (this.selectedHobby !== 'all') {
        let plop3 = array
        array = _filter(plop3, a => a.hobby === this.selectedHobby)
      }
      if (this.selectedSpecies !== 'all') {
        let plop4 = array
        array = _filter(plop4, a => a.species === this.selectedSpecies)
      }
      return array
    }
  },
  mounted() {
    this.emitter.on("toggle-gender", gender => {
      this.selectedGender = gender
    });
    this.emitter.on("toggle-personality", personality => {
      this.selectedPersonality = personality
    });
    this.emitter.on("toggle-hobby", hobby => {
      this.selectedHobby = hobby
    });
    this.emitter.on("toggle-species", species => {
      this.selectedSpecies = species
    });
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}

.content {
  display: flex;
  flex-direction: row;
}
</style>
