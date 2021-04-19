<template>
  <div id="filters">
    <Gender :data="genders"></Gender>
    <Hobby :data="hobbies"></Hobby>
    <Personality :data="personalities"></Personality>
    <Species :data="species"></Species>
  </div>
</template>

<script>
import Gender from "./filters/Gender.vue";
import Hobby from "./filters/Hobby.vue";
import Personality from "./filters/Personality.vue";
import Species from "./filters/Species.vue";
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'


export default {
  name: "Filters",
  components: {Species, Personality, Hobby, Gender},
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    genders() {
      return _uniq(_map(this.data, 'gender'))
    },
    hobbies() {
      return _uniq(_map(this.data, 'hobby'))
    },
    personalities() {
      return _uniq(_map(this.data, 'personality'))
    },
    species() {
      return _uniq(_map(this.data, 'species'))
    }
  }
}
</script>

<style scoped>
#filters {
  border: thin solid black;
  min-width: 150px;
  background: #60BE8C;
  text-align: start;

}

#filters > div {
  margin: 10px 0 15px 10px;
}
</style>
