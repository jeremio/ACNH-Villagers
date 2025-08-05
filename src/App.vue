<template>
  <div id="app">
    <ErrorBoundary>
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="app-loading">
            <NSpin size="large">
              <template #description>
                {{ t('loading') }}
              </template>
            </NSpin>
          </div>
        </template>
      </Suspense>
    </ErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'

const { t } = useI18n()
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: 'FiraCode', monospace;
}

.app-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
</style>
