<template>
    <div class="msgbox allorder">
        <div class="search classfix">
            <div class="search clearfix">
                    <div class=" form-row align-items-center">
                        <input type="text" class="col-sm-3 form-control" name="" id="" placeholder="请输入搜索内容">
                        <router-link to="/" class="col-sm-1 btn btn-info">搜索</router-link>
                    </div>
                </div>
        </div>
        
        <table class="table">
            <thead>
                <th width='6%'><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></th>
                <th width='18%'>订单编号</th>
                <th width='12%'>下单人</th>
                <th width='15%'>下单时间</th>
                <th width='18%'>订单备注</th>
                <th width='15%'>订单状态</th>
                <th width='15%'>操作</th>
            </thead>
        </table>
        <el-checkbox-group v-model="checkedOrder" @change="handleCheckedCitiesChange">
            <table class="table">
                <tbody>
                    
                    <tr v-for="(item,index) in orderData" :key='index'>
                        <td width='6%'><el-checkbox :label="item.id"></el-checkbox></td>
                        <td width='18%'>{{item.orderno}}</td>
                        <td width='12%'>{{item.username}}</td>
                        <td width='15%'>{{item.creatTime|getTime}}</td>
                        <td width='18%'>{{item.note}}</td>
                        <td width='12%'>{{item.status|toStatus}}</td>
                        <td width='18%'>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-info" @click="seenDetail(item.id)">查看</button>
                                <button v-if="item.status<3" class="btn btn-success" @click="adjustPrice(item.id)">调价</button>
                                <button v-if="item.status==2" class="btn btn-warning" @click="consignPro(item.id)">发货</button>
                                <button v-if="item.status<3" class="btn btn-danger" @click="cancelOrder(item.id)">取消</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-checkbox-group>
        <div class="error text-danger text-center" v-if="error">
            <p>暂无相关数据！</p>
        </div>
        <div class="editBar text-right" v-if="editBar">
            <button class="btn btn-primary">批量发货</button>
            <button class="btn btn-danger">批量取消</button>
        </div>
        <el-dialog :title="'订单详情'" :visible.sync="dialogState" :width="'70%'">
            <h3 class="orderinfo">订单编号：12333</h3>
            <div class="orderinfo">
                <h4>下单人信息：</h4>
                <p class="d-flex">
                    <span class="col-2">下单人：张三</span>
                    <span class="col-3">联系方式：12345678999</span>
                    <span class="col-7">下单时间：2019-02-01 12：00：00</span>
                </p>
            </div>
            <div class="orderinfo">
                <h4>收货人信息：</h4>
                <p class="d-flex">
                    <span class="col-2">收货人：张三</span>
                    <span class="col-3">联系方式：12345678999</span>
                    <span class="col-7">收货地址：上海市浦东新区麦子街道幸福大厦</span>
                </p>
            </div>
            <div class="orderinfo invoice">
                <h4>发票信息：</h4>
                <p>公司名称：撒啊回家哈江户有限公司</p>
                <p>税号：SHFHFHFHHF000990</p>
            </div>
            <div class="orderinfo">
                <h4>订单备注：</h4>
                <p>案发达到法定封建哈康活佛对外发布挂我不</p>
            </div>
            <div class="orderinfo product">
                <h4>订购商品信息：</h4>
                <table class="table" style="width:100%; text-align:left">
                    <thead>
                        <th>商品ID</th>
                        <th>中文名称</th>
                        <th>品牌</th>
                        <th>货号</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>采购单价(￥)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>23453</td>
                            <td>法拉希泰玫瑰</td>
                            <td>efuton</td>
                            <td>346555</td>
                            <td>80g</td>
                            <td>2</td>
                            <td>23.00</td>
                        </tr>
                        <tr>
                            <td colspan="5"></td>
                            <td>总计：</td>
                            <td>80.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <button class="btn btn-dark" @click="seenDialog = false;consignDialog=false">关闭</button>
                <button class="btn btn-primary" v-if='seenDialog' @click="printOrder">打印订单</button>
                <button class="btn btn-primary" v-if='consignDialog' @click="consignSubmit">确认发货</button>
            </div>
        </el-dialog>
        <el-dialog :title="'订单商品价格调整'" :visible.sync="adjustDialog" :width="'70%'">
            <h3 class="orderinfo">订单编号：12333</h3>
            <div class="orderinfo">
                <h4>下单人信息：</h4>
                <p class="d-flex">
                    <span class="col-2">下单人：张三</span>
                    <span class="col-3">联系方式：12345678999</span>
                    <span class="col-7">下单时间：2019-02-01 12：00：00</span>
                </p>
            </div>
            <div class="orderinfo">
                <h4>订单备注：</h4>
                <p>案发达到法定封建哈康活佛对外发布挂我不</p>
            </div>
            <div class="orderinfo product">
                <h4>订购商品信息：</h4>
                <table class="table">
                    <thead>
                        <th>商品ID</th>
                        <th>中文名称</th>
                        <th>品牌</th>
                        <th>货号</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>采购单价(￥)</th>
                        <th width="100px">调整单价(￥)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>23453</td>
                            <td>法拉希泰玫瑰</td>
                            <td>efuton</td>
                            <td>346555</td>
                            <td>80g</td>
                            <td>2</td>
                            <td>23.00</td>
                            <td><input type="text" class="form-control w-100"></td>
                        </tr>
                        <tr>
                            <td colspan="6"></td>
                            <td>调整后总计：</td>
                            <td>80.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <button class="btn btn-dark" @click="adjustDialog = false">关闭</button>
                <button class="btn btn-primary" @click="adjustSubmit">确认</button>
            </div>
        </el-dialog>
        <el-dialog :title="'取消订单'" :visible.sync="cancelDialog" :width="'70%'">
            <h3 class="orderinfo">订单编号：12333</h3>
            <div class="orderinfo">
                <h4>下单人信息：</h4>
                <p class="d-flex">
                    <span class="col-2">下单人：张三</span>
                    <span class="col-3">联系方式：12345678999</span>
                    <span class="col-7">下单时间：2019-02-01 12：00：00</span>
                </p>
            </div>
            <div class="orderinfo">
                <h4>请输入取消原因</h4>
                <p class="d-flex">
                    <textarea class="form-control"></textarea>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <button class="btn btn-dark" @click="cancelDialog = false">关闭</button>
                <button class="btn btn-primary" @click="cancelSubmit">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue';
