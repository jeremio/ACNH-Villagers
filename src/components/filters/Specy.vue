<template>
  <NSpace>
    <div>{{ $t('filters.species') }}</div>
    <NRadioGroup v-model:value="value" name="species">
      <NGrid cols="2" responsive="screen">
        <NGridItem>
          <NRadio id="allspecies" value="all" :label="$t('all')" @change="toggle($event)" />
        </NGridItem>
        <NGridItem v-for="i in props.data" :key="i">
          <NRadio :id="i" :value="i" :label="$t(`species.${i}`)" @change="toggle($event)" />
        </NGridItem>
      </NGrid>
    </NRadioGroup>
  </NSpace>
</template>

<script setup>
import { NGrid, NGridItem, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { useGlobalStore } from '~/store/global'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const value = ref('all')

const global = useGlobalStore()
function setSelectedSpecies(tmp) {
  global.selectedSpecies = tmp
}

function toggle(event) {
  setSelectedSpecies(event.target.value)
}
</script>
