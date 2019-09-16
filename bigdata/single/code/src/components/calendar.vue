<template>
  <div class="calendar">
    <h2>{{yymm}}</h2>
    <table>
      <thead>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
      </thead>
      <tbody>
        <tr v-for='list in curDateArr'>
          <td v-for='item in list'>
            <span v-for='(value,key) in item' :class="{'prev':key=='prev'||key=='next','cur':key=='now'}">{{value}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'


export default {
  name: 'Calendar',
  data () {
    return {
      yymm:'',
      curDateArr:[]
    }
  },
  methods:{
    weatherCHart:function(){
      var dateArr=[]
      var now=new Date();
      var curYear=now.getFullYear();
      var curDay=now.getDate();
      var curMonth=now.getMonth()+1;
      var curWeek=now.getDay();//获取当前星期X(0-6,0代表星期天)
      this.yymm=curYear+'年'+curMonth+'月';

      var mouthDay=[31,curYear%100==0?(curYear%400==0?29:28):(curYear%4==0?29:28),31,30,31,30,31,31,30,31,30,31]
      var initWeek=new Date(curYear,curMonth,1).getDay();

      var prevMonthDay=mouthDay[curMonth-2];
      
      dateArr.push([]);
      for(var i=prevMonthDay;i>prevMonthDay-initWeek;i--){
        dateArr[dateArr.length-1].unshift({'prev':i})
      }

      for(var j=1;j<=mouthDay[curMonth-1];j++){
        (j==curDay)?dateArr[dateArr.length-1].push({'now':j}):dateArr[dateArr.length-1].push({'cur':j});
        if((j+initWeek)%7==0) dateArr.push([]); 
      }

      if(dateArr[dateArr.length-1].length<7){
        for(var k=0;k<=7-dateArr[dateArr.length-1].length;k++){
          dateArr[dateArr.length-1].push({'next':k+1});
        }
      }
      this.curDateArr=dateArr;
    },
  },
  mounted:function(){
    this.weatherCHart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .calendar{width: 98%; height: 48%; margin:2% auto; border: 1px solid #555; position: relative; background: #36a;font-size: 13px; color: #fff; overflow:hidden; border-radius: 10px;}
    .calendar h2{text-align: center; margin-top: 10px;}
    .calendar table{line-height: 25px; width: 94%; margin: 10px 3%; border: 1px solid #eee;}
    .calendar th{border-bottom: 1px solid #aaa; padding: 5px;}
    .calendar td{border-bottom: 1px solid #aaa; padding: 5px; text-align: center;}
    .calendar tr:last-child td{border-bottom: 0;}
    .calendar td span.prev{color: #aaa;}
    .calendar td span.cur{color: #ff0; font-size: 14px; font-weight: 700;}
</style>
