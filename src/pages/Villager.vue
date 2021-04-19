<template>
  <v-app>
    <v-container>
      <v-row justify="start">
        <v-col md="2">
          <v-img v-if="image" :src="image" width="125"/>
        </v-col>
        <v-col md="2">
          <v-img v-if="icon" :src="icon" width="125" style="border: thin solid black;"/>
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col md="2">
          <div> {{ $t('names') }} :</div>
          <ul>
            <li v-for="(value, name) in names">{{ name }} : {{ value }}</li>
          </ul>
        </v-col>
        <v-col md="2">
          <div> {{ $t('filters.gender') }} : {{ $t('genders.' + gender) }}</div>
          <div> {{ $t('filters.hobby') }} : {{ $t('hobbies.' + hobby) }}</div>
          <div> {{ $t('filters.personality') }} : {{ $t('personality.' + personality) }}</div>
          <div> {{ $t('filters.specie') }} : {{ $t('species.' + species) }}</div>
          <div> {{ $t('filters.birthday') }} : {{ birthdayString }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import info from '../assets/villagers.json'
import _filter from 'lodash/filter'
import _get from "lodash/get";
import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

export default {
  name: "Villager",
  computed: {
    villager() {
      const id = Number(this.$route.params.id)
      return _filter(info, a => a.id === id)[0]
    },
    image() {
      return _get(this.villager, 'image_uri', null)
    },
    icon() {
      return _get(this.villager, 'icon_uri', null)
    },
    hobby() {
      return _get(this.villager, 'hobby', null)
    },
    gender() {
      return _get(this.villager, 'gender', null)
    },
    birthdayString() {
      return _get(this.villager, 'birthday-string', null)
    },
    species() {
      return _get(this.villager, 'species', null)
    },
    personality() {
      return _get(this.villager, 'personality', null)
    },
    names() {
      const model = {
        "name-USen": null,
        "name-USes": null,
        "name-EUfr": null,
        "name-CNzh": null,
        "name-JPja": null,
        "name-KRko": null,
        "name-EUru": null,
      }
      let values = _pick(this.villager.name, _keys(model))

      Object.keys(values).forEach(function (k) {
        let tmp = k.substring(7)
        values[tmp] = values[k]
        delete values[k]
      })
      return values
    }
  }
}
</script>

<style scoped>

</style>
