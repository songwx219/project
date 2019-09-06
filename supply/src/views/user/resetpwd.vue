<template>
    <div class="main">
        <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
        <div class="msgbox">
            <table>
                <tbody>
                    <tr>
                        <th width="120px">公司名称：</th>
                        <td>{{$store.state.user.userData.uname}}</td>
                    </tr>
                    <tr>
                        <th><span class="text-danger">*</span> 新密码：</th>
                        <td><input type="password" name="" class="form-control" v-model.trim="newPwd"></td>
                    </tr>
                    <tr>
                        <th><span class="text-danger">*</span> 重复新密码：</th>
                        <td><input type="password" name="" class="form-control" v-model.trim="rePwd"></td>
                    </tr>
                    <tr v-if="error">
                        <th></th>
                        <td><span class="text-danger">{{ errorMsg }}</span></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td> <button class="btn btn-primary btn-lg" @click="submitModify">确定修改</button></td>
                    </tr>
                </tbody>
            </table>
           
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserResetpwd',
  data () {
    return {
      newPwd:'',
      rePwd:'',
      error:false,
      errorMsg:''
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  },
  methods:{
    submitModify(){
      if(this.newPwd==''&&this.newPwd==''){
        this.error=true;
        this.errorMsg='您尚未填写要更改的密码，请输入后提交！';
      }else{
        if(this.newPwd==this.rePwd){
          this.error=false;
          this.$message({message:'恭喜您，密码修改成功！',type: 'success'});
        }else{
          this.error=true;
          this.errorMsg='两次输入的密码不一致，请重新填写！';
        }
      }
    }
  }
}
</script>

<style scoped>
.msgbox{min-height: 400px;}
table{width: 430px;}
table th,table td{padding: 10px;}
</style>
