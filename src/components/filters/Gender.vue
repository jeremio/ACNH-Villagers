<template>
  <div>
    <b>{{ $t('filters.genders') }}</b>
    <div>
      <input type="radio" id="allgender" name="gender" value="all"
             checked @click="toggle($event)">
      <label for="allgender">{{ $t('all') }}</label>
    </div>

    <div v-for="i in props.data">
      <input type="radio" :id="i" name="gender" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('genders.' + i) }}</label>
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
  store.dispatch('setSelectedGender', event.target.value)
}

</script>
