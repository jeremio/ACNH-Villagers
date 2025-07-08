<template>
  <div class="mosaique">
    <NImageGroup :theme-overrides="imageGroupThemeOverrides">
      <NSpace>
        <template v-for="villager in characters" :key="villager.id">
          <NPopover trigger="hover" raw>
            <template #trigger>
              <NImage
                lazy :src="image(villager)" width="100" height="100"
                :alt="name(villager)"
                :show-toolbar-tooltip="true"
              >
                <template #placeholder>
                  <div class="placeholder">
                    {{ name(villager) }}
                  </div>
                </template>
              </NImage>
            </template>
            <div class="popover-content">
              <div>{{ name(villager) }}</div>
              <div>{{ t('filters.gender') }} : {{ getLocalizedText('genders', gender(villager)) }}</div>
              <div>{{ t('filters.hobby') }} : {{ getLocalizedText('hobbies', hobby(villager)) }}</div>
              <div>{{ t('filters.personality') }} : {{ getLocalizedText('personalities', personality(villager)) }}</div>
              <div>{{ t('filters.specie') }} : {{ getLocalizedText('species', specie(villager)) }}</div>
              <div>{{ t('filters.birthday') }} : {{ birthdayString(villager) }}</div>
            </div>
          </NPopover>
        </template>
      </NSpace>
    </NImageGroup>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import { NImage, NImageGroup, NPopover, NSpace, useThemeVars } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  characters: Character[]
}>()

const { t } = useI18n()
const { popoverColor, boxShadow2, textColor2, borderRadius } = useThemeVars().value

const imageGroupThemeOverrides = computed(() => {
  return {
    toolbarColor: popoverColor,
    toolbarBoxShadow: boxShadow2,
    toolbarIconColor: textColor2,
    toolbarBorderRadius: borderRadius,
  }
})

const { locale } = useI18n()

function getLocalizedText(category: string, key: string): string {
  if (!key || key === '')
    return t('unknown')

  try {
    const translation = t(`${category}.${key}`)
    return translation || t('unknown') // En cas de clé de traduction manquante, t() peut retourner la clé elle-même ou ''
  }
  catch {
    return t('unknown')
  }
}

function name(villager: Character): string {
  if (!villager?.name) {
    return t('unknown')
  }

  const nameKey = locale.value === 'en' ? 'name-EUen' : 'name-EUfr'
  return villager.name[nameKey] ?? t('unknown')
}

function image(villager: Character): string {
  return villager?.['file-name'] ? `villagers/${villager['file-name']}.webp` : ''
}

function birthdayString(villager: Character): string {
  return villager?.['birthday-string'] ?? t('unknown')
}

function hobby(villager: Character): string {
  return villager?.hobby ?? ''
}

function gender(villager: Character): string {
  return villager?.gender ?? ''
}

function specie(villager: Character): string {
  return villager?.specie ?? ''
}

function personality(villager: Character): string {
  return villager?.personality ?? ''
}
</script>

<style scoped>
.placeholder {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8882;
}

.popover-content {
  width: 175px;
  padding: 10px;
  background-color: #3c817f;
  transform-origin: inherit;
}
</style>
