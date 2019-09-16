import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: ()=>import('@/pages/Index')
    },
    // {
    //   path: '/Member',
    //   name: 'Member',
    //   component: ()=>import('@/pages/member/Index')
    // },
    {
      path: '/Store',
      name: 'Store',
      component: ()=>import('@/pages/store/Index'),
      redirect:to=>{return '/Store/Index'},
      children:[
        {path: '/',redirect:to=>{return '/Store/Index'}},
        {path: '/Store/Index',component: ()=>import('@/pages/store/main'),name: 'StoreMain'},
        {path: '/Store/Detail',component: ()=>import('@/pages/store/detail'),name: 'StoreDetail'}
      ]
    }
  ]
})
