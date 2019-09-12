$(function(){

  /* ==================扭蛋机游戏点击“扭”开始游戏 begin================== */
  $('.eggBtn').on('click','.btn.begin',function(){
    var button=$(this);
    var availableNum=$('.availableNum strong').html()-0; //此处为演示样本，真实需后台获取扭蛋可用次数
    var prizeInfo={name:'DQ代金券100元',id:'5'};//此处为演示样本，真实需后台获取扭蛋获得奖品的信息

    //若扭蛋可用次数大于0
    if(availableNum>0){

      $('.availableNum strong').html(availableNum-1);//更改前端显示可用次数
      button.removeClass('begin').addClass('disable');//按钮暂时改为禁用状态
      $('.eggBox').addClass('on');//开启扭蛋轻微动画
      setTimeout(function(){$('.eggBox').addClass('last')},3000);//3s之后强烈跳动一次
      setTimeout(function(){
        $('.eggBox').removeClass('last').removeClass('on');//强烈跳动0.9s结束则去除动画class
        var randomClr='('+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
        $('.eggPrize').css({'background':'rgb'+randomClr})
        $('.eggPrize').addClass('show');//奖品蛋开启滚出动画
      },3900);

      //等到所用动画执行完毕，开启弹窗
      setTimeout(function(){
        button.addClass('begin');
        if(availableNum-1>0){button.removeClass('disable');}//若此次扭蛋之后次数大于0，为按钮开启可点击事件
        $('.eggPrize').removeClass('show');//去除奖品蛋滚出动画的类

        $('.prizeDia').removeClass('hide').addClass('show');//开启弹窗
        $('.prizeDia .prizeName').html(prizeInfo.name);//填充获奖名称
        $('.prizeDia .prizeImg').attr('src','images/p'+prizeInfo.id+'.png');//填充获奖图片
      },4900);

    //若无可用次数，弹出提示
    }else{
      $('.getMoreNumDia').show();
    }
  });
  /* ==================扭蛋机游戏点击“扭”开始游戏 end================== */




  /* ==================弹窗相关按钮点击事件 begin================== */

  //奖品弹窗“关闭”、“我知道了”、“取消”按钮点击事件
  $('.prizeDia .close').on('click',function(){
    $('.prizeDia').removeClass('show').addClass('hide');
    $('.prizeDia .pic').show();
    $('.prizeDia .frist').show();
    $('.prizeDia .awardInfor').hide();
  });
  //奖品弹窗“立即兑换”按钮点击事件：隐藏图片，显示收获信息输入框
  $('.prizeDia .frist .succ').on('click',function(){
    $('.prizeDia .pic').hide();
    $('.prizeDia .frist').hide();
    $('.prizeDia .awardInfor').show();
  });
  //奖品弹窗收获信息处“提交”按钮点击事件
  $('.prizeDia .second .succ').on('click',function(){

    var userName=$.trim($('.prizeDia .awardInfor input.userName').val());
    var userTel=$.trim($('.prizeDia .awardInfor input.userTel').val());
    var userAdd=$.trim($('.prizeDia .awardInfor input.userAdd').val());

    if(userName&&userTel&&userAdd){
      $('.prizeDia').removeClass('show').addClass('hide');
      $('.prizeDia .pic').show();
      $('.prizeDia .frist').show();
      $('.prizeDia .awardInfor').hide();

      console.log(userName,userTel,userAdd);
    }else{
      alert('您所填信息不完整，请补充后再次提交！')
    }
  });

  
  //获取更多扭蛋次数弹窗“关闭”按钮点击事件
  $('.getMoreNumDia .close').on('click',function(){
    $('.getMoreNumDia').hide();
  });
  //获取更多扭蛋次数“加号”按钮点击事件
  $('.availableNum .getNum').on('click',function(){
    $('.getMoreNumDia').show();
    $('.getMoreNumDia .totleScore').html(999); //此处需后台获取可用积分
  });
  //获取更多扭蛋次数弹窗“积分兑换”按钮点击事件
  $('.getMoreNumDia').on('click',".succ",function(){
    var maxNum=Math.floor(($('.getMoreNumDia .totleScore').html()-0)/500);
    var exchangeNum=$.trim($('.getMoreNumDia .exchangeNum').val());
    if(!/^\d+$/.test(exchangeNum)){
      alert('您所填次数需为有效的数字，请修正后重新提交！')
    }else if(exchangeNum>maxNum){
      alert('您所填写的次数大于您积分可兑换的次数，请重新填写后再提交！')
    }else if(exchangeNum<=0){
      alert('您所填写的次数需为大于0的数字，请重新填写后再提交！')
    }else{
      $('.getMoreNumDia').hide();
      alert('兑换成功');
      var newNum=$('.availableNum .num').html()-0+(exchangeNum-0);//此处为样例，实际需后台返回次数
      $('.availableNum .num').html(newNum);
    }
  });
  /* ==================弹窗相关按钮点击事件 end================== */



  /* ==================获奖人员名单滚动特效 begin================== */
  ;(function(){
    
    var listContH=$('.listCont .list').height();//
    var step=$('.listCont').height()/4,moveTop=0;

    var topFiveList=$('.listCont p:lt(5)');
    topFiveList.clone().appendTo('.listCont .list');
    
    setInterval(function(){
       moveTop+=step;
       $('.listCont .list').animate({'margin-top':-moveTop},300,function(){
        if( moveTop>=listContH){
          moveTop=0;
          $('.listCont .list').css({'margin-top':0});
        }
      }); 
    },1200)
  })();
  /* ==================获奖人员名单滚动特效 end================== */
})