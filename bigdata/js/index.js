$(function(){
    // $('body>.container').css({'width':"1920px",'max-width':"1920px"})
    // $('body>.container').height(1920*$(window).height()/$(window).width()+"px");
    $('body>.container').css({'width':$(window).width()+"px",'max-width':$(window).width()+"px"})
    $('body>.container').height(1920*$(window).height()/$(window).width()+"px");

    // 头部日期获取
    ;(function(){
        $('header .timer span').html(getDateTime());
        function getDateTime(){
            var date=new Date();
            var weekDatd=['一','二','三','四','五','六','日'];
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate()+1;
            var week=date.getDay();
            var hours=date.getHours();
            var minutes=date.getMinutes();
            var seconds=date.getSeconds();
            month=month>9?month:'0'+month;
            day=day>9?day:'0'+day;
            hours=hours>9?hours:'0'+hours;
            minutes=minutes>9?minutes:'0'+minutes;
            seconds=seconds>9?seconds:'0'+seconds;
            return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds+' '+'星期'+weekDatd[week];
        }
    })()


    // 用户行业分布 === 图表
    ;(function(){
        $('.section1 .box3 path').each(function(){
            var deg=$(this).data('value')/100;
            var x=(25+21*Math.sin(deg*2*Math.PI)).toFixed(2)
            var y=(25-21*Math.cos(deg*2*Math.PI)).toFixed(2)
            var d=$(this).attr('d').split(' ')
            d[d.length-1]=y;
            d[d.length-2]=x;
            $(this).attr('d',d.join(' '))
        });
        var mychart=echarts.init($('#userChart2')[0]);
        var option = {
            color:['#a06','#06a','#a60'],
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%','80%'],
                    data:[
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:235, name:'视频广告'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    label: {normal: {textStyle: {color: '#ccc'}}},
                    labelLine: {normal: {lineStyle: {color: '#ccc'}}},
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                }
            ]
        };
        mychart.setOption(option);
    })()

    // 各产业金额分布 === 图表
    ;(function(){
        var mychart=echarts.init($('#userChart')[0]);
        var option = {
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {colorLightness: [0, 1]}
            },
            color:['#f09','#0f9','#f90'],
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '80%',
                    data:[
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:235, name:'视频广告'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    roseType: 'angle',
                    label: {normal: {textStyle: {color: '#ccc'}}},
                    labelLine: {normal: {lineStyle: {color: '#ccc'}}},
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                }
            ]
        };
        mychart.setOption(option);
    })();

    ;(function(){
        $('.digitalScroll').each(function(){
            if($(this).find('.box').length==0){
                $(this).append('<div class="box"></div>')
            }
            digitalScroll($(this));
        });
        function digitalScroll(ele){
            // 添加滚动效果节点元素
            var val=ele.find('.num').html()+'';
            var data=val.split('');
            var html=[];
            (data.reverse()).forEach(function(e,i){
                if(i%3==0&&i>0){
                    html.unshift('<li>,</li>');
                    ele.find('.num').append(',')
                }
                let str='<li data-val="'+e+'">';
                for(let i=0;i<10;i++){
                    str+='<span>'+i+'</span>'
                }
                str+='</li>'
                html.unshift(str);
            })
            html.unshift('<ul>')
            html.push('</ul>');
            ele.find('.box').html(html.join(''));
            //设置内容高度
            var height=ele.find('.num').height()
            ele.find('.box').css({'height':height,'line-height':height+'px',});
            //设置滚动距离
            ele.find('.box li').each(function(){
                if($(this).data('val')){
                    $(this).css('top',-$(this).data('val')*height)
                }
            })
        }
        $('.section2 path').each(function(){
            var deg=0.39;
            var x=(100+90*Math.sin(deg*2*Math.PI)).toFixed(2)
            var y=(100-90*Math.cos(deg*2*Math.PI)).toFixed(2)
            var d=$(this).attr('d').split(' ')
            d[d.length-1]=y;
            d[d.length-2]=x;
            $(this).attr('d',d.join(' '))
            $(this).siblings('.number').html('39%')
        });
    })()
    
    // section3 轮播图表
    ;(function(){
        $('.section3 .box').on('click',function(){
            if(!$(this).hasClass('on')){
                count=$(this).index()
                next($(this))
            }
        })
        $('.section3 .icon i').on('click',function(){
            if(!$(this).hasClass('on')){
                var ele=$('.section3 .box').eq($(this).index())
                count=$(this).index()
                next(ele)
            }
        })
        var count=1;
        var timer=setInterval(function(){
            count++;
            if(count==3) count=0;
            next($('.section3 .box').eq(count))
        },3000)
        function next(ele){
            var index=ele.index();
            var nextI=index+1;
            var prevI=index-1;
            if(nextI>2) nextI=0;
            if(prevI<0) prevI=2;
            ele.removeClass('prev').removeClass('next').addClass('on')
            $('.section3 .box').eq(nextI).removeClass('prev').removeClass('on').addClass('next')
            $('.section3 .box').eq(prevI).removeClass('next').removeClass('on').addClass('prev')
            $('.section3 .icon i').removeClass('on')
            $('.section3 .icon i').eq(index).addClass('on')
        }

        var mychart1=echarts.init($('.section3 .box')[0])
        var mychart2=echarts.init($('.section3 .box')[1])
        var mychart3=echarts.init($('.section3 .box')[2])
        var option = {
            title: {
                textStyle:{color:'#fff'},
                text: '最近15天销售数据'
            },
            color:'#0ff',
            textStyle:{color:'#fff'},
            tooltip: {},
            legend: {
                textStyle:{color:'#fff'},
                right:0,
                data:['销量']
            },
            xAxis: {
                color:"#fff",
                data: ["8/24","8/25","8/26","8/27","8/28","8/29","8/30","8/31","9/1","9/2","9/3","9/4","9/5","9/6","9/7","9/8","9/9","9/10"]
            },
            yAxis: {
                show:true,
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20],
                label: {show:true,position:'top',textStyle:{color:'#aaa'}},
                labelLine: {show:true},
            }]
        };
        mychart1.setOption(option)
        mychart2.setOption(option)
        mychart3.setOption(option)
    })()

    

    //section4 轮播 && 图表
    ;(function(){
        $('.section4 .lunbo1 .item').on('click',function(){
            if(!$(this).hasClass('on')){
                count1=$(this).index()
                next($(this))
            }
        })
        $('.section4 .lunbo2 .item').on('click',function(){
            if(!$(this).hasClass('on')){
                count2=$(this).index()
                next($(this))
            }
        })
        $('.section4 .lunbo1 .icon i').on('click',function(){
            if(!$(this).hasClass('on')){
                var ele=$(this).closest('.content').find('.item').eq($(this).index())
                count1=$(this).index()
                next(ele)
            }
        })
        $('.section4 .lunbo1 .icon i').on('click',function(){
            if(!$(this).hasClass('on')){
                var ele=$(this).closest('.content').find('.item').eq($(this).index())
                count2=$(this).index()
                next(ele)
            }
        })
        var count1=1;
        var count2=1;
        var timer1=setInterval(function(){
            count1++;
            if(count1==3) count1=0;
            next($('.section4 .lunbo1 .item').eq(count1))
        },3000);
        var timer2=setInterval(function(){
            count2++;
            if(count2==3) count2=0;
            next($('.section4 .lunbo2 .item').eq(count2))
        },3000);
        function next(ele){
            var parent=ele.closest('.content')
            var index=ele.index();
            var nextI=index+1;
            var prevI=index-1;
            if(nextI>2) nextI=0;
            if(prevI<0) prevI=2;
            ele.removeClass('prev').removeClass('next').addClass('on')
            parent.find('.item').eq(nextI).removeClass('prev').removeClass('on').addClass('next')
            parent.find('.item').eq(prevI).removeClass('next').removeClass('on').addClass('prev')
            parent.find('.icon i').removeClass('on')
            parent.find('.icon i').eq(index).addClass('on')
        }

        var mychart=echarts.init($('.section4 .datainfo')[0])
        var option = {
            textStyle:{color:'#fff'},
            grid:{top:10,bottom:10},
            xAxis: {
                color:"#fff",
                data: ["9/4","9/5","9/6","9/7","9/8","9/9","9/10"]
            },
            yAxis: {
                show:true,
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5],
                itemStyle:{color:'#0ff'},
            },{
                name: '销量',
                type: 'line',
                data: [15, 28, 39, 24, 33, 23,15],
                itemStyle:{color:'#a06'},
                label: {show:true,textStyle:{color:'#aaa'}},
                labelLine: {show:true},
            }]
        };
        mychart.setOption(option)
    })()
})