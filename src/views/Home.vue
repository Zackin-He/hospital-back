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
              <el-avatar v-if="user_type=='admin'" icon="el-icon-user-solid"></el-avatar>
              <img v-if="user_type=='doctor'" :src="form.imgUrl" style="width:45px;height:45px;border-radius:50%"
                alt="">
            </div>
            <div class="nav_info_name"><span>{{userInfo.username}}</span></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="user_type=='doctor'" icon="el-icon-lock" command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item v-if="user_type=='doctor'" icon="el-icon-edit" command="changeDoc">修改信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>



        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            @select="selectMenu" background-color="rgba(255, 255, 255, 0)" style="border:none" text-color="#303133"
            active-text-color="#409eff">
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
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="form1.oldPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form1.newPwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="change_pwd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="800px" title="修改医生信息" :visible.sync="changeShow">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="医生姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="form.gender" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="医生简介" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="form.introduction">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="所属科室" :label-width="formLabelWidth">
                <el-cascader v-model="value" placeholder="请选择科室" :options="options" :props="{ expandTrigger: 'hover' }">
                </el-cascader>
              </el-form-item>
              <el-form-item label="医生职称" :label-width="formLabelWidth">
                <el-select v-model="form.docTitle" placeholder="请选择医生职称">
                  <el-option label="主任医师" value="主任医师"></el-option>
                  <el-option label="副主任医师" value="副主任医师"></el-option>
                  <el-option label="主治医师" value="主治医师"></el-option>
                  <el-option label="副主治医师" value="副主治医师"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医生头像" :label-width="formLabelWidth">
                  <van-uploader :after-read="afterRead" />
                  <img :src="form.imgUrl" style="width:80px;height:80px" alt="">
              </el-form-item>
            </div>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeShow = false">取 消</el-button>
        <el-button type="primary" @click="change_doctor">确 定</el-button>
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
    changeDocPwd,
    getDepartments,
    changeDoctor
  } from '@/service/api/index'
  export default {
    data() {
      return {
        user_type: '',
        isShow: false,
        changeShow: false,
        form1: {
          oldPwd: '',
          newPwd: ''
        },
        form: {
          name: '',
          gender: '',
          introduction: '',
          docTitle: '',
          imgUrl:''
        },
        formLabelWidth: '120px',
        options: [],
        value: [],
        doctor:null
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
      this.get_departments()
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
          if (type == 'doctor') {
            this.isShow = true
          } else {
            Message({
              type: 'warning',
              message: '此功能暂未开放!'
            });
          }

        } else if (command == 'changeDoc') {
                  this.changeShow = true
        }
      },
      getDoc(){
          console.log(this.userInfo);
          this.form.name = this.userInfo.doc.dName;
          this.form.gender = this.userInfo.doc.dGender;
          this.form.introduction = this.userInfo.doc.dIntroduction;
          this.form.docTitle = this.userInfo.doc.docTitle;
          if (this.userInfo.doc.dImage) {
                    this.form.fileList = [
                        {url:this.userInfo.doc.dImage,isImage:true}
                    ];
                    this.form.imgUrl = this.userInfo.doc.dImage
                }else{
                    this.form.fileList = [];
                    this.form.imgUrl = '/img/pic1.ed125c38.png'
          }
          this.dDepartmentList.forEach(item => {
                    item.specialty.forEach(item2 => {
                        if (item2.specialty_id == this.doctor.doc.dPmtid) {
                            this.value = [item.department, item2.specialty_id];
                        }
                    })
                });
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
          this.doctor = res.data
          console.log(this.doctor);
          // this.user_type = res.data.type;
          this.user_info(res.data);
          if (res.data.type=='doctor') {
            this.getDoc()
          }
          
          console.log(res.data);
        }
      },
      async change_pwd() {
        let token = localStorage.getItem('token')
        let res = await changeDocPwd(token, this.form1.oldPwd, this.form1.newPwd);
        if (res.status === 200) {
          Message({
            type: 'success',
            message: '修改密码成功!'
          });
          this.isShow = false
        } else {
          Message({
            type: 'error',
            message: '旧密码不正确!'
          });
        }
      },
      async get_departments() {
        let res = await getDepartments();
        this.dDepartmentList = res.data;
        console.log(this.dDepartmentList);
        this.dDepartmentList.forEach(item => {
          let obj = {};
          obj.value = item.department;
          obj.label = item.department;
          obj.children = [];
          item.specialty.forEach(item => {
            obj.children.push({
              value: item.specialty_id,
              label: item.specialty_name
            })
          });
          this.options.push(obj)
        });
        console.log(this.options);
      },
      async change_doctor() {
        let s_name;
        this.dDepartmentList.forEach((item) => {
          item.specialty.forEach((item2) => {
            if (item2.specialty_id === this.value[1]) {
              s_name = item2.specialty_name;
              return
            }
          })
        })
        let res = await changeDoctor(this.doctor.dID, this.form.name, this.form.gender, this.value[1],
          s_name, this.form.introduction, this.form.docTitle,this.form.imgUrl);
        console.log(res);
        if (res.status == 200) {
          this.tableData = [];
          this.get_user_info();
          Message({
            message: '修改医生信息成功!',
            type: 'success'
          });
        }
        this.changeShow = false
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

      },
      async afterRead(file) {
              // 此时可以自行将文件上传至服务器
                console.log(file);
                this.form.imgUrl = file.content;
                this.form.fileList = [{
                    url: file.content,
                    isImage: true
                }];
            },
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
    background: -webkit-linear-gradient(180deg, rgba(255, 0, 145, .08), rgba(170, 0, 255, .07));
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
    padding-top: 5px;
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
    background: -webkit-linear-gradient(40deg, rgba(255, 0, 102, .18), rgba(255, 0, 8, .2));
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

  .el-menu-item {
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
  .van-uploader{
        float: left;
    }
</style>