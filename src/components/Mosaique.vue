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
              <div>{{ $t('filters.gender') }}: {{ getLocalizedText('genders', gender(villager)) }}</div>
              <div>{{ $t('filters.hobby') }}: {{ getLocalizedText('hobbies', hobby(villager)) }}</div>
              <div>{{ $t('filters.personality') }}: {{ getLocalizedText('personalities', personality(villager)) }}</div>
              <div>{{ $t('filters.specie') }}: {{ getLocalizedText('species', species(villager)) }}</div>
              <div>{{ $t('filters.birthday') }}: {{ birthdayString(villager) }}</div>
            </div>
          </NPopover>
        </template>
      </NSpace>
    </NImageGroup>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { NImage, NImageGroup, NPopover, NSpace, useThemeVars } from 'naive-ui'
import type { Character } from '~/interfaces/Character'

defineProps<{
  characters: Character[]
}>()

const { t } = useI18n()

const imageGroupThemeOverrides = computed(() => {
  const { popoverColor, boxShadow2, textColor2, borderRadius } = useThemeVars().value
  return {
    toolbarColor: popoverColor,
    toolbarBoxShadow: boxShadow2,
    toolbarIconColor: textColor2,
    toolbarBorderRadius: borderRadius,
  }
})

const { locale } = useI18n()

function getLocalizedText(category: string, key: string | null) {
  if (!key)
    return null
  return t(`${category}.${key}`)
}

function name(villager: Character) {
  return villager.name?.[locale.value === 'en' ? 'name-EUen' : 'name-EUfr'] ?? 'inconnu'
}

const image = (villager: Character) => `villagers/${villager?.['file-name']}.png` ?? null

const hobby = (villager: Character) => villager?.hobby ?? null

const gender = (villager: Character) => villager?.gender ?? null

const birthdayString = (villager: Character) => villager?.['birthday-string'] ?? null

const species = (villager: Character) => villager?.specy ?? null

const personality = (villager: Character) => villager?.personality ?? null
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
