webpackJsonp([1],{"1o/5":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("7+uW");var s=e("2Hch"),i=e("mvHQ"),r=e.n(i),n=e("7t+N"),c=e.n(n),l=e("XLwt"),o=e.n(l),v={},_="",u="",h=[],d=[],f=[];function m(){v=JSON.parse(localStorage.weather),_=v.area,(u=v.data).forEach(function(t){h.push(t.maxTemp),d.push(t.minTemp),f.push(t.date)})}function p(t){c.a.ajax({url:"http://cdn.weather.hao.360.cn/sed_api_weather_info.php?app=360chrome",type:"GET",dataType:"jsonp",jsonp:"_jsonp",success:function(a){var e=a.area[2][0],s=a.weather,i=[],n=(new Date).getDay(),c="";for(var l in s){switch((l-0+n)%7){case 0:c="星期日";break;case 1:c="星期一";break;case 2:c="星期二";break;case 3:c="星期三";break;case 4:c="星期四";break;case 5:c="星期五";break;case 6:c="星期六"}0==l&&(c="今天"),i.push({date:s[l].date,week:c,maxTemp:s[l].info.day[2],minTemp:s[l].info.night[2],weath:s[l].info.day[1],wind:s[l].info.day[3],class:s[l].info.day[4]})}localStorage.weather=r()({area:e,time:(new Date).getTime(),data:i}),t()}})}localStorage.weather?(new Date).getTime()-36e5>JSON.parse(localStorage.weather).time?p(m):m():p(m);var g={name:"HelloWorld",data:function(){return{area:_,weather:u}},methods:{weatherCHart:function(){var t=o.a.init(document.getElementById("weather")),a={color:["#fd6","#6df"],tooltip:{trigger:"axis"},xAxis:{show:!1,data:f},yAxis:{show:!1},grid:{left:0,right:0},series:[{name:"最高温",type:"line",data:h,label:{show:!0}},{name:"最低温",type:"line",data:d,label:{show:!0,position:"bottom"}}]};t.setOption(a)}},mounted:function(){this.weatherCHart()}},w={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"wea_box",attrs:{id:"weather_box"}},[s("div",{staticClass:"bgImg"},["多云"==t.weather[0].weath?s("img",{attrs:{src:e("ehim"),alt:""}}):t._e(),t._v(" "),"阴"==t.weather[0].weath?s("img",{attrs:{src:e("oHm1"),alt:""}}):t._e(),t._v(" "),t.weather[0].weath.indexOf("雪")>0?s("img",{attrs:{src:e("Wgba"),alt:""}}):t._e(),t._v(" "),"晴"==t.weather[0].weath?s("img",{staticClass:"twinkle",attrs:{src:e("SdOn"),alt:""}}):t._e()]),t._v(" "),s("div",{staticClass:"cont"},t._l(t.weather,function(a){return s("div",{staticClass:"box"},[s("div",{staticClass:"top"},[s("p",{staticClass:"week"},[t._v(t._s(a.week))]),t._v(" "),s("p",{staticClass:"data"},[t._v(t._s(a.date.slice(5,7)+"/"+a.date.slice(8,10)))]),t._v(" "),s("p",{staticClass:"weath"},[t._v("\n          "+t._s(a.weath)+"\n          "),"多云"==a.weath?s("img",{attrs:{src:e("ifDj"),alt:""}}):t._e(),t._v(" "),"阴"==a.weath?s("img",{attrs:{src:e("2dow"),alt:""}}):t._e(),t._v(" "),"晴"==a.weath?s("img",{attrs:{src:e("WEuK"),alt:""}}):t._e()])]),t._v(" "),s("div",{staticClass:"bottom"},[s("p",[t._v(t._s(a.wind))]),t._v(" "),s("p",[t._v(t._s(a.class))])])])}),0),t._v(" "),s("div",{attrs:{id:"weather"}})])},staticRenderFns:[]};var C=e("VU/8")(g,w,!1,function(t){e("yjbz")},"data-v-88cc79ba",null).exports,y={name:"Calendar",data:function(){return{yymm:"",curDateArr:[]}},methods:{weatherCHart:function(){var t=[],a=new Date,e=a.getFullYear(),s=a.getDate(),i=a.getMonth()+1;a.getDay();this.yymm=e+"年"+i+"月";var r=[31,e%100==0?e%400==0?29:28:e%4==0?29:28,31,30,31,30,31,31,30,31,30,31],n=new Date(e,i,1).getDay(),c=r[i-2];t.push([]);for(var l=c;l>c-n;l--)t[t.length-1].unshift({prev:l});for(var o=1;o<=r[i-1];o++)o==s?t[t.length-1].push({now:o}):t[t.length-1].push({cur:o}),(o+n)%7==0&&t.push([]);if(t[t.length-1].length<7)for(var v=0;v<=7-t[t.length-1].length;v++)t[t.length-1].push({next:v+1});this.curDateArr=t}},mounted:function(){this.weatherCHart()}},b={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"calendar"},[e("h2",[t._v(t._s(t.yymm))]),t._v(" "),e("table",[t._m(0),t._v(" "),e("tbody",t._l(t.curDateArr,function(a){return e("tr",t._l(a,function(a){return e("td",t._l(a,function(a,s){return e("span",{class:{prev:"prev"==s||"next"==s,cur:"now"==s}},[t._v(t._s(a))])}),0)}),0)}),0)])])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("日")]),t._v(" "),e("th",[t._v("一")]),t._v(" "),e("th",[t._v("二")]),t._v(" "),e("th",[t._v("三")]),t._v(" "),e("th",[t._v("四")]),t._v(" "),e("th",[t._v("五")]),t._v(" "),e("th",[t._v("六")])])}]};var x=e("VU/8")(y,b,!1,function(t){e("6156")},"data-v-04cf7f8b",null).exports,S={name:"Store",components:{Header:s.a,Weather:C,Calendar:x},data:function(){return{cityName:"3"}},methods:{},mounted:function(){}},j={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("Header"),t._v(" "),e("section",{staticClass:"main"},[e("div",{staticClass:"aside"},[t._m(0),t._v(" "),e("p",{class:{cur:"0"==t.cityName}},[e("router-link",{attrs:{to:"/Store?city=beijing"}},[t._v("北京全部门店")])],1),t._v(" "),e("p",{class:{cur:"1"==t.cityName}},[t._v("销售数据")]),t._v(" "),e("p",{class:{cur:"2"==t.cityName}},[t._v("组织架构")]),t._v(" "),e("p",{class:{cur:"3"==t.cityName}},[t._v("店面图片")]),t._v(" "),e("div",{staticClass:"footer"},[t._v("sunny 版权所有")])]),t._v(" "),e("div",{staticClass:"cont"},[t._m(1),t._v(" "),e("div",{staticClass:"right"},[e("Weather"),t._v(" "),e("Calendar")],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("h2",[a("i",{staticClass:"fa fa-shopping-bag"}),this._v(" 北京市朝阳区门店")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"left"},[s("div",{staticClass:"picShow"},[s("div",{staticClass:"bigPic"},[s("img",{attrs:{src:e("xeKG"),alt:""}}),t._v(" "),s("div",{staticClass:"prev"},[s("i",{staticClass:"fa fa-chevron-left"})]),t._v(" "),s("div",{staticClass:"next"},[s("i",{staticClass:"fa fa-chevron-right"})])]),t._v(" "),s("div",{staticClass:"smallPic"},[s("ul",[s("li",[s("img",{attrs:{src:e("oHm1"),alt:""}})]),t._v(" "),s("li",{staticClass:"cur"},[s("img",{attrs:{src:e("xeKG"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("SdOn"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("Wgba"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("oHm1"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("ehim"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("SdOn"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("Wgba"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("SdOn"),alt:""}})]),t._v(" "),s("li",[s("img",{attrs:{src:e("Wgba"),alt:""}})])]),t._v(" "),s("div",{staticClass:"prev"},[s("i",{staticClass:"fa fa-angle-left"})]),t._v(" "),s("div",{staticClass:"next"},[s("i",{staticClass:"fa fa-angle-right"})])])])])}]},k=e("VU/8")(S,j,!1,null,null,null);a.default=k.exports},"2dow":function(t,a,e){t.exports=e.p+"static/img/icon_3.1bf4b72.png"},6156:function(t,a){},FeBl:function(t,a){var e=t.exports={version:"2.6.3"};"number"==typeof __e&&(__e=e)},SdOn:function(t,a,e){t.exports=e.p+"static/img/sunny.d63df9a.jpg"},WEuK:function(t,a,e){t.exports=e.p+"static/img/icon_1.162127e.png"},Wgba:function(t,a,e){t.exports=e.p+"static/img/snow.c1dfe07.gif"},ehim:function(t,a,e){t.exports=e.p+"static/img/cloudy.e004320.jpg"},ifDj:function(t,a,e){t.exports=e.p+"static/img/icon_2.ac577d3.png"},mvHQ:function(t,a,e){t.exports={default:e("qkKv"),__esModule:!0}},oHm1:function(t,a,e){t.exports=e.p+"static/img/overcast.6f7b4cc.jpg"},qkKv:function(t,a,e){var s=e("FeBl"),i=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},xeKG:function(t,a,e){t.exports=e.p+"static/img/store.6d5ab10.jpg"},yjbz:function(t,a){}});
//# sourceMappingURL=1.4c2a0281a8154713194f.js.map