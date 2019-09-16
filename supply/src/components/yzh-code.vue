<template>
  <div class="code">
        <span class="btn btn-block btn-warning  btn-lg button" @click="init"><i class="fa fa-info-circle "></i> 点击完成安全验证</span>
        <div class="code_box" v-show="codeBoxStatus">
            <canvas id="VerifiCode" :width="width" :height="height"></canvas>
            <div class="button text-primary d-flex align-items-center">
                <div class="refresh pr-2" @click="init"><i class="fa fa-refresh"></i></div>
                <div class="remove" @click="codeBoxStatus=false"><i class="fa fa-remove"></i></div>
            </div>
            <div class="slider" @mousemove="dragMove($event)" @mouseup="dragEnd">
                <div class="slider_cont"><span class="text">向右拖动滑块填充拼图 </span></div>
                <div class="slider_done"></div>
                <div class="slider_block" @mousedown="dragStart($event)"><i class="fa fa-reorder"></i></div>
            </div>
            <div class="loading text-danger">
                <div class="box d-flex flex-column justify-content-center w-100 h-100 mr-0 "><i class="fa fa-spinner"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'YanzhengCode',
  props:['reload'],
  data () {
    return {
        dragStatus:false,
        sx:0,
        curX:0,
        ctx:null,

        width:600,
        height:300,
        img1:new Image(),
        img2:new Image(),
        curVal:[309,356,378,419,487,414,322,431,305,496],
        id:null,
        codeBoxStatus:false
    }
  },
  methods:{
      init(fn){
            this.curX=0;
            if(localStorage.getItem('code')){
                alert('您已通过验证，请填写完毕直接提交您的信息！');
            }else{
                this.codeBoxStatus=true;
                $('.code_box .loading').addClass('show');
                this.id=Math.ceil(Math.random()*10);
                this.img1.src = `http://songwx219.github.io/node/public/code/1/${this.id}-1.png`;
                this.img1.onload=()=>{
                    this.img2.src = `http://songwx219.github.io/node/public/code/1/${this.id}-2.png`;
                }
                this.img2.onload=()=>{
                    this.update(0);
                    $('.code_box .loading').removeClass('show');
                    if(fn) fn();
                } 
            }    
        },
        update(x){
            this.curX=x*2;
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.drawImage(this.img1, 0, 0,this.width,this.height);
            this.ctx.drawImage(this.img2, this.curX, 0,120,this.height); 
        },
        dragStart(e){
            this.dragStatus=true;
            this.sx=e.clientX;
            $('.slider').addClass('drag');
        },
        dragMove(e){
            if(this.dragStatus){
                if(e.clientX-this.sx>=-2&&e.clientX-this.sx<=262){
                    $('.slider_block').css('transform',`translateX(${e.clientX-this.sx}px)`);
                    $('.slider_done').css({'display':'block','width':`${e.clientX-this.sx+20}px`});
                    this.update(e.clientX-this.sx);
                }
            }
        },
        dragEnd(){
            this.dragStatus=false;
            $('.code_box .loading').addClass('show');
            var value=this.curX+10
            if(Math.abs(value-this.curVal[this.id-1])<10){
                $('.code_box .loading .box').addClass('text-success').html('<span class="fa fa-check-circle "></span><span>验证成功</span>');
                localStorage.setItem('code',true)
                setTimeout(()=>{
                    $('.code_box .loading').removeClass('show');
                    $('.code_box .loading .box').removeClass('text-success').html('<i class="fa fa-spinner"></i>');
                    this.codeBoxStatus=false;
                    $('.code span.button').removeClass('btn-warning').addClass('btn-success').html('<i class="fa fa-check-circle "> </i> 验证成功') 
                },300);
            }else{
                $('.slider').addClass('err');
                $('.code_box .loading .box').html('<span class="fa fa-exclamation-circle "></span><span>验证失败</span>');
                this.init(function(){
                    $('.slider').removeClass('err');
                    $('.slider').removeClass('drag');
                    $('.code_box .loading .box').html('<i class="fa fa-spinner"></i>')
                    $('.slider_block').css('transform','translateX(0px)');
                    $('.slider_done').css({'display':'none','width':`0px`}); 
                });
            } 
        }
  },
  mounted(){
      this.ctx=$('#VerifiCode')[0].getContext("2d");
      window.onbeforeunload = function(event) {
            localStorage.removeItem('code')
      }
  },
  destroyed(){
        localStorage.removeItem('code')
  },
  watch:{
      reload(){
          if($('.code span.button').hasClass('btn-success')){
            $('.code span.button').addClass('btn-warning').removeClass('btn-success').html('<i class="fa fa-info-circle "></i> 点击完成安全验证')
            $('.slider').removeClass('drag');
            $('.code_box .loading .box').html('<i class="fa fa-spinner"></i>')
            $('.slider_block').css('transform','translateX(0px)');
            $('.slider_done').css({'display':'none','width':`0px`}); 
          }
      }
  }
}
</script>

<style scoped>
.code{width: 100%; height: 35px; text-align: center; line-height: 35px; cursor: pointer; position: relative; margin-bottom: 20px;}
.code_box{ width: 322px; padding: 10px; border: 1px solid #ccc;user-select: none; position: absolute; bottom: 0; left: 0; background: #fff;}
.code_box canvas{width: 300px; height: 150px; margin-bottom: 15px; background: #aaa;}
.code_box .slider{position: relative; line-height: 40px; text-align: center;}
.code_box .slider_cont{width: 100%; height: 40px; font-size: 13px; color: #333; border: 1px solid #ddd; background: #f5f5f5; border-radius: 5px;}
.code_box .slider_done{position: absolute; left: 0; top: 0; display: none; width: 40px; width: 0; height: 40px;border: 1px solid rgb(48, 179, 255); background: #d1f2ff; border-radius: 5px;}
.code_box .slider_block{position: absolute; left: 0; top: 0; width: 40px; height: 40px; cursor: pointer; border: 1px solid #999; box-shadow: 0 0 2px rgba(0,0,0,0.5); border-radius: 5px; background: #fff;}
.code_box .slider_block:hover{background: rgb(46, 84, 253); color: #fff;}
.code_box .slider.drag .slider_block{background: rgb(46, 84, 253); color: #fff;}
.code_box .slider.drag .text{display: none;}
.code_box .slider.err .slider_block{border-color: #f00; background: #f66;}
.code_box .slider.err .slider_done{border-color: #f00; background: #fcc;}
.code_box .loading{display: none; position: absolute;left: 0; top: 0; right: 0; bottom: 0; font-weight: 700; background: rgba(255,255,255,0.7);}
.code_box .loading.show{display: block;} 
.code_box .loading i.fa{font-size: 36px;}
.code_box .loading.show i.fa{animation: loading 1s infinite;}
.code_box .button{position: absolute; right: 12px; top: 12px; height: 24px; padding: 0 6px; font-size: 14px; background: rgba(255,255,255,0.6); border-radius: 5px;}
.code_box .button>div{transition: all .5s; }
.code_box .button .remove{font-size: 18px;}
.code_box .button>div:hover{transform: scale(1.1); color: #f80}

@keyframes loading{
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
}
</style>
