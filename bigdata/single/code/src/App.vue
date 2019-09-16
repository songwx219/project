<template>
  <div id="app">
    <transition name="slide">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/css/fonts/font-awesome.min.css";
  @import "./assets/css/reset";
  @import "./assets/css/style";
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
