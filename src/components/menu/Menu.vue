<template>
  <div class="menu">
    <div class="title">
      {{ $t('title') }}
    </div>
    <div class="right">
      <NSpace>
        <NButton @click="blackTheme(true)">
          Dark
        </NButton>
        <NButton @click="blackTheme(false)">
          Light
        </NButton>
        <Lang />
      </NSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import Lang from '~/components/menu/lang/Lang.vue'

const emit = defineEmits(['blackTheme'])

const blackTheme = (color: boolean) => emit('blackTheme', color)
</script>

<style scoped>
.menu {
  display: grid;
  grid-template-columns: 1fr repeat(1, auto) 1fr;
  grid-column-gap: 5px;
  justify-items: center;

  .title {
    grid-column-start: 2;
    font-size: large;
  }

  .right {
    margin-left: auto;
    margin-right: 18px;
  }
}
</style>
