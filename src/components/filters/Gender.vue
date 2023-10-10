<template>
  <NSpace>
    <div>{{ $t('filters.genders') }}</div>
    <NRadioGroup v-model:value="value" name="gender">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allgender" value="all" :label="$t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in props.data" :key="i">
          <NRadio :id="i" :value="i" :label="$t(`genders.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import {ref} from 'vue'
import { useGlobalStore } from '~/store/global'
import type { PropType } from "vue";
const props = defineProps({
  data: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const value = ref('all')

const global = useGlobalStore()
const setSelectedGender = (tmp: string) => {
  global.selectedGender = tmp
}
function toggle(event: Event) {
  setSelectedGender((event.target as HTMLInputElement).value)
}
</script>
