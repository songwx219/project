<template>
  <div class="index_cont">
    <div class="header">
      <div class="left">{{timeNow}}</div>
      <div class="middle">sunny的管理平台</div>
      <div class="right">
        <strong>你好，admin！<i class="fa fa-caret-down"></i></strong>
        <i class="fa fa-volume-up msg"></i>
        <span class="num">10</span>
      </div>
    </div>
    <div :class="['menu',menustate==0?'':'cur']">
      <div :class="['btnChange',menustate==0?'icon':'close']" @click="menustate=menustate==0?1:0">
        <i :class="['fa',menustate==0?'fa-list-ul':'fa-times']"></i>
      </div>
      <div class="cont" v-if='menustate==1'>
        <ul>
          <li class="l"><router-link to="/">****</router-link></li>
          <li class="r"><router-link to="Store">门店管理</router-link></li>
          <li class="l"><router-link to="/">****</router-link></li>
          <li class="r"><router-link to="/">****</router-link></li>
          <li class="l"><router-link to="/">****</router-link></li>
          <li class="r"><router-link to="/">****</router-link></li>
          <li class="l"><router-link to="/">****</router-link></li>
          <li class="r"><router-link to="/">****</router-link></li>
        </ul>
      </div>
    </div>
    <section>
      <ul class="main">
        <li>
          <h2>类别分析<small>数据列表</small><small>数据图</small></h2>
          <div id="one" class="echarts"></div>
        </li>
        <li>
          <h2>用户分析<small>数据列表</small><small>数据图</small></h2>
          <div id="two" class="echarts"></div>
        </li>
        <li>
          <div class="echarts news">
            <h2>新闻资讯<small>系统公告</small><small>行业新闻</small></h2>
            <p v-for='(item,index) in newsData'>
              <span>{{item[0]}}</span>
              <i :class="{'one':index==0,'two':index==1,'three':index==2}">{{index+1}}</i>
              <a href="#">{{item[1]}}</a>
            </p>
          </div>
        </li>
        <li>
          <h2>当年销售总额<small>数据列表</small><small>数据图</small></h2>
          <div class="echarts">
            <ChinaMapChart></ChinaMapChart>
          </div>
        </li>
        <li>
          <h2>实时销售额<small>数据列表</small><small>数据图</small></h2>
          <div class="echarts">
            <ConstantLineChart></ConstantLineChart>
          </div>
        </li>
        <li>
          <h2>历年销售额<small>数据列表</small><small>数据图</small></h2>
          <div class="echarts">
            <BarPieChart></BarPieChart>
          </div>
        </li>
      </ul>
    </section>
    <div class="footer">
      sunny 版权所有
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

import ChinaMapChart from '@/components/chinaMapChart'
import BarPieChart from '@/components/barPieChart'
import ConstantLineChart from '@/components/constantLineChart'

