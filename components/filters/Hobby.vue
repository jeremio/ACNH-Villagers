<script setup lang="ts">
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useGlobalStore } from '../../store/global'

const props = defineProps({
  data: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const value = ref('all')

const global = useGlobalStore()
function setSelectedHobby(tmp: string) {
  global.selectedHobby = tmp
}
function toggle(event: Event) {
  setSelectedHobby((event.target as HTMLInputElement).value)
}
</script>

<template>
  <NSpace>
    <div>{{ $t('filters.hobbies') }}</div>
    <NRadioGroup v-model:value="value" name="hobby">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allhobby" value="all" :label="$t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in props.data" :key="i">
          <NRadio :id="i" :value="i" :label="$t(`hobbies.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>
