<template>
  <Home/>
</template>


<script setup>
import Home from "./pages/Home.vue";
</script>

<style>

* {
  padding: 0;
  margin: 0;
}

*, ::after, ::before {
  background-repeat: no-repeat;
  box-sizing: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  font-size: 16px;
  margin-top: 20px;
  line-height: 1.5;
}

a {
  text-decoration: none;
}

label {
  margin-left: 2px;
}
</style>
