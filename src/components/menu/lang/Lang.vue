<template>
  <NSpace vertical>
    <NSelect v-model:value="$i18n.locale" :options="options" :consistent-menu-width="false" />
  </NSpace>
</template>

<script setup>
import { NSelect, NSpace } from 'naive-ui'

const options = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
]
</script>
