<template>
  <NSpace vertical>
    <NSelect v-model:value="$i18n.locale" size="small" :options="options" />
  </NSpace>
</template>

<script setup>
import { NSelect, NSpace } from 'naive-ui'

const options = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
]
</script>
