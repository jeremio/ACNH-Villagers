<template>
  <NConfigProvider :theme="theme" :locale="frFR" :date-locale="dateFrFR">
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
            <Filters :data="info" />
          </div>
        </NLayoutSider>
        <NLayout content-style="padding: 24px;" :native-scrollbar="false">
          <div v-if="!info">
            Pas de contenu
          </div>
          <Mosaique v-if="datafiltered.length > 0" :data="datafiltered" />
          <div v-else>
            Pas de villageois avec ces filtres
          </div>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
</template>

<script setup>
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, darkTheme, dateFrFR, frFR } from 'naive-ui'
import _filter from 'lodash/filter'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import Mosaique from './components/Mosaique.vue'
import Filters from './components/Filters.vue'
import Menu from './components/menu/Menu.vue'
import infoVillagers from './assets/villagers.json'
import { useGlobalStore } from './store/global'

const { selectedGender, selectedPersonality, selectedHobby, selectedSpecies } = storeToRefs(useGlobalStore())

const theme = ref(darkTheme)

const blackTheme = (color) => {
  if (color)
    theme.value = darkTheme
  else
    theme.value = null
}

const info = ref([...infoVillagers])

const datafiltered = computed(() => {
  if (info.value) {
    let array = info.value
    if (selectedGender.value !== 'all') {
      const plop = array
      array = _filter(plop, a => a.gender === selectedGender.value)
    }
    if (selectedPersonality.value !== 'all') {
      const plop2 = array
      array = _filter(plop2, a => a.personality === selectedPersonality.value)
    }
    if (selectedHobby.value !== 'all') {
      const plop3 = array
      array = _filter(plop3, a => a.hobby === selectedHobby.value)
    }
    if (selectedSpecies.value !== 'all') {
      const plop4 = array
      array = _filter(plop4, a => a.species === selectedSpecies.value)
    }
    return array
  }
  return []
})
</script>