import {Checkbox,CheckboxButton,CheckboxGroup,} from 'element-ui';
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);

export default {
    name: 'OrderList',
    props:['orderType'],
    data () {
        return {
            orderData:[{"id":1,"orderno":"yft-zs-45845","sid":1,"userid":1,"aid":1,"iid":1,"note":"请尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:02:07.000Z","username":"张三"},{"id":2,"orderno":"ztn-sf-345832","sid":1,"userid":1,"aid":2,"iid":1,"note":"尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:04:35.000Z","username":"张三"},{"id":3,"orderno":"shz-st-23423","sid":1,"userid":1,"aid":1,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:05:41.000Z","username":"张三"},{"id":4,"orderno":"saw-huh-458413","sid":1,"userid":2,"aid":2,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:08:33.000Z","username":"李四"}],
            totleCount:1,
            orderOptions:[1,2,3,4],
            checkedOrder:[],
            checkAll:false,
            isIndeterminate:false,
            seenDialog:false,
            adjustDialog:false,
            consignDialog:false,
            cancelDialog:false,
            currPage:1,
            error:0
        }
    },
    computed:{
        dialogState:{
            get(){
                return this.seenDialog||this.consignDialog;
            },
            set(v){
                this.seenDialog=false;
                this.consignDialog=false;
            }
        },
        editBar(){
            if(this.checkedOrder.length>0){
                return true;
            }else return false;
        }
    },
    mounted(){
        this.getOrderData()
    },
    methods:{
        getOrderData(){
            switch(this.orderType){
                case 'all':this.orderOptions=[1,2,3,4];this.orderData=[{"id":1,"orderno":"yft-zs-45845","sid":1,"userid":1,"aid":1,"iid":1,"note":"请尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:02:07.000Z","username":"张三"},{"id":2,"orderno":"ztn-sf-345832","sid":1,"userid":1,"aid":2,"iid":1,"note":"尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:04:35.000Z","username":"张三"},{"id":3,"orderno":"shz-st-23423","sid":1,"userid":1,"aid":1,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:05:41.000Z","username":"张三"},{"id":4,"orderno":"saw-huh-458413","sid":1,"userid":2,"aid":2,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:08:33.000Z","username":"李四"}];break;
                case 'unpay':this.orderOptions=[3,4];this.orderData=[{"id":3,"orderno":"shz-st-23423","sid":1,"userid":1,"aid":1,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:05:41.000Z","username":"张三"},{"id":4,"orderno":"saw-huh-458413","sid":1,"userid":2,"aid":2,"iid":2,"note":null,"status":"1","creatTime":"2019-08-28T08:08:33.000Z","username":"李四"}];break;
                case 'todo':this.orderOptions=[1,2];this.orderData=[{"id":1,"orderno":"yft-zs-45845","sid":1,"userid":1,"aid":1,"iid":1,"note":"请尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:02:07.000Z","username":"张三"},{"id":2,"orderno":"ztn-sf-345832","sid":1,"userid":1,"aid":2,"iid":1,"note":"尽快发货，谢谢！","status":"2","creatTime":"2019-08-28T08:04:35.000Z","username":"张三"}];break;
                case 'unreceived':this.orderOptions=[];this.orderData=[];break;
                case 'completed':this.orderOptions=[];this.orderData=[];break;
                case 'cancelled':this.orderOptions=[];this.orderData=[];break;
            }
            this.checkedOrder=[];
            this.checkAll=false;
            this.orderData.length>0?this.error=0:this.error=1;
        },
        handleCheckAllChange(val) {
            this.checkedOrder = val ? this.orderOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.orderOptions.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.orderOptions.length;
        },
        seenDetail(){
            this.seenDialog=true
            this.consignDialog=false
        },
        adjustPrice(){
            this.adjustDialog=true;
        },
        consignPro(){
            this.seenDialog=false
            this.consignDialog=true
        },
        cancelOrder(){
            this.cancelDialog=true;
        },
        printOrder(){
            var newWindow=window.open("打印窗口","_blank");
            var docStr = $('.el-dialog__body').html();
            newWindow.document.write(docStr);
            newWindow.document.close();
            newWindow.print();
            newWindow.close();
            this.seenDialog=false;
        },
        consignSubmit(){
            this.consignDialog=false;
        },
        adjustSubmit(){
            this.adjustDialog=false;
        },
        cancelSubmit(){
            this.cancelDialog=false;
            this.$message({message:'此订单已取消',type:'success'})
        }
    },
    watch:{
        orderType(){
            this.getOrderData()
        },
    },
    filters:{
        getTime(val){
            let date=new Date(val);
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            let hours=date.getHours();
            let minutes=date.getMinutes();
            let seconds=date.getSeconds();
            month=month<10?'0'+month:month;
            day=day<10?'0'+day:day;
            hours=hours<10?'0'+hours:hours;
            minutes=minutes<10?'0'+minutes:minutes;
            seconds=seconds<10?'0'+seconds:seconds;
            return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
        },
        toStatus(val){
            let str=''
            switch(val){
                case '1':str='未付款';break;
                case '2':str='待处理';break;
                case '3':str='待收货';break;
                case '4':str='已完成';break;
                case '5':str='已取消';break;
            }
            return str;
        }
    },
}
</script>

<style scoped>
.table td, .table th{vertical-align: middle; font-size: 14px;}
.orderinfo{margin-bottom: 20px;}
.orderinfo:last-child{margin-bottom: -20px;}
.orderinfo h4{border-left: 3px solid #0068b8; font-size: 16px; padding-left: 10px; color: #0068b8; margin-bottom: 10px;;}
.orderinfo p{color: #888; line-height: 25px;}
.orderinfo.invoice p{padding-left: 20px; line-height: 30px;}
.orderinfo textarea{height: 100px; resize: none;}
.msgbox table.table{margin-bottom: 0;}
.error p{margin: 20px auto; padding: 30px; width: 50%; font-size: 16px; text-align: center; border: 1px solid #ccc;}
.editBar{position: fixed; left: 200px; bottom: 0; right: 0; padding: 5px 10px; background: rgba(0,0,0,.5);}
</style>