<template>
  <div class="main" :key="routerkey">
      <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
      <tabBar :protype='protype'></tabBar>
      <div class="msgbox">
            <div class="search classfix">
                <div class="search clearfix">
                    <div class="float-left w-75 form">
                        <div class=" form-row align-items-center" v-if="!error">
                            <input type="text" class="col-sm-3 form-control" name="" id="" placeholder="请输入搜索内容">
                            <router-link to="/" class="col-sm-1 btn btn-info">搜索</router-link>
                        </div>
                    </div>
                    <div class="float-right">
                        <router-link class="btn btn-primary" to='/product/add'>增加新商品</router-link >
                    </div>
                </div>
            </div>
            <table class="table" v-if="!error">
                <thead>
                    <th>产品名称</th>
                    <th>品牌</th>
                    <th>货号</th>
                    <th>规格</th>
                    <th>单价</th>
                    <th>促销价</th>
                    <th>库存</th>
                    <th>状态</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in productData" :key="index">
                        <td>{{item.pname}}</td>
                        <td>{{item.brandname}}</td>
                        <td>{{item.artNo}}</td>
                        <td>{{item.specs}} / {{item.package}}</td>
                        <td>{{item.unitPrice}}</td>
                        <td>{{item.salePrice}}</td>
                        <td><span :class="{'btn btn-danger btn-sm':item.status!=0&&item.stock<50}">{{item.stock}}</span></td>
                        <td>
                            <span :class="{'text-danger':item.status!=0&&item.stock<50,'text-primary':item.status==1}">
                                {{item.status==0?'已下架':(item.stock<50 ?'库存告急':'销售中')}}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-info"  @click="editProduct(index)">修改</button>
                                <button v-if="item.status==0" class="btn btn-success" @click="goOnSale(item.pid,index)">上架</button>
                                <button v-if="item.status!=0" class="btn btn-warning" @click="endOfSale(item.pid,index)">下架</button>
                                <button class="btn btn-danger"  @click="delProduct(index)">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-pagination class="text-center" layout="prev, pager, next" v-if="totleCount>0"
                :page-size="pagesize" 
                :current-page.sync="currPage"
                :total="totleCount"
            ></el-pagination>
            
            <div class="error text-danger text-center" v-if="error">
                <p v-if="totleCount==0">暂无相关数据，您可点击右上方按钮进行添加！</p>
                <p v-if="totleCount>0">此页已无相关数据，请点击其他页码进行查看！</p>
            </div>
            <el-dialog :title="'商品编辑'" :visible.sync="cancelDialog" :width="'60%'">
                <table class="w-100">
                    <tbody>
                        <tr><th>产品供应商：</th><td>{{$store.state.user.userData.uname}}</td></tr>
                        <tr><th width='150px'>产品中文名称：</th><td><input type="text" class="form-control" v-model.trim="editProData.pname"></td></tr>
                        <tr><th>产品品牌：</th><td>
                            <select class="form-control" v-model="editProData.brandid">
                                <option v-for="brand in brandlist" :value="brand.bid" :key="brand.bid">{{brand.bname}}</option>
                            </select>
                        </td></tr>
                        <tr><th>产品货号：</th><td><input type="text" class="form-control" v-model.trim="editProData.artNo"></td></tr>
                        <tr><th>产品规格：</th><td><input type="text" class="form-control" v-model.trim="editProData.specs"></td></tr>
                        <tr><th>产品单价：</th><td><input type="text" class="form-control" v-model.trim="editProData.unitPrice"></td></tr>
                        <tr><th>促销单价：</th><td><input type="text" class="form-control" v-model.trim="editProData.salePrice"></td></tr>
                        <tr><th>产品库存：</th><td><input type="text" class="form-control" v-model.trim="editProData.stock"></td></tr>
                    </tbody>
                </table>
                <div slot="footer" class="dialog-footer">
                    <button class="btn btn-secondary" @click="cancelDialog = false">取 消</button>
                    <button class="btn btn-primary" @click="editProductSub">确认提交</button>
                </div>
            </el-dialog>
      </div>
  </div>
</template>

