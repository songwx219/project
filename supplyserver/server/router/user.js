const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能

const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

/**   ==================== 用户登录 ==================== */
router.post('/login',(req,res)=>{
    const name=req.body.uname;
    const pwd=req.body.upwd;
    pool.query('select * from supply_user_reg where uname=?',[name],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pool.query('select * from supply_user_reg where uname=? and upwd=?',[name,pwd],(err,result1)=>{
                if(err) throw err;
                if(result1.length>0){
                    req.session['sid']=result1[0].sid;  //signed 表示对cookie加密
                    req.session['sname']=result1[0].uname;
                    res.send({status:2,sid:result1[0].sid,msg:'登录成功',sessionid:req.session['id']});
                }else{
                    res.send({status:1,msg:'密码不正确'});
                };
            });
        }else{
            res.send({status:0,msg:'用户名不存在'});
        };
    }); 
});


/**   ==================== 用户注册 ==================== */
router.post('/register',(req,res)=>{
    let data=req.body;
    const codeStatu=req.signedCookies.code;
    if(codeStatu=='succ'){
        pool.query('select * from supply_user_reg where uname=?',[data.uname],(err,result)=>{
            if(err) throw err;
            if(result.length==0){
                pool.query('INSERT INTO supply_user_reg(uname,upwd) VALUES(?,?)',[data.uname,data.upwd],(err,result1)=>{
                    if(err) throw err;
                    if(result1.affectedRows>0){
                        pool.query('INSERT INTO supply_user_infor(uid,uname) VALUES(?,?)',[result1.insertId,data.uname],(err,result2)=>{
                            if(result2.affectedRows>0){
                                res.cookie('code','',{maxAge:0,signed:true});
                                req.session['uid']=result1.insertId;  //signed 表示对cookie加密
                                res.redirect('/');
                            }
                        });  
                    }
                });
            }else{
                res.send(`当前用户已存在，请重新注册！`);
            };
        }); 
    }else{
        res.send(`验证码无效，请完成验证码验证！`);
    }
    
});
// ajax接口===判断用户名是否存在
router.get('/isRegUserExist',(req,res)=>{
    let uname=req.query.uname;
    pool.query('select * from supply_user_reg where uname=?',[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({status:1});
        }else{
            res.send({status:0});
        };
    }); 
});
//  ajax接口===获取验证码
router.get('/code',(req,res)=>{
    const codeStatu=req.signedCookies.code;
    if(codeStatu=='succ'){
        res.send({status:202})
    }else{
        pool.query('select COUNT(id) from code',(err,result)=>{
            if(err) throw err;
            const count=result[0]['COUNT(id)'];
            if(count>0){
                const idCode=Math.ceil(Math.random()*count);
                
                pool.query('select * from code where id=?',[idCode],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        res.send({status:200,info:{id:idCode,url:result[0].url} });
                    }else{
                        res.send({status:400});
                    } 
                }); 
            }else{
                res.send({status:400});
            }
        }); 
    }  
});
//  ajax接口===验证码提交验证
router.get('/codeSub',(req,res)=>{
    const idCode=Number(req.query.id);
    const value=Number(req.query.value);
    if(idCode&&value){
        pool.query('select (value) from code where id=?',[idCode],(err,result)=>{
            if(err) throw err;
            if(value>=result[0].value-10&&value<=result[0].value+10){
                res.cookie('code','succ',{maxAge:300*1000,signed:true});
                res.send({status:200 });
            }else{ res.send({status:400}); }
        });
    }else{ res.send({status:400}); }     
});

/**   ==================== 用户退出 ==================== */
router.get('/exit',(req,res)=>{
    req.session['uid']=undefined;
    res.redirect('/');
});



/**   ====================================================
 *                     商户信息接口 
 * ==================================================== */

//  获取 商户信息接口
router.get('/infor',(req,res)=>{
    let sid=req.session['sid'];
    pool.query('select * from supply_user_infor where sid=?',[sid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result[0]);
        }else{
            res.send(`当前无数据！`);
        };
    }); 
});
//  修改 商户信息接口 
router.post('/infor/modify',multipartMiddleware,(req,res)=>{
    if(req.body.sessionid==req.session['id']){
        new Promise(function(resolve,reject){
            let logoFile=req.files.logo;
            if(logoFile.name){
                var tmp_path = logoFile.path;//获取临时路径
                var target_path = './public/upload/'+ (new Date().getTime())+logoFile.name;//指定文件上传之后的存储目录
                fs.rename(tmp_path,target_path,function(err){//移动文件到你想上传的目录
                    if(err) console.log(err);
                    else req.body.logo=target_path.replace(/^(.\/public)/,'');
                    resolve();
                })
            }else{
                resolve();
            }
        }).then(function(val){
            let sql='',arr=[];
            for(let item in req.body){
                if(item!='sid'&&item!='sessionid'){
                    sql+=item+'=?,';
                    arr.push(req.body[item])
                }
            }
            sql=sql.replace(/,$/g,'');
            arr.push(Number(req.session['sid']))
            
            pool.query('UPDATE supply_user_infor SET '+sql+' WHERE sid=?',arr,(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    res.send({status:1});
                }else{res.send({status:0})}
            })
        })
    }else{
        res.send({loginStatus:1})
    }
});

