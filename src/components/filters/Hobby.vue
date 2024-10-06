<template>
  <NSpace>
    <div>{{ t('filters.hobbies') }}</div>
    <NRadioGroup v-model:value="value" name="hobby">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allhobby" value="all" :label="t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in data" :key="i">
          <NRadio :id="i" :value="i" :label="t(`hobbies.${i}`)" @change="toggle($event)" />
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

const toggle = (event: Event) => global.selectedHobby = ((event.target as HTMLInputElement).value)
</script>
