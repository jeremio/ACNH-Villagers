<template>
  <NSpace>
    <GenericFilter
      type="gender"
      :data="genders"
    />
    <GenericFilter
      type="hobby"
      :data="hobbies"
    />
    <GenericFilter
      type="personality"
      :data="personalities"
    />
    <GenericFilter
      type="specie"
      :data="species"
    />
  </NSpace>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Character } from '@/interfaces/Character'
import { NSpace } from 'naive-ui'
import { computed } from 'vue'
import GenericFilter from '@/components/filters/GenericFilter.vue'

interface FilterableProperties {
  gender: string
  hobby: string
  personality: string
  specie: string
}

const props = defineProps<{
  characters: Character[]
}>()

function getUniqueValues<T extends keyof FilterableProperties>(property: T): string[] {
  if (!props.characters?.length) {
    return []
  }

  return [...new Set(
    props.characters
      .map(character => character?.[property])
      .filter((value): value is string =>
        value !== null
        && value !== undefined,
      )
      .sort((a, b) => a.localeCompare(b)),
  )]
}

const genders: ComputedRef<string[]> = computed(() => getUniqueValues('gender'))
const hobbies: ComputedRef<string[]> = computed(() => getUniqueValues('hobby'))
const personalities: ComputedRef<string[]> = computed(() => getUniqueValues('personality'))
const species: ComputedRef<string[]> = computed(() => getUniqueValues('specie'))
</script>
