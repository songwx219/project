webpackJsonp([17],{"8eiz":function(e,n){},"991W":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),r=t("Dd8w"),a=t.n(r),u=t("NYxO"),s={name:"App",data:function(){return{}},methods:a()({},Object(u.b)(["setUserData"])),mounted:function(){var e=localStorage.getItem("user"),n=localStorage.getItem("menu");e&&this.setUserData(JSON.parse(e)),n&&this.$store.commit("setMenu",JSON.parse(n).menu)}},i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var c=t("VU/8")(s,i,!1,function(e){t("W48y")},null,null).exports,l=t("zL8q"),m=(t("tvR6"),t("991W"),t("mvHQ")),p=t.n(m),d={state:{menustate:!1,currentMenu:[]},mutations:{changemenu:function(e){e.menustate=!e.menustate},setMenu:function(e,n){e.currentMenu=n,localStorage.setItem("menu",p()({menu:n}))}},actions:{changemenu:function(e){store.commit("changemenu",data)},setMenu:function(e,n){store.commit("setMenu",n)}}},f=t("8eiz"),h=t.n(f),g=t("yEsQ"),b=t.n(g);o.default.use(u.a);var D=new u.a.Store({modules:{user:{state:{userData:{sid:"",uname:""}},getters:{userData:function(e){return e.userData}},mutations:{setUserData:function(e,n){n.sid&&(e.userData.sid=n.sid),n.uname&&(e.userData.uname=n.uname),n.sessionid&&(e.userData.sessionid=n.sessionid)}},actions:{setUserData:function(e,n){e.commit("setUserData",n)}}},menu:d,product:h.a,order:b.a}}),v=t("/ocq");o.default.use(v.a);var y=new v.a({base:Object({NODE_ENV:"production"}).BASE_URL,routes:[{path:"/404",component:function(){return t.e(2).then(t.bind(null,"mbSh"))}},{path:"*",redirect:"/404"},{path:"/",name:"Home",component:function(){return t.e(1).then(t.bind(null,"sRz/"))},children:[{path:"/",component:function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,"JXTs"))}},{path:"/product",name:"Product",component:function(){return t.e(13).then(t.bind(null,"SKi1"))},children:[{path:"/product/add",name:"ProAdd",component:function(){return t.e(7).then(t.bind(null,"0mNU"))}},{path:"/product/batch",name:"ProBatch",component:function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,"H5AH"))}},{path:"/product/list/:protype/:page",name:"ProList",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"RADo"))},props:!0}]},{path:"/order",name:"Order",component:function(){return Promise.all([t.e(0),t.e(12)]).then(t.bind(null,"e+iX"))},children:[{path:"/order/list/:orderType",name:"OrderAll",component:function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,"xhr5"))},props:!0}]},{path:"/user",name:"User",component:function(){return t.e(6).then(t.bind(null,"md3T"))},children:[{path:"/user/message",name:"Message",component:function(){return t.e(15).then(t.bind(null,"puND"))}},{path:"/user/detail",name:"UserDetail",component:function(){return Promise.all([t.e(0),t.e(14)]).then(t.bind(null,"yDqR"))}},{path:"/user/resetpwd",name:"UserResetpwd",component:function(){return t.e(10).then(t.bind(null,"1I0g"))}},{path:"/user/brand",name:"UserBrand",component:function(){return t.e(5).then(t.bind(null,"y9kW"))}}]}]},{path:"/login",name:"Login",component:function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,"Quw4"))}}]});y.beforeEach(function(e,n,t){var r=localStorage.getItem("user");if(r){(new Date).getTime()-JSON.parse(r).timer>144e5&&(localStorage.removeItem("user"),r=localStorage.getItem("user"))}if(!r&&"Login"!==e.name)return o.default.prototype.$message({message:"您需要先登录哦！",type:"warning"}),void t({path:"/login"});t()});var P=y;o.default.use(l.Pagination),o.default.use(l.Dialog),o.default.component(l.CollapseTransition.name,l.CollapseTransition),o.default.prototype.$message=l.Message,o.default.prototype.$msgbox=l.MessageBox,o.default.prototype.$confirm=l.MessageBox.confirm,o.default.config.productionTip=!1,new o.default({el:"#app",router:P,store:D,components:{App:c},template:"<App/>"})},W48y:function(e,n){},tvR6:function(e,n){},yEsQ:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.f81a2e06d4ab36e788d9.js.map