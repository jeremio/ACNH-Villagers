<template>
  <NSpace>
    <Gender :data="genders" />
    <Hobby :data="hobbies" />
    <Personality :data="personalities" />
    <Specie :data="species" />
  </NSpace>
</template>

<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import Gender from '@/components/filters/Gender.vue'
import Hobby from '@/components/filters/Hobby.vue'
import Personality from '@/components/filters/Personality.vue'
import Specie from '@/components/filters/Specie.vue'
import { NSpace } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{
  characters: Character[]
}>()

type CharacterProperty = keyof Character

const getUniqueValues = (property: CharacterProperty) => [...new Set(props.characters.map(a => a[property]))] as string[]

const genders = computed(() => getUniqueValues('gender'))
const hobbies = computed(() => getUniqueValues('hobby'))
const personalities = computed(() => getUniqueValues('personality'))
const species = computed(() => getUniqueValues('specie'))
</script>
