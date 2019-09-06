const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能


/**   ==================== 产品列表 ==================== */
router.get('/list',(req,res)=>{
    const sid=req.session['sid'];
    const pagesize=5;
    const page=req.query.page;
    let whereStr=''
    switch(req.query.type){
        case 'all':whereStr='sid=?';break;
        case 'unpay':whereStr='sid=? AND status=1';break;
        case 'todo':whereStr='sid=? AND status=2';break;
        case 'unreceived':whereStr='sid=? AND status=3';break;
        case 'completed':whereStr='sid=? AND status=4';break;
        case 'cancelled':whereStr='sid=? AND status=5';break;
    }
    pool.query('select COUNT(id) as count from supply_order where '+whereStr,[sid],(err,result)=>{
        if(err) throw err;
        if(result[0].count>0){
            const sql= `select *,(
                select uname from shop_user_reg where uid=userid
            ) as username from supply_order where ${whereStr} limit ${(page-1)*pagesize},${pagesize}`; 
            pool.query(sql,[sid],(err,result1)=>{
                if(err) throw err;
                if(result1.length>0){
                    res.send({status:1,count:result[0].count,data:result1})
                }else{
                    res.send({status:0})
                }
            });
        }else{
            res.send({status:0});
        }
    }); 
})

/**   ==================== 我的购物车 ==================== */
router.get('/cart',(req,res)=>{
    const uid=req.session["uid"]; 
    let pageMsg={path:"order/cart",title:'我的购物车'};
    const sql=`select cid,count,pId,pname,pedition,pcolor,salePrice,unitPrice,(
        select typeName from pro_type where id=typeId
    ) as tName,(
        select brandName from pro_brand where id=brandId
    ) as bName from cart LEFT OUTER JOIN pro_infor ON id=pId where uId=?`;
    let pro={};
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pro={status:1,msg:result}
        }else{pro={status:0}}
        res.render('./components/main',{page:pageMsg,login:req.query.login,pro:pro})
        
    }); 
});

/**   ==================== 添加购物车 ==================== */
router.post('/addcart',(req,res)=>{
    const uid=req.session["uid"]; 
    let pid=req.body.pid;
    let count=Number(req.body.count);
    
    pool.query('select * from cart where uId=? and pId=?',[uid,pid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            count+=Number(result[0].count);
            pool.query('UPDATE cart SET count=? WHERE uId=? and pId=?',[count,uid,pid],(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    res.send({status:1});
                }else{res.send({status:0})}
            })
        }else{
            pool.query('INSERT INTO cart(uId,pId,count) VALUES(?,?,?)',[uid,pid,count],(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    pool.query('select cid from cart where uId=?',[uid,pid],(err,result)=>{
                        if(err) throw err;
                        res.send({status:1,count:result.length});
                    })
                }else{res.send({status:0})}
            });
        }
        
    }); 
});


/**   ====================AJAX API 购物车数量修改/删除 ==================== */
router.post('/cart/:method',(req,res)=>{
    const uid=req.session["uid"];
    const method=req.params.method;
    if(method=='del'){
        const cid=[].concat(req.body['cid[]']).map(e=>Number(e));
        let cidArr=[];
        cid.forEach(function(){cidArr.push('cid=?') });
        const sql=`DELETE FROM cart WHERE ${cidArr.join(' or ')}  `;
        pool.query(sql,cid,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                pool.query('select cid from cart where uId=?',[uid],(err,result)=>{
                    if(err) throw err;
                    res.send({status:200,delCid:cid,count:result.length});
                })
            }else res.send({status:400})
        })
    }else{
        let count=0;
        const cid=req.body.cid;
        pool.query(`select count from cart where cid=?`,[cid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                count=result[0].count-0;
                if(method=='plus'){
                    count++;
                }else if(method=='minus'){
                    if(count>1) count--;
                }
                pool.query(`update cart set count=? where cid=?`,[count,cid],(err,result1)=>{
                    if(err) throw err;
                    if(result1.affectedRows>0) res.send({status:200});
                    else res.send({status:400});
                })
            }else res.send({status:400});
        });
    }
});
/**   ==================== 购物车结算 ==================== */
router.get('/settle',(req,res)=>{
    let pageMsg={path:"order/settle",title:'订单结算'};
    const uid=req.session["uid"]; 
    const cid=([].concat(req.query.cid)).map(a=>Number(a));

    let cidArr=[];
    cid.forEach(function(){cidArr.push('cid=?') });

    const sql=`select cid,count,pId,pname,pedition,pcolor,salePrice,unitPrice,(
        select typeName from pro_type where id=pId
    ) as tName,(
        select brandName from pro_brand where id=pId
    ) as bName from cart LEFT OUTER JOIN pro_infor ON id=pId where ${cidArr.join(' or ')}  `;
    let pro={};
    pool.query(sql,cid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pro={status:1,msg:result}
        }else{pro={status:0}}
        res.render('./components/main',{page:pageMsg,login:req.query.login,pro:pro})
        
    }); 
});
module.exports=router;