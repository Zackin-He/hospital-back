<template>
  <div>
      <input type="text" v-model="username">
      <input type="text" v-model="password">
      <button @click="login">登录</button>
  </div>
</template>

<script>
import {
        loginTest
    } from '@/service/api/index'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        ...mapMutations(['user_info']),
        async login(){
                let res = await loginTest(this.username,this.password);
                if (res.status==200) {
                    this.user_info(res.data)
                    localStorage.setItem("token", res.data.token);
                    this.$router.push('/homePage')
                }else{
                    alert(res.message)
                }
                console.log(res);
            }
    }
}
</script>

<style scoped>

</style>