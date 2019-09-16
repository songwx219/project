<template>
  <div id="constantLineChart" ></div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import echarts from "echarts";

export default {
  name: 'ConstantLineChart',
  data () {
    return {
      
    }
  },
  methods:{
    regional:function(){
      var myChart = this.$echarts.init(document.getElementById('constantLineChart'));

      // var base = +new Date(2014, 9, 3);
      // console.log(base)

      var date = [];
      var data = [Math.floor(Math.random() * 150)];

      var now = (new Date()).getTime();
      var time=new Date(now);
      var dateNow=time.getFullYear()+'年'+(time.getMonth() + 1)+'月'+time.getDate()+'日';

      for (var i = 0; i <10; i++) {
          now-=20*1000;
          time=new Date(now);

          date.unshift([
            time.getHours()<10?'0'+time.getHours():time.getHours(),
            time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes(),
            time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds()
          ].join(':'));
          data.unshift(Math.floor(Math.random() * 120)+20);
      }
      
      function addData(shift) {
          now=new Date();

          date.push([
            now.getHours()<10?'0'+now.getHours():now.getHours(),
            now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(),
            now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()
          ].join(':'));
          data.push(Math.floor(Math.random() * 120)+20);

          if (shift) {
              date.shift();
              data.shift();
          }
      }

      var option = {
          title: {
              text:dateNow+'实时销售额',
              left: '20',
              textStyle: { color: '#0ff',fontSize:'18px' }
            },
          textStyle:{color:'#aaa'},
          grid: {
              top: 60,
              left:50,
              right:50,
              bottom: 40
            },
          xAxis: {
              name:'时间',
              type: 'category',
              boundaryGap: false,
              data: date,
              // nameTextStyle: { color: '#fff',fontSize:'14px' },
          },
          yAxis: {
              name:'销售额（万元）',
              boundaryGap: [0, '50%'],
              // nameTextStyle: { color: '#ddd',fontSize:'14px' },
              type: 'value'
          },
          tooltip : {
              trigger: 'item'
          },
          series: [
              {
                  name:'成交',
                  type:'line',
                  smooth:true,
                  symbol: 'none',
                  stack: 'a',
                  areaStyle: {
                      normal: {}
                  },
                  data: data
              }
          ]
      };
      myChart.setOption(option);
      setInterval(function () {
          addData(true);
          option.xAxis.data=date;
          option.series.data=data;
          myChart.setOption(option);
      }, 5000);

      // myChart.setOption(option);
    }
  },
  mounted:function(){
    this.regional();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #constantLineChart{width: 100%; height:200px;}
</style>
