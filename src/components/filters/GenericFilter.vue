<template>
  <NSpace vertical>
    <div class="filter-title">
      {{ title }}
    </div>
    <NRadioGroup
      v-model:value="selectedValue"
      :name="type"
      :aria-label="title"
    >
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio
            :id="`all-${type}`"
            value="all"
            :label="t('all')"
          />
        </NGridItem>
        <NGridItem v-for="item in sortedData" :key="item">
          <NRadio
            :id="`${type}-${item}`"
            :value="item"
            :label="itemLabel(item)"
          />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup lang="ts">
import type { FilterableProperty } from '@/interfaces/Character'
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFilter } from '@/composables/useFilter'

const props = defineProps<{
  type: FilterableProperty
  data: string[]
}>()

const { t } = useI18n()

const { plural, selectedValue } = useFilter(props.type)

// Clés construites à partir du type de filtre et des valeurs issues des données
// eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
const title = computed(() => t(`filters.${plural}`))

function itemLabel(item: string): string {
  // eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
  return t(`${plural}.${item}`)
}

// Mémorisation du tri pour éviter les recalculs
const sortedData = computed(() =>
  props.data.toSorted((a, b) => a.localeCompare(b)),
)
</script>

<style scoped>
.filter-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
