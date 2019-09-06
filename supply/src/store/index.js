import Vue from 'vue'
import vuex from 'vuex'

/* 引入各部分组件 */
import user from '@/store/modules/user'
import menu from '@/store/modules/menu'
import product from '@/store/modules/product'
import order from '@/store/modules/order'
/* End 引入各部分组件 */

Vue.use(vuex)

export default new vuex.Store({

  modules: {
    user,
    menu,
    product,
    order
  }
})

