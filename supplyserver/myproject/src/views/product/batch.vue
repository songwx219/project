<template>
  <div class="main">
      <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
      <div class="msgbox">
          <form action="/productmanage/productupload/uploadexcel" method="post" enctype="multipart/form-data">
            <p><input type="file" name="product" class="file"></p>
            <p><button class="btn btn-primary btn-lg mt-3">提交</button></p>
          </form>

          <div class="tips">
            <h5>上传文件规范：</h5>
            <p><b>*</b>1、第一行为表头。每一列数据都请使用“文本”格式保存，否则可能会出现错误数据</p>
            <p><b>*</b>2、表格中，品牌、货号、包装规格、质量规格、单价_RMB为必填项，如果这些行没数据，此行内容将被忽略</p>
            <p><b>*</b>3、预计交货期不能为空</p>
            <p><b>*</b>4、英文品名和中文品名两者至少有一项不为空</p>
            <p><b>*</b>5、如果您上传的数据中有未代理的品牌，此行将会自动忽略</p>
            <p><b>*</b>6、如果您上传的数据中没有相关资质，此行将会自动忽略</p>
            <p><b>*</b>7、促销_RMB、促销开始日期、促销结束日期必须同时存在，否则此行促销价将会无效。日期格式为2017-01-01</p>
            <p><b>*</b>8、如果您上传的数据中已经上传过，那么则会更新已有数据，否则为新增。</p>
          </div>

          <div class="tips">
            <span class="btn btn-link" @click='downloadMB'>模板下载</span>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Add',
  data () {
    return {
      
    }
  },
  methods:{
    downloadMB(){
      var a = document.createElement('a');
      a.download = 'example';
      a.href = '/static/temp_test.xlsx';
      a.click();
      $(a).remove();
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
table th,table td{padding: 5px;}
form .file{display: inline-block; font-size: 14px;}
form .btn{width: 120px;}
.tips{width: 80%; border: 1px solid #ccc; padding: 20px; margin-top: 30px; color: #666;}
.tips h5{font-size: 15px; margin-bottom: 15px; color:  #337ab7; font-weight: 700;}
.tips b{color: red; margin-right: 5px;}
</style>