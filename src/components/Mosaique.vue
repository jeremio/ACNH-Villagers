<template>
  <div class="mosaique">
    <NImageGroup :theme-overrides="imageGroupThemeOverrides">
      <NSpace>
        <template v-for="villager in props.data" :key="villager">
          <NPopover trigger="hover" raw>
            <template #trigger>
              <NImage
                lazy :src="image(villager)" width="100" height="100"
                :alt="name(villager)"
                :show-toolbar-tooltip="true"
              >
                <template #placeholder>
                  <div
                    style="
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #8882;
          "
                  >
                    {{ name(villager) }}
                  </div>
                </template>
              </NImage>
            </template>
            <div
              style="
                  width: 175px;
                  padding: 10px;
                  background-color: #3c817f;
                  transform-origin: inherit;
            "
            >
              <div> {{ name(villager) }}</div>
              <div> {{ $t('filters.gender') }} : {{ $t(`genders.${gender(villager)}`) }}</div>
              <div> {{ $t('filters.hobby') }} : {{ $t(`hobbies.${hobby(villager)}`) }}</div>
              <div> {{ $t('filters.personality') }} : {{ $t(`personality.${personality(villager)}`) }}</div>
              <div> {{ $t('filters.specie') }} : {{ $t(`species.${species(villager)}`) }}</div>
              <div> {{ $t('filters.birthday') }} : {{ birthdayString(villager) }}</div>
            </div>
          </NPopover>
        </template>
      </NSpace>
    </NImageGroup>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { NImage, NImageGroup, NPopover, NSpace, useThemeVars } from 'naive-ui'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

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

const { locale } = useI18n()

function name(villager) {
  let name = villager.name?.['name-EUfr'] ?? 'inconnu'
  if (locale.value === 'en')
    name = villager.name?.['name-EUen'] ?? 'inconnu'

  return name
}

function image(villager) {
  return villager?.image_uri ?? null
}

function hobby(villager) {
  return villager?.hobby ?? null
}

function gender(villager) {
  return villager?.gender ?? null
}

function birthdayString(villager) {
  return villager?.['birthday-string'] ?? null
}

function species(villager) {
  return villager?.species ?? null
}

function personality(villager) {
  return villager?.personality ?? null
}
</script>
