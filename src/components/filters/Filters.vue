<template>
  <NSpace vertical>
    <GenericFilter
      v-for="filterConfig in filterConfigs"
      :key="filterConfig.type"
      :type="filterConfig.type"
      :data="getFilterData(filterConfig.type)"
    />
    <NButton
      type="primary"
      ghost
      :aria-label="t('reset')"
      @click="reset"
    >
      {{ t('reset') }}
    </NButton>
  </NSpace>
</template>

<script setup lang="ts">
import type { Character, FilterableProperty } from '@/interfaces/Character'
import { NButton, NSpace } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GenericFilter from '@/components/filters/GenericFilter.vue'
import { useGlobalStore } from '@/store/global'

const props = defineProps<{
  characters: Character[]
}>()

const filterConfigs = [
  { type: 'gender' as const },
  { type: 'hobby' as const },
  { type: 'personality' as const },
  { type: 'specie' as const },
]

// Fonction optimisée pour extraire les valeurs uniques
function getUniqueValues<T extends FilterableProperty>(property: T): string[] {
  if (!props.characters?.length) {
    return []
  }

  const uniqueValues = new Set<string>()

  for (const character of props.characters) {
    const value = character[property]
    if (value != null && value !== '') {
      uniqueValues.add(value)
    }
  }

  return Array.from(uniqueValues)
}

// Mémorisation des données de filtre pour éviter les recalculs
const filterDataCache = computed(() => {
  const cache: Record<FilterableProperty, string[]> = {
    gender: getUniqueValues('gender'),
    hobby: getUniqueValues('hobby'),
    personality: getUniqueValues('personality'),
    specie: getUniqueValues('specie'),
  }
  return cache
})

function getFilterData(type: FilterableProperty): string[] {
  return filterDataCache.value[type]
}

const { t } = useI18n()
const store = useGlobalStore()

function reset() {
  store.resetFilters()
}
</script>
