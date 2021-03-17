<template>
  <div>
    <br />
    <div :class="className" ref="chart" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/common/tools";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  created(){
    if(!this.$store.state.accessMenu.routerMenu.length) {
      this.$store.dispatch("accessMenu/getAccessMenu");
      this.$store.dispatch("siteSetting/getSetData");
    }
  },
  mounted() {

    // this.$nextTick(()=>{
    this.initChart();
    // })

    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm &&
      sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    autoResize: {
      handler(val) {}
    }
  },
  methods: {
    setOptions(data = []) {
      var options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        // dataZoom: [
        //   {
        //     type: "inside"
        //   }
        // ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                type: "dashed"
              },
              data: [[{ type: "min" }, { type: "max" }]]
            }
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      };

      if (this.chart) {
        this.chart.setOption(options, true);
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, "macarons");
      this.setOptions();
    }
  }
};
</script>
<style lang='scss' scoped>
* {
  touch-action: none;
}
</style>
