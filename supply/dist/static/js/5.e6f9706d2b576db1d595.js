webpackJsonp([5],{SHMq:function(t,a){},y9kW:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Dd8w"),r=e.n(n),s=e("7+uW"),i=e("zL8q");s.default.use(i.Slider),s.default.use(i.DatePicker);var d={name:"UserBrand",data:function(){return{brandData:[{bid:1,sid:1,bname:"喜福德",leval:"一级代理",zone:"北京",endTime:"2022-01-18T16:00:00.000Z",discount:.88,status:"1"},{bid:2,sid:1,bname:"惠兴隆",leval:"一级代理",zone:"北京",endTime:"2022-06-29T16:00:00.000Z",discount:.85,status:"1"},{bid:5,sid:1,bname:"亦福堂",leval:"一级代理",zone:"北京",endTime:"2024-02-06T16:00:00.000Z",discount:.8,status:"1"},{bid:7,sid:1,bname:"乐开怀",leval:"二级代理",zone:"北京",endTime:"2023-05-09T16:00:00.000Z",discount:.9,status:"1"}],currPage:1,totleCount:1,pagesize:4,error:0,errormsg:"",addBrandDialog:!1,dialogStatus:0,newBrandData:{}}},computed:{currentMenu:function(){return this.$store.state.menu.currentMenu}},methods:{addBrand:function(){this.newBrandData={bname:"",leval:"",zone:"",endTime:"",discount:0},this.addBrandDialog=!0,this.dialogStatus="add"},addBrandSub:function(){var t=this,a=!0;for(var e in this.newBrandData)""==this.newBrandData[e]&&(a=!1);if(a){var n=!1;this.brandData.forEach(function(a){a.bname==t.newBrandData.bname&&(n=!0)}),n?this.$message({type:"warning",message:"改品牌名已存在!"}):(this.brandData.push(this.newBrandData),this.addBrandDialog=!1,this.$message({type:"success",message:"添加成功!"}))}else this.$message({type:"danger",message:"有信息尚未填写，请确保所有选项填写完整！"})},editBrand:function(t){this.newBrandData=r()({},this.brandData[t]),this.newBrandData.discount*=100,this.addBrandDialog=!0,this.dialogStatus=t},editBrandSub:function(){var t=this,a=!0;for(var e in this.newBrandData)""==this.newBrandData[e]&&(a=!1);if(a){var n=!1;this.brandData.forEach(function(a){a.bname==t.newBrandData.bname&&(n=!0)}),n?this.$message({type:"warning",message:"改品牌名已存在!"}):(this.brandData[this.dialogStatus]=r()({},this.newBrandData),this.addBrandDialog=!1,this.$message({type:"success",message:"修改成功!"}))}else this.$message({type:"danger",message:"有信息尚未填写，请确保所有选项填写完整！"})},delBrand:function(t){var a=this;this.$confirm("此操作将永久删除该品牌信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.brandData.splice(t,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},formatTooltip:function(t){return t/100}},filters:{getDate:function(t){var a=new Date(t),e=a.getFullYear(),n=a.getMonth()+1,r=a.getDate();return e+"-"+(n=n<10?"0"+n:n)+"-"+(r=r<10?"0"+r:r)}},watch:{currPage:"getBrandData"}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main message"},[e("h3",[t._v(t._s(t.currentMenu[1])+" "),e("small",[t._v(t._s(t.currentMenu[2]?t.currentMenu[2]:""))])]),t._v(" "),e("div",{staticClass:"msgbox clearfix"},[e("div",{staticClass:"search clearfix"},[e("div",{staticClass:"float-left form"},[t.error?t._e():e("div",{staticClass:" form-row align-items-center"},[e("input",{staticClass:"col-sm-4 form-control",attrs:{type:"text",name:"",id:"",placeholder:"请输入搜索内容"}}),t._v(" "),e("router-link",{staticClass:"col-sm-1 btn btn-info",attrs:{to:"/"}},[t._v("搜索")])],1)]),t._v(" "),e("div",{staticClass:"float-right"},[e("button",{staticClass:"btn btn-primary",on:{click:t.addBrand}},[t._v("增加新品牌")])])]),t._v(" "),t.error?t._e():e("div",{staticClass:"list"},[e("table",{staticClass:"table"},[t._m(0),t._v(" "),e("tbody",t._l(t.brandData,function(a,n){return e("tr",{key:n},[e("td",[t._v(t._s(a.bname))]),t._v(" "),e("td",[t._v(t._s(a.leval))]),t._v(" "),e("td",[t._v(t._s(a.zone))]),t._v(" "),e("td",[t._v(t._s(t._f("getDate")(a.endTime)))]),t._v(" "),e("td",[t._v(t._s(a.discount))]),t._v(" "),e("td",[t._v(t._s(1==a.status?"正常":"已到期"))]),t._v(" "),e("td",[e("div",{staticClass:"btn-group"},[e("div",{staticClass:"btn btn-info",on:{click:function(a){return t.editBrand(n)}}},[t._v("编辑")]),t._v(" "),e("div",{staticClass:"btn btn-danger",on:{click:function(a){return t.delBrand(n)}}},[t._v("删除")])])])])}),0)]),t._v(" "),e("el-pagination",{staticClass:"text-center",attrs:{layout:"prev, pager, next","page-size":t.pagesize,"current-page":t.currPage,total:t.totleCount},on:{"update:currentPage":function(a){t.currPage=a},"update:current-page":function(a){t.currPage=a}}})],1),t._v(" "),t.error?e("div",{staticClass:"error text-danger text-center"},[e("p",[t._v(t._s(t.errormsg))]),t._v(" "),2==t.error?e("button",{staticClass:"btn btn-primary btn-lg"},[t._v("重新获取")]):t._e()]):t._e()]),t._v(" "),e("el-dialog",{attrs:{title:"add"==t.dialogStatus?"新增品牌":"品牌编辑",visible:t.addBrandDialog},on:{"update:visible":function(a){t.addBrandDialog=a}}},[e("table",[e("tbody",[e("tr",[e("th",{attrs:{width:"120px"}},[t._v("品牌名称：")]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newBrandData.bname,expression:"newBrandData.bname",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newBrandData.bname},on:{input:function(a){a.target.composing||t.$set(t.newBrandData,"bname",a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})])]),t._v(" "),e("tr",[e("th",[t._v("代理级别：")]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newBrandData.leval,expression:"newBrandData.leval",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newBrandData.leval},on:{input:function(a){a.target.composing||t.$set(t.newBrandData,"leval",a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})])]),t._v(" "),e("tr",[e("th",[t._v("代理区域：")]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newBrandData.zone,expression:"newBrandData.zone",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newBrandData.zone},on:{input:function(a){a.target.composing||t.$set(t.newBrandData,"zone",a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})])]),t._v(" "),e("tr",[e("th",[t._v("授权截止时间：")]),t._v(" "),e("td",[e("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.newBrandData.endTime,callback:function(a){t.$set(t.newBrandData,"endTime",a)},expression:"newBrandData.endTime"}})],1)]),t._v(" "),e("tr",[e("th",[t._v("品牌折扣：")]),e("td",[e("el-slider",{attrs:{"format-tooltip":t.formatTooltip},model:{value:t.newBrandData.discount,callback:function(a){t.$set(t.newBrandData,"discount",a)},expression:"newBrandData.discount"}})],1)])])]),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("button",{staticClass:"btn btn-dark",on:{click:function(a){t.addBrandDialog=!1}}},[t._v("取 消")]),t._v(" "),"add"==t.dialogStatus?e("button",{staticClass:"btn btn-primary",on:{click:t.addBrandSub}},[t._v("立即添加")]):t._e(),t._v(" "),"add"!=t.dialogStatus?e("button",{staticClass:"btn btn-primary",on:{click:t.editBrandSub}},[t._v("提交")]):t._e()])])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("品牌名称")]),t._v(" "),e("th",[t._v("代理级别")]),t._v(" "),e("th",[t._v("代理区域")]),t._v(" "),e("th",[t._v("授权截止时间")]),t._v(" "),e("th",[t._v("品牌折扣")]),t._v(" "),e("th",[t._v("状态")]),t._v(" "),e("th",[t._v("操作")])])}]};var l=e("VU/8")(d,o,!1,function(t){e("SHMq")},"data-v-df9b7c9a",null);a.default=l.exports}});
//# sourceMappingURL=5.e6f9706d2b576db1d595.js.map