<template>
    <div :class="['yjs-box',$store.state.menu.menustate?'active':'']">
        <header-y></header-y>
        <menu-y v-show='!$store.state.menu.menustate'></menu-y>
        <menu-c v-show='$store.state.menu.menustate'></menu-c>
        <div class="section">
            <transition name="scale">
              <router-view></router-view>
            </transition>
            <footer-y></footer-y>
        </div>
    </div>
</template>

<script>
import headerY from '@/components/header'
import menuY from '@/components/menu'
import menuC from '@/components/menu-c'
import footerY from '@/components/footer'
export default {
  name: 'Home',
  components:{headerY,menuY,menuC,footerY},
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>

</style>
