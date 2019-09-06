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
    if(data){
      console.log(data)
      this.setUserData(JSON.parse(data))
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
