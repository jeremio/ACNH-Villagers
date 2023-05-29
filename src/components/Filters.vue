<template>
  <NSpace>
    <Gender :data="genders" />
    <Hobby :data="hobbies" />
    <Personality :data="personalities" />
    <Specy :data="species" />
  </NSpace>
</template>

<script setup>
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
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
