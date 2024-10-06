<template>
  <NSpace>
    <div>{{ $t('filters.genders') }}</div>
    <NRadioGroup v-model:value="value" name="gender">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allgender" value="all" :label="$t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in data" :key="i">
          <NRadio :id="i" :value="i" :label="$t(`genders.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/global'
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ref } from 'vue'

defineProps<{
  data: string[]
}>()

const value = ref('all')

const global = useGlobalStore()

const toggle = (event: Event) => global.selectedGender = ((event.target as HTMLInputElement).value)
</script>
