<template>
  <div>
    <header><img src="/static/images/logo.png" alt=""></header>
    <section class="login-box">
        <div class="login container clearfix">
            <div class="logo">
                <img src="/static/images/ad-login-03.png" alt="">
            </div>
            <div class="main">
                <h2>用户登录</h2>
                <p class="text-danger" v-show='user.errmsg!=""'>{{ user.errmsg }}</p>
                <div :class="['group clearfix',user.errstatus==0?'error':'']">
                    <div class="icon float-left"></div>
                    <input class="float-left" type="text" id="username" v-model.trim='user.username'>
                </div>
                <div class="group clearfix">
                    <div class="icon pwd float-left"></div>
                    <input :class="['float-left',user.errstatus==1?'error':'']" type="password" id="password" v-model.trim='user.password'>
                </div>
                <input type="button" class="btn btn-primary btn-block btn-lg" value="登录" @click='loginOnClick'>
                <p class="forget"><a href="#">忘记密码？</a></p>      
            </div>
        </div>
    </section>
    <footer>songwx 版权所有</footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user:{username:'',password:'',errmsg:'',errstatus:null}
    }
  },
  methods:{
    loginOnClick () {
      let params = {uname: this.user.username,upwd: this.user.password}
      this.$http.post('/user/login',params).then(res=>{
        if(res.data.status!=2){
          this.user.errmsg=res.data.status==0?'您输入的用户名不存在！':'您输入的密码不正确！'
          this.user.errstatus=res.data.status;
          this.$message.error(this.user.errmsg);
        }else{
          this.user.errmsg='';
          let data={sid:res.data.sid,uname:this.user.username,sessionid:res.data.sessionid};
          this.setUserData(data);
          data.timer=new Date().getTime();
          localStorage.setItem('user',JSON.stringify(data));
          this.$message({message:'恭喜您，登录成功！',type: 'success'});
          this.$router.push('/')
        } 
      })
    },
    allDistanceAjax () {
      this.$http.get('/trip/allDistance', {}).then(res => {
        this.setUserData(res.data.data)
      })
    },
    ...mapActions(['setUserData'])
  }
}
</script>

<style scoped>
header{padding: 10px;}

.login-box{width: 100%; height: 500px; overflow: hidden; position: relative; background: url('/static/images/ad-bg.png') no-repeat center; background-size: 100% 100%;}
.login{position: relative;top: 50%; height: 400px; width: 1200px; margin: 0 auto;margin-top: -200px;}
.login .main{width: 410px; height: 400px; padding: 30px; font-size: 16px; float: right; border-radius: 10px; background: rgba(255, 255, 255, 0.7);}
.login .main h2{font-size: 28px; color: #8c8c8c; margin: 30px 0;}
.login .main .group{height: 45px; margin-bottom: 30px;background: #fff; border: 1px solid #999; }
.login .main .group.error{border: 1px solid #f00;}
.login .main .group .icon{width: 50px; height: 100%; margin-right: 15px; background: url('/static/images/login-01.png') no-repeat center;}
.login .main .group .icon.pwd{background-image: url('/static/images/login-02.png');}
.login .main .group input{line-height: 42px; margin-top: 1px; font-size: 14px; width: 280px; border: 0; color: #333; padding: 0px;}
.login .main p{margin: 10px 0;}
.login .main a{color: #8c8c8c;}
.login .main .el-button{font-size: 20px; margin-top: 30px; margin-bottom: 40px; display: block; width: 100%; margin: 20px 0;}
.login .logo{padding: 76px 0 0 76px; float: left;}
.forget{text-align: left;}
footer{line-height: 40px; text-align: center;}
</style>
