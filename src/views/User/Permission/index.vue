<template>
  <div>
    <div class="clock-wrapper">
      <span>运动的小球</span>
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
    <div class="clock-wrapper">
      <span>时钟</span>
      <canvas id="clock" width="300" height="300"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPermission",
  data() {
    return {};
  },
  mounted() {
    this.draw();
    setInterval(() => {
      this.clock();
    }, 1000)
    
  },
  methods: {
    // 运动的小球
    clock() {
      const clk = document.getElementById("clock");
      if (clk.getContext) {
        const width = (clk.width = 300);
        const ctx = clk.getContext("2d");
        const r = width / 2 - 4;
        ctx.translate(150, 150);
        ctx.save();
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(0, 0, r, 0, (360 * Math.PI) / 180);
        ctx.stroke();
        ctx.restore();
        // 刻度
        ctx.save();
        for (let i = 0; i < 60; i++) {
          ctx.beginPath();
          ctx.lineCap = "round";
          ctx.strokeStyle = "blue";
          if (i % 5 === 0) {
            ctx.lineWidth = 2;
            ctx.moveTo(0, 4 - r);
            ctx.lineTo(0, 18 - r);
          } else {
            ctx.lineWidth = 1;
            ctx.moveTo(0, 4 - r);
            ctx.lineTo(0, 16 - r);
          }
          ctx.rotate((6 * Math.PI) / 180);
          ctx.stroke();
        }
        ctx.restore();
        // 文字
        const num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        
        for (let i = 0; i < 12; i++) {
          var rad = ((2 * Math.PI) / 12) * i;
          var x = Math.cos(rad) * (r - 32);
          var y = Math.sin(rad) * (r - 32);
          ctx.textAlign = "center";
          ctx.textBaseline="middle";
          ctx.font = "18px Arial";
          ctx.fillText(num[i], x, y);
        }
        
        // 针

        const Ttime = new Date()
        const h = Ttime.getHours()
        const m = Ttime.getMinutes()
        const s = Ttime.getSeconds()
        
        const hr = 30*h + m/2+ s/120
        const mr = 6 * m + s/10
        const sr = s * 6
        
        //时
        ctx.beginPath()
        ctx.save();
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.rotate ((hr-90) * (Math.PI/ 180));
        ctx.moveTo(-10, 0);
        ctx.lineTo(r/3, 0);
        ctx.stroke();
        ctx.restore();

        //分
        ctx.beginPath()
        ctx.save();
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.rotate ((mr-90) * (Math.PI/ 180));
        ctx.moveTo(-10, 0);
        ctx.lineTo(r/2, 0);
        ctx.stroke();
        ctx.restore();

        //秒
        ctx.beginPath()
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red'
        ctx.lineCap = 'round';
        ctx.rotate ((sr-90) * (Math.PI/ 180));
        ctx.moveTo(-10, 0);
        ctx.lineTo(r-20, 0);
        ctx.stroke();
        ctx.restore();

         //帽子
        ctx.beginPath()
        ctx.save();
        ctx.fillStyle = 'red'
        ctx.arc(0, 0, 5, 0, (360 * Math.PI) / 180);
        ctx.fill();
        ctx.restore();
      }
    },

    draw() {
      const canvas = document.querySelector("canvas");
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      class ball {
        constructor(x = 150, y = 150, r = 20, vx = 3, vy = 2, color = "red") {
          this.x = x;
          this.y = y;
          this.r = r;
          this.vx = vx;
          this.vy = vy;
          this.color = color;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        move() {
          this.draw();
          this.x += this.vx;
          this.y += this.vy;
          if (this.x > canvas.width - this.r || this.x < this.r) {
            this.vx = -this.vx;
          }
          if (this.y > canvas.height - this.r || this.y < this.r) {
            this.vy = -this.vy;
          }
        }
      }
      const colors = ["green", "yellow"];
      const arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(new ball(20 + i * 10, 20 + i * 10, 20, 2, 3, colors[i % 2]));
      }

      function animate() {
        ctx.clearRect(0, 0, 300, 300);
        for (var i = 0; i < arr.length; i++) {
          arr[i].move();
        }
        window.requestAnimationFrame(animate);
      }
      animate();
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-wrapper {
  width: 300px;
  margin: 100px auto;
}
#canvas,
#clock {
  border: 1px solid #ff0000;
}
</style>
