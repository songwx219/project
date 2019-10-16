<template>
  <div>
    <transition name="scale">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>

</style>