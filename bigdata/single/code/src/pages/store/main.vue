<template>
    <section class="main">
      <div class="aside">
        <h2><i class="fa fa-shopping-bag"></i> 各地区门店</h2>
        <p :class="{'cur':cityName=='all'}" @click="mapRander('all')">全国地区<span>(106)</span></p>
        <p :class="{'cur':cityName=='beijing'}" @click="mapRander('beijing')">北京市<span>(22)</span></p>
        <p :class="{'cur':cityName=='shanghai'}" @click="mapRander('shanghai')">上海市<span>(18)</span></p>
        <p :class="{'cur':cityName=='hebei'}" @click="mapRander('hebei')">河北省<span>(16)</span></p>
        <p :class="{'cur':cityName=='shandong'}" @click="mapRander('shandong')">山东省<span>(19)</span></p>
        <p :class="{'cur':cityName=='jiangsu'}" @click="mapRander('jiangsu')">江苏省<span>(15)</span></p>
        <p :class="{'cur':cityName=='zhejiang'}" @click="mapRander('zhejiang')">浙江省<span>(16)</span></p>
        <div class="footer">sunny 版权所有</div>
      </div>
      <div class="cont">
        <div class="left">
          <div id="map"></div>
        </div>
        <div class="right">
          <div class="top clear">
            <div class="left">
              <h5>{{cityNumData[1]}}</h5>
              <p>{{cityNumData[0]}}门店总数量</p>
            </div>
            <div class="right">
              <h5>{{cityNumData[2]}}</h5>
              <p>本地区职工总数量</p>
            </div>
          </div>
          <div class="bottom">
            <table>
              <thead><th>分店名称</th><th>{{cityName=="all"?'数量':'操作'}}</th><th>当职员工</th></thead>
              <tbody v-if='cityName=="all"'>
                <tr><td @click="mapRander('beijing')">北京市全体分店</td><td>22</td><td>688</td></tr>
                <tr><td @click="mapRander('shanghai')">上海市全体分店</td><td>18</td><td>466</td></tr>
                <tr><td @click="mapRander('hebei')">河北省全体分店</td><td>16</td><td>232</td></tr>
                <tr><td @click="mapRander('shandong')">山东省全体分店</td><td>19</td><td>254</td></tr>
                <tr><td @click="mapRander('jiangsu')">江苏省全体分店</td><td>15</td><td>218</td></tr>
                <tr><td @click="mapRander('zhejiang')">浙江省全体分店</td><td>16</td><td>230</td></tr>
              </tbody>
              <tbody v-if='cityName=="beijing"'>
                <tr v-for='(item,index) in cityData' :key="index">
                  <td>{{'北京市'+item.name+'分店'}}</td>
                  <td><router-link to='/Store/Detail'>查看详情</router-link></td>
                  <td>{{item.value[2]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import Header from '@/components/head'

import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/beijing.js'
import '../../../node_modules/echarts/map/js/province/shanghai.js'
import '../../../node_modules/echarts/map/js/province/hebei.js'
import '../../../node_modules/echarts/map/js/province/shandong.js'
import '../../../node_modules/echarts/map/js/province/jiangsu.js'
import '../../../node_modules/echarts/map/js/province/zhejiang.js'

export default {
  name: 'Store',
  components:{
    Header
  },
  data () {
    return {
      liHeight:200,
      menustate:0,
      cityName:'all',
      cityNumData:['全国',106,2088],
      cityData:[
        {name: '北京',value: [116.46,39.92,22]},
        {name: '河北',value: [114.48,38.03,16]},
        {name: '山东',value: [117,36.65,19]},
        {name: '江苏',value: [118.98,33.04,15]},
        {name: '浙江',value: [120.19,29.26,16]},
        {name: '上海',value: [121.48,31.22,18]},  
      ]
    }
  },
  methods:{
    mapRander:function(city){
      this.cityName=city;
      var cityZH='全国';
      if(city=='all'){
        cityZH='全国';
        this.cityNumData=[cityZH,106,2088]
        this.cityData=[
          {name: '北京',value: [116.46,39.92,22]},
          {name: '河北',value: [114.48,38.03,16]},
          {name: '山东',value: [117,36.65,19]},
          {name: '江苏',value: [118.98,33.04,15]},
          {name: '浙江',value: [120.19,29.26,16]},
          {name: '上海',value: [121.48,31.22,18]}, 
        ];
      }
      if(city=='beijing'){
        cityZH='北京';
        this.cityNumData=[cityZH,22,688]
        this.cityData=[
          {name: '东城区',value: [116.418757,39.917544,2]},
          {name: '西城区',value: [116.366794,39.915309,2]},
          {name: '朝阳区',value: [116.486409,39.921489,3]},
          {name: '丰台区',value: [116.286968,39.863642,2]},
          {name: '海淀区',value: [116.310316,39.956074,3]},
          {name: '房山区',value: [116.139157,39.735535,2]},
          {name: '通州区',value: [116.658603,39.902486,2]},
          {name: '顺义区',value: [116.653525,40.128936,1]},
          {name: '昌平区',value: [116.235906,40.218085,3]},
          {name: '大兴区',value: [116.338033,39.728908,2]}   
        ];
      }
      if(city=='shanghai'){
        cityZH='上海';
        this.cityNumData=[cityZH,18,466]
        this.cityData=[
          {name: '上海',value: [121.48,31.22,18]}, 
        ];
      }
      if(city=='hebei'){
        cityZH='河北';
        this.cityNumData=[cityZH,16,232]
        this.cityData=[{name: '河北',value: [114.48,38.03,16]}];
      }
      if(city=='shandong'){
        cityZH='山东';
        this.cityNumData=[cityZH,19,254]
        this.cityData=[{name: '山东',value: [117,36.65,19]}];
      }
      if(city=='jiangsu'){
        cityZH='江苏';
        this.cityNumData=[cityZH,15,218]
        this.cityData=[{name: '江苏',value: [118.98,33.04,15]}];
      }
      if(city=='zhejiang'){
        cityZH='浙江';
        this.cityNumData=[cityZH,16,230]
        this.cityData=[{name: '浙江',value: [120.19,29.26,16]}];
      }
      var myChart = this.$echarts.init(document.getElementById('map'));
      var option = {
        title : {text: cityZH+'门店分布图',left: '20',textStyle:{color:'#f60',fontSize:'18'}},
        tooltip : {trigger: 'item'},
        legend: {right: '20',bottom:'10',data:[cityZH+'门店分布'],textStyle:{color:'#f60'}},
        visualMap: {min: 0,max: city=='all'?20:3, left: 'left', top: 'bottom',color:['#f60','#fff'],text:['高','低'],calculable : true},
        toolbox: {show: true,left: 'right',iconStyle:{borderColor:'#f60'},feature : {saveAsImage : {show: true}}},
        geo: {map: city=='all'?'china':cityZH,label: { emphasis: { color:'#235',fontSize:'13'}},roam: true,itemStyle: {normal: { areaColor: '#68a', borderColor: '#111'},emphasis: { areaColor: '#69a'}}},
        series : [
          {
            name: '全国门店分布',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data:this.cityData,
            symbolSize: function (val) {return city=='all'?val[2] / 1.5:val[2]*5;},
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke'},
            hoverAnimation: true,
            label: {
              normal: {
                formatter: function(datas){
                  return city=='all'?datas.name+'('+datas.value[2]+')':datas.value[2];
                },
                fontWeight:'bold',
                fontSize:'12',
                position: 'right',
                show: true
              }
            },
            tooltip:{
              formatter: function(datas){
                var tit='<h2 style="font-size:16px;padding-right:20px;">'+(datas.seriesName)+'</h2>';
                return tit+datas.name+'：'+datas.value[2]+'家门店'
              },
            },
            zlevel: 1
          }
        ]
      };
      
      myChart.setOption(option);
    }
  },
  mounted:function(){
    var that=this;
    if(this.$route.query.city){
      this.mapRander(this.$route.query.city);
    }else this.mapRander('all');
  },
  
}
</script>

