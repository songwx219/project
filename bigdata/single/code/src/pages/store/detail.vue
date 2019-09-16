<template>
  <div class="container">
    <Header></Header>
    <section class="main">
      <div class="aside">
        <h2><i class="fa fa-shopping-bag"></i> 北京市朝阳区门店</h2>
        <p :class="{'cur':cityName=='0'}"><router-link to="/Store?city=beijing">北京全部门店</router-link></p>
        <p :class="{'cur':cityName=='1'}">销售数据</p>
        <p :class="{'cur':cityName=='2'}">组织架构</p>
        <p :class="{'cur':cityName=='3'}">店面图片</p>
        <div class="footer">sunny 版权所有</div>
      </div>
      <div class="cont">
        <div class="left">
          <div class="picShow">
            <div class="bigPic">
              <img src="../../assets/images/store.jpg" alt="">
              <div class="prev"><i class="fa fa-chevron-left"></i></div>
              <div class="next"><i class="fa fa-chevron-right"></i></div>
            </div>
            <div class="smallPic">
              <ul>
                <li><img src="../../assets/images/overcast.jpg" alt=""></li>
                <li class="cur"><img src="../../assets/images/store.jpg" alt=""></li>
                <li><img src="../../assets/images/sunny.jpg" alt=""></li>
                <li><img src="../../assets/images/snow.gif" alt=""></li>
                <li><img src="../../assets/images/overcast.jpg" alt=""></li>
                <li><img src="../../assets/images/cloudy.jpg" alt=""></li>
                <li><img src="../../assets/images/sunny.jpg" alt=""></li>
                <li><img src="../../assets/images/snow.gif" alt=""></li>
                <li><img src="../../assets/images/sunny.jpg" alt=""></li>
                <li><img src="../../assets/images/snow.gif" alt=""></li>
              </ul>
              <div class="prev"><i class="fa fa-angle-left"></i></div>
              <div class="next"><i class="fa fa-angle-right"></i></div>
            </div>
          </div>
        </div>
        <div class="right">
          <Weather></Weather>
          <Calendar></Calendar>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'

import Header from '@/components/head'
import Weather from '@/components/weather'
import Calendar from '@/components/calendar'

export default {
  name: 'Store',
  components:{
    Header,
    Weather,
    Calendar
  },
  data () {
    return {
      cityName:'3',
    }
  },
  methods:{
    
  },
  mounted:function(){
  },
  
}
</script>

