<template>
  <div class="tabbar">
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="(item,index) in tabbarData" :key='index' @click='changeMenu(item)'>
                <router-link :class="['nav-link',protype==item.url.split('/')[3].split('?')[0]?'active':'']" :to="item.url">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'TabBar',
  props:['protype'],
  data () {
    return {
        tabbarData:[{name:'全部商品',url:'/product/list/all/1'},{name:'已下架商品',url:'/product/list/offShelf/1'},{name:'库存警告商品',url:'/product/list/stock/1'}]
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
  },
  filters:{
      barType(val){
          var arr=val.split('/')
          return arr[2]
      }
  }
}
</script>

<style scoped>
.nav-tabs{margin-top: 20px;;}
.nav-tabs .nav-link.active{box-shadow: 0 0 5px rgba(0, 0, 0, .3); position: relative;}
.nav-tabs .nav-link.active::after{content: ''; display: block; width: 100%; height: 10px; position: absolute; left: 0; bottom: -10px; background: #fff;}
</style>