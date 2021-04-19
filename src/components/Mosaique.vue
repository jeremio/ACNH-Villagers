<template>
  <div>
    <v-container>
      <v-row class="text-center">
        <v-col v-for="villager in data" v-if="data.length > 0">
          <Item :villager="villager"></Item>
        </v-col>
        <v-col v-else>Pas de villageois avec ces filtres</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "Mosaique",
  components: {Item},
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
