<template>
  <div>
    <el-button @click="toggle">切换</el-button>
    <div v-if="isShow" style="width: auto; height: 400px" id="main"></div>
    <div v-if="!isShow" style="width: auto; height: 400px" id="main1"></div>
  </div>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      isShow: true,
      dateArray: [],
    };
  },
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit();
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById("main")).setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 300],
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      },true);
    },
    //初始化echarts
    echartsInit1() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById("main1")).setOption({
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
              { value: 40, name: "rose 9" },
              { value: 38, name: "rose 10" },
              { value: 32, name: "rose 11" },
              { value: 30, name: "rose 12" },
              { value: 28, name: "rose 13" },
              { value: 26, name: "rose 14" },
              { value: 22, name: "rose 15" },
              { value: 18, name: "rose 16" },
            ],
          },
        ],
      },true);
    },
    toggle() {
      this.isShow = !this.isShow;
      if (this.isShow == true) {
        this.$nextTick(() => {
          this.echartsInit();
        });
      } else {
        this.$nextTick(() => {
          this.echartsInit1();
        });
      }

      console.log(this.isShow);
    },
  },
};
</script>

<style>
</style>