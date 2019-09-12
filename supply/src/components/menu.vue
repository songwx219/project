<template>
  <div class="aside nav-box">
        <div class="userInfo">
            <div class="icon"><img /></div>
            <div class="info">
                <h6>{{ $store.state.user.userData.uname }}</h6>
                <p>上次登录：2019-08-08 12:00:00</p>
            </div>
        </div>
        <ul class="nav-list" v-for="item in menuData" :key='item.class'>
            <li class="tit"><span>{{item.class}}</span></li>
            <li 
                v-for="(list,index) in item.msg" :key='index'
                :class="[menucur&&menucur[0]==item.class&&menucur[1]==list.name?'active':'',navshow==item.class+list.name?'active':'']"
                 @click='changemenu(Boolean(list.child),[item.class,list.name])'
            >
                <router-link :to="list.child?'':list.url" >
                    <span class="float-right text-muted" v-if='list.child'>
                        <i class="el-icon-arrow-right text"></i>
                        <i class="el-icon-arrow-down text-active"></i>
                    </span>
                    <i :class="'icon '+list.icon" :title="list.name"></i>
                    <span>{{list.name}}</span>
                </router-link>
                <el-collapse-transition>
                    <ul v-if='list.child' v-show="navshow==item.class+list.name">
                        <li 
                            v-for="(navsub,i) in list.child" :key='i' 
                            :class="[menucur&&menucur[2]&&menucur[2]==navsub.name?'active':'']"
                            @click.stop='changemenu(false,[item.class,list.name,navsub.name])'
                        >
                            <router-link :to="navsub.url"><span>{{navsub.name}}</span></router-link>
                        </li>
                    </ul>
                </el-collapse-transition>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
        navshow: null,
        menuData:[
            {class:'产品管理',msg:[
                {name:'新增产品',url:'/product/add',icon:'el-icon-plus'},
                {name:'批量上传',url:'/product/batch',icon:'el-icon-upload2'},
                {name:'产品编辑',url:'/',icon:'el-icon-edit-outline',child:[{name:'全部商品',url:'/product/list/all/1'},{name:'已下架商品',url:'/product/list/offShelf/1'},{name:'库存警告商品',url:'/product/list/stock/1'}]}
            ]},
            {class:'订单管理',msg:[
                {name:'我的订单',url:'/',icon:'el-icon-s-order',child:[{name:'全部订单',url:'/order/list/all'},{name:'未付款订单',url:'/order/list/unpay'},{name:'待处理订单',url:'/order/list/todo'},{name:'待收货订单',url:'/order/list/unreceived'},{name:'已完成订单',url:'/order/list/completed'},{name:'已取消订单',url:'/order/list/cancelled'}]},
                // {name:'财务对账',url:'/',icon:'el-icon-s-finance',child:[{name:'全部对账单',url:'/'},{name:'已发货对账单',url:'/'},{name:'已收款对账单',url:'/'},{name:'已开票对账单',url:'/'}]}
            ]},
            {class:'系统管理',msg:[
                {name:'商家中心',url:'/',icon:'el-icon-user',child:[{name:'商家信息',url:'/user/detail'},{name:'品牌信息',url:'/user/brand'},{name:'修改密码',url:'/user/resetpwd'}]},
                {name:'消息中心',url:'/user/message',icon:'el-icon-bell'}
            ]}
        ]
    }
  },
  methods:{
     changemenu(state,arr){
          if(!state){
              this.$store.commit('setMenu',arr);
              return false;
          }
          else{
              if(arr[0]+arr[1]!=this.navshow) this.navshow=arr[0]+arr[1];
              else{
                  if(arr.length<3) this.navshow=null;
              }
          }
      }
  },
    computed:{
        menucur(){
            if(this.$store.state.menu.currentMenu.length>=2){
                this.navshow=this.$store.state.menu.currentMenu[0]+this.$store.state.menu.currentMenu[1];
                return this.$store.state.menu.currentMenu;
            }
            return false; 
        }
    }
}
</script>

<style scoped>
.nav-box{position: fixed; left: 0; top: 50px; bottom: 0; width: 200px; background: #007ed1; z-index: 9; overflow-y: auto; overflow-x: hidden; transition: all 0.5s;}
.nav-box a{color: #eee;}
.nav-box .nav-list{width: 200px; text-align: left; font-size: 14px; border-bottom: 2px solid #016ab1;}
.nav-box .nav-list>li{padding: 4px 20px; transition: all 0.5s;}
.nav-box .nav-list> li.tit{color: #aaa; border-bottom: 0; padding-top: 8px;}
.nav-box .nav-list> li a{display: block; height: 100%;}
.nav-box .nav-list .text-muted i{color: #ddd; line-height: 30px;}
.nav-box .nav-list .text-muted i.text-active{display: none;}
.nav-box li ul{padding-left: 30px;}
.nav-box .nav-list ul a{color: #ddd; font-size: 12px; padding: 2px; line-height: 20px; font-weight: 400;}
.nav-box .nav-list> li:hover,.nav-box .nav-list> li.active{background-color: #0394f5; font-weight: 700;}
.nav-box .nav-list> li.tit:hover{background: none; font-weight: 400;}
.nav-box .nav-list> li:hover>a,.nav-box .nav-list> li.active>a{color: #fff;}
.nav-box .nav-list> li.active .text-active{display: block;}
.nav-box .nav-list> li.active .text{display: none;}
.nav-box .nav-list li ul li:hover a,.nav-box .nav-list li ul li.active a{color: #eee; font-weight: 700;}
.nav-box .nav-list> li span{display: inline-block; vertical-align: middle;}
.nav-box a .icon{display: inline-block; color: #ccc; width: 30px; height: 30px;line-height: 30px; font-size: 22px; vertical-align: middle;}
.nav-box .userInfo {text-align: center;padding-bottom: 10px; color: #fff; border-bottom: 2px solid #016ab1;}
.nav-box .userInfo .icon{width: 45px; height: 45px; margin: 10px auto; border-radius: 50%; overflow: hidden; border: 2px solid #99ccff;}
.nav-box .userInfo .icon img{width: 50px; height: 50px;}
.nav-box .userInfo h5{font-size: 18px; font-weight: 700;}
.nav-box .userInfo h6{font-size: 15px; font-weight: 700;}
.nav-box .userInfo p{font-size: 12px; transform: scale(0.9);}
.nav-box .userInfo .btn{font-size: 12px; color: #fff;}
</style>