//  重置 登录密码接口
router.post('/resetPwd',(req,res)=>{
    pool.query('UPDATE supply_user_reg SET upwd=? WHERE sid=?',[req.body.upwd,req.session['sid']],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:1});
        }else{res.send({status:0})}
    })
});


/**   ====================================================
 *                 商户品牌列表信息接口
 * ==================================================== */

//  获取 商户品牌列表信息接口
router.get('/brandlist',(req,res)=>{
    const sid=req.session['sid'];
    const perCount=4;
    const page=req.query.page;
    pool.query('select COUNT(bid) as count from supply_user_brand where sid=?',[sid],(err,result)=>{
        if(err) throw err;
        if(result[0].count>0){
            pool.query('select * from supply_user_brand where sid=? limit '+(page-1)*perCount+','+perCount,[sid],(err,result1)=>{
                if(err) throw err;
                if(result1.length>0){
                    res.send({status:2,sum:result[0].count,data:result1});
                }else{
                    res.send({status:0});
                };
            }); 
        }else{
            res.send({status:1});
        }
    }); 
});
//  添加 商户品牌列表信息接口
router.post('/addbrand',(req,res)=>{
    const sid=req.session['sid'];
    const discount=req.body.discount/100
    pool.query('select sid from supply_user_brand where bname=?',[req.body.bname],(err,result1)=>{
        if(err) throw err;
        if(result1.length>0){
            res.send({status:1});
        }else{
            pool.query(
                'INSERT INTO supply_user_brand (sid,bname,discount,endTime,leval,zone) VALUES (?,?,?,?,?,?)',
                [sid,req.body.bname,discount,req.body.endTime,req.body.leval,req.body.zone],
                (err,result)=>{
                    if(err) throw err;
                    if(result.affectedRows>0){
                        res.send({status:2});
                    }else{
                        res.send({status:0});
                    }
            }); 
        };
    });
});
//  编辑 商户品牌列表信息接口
router.post('/editbrand',(req,res)=>{
    const discount=req.body.discount/100
    pool.query(
        'UPDATE supply_user_brand SET bname=?,discount=?,endTime=?,leval=?,zone=? WHERE bid=?',
        [req.body.bname,discount,req.body.endTime,req.body.leval,req.body.zone,req.body.bid],
        (err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({status:1});
            }else{
                res.send({status:0});
            }
    }); 
});
//  删除 商户品牌列表信息接口
router.get('/delbrand',(req,res)=>{
    const bid=Number(req.query.bid)
    pool.query(`DELETE FROM supply_user_brand WHERE bid=?`,[bid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    }); 
});

/**   ====================================================
 *                 消息message接口
 * ==================================================== */
//  获取 消息列表信息接口
router.get('/messagelist',(req,res)=>{
    const sid = req.session['sid'];
    const perCount=16;
    const page=req.query.page;
    pool.query('select COUNT(mid) as count from supply_user_message where sid=?',[sid],(err,result)=>{
        if(err) throw err;
        if(result[0].count>0){
            pool.query('select mid,title,creatTime,status from supply_user_message where sid=? ORDER BY mid DESC limit '+(page-1)*perCount+','+perCount,[sid],(err,result1)=>{
                if(err) throw err;
                if(result1.length>0){
                    res.send({status:2,sum:result[0].count,data:result1});
                }else{
                    res.send({status:0});
                };
            }); 
        }else{
            res.send({status:1});
        }
    }); 
});
//  获取 消息详情接口
router.get('/getmessage',(req,res)=>{
    const mid = req.query.mid;
    pool.query('select content,status from supply_user_message where mid=?',[mid],(err,result1)=>{
        if(err) throw err;
        if(result1.length>0){
            if(!result1[0].status){
                pool.query('UPDATE supply_user_message SET status=? where mid=?',[1,mid],(err,result)=>{
                    if(err) throw err;
                    if(result.affectedRows>0){
                        res.send({status:1,message:result1[0].content});
                    }else{
                        res.send({status:0});
                    };
                });
            }else{
                res.send({status:1,message:result1[0].content});
            }
        }else{
            res.send({status:0});
        };
    });
});
module.exports=router;