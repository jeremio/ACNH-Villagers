<template>
  <NSpace>
    <Gender :data="genders" />
    <Hobby :data="hobbies" />
    <Personality :data="personalities" />
    <Specy :data="species" />
  </NSpace>
</template>

<script setup>
import { NSpace } from 'naive-ui'
import { computed } from 'vue'
import Gender from './filters/Gender.vue'
import Hobby from './filters/Hobby.vue'
import Personality from './filters/Personality.vue'
import Specy from './filters/Specy.vue'

const props = defineProps({
  data: Array,
})

const genders = computed(() => {
  return [...new Set(props.data.map( a => a.gender))]
})
const hobbies = computed(() => {
  return [...new Set(props.data.map( a => a.hobby))]
})
const personalities = computed(() => {
  return [...new Set(props.data.map( a => a.personality))]
})
const species = computed(() => {
  return [...new Set(props.data.map( a => a.species))]
})
</script>
