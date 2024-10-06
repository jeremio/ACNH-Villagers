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
          <div v-if="info">
            <Filters :characters="info" />
          </div>
        </NLayoutSider>
        <NLayout content-style="padding: 24px;" :native-scrollbar="false">
          <div v-if="!info.length">
            Pas de contenu
          </div>
          <Mosaique v-else-if="datafiltered.length" :characters="datafiltered" />
          <div v-else>
            Pas de villageois avec ces filtres
          </div>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import type { GlobalTheme } from 'naive-ui'
import infoVillagers from '@/assets/villagers.json'
import Filters from '@/components/Filters.vue'
import Menu from '@/components/menu/Menu.vue'
import Mosaique from '@/components/Mosaique.vue'
import { useGlobalStore } from '@/store/global'
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const { selectedGender, selectedPersonality, selectedHobby, selectedSpecies } = storeToRefs(useGlobalStore())

const theme = ref<GlobalTheme | null>(darkTheme)

const blackTheme = (color: boolean) => theme.value = color ? darkTheme : null

const info: Character[] = [...infoVillagers]

const filterByProperty = (array: Character[], property: keyof Character, value: string) => array.filter(item => item[property] === value)

const mylocal = computed(() => locale.value === 'fr' ? frFR : enUS)

const mydate = computed(() => locale.value === 'fr' ? dateFrFR : dateEnUS)

const datafiltered = computed(() => {
  let array = info
  if (selectedGender.value !== 'all')
    array = filterByProperty(array, 'gender', selectedGender.value)

  if (selectedPersonality.value !== 'all')
    array = filterByProperty(array, 'personality', selectedPersonality.value)

  if (selectedHobby.value !== 'all')
    array = filterByProperty(array, 'hobby', selectedHobby.value)

  if (selectedSpecies.value !== 'all')
    array = filterByProperty(array, 'specie', selectedSpecies.value)

  return array
})
</script>
