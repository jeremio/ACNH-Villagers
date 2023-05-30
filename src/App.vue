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
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, darkTheme, dateEnUS, dateFrFR, enUS, frFR } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Mosaique from './components/Mosaique.vue'
import Filters from './components/Filters.vue'
import Menu from './components/menu/Menu.vue'
import infoVillagers from './assets/villagers.json'
import { useGlobalStore } from './store/global'

const { locale } = useI18n()

const { selectedGender, selectedPersonality, selectedHobby, selectedSpecies } = storeToRefs(useGlobalStore())

const theme = ref(darkTheme)

function blackTheme(color) {
  if (color)
    theme.value = darkTheme
  else
    theme.value = null
}

const info = [...infoVillagers]

const mylocal = computed(() => {
  if (locale.value === 'fr')
    return frFR
  else
    return enUS
})

const mydate = computed(() => {
  if (locale.value === 'fr')
    return dateFrFR
  else
    return dateEnUS
})

const datafiltered = computed(() => {
  if (info) {
    // var startTime = performance.now()
    let array = info
    if (selectedGender.value !== 'all')
      array = array.filter(a => a.gender === selectedGender.value)

    if (selectedPersonality.value !== 'all')
      array = array.filter(a => a.personality === selectedPersonality.value)

    if (selectedHobby.value !== 'all')
      array = array.filter(a => a.hobby === selectedHobby.value)

    if (selectedSpecies.value !== 'all')
      array = array.filter(a => a.species === selectedSpecies.value)

    // var endTime = performance.now()
    // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return array
  }
  return []
})
</script>
