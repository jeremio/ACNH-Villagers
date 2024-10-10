<template>
  <NSpace vertical>
    <NSelect v-model:value="locale" :options="options" :consistent-menu-width="false" />
  </NSpace>
</template>

<script setup lang="ts">
import { NSelect, NSpace } from 'naive-ui'

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const options = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
]
</script>
