<template>
  <NConfigProvider :theme="theme" :locale="currentLocale" :date-locale="currentDateLocale">
    <NLayout style="height: 100vh">
      <NLayoutHeader
        style="height: 64px; padding: 24px"
        bordered
        role="banner"
      >
        <Menu @black-theme="handleThemeChange" />
      </NLayoutHeader>

      <NLayout position="absolute" style="top: 64px; bottom: 64px" has-sider>
        <NLayoutSider
          content-style="padding: 24px;"
          :native-scrollbar="false"
          bordered
          role="complementary"
          :aria-label="t('filters.title')"
        >
          <Filters v-if="!loading && villagers.length" :characters="villagers" />
          <NSkeleton v-else-if="loading" :repeat="4" />
        </NLayoutSider>

        <NLayout
          id="main-content"
          content-style="padding: 24px;"
          :native-scrollbar="false"
          role="main"
        >
          <div v-if="viewState === 'loading'" class="skeleton-grid">
            <NSkeleton v-for="n in 12" :key="n" height="180px" width="100%" />
          </div>

          <NAlert
            v-else-if="viewState === 'error'"
            :title="t('error.fetch')"
            type="error"
            :show-icon="true"
            closable
            @close="clearError"
          >
            {{ t('error.fetchMessage') }}
          </NAlert>

          <Mosaique
            v-else-if="viewState === 'success'"
            :characters="filteredVillagers"
          />

          <div v-else-if="viewState === 'emptyFilters'" class="empty-state">
            <NEmpty :description="t('noVillagerWithFilters')">
              <template #extra>
                <NButton @click="store.resetFilters()">
                  {{ t('clearFilters') }}
                </NButton>
              </template>
            </NEmpty>
          </div>

          <div v-else-if="viewState === 'noData'" class="empty-state">
            <NEmpty :description="t('noContent')" />
          </div>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NAlert,
  NButton,
  NConfigProvider,
  NEmpty,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NSkeleton,
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Filters from '@/components/filters/Filters.vue'
import Menu from '@/components/menu/Menu.vue'
import Mosaique from '@/components/Mosaique.vue'
import { useAppTheme } from '@/composables/useAppTheme'
import { useFilterUrlSync } from '@/composables/useFilterUrlSync'
import { useViewState } from '@/composables/useViewState'
import { useGlobalStore } from '@/store/global'

const { t } = useI18n()
const store = useGlobalStore()
const { villagers, filteredVillagers, loading } = storeToRefs(store)

const { theme, currentLocale, currentDateLocale, handleThemeChange } = useAppTheme()
const { viewState } = useViewState()

// Synchronise les filtres avec l'URL (partage, bookmark, refresh)
useFilterUrlSync()

function clearError() {
  store.clearError()
}

onMounted(async () => {
  // On s'assure que l'état d'erreur est nul avant de fetcher
  if (store.fetchError)
    store.clearError()

  await store.setVillagers()
})
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Prend toute la hauteur disponible */
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
</style>
