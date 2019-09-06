<template>
    <div class="main index clearfix">
        <div class="content float-left">
            <div class="box">
                <h3>产品管理</h3>
                <div class="product d-flex justify-content-between">
                    <div class="w-50">
                        <el-progress class="float-left" type="circle" :percentage="80"></el-progress>
                        <div class="float-left info">
                            <p>在售商品：<span class="text-primary">12300</span></p>
                            <router-link to="/" class="btn btn-primary" >查看商品</router-link>
                        </div>
                    </div>
                    <div class="w-5">
                        <el-progress class="float-left" type="circle" :percentage="5" color="#f78989"></el-progress>
                        <div class="float-left info">
                            <p>库存警告商品：<span class="text-danger">12300</span></p>
                            <router-link to="/" class="btn btn-danger" >查看商品</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box">
                <h3>订单管理</h3>
                <div class="order d-flex justify-content-between align-items-center">
                    <div class="w-25">
                        <i class="el-icon-s-order text-info"></i>
                        <div class="info">
                            <p>今日订单：<span class="text-info">25</span></p>
                            <router-link to="/" class="btn btn-outline-info" >查看商品</router-link>
                        </div>
                    </div>
                    <div class="grid-content">
                        <i class="el-icon-s-promotion text-warning"></i>
                        <div class="info">
                            <p>待发货订单：<span class="text-warning">25</span></p>
                            <router-link to="/" class="btn btn-outline-warning" >查看商品</router-link>
                        </div>
                    </div>
                    <div class="grid-content bg-purple-light">
                        <i class="el-icon-s-finance text-success"></i>
                        <div class="info">
                            <p>待开票订单：<span class="text-success">25</span></p>
                            <router-link to="/" class="btn btn-outline-success" >查看商品</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aside float-right">
            <div class="box">
                <div class="date">
                    <p class="d-flex justify-content-around align-items-center">
                        <span class="year">{{ weather.date[0] }}</span>
                        <span class="mouth">{{ weather.date[1] }}</span>
                        <span class="day">{{ weather.date[2] }}</span>
                    </p>
                </div>
                <div class="weather d-flex justify-content-around align-items-center">
                    <div class="city">
                        <p class="c">{{ weather.city }}</p>
                        <p class="w">{{ weather.week }}</p>
                    </div>
                    <div class="wea">
                        <img :src="'static/images/weather/'+weather.img" alt="">
                        <p>{{ weather.weadetail }}</p>
                    </div>
                    <div class="tem">
                        <p>最高温度：<strong class="max">{{ weather.tem[0] }}</strong></p>
                        <p>最低温度：<strong class="min">{{ weather.tem[1] }}</strong></p>
                    </div>
                </div>
            </div>
            <div class="box">
                <h3>未读消息</h3>
                <div class="msg">
                    <p class="mb-2">
                        <i class=" fa fa-bell text-primary"></i>
                        未读消息 <strong class="badge badge-pill badge-danger">12</strong>
                        <a href="#" class="btn btn-outline-danger btn-sm">立即查看</a>
                    </p>
                    <div class="message">
                        <div class="message-box">
                            <p v-for="(item,index) in message" :key="index">
                                <router-link :to="item.url" >{{item.msg}}</router-link><span class="float-right">{{item.date}}</span>
                            </p>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import {Progress} from 'element-ui'
Vue.use(Progress)

export default {
  name: 'index',
  data () {
    return {
      weather:{
          date:[2019,'08',22],
          city:'中国-北京',
          week:'星期四',
          weadetail:'多云转晴',
          img:'qing.png',
          tem:[34,22]
      },
      message:[
          {msg:'1订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'2订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'3订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'4订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'5订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'6订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'7订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'},
          {msg:'8订单审核进度更新啦，赶快查看吧！',url:'/', date:'8-26'}
      ]
    }
  },
  created(){
      $.ajax({
        url:'https://www.tianqiapi.com/api/?version=v1&&appid=1001&appsecret=5566',
        dataType:'jsonp',
        success:(res)=>{
            this.weather.date=res.data[0].date.split('-');
            this.weather.city=[res.country,res.city].join('-');
            this.weather.week=res.data[0].week;
            this.weather.weadetail=res.data[0].wea;
            this.weather.img=res.data[0].wea_img+'.png';
            this.weather.tem=[res.data[0].tem1,res.data[0].tem2]
        }
    })
  },
  mounted(){
      if(timer) clearInterval(timer);
      let msgH=$('.message-box').height();
      let listH=$('.message-box p').height(),mt=0;
      const pinjie=this.message.filter((e,i)=>{return i<4})
      this.message.push(...pinjie);
      let timer=setInterval(()=>{
          mt+=listH;
          $('.message-box').animate({'top':-mt+'px'},300,function(){
            if(mt>=msgH) {
              mt=0;
              $('.message-box').css({'top':'0px'});
            }
          });
          
      },2000)
  }
}
</script>

<style scoped>
.product{padding: 20px 0 0;}
.product .info{padding: 30px 10px;}
.product .info p{line-height: 40px; font-size: 18px;;}
.product .info p .el-link{font-size: 24px; font-weight: 700;}

.index .box{width: 100%; padding: 20px; margin-top: 15px; background: #fff;  border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, .3)}
.index .content{width: 65%;}
.index .aside{width: 33%;}
.index .date{width: 100%; padding: 10px; margin-bottom: 20px; position: relative; background: #888; border: 10px solid #aaa; border-top-width: 25px;}
.index .date p{margin: 0; padding: 10px; width: 100%; font-size: 48px; line-height: 58px; text-align: center; background: #f80; color: #fff; font-weight: 700;}
.index .date span::before,.index .date span::after{content: ""; display: block; position: absolute; left: 10%; top: -37px; width: 8px; height: 24px; border-radius: 4px; background: #aaa; border:3px solid #666;}
.index .date span.year::before{left: 10%;}
.index .date span.year::after{right: 10%; left: auto;}
.index .date span.mouth::before{left: 25%;}
.index .date span.mouth::after{right: 25%; left: auto;}
.index .date span.day::before{left: 40%;}
.index .date span.day::after{right: 40%; left: auto;}
.index .weather{text-align: center; color: #888;}
.index .weather p{margin: 0;}
.index .weather .c{font-size: 18px; padding: 10px 0; color: #0068b7;}
.index .weather .wea{font-size: 12px; color: #1c4b7a; line-height: 15px;}
.index .weather .tem{line-height: 30px; padding: 5px 0;}
.index .box h3{font-size: 16px; font-weight: 700; margin-bottom: 15px; color: #333; color: #0068b6;}
.index .order{padding: 10px 0; text-align: center;}
.index .order i{font-size: 70px; margin-right: 10px; padding-top: 5px;; color: #888;}
.index .order p{ line-height: 35px; font-size: 18px;;}
.index .order p span{font-size: 24px; font-weight: 700;}
.index .message{margin-top: 10px; height: 100px; overflow: hidden; ;}
.index .message-box{position: relative; top: 0;}
.index .message p{margin: 0; height: 25px; line-height: 25px;}
</style>
