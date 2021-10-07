<template>
  <div class="mosaique">
    <div v-for="villager in props.data">
      <Item class="item" :villager="villager"></Item>
    </div>
  </div>
</template>

<script setup>
import Item from "./Item.vue"

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

</script>

<style scoped>

.mosaique {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-around;
  height: fit-content;
}

.item {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
</style>
