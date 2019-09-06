<template>
  <div class="main">
      <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
      <div class="tabbar">
          <ul class="nav nav-tabs">
            <li class="nav-item" v-for="(item,index) in tabbarData" :key='index' @click='changeMenu(item)'>
                <router-link :class="['nav-link',currentMenu[2]==item.name?'active':'']" :to="item.url">{{item.name}}</router-link>
            </li>
          </ul>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
        tabbarData:[{name:'全部订单',url:'/order/list/all'},{name:'未付款订单',url:'/order/list/unpay'},{name:'待处理订单',url:'/order/list/todo'},{name:'待收货订单',url:'/order/list/unreceived'},{name:'已完成订单',url:'/order/list/completed'},{name:'已取消订单',url:'/order/list/cancelled'}]
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  },
  methods:{
      changeMenu(data){
        var arr=[...this.currentMenu]
        arr.splice(arr.length-1,1,data.name);
        this.$store.commit('setMenu',arr)
      }
  }
}
</script>

<style scoped>
.nav-tabs{margin-top: 20px;;}
.nav-tabs .nav-link.active{box-shadow: 0 0 5px rgba(0, 0, 0, .3); position: relative;}
.nav-tabs .nav-link.active::after{content: ''; display: block; width: 100%; height: 10px; position: absolute; left: 0; bottom: -10px; background: #fff;}
.section>.main .msgbox{border-radius: 0 0 10px 10px}
</style>