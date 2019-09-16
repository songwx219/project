<template>
  <div class="header">
      <div class="left">sunny的管理平台</div>
      <div class="middle">
        <ul>
          <li><router-link to="/"><i class="fa fa-home"></i> 首页</router-link></li>
          <!-- <li><router-link to="/Member"><i class="fa fa-user"></i> 人员</router-link></li> -->
          <li><router-link to="/Store/Index"><i class="fa fa-shopping-bag"></i> 门店</router-link></li>
          <!-- <li><router-link to="item.href">首页</router-link></li>
          <li><router-link to="item.href">首页</router-link></li>
          <li><router-link to="item.href">用户</router-link></li>
          <li><router-link to="item.href">用户</router-link></li>
          <li><router-link to="item.href">用户</router-link></li>
          <li><router-link to="item.href">用户</router-link></li> -->
        </ul>
      </div>
      <div class="right">
        <strong>你好，<b class="c_b">admin</b>！<i class="fa fa-caret-down"></i></strong>
        <i class="fa fa-volume-up msg"></i>
        <span class="num">10</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      state:1
    }
  },
  mounted(){
    if(localStorage.sunny) this.state=localStorage.sunny.menuState||1
  },
  watch:{
    state:function(val){
      localStorage.sunny.menuState=val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
