<template>
    <div>
        <input type="text" v-model="username">
        <input type="text" v-model="password">
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import {
        loginTest
    } from '@/service/api/index'
    import {
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: '',
                options: [{
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'doctor',
                    label: '医生'
                }],
                value: ''
            }
        },
        methods: {
            ...mapMutations(['user_info']),
            async login() {
                let res = await loginTest(this.username, this.password,this.value);
                if (res.status == 200) {
                    this.user_info(res.data);
                    localStorage.setItem("token", res.data.token);
                    this.$router.push('/homePage')
                } else {
                    alert(res.message)
                }
                console.log(res);
            }
        }
    }
</script>

<style scoped>

</style>