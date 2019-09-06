<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  methods:{
    ...mapActions(['setUserData'])
  },
  mounted(){
    var data=localStorage.getItem('user')
    var menu=localStorage.getItem('menu')
    if(data){
      this.setUserData(JSON.parse(data))
    }
    if(menu){
      this.$store.commit('setMenu',JSON.parse(menu).menu);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
