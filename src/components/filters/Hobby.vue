<template>
  <div class="hobby">
    <b>{{ $t('filters.hobbies') }} </b>
    <div>
      <input type="radio" id="allhobby" name="hobby" value="all"
             checked @click="toggle($event)">
      <label for="allhobby">{{ $t('all') }}</label>
    </div>

    <div v-for="i in props.data">
      <input type="radio" :id="i" name="hobby" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t("hobbies." + i) }}</label>
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
  store.dispatch('setSelectedHobby', event.target.value)
}

</script>
