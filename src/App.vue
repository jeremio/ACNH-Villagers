<template>
  <div id="app">
    <ErrorBoundary>
      <template #default>
        <RouterView />
      </template>
    </ErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: 'FiraCode', monospace;
}
</style>
