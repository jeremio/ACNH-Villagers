<template>
  <div class="oneItem">
    <router-link :to="/villager/+id">{{ name }}</router-link>
    <v-img v-if="image" :src="image" width="125" :alt="name" :key="image" class="mx-auto"/>
  </div>
</template>

<script>
import _get from 'lodash/get'

export default {
  name: "Item.vue",
  props: {
    villager: {
      type: Object,
      default: null
    }
  },
  computed: {
    name() {
      let name = _get(this.villager, 'name.name-EUfr', 'inconnu')
      if (this.$i18n.locale === 'en') {
        name = _get(this.villager, 'name.name-EUen', 'inconnu')
      }
      return name
    },
    image() {
      return _get(this.villager, 'image_uri', null)
    },
    id() {
      return _get(this.villager, 'id', null)
    }
  }
}
</script>

<style scoped>
.oneItem {
  justify-content: center;
}
</style>
