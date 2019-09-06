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
        case 'all':whereStr='supplyid=?';break;
        case 'offShelf':whereStr='supplyid=? AND status=0';break;
        case 'stock':whereStr='supplyid=? AND stock<50';break;
    }
    pool.query('select COUNT(pid) as count from supply_pro_info where '+whereStr,[sid],(err,result)=>{
        if(err) throw err;
        if(result[0].count>0){
            const sql= `select *,(
                select bname from supply_user_brand where bid=brandid
            ) as brandname from supply_pro_info where ${whereStr} limit ${(page-1)*pagesize},${pagesize}`; 
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


/**   ==================== 产品详情 ==================== */
router.get('/detail',(req,res)=>{
    let pid=req.query.pid;
    let pro={}
    let pageMsg={path:"product/detail",title:'detail'};
    pool.query('select * from pro_infor where id=?',[pid],(err,result)=>{
        if(err) throw err;
        pro=result.length>0?{status:1,msg:result[0]}:{status:0};
        res.render('./components/main',{page:pageMsg,login:req.query.login,product:pro})
    }); 
})
/**   ==================== 产品品牌 ==================== */
router.get('/getbrand',(req,res)=>{
    let sid=req.session['sid'];
    pool.query('select bid,bname from supply_user_brand where sid=?',[sid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({status:1,list:result});
        }else{
            res.send({status:0});
        }
    }); 
})
/**   ==================== 产品编辑 ==================== */
router.post('/editProduct',(req,res)=>{
    let pid=req.body.pid;
    pool.query(
        `UPDATE supply_pro_info SET pname=?,brandid=?,artNo=?,specs=?,package=?,unitPrice=?,salePrice=?,stock=? where pid=?`,
        [req.body.pname,req.body.brandid,req.body.artNo,req.body.specs,req.body.package,req.body.unitPrice,req.body.salePrice,req.body.stock,pid],
        (err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:1,list:result});
        }else{
            res.send({status:0});
        }
    }); 
})
/**   ==================== 上架商品 ==================== */
router.get('/goOnSale',(req,res)=>{
    let pid=req.query.pid;
    pool.query('UPDATE supply_pro_info SET status=? where pid=?',[1,pid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    }); 
})
/**   ==================== 下架商品 ==================== */
router.get('/endOfSale',(req,res)=>{
    let pid=req.query.pid;
    pool.query('UPDATE supply_pro_info SET status=? where pid=?',[0,pid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    }); 
})
/**   ==================== 删除商品 ==================== */
router.get('/delProduct',(req,res)=>{
    let pid=req.query.pid;
    pool.query('DELETE FROM supply_pro_info where pid=?',[pid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            pool.query('DELETE FROM supply_pro_detail where pid=?',[pid],(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    res.send({status:1});
                }else{
                    res.send({status:0});
                }
            });
        }else{
            res.send({status:0});
        }
    }); 
})
/**   ==================== 添加产品 ==================== */
router.post('/addPro',(req,res)=>{
    const value=[
        Number(req.body.typeId),
        Number(req.body.brandId),
        req.body.pname,
        req.body.pedition,
        req.body.pcolor,
        req.body.pslogan,
        Number(req.body.isHot)];
    console.log(value)
    pool.query(
        'INSERT INTO pro_infor(typeId,brandId,pname,pedition,pcolor,pslogan,isHot) VALUES(?,?,?,?,?,?,?)',value,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:200});
        }else{
            res.send({status:400});
        };
    }); 
});

module.exports=router;
