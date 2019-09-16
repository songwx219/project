<template>
  <div class="container">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import Header from '@/components/head'

export default {
  name: 'Store',
  components:{
    Header
  },
  data () {
    return {
      
    }
  }
}
</script>

