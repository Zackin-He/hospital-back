<template>
    <div class="departments">
        <el-table :data="tableData" height="500px" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="s_name" label="科室名" width="160">
            </el-table-column>
            <el-table-column prop="s_id" label="科室编号" width="120">
            </el-table-column>
            <el-table-column prop="s_d" label="门诊部门" width="150">
            </el-table-column>
            <el-table-column prop="s_intro" label="科室描述">
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑科室" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="科室名称" :label-width="formLabelWidth">
                    <el-input v-model="form.specialty_name" placeholder="请输入科室名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="门诊部门" :label-width="formLabelWidth">
                    <el-select v-model="form.specialty_d" placeholder="请选择门诊部门">
                        <el-option v-for="(item,index) in departments" :key="index" :label=item.department
                            :value=item.department></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医生简介" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" placeholder="请输入简介" v-model="form.specialty_intro">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeSpecialty">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        Message
    } from "element-ui";
    import {
        getDepartments,
        changeSpecailty
    } from '@/service/api/index'
    export default {
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    specialty_id: '',
                    specialty_name: '',
                    specialty_d: '',
                    specialty_intro: ''
                },
                formLabelWidth: '120px',
                departments: [],
                oldDepartment: ''
            }
        },
        mounted() {
            this.get_departments()
        },
        methods: {
            async get_departments() {
                let res = await getDepartments();
                console.log(res);
                this.departments = res.data
                res.data.forEach(item => {
                    item.specialty.forEach(item2 => {
                        this.tableData.push({
                            s_name: item2.specialty_name,
                            s_id: item2.specialty_id,
                            s_d: item.department,
                            s_intro: item2.introduction
                        })
                    })
                });
                console.log(this.tableData);
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.oldDepartment = row.s_d;
                this.form.specialty_id = row.s_id
                this.form.specialty_name = row.s_name
                this.form.specialty_d = row.s_d
                this.form.specialty_intro = row.s_intro
                // this.form = row
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            async changeSpecialty() {
                // s_id,oldDepartment,newDepartment,s_name,introduction
                let res = await changeSpecailty(this.form.specialty_id, this.oldDepartment, this.form.specialty_d,
                    this.form.specialty_name, this.form.specialty_intro);
                console.log(res);
                if (res.status == 200) {
                    this.tableData = [];
                    this.get_departments();
                    Message({
                        message: '修改科室信息成功!',
                        type: 'success'
                    });
                }
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>
    .departments {
        text-align: start;
    }
    .el-dialog__header {
        text-align: center;
    }
    .el-input,.el-select{
    width: 350px;
  }
  .el-textarea{
    width: 350px;
  }
</style>