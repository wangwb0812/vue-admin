<template>
  <div class="box" @touchstart.stop="touchStart($event)">
    <div id="pointer"></div>
    <div
      id="a"
      @touchend.stop="touchEnd($event)"
      @touchmove.stop="touchMove($event)"
    >
      <!--<p v-for="(item,ind) in rulerList" :key="ind">
							<span v-if="item%10==0">{{item}}</span>
						</p>-->
      <canvas id="myCanvas" width="2005" height="80"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      speed: 0,
      startX: "",
      endX: "",
      num: 0,
      dataList: [],
      moveTimer: null,
      toLeft: 0,
      wid: 0,
      juli: [],

      timer: null,
      loading: false,
      lastPage: false,
      total: 0,

      searchData: {
        foodName: "",
        pageNumber: 1,
        pageSize: 15,
      },
      popupVisible: false,
      popupData: {},
      foodList: [],
    };
  },
  mounted() {
    this.drawRuler();
  },
  methods: {
    drawRuler() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      for (let i = 0; i < 401; i++) {
        if (i % 5 == 0) {
          ctx.moveTo(i * 5 + 0.5, 0);
          ctx.lineTo(i * 5 + 0.5, 45);
          if (i % 10 == 0) {
            //ctx.font = "13px Arial";
            if (i == 400) {
              ctx.textAlign = "center";
              ctx.fillText(i * 5, i * 5 - 6, 70);
            } else if (i == 0) {
              ctx.textAlign = "center";
              ctx.fillText(i * 5, i * 5 + 3, 70);
            } else {
              ctx.textAlign = "center";
              ctx.fillText(i * 5, i * 5 + 0.5, 70);
            }
          }
        } else {
          ctx.moveTo(i * 5 + 0.5, 0);
          ctx.lineTo(i * 5 + 0.5, 35);
        }
      }
      ctx.lineWidth = 1;
      ctx.stroke();
    },
    init(val) {
      setTimeout(() => {
        this.num = val;
        var rule = document.getElementById("a");
        var pointer = document.getElementById("pointer");
        this.wid = pointer.offsetLeft;
        //console.log(this.toLeft,"999999")
        this.toLeft = this.wid - (this.num * rule.offsetWidth) / 2005;
        rule.style.left =
          -((this.num * rule.offsetWidth) / 2005) + this.wid + "px";
      }, 50);
    },
    touchStart(e) {
      var evt = e || window.event;
      clearInterval(this.moveTimer);
      evt.preventDefault();
      if (evt.touches.length == 1) {
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = evt.targetTouches[0].pageX - this.toLeft; // 记录开始位置
      }
    },
    touchMove(e) {
      //console.log(1)
      var evt = e || window.event;
      var rule = document.getElementById("a");
      var pointer = document.getElementById("pointer");
      this.wid = pointer.offsetLeft;
      this.toLeft = evt.targetTouches[0].pageX - this.startX;
      this.juli.push(this.toLeft);
      //this.endX = this.startX - evt.targetTouches[0].pageX;
      if (this.toLeft > this.wid) {
        this.toLeft = this.wid;
        //this.endX = -this.wid
      }
      if (this.toLeft < this.wid - rule.offsetWidth + 5) {
        this.toLeft = this.wid - rule.offsetWidth + 5;
        //this.endX = rule.offsetWidth-this.wid
      }
      this.$set(
        this,
        "num",
        parseInt(((this.wid - this.toLeft) / rule.offsetWidth) * 401) * 5
      );
      rule.style.left = this.toLeft + "px";
    },
    touchEnd() {
      this.move();
    },
    move() {
      clearInterval(this.moveTimer);
      var rule = document.getElementById("a");
      if (this.juli.length < 3) {
        return false;
      } else {
        this.speed =
          this.juli[this.juli.length - 1] - this.juli[this.juli.length - 2];
        this.juli = [];
        this.moveTimer = setInterval(() => {
          this.speed *= 0.85;
          //console.log(this.speed)
          if (Math.abs(this.speed) < 0.5) {
            this.speed = 0;
            clearInterval(this.moveTimer);
            return false;
          }
          this.toLeft += this.speed;
          if (this.toLeft > this.wid) {
            this.toLeft = this.wid;
            this.speed = 0;
            clearInterval(this.moveTimer);
          }
          if (this.toLeft < this.wid - rule.offsetWidth + 5) {
            this.toLeft = this.wid - rule.offsetWidth + 5;
            clearInterval(this.moveTimer);
            this.speed = 0;
          }
          this.$set(
            this,
            "num",
            parseInt(((this.wid - this.toLeft) / rule.offsetWidth) * 401) * 5
          );
          rule.style.left = this.toLeft + "px";
        }, 50);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  overflow: hidden;
  height: 0.9rem;
  background: #d5a46a;
  #pointer {
    border-left: 2px solid #ffd604;
    height: 65px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-0.006rem);
    z-index: 100;
  }
  #a {
    /*background: #52D8B0;*/
    padding: 0.05rem 0;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-start;
    p {
      height: 0.4rem;
      margin-right: 0.04rem;
      border-right: 0.01rem solid #979797;
      &:last-child {
        margin-right: 0;
      }
      &:nth-child(5n + 1) {
        height: 0.5rem;
      }
      span {
        position: absolute;
        bottom: -0.2rem;
        transform: translateX(-50%);
        font-size: 0.12rem;
      }
    }
  }
}
</style>
