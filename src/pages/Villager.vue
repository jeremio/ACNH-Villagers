<template>
  <div class="villager-content">
    <div>
      <img v-if="icon" :src="icon" width="125" style="border: thin solid black;"/>
      <div>
        <div> {{ $t('filters.gender') }} : {{ $t('genders.' + gender) }}</div>
        <div> {{ $t('filters.hobby') }} : {{ $t('hobbies.' + hobby) }}</div>
        <div> {{ $t('filters.personality') }} : {{ $t('personality.' + personality) }}</div>
        <div> {{ $t('filters.specie') }} : {{ $t('species.' + species) }}</div>
        <div> {{ $t('filters.birthday') }} : {{ birthdayString }}</div>
      </div>
    </div>
    <div>
      <div>
        <div> {{ $t('names') }} :</div>
        <ul>
          <li v-for="(value, name) in names">{{ name }} : {{ value }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import _get from "lodash/get";
import _keys from 'lodash/keys'
import _pick from 'lodash/pick'
import {computed, toRefs} from 'vue'

const props = defineProps({
  villager: {
    type: Object,
    required: true
  },
  left: {
    type: String,
    required: true
  },
  top: {
    type: String,
    required: true
  }
})

const { villager, left, top } = toRefs(props);

const image = computed(() => {
  return _get(props.villager, 'image_uri', null)
})

const icon = computed(() => {
  return _get(props.villager, 'icon_uri', null)
})

const hobby = computed(() => {
  return _get(props.villager, 'hobby', null)
})

const gender = computed(() => {
  return _get(props.villager, 'gender', null)
})

const birthdayString = computed(() => {
  return _get(props.villager, 'birthday-string', null)
})

const species = computed(() => {
  return _get(props.villager, 'species', null)
})

const personality = computed(() => {
  return _get(props.villager, 'personality', null)
})

const names = computed(() => {
  const model = {
    "name-USen": null,
    "name-USes": null,
    "name-EUfr": null,
    "name-CNzh": null,
    "name-JPja": null,
    "name-KRko": null,
    "name-EUru": null,
  }
  let values = _pick(props.villager.name, _keys(model))

  Object.keys(values).forEach(function (k) {
    let tmp = k.substring(7)
    values[tmp] = values[k]
    delete values[k]
  })
  return values
})

</script>

<style scoped>
.villager-content {
  position: absolute;
  left: v-bind(left);
  top: v-bind(top);
  border: thick #32a1ce;
  background-color: aliceblue;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}

ul {
  padding-left: 24px;
  list-style-type: none;
}
</style>
