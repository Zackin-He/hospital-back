<template>
    <div>
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
                    <el-button size="mini" type="primary" @click="handleSchedule(scope.$index, scope.row)">排班</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getDoctors
    } from '@/service/api/index'
    export default {
        data() {
            return {
                tableData: [],
                doctor: null,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        mounted() {
            this.get_doctors();
        },
        methods: {
            async get_doctors() {
                let res = await getDoctors();
                this.tableData = res.doc
                console.log(res.doc);
            },
            handleEdit(index, row) {
                this.doctor = row;
                this.dialogFormVisible = true
                console.log(this.doctor);
                console.log(index, row.dID);
            },
            handleDelete(index, row) {
                console.log(index, row.dID);
            },
            handleSchedule(index,row){
                console.log(index,row);
            }
        }
    }
</script>

<style>

</style>