<script>
import tabBar from './tabbar'
export default {
  name: 'ProductList',
  props:['protype','page'],
  components:{tabBar},
  data () {
    return {
      productData:[{"pid":1,"supplyid":1,"brandid":1,"pname":"法兰西胎玫瑰","artNo":"34524","specs":"80g","package":"罐","unitPrice":25,"salePrice":23,"stock":500,"status":"1","creatTime":"2019-08-28T07:13:56.000Z","brandname":"喜福德"},{"pid":2,"supplyid":1,"brandid":1,"pname":"菊博士胎菊","artNo":"45612","specs":"70g","package":"包","unitPrice":22,"salePrice":20,"stock":300,"status":"1","creatTime":"2019-08-28T07:13:43.000Z","brandname":"喜福德"},{"pid":3,"supplyid":1,"brandid":1,"pname":"洛神仙子洛神花玫瑰茄","artNo":"15644","specs":"45g","package":"盒","unitPrice":32,"salePrice":28,"stock":30,"status":"0","creatTime":"2019-08-28T07:15:48.000Z","brandname":"喜福德"},{"pid":4,"supplyid":1,"brandid":2,"pname":"平阴玫瑰花茶干玫瑰","artNo":"65485","specs":"80g","package":"罐","unitPrice":30,"salePrice":29,"stock":455,"status":"0","creatTime":"2019-08-28T07:17:12.000Z","brandname":"惠兴隆"},{"pid":5,"supplyid":1,"brandid":2,"pname":"浓香型茉莉花茶","artNo":"54158","specs":"70g","package":"包","unitPrice":59,"salePrice":53,"stock":300,"status":"1","creatTime":"2019-08-28T07:18:01.000Z","brandname":"惠兴隆"}],
      totleCount:22,
      pagesize:5,
      currPage:Number(this.page),
      error:0,
      cancelDialog:false,
      editProData:{},
      editProIndex:0,
      brandlist:[{"bid":1,"bname":"喜福德"},{"bid":2,"bname":"惠兴隆"},{"bid":5,"bname":"亦福堂"},{"bid":7,"bname":"乐开怀"}],
      routerkey:1
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  },
  methods:{
    getProductData(){
      switch(this.protype){
        case 'all':this.productData=[{"pid":1,"supplyid":1,"brandid":1,"pname":"法兰西胎玫瑰","artNo":"34524","specs":"80g","package":"罐","unitPrice":25,"salePrice":23,"stock":500,"status":"1","creatTime":"2019-08-28T07:13:56.000Z","brandname":"喜福德"},{"pid":2,"supplyid":1,"brandid":1,"pname":"菊博士胎菊","artNo":"45612","specs":"70g","package":"包","unitPrice":22,"salePrice":20,"stock":300,"status":"1","creatTime":"2019-08-28T07:13:43.000Z","brandname":"喜福德"},{"pid":3,"supplyid":1,"brandid":1,"pname":"洛神仙子洛神花玫瑰茄","artNo":"15644","specs":"45g","package":"盒","unitPrice":32,"salePrice":28,"stock":30,"status":"0","creatTime":"2019-08-28T07:15:48.000Z","brandname":"喜福德"},{"pid":4,"supplyid":1,"brandid":2,"pname":"平阴玫瑰花茶干玫瑰","artNo":"65485","specs":"80g","package":"罐","unitPrice":30,"salePrice":29,"stock":455,"status":"0","creatTime":"2019-08-28T07:17:12.000Z","brandname":"惠兴隆"},{"pid":5,"supplyid":1,"brandid":2,"pname":"浓香型茉莉花茶","artNo":"54158","specs":"70g","package":"包","unitPrice":59,"salePrice":53,"stock":300,"status":"1","creatTime":"2019-08-28T07:18:01.000Z","brandname":"惠兴隆"}];break;
        case 'offShelf':this.productData=[{"pid":3,"supplyid":1,"brandid":1,"pname":"洛神仙子洛神花玫瑰茄","artNo":"15644","specs":"45g","package":"盒","unitPrice":32,"salePrice":28,"stock":30,"status":"0","creatTime":"2019-08-28T07:15:48.000Z","brandname":"喜福德"},{"pid":4,"supplyid":1,"brandid":2,"pname":"平阴玫瑰花茶干玫瑰","artNo":"65485","specs":"80g","package":"罐","unitPrice":30,"salePrice":29,"stock":455,"status":"0","creatTime":"2019-08-28T07:17:12.000Z","brandname":"惠兴隆"}];break;
        case 'stock':this.productData=[{"pid":3,"supplyid":1,"brandid":1,"pname":"洛神仙子洛神花玫瑰茄","artNo":"15644","specs":"45g","package":"盒","unitPrice":32,"salePrice":28,"stock":30,"status":"0","creatTime":"2019-08-28T07:15:48.000Z","brandname":"喜福德"}];break;
      }
      if(this.productData.length>0){
        this.error=0;
      }else{
        this.error=1;
      }
    },
    editProduct(index){
        this.editProData={...this.productData[index]};
        this.editProIndex=index;
        this.cancelDialog=true;
        this.productData[index].status=1;
        this.brandlist.forEach(element => {
            if(element.bname==this.editProData.brandname){
                this.editProData.brandid=element.bid;
                delete this.editProData.brandname
            }
        });
    },
    editProductSub(){
        this.cancelDialog=false;
        this.productData[this.editProIndex]={...this.editProData};
        this.$message({ type: 'success', message: '恭喜，商品信息修改成功！' }); 
    },
    goOnSale(pid,index){
        this.$confirm('此操作将上架该商品，将展示在售卖产品中， 是否继续？', '上架商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.productData[index].status=1;
          this.$message({ type: 'success', message: '商品已上架！!' });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消操作' });          
        });
    },
    endOfSale(pid,index){
        this.$confirm('此操作将下架该商品，在售商品中不再展示此商品， 是否继续？', '下架商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.productData[index].status=0;
          this.$message({ type: 'success', message: '商品已下架！!' });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消操作' });          
        });
    },
    delProduct(index){
        this.$confirm('此操作将永久删除该商品， 是否继续？', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.productData.splice(index,1);
          this.$message({ type: 'success', message: '商品已删除！!' });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消操作' });          
        });
    }
  },
  watch:{
    currPage(){
        let path=this.$router.currentRoute.path.split('/');
        path[path.length-1]=this.currPage;
        this.$router.push(path.join('/')).catch(err=>{});
        this.getProductData()
    },
    protype(){
      if(this.currPage!=Number(this.page)){
        this.currPage=Number(this.page);
      }else this.getProductData()
        this.routerkey=new Date().getTime();
    },

  }
}
</script>

<style scoped>
table th,table td{padding: 8px 5px; vertical-align: middle;}
.error p{margin: 20px auto; padding: 30px; width: 50%; font-size: 16px; text-align: center; border: 1px solid #ccc;}
</style>