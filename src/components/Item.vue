<template>
  <div id="oneItem">
    <div
        @mousemove="updateCoordinates"
        @mouseover="hover = true"
        @mouseleave="hover = false">
      {{ name }}
    </div>
    <img loading="lazy" v-if="image" :src="image" width="125" height="125" :alt="name"/>
    <villager :villager="props.villager" :left="x" :top="y" v-if="hover"></villager>
  </div>
</template>

<script setup>
import _get from 'lodash/get'
import Villager from "../pages/Villager.vue";
import { useI18n } from "vue-i18n";
import {computed, ref} from 'vue'

const props = defineProps({
  villager: {
    type: Object,
    required: true
  }
})

const { locale } = useI18n({
  inheritLocale: true
})

const hover = ref(false)
const x = ref("0px")
const y = ref("0px")

const name = computed(() => {
  let name = _get(props.villager, 'name.name-EUfr', 'inconnu')
  if (locale.value === 'en') {
    name = _get(props.villager, 'name.name-EUen', 'inconnu')
  }
  return name

})

const image = computed(() =>
    _get(props.villager, 'image_uri', null)
)

const updateCoordinates = (event) => {
  if (event && hover) {
    x.value = event.clientX + 5 + "px";
    y.value = event.clientY + 2 + 'px';
  }
}

</script>

<style scoped>
#oneItem {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 12px;
}
</style>
