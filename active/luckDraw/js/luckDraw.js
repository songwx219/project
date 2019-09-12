$(function(){
  /* 设置html字体大小 */
  ;(function(){
    var html = $('html')[0]; 
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    html.style.fontSize = w / 750*100 + "px";
    $(window).on('resize',function(){
      w = document.documentElement.clientWidth || document.body.clientWidth;
      html.style.fontSize = w / 750*100 + "px";
    })
  })();
  /* 中奖信息滚动视图 */
  ;(function(){
    var timeId='';
    var prizeLiNum=0;
    var prizeLiLen=$('.prizeInfo li').length;
    timeId=setInterval(function(){
      var old=prizeLiNum;
      if(prizeLiNum<prizeLiLen-1){
        prizeLiNum++;
      }else{prizeLiNum=0;}
      $('.prizeInfo li').eq(old).animate({'bottom':'1.3rem'});
      setTimeout(function(){
        $('.prizeInfo li').eq(old).css({'bottom':'-1.3rem'});
      },1000);
      $('.prizeInfo li').eq(prizeLiNum).animate({'bottom':'0rem'});
    },2000);
  })();

  /* 初始化右侧悬浮奖品按钮显示状态（若我的奖品中有奖品，则显示） */
  if($('#prizeList li').length>0){$('.footer .icon').show();}
  /* 初始化开始抽奖按钮状态，若次数大于0，方可开始；否则禁用 */
  if($('#luckDrawNum').html()-0>0){
    $('.luckDraw .btn>div').addClass('begin');
    $('.luckDraw .btn>div img').attr('src','images/begin.png');
  }
  
  /* 活动锦囊按钮点击事件 */
  $('.silkBag .icon').on('click',function(){
    $('.silkBag .content').show();
    $('.silkBag strong.rules').addClass('on');
    $('.silkBag strong.prize').removeClass('on');
    $('.silkBag div.rules').show();
    $('.silkBag div.prize').hide();
  })
  /* 活动规则/我的奖品弹窗tab切换 */
  $('.silkBag .tab strong').on('click',function(){
    $(this).siblings('strong').removeClass('on');
    $(this).addClass('on');
    if($(this).hasClass('rules')){
      $('.silkBag div.prize').hide();
      $('.silkBag div.rules').show();
    }
    if($(this).hasClass('prize')){
      $('.silkBag div.rules').hide();
      $('.silkBag div.prize').show();
    }
  });
  /* 活动规则/我的奖品弹窗close关闭 */
  $('.silkBag .content .close').on('click',function(){
    $('.silkBag .content').hide();
  });

  /* 我的奖品列表 查看详情 */
  $('.silkBag .content .more').on('click',function(){
    $('.silkBag .prizeDetail').show();
    /* 通过Id获取此奖品信息 */
    console.log($(this).attr('data-id'));
    var ptizeTitle='88.88元现金红包';//获奖奖品名称
    var ptizeSrc='images/title.png';//获奖奖品信息
    var prizeTerm='2019.1.30至2019.2.30';//兑换奖品的期限
    var prizeTime='周一至周日';//兑奖时段
    var prizeAdd='***展会***展位';//兑奖地址
    var prizeState=0;//兑奖状态：0：待兑换；1：已兑换；2：已过期；

    $('.prizeDetail img.prize').attr('src',ptizeSrc);
    $('.prizeDetail .title').html(ptizeTitle);
    $('.prizeDetail .term').html(prizeTerm);
    $('.prizeDetail .time').html(prizeTime);
    $('.prizeDetail .add').html(prizeAdd);
    switch(prizeState){
      case 0:$('.prizeDetail .btn').html('<span class="exchange">待兑换</span>');break;
      case 1:$('.prizeDetail .btn').html('<span>已兑换</span>');break;
      case 2:$('.prizeDetail .btn').html('<span>已过期</span>');break;
    }

  });
  /* 我的奖品详情弹窗close关闭 */
  $('.silkBag .prizeDetail .close').on('click',function(){
    $('.silkBag .prizeDetail').hide();
  });

  /* 页面右侧悬浮查看奖品按钮 */
  $('.footer .icon').on('click',function(){
    $('.silkBag .content').show();
    $('.silkBag strong.rules').removeClass('on');
    $('.silkBag strong.prize').addClass('on');
    $('.silkBag div.rules').hide();
    $('.silkBag div.prize').show();
  })

  /* 抽奖获得奖品弹窗close关闭 */
  $('.prizeDia .close').on('click',function(){
    $('.prizeDia').hide();
    $('.luckDraw .cont .box').removeClass('on');
  });
  /* 抽奖获得奖品弹窗 查看奖品按钮 */
  $('.prizeDia .btn').on('click',function(){
    $('.prizeDia').hide();
    $('.luckDraw .cont .box').removeClass('on');
    $('.silkBag .content').show();
    $('.silkBag strong.rules').removeClass('on');
    $('.silkBag strong.prize').addClass('on');
    $('.silkBag div.rules').hide();
    $('.silkBag div.prize').show();
  });

  /* 抽奖活动代码 */
  ;(function(){
    var curBoxIndex=0;//点击抽奖后，选中状态的奖品Index；
    var time=150;//奖品切换动画时间（设置由快到慢再到快的效果）；
    /* 开始抽奖按钮点击事件 */
    $('.luckDraw ').on('click','.begin',function(){
      $('.luckDraw .mask').show();//打开遮罩，防止页面其他点击事件
      $('.luckDraw .twinkle').addClass('cur');//添加边框圆点闪烁效果
      $('#luckDrawNum').html($('#luckDrawNum').html()-1);//减除可抽奖次数
      if($('#luckDrawNum').html()==0){
        console.log(123)
        $('.luckDraw .btn>div').removeClass('begin');
        $('.luckDraw .btn>div img').attr('src','images/begin1.png');
      }
      
      /* ajax获取获奖信息； */
      var prizeNum=Math.floor(Math.random()*8)+1;//获奖等级：数字格式 1-8；
      var prizeGrade=$('.luckDraw .cont .box').eq(prizeNum-1).attr('data-grade');//获奖等级名称：一等奖/安慰奖等
      var ptizeTitle=$('.luckDraw .cont .box').eq(prizeNum-1).find('img').attr('alt');//获奖奖品名称
      var ptizeSrc=$('.luckDraw .cont .box').eq(prizeNum-1).find('img').attr('src');//获奖奖品信息

      var prizeId=3;//我的奖品的Id
      var prizeTerm='2019.1.30至2019.2.30';//兑换奖品的期限

      /* 我的奖品列表添加新奖品信息 */
      var prizeLiHtml='<li>'
        +'<h5>'+prizeGrade+'：'+ptizeTitle+'</h5>'
        +'<p>兑奖期限：'+prizeTerm+'</p>'
        +'<i>待兑换</i>'
        +'<a class="more" data-id='+prizeId+' href="javascript:;"><img src="images/jian_l.png" alt=""></a>'
        +'</li>';
      $('#prizeList').append(prizeLiHtml);
      $('.footer .icon').show();
      
      curBoxIndex=0;//初始化切换奖品的index
      move();//奖品切换动画开始；

      function move(){
        setTimeout(function(){
          $('.luckDraw .cont .box').removeClass('on');//取消其他奖品选中效果
          $('.luckDraw .cont .box').eq(curBoxIndex%8).addClass('on');//为切换到的奖品添加效果
          if(curBoxIndex<23+prizeNum){//旋转8*3圈后再旋转到选中奖品
            curBoxIndex++;
            time=curBoxIndex<(23+prizeNum)/2?time-6:time+5;//时间由快到慢再到快
            move();//自调用
          }else{//旋转3圈并切换到选中奖品0.8s后
            setTimeout(function(){
              $('.luckDraw .mask').hide();//遮罩隐藏
              $('.luckDraw .twinkle').removeClass('cur');//边框圆点闪烁效果取消
              /* 奖品弹窗显示，并设置弹窗奖品信息 */
              $('.prizeDia').show();
              $('.prizeDia .box h5').html(prizeGrade);
              $('.prizeDia .box p').html(ptizeTitle);
              $('.prizeDia .box img').attr('src',ptizeSrc);
            },800);
          }
        },time)
      }
    })
  })();
  
})