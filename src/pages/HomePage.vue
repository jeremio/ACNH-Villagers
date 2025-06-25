<template>
  <NConfigProvider :theme="theme" :locale="mylocal" :date-locale="mydate">
    <NLayout style="height: 100vh">
      <NLayoutHeader style="height: 64px; padding: 24px" bordered>
        <Menu @black-theme="blackTheme" />
      </NLayoutHeader>
      <NLayout position="absolute" style="top: 64px; bottom: 64px" has-sider>
        <NLayoutSider
          content-style="padding: 24px;"
          :native-scrollbar="false"
          bordered
        >
          <div v-if="villagers.length">
            <Filters :characters="villagers" />
          </div>
        </NLayoutSider>
        <NLayout content-style="padding: 24px;" :native-scrollbar="false">
          <div v-if="!villagers.length">
            {{ t('noContent') }}
          </div>
          <Mosaique v-else-if="filteredVillagers.length" :characters="filteredVillagers" />
          <div v-else>
            {{ t('noVillagerWithFilters') }}
          </div>
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
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
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
const { villagers, filteredVillagers } = storeToRefs(store)

const theme = ref<GlobalTheme | null>(darkTheme)

const blackTheme = (color: boolean) => theme.value = color ? darkTheme : null

const mylocal = computed(() => locale.value === 'fr' ? frFR : enUS)

const mydate = computed(() => locale.value === 'fr' ? dateFrFR : dateEnUS)

onMounted(() => {
  store.setVillagers()
})
</script>
