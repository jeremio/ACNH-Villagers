<template>
  <NSpace vertical>
    <NSelect
      :value="locale"
      :options="languageOptions"
      :consistent-menu-width="false"
      :aria-label="t('language.select')"
      @update:value="handleLanguageChange"
    />
  </NSpace>
</template>

<script setup lang="ts">
import { NSelect, NSpace } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale, t } = useI18n()

// Options de langue avec drapeaux et noms natifs
const languageOptions = computed(() => [
  {
    value: 'fr',
    label: '🇫🇷 Français',
  },
  {
    value: 'en',
    label: '🇺🇸 English',
  },
])

// Changement de langue (traductions deja chargees) et persistance
function handleLanguageChange(newLocale: string) {
  if (newLocale !== locale.value)
    setLocale(newLocale)
}
</script>

<style scoped>
/* Styles pour améliorer l'apparence du sélecteur */
:deep(.n-base-selection) {
  min-width: 120px;
}

:deep(.n-base-selection-label) {
  font-weight: 500;
}

/* Animation de transition pour le changement de langue */
.language-selector {
  transition: opacity 0.2s ease-in-out;
}

.language-selector.changing {
  opacity: 0.7;
}
</style>
