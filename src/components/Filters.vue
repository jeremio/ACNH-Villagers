<template>
  <NSpace>
    <Gender :data="genders" />
    <Hobby :data="hobbies" />
    <Personality :data="personalities" />
    <Specy :data="species" />
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { computed } from 'vue'
import Gender from '~/components/filters/Gender.vue'
import Hobby from '~/components/filters/Hobby.vue'
import Personality from '~/components/filters/Personality.vue'
import Specy from '~/components/filters/Specy.vue'
import type { Character } from '~/interfaces/Character'

const props = defineProps<{
  characters: Character[]
}>()

const genders = computed(() => {
  return [...new Set(props.characters.map(a => a.gender))]
})
const hobbies = computed(() => {
  return [...new Set(props.characters.map(a => a.hobby))]
})
const personalities = computed(() => {
  return [...new Set(props.characters.map(a => a.personality))]
})
const species = computed(() => {
  return [...new Set(props.characters.map(a => a.species))]
})
</script>
