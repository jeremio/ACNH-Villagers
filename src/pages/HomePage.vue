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
          <div v-if="villagers.length">
            <Filters :characters="villagers" />
          </div>
          <NSkeleton v-else-if="loading" :repeat="4" />
        </NLayoutSider>

        <NLayout
          content-style="padding: 24px;"
          :native-scrollbar="false"
          role="main"
        >
          <NAlert
            v-if="fetchError"
            :title="t('error.fetch')"
            type="error"
            :show-icon="true"
            closable
            @close="clearError"
          >
            {{ t('error.fetchMessage') }}
            <template #action>
              <NButton size="small" @click="retry">
                {{ t('retry') }}
              </NButton>
            </template>
          </NAlert>

          <NSpin :show="loading">
            <div v-if="!villagers.length && !loading && !fetchError" class="empty-state">
              <NEmpty :description="t('noContent')" />
            </div>

            <Mosaique
              v-else-if="filteredVillagers.length"
              :characters="filteredVillagers"
            />

            <div v-else-if="!loading && !fetchError" class="empty-state">
              <NEmpty :description="t('noVillagerWithFilters')">
                <template #extra>
                  <NButton @click="store.resetFilters()">
                    {{ t('clearFilters') }}
                  </NButton>
                </template>
              </NEmpty>
            </div>
          </NSpin>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui'
import {
  darkTheme,
  dateEnUS,
  dateFrFR,
  enUS,
  frFR,
  NAlert,
  NButton,
  NConfigProvider,
  NEmpty,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NSkeleton,
  NSpin,
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Filters from '@/components/filters/Filters.vue'
import Menu from '@/components/menu/Menu.vue'
import Mosaique from '@/components/Mosaique.vue'
import { useGlobalStore } from '@/store/global'

const { locale, t } = useI18n()
const store = useGlobalStore()
const { villagers, filteredVillagers, fetchError } = storeToRefs(store)

const theme = ref<GlobalTheme | null>(darkTheme)
const loading = ref(true)

function handleThemeChange(isDark: boolean) {
  theme.value = isDark ? darkTheme : null
}

const currentLocale = computed(() => locale.value === 'fr' ? frFR : enUS)
const currentDateLocale = computed(() => locale.value === 'fr' ? dateFrFR : dateEnUS)

function clearError() {
  store.clearError()
}

async function retry() {
  loading.value = true
  await store.setVillagers()
  loading.value = false
}

onMounted(async () => {
  await store.setVillagers()
  loading.value = false
})
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
