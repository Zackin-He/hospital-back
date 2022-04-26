<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="nav_left">
          <div class="logo"><img src="@/img/logo.png" alt=""></div>
        </div>
        <div class="nav_right">医院预约挂号管理系统</div>
        <div class="nav_info">
          <el-dropdown @command="handleCommand">
            <div class="nav_info_icon">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
            <div class="nav_info_name"><span>{{userInfo.username}}</span></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit" command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>



        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            @select="selectMenu" background-color="rgba(255, 255, 255, 0)" style="border:none" text-color="#303133" active-text-color="#409eff">
            <el-menu-item index="1">
              <i class="el-icon-s-home" style="color:#0ff"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <div class="admin" v-if="user_type=='admin'">
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid" style="color:#d2691e"></i>
                  <span>医生管理</span>
                </template>
                <el-menu-item index="2-1">医生管理</el-menu-item>
                <el-menu-item index="2-2">医生添加</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu" style="color:#0ff"></i>
                  <span>科室管理</span>
                </template>
                <el-menu-item index="3-1">科室管理</el-menu-item>
                <el-menu-item index="3-2">科室添加</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-promotion" style="color:#9400d3"></i>
                  <span>预约挂号管理</span>
                </template>
                <el-menu-item index="4-1">查询挂号单</el-menu-item>
                <el-menu-item index="4-2">挂号统计</el-menu-item>
              </el-submenu>
            </div>
            <div v-else-if="user_type=='doctor'">
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid" style="color:#d2691e"></i>
                  <span>医生管理</span>
                </template>
                <el-menu-item index="2-1">医生查询</el-menu-item>
                <el-menu-item index="2-3">个人排班</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-promotion" style="color:#9400d3"></i>
                  <span>预约挂号管理</span>
                </template>
                <el-menu-item index="4-1">查询挂号单</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" width="500px" :visible.sync="isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="change_pwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Message,
    MessageBox
  } from 'element-ui'
  import {
    menuList
  } from '@/dictionary/menu'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    getUserInfo,
    logout,
    changeDocPwd
  } from '@/service/api/index'
  export default {
    data() {
      return {
        user_type: '',
        isShow: false,
        form: {
          oldPwd:'',
          newPwd:''
        }
      }
    },
    components: {},
    computed: {
      ...mapState(['userInfo']),
    },
    created() {
      this.user_type = localStorage.getItem('user_type')
    },
    mounted() {
      this.get_user_info()
    },
    methods: {
      ...mapMutations(['user_info']),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCommand(command) {
        if (command == 'logout') {
          this.login_out()
        } else if (command == 'changePwd') {
          let type = localStorage.getItem('user_type')
          if (type=='doctor') {
            this.isShow = true
          }else{
            Message({
            type: 'warning',
            message: '此功能暂未开放!'
          });
          }
          
        }
      },
      selectMenu(index, indexPath) {
        menuList.forEach(item => {
          if (item.key === index && this.$route.path !== item.url) {
            console.log(item);
            this.$router.push(item.url);
          }
        });
      },
      async get_user_info() {
        let res = await getUserInfo();
        if (res.status === 200) {
          console.log(res);
          // this.user_type = res.data.type;
          this.user_info(res.data);
          console.log(res.data);
        }
      },
      async change_pwd(){
        let token = localStorage.getItem('token')
        let res = await changeDocPwd(token,this.form.oldPwd,this.form.newPwd);
        if (res.status===200) {
          Message({
            type: 'success',
            message: '修改密码成功!'
          });
          this.isShow = false
        }else{
          Message({
            type: 'error',
            message: '旧密码不正确!'
          });
        }
      },
      login_out() {
        MessageBox.confirm('是否确认退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await logout();
          localStorage.setItem('token', '');
          localStorage.setItem('user_type', '')
          this.$router.push('/login')
          console.log(res);
          Message({
            type: 'success',
            message: '退出登录成功!'
          });
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消操作'
          });
        });

      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .logo {
    margin: 0 auto;
    width: 60px;
    height: 60px;
  }

  .logo img {
    width: 100%;
  }

  .home {
    position: relative;
  }

  .home>.el-container {
    background: -webkit-linear-gradient(180deg,rgba(255,0,145,.08),rgba(170,0,255,.07));
    position: absolute;
    height: 100vh;
    width: 100%;
  }

  .nav_left,
  .nav_right {
    float: left;
  }

  .nav_info {
    float: right;
    width: 150px;
    height: 100%;
    line-height: 60px;
  }

  .el-dropdown {
    height: 60px;
  }

  .nav_info_icon {
    float: left;
    width: 60px;
    height: 50px;
    padding-top: 10px;
    text-align: center;
  }

  .nav_info_name {
    float: left;
    /* width: 60px; */
    height: 100%;
    line-height: 60px;
  }

  .nav_left {
    width: 200px;
    height: 100%;
    background-color: pink;
  }

  .nav_right {
    padding-left: 20px;
    line-height: 60px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 3px
  }

  .el-header {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    padding: 0 !important;
    background: -webkit-linear-gradient(40deg,rgba(255,0,102,.18),rgba(255,0,8,.2));
    color: #333;
    /* text-align: center; */
    height: 60px;
  }

  .el-aside {
    box-sizing: border-box;
    border: 1px solid #add8e6;
    background-color: rgba(255, 255, 255);
    opacity: 0.7;
    color: #333;
    text-align: center;
    height: 100%;
  }

  ::v-deep .el-menu {
    height: 100%;
    background-color: #fff !important;
  }

  .el-submenu__title {
    text-align: start;
  }

  ::v-deep .el-menu-item {
     background-color: rgba(255, 255, 255, 0);
    
  }
  .el-menu-item{
    text-align: start;
  }

  .el-submenu .el-menu-item {
    text-align: start;
    padding-left: 60px !important;
  }

  .el-main {
    /* background: -webkit-linear-gradient(180deg,rgba(255,0,145,.08),rgba(170,0,255,.07)); */
    color: #333;
    text-align: center;
    height: 100%
  }

  /* .el-avatar{
    margin-top: 10px;
  } */
</style>