webpackJsonp([15],{EAQr:function(t,e){},puND:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),r=s.n(a),i=s("zL8q");s("7+uW").default.use(i.Pagination);var n={name:"Message",data:function(){return{currPage:1,totleCount:1,pagesize:19,message:[{mid:19,title:"密码变更提示：请定期更换密码",creatTime:"2019-09-02T09:52:24.000Z",status:1},{mid:18,title:"您的商家信息变更已通过",creatTime:"2019-09-02T09:51:46.000Z",status:1},{mid:17,title:"有新订单，请尽快处理",creatTime:"2019-09-02T09:51:11.000Z",status:0},{mid:16,title:"警告！产品库存不足，请尽快补货！",creatTime:"2019-09-02T09:50:48.000Z",status:0},{mid:15,title:"测试测试测试测试订单快处理！",creatTime:"2019-09-02T09:50:16.000Z",status:0},{mid:14,title:"无色发达的有新订单待处理",creatTime:"2019-09-02T09:49:53.000Z",status:0},{mid:13,title:"有新订单待处理",creatTime:"2019-09-02T09:49:37.000Z",status:0},{mid:12,title:"产品库存警告，尽快补货吧！",creatTime:"2019-09-02T09:48:39.000Z",status:0},{mid:11,title:"的vv又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:47:29.000Z",status:0},{mid:10,title:"发的发的又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:47:12.000Z",status:0},{mid:9,title:"大部分又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:46:49.000Z",status:0},{mid:8,title:"撒打发又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:46:38.000Z",status:0},{mid:7,title:"而又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:46:22.000Z",status:0},{mid:6,title:"安庆又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:46:02.000Z",status:0},{mid:5,title:"是又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:45:24.000Z",status:0},{mid:4,title:"又有新订单啦，赶快来处理吧！",creatTime:"2019-09-02T09:44:31.000Z",status:1}],content:{},error:0,errormsg:""}},computed:{currentMenu:function(){return this.$store.state.menu.currentMenu}},methods:{getmessage:function(t,e){for(var s="",a=0;a<8;a++)s+=this.message[t].title;this.message[t].status=1,this.content=r()({content:s},this.message[t])}},filters:{getDate:function(t){var e=new Date(t),s=e.getMonth()+1,a=e.getDate();return(s=s<10?"0"+s:s)+"-"+(a=a<10?"0"+a:a)},getTime:function(t){var e=new Date(t),s=e.getFullYear(),a=e.getMonth()+1,r=e.getDate(),i=e.getHours(),n=e.getMinutes(),c=e.getSeconds();return s+"-"+(a=a<10?"0"+a:a)+"-"+(r=r<10?"0"+r:r)+" "+(i=i<10?"0"+i:i)+":"+(n=n<10?"0"+n:n)+":"+(c=c<10?"0"+c:c)}},watch:{currPage:"getMessageData"}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main message"},[s("h3",[t._v(t._s(t.currentMenu[1])+" "),s("small",[t._v(t._s(t.currentMenu[2]?t.currentMenu[2]:""))])]),t._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"float-left msgbox msglist"},[t.error?t._e():s("div",{staticClass:"list"},[t._l(t.message,function(e,a){return s("p",{key:a,class:{read:e.status},on:{click:function(s){return t.getmessage(a,e.mid)}}},[e.status?t._e():s("i",{staticClass:"read bg-danger"}),t._v(" "),s("strong",{staticClass:"text-primary"},[t._v(t._s(e.title))]),t._v(" "),s("span",{staticClass:"float-right"},[t._v("["+t._s(t._f("getDate")(e.creatTime))+"]")])])}),t._v(" "),s("el-pagination",{staticClass:"mt-3 text-center",attrs:{"page-size":t.pagesize,"current-page":t.currPage,layout:"prev, pager, next",total:t.totleCount},on:{"update:currentPage":function(e){t.currPage=e},"update:current-page":function(e){t.currPage=e}}})],2),t._v(" "),t.error?s("div",{staticClass:"error text-danger text-center"},[s("p",[t._v(t._s(t.errormsg))]),t._v(" "),2==t.error?s("button",{staticClass:"btn btn-primary btn-lg"},[t._v("重新获取")]):t._e()]):t._e()]),t._v(" "),s("div",{staticClass:"float-right msgbox msginfo"},[t.content.mid?s("div",{staticClass:"content"},[s("h4",[t._v("消息详情")]),t._v(" "),s("div",{staticClass:"title"},[s("h5",[t._v(t._s(t.content.title))]),t._v(" "),s("p",[t._v(t._s(t._f("getTime")(t.content.creatTime)))])]),t._v(" "),t.content.content?s("div",{staticClass:"detail"},[t._v(t._s(t.content.content))]):t._e(),t._v(" "),t.content.error?s("div",{staticClass:"error"},[s("p",[t._v(t._s(t.content.errormsg))])]):t._e()]):t._e()])])])},staticRenderFns:[]};var u=s("VU/8")(n,c,!1,function(t){s("EAQr")},"data-v-4979df32",null);e.default=u.exports}});
//# sourceMappingURL=15.805614503e7d13f3725a.js.map