<template>
    <div class="departments">
        <el-form style="margin-bottom:25px" :model="findForm" label-width="80px">
            <span>科室ID：</span>
            <el-input v-model="findForm.id" placeholder="请输入科室ID" class="findDoc"></el-input>
            <span>科室名：</span>
            <el-input v-model="findForm.name" placeholder="请输入科室名" class="findDoc"></el-input>
            <span>所属门诊：</span>
            <el-select v-model="findForm.department" clearable class="findDoc" placeholder="请选择门诊部门">
                <el-option v-for="(item,index) in options" :key="index" :label="item.department" :value="item.department"></el-option>
            </el-select>
            <el-button style="margin-left:30px;float:right" @click="find_specialty" type="primary">查询科室</el-button>
        </el-form>
        <el-table :data="tableData" height="75vh" border style="width: 100%">
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
                    <el-button size="mini" :disabled="scope.row.s_id==='0000'"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.s_id==='0000'" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>

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
        Message,
        MessageBox
    } from "element-ui";
    import {
        getDepartments,
        changeSpecailty,
        deleteSpecialty
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
                findForm: {
                    id: '',
                    name: '',
                    department: '',

                },
                formLabelWidth: '120px',
                departments: [],
                oldDepartment: '',
                options:[],
            }
        },
        mounted() {
            this.get_departments()
        },
        methods: {
            async get_departments() {
                let res = await getDepartments();
                this.options = res.data;
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
                MessageBox.confirm('是否确认删除科室', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteSpecialty(row.s_id, row.s_d);
                    this.tableData = [];
                    this.get_departments();
                    console.log(res);
                    Message({
                        type: 'success',
                        message: '删除科室成功!'
                    });
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
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
            },
            find_specialty() {
                this.tableData = []
                let keyword1 = this.findForm.department;
                let keyword2 = this.findForm.id;
                let keyword3 = this.findForm.name;
                let reg1 = new RegExp(keyword1);
                let reg2 = new RegExp(keyword2);
                let reg3 = new RegExp(keyword3);
                this.departments.forEach(item => {
                    if (item.department.match(reg1)) {
                        item.specialty.forEach(item2 => {
                            if (item2.specialty_name.match(reg3) && item2.specialty_id.match(reg2)) {
                                this.tableData.push({
                                    s_name: item2.specialty_name,
                                    s_id: item2.specialty_id,
                                    s_d: item.department,
                                    s_intro: item2.introduction
                                })
                            }
                        })
                    }

                });
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

    .el-input,
    .el-select {
        width: 350px;
    }

    .el-textarea {
        width: 350px;
    }

    .findDoc {
        width: 180px;
        margin-right: 30px;
    }
</style>