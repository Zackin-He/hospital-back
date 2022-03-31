<template>
  <div class="addDepartment">
    <el-form ref="form" label-width="80px">
      <el-form-item label="门诊名称">
        <el-input v-model="departmentName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addDepartment">立即添加</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" label-width="80px">
      <el-form-item label="科室名称">
        <el-input v-model="specialtyName"></el-input>
      </el-form-item>
      <el-form-item label="科室ID">
        <el-input v-model="specialtyID"></el-input>
      </el-form-item>
      <el-form-item label="所属门诊">
        <el-select v-model="department" placeholder="请选择门诊部门">
          <el-option v-for="(item,index) in options" :key="index" :label="item.department" :value="item.department"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室简介">
        <el-input type="textarea" :rows="2" placeholder="请输入科室简介" v-model="introduction">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSpecialty">立即添加</el-button>
      </el-form-item>
    </el-form>
    <div class="img">
      <img src="@/img/doctor1.png" alt="">
    </div>
  </div>
</template>

<script>
  import {
    Message
  } from "element-ui";
  import {
    addDepartment,getDepartments,addSpecialty
  } from '@/service/api/index'
  export default {
    data() {
      return {
        departmentName: '',
        specialtyName: '',
        department: '',
        specialtyID: '',
        options:[],
        introduction:''
      }
    },
    async created(){
      let res = await getDepartments();
      this.options = res.data;
    },
    methods: {
      async addDepartment() {
        if (this.departmentName === '') {
          Message({
            showClose: true,
            message: '门诊名称不能为空！',
            type: 'warning'
          });
          return
        }
        let res = await addDepartment(this.departmentName);
        if (res.status === 200) {
          Message({
            showClose: true,
            message: '添加门诊成功！',
            type: 'success'
          });
          this.departmentName = ''
          let res = await getDepartments();
          this.options = res.data;
        } else {
          Message({
            showClose: true,
            message: '添加失败，该门诊已经存在!',
            type: 'error'
          });
        }
      },
      async addSpecialty() {
        if (this.specialtyName==='') {
          Message({
            showClose: true,
            message: '科室名称不能为空！',
            type: 'warning'
          });
          return
        };
        if (this.specialtyID==='') {
          Message({
            showClose: true,
            message: '科室id不能为空！',
            type: 'warning'
          });
          return
        };
        if (this.department==='') {
          Message({
            showClose: true,
            message: '请选择门诊部门！',
            type: 'warning'
          });
          return
        }
        //departmentName,specialtyName,specialtyID,introduction
        let res = await addSpecialty(this.department,this.specialtyName,this.specialtyID,this.introduction)
        if (res.status===200) {
          Message({
            showClose: true,
            message: '添加科室成功！',
            type: 'success'
          });
          this.$router.push('/departments')
        }else{
          Message({
            showClose: true,
            message: '添加失败，该科室ID已经存在!',
            type: 'error'
          });
        }
      }
    }
  }
</script>

<style scoped>
  .addDepartment {
    position: relative;
    text-align: start;
  }

  .el-input {
    width: 350px;
  }

  .el-select {
    width: 350px;
  }
  .el-textarea{
    width: 350px;
  }
  .img{
    position: absolute;
    width: 450px;
    top: 0;
    left: 500px;
  }
  .img img{
    width: 100%;
  }
</style>