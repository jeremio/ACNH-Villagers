<template>
  <NSpace>
    <div>{{ t(`filters.${getPlural()}`) }}</div>
    <NRadioGroup v-model:value="selectedValue" :name="type">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio :id="`all${type}`" value="all" :label="t('all')" @change="onToggle" />
        </NGridItem>
        <NGridItem v-for="item in data" :key="item">
          <NRadio :id="item" :value="item" :label="t(`${getPlural()}.${item}`)" @change="onToggle" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useFilter } from '@/composables/useFilter'

const props = defineProps<{
  type: 'gender' | 'hobby' | 'personality' | 'specie'
  data: string[]
}>()

const { t } = useI18n()

const { getPlural, selectedValue, onToggle } = useFilter(props.type)
</script>
