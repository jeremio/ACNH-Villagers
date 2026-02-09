<template>
  <div
    class="mosaique"
    role="grid"
    :aria-label="t('villagers.grid', { count: characters.length })"
  >
    <NImageGroup :theme-overrides="imageGroupThemeOverrides">
      <div class="villagers-grid">
        <div
          v-for="villager in characters"
          :key="villager.id"
          class="villager-card"
          role="gridcell"
          :tabindex="0"
        >
          <NPopover
            trigger="hover"
            raw
            :delay="300"
            :keep-alive-on-hover="true"
            placement="top"
          >
            <template #trigger>
              <div class="image-container">
                <NImage
                  :src="getVillagerImage(villager)"
                  :width="imageSize"
                  :height="imageSize"
                  :alt="getVillagerName(villager)"
                  :show-toolbar-tooltip="true"
                  lazy
                  class="villager-image"
                  @error="handleImageError"
                >
                  <template #placeholder>
                    <div class="image-placeholder">
                      <NSkeleton :width="imageSize" :height="imageSize" />
                      <div class="placeholder-text">
                        {{ getVillagerName(villager) }}
                      </div>
                    </div>
                  </template>

                  <template #error>
                    <div class="image-error">
                      <NIcon size="32" :depth="3">
                        <ImageOff />
                      </NIcon>
                      <div class="error-text">
                        {{ t('image.failed') }}
                      </div>
                      <div class="villager-name">
                        {{ getVillagerName(villager) }}
                      </div>
                    </div>
                  </template>
                </NImage>
              </div>
            </template>

            <!-- Contenu du popover enrichi -->
            <div class="popover-content">
              <div class="villager-header">
                <h3 class="villager-name">
                  {{ getVillagerName(villager) }}
                </h3>
                <NTag size="small" :bordered="false">
                  #{{ villager.id }}
                </NTag>
              </div>

              <div class="villager-details">
                <div class="detail-row">
                  <NIcon size="16">
                    <Users />
                  </NIcon>
                  <strong>{{ t('filters.gender') }}:</strong>
                  <span>{{ getLocalizedText('genders', getVillagerGender(villager)) }}</span>
                </div>

                <div class="detail-row">
                  <NIcon size="16">
                    <Gamepad2 />
                  </NIcon>
                  <strong>{{ t('filters.hobby') }}:</strong>
                  <span>{{ getLocalizedText('hobbies', getVillagerHobby(villager)) }}</span>
                </div>

                <div class="detail-row">
                  <NIcon size="16">
                    <Smile />
                  </NIcon>
                  <strong>{{ t('filters.personality') }}:</strong>
                  <span>{{ getLocalizedText('personalities', getVillagerPersonality(villager)) }}</span>
                </div>

                <div class="detail-row">
                  <NIcon size="16">
                    <PawPrint />
                  </NIcon>
                  <strong>{{ t('filters.specie') }}:</strong>
                  <span>{{ getLocalizedText('species', getVillagerSpecie(villager)) }}</span>
                </div>

                <div class="detail-row">
                  <NIcon size="16">
                    <Calendar />
                  </NIcon>
                  <strong>{{ t('filters.birthday') }}:</strong>
                  <span>{{ getVillagerBirthday(villager) }}</span>
                </div>
              </div>
            </div>
          </NPopover>
        </div>
      </div>
    </NImageGroup>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import {
  Calendar,
  Gamepad2,
  ImageOff,
  PawPrint,
  Smile,
  Users,
} from 'lucide-vue-next'
import {
  NIcon,
  NImage,
  NImageGroup,
  NPopover,
  NSkeleton,
  NTag,
  useThemeVars,
} from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  characters: Character[]
  imageSize?: number
}>()

const { t, locale } = useI18n()
const themeVars = useThemeVars()

// Configuration
const imageSize = computed(() => props.imageSize || 100)

// Thème du groupe d'images
const imageGroupThemeOverrides = computed(() => ({
  toolbarColor: themeVars.value.popoverColor,
  toolbarBoxShadow: themeVars.value.boxShadow2,
  toolbarIconColor: themeVars.value.textColor2,
  toolbarBorderRadius: themeVars.value.borderRadius,
}))

// Fonctions de récupération des données avec validation et assainissement
function getVillagerImage(villager: Character): string {
  const sanitizedFileName = villager['file-name']
    .replace(/[^\w-]/g, '')
    .substring(0, 50) // Limiter la longueur

  return `/villagers/${sanitizedFileName}.webp`
}

function getVillagerName(villager: Character): string {
  if (!villager?.name) {
    return t('unknown')
  }

  const nameKey = locale.value === 'en' ? 'name-EUen' : 'name-EUfr'
  return villager.name[nameKey] || t('unknown')
}

function getVillagerBirthday(villager: Character): string {
  if (!villager?.['birthday-string']) {
    return t('unknown')
  }

  // Optionnel: formatter la date selon la locale
  try {
    const date = new Date(villager['birthday-string'])
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(locale.value)
    }
  }
  catch (error) {
    console.log(error)
    console.warn('Invalid date format:', villager['birthday-string'])
  }

  return villager['birthday-string']
}

function getVillagerHobby(villager: Character): string {
  return villager?.hobby || ''
}

function getVillagerGender(villager: Character): string {
  return villager?.gender || ''
}

function getVillagerSpecie(villager: Character): string {
  return villager?.specie || ''
}

function getVillagerPersonality(villager: Character): string {
  return villager?.personality || ''
}

// Fonction de localisation sécurisée
function getLocalizedText(category: string, key: string): string {
  if (!key || key === '') {
    return t('unknown')
  }

  try {
    const translationKey = `${category}.${key}`
    const translation = t(translationKey)

    // Vérifier si la traduction existe (éviter les clés retournées telles quelles)
    if (translation === translationKey) {
      return key // Retourner la clé originale si pas de traduction
    }

    return translation || t('unknown')
  }
  catch (error) {
    console.warn(`Translation error for ${category}.${key}:`, error)
    return key || t('unknown')
  }
}

// Gestion des erreurs d'image
function handleImageError(event: Event): void {
  console.warn('Image failed to load:', event)
  // Optionnel: tracker les erreurs d'images
}
</script>

<style scoped>
.mosaique {
  width: 100%;
}

.villagers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  padding: 8px;
}

.villager-card {
  position: relative;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.villager-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.villager-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.villager-image {
  border-radius: 8px;
  overflow: hidden;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.placeholder-text {
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  color: #666;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px;
}

.error-text {
  margin-top: 4px;
  font-size: 10px;
  color: #666;
  text-align: center;
}

.villager-name {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popover-content {
  min-width: 250px;
  max-width: 300px;
  padding: 16px;
  background-color: var(--popover-color);
  border-radius: 8px;
}

.villager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.villager-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.villager-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.detail-row strong {
  min-width: 80px;
  font-weight: 500;
}

.detail-row span {
  flex: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .villagers-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .popover-content {
    min-width: 200px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .villagers-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .villager-card {
    transition: none;
  }

  .villager-card:hover {
    transform: none;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .image-placeholder {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .placeholder-text {
    color: #ccc;
  }

  .popover-content {
    background-color: var(--popover-color);
    color: #ccc;
  }
}
</style>
