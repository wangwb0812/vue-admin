<template>
  <div>
    <div class="wrapper">
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemUser",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    myPromise() {
      class myP {
        constructor(fn) {
          this.resolvedCallbacks = [];
          this.rejectedCallbacks = [];

          this.state = "PENDING";
          this.value = "";
          fn(this.resolve.bind(this), this.reject.bind(this));
        }
        resolve(value) {
          if (this.state === "PENDING") {
            this.state = "RESOLVED";
            this.value = value;
            this.resolvedCallbacks.map((cb) => cb(value));
          }
        }

        reject(value) {
          if (this.state === "PENDING") {
            this.state = "REJECTED";
            this.value = value;
            this.rejectedCallbacks.map((cb) => cb(value));
          }
        }

				
      }
    },
  },
};
</script>

<style lang="scss" scoped>
   $boxHeight: 100px;
  .wrapper {
    border: 1px solid #ccc;
    height: 500px;
    width: 500px;
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      background: red;
      height: $boxHeight;
      width: $boxHeight/2;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
    }
  }
</style>