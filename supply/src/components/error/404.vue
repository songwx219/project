<template>
  <div class="page404">
    <header-y></header-y>
    <div class="img">
      <img src="static/images/404.png" alt="">
    </div>
    <div class="bar text-center">
      <router-link class="btn btn-link btn-lg" to="/">返回首页</router-link>
      <button class="btn btn-link btn-lg ml-5" v-if='historyStatus>1' @click="$router.go(-1)">返回上一页</button>
    </div>
  </div>
</template>

<script>
import headerY from '@/components/header'
export default {
  name: 'Page404',
  components:{headerY},
  data () {
    return {
      historyStatus:0
    }
  },
  created(){
    this.historyStatus=window.history.length;
  }
}
</script>

<style scoped>
.page404{width: 100%; min-height: 600px; background: #f0f0f0;}
.page404 .img{width: 310px; margin: 0 auto; padding: 120px 0 80px;}
</style>
