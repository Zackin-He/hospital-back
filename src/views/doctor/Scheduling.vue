<template>
  <div>
      <Calendar :dID="docID" :schedule1="schedule" :key="docID" />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import {getDocById} from '@/service/api/index'
import {mapState,mapMutations} from 'vuex'
export default {
    components:{Calendar},
    data(){
        return{
            docID: null,
            schedule: null,
        }
    },
    computed:{
        ...mapState(['userInfo']),
    },
    async created(){
        this.docID = this.userInfo.dID
        // let res = await getDocById(this.userInfo.dID)
        // console.log(res.doc[0]);
        // this.schedule = res.doc[0].dScheduling
        // console.log(this.schedule);
    },
    methods:{
        ...mapMutations(['user_info']),
    }
}
</script>

<style>

</style>