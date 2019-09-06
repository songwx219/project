<template>
  <div class="main">
      <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
      <div class="msgbox">
          <table>
              <tbody>
                  <tr>
                    <th>产品供应商：</th><td colspan="4"><input type="text" readonly class="form-control" :value="$store.state.user.userData.uname"></td>
                  </tr>
                  <tr>
                    <th width='100px'>产品名称：</th><td width="340px"><input type="text" class="form-control" v-model.trim="editProData.pname"></td><td class="space"></td>
                    <th width='100px'>产品单价：</th><td width="340px"><input type="text" class="form-control" v-model.trim="editProData.unitPrice"></td>
                  </tr>
                  <tr>
                      <th>产品品牌：</th>
                      <td><select class="form-control" v-model="editProData.brandid">
                          <option value="0">请选择</option>
                          <option v-for="brand in brandlist" :value="brand.bid" :key="brand.bid">{{brand.bname}}</option>
                      </select></td><td class="space"></td>
                      <th>促销单价：</th><td><input type="text" class="form-control" v-model.trim="editProData.salePrice"></td>
                  </tr>
                  <tr>
                    <th>产品货号：</th><td><input type="text" class="form-control" v-model.trim="editProData.artNo"></td><td class="space"></td>
                    <th>产品规格：</th><td><input type="text" class="form-control" v-model.trim="editProData.specs"></td>
                  </tr>
                  <tr>
                    <th>产品库存：</th><td><input type="text" class="form-control" v-model.trim="editProData.stock"></td><td class="space"></td>
                    <th>包装单位：</th><td><input type="text" class="form-control" v-model.trim="editProData.package"></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><th colspan="5" class="line">产品图片：</th></tr>
                  <tr>
                    <td colspan="5">
                      <div class="d-flex justify-content-around proimg">
                        <div class="box">
                          <div class="img"></div>
                          <button class="btn btn-block btn-primary">上传产品图片</button>
                        </div>
                        <div class="box">
                          <div class="img"></div>
                          <button class="btn btn-block btn-primary">上传产品图片</button>
                        </div>
                        <div class="box">
                          <div class="img"></div>
                          <button class="btn btn-block btn-primary">上传产品图片</button>
                        </div>
                        <div class="box">
                          <div class="img"></div>
                          <button class="btn btn-block btn-primary">上传产品图片</button>
                        </div>
                        <div class="box">
                          <div class="img"></div>
                          <button class="btn btn-block btn-primary">上传产品图片</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr><th colspan="5" class="line">产品图片：</th></tr>
                  <tr><td colspan="5"><textarea class="form-control"></textarea></td></tr>
                  <tr><th></th><td><button class="btn btn-primary btn-lg">立即添加</button></td></tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      editProData:{
        pname:'',
        brandid:0,
        artNo:'',
        specs:'',
        package:'',
        unitPrice:'',
        salePrice:'',
        stock:''
      },
      brandlist:[]
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  }
}
</script>

<style scoped>
table th,table td{padding: 8px;}
table td.space{ width: 50px;}
.btn{margin: 10px auto;}
.proimg .box{width: 165px;}
.proimg .img{width: 100%; height: 165px; background: #f5f5f5;;}
.proimg img{max-width: 100%; max-height: 100%;;}
table th.line{background: rgb(168, 180, 252);}
table textarea{height: 100px; resize: unset;}
</style>