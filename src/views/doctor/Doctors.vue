<template>
    <div class="doctors">
        <el-form style="margin-bottom:25px" :model="findForm" label-width="80px">
            <span>医生姓名：</span>
            <el-input v-model="findForm.name" placeholder="请输入医生姓名" class="findDoc"></el-input>
            <span>医生职称：</span>
            <el-select v-model="findForm.docTitle" clearable class="findDoc" placeholder="请选择医生职称">
                <el-option label="主任医师" value="主任医师"></el-option>
                <el-option label="副主任医师" value="副主任医师"></el-option>
                <el-option label="主治医师" value="主治医师"></el-option>
                <el-option label="副主治医师" value="副主治医师"></el-option>
            </el-select>
            <span>所属科室：</span>
            <el-cascader v-model="findValue" clearable placeholder="请选择科室" :options="options"
                :props="{ expandTrigger: 'hover' }" @change="handleChange">
            </el-cascader>
            <el-button style="margin-left:30px;float:right" @click="find_doc" type="primary">查询医师</el-button>
        </el-form>
        <el-table :data="pageData" height="67vh" border style="width: 100%">
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
                    <el-button size="mini" :disabled="isdoctor" @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" :disabled="isdoctor" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" :disabled="isdoctor" type="primary"
                        @click="handleSchedule(scope.$index, scope.row)">排班
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :hide-on-single-page="tableData.length<=7"
            background
            @current-change="changePage"
            :page-size="7"
            layout="prev, pager, next"
            :total="tableData.length">
        </el-pagination>
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
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import {
        Message,
        MessageBox
    } from 'element-ui'
    import Calendar from '@/components/Calendar.vue'
    import {
        deleteDoctor,
        findDoc,
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
                pageData:[],
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
                findValue: [],
                formLabelWidth: '120px',
                docID: null,
                schedule: null,
                options: [],
                findOptions: [],
                dID: null,
                dDepartmentList: [],
                findForm: {
                    name: '',
                    docTitle: ''
                },
                isdoctor: false
            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
        created() {
            this.get_departments();
            console.log(this.userInfo.type);
            if (this.userInfo.type === 'doctor') {
                this.isdoctor = true
            }
        },
        mounted() {
            this.get_doctors();
        },
        methods: {
            async get_doctors() {
                let res = await getDoctors();
                if (res.status === 200) {
                    this.tableData = res.doc;
                    this.pageData = this.tableData.slice(0,7)
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
                this.dDepartmentList.forEach((item) => {
                    item.specialty.forEach((item2) => {
                        if (item2.specialty_id === this.value[1]) {
                            s_name = item2.specialty_name;
                            return
                        }
                    })
                })
                console.log(222);
                // dID,dName,dGender,s_id,s_name,introduction,docTitle
                let res = await changeDoctor(this.doctor.dID, this.form.name, this.form.gender, this.value[1],
                    s_name, this.form.introduction, this.form.docTitle);
                console.log(res);
                if (res.status == 200) {
                    this.tableData = [];
                    this.find_doc();
                    Message({
                        message: '修改医生信息成功!',
                        type: 'success'
                    });
                }
                this.dialogFormVisible = false
            },
            async find_doc() {
                //dName,dSpecialty,dTitle
                let res
                if (this.findValue.length > 0) {
                    res = await findDoc(this.findForm.name, this.findValue[1], this.findForm.docTitle);
                } else {
                    res = await findDoc(this.findForm.name, '', this.findForm.docTitle);
                }
                if (res.status === 200) {
                    this.tableData = res.data;
                    this.pageData = this.tableData.slice(0,7)
                }
                console.log(res);
            },
            handleEdit(index, row) {
                this.form.name = row.dName;
                this.form.gender = row.dGender;
                this.form.introduction = row.dIntroduction;
                this.form.docTitle = row.docTitle;
                this.doctor = row;
                this.dDepartmentList.forEach(item => {
                    item.specialty.forEach(item2 => {
                        if (item2.specialty_id == this.doctor.dPmtid) {
                            this.value = [item.department, item2.specialty_id];
                        }
                    })
                });
                console.log(this.value);
                this.dialogFormVisible = true
                console.log(this.doctor);
                console.log(index, row.dID);
            },
            async handleDelete(index, row) {
                MessageBox.confirm('是否确认删除医生', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteDoctor(row.dID);
                    this.tableData = [];
                    this.find_doc();
                    console.log(res);
                    if (res.status == 200) {
                        Message({
                            type: 'success',
                            message: '删除医生成功!'
                        });
                    }

                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            handleSchedule(index, row) {
                this.docID = row.dID;
                this.schedule = row.dScheduling
                this.scheduleShow = true
                console.log(index, row);
            },
            handleChange(value) {
                console.log(value);
            },
            changePage(page){
                this.pageData = this.tableData.slice((page-1)*7,page*7);
                console.log(this.pageData);
                console.log(page);
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

    .findDoc {
        width: 160px;
        margin-right: 30px;
    }

    .el-form-item__label {
        width: 120px !important;
    }
    .el-pagination{
        text-align: end;
    }
</style>