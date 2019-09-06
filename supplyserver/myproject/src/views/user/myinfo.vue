<template>
    <div class="main message">
        <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
        <div class="msgbox clearfix">
            <div class="float-left w-50">
                <table v-if="!modifyState">
                    <tbody>
                        <tr>
                            <th width="120px">公司名称：</th>
                            <td>{{userdata.company}}</td>
                        </tr>
                        <tr>
                            <th>公司logo：</th>
                            <td><img :src="'http://127.0.0.1:3000'+userdata.logo" alt=""></td>
                        </tr>
                        <tr>
                            <th>注册地址：</th>
                            <td>{{userdata.address}}</td>
                        </tr>
                        <tr>
                            <th>联系人：</th>
                            <td>{{userdata.username}}</td>
                        </tr>
                        <tr>
                            <th>联系手机号：</th>
                            <td>{{userdata.phone}}</td>
                        </tr>
                        <tr>
                            <th>联系座机号：</th>
                            <td>{{userdata.tel}}</td>
                        </tr>
                        <tr>
                            <th>联系人邮箱：</th>
                            <td>{{userdata.email}}</td>
                        </tr>
                        <tr>
                            <th>传真：</th>
                            <td>{{userdata.fax}}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td class="pt-4"><div class="btn btn-primary btn-lg" @click="modifyState=true">修改信息</div></td>
                        </tr>
                    </tbody>
                </table>
                <form v-if="modifyState" id="modifyForm" enctype="multipart/form-data">
                    <table :data-key='modifyStateChange'>
                        <tbody>
                            <tr>
                                <th width="120px">公司名称：</th>
                                <td><input type="text" name="company" class="form-control" v-model.trim="modifyData.company"> </td>
                            </tr>
                            <tr>
                                <th>公司logo：</th>
                                <td>
                                    <div class="uploadLogo d-flex align-items-center">
                                        <img :src="'http://127.0.0.1:3000'+modifyData.logo" alt="">
                                        <span @click='uploadLogo($event)' class="fa fa-plus btn btn-primary pt-2 pb-2 ml-3 rounded-circle"></span>
                                        <input type="file" name="logo" accept="image/*" @change='fileLogo' class="d-none">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>注册地址：</th>
                                <td><input type="text" name="address" class="form-control" v-model.trim="modifyData.address"></td>
                            </tr>
                            <tr>
                                <th>联系人：</th>
                                <td><input type="text" name="username" class="form-control" v-model.trim="modifyData.username"></td>
                            </tr>
                            <tr>
                                <th>联系手机号：</th>
                                <td><input type="text" name="phone" class="form-control" v-model.trim="modifyData.phone"></td>
                            </tr>
                            <tr>
                                <th>联系座机号：</th>
                                <td><input type="text" name="tel" class="form-control" v-model.trim="modifyData.tel"></td>
                            </tr>
                            <tr>
                                <th>联系人邮箱：</th>
                                <td><input type="text" name="email" class="form-control" v-model.trim="modifyData.email"></td>
                            </tr>
                            <tr>
                                <th>传真：</th>
                                <td><input type="text" name="fax" class="form-control" v-model="modifyData.fax"></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td class="pt-4">
                                    <button class="btn btn-warning btn-lg mr-5" @click="modifyState=false">取消</button>
                                    <button class="btn btn-primary btn-lg" @click.prevent="userInfoModify">提交</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div class="float-right zhizhao w-50">
                <p class="explain mb-4">说明：为了及时准确审核贵司的经营资质以及代理授权信息，请务必上传如下所需的资质文件，否则将无法进行后续数据更新以及销售工作。*图片格式为png/jpg,大小限制在2M以内</p>
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td width="50%">
                            <p>营业执照<span class="btn float-right btn-link">选择文件</span><input class="file" type="file" name="blpic"></p>
                            <el-image style="height: 200px" :src="url" :preview-src-list="srcList"></el-image>
                        </td>
                        <td width="50%">
                            <p>其他资质<span class="btn float-right btn-link">选择文件</span><input class="file" type="file" name="blpic"></p>
                            <el-image style="height: 200px" :src="url" :preview-src-list="srcList"></el-image>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center">
                            <button class="btn btn-primary btn-lg mt-2 mb-2">立即提交</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {Image} from 'element-ui';
import Vue from 'vue'
Vue.use(Image)
export default {
  name: 'UserDetail',
  data () {
    return {
        modifyState:false,
        userdata:{},
        modifyData:{},
      url:'http://taidesupply.cn/static/supply/5c83abae0cbe1.png',
      srcList:['http://taidesupply.cn/static/supply/5c83abae0cbe1.png']
    }
  },
    computed:{
        currentMenu(){
            return this.$store.state.menu.currentMenu
        },
        modifyStateChange(){
            if(this.modifyState){
                this.modifyData={...this.userdata};
                return true;
            } 
        }
    },
    mounted(){
        this.initUserData();
    },
    methods:{
        initUserData(){
            this.$http.get('/user/infor').then(res=>{
                this.userdata=res.data;
            });
        },
        uploadLogo(e){
            $(e.target).siblings('input[type="file"]').click();
        },
        userInfoModify(){
            var formData = new FormData($('#modifyForm')[0]);
            this.$http.post("/user/infor/modify",formData,true
            ).then(res=>{
                if(res.data.status){
                    this.initUserData();
                    this.modifyState=false;
                }else{

                }
            });
        },
        fileLogo(e){
            let files=e.target.files;
            if(files.length>0){
                this.modifyData.logo=files;
                $(e.target).siblings('img').hide();
                $(e.target).parent().prepend(`<img src=${URL.createObjectURL(files[0])}>`);
            }
        }
    }
}
</script>

<style scoped>
.msgbox>.float-left{padding: 20px; border-right: 1px dotted #aaa;}
.uploadLogo{cursor: pointer;}
.zhizhao{padding: 20px;}
.zhizhao .explain{padding: 10px; background: rgb(213, 223, 252); font-size: 14px; line-height: 2em;}
.zhizhao img{width: 100px;}
.zhizhao input{display: none;}
.zhizhao table td{border: 1px solid #ccc;text-align: center; padding: 0;}
.zhizhao table td p{text-align: left; padding: 10px; background: #eee;}
table{width: 100%;}
table th,table td{padding: 10px;}
</style>
