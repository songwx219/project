// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//注册全局组件
import {Message,MessageBox,Pagination,Dialog,CollapseTransition} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Pagination)
Vue.use(Dialog)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
import '@/assets/css/reset.css'
// import registerComponents from './utils/registerComponents'
// import mandMobile from 'mand-mobile'
// import 'mand-mobile/lib/mand-mobile.css'
// Vue.use(mandMobile)
// Vue.use(registerComponents)

//引入vuex状态管理
import store from './store'
import router from './router'
// 请求axios拦截器
import requestPlugin from './http'
Vue.use(requestPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
