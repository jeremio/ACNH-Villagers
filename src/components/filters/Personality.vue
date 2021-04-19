<template>
  <div class="personnality">
    <b>{{ $t('filters.personalities') }} </b>
    <div>
      <input type="radio" id="allpersonality" name="personality" value="all"
             checked @click="toggle($event)">
      <label for="allpersonality">{{ $t('all') }}</label>
    </div>

    <div v-for="i in data">
      <input type="radio" :id="i" name="personality" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('personality.' + i) }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personality",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggle(event) {
      this.emitter.emit("toggle-personality", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>
