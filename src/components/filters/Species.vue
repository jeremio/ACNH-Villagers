<template>
  <div>
    <b>{{ $t('filters.species') }} </b>
    <div>
      <input type="radio" id="allspecies" name="species" value="all"
             checked @click="toggle($event)">
      <label for="allspecies">{{ $t('all') }}</label>
    </div>

    <div v-for="i in props.data">
      <input type="radio" :id="i" name="species" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('species.' + i) }}</label>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const store = useStore()

const toggle = (event) => {
  store.dispatch('setSelectedSpecies', event.target.value)
}

</script>
