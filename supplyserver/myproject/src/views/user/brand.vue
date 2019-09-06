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
                        <td>{{item.endTime}}</td>
                        <td>{{item.discount}}</td>
                        <td>{{item.status==1?'正常':'已到期'}}</td>
                        <td>
                          <div class="btn-group">
                            <div class="btn btn-info" @click="editBrand(index)">编辑</div>
                            <div class="btn btn-danger" @click="delBrand(item.bid)">删除</div>
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
        
        <el-dialog :title="dialogStatus==1?'新增品牌':'品牌编辑'" :visible.sync="addBrandDialog">
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
            <button v-if="dialogStatus==1" class="btn btn-primary" @click="addBrandSub">立即添加</button>
            <button v-if="dialogStatus==2" class="btn btn-primary" @click="editBrandSub">提交</button>
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
  name: 'UserDetail',
  data () {
    return {
      brandData:[],
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
  created(){
    this. getBrandData()
  },
  methods:{
    getBrandData(){
      this.$http.get('/user/brandlist',{page:this.currPage}).then(res=>{
        if(res.data.status==2){
          this.error=0;
          this.totleCount=res.data.sum;
          this.brandData=res.data.data;
        }else if(res.data.status==1){
          this.error=1;
          this.errormsg='暂无相关数据，您可点击右上方按钮进行添加！'
        }else{
          this.error=2;
          this.errormsg='获取数据失败，您可点击下方按钮重新获取！'
        }
      })
    },
    addBrand(){
      this.newBrandData={bname:'',leval:'',zone:'',endTime:'',discount:0}
      this.addBrandDialog=true;
      this.dialogStatus=1;
    },
    addBrandSub(){
      var status=true;
      for(let key in this.newBrandData){
        if(this.newBrandData[key]=='') status=false;
      }
      if(status){
        this.$http.post('/user/addbrand',this.newBrandData).then(res=>{
          if(res.data.status==2){
            this. getBrandData();
            this.addBrandDialog=false;
            this.$message({ type: 'success', message: '添加成功!' });
          }else if(res.data.status==1){
            this.$message({ type: 'warning', message: '改品牌名已存在!' });
          }else{
            this.$message({ type: 'danger', message: '添加失败，请重新尝试！' }); 
          }
        })
      }else{
        this.$message({ type: 'danger', message: '有信息尚未填写，请确保所有选项填写完整！' });   
      }
      
    },
    editBrand(index){
      this.newBrandData={...this.brandData[index]};
      this.newBrandData.discount*=100;
      this.addBrandDialog=true;
      this.dialogStatus=2;
    },
    editBrandSub(){
      var status=true;
      for(let key in this.newBrandData){
        if(this.newBrandData[key]=='') status=false;
      }
      if(status){
        this.$http.post('/user/editbrand',this.newBrandData).then(res=>{
          if(res.data.status){
            this. getBrandData();
            this.addBrandDialog=false;
            this.$message({ type: 'success', message: '修改成功!' });
          }else{
            this.$message({ type: 'danger', message: '添加失败，请重新尝试！' }); 
          }
        })
      }else{
        this.$message({ type: 'danger', message: '有信息尚未填写，请确保所有选项填写完整！' });   
      }
    },
    delBrand(bid){
      this.$confirm('此操作将永久删除该品牌信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/user/delbrand',{bid,bid}).then(res=>{
            if(res.data.status){
              this.currPage=1;
              this. getBrandData()
              this.$message({ type: 'success', message: '删除成功!' });
            }else{
              this.$message({ type: 'danger', message: '删除失败，请重新尝试！' }); 
            }
          })
          
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });          
        });
    },
    formatTooltip(val) {
        return val / 100;
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
