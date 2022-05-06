<template>
  <div class="addDoc">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="医生姓名">
        <el-input v-model="form.dName"></el-input>
      </el-form-item>
      <el-form-item label="医生编号">
        <el-input v-model="form.dID"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.dGender"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号码">
        <el-input v-model="form.dTel"></el-input>
      </el-form-item> -->
      <el-form-item label="所属科室">
        <el-cascader v-model="value" placeholder="请选择科室" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="form.docTitle" placeholder="请选择医生职称">
          <el-option label="主任医师" value="主任医师"></el-option>
          <el-option label="副主任医师" value="副主任医师"></el-option>
          <el-option label="主治医师" value="主治医师"></el-option>
          <el-option label="副主治医师" value="副主治医师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生简介">
        <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="form.introduction">
        </el-input>
      </el-form-item>
      <el-form-item  label="上传头像">
        <van-uploader  :after-read="afterRead" />
        <img :src="imgUrl" style="width:80px;height:80px" alt="">
        <el-button type="primary" style="position:absolute;top:20px;right:10px" @click="onSubmit">立即添加</el-button>
      </el-form-item>

    </el-form>
    <div class="img">
      <img src="@/img/doctor1.png" alt="">
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
  import {
    getDepartments,
    addDoctor,
  } from '@/service/api/index'
  export default {
    data() {
      return {
        form: {
          dName: '',
          docTitle: '',
          dID: '',
          dGender: '',
          dPmtid: '',
          dTel: '',
          introduction:'',

        },
        dDepartmentList: [],
        value: [],
        options: [],
        imgUrl:'/img/pic1.ed125c38.png',
        fileList:[],
      }
    },
    created() {
      this.get_departments()
    },
    methods: {
      async onSubmit() {
        if (this.form.dName=='') {
          Message({
          showClose: true,
          message: '医生姓名不能为空!',
          type: 'warning'
        });
        return;
        }
        if (this.form.docTitle=='') {
          Message({
          showClose: true,
          message: '医生职称不能为空!',
          type: 'warning'
        });
        return;
        }
        if (this.form.dID=='') {
          Message({
          showClose: true,
          message: '医生id不能为空!',
          type: 'warning'
        });
        return;
        }
        console.log(this.value);
        if (this.value.length==0) {
          Message({
          showClose: true,
          message: '请选择医生所属科室!',
          type: 'warning'
        });
        return;
        }
        let res = await addDoctor(this.form.dName, this.form.docTitle, this.form.dID,
          this.form.dGender, this.value[1].s_name, this.value[1].s_id, this.form.dTel,this.form.introduction,this.imgUrl);
        if (res.status===200) {
          Message({
          showClose: true,
          message: '添加医生成功！',
          type: 'success'
        });
        }else if (res.status===400) {
          Message({
          showClose: true,
          message: '添加失败，该医生id已经存在！',
          type: 'warning'
        });
        }
        console.log(res);
      },
      async get_departments() {
        let res = await getDepartments();
        this.dDepartmentList = res.data;
        this.dDepartmentList.forEach(item => {
          let obj = {};
          obj.value = item.department;
          obj.label = item.department;
          obj.children = [];
          item.specialty.forEach(item => {
            obj.children.push({
              value: {
                s_id: item.specialty_id,
                s_name: item.specialty_name
              },
              label: item.specialty_name
            })
          });
          this.options.push(obj)
        });
        console.log(this.dDepartmentList);
      },
      handleChange(value) {
        console.log(value[1]);
      },
      async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.imgUrl = file.content;
      this.fileList = [{
        url:file.content,
        isImage: true
      }];
    },
    }
  }
</script>

<style scoped>
  .addDoc{
    position: relative;
    text-align: start;
  }
  .el-input{
    width: 350px;
  }
  .el-cascader ,.el-select{
    width: 350px ;
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
  ::v-deep .el-form-item__content{
    width: 350px;
  }
</style>