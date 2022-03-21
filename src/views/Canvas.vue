<template>
  <div id="main">
    <div class="canvasAll">
      <canvas id="canvas"></canvas>
      <div ref="box" class="box" v-show="flag">
        <span>x轴坐标: {{longitude}}</span><br>
        <span>y轴坐标: {{latitude}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  class Circle {
    constructor(canvas, x, y, r, color) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
    }
    circle() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = this.color; //填充颜色,默认是黑色
      this.ctx.fill(); //画实心圆
      this.ctx.closePath()
    }
  }
  class Rectangle {
    constructor(canvas, x, y, width, height, color) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color
    }
    rect() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x,this.y,this.width,this.height); 
      this.ctx.closePath()
    }
  }
  export default {
    data() {
      return {
        circles: [],
        rects:[],
        flag: false,
        longitude: 0,
        latitude: 0
      }
    },
    mounted() {
      let canvas = document.getElementById('canvas');
      canvas.width = 800;
      canvas.height = 540;
      let ctx = canvas.getContext('2d');


      // 高分辨率
      const dpr = window.devicePixelRatio
      const logicalWidth = canvas.width
      const logicalHeight = canvas.height
      canvas.width = logicalWidth * dpr
      canvas.height = logicalHeight * dpr
      canvas.style.width = logicalWidth + 'px'
      canvas.style.height = logicalHeight + 'px'
      ctx.scale(dpr, dpr)

      //每格的高度
      let rectH = 30;
      //每格的宽度
      let rectW = 200;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      //画表格横线
      for (let i = 0; i < canvas.width; i++) {
        ctx.moveTo(0, rectH * i);
        ctx.lineTo(canvas.width, rectH * i);
      }
      //画表格数线
      for (let i = 0; i < canvas.height; i++) {
        ctx.moveTo(rectW * i, 0);
        ctx.lineTo(rectW * i, canvas.height);
      }

      ctx.stroke();

      ctx.closePath(); //结束路径

      //画蓝色圆点
      let x = 40;
      let y = 40;
      for (let i = 0; i < 50; i++) {
        x = parseInt(Math.random() * 800);
        y = parseInt(Math.random() * 540);
        let ctx = new Circle(canvas, x, y, 10, 'rgb(24, 144, 255)'); //创建圆点对象
        ctx.circle(); //画圆
        this.circles.push(ctx); //将对象放进数组
      }
      // 画黄色圆点
      for (let i = 0; i < 50; i++) {
        x = parseInt(Math.random() * 800);
        y = parseInt(Math.random() * 540);
        let ctx = new Circle(canvas, x, y, 8, 'rgb(246, 201, 97)'); //创建圆点对象
        ctx.circle(); //画圆
        this.circles.push(ctx); //将对象放进数组
      }
      //画粉色矩形
      for (let i = 0; i < 50; i++) {
        x = parseInt(Math.random() * 800);
        y = parseInt(Math.random() * 540);
        let ctx = new Rectangle(canvas, x, y, 20,8, 'pink'); //创建圆点对象
        ctx.rect(); //画圆
        this.rects.push(ctx); //将对象放进数组
      }
      //画蓝色矩形
      for (let i = 0; i < 50; i++) {
        x = parseInt(Math.random() * 800);
        y = parseInt(Math.random() * 540);
        let ctx = new Rectangle(canvas, x, y, 40,8, 'skyblue'); //创建圆点对象
        ctx.rect(); //画圆
        this.rects.push(ctx); //将对象放进数组
      }

      canvas.addEventListener('mousemove', (e) => {
        
        let eventX = e.clientX - canvas.getBoundingClientRect().left;
        let eventY = e.clientY - canvas.getBoundingClientRect().top;
        //判断在哪一个圆点
        for (let i = 0; i < this.circles.length; i++) {
          let x = this.circles[i].x;
          let y = this.circles[i].y;
          let r = this.circles[i].r;
          let dis = Math.sqrt((eventX - x) * (eventX - x) + (eventY - y) * (eventY - y)); //点到圆心的距离
          if (dis <= r) {
            //防止显示的div越出边界
            if (800 - eventX > 124) {
              this.$refs.box.style.left = eventX + 15 + 'px'
            } else {
              this.$refs.box.style.left = eventX - 134 + 'px'
            }
            if (540 - eventY > 70) {
              this.$refs.box.style.top = eventY + 15 + 'px'
            } else {
              this.$refs.box.style.top = eventY - 80 + 'px'
            }
            //显示div
            this.flag = true;
            //设置显示的坐标值
            this.longitude = this.circles[i].x;
            this.latitude = this.circles[i].y;
            console.log(this.circles[i].x, this.circles[i].y);
            return;//避免冒泡而且不再判断是否是矩形
          } else {
            this.flag = false;
          }
        }
        //判断在哪个矩形上
        for (let i = 0; i < this.rects.length; i++) {
          let x = this.rects[i].x;
          let y = this.rects[i].y;
          let width = this.rects[i].width;
          let height = this.rects[i].height;
          
          if (eventX-x>=0&&eventX-x<=width&&eventY-y>=0&&eventY-y<=height) {
            //防止显示的div越出边界
            if (800 - eventX > 124) {
              this.$refs.box.style.left = eventX + 5 + 'px'
            } else {
              this.$refs.box.style.left = eventX - 134 + 'px'
            }
            if (540 - eventY > 70) {
              this.$refs.box.style.top = eventY + 5 + 'px'
            } else {
              this.$refs.box.style.top = eventY - 80 + 'px'
            }
            //显示div
            this.flag = true;
            //设置显示的坐标值
            this.longitude = this.rects[i].x;
            this.latitude = this.rects[i].y;
            console.log(this.rects[i].x, this.rects[i].y);
            // alert('x轴是:'+this.circles[i].x+',y轴是:'+this.circles[i].y)
            break; //避免冒泡触发事件
          } else {
            this.flag = false;
          }
        }
      }, false)
      canvas.addEventListener('click', (e) => {
        let eventX = e.clientX - canvas.getBoundingClientRect().left;
        let eventY = e.clientY - canvas.getBoundingClientRect().top;
        //判断点击哪个圆
        for (let i = 0; i < this.circles.length; i++) {
          let x = this.circles[i].x;
          let y = this.circles[i].y;
          let r = this.circles[i].r;
          let dis = Math.sqrt((eventX - x) * (eventX - x) + (eventY - y) * (eventY - y)); //点到圆心的距离
          if (dis <= r) {
            alert('x轴是:' + this.circles[i].x + ',y轴是:' + this.circles[i].y+'颜色是:'+this.circles[i].color)
            return; //避免冒泡触发事件,不再判断是否是矩形
          }
        }
        //判断点击哪个矩形上
        for (let i = 0; i < this.rects.length; i++) {
          let x = this.rects[i].x;
          let y = this.rects[i].y;
          let width = this.rects[i].width;
          let height = this.rects[i].height;
          if (eventX-x>=0&&eventX-x<=width&&eventY-y>=0&&eventY-y<=height) {
            alert('x轴是:'+this.rects[i].x+',y轴是:'+this.rects[i].y)
            break; //避免冒泡触发事件
          }
        }
      }, false)
      canvas.addEventListener('mouseout',(e)=>{
        this.flag = false
      })
      console.log(this.circles,this.rects);
    },
    methods: {

    }
  }
</script>

<style lang="less">
  #main {
    position: relative;
  }

  @width : 100px;

  .canvasAll {
    margin-left: 200px;
    margin-top: 200px;
    position: relative;
  }

  .box {
    z-index: 1000;
    position: absolute;
    top: 100px;
    left: 300px;
    width: @width;
    height: 60px;
    color: rgb(89, 89, 89);
    background-color: #fff;
    padding: 10px 12px 0px 12px;
    box-shadow: rgb(174 174 174) 0px 0px 10px;
    border-radius: 3px;
  }

  .box span {
    line-height: 20px;
    font-size: 12px;
  }
</style>