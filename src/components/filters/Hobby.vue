<template>
  <div class="hobby">
    <b>{{ $t('filters.hobbies') }} </b>
    <div>
      <input type="radio" id="allhobby" name="hobby" value="all"
             checked @click="toggle($event)">
      <label for="allhobby">{{ $t('all') }}</label>
    </div>

    <div v-for="i in data">
      <input type="radio" :id="i" name="hobby" :value="i" @click="toggle($event)">
      <label :for="i">{{ $t("hobbies." + i) }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hobby",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggle(event) {
      this.emitter.emit("toggle-hobby", event.target.value);
    }
  }
}
</script>

<style scoped>

</style>
