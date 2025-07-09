<template>
  <NConfigProvider v-if="hasError" :theme="darkTheme">
    <NLayout style="height: 100vh">
      <NLayoutHeader style="height: 64px; padding: 24px" bordered>
        ACNH Villagers
      </NLayoutHeader>
      <NLayout position="absolute" style="top: 64px; bottom: 64px">
        <NLayout content-style="padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <NAlert :title="t('error.boundaryTitle')" type="error">
            <p>{{ t('error.boundaryMessage') }}</p>
            <NButton type="primary" @click="reloadPage">
              {{ t('error.reload') }}
            </NButton>
          </NAlert>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
  <slot v-else />
</template>

<script setup lang="ts">
import { darkTheme, NAlert, NButton, NConfigProvider, NLayout, NLayoutHeader } from 'naive-ui'
import { onErrorCaptured, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const hasError = ref(false)

onErrorCaptured((err, instance, info) => {
  console.error('Error captured:', err, instance, info)
  hasError.value = true
  return false // Prevent the error from propagating further
})

function reloadPage() {
  window.location.reload()
}
</script>
