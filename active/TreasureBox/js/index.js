$(function(){

  /* 等比例设置网页头部、地图高度 */
  $('.header').height($('.header').width()*400/1920);
  $('.map').height($('.map').width()*943/1608);
  $('.map .myTrip').css('line-height',parseInt($('.map .myTrip').height()*0.8/5)+'px');
  $('.prizesExchange').height($('.prizesExchange').width()*409/1655);
  
  $(window).on('resize',function(){
    $('.header').height($('.header').width()*400/1920);
    $('.map').height($('.map').width()*943/1608);
    $('.prizesExchange').height($('.prizesExchange').width()*409/1655);
  });
  /* 头部查看规则按钮 */
  $('.section .rule').on('click',function(){ $('#ActiveRule').fadeIn(1000); })
  /* 弹窗关闭按钮点击事件 */
  $('#ActiveRule .close').on('click',function(){$('#ActiveRule').fadeOut(500);})


  var stepNum=320560;//获取行走的步数
  var circleNum=3;//已走丝绸之旅圈数
  var goldCoinNum=5;//可用金币数量
  var treasureOpen=[1,2,3,4,5,6,7,8];//当圈已打开宝箱Id数组（1-11）
  var awardNum=2;//已领奖品数量

  var stepNumOriginal=stepNum;//备份原始的行走步数

  /* 宝箱弹窗== “领取按钮” 点击事件 */
  $('#ReceiveGoldcoin .btn').on('click',function(){
    var boxId=parseInt($(this).closest('#ReceiveGoldcoin').attr('boxId'));
    //关闭弹窗
    $('#ReceiveGoldcoin').fadeOut(500,function(){
      if(treasureOpen.length==11){OpenNextTravelTips();}
    });
    $('#ReceiveGoldcoin .main').removeClass('on');
    //更改此打开宝箱的显示状态==可打开>已打开
    $('.treasureBox .area').each(function(i,ele){
      if($(this).attr('boxId')==$('#ReceiveGoldcoin').attr('boxId')){
        $(this).removeClass('passed').addClass('open');
      }
    });
    if(treasureOpen.indexOf(boxId)<0){
      treasureOpen.push(boxId);
      $('.myTrip .treasure').html(treasureOpen.length+circleNum*11);//已领宝箱数量
      //判断打开宝箱所获取金币数量
      var timeId='',price=goldCoinNum;
      switch(boxId){
        case 1:goldCoinNum+=1;break;
        case 2:goldCoinNum+=2;break;
        case 3:goldCoinNum+=3;break;
        case 4:goldCoinNum+=4;break;
        case 5:goldCoinNum+=6;break;
        case 6:goldCoinNum+=8;break;
        case 7:goldCoinNum+=12;break;
        case 8:goldCoinNum+=14;break;
        case 9:goldCoinNum+=20;break;
        case 10:goldCoinNum+=30;break;
        case 11:goldCoinNum+=40;break;
      }
      clearInterval(timeId);//金币数量动态累加
      timeId=setInterval(function(){
        if(price<goldCoinNum){
          price++;
          $('.myTrip .goldCoin').css({'transform':'scale(1.4)'});
          $('.myTrip .goldCoin').html(price);
        }else{$('.myTrip .goldCoin').css({'transform':'scale(1)'});clearInterval(timeId);}
      },50)
      prizesBoxState();//判断可领宝箱数量
      $('.messageTips').html('恭喜您，金币领取成功，现有金币 '+goldCoinNum+' 个！');
      $('.messageTips').slideDown();
      setTimeout(function(){$('.messageTips').slideUp();},2000); 
    }
  });

  /* 可打开宝箱点击事件== “打开弹窗”  */
  $('.treasureBox').on('click','.passed .box',function(){
    var boxId=$(this).parent().attr('boxId');
    $('#ReceiveGoldcoin').attr('boxId',boxId);
    $('#ReceiveGoldcoin').fadeIn(1000);
    $('#ReceiveGoldcoin .main').addClass('on');
    $('#ReceiveGoldcoin .title img').attr('src','images/dia_title'+boxId+'.png')
  });

  /* “弹窗关闭” 按钮点击事件 */
  $('#ReceiveGoldcoin .close').on('click',function(){
    $('#ReceiveGoldcoin').fadeOut(500);
    $('#ReceiveGoldcoin .main').removeClass('on');
  })

  /* 当页面滚动到地图位置时，动态绘制行走路线 */
  $(window).on('scroll',function(){
    if($(window).scrollTop()>=$('.header').height()-100){
      $(window).off('scroll');
      drawMap();
      OpenNextTravelTips();
    }
  });

  /* 根据打开宝箱数量，判断是否弹出进入下一圈提示窗 */
  function OpenNextTravelTips(){
    if(treasureOpen.length==11){
      $('#goNextTrip').delay(1000).fadeIn(1000);
      $('#goNextTrip .btn').addClass('sub')
      $('#goNextTrip .title img').attr('src','images/circle'+(circleNum+1)+'.png');
      $('#goNextTrip .sub').on('click',function(){
        $(this).off('click');
        $('#goNextTrip').fadeOut(500,function(){
          stepNum=stepNumOriginal;
          circleNum++;
          treasureOpen=[];
          drawMap();
          $(this).on('click')
        });//关闭弹窗
      });
    }
  }

  /* 进入下一圈提示弹窗=== “关闭按钮”、“右侧按钮” 点击事件 */
  $('#goNextTrip .close').on('click',function(e){
    e.stopPropagation();
    $('#goNextTrip').addClass('closed')
  });
  $('#goNextTrip').on('click',function(){
    if($(this).hasClass('closed')) $(this).removeClass('closed')
  });

  function drawMap(){
    /* 根据行走圈数，设置显示步数，与绘线速度 */
    if(parseInt(stepNum/70000)>circleNum){ stepNum=70000; }
    else{ stepNum-=70000*circleNum; }
    if(stepNum>25000) drawMapLine(stepNum,10);
    else if(stepNum>12000) drawMapLine(stepNum,25);
    else if(stepNum>5000) drawMapLine(stepNum,40);
    else if(stepNum>3000) drawMapLine(stepNum,80);
    else if(stepNum>1500) drawMapLine(stepNum,100);
    else if(stepNum>500) drawMapLine(stepNum,150);
    else if(stepNum>=0) drawMapLine(stepNum,150);
    /* 计算走过驿站的数量 */
    var post=0;
    if(stepNum>=500&&stepNum<1500)post=1;
    else if(stepNum>=1500&&stepNum<3000)post=2;
    else if(stepNum>=3000&&stepNum<5000)post=3;
    else if(stepNum>=5000&&stepNum<8000)post=4;
    else if(stepNum>=8000&&stepNum<12000)post=5;
    else if(stepNum>=12000&&stepNum<18000)post=6;
    else if(stepNum>=18000&&stepNum<25000)post=7;
    else if(stepNum>=25000&&stepNum<35000)post=8;
    else if(stepNum>=35000&&stepNum<50000)post=9;
    else if(stepNum>=50000&&stepNum<70000)post=10;
    else if(stepNum>=70000)post=11;
    /* 初始化设置宝箱状态：可打开、已打开 */
    $('.treasureBox .area').each(function(i,ele){
      $(ele).removeClass('open');
      $(ele).removeClass('passed');
      if(i<=post-1){
        treasureOpen.forEach(function(item){
          if(i==item-1) $(ele).addClass('open');
        });
        if(!$(ele).hasClass('open')){
          $(ele).addClass('passed');
        }
      }
    });
    /* “我的行程”内容设置 */
    $('.myTrip .step').html(stepNumOriginal);
    $('.myTrip .goldCoin').html(goldCoinNum);
    $('.myTrip .circleNum').html('');
    for(var cirCont=0; cirCont<circleNum;cirCont++){ $('.myTrip .circleNum').append('<i></i>'); }
    $('.myTrip .circleNum').attr('title','您已走完'+circleNum+'圈丝绸之旅')
    $('.myTrip .post').html(post+circleNum*11);
    $('.myTrip .treasure').html(treasureOpen.length+circleNum*11);
    $('.myTrip .award').html(awardNum);
  }

  /* 动态绘制行走路线函数 */
  function drawMapLine(step,speed){
    var timeId='',imgName=0;
    clearInterval(timeId);
    timeId=setInterval(function(){
      var oldStep=imgName;
      //根据图片命名规则，判断步数相应图片命名
      if(imgName<step){
        if(imgName>=0&&imgName<1500){imgName+=100;}
        else if(imgName>=1500&&imgName<3000){imgName+=300;}
        else if(imgName>=3000&&imgName<5000){imgName+=200;}
        else if(imgName>=5000&&imgName<12000){imgName+=500;}
        else if(imgName>=12000&&imgName<18000){imgName+=1000;}
        else if(imgName>=18000&&imgName<25000){imgName+=700;}
        else if(imgName>=25000&&imgName<35000){imgName+=1000;}
        else if(imgName>=35000&&imgName<50000){imgName+=1500;}
        else if(imgName>=12000){imgName+=2000}
        $('.stepNum img').attr('src','images/map/'+oldStep+'-'+imgName+'.png')
      }else if(imgName==step){
        //若恰好走到每个宝箱节点时，所对应的图片
        switch(step){
          case 0:
          case 500:
          case 1500:
          case 3000:
          case 5000:
          case 8000:
          case 12000:
          case 18000:
          case 25000:
          case 35000:
          case 50000:
          case 70000:$('.stepNum img').attr('src','images/map/'+imgName+'.png');break;
          default:break;
        }
        clearInterval(timeId);
      }else{clearInterval(timeId);}
    },speed)
  }

  /* 初始化可兑换奖品显示的状态  */
  function prizesBoxState(){
    var coin=0;
    $('.prizesExchange .prize').each(function(i,ele){
      $(this).removeClass('cur');
      coin=parseInt($(this).find('.exchange span').html());
      if(goldCoinNum>=coin) $(this).addClass('cur');
    })
  }
  prizesBoxState();
  /* 兑换奖品点击事件== “打开弹窗”  */
  $('.prizesExchange').on('click','.cur',function(){
    var boxId=parseInt($(this).find('span').html());
    var index=parseInt($(this).closest('.prize').index());
    $('#ReceivePrize').attr('boxId',boxId);
    $('#ReceivePrize').fadeIn(1000);
    $('#ReceivePrize .main').addClass('on');
    $('#ReceivePrize .title img').attr('src','images/jia-'+index+'.png')
  });
  /* “弹窗关闭” 按钮点击事件 */
  $('#ReceivePrize .close').on('click',function(){
    $('#ReceivePrize').fadeOut(500);
    $('#ReceivePrize .main').removeClass('on');
  })
  /* 兑换奖品弹窗== “领取按钮” 点击事件 */
  $('#ReceivePrize').on('click','.on .btn',function(){
    if($.trim($('#ReceivePrize .name').val())!=''&&$.trim($('#ReceivePrize .phone').val())!=''&&$.trim($('#ReceivePrize .add').val())!=''){
      var timeId='',price=goldCoinNum;
      //关闭弹窗
      $('#ReceivePrize').fadeOut(500);
      $('#ReceivePrize .main').removeClass('on');
      //更新已领奖品数量
      awardNum++;
      $('.myTrip .award').html(awardNum);
      //更新金币数量，动画显示，并重新初始化可兑换奖品状态
      if(goldCoinNum>=$('#ReceivePrize').attr('boxId')){
        goldCoinNum-=$('#ReceivePrize').attr('boxId');
        clearInterval(timeId);
        timeId=setInterval(function(){
          if(price>goldCoinNum){
            price--;
            $('.myTrip .goldCoin').html(price);
          }
        },50);
        prizesBoxState();      
        //兑换成功提示
        $('.messageTips').html('恭喜您，兑换成功，我们会尽快安排为您邮寄，<br/>剩余金币 '+goldCoinNum+' 个！');
        $('.messageTips').slideDown();
        setTimeout(function(){$('.messageTips').slideUp();},3000);
      }
    }else{
      //如果收获信息有空的输入框则弹出提示
      $('.messageTips').html('您的收获信息尚未填写完整！');
      $('.messageTips').slideDown();
      setTimeout(function(){$('.messageTips').slideUp();},3000);
    }
  })
});