export default {
  name: 'Index',
  components:{
    ChinaMapChart,
    BarPieChart,
    ConstantLineChart
  },
  data () {
    return {
      liHeight:200,
      menustate:0,
      timeNow:'',
      newsData:[
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成'],
        ['15:22:35','全球最大自贸区诞生：日欧EPA今日生效，贸易额占全球四成']
      ]
    }
  },
  methods:{
    menushow:function(){
      this.menustate=1;
    },
    category:function(){
      var myChart = this.$echarts.init(document.getElementById('one'));

      var dataSJ = [ [289,251,299,257,256,278,247,260,238,289,297,288] ];
      var dataDN = [ [236,217,225,195,218,208,196,239,223,195,219,228] ];
      var dataPB = [ [158,157,189,168,174,196,178,199,196,177,186,165] ];
      var lineStyle = { normal: { width: 1, opacity: 0.5 } };

      var option = {
          title: {
              text: '销售类别Top3',
              left: '20',
              textStyle: { color: '#0ff',fontSize:'18px' }
          },
          legend: {
              right: 5,
              orient: 'vertical',
              data: ['手机', '电脑', '平板'],
              itemGap: 20,
              textStyle: {
                  color: '#ffa',
                  fontSize: 14
              },
              // selectedMode: 'single'
          },
          radar: {
              indicator: [
                  {name: '1月', max: 300},
                  {name: '2月', max: 300},
                  {name: '3月', max: 300},
                  {name: '4月', max: 300},
                  {name: '5月', max: 300},
                  {name: '6月', max: 300},
                  {name: '7月', max: 300},
                  {name: '8月', max: 300},
                  {name: '9月', max: 300},
                  {name: '10月', max: 300},
                  {name: '11月', max: 300},
                  {name: '12月', max: 300}
              ].reverse(),
              shape: 'circle',
              splitNumber: 4,
              name: { textStyle: { color: 'rgb(238, 197, 102)' } },
              splitLine: {
                  lineStyle: {
                      color: [
                          'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                          'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.4)',
                          'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)'
                      ]
                  }
              },
              splitArea: {show: false},
              axisLine: { lineStyle: { color: 'rgba(238, 197, 102, 0.5)' } }
          },
          series: [
              {
                  name: '手机',
                  type: 'radar',
                  lineStyle: lineStyle,
                  data: dataSJ,
                  symbol: 'circle',
                  emphasis:{label:{show:true},itemStyle:{color:'#fff'}},
                  itemStyle: {normal: { color: '#F9713C'}},
                  areaStyle: {normal: {opacity: 0.1}}
              },
              {
                  name: '电脑',
                  type: 'radar',
                  lineStyle: lineStyle,
                  data: dataDN,
                  symbol: 'circle',
                  emphasis:{label:{show:true},itemStyle:{color:'#fff'}},
                  itemStyle: {normal: { color: '#8e8'}},
                  areaStyle: {normal: {opacity: 0.2}}
              },
              {
                  name: '平板',
                  type: 'radar',
                  lineStyle: lineStyle,
                  data: dataPB,
                  symbol: 'circle',
                  emphasis:{label:{show:true},itemStyle:{color:'#fff'}},
                  itemStyle: {normal: { color: '#ee8'}},
                  areaStyle: {normal: {opacity: 0.3}}
              }
          ]
      };
      myChart.setOption(option);
    },
    age:function(){
      var myChart = this.$echarts.init(document.getElementById('two'));

      var data = [{
          name:'总',
          value:10,
          children: [{
            name:"新用户",
            value: 4,
            children: [{
              name:'线下',
              value: 2,
              label: {rotate: 'tangential'},
              children: [{
                name:'20岁以下',
                value: 0.3,
                itemStyle:{ color: '#b6b'}
              },{
                name:'20~30岁',
                value: 0.8,
                itemStyle: { color: '#c8c'}
              },{
                name:'30~40岁',
                value: 0.7,
                itemStyle: { color: '#d9d'}
              },{
                name:'40岁以上',
                value: 0.2,
                itemStyle: { color: '#eae'}
              }],
              itemStyle:{ color: '#a5a'}
            },{
              name:'线上',
              value: 2,
              label: {rotate: 'tangential'},
              children: [{
                name:'20岁以下',
                value: 0.3,
                itemStyle:{ color: '#6bb'}
              },{
                name:'20~30岁',
                value: 0.8,
                itemStyle: { color: '#7cc'}
              },{
                name:'30~40岁',
                value: 0.7,
                itemStyle: { color: '#8dd'}
              },{
                name:'40岁以上',
                value: 0.2,
                itemStyle: { color: '#9ee'}
              }],
              itemStyle: { color: '#5aa'}
            }],
            itemStyle:  { color: '#f60'}
          },
          {
            name:"老用户",
            value: 6,
            children: [{
              name:'20岁以下',
              value: 1,
              itemStyle:{ color: '#393'},
                label:{position: 'outside'}
            },{
              name:'20~30岁',
              value: 2.5,
              itemStyle: { color: '#4a4'},
                label:{position: 'outside'}
            },{
              name:'30~40岁',
              value: 2,
              itemStyle: { color: '#5b5'},
                label:{position: 'outside'}
            },{
              name:'40岁以上',
              value: 0.5,
              itemStyle: { color: '#6c6'},
                label:{position: 'outside'}
            }],
            itemStyle: { color: '#282'}
          }],
          itemStyle: { color: '#f88'}
      }];

      var option = {
        title: {
          text: '2019年用户分析',
          left: '20',
          textStyle: { color: '#0ff',fontSize:'18px' }
        },
        series: {
            radius: ['0%', '80%'],
            type: 'sunburst',
            sort: null,
            emphasis:{label:{show:true}},
            highlightPolicy: 'ancestor',
            data: data,
            label: { rotate: 'radial',borderWidth:0,fontSize:'12px'},
            levels: [{}, {
              r0: '5%',
              r: '15%',
              label: { rotate: 'tangential' }
            }, {
              r0: '15%',
              r: '35%',
              label: { rotate: 'tangential'}
            }, {
              r0: '35%',
              r: '50%',
              label: {
              }
            }, {
              r0: '50%',
              r: '55%',
              label: { position: 'outside',}
            }],
            itemStyle: { borderWidth: 1}
        }
      };
      myChart.setOption(option);
    }
  },
  mounted:function(){
    var that=this;
    function initHei(){
      var mainLiH=($(window).height()-140)/2;
      $('.main>li').height(mainLiH);
      $('.main .echarts').height(mainLiH-50);
      $('.echarts.news p').css({'line-height':(mainLiH-60)/8+'px'});
    }
    initHei();
    $(window).on('resize',initHei);

    var weekArr = new Array("日", "一", "二", "三", "四", "五", "六");
    setInterval(function(){
      var now=new Date();
      var date=now.getFullYear()+'年'+(now.getMonth() + 1)+'月'+now.getDate()+'日 ';
      var time=[
            now.getHours()<10?'0'+now.getHours():now.getHours(),
            now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
            now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()
          ].join(':');
      var week=now.getDay();
      that.timeNow=date+time+' 星期'+weekArr[week];
    },1000)
    
    this.category();
    this.age();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
