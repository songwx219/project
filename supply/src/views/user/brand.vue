<template>
    <div class="main message">
        <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
        <div class="msgbox clearfix">
                <div class="search clearfix">
                    <div class="float-left form">
                      <div class=" form-row align-items-center" v-if="!error">
                        <input type="text" class="col-sm-4 form-control" name="" id="" placeholder="请输入搜索内容">
                        <router-link to="/" class="col-sm-1 btn btn-info">搜索</router-link>
                      </div>
                    </div>
                    <div class="float-right">
                        <button class="btn btn-primary" @click='addBrand'>增加新品牌</button>
                    </div>
                </div>
                <div class="list" v-if="!error">
                  <table class="table">
                    <thead>
                        <th>品牌名称</th>
                        <th>代理级别</th>
                        <th>代理区域</th>
                        <th>授权截止时间</th>
                        <th>品牌折扣</th>
                        <th>状态</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in brandData" :key="index">
                        <td>{{item.bname}}</td>
                        <td>{{item.leval}}</td>
                        <td>{{item.zone}}</td>
                        <td>{{item.endTime|getDate}}</td>
                        <td>{{item.discount}}</td>
                        <td>{{item.status==1?'正常':'已到期'}}</td>
                        <td>
                          <div class="btn-group">
                            <div class="btn btn-info" @click="editBrand(index)">编辑</div>
                            <div class="btn btn-danger" @click="delBrand(index)">删除</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <el-pagination class="text-center" layout="prev, pager, next" 
                    :page-size="pagesize" 
                    :current-page.sync="currPage"
                    :total="totleCount"
                  ></el-pagination>
                </div>
                <div class="error text-danger text-center" v-if="error">
                  <p>{{errormsg}}</p>
                  <button v-if='error==2' class="btn btn-primary btn-lg">重新获取</button>
                </div>
        </div>
        
        <el-dialog :title="dialogStatus=='add'?'新增品牌':'品牌编辑'" :visible.sync="addBrandDialog">
          <table>
            <tbody>
              <tr><th width="120px">品牌名称：</th><td><input type="text" class="form-control" v-model.trim="newBrandData.bname"></td></tr>
              <tr><th>代理级别：</th><td><input type="text" class="form-control" v-model.trim="newBrandData.leval"></td></tr>
              <tr><th>代理区域：</th><td><input type="text" class="form-control" v-model.trim="newBrandData.zone"></td></tr>
              <tr><th>授权截止时间：</th>
              <td><el-date-picker v-model="newBrandData.endTime" type="date" placeholder="选择日期"></el-date-picker></td>
              </tr>
              <tr><th>品牌折扣：</th><td><el-slider v-model="newBrandData.discount" :format-tooltip="formatTooltip"></el-slider></td></tr>
            </tbody>
          </table>
          <div slot="footer" class="dialog-footer">
            <button class="btn btn-dark" @click="addBrandDialog = false">取 消</button>
            <button v-if="dialogStatus=='add'" class="btn btn-primary" @click="addBrandSub">立即添加</button>
            <button v-if="dialogStatus!='add'" class="btn btn-primary" @click="editBrandSub">提交</button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import {Slider,DatePicker} from 'element-ui'
Vue.use(Slider)
Vue.use(DatePicker)
export default {
  name: 'UserBrand',
  data () {
    return {
      brandData:[{"bid":1,"sid":1,"bname":"喜福德","leval":"一级代理","zone":"北京","endTime":"2022-01-18T16:00:00.000Z","discount":0.88,"status":"1"},{"bid":2,"sid":1,"bname":"惠兴隆","leval":"一级代理","zone":"北京","endTime":"2022-06-29T16:00:00.000Z","discount":0.85,"status":"1"},{"bid":5,"sid":1,"bname":"亦福堂","leval":"一级代理","zone":"北京","endTime":"2024-02-06T16:00:00.000Z","discount":0.8,"status":"1"},{"bid":7,"sid":1,"bname":"乐开怀","leval":"二级代理","zone":"北京","endTime":"2023-05-09T16:00:00.000Z","discount":0.9,"status":"1"}],
      currPage:1,
      totleCount:1,
      pagesize:4,
      error:0,
      errormsg:'',
      addBrandDialog:false,
      dialogStatus:0,
      newBrandData:{},
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  },
  methods:{
    addBrand(){
      this.newBrandData={bname:'',leval:'',zone:'',endTime:'',discount:0}
      this.addBrandDialog=true;
      this.dialogStatus='add';
    },
    addBrandSub(){
      var status=true;
      for(let key in this.newBrandData){
        if(this.newBrandData[key]=='') status=false;
      }
      if(status){
        let isExist=false;
        this.brandData.forEach(ele=>{
          if(ele.bname==this.newBrandData.bname){
            isExist=true;
          }
        });
        if(isExist){
          this.$message({ type: 'warning', message: '改品牌名已存在!' });
        }else{
          this.brandData.push(this.newBrandData);
          this.addBrandDialog=false;
          this.$message({ type: 'success', message: '添加成功!' });
        }
      }else{
        this.$message({ type: 'danger', message: '有信息尚未填写，请确保所有选项填写完整！' });   
      }
    },
    editBrand(index){
      this.newBrandData={...this.brandData[index]};
      this.newBrandData.discount*=100;
      this.addBrandDialog=true;
      this.dialogStatus=index;
    },
    editBrandSub(){
      var status=true;
      for(let key in this.newBrandData){
        if(this.newBrandData[key]=='') status=false;
      }
      if(status){
        let isExist=false;
        this.brandData.forEach(ele=>{
          if(ele.bname==this.newBrandData.bname){
            isExist=true;
          }
        });
        if(isExist){
          this.$message({ type: 'warning', message: '改品牌名已存在!' });
        }else{
          this.brandData[this.dialogStatus]={...this.newBrandData};
          this.addBrandDialog=false;
          this.$message({ type: 'success', message: '修改成功!' });
        }
      }else{
        this.$message({ type: 'danger', message: '有信息尚未填写，请确保所有选项填写完整！' });   
      }
    },
    delBrand(index){
      this.$confirm('此操作将永久删除该品牌信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this. brandData.splice(index,1)
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });          
        });
    },
    formatTooltip(val) {
        return val / 100;
      }
  },
  filters:{
    getDate(val){
      let date=new Date(val);
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      let day=date.getDate();
      month=month<10?'0'+month:month;
      day=day<10?'0'+day:day;
      return year+'-'+month+'-'+day;
    }
  },
  watch:{
    currPage:'getBrandData'
  }
}
</script>

<style scoped>
.error p{margin: 20px auto; padding: 30px; width: 50%; font-size: 16px; text-align: center; border: 1px solid #ccc;}
.error .btn{width: 200px;}
.table tr:last-child td{border-bottom: 1px solid #dee2e6;}
.el-dialog table{width: 80%;}
.el-dialog td{padding: 5px;}
</style>
