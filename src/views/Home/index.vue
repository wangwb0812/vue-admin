<template>
  <div class="home">
    <homeEcharts></homeEcharts>
    {{ $route.meta.title }}
  </div>
</template>

<script>
import homeEcharts from "@/components/Charts";
export default {
  name: "Home",
  components: {
    homeEcharts
  },
  data() {
    return {};
  },
};
</script>

<style>
.home {
  text-align: center;
  font-size: 30px;
  line-height: 1200px;
}
</style>
