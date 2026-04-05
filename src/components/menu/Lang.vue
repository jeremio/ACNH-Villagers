<template>
  <NSpace vertical>
    <NSelect
      v-model:value="selectedLocale"
      :options="languageOptions"
      :consistent-menu-width="false"
      :loading="isChangingLanguage"
      :aria-label="t('language.select')"
      @update:value="handleLanguageChange"
    />
  </NSpace>
</template>

<script setup lang="ts">
import { NSelect, NSpace } from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale, t } = useI18n()
const isChangingLanguage = ref(false)

// Computed pour la valeur sélectionnée
const selectedLocale = computed({
  get: () => locale.value,
  set: (_value: string) => {
    // La logique de changement est gérée dans handleLanguageChange
  },
})

// Options de langue avec drapeaux et noms natifs
const languageOptions = computed(() => [
  {
    value: 'fr',
    label: '🇫🇷 Français',
    disabled: isChangingLanguage.value,
  },
  {
    value: 'en',
    label: '🇺🇸 English',
    disabled: isChangingLanguage.value,
  },
])

// Gestion du changement de langue avec loading et persistence
async function handleLanguageChange(newLocale: string) {
  if (newLocale === locale.value || isChangingLanguage.value)
    return

  isChangingLanguage.value = true

  try {
    // Changer la langue avec le système de lazy loading
    await setLocale(newLocale)
  }
  catch (error) {
    console.error('Failed to change language:', error)
  }
  finally {
    isChangingLanguage.value = false
  }
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
