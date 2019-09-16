<template>
  <div id="BarPieChart" ></div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import echarts from "echarts";

export default {
  name: 'BarPieChart',
  data () {
    return {
      
    }
  },
  methods:{
    regional:function(){
      var myChart = this.$echarts.init(document.getElementById('BarPieChart'));

      var dataMap = {};
      function dataFormatter(obj) {
        var pList = ['北京','天津','河北','上海','江苏'];
        var temp;
        for (var year = 2010; year <= 2019; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = { name : pList[i], value : temp[i]}
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      dataMap.dataPI = dataFormatter({
        2019:[16251.93,11307.28,24515.76,11237.55,14359.88],
        2018:[14113.58,9224.46,20394.26,9200.86,11672],
        2017:[12153.03,7521.85,17235.48,7358.31,9740.25],
        2016:[11115,6719.01,16011.97,7315.4,8496.2],
        2015:[9846.81,5252.76,13607.32,6024.45,6423.18],
        2014:[8117.78,4462.74,11467.6,4878.61,4944.25],
        2013:[6969.52,3905.64,10012.11,4230.53,3905.03],
        2012:[6033.21,3110.97,8477.63,3571.37,3041.07],
        2011:[5007.21,2578.03,6921.29,2855.23,2388.38],
        2010:[4315,2150.76,6018.28,2324.8,1940.94]
      });

      dataMap.dataSI = dataFormatter({
        //max : 26600,
        2019:[3752.48,5928.32,13126.86,6635.26,8037.69],
        2018:[3388.38,4840.23,10707.68,5234,6367.69],
        2017:[2855.55,3987.84,8959.83,3993.8,5114],
        2016:[2626.41,3709.78,8701.34,4242.36,4376.19],
        2015:[2509.4,2892.53,7201.88,3454.49,3193.67],
        2014:[2191.43,2457.08,6110.43,2755.66,2374.96],
        2013:[2026.51,2135.07,5271.57,2357.04,1773.21],
        2012:[1853.58,1685.93,4301.73,1919.4,1248.27],
        2011:[1487.15,1337.31,3417.56,1463.38,967.49],
        2010:[1249.99,1069.08,2911.69,1134.31,754.78]
      });

      dataMap.dataTI = dataFormatter({
        //max : 25000,
        2019:[12363.18,5219.24,8483.17,3960.87,5015.89],
        2018:[10600.84,4238.65,7123.77,3412.38,4209.03],
        2017:[9179.19,3405.16,6068.31,2886.92,3696.65],
        2016:[8375.76,2886.65,5276.04,2759.46,3212.06],
        2015:[7236.15,2250.04,4600.72,2257.99,2467.41],
        2014:[5837.55,1902.31,3895.36,1846.18,1934.35],
        2013:[4854.33,1658.19,3340.54,1611.07,1542.26],
        2012:[4092.27,1319.76,2805.47,1375.67,1270],
        2011:[3435.95,1150.81,2439.68,1176.65,1000.79],
        2010:[2982.57,997.47,2149.75,992.69,811.47]
      });



      var option = {
        baseOption: {
            timeline: {
              axisType: 'category',
              autoPlay: true,
              playInterval: 1000,
              bottom:0,
              left:20,
              right:20,
              lineStyle:{color:'#aa6'},
              itemStyle:{color:'#fe3'},
              controlStyle:{borderColor:'#aa6'},
              data: [
                '2010-01-01','2011-01-01','2012-01-01',
                {
                  value: '2013-01-01',
                  tooltip: {formatter: '{b} GDP达到一个高度'},
                  symbol: 'diamond',
                  symbolSize: 16
                },
                '2014-01-01', '2015-01-01','2016-01-01','2017-01-01','2018-01-01',
                {
                  value: '2019-01-01',
                  tooltip: {formatter: function (params) { return params.name + 'GDP达到又一个高度'; }},
                  symbol: 'diamond',
                  symbolSize: 18
                },
              ],
              label: {
                color:'#aa6',
                formatter : function(s) {return (new Date(s)).getFullYear();}
              }
            },
            title: {
              left: '20',
              textStyle: { color: '#0ff',fontSize:'18px' }
            },
            tooltip: {},
            textStyle: { color: '#ccc',fontSize:'14px' },
            legend: {
              x: 'right',
              textStyle: { color: '#ccc',fontSize:'14px' },
              data: ['手机', '电脑', '平板'],
            },
            calculable : true,
            grid: {
              top: 50,
              left:60,
              right:20,
              bottom: 75
            },
            xAxis: [{
              'type':'category',
              'axisLabel':{'interval':0},
              'data':['北京','天津','河北','上海','江苏'],
              nameTextStyle: { color: '#fff',fontSize:'14px' },
              splitLine: {show: false}
            }],
            axisLine: {lineStyle:{color: '#fff'}},
            yAxis: [{
              type: 'value',
              nameTextStyle: { color: '#ddd',fontSize:'14px' },
              name: 'GDP（亿元）',
              max: 30000
            }],
            series: [
                {name: '手机', type: 'bar'},
                {name: '电脑', type: 'bar'},
                {name: '平板', type: 'bar'},
                {
                  name: 'GDP占比',
                  type: 'pie',
                  center: ['75%', '35%'],
                  radius: '28%'
                }
            ]
        },
        options: [
            {
                title: {text: '2010全国销售量',top:-5},
                color:['#f66','#6f6','#66f'],
                series: [
                  {data: dataMap.dataPI['2010']},
                  {data: dataMap.dataSI['2010']},
                  {data: dataMap.dataTI['2010']},
                  {data: [
                    {name: '手机', value: dataMap.dataPI['2010sum']},
                    {name: '电脑', value: dataMap.dataSI['2010sum']},
                    {name: '平板', value: dataMap.dataTI['2010sum']}
                  ]}
                ]
            },
            {
              title : {text: '2011全国销售量',top:-5},
              series : [
                  {data: dataMap.dataPI['2011']},
                  {data: dataMap.dataSI['2011']},
                  {data: dataMap.dataTI['2011']},
                  {data: [
                      {name: '手机', value: dataMap.dataPI['2011sum']},
                      {name: '电脑', value: dataMap.dataSI['2011sum']},
                      {name: '平板', value: dataMap.dataTI['2011sum']}
                  ]}
              ]
            },
            {
                title : {text: '2012全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2012']},
                    {data: dataMap.dataSI['2012']},
                    {data: dataMap.dataTI['2012']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2012sum']},
                        {name: '电脑', value: dataMap.dataSI['2012sum']},
                        {name: '平板', value: dataMap.dataTI['2012sum']}
                    ]}
                ]
            },
            {
                title : {text: '2013全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2013']},
                    {data: dataMap.dataSI['2013']},
                    {data: dataMap.dataTI['2013']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2013sum']},
                        {name: '电脑', value: dataMap.dataSI['2013sum']},
                        {name: '平板', value: dataMap.dataTI['2013sum']}
                    ]}
                ]
            },
            {
                title : {text: '2014全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2014']},
                    {data: dataMap.dataSI['2014']},
                    {data: dataMap.dataTI['2014']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2014sum']},
                        {name: '电脑', value: dataMap.dataSI['2014sum']},
                        {name: '平板', value: dataMap.dataTI['2014sum']}
                    ]}
                ]
            },
            {
                title : {text: '2015全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2015']},
                    {data: dataMap.dataSI['2015']},
                    {data: dataMap.dataTI['2015']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2015sum']},
                        {name: '电脑', value: dataMap.dataSI['2015sum']},
                        {name: '平板', value: dataMap.dataTI['2015sum']}
                    ]}
                ]
            },
            {
                title : {text: '2016全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2016']},
                    {data: dataMap.dataSI['2016']},
                    {data: dataMap.dataTI['2016']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2016sum']},
                        {name: '电脑', value: dataMap.dataSI['2016sum']},
                        {name: '平板', value: dataMap.dataTI['2016sum']}
                    ]}
                ]
            },
            {
                title : {text: '2017全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2017']},
                    {data: dataMap.dataSI['2017']},
                    {data: dataMap.dataTI['2017']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2017sum']},
                        {name: '电脑', value: dataMap.dataSI['2017sum']},
                        {name: '平板', value: dataMap.dataTI['2017sum']}
                    ]}
                ]
            },
            {
                title : {text: '2018全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2018']},
                    {data: dataMap.dataSI['2018']},
                    {data: dataMap.dataTI['2018']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2018sum']},
                        {name: '电脑', value: dataMap.dataSI['2018sum']},
                        {name: '平板', value: dataMap.dataTI['2018sum']}
                    ]}
                ]
            },
            {
                title : {text: '2019全国销售量',top:-5},
                series : [
                    {data: dataMap.dataPI['2019']},
                    {data: dataMap.dataSI['2019']},
                    {data: dataMap.dataTI['2019']},
                    {data: [
                        {name: '手机', value: dataMap.dataPI['2019sum']},
                        {name: '电脑', value: dataMap.dataSI['2019sum']},
                        {name: '平板', value: dataMap.dataTI['2019sum']}
                    ]}
                ]
            }
        ]
      };

      myChart.setOption(option);
    }
  },
  mounted:function(){
    this.regional();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #BarPieChart{width: 100%; height:200px;}
</style>
