<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="nav_left">左边</div>
        <div class="nav_right">医院预约挂号管理系统</div>
        <div class="nav_info">
          <span>头像</span>
          <span>你好，管理员</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            @select="selectMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>医生管理</span>
              </template>
              <el-menu-item index="2-1">医生管理</el-menu-item>
              <el-menu-item index="2-2">医生添加</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>科室管理</span>
              </template>
              <el-menu-item index="3-1">科室管理</el-menu-item>
              <el-menu-item index="3-2">科室添加</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>预约挂号管理</span>
              </template>
              <el-menu-item index="4-1">查询挂号单</el-menu-item>
              <el-menu-item index="4-2">添加挂号单</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {menuList} from '@/dictionary/menu'
  export default {
    components: {},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      selectMenu(index, indexPath) {
        menuList.forEach(item => {
          if (item.key===index&&this.$route.path!==item.url) {
            console.log(item);
            this.$router.push(item.url)
          }
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

  .home {
    position: relative;
  }

  .home>.el-container {
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

  .nav_left {
    width: 200px;
    height: 100%;
    background-color: #367FA9;
  }

  .nav_right {
    padding-left: 20px;
    line-height: 60px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 3px
  }

  .el-header {
    padding: 0 !important;
    background-color: #4AB7BD;
    color: #333;
    text-align: center;
    height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-menu {
    height: 100%;
  }

  .el-submenu__title {
    text-align: start;
  }

  .el-menu-item {
    text-align: start;
  }

  .el-submenu .el-menu-item {
    text-align: start;
    padding-left: 60px !important;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%
  }
</style>