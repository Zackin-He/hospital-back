<template>
    <div id="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户登录</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="value" label="admin">管理员</el-radio>
                    <el-radio v-model="value" label="doctor">医生</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:300px" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {
        Message
    } from 'element-ui'
    import {
        loginTest
    } from '@/service/api/index'
    import {
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                options: [{
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'doctor',
                    label: '医生'
                }],
                value: 'admin'
            }
        },
        methods: {
            ...mapMutations(['user_info']),
            async login() {
                let res = await loginTest(this.form.username, this.form.password, this.value);
                if (res.status == 200) {
                    this.user_info(res.data);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem('user_type', res.data.type);
                    this.$router.push('/homePage')
                } else {
                    Message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    });
                }
                console.log(res);
            }
        }
    }
</script>

<style scoped>
    #login {
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        padding-top: 160px;
        background-color: red;
        background: url(@/img/login.jpeg) no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
    }

    .box-card {
        border: none;
        background-color: rgba(0, 0, 0, 0.3);
        margin: 0 auto;
        height: 300px;
        width: 480px;
    }

    ::v-deep .el-form-item__label {
        color: #fff !important;
    }

    .el-input {
        width: 300px;
    }

    .el-select {
        width: 300px;
    }

    ::v-deep .el-card__header {
        text-align: center;
        font-weight: bold;
        color: #fff;
    }

    .el-radio {
        color: #fff;
        /* margin-right: 60px; */
    }
</style>