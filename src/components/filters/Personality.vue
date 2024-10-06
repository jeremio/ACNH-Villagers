<template>
  <NSpace>
    <div>{{ t('filters.personalities') }}</div>
    <NRadioGroup v-model:value="value" name="personality">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allpersonality" value="all" :label="t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in data" :key="i">
          <NRadio :id="i" :value="i" :label="t(`personalities.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/global'
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  data: string[]
}>()

const { t } = useI18n()

const value = ref('all')

const global = useGlobalStore()

const toggle = (event: Event) => global.selectedPersonality = ((event.target as HTMLInputElement).value)
</script>
