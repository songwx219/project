const express=require('express');   //引入express框架
const bodyParser=require('body-parser')   //引入第三方中间件body-parser
const cookieParser = require('cookie-parser');  //引入cookie模块
const session=require('express-session');
const app=express();    //创建连接
app.listen(3000); //监听端口


app.use(express.static('./public'));    //托管静态文件
app.use(bodyParser.urlencoded({ extended:false}))   //调用第三方中间件body-parser
app.use(cookieParser());   //配置cookie-parser中间件，xxx表示加密的随机数(相当于密钥)
app.use(session({
    secret:'songwx',
    resave:false,
    saveUninitialized:true,
    cookie:{
      maxAge:1000*60*60
    },
    rolling:true
}));
 


// 解决跨域问题
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
   
    if (req.method == 'OPTIONS') {
      res.send(200); // 让options请求快速返回/
    }
    else {
      let sessionid=req.body.sessionid||req.query.sessionid;
      if(req.path=='/user/login'||req.path=='/user/infor/modify'){
        next()
      }else{
        if(req.session['id']==sessionid){
          next();
        }else{
          res.send({loginStatus:1})
        }
      }
    }
});

const userRouter=require('./router/user');  //引入user模块路由
const proRouter=require('./router/product');  //引入product模块路由
const orderRouter=require('./router/order');  //引入order模块路由


app.use('/user',userRouter);
app.use('/product',proRouter);
app.use('/order',orderRouter);
