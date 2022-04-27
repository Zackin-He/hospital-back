<template>
  <div id="orderStatistics">
    <div class="toggleBtn">
      <el-button @click="getData(1)">未来七天预约统计</el-button>
      <el-button @click="getData(2)">过去七天预约统计</el-button>
      <el-button @click="getDataBySpecialty">各科室预约统计</el-button>
    </div>
    <div v-if="lineIsShow" style="width: auto; height: 450px" id="main"></div>
    <div v-if="pieIsShow" style="width: auto; height: 450px" id="main1"></div>
  </div>
</template>

<script>
import {getOrdersByDates,getOrdersBySpecialty} from '@/service/api/index'
export default {
  name: "page",
  data() {
    return {
      lineIsShow: true,
      pieIsShow:false,
      dateArray: [],
      lineData:[],
      nextDays:[],
      pieData:[],
      linePic:null,
      piePic:null
    };
  },
  mounted() {
    // this.getDays(1)
    this.getData(1)
  },
  methods: {
    async getData(type){
      this.lineIsShow = false;
      this.pieIsShow = false
      this.$nextTick(async ()=>{
        this.lineIsShow = true;
        let res = await getOrdersByDates(type);
        this.lineData = res.result;
        this.getDays(type)
        this.$nextTick(()=>{
          this.echartsInit();
        })
      })
    },
    async getDataBySpecialty(){
      this.lineIsShow = false;
      this.pieIsShow = true
      let res = await getOrdersBySpecialty();
      console.log(res);
      this.pieData = res.result;
      this.$nextTick(()=>{
        this.echartsInit1();
      })
    },
    getDays(type){
      this.nextDays = []
      let todayTime = new Date().getTime();
      let dayTime = 1000*60*60*24;
      if (type==1) {
        for (let i = 0; i < 7; i++) {
        let date = new Date(todayTime+dayTime*i);
        let month = date.getMonth()+1;
        let day = date.getDate();
        if (month>=1&&month<=9) {
          month = '0' + month;
        }
        if (day>=1&&day<=9) {
          day = '0' + day;
        }
        this.nextDays.push(month+'-'+day)
      }
      }else{
        for (let i = 0; i < 7; i++) {
        let date = new Date(todayTime-dayTime*i);
        let month = date.getMonth()+1;
        let day = date.getDate();
        if (month>=1&&month<=9) {
          month = '0' + month;
        }
        if (day>=1&&day<=9) {
          day = '0' + day;
        }
        this.nextDays.unshift(month+'-'+day)
      }
      }
    },
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById("main")).setOption({
        xAxis: {
          type: "category",
          data: this.nextDays,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.lineData,
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
            dataView: { show: false, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ['30%','70%'],
            center: ['50%', '50%'],
            label: {
			        normal: {
				      show: true,
				      // position: 'inner', // 数值显示在内部
				      formatter: '{b}：{d}%', // 格式化数值百分比输出
			        },
		        },
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: this.pieData,
          },
        ],
      },true);
    },
    // toggle() {
    //   this.isShow = !this.isShow;
    //   if (this.isShow == true) {
    //     this.$nextTick(() => {
    //       this.getData(1);
    //     });
    //   } else {
    //     this.$nextTick(() => {
    //       this.getDataBySpecialty()
    //     });
    //   }

    //   console.log(this.isShow);
    // },
  },
};
</script>

<style>
#orderStatistics{
  position: relative;
}
.toggleBtn{
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}
</style>