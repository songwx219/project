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
      pagesize:19,
      message:[{"mid":19,"title":"密码变更提示：请定期更换密码","creatTime":"2019-09-02T09:52:24.000Z","status":1},{"mid":18,"title":"您的商家信息变更已通过","creatTime":"2019-09-02T09:51:46.000Z","status":1},{"mid":17,"title":"有新订单，请尽快处理","creatTime":"2019-09-02T09:51:11.000Z","status":0},{"mid":16,"title":"警告！产品库存不足，请尽快补货！","creatTime":"2019-09-02T09:50:48.000Z","status":0},{"mid":15,"title":"测试测试测试测试订单快处理！","creatTime":"2019-09-02T09:50:16.000Z","status":0},{"mid":14,"title":"无色发达的有新订单待处理","creatTime":"2019-09-02T09:49:53.000Z","status":0},{"mid":13,"title":"有新订单待处理","creatTime":"2019-09-02T09:49:37.000Z","status":0},{"mid":12,"title":"产品库存警告，尽快补货吧！","creatTime":"2019-09-02T09:48:39.000Z","status":0},{"mid":11,"title":"的vv又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:47:29.000Z","status":0},{"mid":10,"title":"发的发的又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:47:12.000Z","status":0},{"mid":9,"title":"大部分又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:46:49.000Z","status":0},{"mid":8,"title":"撒打发又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:46:38.000Z","status":0},{"mid":7,"title":"而又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:46:22.000Z","status":0},{"mid":6,"title":"安庆又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:46:02.000Z","status":0},{"mid":5,"title":"是又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:45:24.000Z","status":0},{"mid":4,"title":"又有新订单啦，赶快来处理吧！","creatTime":"2019-09-02T09:44:31.000Z","status":1}],
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
  methods:{
    getmessage(index,mid){
      let content='';
      for(let i=0;i<8;i++){
        content+=this.message[index].title;
      }
      this.message[index].status=1;
      this.content={content:content,...this.message[index]}
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
