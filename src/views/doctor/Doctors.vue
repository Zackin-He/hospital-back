<template>
    <div class="doctors">
        <el-table :data="tableData" height="500px" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="dName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="dGender" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="dID" label="工号" width="100">
            </el-table-column>
            <el-table-column prop="dDepartment" label="所属科室" width="150">
            </el-table-column>
            <el-table-column prop="docTitle" label="职称" width="120">
            </el-table-column>
            <el-table-column prop="dIntroduction" label="简介">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="handleSchedule(scope.$index, scope.row)">排班
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="800px" title="修改医生信息" :visible.sync="dialogFormVisible">
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
                                <el-cascader v-model="value" placeholder="请选择科室" :options="options"
                                    :props="{ expandTrigger: 'hover' }" @change="handleChange">
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
                        </div>
                    </el-col>
                </el-row>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="change_doctor">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="1050px" title="医生排班" :visible.sync="scheduleShow">
            <Calendar :dID="docID" :schedule1="schedule" :key="docID" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="scheduleShow = false">取 消</el-button>
                <el-button type="primary" @click="scheduleShow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import Calendar from '@/components/Calendar.vue'
    import {
        getDoctors,
        getDepartments,
        changeDoctor
    } from '@/service/api/index'
    export default {
        components: {
            Calendar
        },
        data() {
            return {
                tableData: [],
                doctor: null,
                dialogFormVisible: false,
                scheduleShow: false,
                form: {
                    name: '',
                    gender: '',
                    introduction: '',
                    docTitle: ''
                },
                value: [],
                formLabelWidth: '120px',
                docID: null,
                schedule: null,
                options:[],
                dID:null,
                dDepartmentList:[]
            }
        },
        created(){
            this.get_departments()
        },
        mounted() {
            this.get_doctors();
        },
        methods: {
            async get_doctors() {
                let res = await getDoctors();
                if (res.status === 200) {
                    this.tableData = res.doc
                }
                console.log(res.doc);
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
                this.dDepartmentList.forEach((item)=>{
                    item.specialty.forEach((item2)=>{
                        if (item2.specialty_id === this.value[1]) {
                            s_name = item2.specialty_name;
                            return
                        }
                    })
                })
                console.log(222);
                // dID,dName,dGender,s_id,s_name,introduction,docTitle
                let res = await changeDoctor(this.doctor.dID,this.form.name,this.form.gender,this.value[1], s_name,this.form.introduction,this.form.docTitle);
                console.log(res);
                if (res.status == 200) {
                    this.tableData = [];
                    this.get_doctors();
                    Message({
                        message: '修改医生信息成功!',
                        type: 'success'
                    });
                }
                this.dialogFormVisible = false
            },
            handleEdit(index, row) {
                this.form.name = row.dName;
                this.form.gender = row.dGender;
                this.form.introduction = row.dIntroduction;
                this.form.docTitle = row.docTitle;
                this.doctor = row;
                this.dDepartmentList.forEach(item => {
                    item.specialty.forEach(item2 =>{
                        if (item2.specialty_id==this.doctor.dPmtid) {
                            this.value = [item.department,item2.specialty_id];       
                        }
                    })
                });
                console.log(this.value);
                this.dialogFormVisible = true
                console.log(this.doctor);
                console.log(index, row.dID);
            },
            handleDelete(index, row) {
                console.log(index, row.dID);
            },
            handleSchedule(index, row) {
                this.docID = row.dID;
                this.schedule = row.dScheduling
                this.scheduleShow = true
                console.log(index, row);
            },
            handleChange(value) {
                console.log(value);
            }

        }
    }
</script>

<style scoped>
    .doctors {
        position: relative;
        text-align: start;
    }

    .el-input {
        width: 230px;
    }

    .el-cascader,
    .el-select {
        width: 230px;
    }

    .el-textarea {
        width: 230px;
    }

    .el-form-item__label {
        width: 120px !important;
    }
</style>