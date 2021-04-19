<template>
  <div>
    <b>{{ $t('filters.genders') }}</b>
    <div>
      <input type="radio" id="allgender" name="gender" value="all"
             checked @click="toggle($event)">
      <label for="allgender">{{ $t('all') }}</label>
    </div>

    <div v-for="i in data">
      <input type="radio" :id="i" name="gender" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t('genders.' + i) }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gender",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggle(event) {
      this.emitter.emit("toggle-gender", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>
