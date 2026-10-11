<template>
  <div class="mosaique">
    <NImageGroup :theme-overrides="imageGroupThemeOverrides">
      <div
        class="villagers-grid"
        role="list"
        :aria-label="t('villagers.grid', { count: characters.length })"
      >
        <div
          v-for="(villager, index) in renderedCharacters"
          :key="villager.id"
          class="villager-card"
          role="listitem"
          :tabindex="0"
          @mouseenter="showDetails(villager, $event)"
          @mouseleave="hideDetails"
          @focus="showDetails(villager, $event)"
          @blur="hideDetails"
        >
          <div class="image-container">
            <NImage
              :src="getVillagerImage(villager)"
              :width="imageSize"
              :height="imageSize"
              :alt="getVillagerName(villager)"
              :show-toolbar-tooltip="true"
              :lazy="index >= EAGER_IMAGES"
              :img-props="index < HIGH_PRIORITY_IMAGES ? { fetchpriority: 'high' } : undefined"
              class="villager-image"
              @error="handleImageError"
            >
              <template #placeholder>
                <div
                  class="image-placeholder"
                  :style="{ width: `${imageSize}px`, height: `${imageSize}px` }"
                >
                  <NSkeleton :width="imageSize" :height="imageSize" :animated="false" />
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
                    {{ t("image.failed") }}
                  </div>
                  <div class="villager-name">
                    {{ getVillagerName(villager) }}
                  </div>
                </div>
              </template>
            </NImage>
          </div>
        </div>
      </div>
    </NImageGroup>

    <!-- Popover unique partagé par toutes les cartes -->
    <NPopover
      trigger="manual"
      raw
      :show="activeVillager !== null"
      :x="popover.x"
      :y="popover.y"
      :placement="popover.placement"
      :flip="false"
    >
      <div
        v-if="activeVillager"
        class="popover-content"
        :style="popoverStyle"
      >
        <div class="villager-header">
          <h3 class="villager-name">
            {{ getVillagerName(activeVillager) }}
          </h3>
          <NTag size="small" :bordered="false">
            #{{ activeVillager.id }}
          </NTag>
        </div>

        <div class="villager-details">
          <div class="detail-row">
            <NIcon size="16">
              <Users />
            </NIcon>
            <strong>{{ t("filters.gender") }}:</strong>
            <span>{{
              getLocalizedText("genders", getVillagerGender(activeVillager))
            }}</span>
          </div>

          <div class="detail-row">
            <NIcon size="16">
              <Gamepad2 />
            </NIcon>
            <strong>{{ t("filters.hobby") }}:</strong>
            <span>{{
              getLocalizedText("hobbies", getVillagerHobby(activeVillager))
            }}</span>
          </div>

          <div class="detail-row">
            <NIcon size="16">
              <Smile />
            </NIcon>
            <strong>{{ t("filters.personality") }}:</strong>
            <span>{{
              getLocalizedText(
                "personalities",
                getVillagerPersonality(activeVillager),
              )
            }}</span>
          </div>

          <div class="detail-row">
            <NIcon size="16">
              <PawPrint />
            </NIcon>
            <strong>{{ t("filters.specie") }}:</strong>
            <span>{{
              getLocalizedText("species", getVillagerSpecie(activeVillager))
            }}</span>
          </div>

          <div class="detail-row">
            <NIcon size="16">
              <Calendar />
            </NIcon>
            <strong>{{ t("filters.birthday") }}:</strong>
            <span>{{ getVillagerBirthday(activeVillager) }}</span>
          </div>
        </div>
      </div>
    </NPopover>
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
} from '@lucide/vue'
import {
  NIcon,
  NImage,
  NImageGroup,
  NPopover,
  NSkeleton,
  NTag,
  useThemeVars,
} from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  characters: Character[]
  imageSize?: number
}>()

const { t, locale } = useI18n()
const themeVars = useThemeVars()

// Configuration
const imageSize = computed(() => props.imageSize || 100)

// Images visibles au premier affichage : chargement immédiat (pas de lazy),
// et priorité réseau haute pour les toutes premières (candidates au LCP)
const EAGER_IMAGES = 12
const HIGH_PRIORITY_IMAGES = 2

// Premier écran monté immédiatement, le reste à la frame suivante :
// évite une seule longue tâche bloquante au chargement
const renderAll = ref(false)
onMounted(() => requestAnimationFrame(() => (renderAll.value = true)))
const renderedCharacters = computed(() =>
  renderAll.value ? props.characters : props.characters.slice(0, 48),
)

// Couleurs du thème actif, en style inline : le popover est téléporté
// dans <body>, hors de portée des variables CSS du composant
const popoverStyle = computed(() => ({
  'color': themeVars.value.textColor2,
  'backgroundColor': themeVars.value.popoverColor,
  'boxShadow': themeVars.value.boxShadow2,
  '--divider-color': themeVars.value.dividerColor,
}))

// Popover unique partagé par toutes les cartes : un NPopover par carte
// coûte cher au montage des 391 cartes.
const activeVillager = ref<Character | null>(null)
const popover = ref({ x: 0, y: 0, placement: 'top' as 'top' | 'bottom' })

function showDetails(villager: Character, event: Event): void {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  // Au-dessus de la carte s'il y a la place (~260 px), sinon en dessous
  const above = rect.top >= 260
  popover.value = {
    x: rect.left + rect.width / 2,
    y: above ? rect.top : rect.bottom,
    placement: above ? 'top' : 'bottom',
  }
  activeVillager.value = villager
}

function hideDetails(): void {
  activeVillager.value = null
}

// Thème du groupe d'images
const imageGroupThemeOverrides = computed(() => ({
  toolbarColor: themeVars.value.popoverColor,
  toolbarBoxShadow: themeVars.value.boxShadow2,
  toolbarIconColor: themeVars.value.textColor2,
  toolbarBorderRadius: themeVars.value.borderRadius,
}))

const fileNameRegex = /[^\w-]/g
const birthdayRegex = /^([A-Z][a-z]+) (\d{1,2})(?:st|nd|rd|th)$/
const ENGLISH_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Fonctions de récupération des données avec validation et assainissement
function getVillagerImage(villager: Character): string {
  const sanitizedFileName = villager['file-name']
    .replace(fileNameRegex, '')
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
  const raw = villager?.['birthday-string']
  if (!raw) {
    return t('unknown')
  }

  // Format des données : "September 22nd" (mois anglais + jour ordinal)
  const match = birthdayRegex.exec(raw)
  const month = match ? ENGLISH_MONTHS.indexOf(match[1]!) : -1
  if (!match || month === -1) {
    return raw
  }

  return new Date(2000, month, Number(match[2])).toLocaleDateString(
    locale.value,
    { day: 'numeric', month: 'long' },
  )
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
    // Clé dynamique voulue : catégorie + valeur issue des données du villageois
    // eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
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
  /* Rendu differe des cartes hors ecran (391 cartes) */
  content-visibility: auto;
  contain-intrinsic-size: auto 100px;
  border-radius: 8px;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.placeholder-text {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  color: v-bind('themeVars.textColor3');
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
  border-radius: 8px;
}

.villager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--divider-color);
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
</style>
