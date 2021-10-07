<template>
  <div id="filters">
    <Gender :data="genders"></Gender>
    <Hobby :data="hobbies"></Hobby>
    <Personality :data="personalities"></Personality>
    <Species :data="species"></Species>
  </div>
</template>

<script setup>
import Gender from "./filters/Gender.vue"
import Hobby from "./filters/Hobby.vue"
import Personality from "./filters/Personality.vue"
import Species from "./filters/Species.vue"
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'

import {computed} from 'vue'

const props = defineProps({
  data: Array
})

const genders = computed(() => {
  return _uniq(_map(props.data, 'gender'))
})
const hobbies = computed(() => {
  return _uniq(_map(props.data, 'hobby'))
})
const personalities = computed(() => {
  return _uniq(_map(props.data, 'personality'))
})
const species = computed(() => {
  return _uniq(_map(props.data, 'species'))
})

</script>

<style scoped>
#filters {
  border: thin solid black;
  min-width: 175px;
  background: #60BE8C;
  text-align: start;
  max-height: 95vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

#filters > div {
  margin: 10px 0 15px 10px;
}
</style>
