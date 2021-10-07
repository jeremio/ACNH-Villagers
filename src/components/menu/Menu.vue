<template>
  <div class="menu">
    <h2 class="title">{{ $t('title') }}</h2>
    <div class="right">
      <github></github>
      <lang></lang>
    </div>
  </div>
</template>

<script setup>
import Github from "./github/Github.vue"
import Lang from "./lang/Lang.vue"
</script>

<style lang="scss" scoped>

.menu {
  display: grid;
  grid-template-columns: 1fr repeat(1, auto) 1fr;
  grid-column-gap: 5px;
  justify-items: center;

  .title {
    grid-column-start: 2;
  }

  .right {
    margin-left: auto;
    margin-right: 15px;
  }
}
</style>
