webpackJsonp([9],{H5AH:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7t+N"),s=n.n(a),r={name:"Add",data:function(){return{}},methods:{downloadMB:function(){var t=document.createElement("a");t.download="example",t.href="/static/temp_test.xlsx",t.click(),s()(t).remove()}},computed:{currentMenu:function(){return this.$store.state.menu.currentMenu}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("h3",[t._v(t._s(t.currentMenu[1])+" "),n("small",[t._v(t._s(t.currentMenu[2]?t.currentMenu[2]:""))])]),t._v(" "),n("div",{staticClass:"msgbox"},[t._m(0),t._v(" "),t._m(1),t._v(" "),n("div",{staticClass:"tips"},[n("span",{staticClass:"btn btn-link",on:{click:t.downloadMB}},[t._v("模板下载")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("form",{attrs:{action:"/productmanage/productupload/uploadexcel",method:"post",enctype:"multipart/form-data"}},[e("p",[e("input",{staticClass:"file",attrs:{type:"file",name:"product"}})]),this._v(" "),e("p",[e("button",{staticClass:"btn btn-primary btn-lg mt-3"},[this._v("提交")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tips"},[n("h5",[t._v("上传文件规范：")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("1、第一行为表头。每一列数据都请使用“文本”格式保存，否则可能会出现错误数据")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("2、表格中，品牌、货号、包装规格、质量规格、单价_RMB为必填项，如果这些行没数据，此行内容将被忽略")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("3、预计交货期不能为空")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("4、英文品名和中文品名两者至少有一项不为空")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("5、如果您上传的数据中有未代理的品牌，此行将会自动忽略")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("6、如果您上传的数据中没有相关资质，此行将会自动忽略")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("7、促销_RMB、促销开始日期、促销结束日期必须同时存在，否则此行促销价将会无效。日期格式为2017-01-01")]),t._v(" "),n("p",[n("b",[t._v("*")]),t._v("8、如果您上传的数据中已经上传过，那么则会更新已有数据，否则为新增。")])])}]};var v=n("VU/8")(r,_,!1,function(t){n("OuEh")},"data-v-6d7e85a1",null);e.default=v.exports},OuEh:function(t,e){}});
//# sourceMappingURL=9.e54216d06ea5f369a2c6.js.map