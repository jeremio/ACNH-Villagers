<template>
  <NSpace vertical>
    <div class="filter-title">
      {{ translationFilterName }}
    </div>
    <NRadioGroup
      v-model:value="selectedValue"
      :name="type"
      :aria-label="translationFilterName"
    >
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio
            :id="`all-${type}`"
            value="all"
            :label="t('all')"
            @change="onToggle"
          />
        </NGridItem>
        <NGridItem v-for="item in sortedData" :key="item">
          <NRadio
            :id="`${type}-${item}`"
            :value="item"
            :label="translationFilterKey(item)"
            @change="onToggle"
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

const { getPlural, selectedValue, onToggle } = useFilter(props.type)

const translationFilterName = t(`filters.${getPlural()}`)

const translationFilterKey = (item: string) => t(`${getPlural()}.${item}`)

// Mémorisation du tri pour éviter les recalculs
const sortedData = computed(() =>
  [...props.data].sort((a, b) => a.localeCompare(b)),
)
</script>

<style scoped>
.filter-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
