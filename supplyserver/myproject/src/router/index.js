import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router=new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/404', component: () => import('@/components/error/404') },
    { path: '/401', component: () => import('@/components/error/401') },
    { path: '*', redirect: '/404' },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/main'),
      children:[
        { path: '/', component: () => import('@/views/index/index') },
        { path: '/product',name: 'Product', component: () => import('@/views/product/index'),children:[
          { path: '/product/add',name: 'ProAdd', component: () => import('@/views/product/add') },
          { path: '/product/batch',name: 'ProBatch', component: () => import('@/views/product/batch') },
          { path: '/product/list/:protype/:page',name: 'ProList', component: () => import('@/views/product/list'),props: true },
        ]},
        { path: '/order',name: 'Order', component: () => import('@/views/order/index') ,children:[
          { path: '/order/list/:orderType',name: 'OrderAll', component: () => import('@/views/order/allorder'),props: true},
          { path: '/order/todo',name: 'OrderTodo', component: () => import('@/views/order/todo') }
        ]},
        { path: '/user',name: 'User', component: () => import('@/views/user/index') ,children:[
          { path: '/user/message',name: 'Message', component: () => import('@/views/user/message') },
          { path: '/user/detail',name: 'UserDetail', component: () => import('@/views/user/myinfo') },
          { path: '/user/resetpwd',name: 'UserResetpwd', component: () => import('@/views/user/resetpwd') },
          { path: '/user/brand',name: 'UserBrand', component: () => import('@/views/user/brand') },
        ]},
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }
  ]
})

// 导航守卫，非登录状态先登录
router.beforeEach((to, from, next) => {
  let tmp = localStorage.getItem('user');
  // 如果tmp存在，判断是否过期，若过期则清除本地存储的用户信息，重新登录；
  if(tmp ){
    let expiratDate=1000*60*60*4;
    let nowDate=new Date().getTime();
    let loginDate=JSON.parse(tmp).timer;
    if(nowDate-loginDate>expiratDate){
      localStorage.removeItem('user');
      tmp = localStorage.getItem('user');
    }
  }
  if (!tmp && to.name !== 'Login') {
    Vue.prototype.$message({message:'您需要先登录哦！',type: 'warning'})
    next({ path: '/login' })
    return
  }
  next()
})

export default router
