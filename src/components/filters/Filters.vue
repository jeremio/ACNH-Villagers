<template>
  <NSpace>
    <GenericFilter type="gender" :data="genders" />
    <GenericFilter type="hobby" :data="hobbies" />
    <GenericFilter type="personality" :data="personalities" />
    <GenericFilter type="specie" :data="species" />
  </NSpace>
</template>

<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import GenericFilter from '@/components/filters/GenericFilter.vue'
import { NSpace } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{
  characters: Character[]
}>()

const getUniqueValues = (property: keyof Character) => [...new Set(props.characters.map(a => a[property]))] as string[]

const genders = computed(() => getUniqueValues('gender'))
const hobbies = computed(() => getUniqueValues('hobby'))
const personalities = computed(() => getUniqueValues('personality'))
const species = computed(() => getUniqueValues('specie'))
</script>
