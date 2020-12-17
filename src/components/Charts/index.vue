<template>
  <section>
    <div id="chartsId" style="height: 400px; border: 1px solid #1875f0"></div>
		<div class="div1">1</div>
		<div class="div1">2</div>
  </section>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
    };
  },

  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      var myGraphData = [
        {
          parentNode: "张三",
          childNodes: ["小明", "小华", "小杰", "小婷", "小妍", "小飞"],
        },
        { parentNode: "小明", childNodes: [] },
        { parentNode: "小华", childNodes: [] },
        { parentNode: "小杰", childNodes: [] },
        { parentNode: "小婷", childNodes: [] },
        { parentNode: "小妍", childNodes: [] },
        { parentNode: "小飞", childNodes: [] },
      ];

      function setNodeData(arr, m, n, listdata) {
        var size = 60;
        for (var i = 0; i < arr.length; i++) {
          listdata.push({
            id: m++,
            category: n,
            name: arr[i],
            symbolSize: size,
            symbol:
              "image://data:image/png;base64,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",
          });
        }
      }
      function setLinkData(sourceList, m, links) {
        let colors = ["red", "blue", "green"];
        for (var i = 0; i < sourceList.length; i++) {
          const color = colors[i % 3];
          links.push({
            source: sourceList[i],
            target: m,
            lineStyle: {
              color: color,
            },
          });
        }
      }
      var listdata = [];
      var linksdata = [];
      var nodeData = myGraphData;
      var m = 0;
      var source = [];
      for (var i = 1; i < nodeData.length; i++) {
        var node = nodeData[i].parentNode;
        var tx = [node];
        setNodeData(tx, m, 1, listdata);
        source.push(m);
        var Data = nodeData[i].childNodes;
        setNodeData(Data, m + 1, 2, listdata);
        var sourceList = [];
        for (var n = m + 1; n < m + Data.length + 1; n++) {
          sourceList.push(n);
        }
        setLinkData(sourceList, m, linksdata);
        m = m + Data.length + 1;
      }
      var tx7 = [];
      tx7.push(nodeData[0].parentNode);
      setNodeData(tx7, m, 0, listdata);
      setLinkData(source, m, linksdata);
      var option = {
        title: {
          text: "张三的朋友和他朋友的朋友",
          top: "top",
          left: "left",
          textStyle: {
            color: "#292421",
          },
        },
        tooltip: {},
        animationDuration: 0,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "张三关系图",
            type: "graph",
            layout: "force",
            force: {
              repulsion: 2000,
              gravity: 0.1,
              edgeLength: 1,
              layoutAnimation: true,
            },
            data: listdata,
            links: linksdata,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              offset: [0, -10],
              formatter: (val) => {
                if (val.name === "小明") {
                  return `{pered|${val.name}}`;
                } else {
                  return `{per|${val.name}}`;
                }
              },
              fontSize: 12,
              fontStyle: "600",
              borderRadius: "10",
              rich: {
                per: {
                  color: "#fff",
                  backgroundColor: "#ccc",
                  padding: [2, 10],
                  borderRadius: 10,
                  lineHeight: 33,
                },
                pered: {
                  color: "#fff",
                  backgroundColor: "red",
                  padding: [2, 10],
                  borderRadius: 10,
                  lineHeight: 33,
                },
              },
            },
            lineStyle: {
              width: 1.5,
              curveness: 0,
            },
          },
        ],
      };
      this.chart = echarts.init(document.getElementById("chartsId"));
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
