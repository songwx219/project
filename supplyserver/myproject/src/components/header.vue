<template>
  <header class="header clearfix">
        <div class="float-left">
            <div class="logo float-left">
              <router-link to='/'><img src="/static/images/logo.png" alt=""></router-link>
            </div>
            <a class="menu-btn float-right" href="javascript:;" @click='$store.commit("changemenu")'><i></i></a>
        </div>
        <div class="float-right">
            <div class="lings float-left"><router-link to='/message'><i></i><span v-if="msgnew"></span></router-link></div>
            <div class="user float-left">
                <span>Hi, {{ $store.state.user.userData.uname }}</span>
                <a href="javascript:;" @click='exit'><i class="exit"></i></a>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      msgnew:true,
    }
  },
  methods:{
    exit(){
        localStorage.removeItem("user");
        this.setUserData({uid:'',uname:''})
        this.$store.commit('setMenu',[]);
        this.$message({message:'已退出！',type: 'success'});
        this.$router.push('/login')
    },
    ...mapActions(['setUserData'])
  }
}
</script>

<style scoped>

</style>
