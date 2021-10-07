<template>
  <div class="personnality">
    <b>{{ $t('filters.personalities') }} </b>
    <div>
      <input type="radio" id="allpersonality" name="personality" value="all"
             checked @click="toggle($event)">
      <label for="allpersonality">{{ $t('all') }}</label>
    </div>

    <div v-for="i in props.data">
      <input type="radio" :id="i" name="personality" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('personality.' + i) }}</label>
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
  store.dispatch('setSelectedPersonality', event.target.value)
}


</script>
