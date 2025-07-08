<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>

<script setup>
import { RouterView } from 'vue-router'
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'
</script>
