<template>
  <NSpace>
    <div>{{ $t('filters.personalities') }}</div>
    <NRadioGroup v-model:value="value" name="personality">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allpersonality" value="all" :label="$t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in props.data" :key="i">
          <NRadio :id="i" :value="i" :label="$t(`personality.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup>
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { useGlobalStore } from '../../store/global'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const value = ref('all')

const global = useGlobalStore()
const setSelectedPersonality = (tmp) => {
  global.selectedPersonality = tmp
}

const toggle = (event) => {
  setSelectedPersonality(event.target.value)
}
</script>
