<template>
  <div class="mosaique">
    <NImageGroup :theme-overrides="imageGroupThemeOverrides">
      <NSpace>
        <!--        <template > -->
        <!--          <NPopover trigger="hover" raw> -->
        <!--            <template #trigger> -->
        <NImage
          v-for="villager in props.data" :key="villager"
          :lazy="true"
          :src="image(villager)" width="100" height="100"
          :alt="name(villager)"
          :title="name(villager)"
        />
        <!--                <template #placeholder> -->
        <!--                  <div -->
        <!--                    style=" -->
        <!--            width: 100px; -->
        <!--            height: 100px; -->
        <!--            display: flex; -->
        <!--            align-items: center; -->
        <!--            justify-content: center; -->
        <!--            background-color: #8882; -->
        <!--          " -->
        <!--                  > -->
        <!--                    {{ name(villager) }} -->
        <!--                  </div> -->
        <!--                </template> -->
        <!--              </NImage> -->
        <!--            </template> -->
        <!--            <div -->
        <!--              style=" -->
        <!--                  width: 175px; -->
        <!--                  padding: 10px; -->
        <!--                  background-color: #3c817f; -->
        <!--                  transform-origin: inherit; -->
        <!--            " -->
        <!--            > -->
        <!--              <div> {{ name(villager) }}</div> -->
        <!--              <div> {{ $t('filters.gender') }} : {{ $t(`genders.${gender(villager)}`) }}</div> -->
        <!--              <div> {{ $t('filters.hobby') }} : {{ $t(`hobbies.${hobby(villager)}`) }}</div> -->
        <!--              <div> {{ $t('filters.personality') }} : {{ $t(`personality.${personality(villager)}`) }}</div> -->
        <!--              <div> {{ $t('filters.specie') }} : {{ $t(`species.${species(villager)}`) }}</div> -->
        <!--              <div> {{ $t('filters.birthday') }} : {{ birthdayString(villager) }}</div> -->
        <!--            </div> -->
        <!--          </NPopover> -->
        <!--        </template> -->
      </NSpace>
    </NImageGroup>
  </div>
</template>

<script setup>
import _get from 'lodash/get'
import { useI18n } from 'vue-i18n'

import { computed } from 'vue'
import { NImage, NImageGroup, NSpace, useThemeVars } from 'naive-ui'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const { locale } = useI18n()

function name(villager) {
  let name = _get(villager, 'name.name-EUfr', 'inconnu')
  if (locale.value === 'en')
    name = _get(villager, 'name.name-EUen', 'inconnu')

  return name
}

function image(villager) {
  return _get(villager, 'image_uri', null)
}

const imageGroupThemeOverrides = computed(() => {
  const { popoverColor, boxShadow2, textColor2, borderRadius } = useThemeVars().value
  const themeOverrides = {
    toolbarColor: popoverColor,
    toolbarBoxShadow: boxShadow2,
    toolbarIconColor: textColor2,
    toolbarBorderRadius: borderRadius,
  }
  return themeOverrides
})

// const hobby = (villager) => {
//   return _get(villager, 'hobby', null)
// }
//
// const gender = (villager) => {
//   return _get(villager, 'gender', null)
// }
//
// const birthdayString = (villager) => {
//   return _get(villager, 'birthday-string', null)
// }
//
// const species = (villager) => {
//   return _get(villager, 'species', null)
// }
//
// const personality = (villager) => {
//   return _get(villager, 'personality', null)
// }
</script>
