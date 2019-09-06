<template>
    <div class="main message">
        <h3>{{currentMenu[1]}} <small>{{currentMenu[2]?currentMenu[2]:''}}</small></h3>
        <div class="clearfix">
          <div class="float-left msgbox msglist">
            <div class="list" v-if="!error">
              <p v-for="(item,index) in message" :key="index" :class="{'read':item.status}" @click="getmessage(index,item.mid)">
                <i class="read bg-danger" v-if="!item.status"></i>
                <strong class="text-primary">{{item.title}}</strong>
                <span class="float-right">[{{item.creatTime|getDate}}]</span>
              </p>
              <el-pagination class="mt-3 text-center" :page-size="pagesize" :current-page.sync="currPage" layout="prev, pager, next" :total="totleCount"></el-pagination>
            </div>
            <div class="error text-danger text-center" v-if="error">
              <p>{{errormsg}}</p>
              <button v-if='error==2' class="btn btn-primary btn-lg">重新获取</button>
            </div>
          </div>
          <div class="float-right msgbox msginfo">
            <div class="content" v-if="content.mid">
              <h4>消息详情</h4>
              <div class="title">
                <h5>{{content.title}}</h5>
                <p>{{content.creatTime|getTime}}</p>
              </div>
              <div class="detail" v-if="content.content">{{content.content}}</div>
              <div class="error" v-if="content.error">
                <p>{{content.errormsg}}</p>
              </div>
            </div>
              
          </div>
        </div>
    </div>
</template>

<script>
import {Pagination} from 'element-ui'
import Vue from 'vue'
Vue.use(Pagination)
export default {
  name: 'Message',
  data () {
    return {
      currPage:1,
      totleCount:1,
      pagesize:16,
      message:[],
      content:{},
      error:0,
      errormsg:'',
    }
  },
  computed:{
    currentMenu(){
      return this.$store.state.menu.currentMenu
    }
  },
  created(){
    this.getMessageData()
  },
  methods:{
    getMessageData(){
      this.$http.get('/user/messagelist',{page:this.currPage}).then(res=>{
        if(res.data.status==2){
          this.error=0;
          this.totleCount=res.data.sum;
          this.message=res.data.data;
        }else if(res.data.status==1){
          this.error=1;
          this.errormsg='暂无相关数据！'
        }else{
          this.error=2;
          this.errormsg='获取数据失败，您可点击下方按钮重新获取！'
        }
      })
    },
    getmessage(index,mid){
      var obj={}
      this.$http.get('/user/getmessage',{mid:mid}).then(res=>{
        if(res.data.status){
          obj={content:res.data.message}
        }else{
          obj={error:'true',errormsg:'获取数据失败，您可点击左侧相应标题重新获取！'}
        }
        this.message[index].status=1;
        this.content={...obj,...this.message[index]}
      })
    }
  },
  filters:{
    getDate(val){
      let date=new Date(val);
      let month=date.getMonth()+1;
      let day=date.getDate();
      month=month<10?'0'+month:month;
      day=day<10?'0'+day:day;
      return month+'-'+day;
    },
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
    }
  },
  watch:{
    currPage:'getMessageData'
  }
}
</script>

<style scoped>
.message .msglist{width: 45%; min-height: 600px;}
.message .msglist .list>p{margin-bottom: 0; line-height: 32px; height: 32px; padding-left: 10px; padding-right: 80px; cursor: pointer; border-bottom: 1px dotted rgb(181, 225, 255); position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;;}
.message .msglist .list>p span{position: absolute; right: 0;}
.message .msglist .list>p.read{color: #888;}
.message .msglist .list>p.read strong{color: #888!important; font-weight: normal;}
.message .msglist .list>p i.read{display: block; position: absolute; left: 0px; top:12px; width: 5px; height: 5px; border-radius: 50%;}
.message .msginfo{width: 53%;min-height: 400px; min-height: 600px;}
.message .msginfo h4{line-height: 1.6em; color: #0068b8}
.error p{margin: 20px auto; padding: 30px; width: 100%; font-size: 16px; text-align: center; border: 1px solid #ccc;}
.error .btn{width: 200px;}
.title{padding: 20px 0; border: 1px dotted rgb(181, 225, 255); border-left: 0; border-right: 0;}
.title h5{line-height: 30px; font-size: 20px;}
.title p{margin-bottom: 0; font-size: 14px; color: #999;}
.detail{padding: 15px; font-size: 14px; line-height: 1.6em; color: #333;}
</style>
