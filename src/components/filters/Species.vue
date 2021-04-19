<template>
  <div>
    <b>{{ $t('filters.species') }} </b>
    <div>
      <input type="radio" id="allspecies" name="species" value="all"
             checked @click="toggle($event)">
      <label for="allspecies">{{ $t('all') }}</label>
    </div>

    <div v-for="i in data">
      <input type="radio" :id="i" name="species" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('species.' + i) }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Species",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggle(event) {
      this.emitter.emit("toggle-species", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>
