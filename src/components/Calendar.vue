<template>
  <div>
    <div class="calendar">
      <vc-calendar :attributes="attributes" :min-date='new Date()' is-expanded :disabled-dates='disableArray'
        @dayclick="onDayClick" @transition-start="move"/>
    </div>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    getDocById,scheduling
  } from '@/service/api/index'
  export default {
    props:{'dID':Number,'schedule1':Array},
    data() {
      return {
        days: [],
        schedule: [],
        disableArray: []
      };
    },
    computed: {
      dates() {
        return this.days.map(day => day.date);
      },
      attributes() {
        return this.dates.map(date => ({
          highlight: true,
          dates: date,
        }));
      },
    },
    created(){
      this.find()
    },
    mounted() {
      this.resetStyle()
    },
    methods: {
      move(){
        this.resetStyle()
      },
      onDayClick(day) {
        const idx = this.days.findIndex(d => d.id === day.id);
        if (idx >= 0) {
          this.days.splice(idx, 1);
          this.schedule.splice(idx, 1);
        } else {
          this.days.push({
            id: day.id,
            date: day.date,
          });
          this.schedule.push({
            am1: 10,
            am2: 10,
            date: parseInt(day.date.getTime()),
            isVisit: true,
            pm1: 10,
            pm2: 10
          })
        }
        console.log(this.schedule);
        // console.log(this.days);
        this.resetStyle()
      },
      resetStyle() {
        setTimeout(() => {
          let div = document.querySelectorAll('.is-disabled');
          for (let i = 0; i < div.length; i++) {
            let div1 = div[i].previousElementSibling
            if (div1) {
              let div2 = div1.querySelector('.vc-highlight');
              div2.style.backgroundColor = '#bee3f8'
            }
          }
        }, 0);
      },
      async find() {
        // let res = await getDocById(this.dID);
        let res;
        if (!this.schedule1) {
          res = await getDocById(this.dID);
          this.schedule = res.doc[0].dScheduling;
        }else{
          this.schedule = this.schedule1;
        }
        console.log(this.schedule);
        for (let i = 0; i < this.schedule.length; i++) {
          if (this.schedule[i].date < new Date(new Date().setHours(0, 0, 0, 0)).getTime()) {
            this.schedule.splice(i, 1);
            i--;
          }
        }
        console.log(this.schedule);
        for (let i = 0; i < this.schedule.length; i++) {
          let obj = {
            date: String(new Date(this.schedule[i].date)),
            id: '2022-03-16'
          };
          let obj1 = new Date(this.schedule[i].date)
          this.$set(this.days, i, obj);
          this.$set(this.disableArray, i, obj1)
        }
        console.log(this.days);
        this.resetStyle();
      },
      async submit(){
        console.log(this.schedule);
        let res = await scheduling(this.dID,this.schedule);
        this.schedule.forEach((item,index) => {
            this.$set(this.disableArray, index, new Date(item.date))
        });
        this.resetStyle()
        console.log(res);
      }
    },
  };
</script>
<style>
  .calendar {
    width: 1000px;
  }

  .is-disabled {
    pointer-events: none;
  }
</style>