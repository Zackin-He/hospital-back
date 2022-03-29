<template>
  <div class="order">
    <el-form style="margin-bottom:25px" :model="findForm" label-width="80px">
      <span>预约单号：</span>
      <el-input v-model="findForm.regNumber" placeholder="请输入预约单号" class="findDoc"></el-input>
      <span>患者姓名</span>
      <el-input v-model="findForm.pName" placeholder="请输入患者姓名" class="findDoc"></el-input>
      <span v-if="user_type=='admin'">      
        <span>医生姓名</span>
        <el-input v-model="findForm.pDocName" placeholder="请输入医生姓名" class="findDoc"></el-input>
        <span>所属科室：</span>
        <el-cascader v-model="findValue" clearable placeholder="请选择科室" :options="options"
          :props="{ expandTrigger: 'hover' }" @change="handleChange">
        </el-cascader>
      </span>
      <el-button style="margin-left:15px;float:right" @click="find_orders" type="primary">查询</el-button>
    </el-form>
    <el-table :data="tableData" style="width: 100%" height="75vh">
      <el-table-column prop="regNumber" label="预约单号" width="150">
      </el-table-column>
      <el-table-column prop="pName" label="患者姓名" width="140">
      </el-table-column>
      <el-table-column prop="pID" label="身份证号">
      </el-table-column>
      <el-table-column prop="pTel" label="手机号" width="140">
      </el-table-column>
      <el-table-column prop="pDocName" label="医生姓名" width="140">
      </el-table-column>
      <el-table-column prop="dpmt" label="科室" width="140">
      </el-table-column>
      <el-table-column prop="treatTime" label="就诊时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
  import {
    getOrders,
    getOrdersByCondition,
    getDepartments,
    getOrdersByDocID,
    getOrdersByConditionAndID
  } from '@/service/api/index'
  export default {
    data() {
      return {
        tableData: [],
        findForm: {
          regNumber: '',
          pName: '',
          pDocName: ''
        },
        options: [],
        findValue: [],
        user_type: null
      }
    },
    computed: {
            ...mapState(['userInfo']),
        },
    created() {
      this.user_type = localStorage.getItem('user_type');
      console.log(this.user_type);
      this.get_departments()
      this.get_orders()
    },
    methods: {
      async get_orders() {
        let res;
        if (this.user_type === 'admin') {
          res = await getOrders();
        }else{
          res = await getOrdersByDocID(this.userInfo.doc.dID)
        }
        res.data.forEach(item => {
          let time = new Date(item.treatDate);
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          let h
          if (item.treatTime == 'am1') {
            h = '09:00~10:00'
          } else if (item.treatTime == 'am2') {
            h = '10:00~11:00'
          } else if (item.treatTime == 'pm1') {
            h = '14:00~15:00'
          } else if (item.treatTime == 'pm2') {
            h = '15:00~16:00'
          }
          let newTime = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + h
          this.tableData.unshift({
            regNumber: item.regNumber,
            pName: item.pName,
            pID: item.pID,
            pTel: item.pTel,
            pDocName: item.pDocName,
            dpmt: item.dpmt,
            treatTime: newTime
          })
        });
        console.log(res);
      },
      add0(m) {
        return m < 10 ? '0' + m : m
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
      async find_orders() {
        //regNumber,pName,pDocName,dpmt
        let res;
        if (this.user_type === 'admin') {
          if (this.findValue.length > 0) {
            res = await getOrdersByCondition(this.findForm.regNumber, this.findForm.pName, this.findForm.pDocName, this
            .findValue[1]);
            } else {
            res = await getOrdersByCondition(this.findForm.regNumber, this.findForm.pName, this.findForm.pDocName, '');
          }
        }else{
          res = await getOrdersByConditionAndID(this.findForm.regNumber,this.findForm.pName,this.userInfo.doc.dID)
        }
        
        if (res.status === 200) {
          this.tableData = [];
          res.data.forEach(item => {
            let time = new Date(item.treatDate);
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            let h
            if (item.treatTime == 'am1') {
              h = '09:00~10:00'
            } else if (item.treatTime == 'am2') {
              h = '10:00~11:00'
            } else if (item.treatTime == 'pm1') {
              h = '14:00~15:00'
            } else if (item.treatTime == 'pm2') {
              h = '15:00~16:00'
            }
            let newTime = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + h
            this.tableData.unshift({
              regNumber: item.regNumber,
              pName: item.pName,
              pID: item.pID,
              pTel: item.pTel,
              pDocName: item.pDocName,
              dpmt: item.dpmt,
              treatTime: newTime
            })
          });
        }
        console.log(res);
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style>
  .order {
    text-align: start;
  }

  .findDoc {
    width: 130px;
    margin-right: 10px;
  }
</style>