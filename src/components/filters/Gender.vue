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
function setSelectedGender(tmp) {
  global.selectedGender = tmp
}
function toggle(event) {
  setSelectedGender(event.target.value)
}
</script>
