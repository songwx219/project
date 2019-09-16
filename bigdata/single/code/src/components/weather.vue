<template>
  <div class="wea_box" id="weather_box">
    <div class="bgImg" v-if='weather.length>0'>
      <img v-if='weather[0].weath=="多云"' src="../assets/images/cloudy.jpg" alt="">
      <img v-if='weather[0].weath=="阴"' src="../assets/images/overcast.jpg" alt="">
      <img v-if='weather[0].weath.indexOf("雪")>0' src="../assets/images/snow.gif" alt="">
      <img v-if='weather[0].weath=="晴"' class="twinkle" src="../assets/images/sunny.jpg" alt="">
    </div>
    <div class="cont" v-if='weather.length>0'>
      <div class="box" v-for='(item,index) in weather' :key="index">
        <div class="top">
          <p class="week">{{item.week}}</p>
          <p class="data">{{item.date.slice(5,7)+'/'+item.date.slice(8,10)}}</p>
          <p class="weath">
            {{item.weath}}
            <img v-if='item.weath=="多云"' src="../assets/images/icon_2.png" alt="">
            <img v-if='item.weath=="阴"' src="../assets/images/icon_3.png" alt="">
            <img v-if='item.weath=="晴"' src="../assets/images/icon_1.png" alt="">
          </p>
        </div>
        <div class="bottom">
          <p>{{item.wind}}</p>
          <p>{{item.class}}</p>
        </div>
      </div>
    </div>
    <div id="weather"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import echarts from "echarts";

var weathData={};


function getWeather(fn){
  $.ajax({
    url:"http://cdn.weather.hao.360.cn/sed_api_weather_info.php?app=360chrome",
    type: "GET",
    dataType: "jsonp",
    jsonp: "_jsonp",
    success:function(data){
      var area=data.area[2][0];
      var weatherDetail=data.weather;
      var weatherArr=[];
      var weekNow=(new Date()).getDay();
      var week='';
      for(var key in weatherDetail){
        switch((key-0+weekNow)%7){
          case 0: week='星期日';break;
          case 1: week='星期一';break;
          case 2: week='星期二';break;
          case 3: week='星期三';break;
          case 4: week='星期四';break;
          case 5: week='星期五';break;
          case 6: week='星期六';break;
        }
        if(key==0){week='今天'}
        weatherArr.push({
          date:weatherDetail[key].date,
          week:week,
          maxTemp:weatherDetail[key].info.day[2],
          minTemp:weatherDetail[key].info.night[2],
          weath:weatherDetail[key].info.day[1],
          wind:weatherDetail[key].info.day[3],
          class:weatherDetail[key].info.day[4],
        })
      }
      localStorage.weather=JSON.stringify({area:area,time:(new Date()).getTime(),data:weatherArr});
      fn()
    }
  })
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      area:'',
      weather:[],
      tempMax:[],
      tempMin:[],
      chartDate:[]
    }
  },
  methods:{
    weatherCHart:function(){
      var myChart = echarts.init($('#weather')[0]);
      var option = {
          color: ['#fd6','#6df'], 
          tooltip: { trigger: 'axis'},
          xAxis: {show: false,data: this.chartDate},
          yAxis: {show: false,},
          grid:{left:0,right:0},
          series: [
            {
              name: '最高温',
              type: 'line',
              data: this.tempMax,
              label:{show:true,}
            },
            {
              name: '最低温',
              type: 'line',
              data: this.tempMin,
              label:{show:true,position:'bottom'}
            }  
          ]
      };
      myChart.setOption(option);
    },
    setWeatherInfo(){
      weathData=JSON.parse(localStorage.weather)
      this.area=weathData.area;
      this.weather=weathData.data;
      this.weather.forEach((ele)=>{
        this.tempMax.push(ele.maxTemp);
        this.tempMin.push(ele.minTemp);
        this.chartDate.push(ele.date);
      });
    }

  },
  mounted:function(){
    if(!localStorage.weather){
      getWeather(()=>{
        this.setWeatherInfo();
        this.weatherCHart();
      })
    }else if((new Date().getTime()-3600*1000)>JSON.parse(localStorage.weather).time){
      getWeather(()=>{
        this.setWeatherInfo();
        this.weatherCHart();
      })
    }else{
      this.setWeatherInfo();
      this.weatherCHart();
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wea_box{width: 98%; height: 48%; margin:2% auto; border: 1px solid #555; position: relative; background: #aaa;font-size: 13px; color: #fff; overflow:hidden; border-radius: 10px;}
    .wea_box .bgImg{position: absolute; width: 100%; height: 100%; left: 0; top: 0; z-index: 0;}
    .wea_box .bgImg img{width: 200%; height: 100%; animation: moveCloud 50s infinite;}
    .wea_box .bgImg img.twinkle{width: 100%; height: 100%; animation: twinkle 8s infinite;}
    section.main .wea_box .cont{ width: 100%; padding: 0; height: 100%;}
    .wea_box .box{border-right: 1px solid #ccc; width: 20%; height: 100%;float: left; background: rgba(0,0,255,0.4); text-align: center; position: relative;}
    .wea_box .box:last-child{border-right: 1px solid #ccc;}
    .wea_box .box .top{line-height: 22px;font-size: 12px; margin-top: 5px;}
    .wea_box .box .top .week{font-size: 13px;}
    .wea_box .box .top img{display: block; width: 30px; margin: 0 auto;}
    .wea_box .box .bottom{position: absolute; bottom: 5px; width: 100%; font-size: 13px; line-height: 25px;}
    .wea_box .more{font-size: 12px; text-align: right; width: 90%; margin: 10px auto;  font-style: italic;position: relative; z-index: 12;}
    .wea_box .more a{color: #ff8;}
    #weather{width: 100%; height: 80%; position: absolute; left: 0; top: 20%;}
    @keyframes moveCloud{
      0% {transform: translate(0%,0%);}
      50%{transform: translate(-50%,0%);}
      100%{transform: translate(0%,0%);}
    }
    @keyframes twinkle{
      0% {transform: scale(1);}
      50%{transform: scale(1.08);}
      100%{transform: scale(1);}
    }
</style>
