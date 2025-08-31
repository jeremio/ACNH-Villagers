<template>
  <nav class="menu" role="navigation" :aria-label="t('navigation.main')">
    <div class="title">
      <RouterLink to="/" class="title-link">
        {{ t('title') }}
      </RouterLink>
    </div>

    <div class="controls">
      <NSpace align="center">
        <!-- Toggle de thème avec icônes -->
        <NButtonGroup>
          <NButton
            :type="isDarkTheme ? 'primary' : 'default'"
            :aria-label="t('theme.dark')"
            :disabled="isChangingTheme"
            @click="enableDarkTheme"
          >
            <template #icon>
              <NIcon>
                <Moon />
              </NIcon>
            </template>
            {{ t('theme.dark') }}
          </NButton>

          <NButton
            :type="!isDarkTheme ? 'primary' : 'default'"
            :aria-label="t('theme.light')"
            :disabled="isChangingTheme"
            @click="enableLightTheme"
          >
            <template #icon>
              <NIcon>
                <Sun />
              </NIcon>
            </template>
            {{ t('theme.light') }}
          </NButton>
        </NButtonGroup>

        <!-- Sélecteur de langue -->
        <Lang />

        <!-- Statistiques rapides (optionnel) -->
        <NTooltip v-if="showStats" trigger="hover">
          <template #trigger>
            <NTag :bordered="false" size="small">
              <template #icon>
                <NIcon>
                  <Users />
                </NIcon>
              </template>
              {{ totalVillagers }}
            </NTag>
          </template>
          {{ t('stats.totalVillagers', { count: totalVillagers }) }}
        </NTooltip>
      </NSpace>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Moon, Sun, Users } from 'lucide-vue-next'
import { NButton, NButtonGroup, NIcon, NSpace, NTag, NTooltip } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import Lang from '@/components/menu/Lang.vue'
import { useGlobalStore } from '@/store/global'

const emit = defineEmits<{
  blackTheme: [isDark: boolean]
}>()

const { t } = useI18n()
const store = useGlobalStore()
const { villagers } = storeToRefs(store)

const isChangingTheme = ref(false)
const currentTheme = ref<'dark' | 'light'>('dark')

// Computed pour l'état du thème
const isDarkTheme = computed(() => currentTheme.value === 'dark')

// Computed pour les statistiques
const totalVillagers = computed(() => villagers.value.length)
const showStats = computed(() => totalVillagers.value > 0)

// Fonctions de gestion du thème avec debounce pour éviter les clics multiples
async function enableDarkTheme() {
  if (isChangingTheme.value || isDarkTheme.value)
    return

  isChangingTheme.value = true
  currentTheme.value = 'dark'

  try {
    // Sauvegarder la préférence
    localStorage.setItem('theme-preference', 'dark')

    // Émettre le changement
    emit('blackTheme', true)
  }
  catch (error) {
    console.error('Failed to change to dark theme:', error)
  }
  finally {
    // Petit délai pour éviter les clics rapides
    setTimeout(() => {
      isChangingTheme.value = false
    }, 200)
  }
}

async function enableLightTheme() {
  if (isChangingTheme.value || !isDarkTheme.value)
    return

  isChangingTheme.value = true
  currentTheme.value = 'light'

  try {
    // Sauvegarder la préférence
    localStorage.setItem('theme-preference', 'light')

    // Émettre le changement
    emit('blackTheme', false)
  }
  catch (error) {
    console.error('Failed to change to light theme:', error)
  }
  finally {
    // Petit délai pour éviter les clics rapides
    setTimeout(() => {
      isChangingTheme.value = false
    }, 200)
  }
}

// Initialiser le thème depuis localStorage
function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme-preference')
    if (savedTheme === 'light') {
      currentTheme.value = 'light'
      emit('blackTheme', false)
    }
    else {
      // Défaut sombre ou préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light'
      emit('blackTheme', currentTheme.value === 'dark')
    }
  }
  catch (error) {
    console.error('Failed to initialize theme:', error)
    currentTheme.value = 'dark'
    emit('blackTheme', true)
  }
}

// Écouter les changements de préférence système
if (typeof window !== 'undefined') {
  initializeTheme()

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    // Ne changer que si aucune préférence explicite n'est sauvegardée
    const savedTheme = localStorage.getItem('theme-preference')
    if (!savedTheme) {
      currentTheme.value = e.matches ? 'dark' : 'light'
      emit('blackTheme', e.matches)
    }
  })
}
</script>

<style scoped>
.menu {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.title {
  justify-self: start;
}

.title-link {
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease-in-out;
}

.title-link:hover {
  opacity: 0.8;
}

.controls {
  justify-self: end;
  display: flex;
  align-items: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .menu {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
    text-align: center;
  }

  .title {
    justify-self: center;
  }

  .controls {
    justify-self: center;
  }

  .title-link {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .controls :deep(.n-button-group) {
    flex-direction: column;
    width: 100%;
  }

  .controls :deep(.n-button) {
    width: 100%;
    justify-content: center;
  }
}

/* Animation pour le changement de thème */
.menu {
  transition: all 0.3s ease-in-out;
}

.controls :deep(.n-button) {
  transition: all 0.2s ease-in-out;
}

.controls :deep(.n-button:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Amélioration de l'accessibilité */
.controls :deep(.n-button:focus-visible) {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.title-link:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
