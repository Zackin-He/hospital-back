import ajax from "./ajax";

//http://localhost:3000/web/xlmc
// const BASE_URL = '/api';
// const BASE_URL='http://10.25.6.122:3000'
const BASE_URL='http://localhost:3000'
//本地服务器
//1.定义基础路线
export const getHomeData = ()=>ajax(BASE_URL+'/web/api/departmentList');
//添加医师
export const addDoctor = (dName,docTitle,dID,dGender,dDepartment,dPmtid,tel,introduction)=>ajax(BASE_URL+'/web/api/addDoc',{dName,docTitle,dID,dGender,dDepartment,dPmtid,tel,introduction},'post');
//根据科室和时间查询医师
export const getDocByDay = (s_id,date)=>ajax(BASE_URL+'/web/api/getDocByDay?time='+new Date(),{s_id,date});
//根据id查询医师
export const getDocById = (dID)=>ajax(BASE_URL+'/web/api/getDocById?time='+new Date(),{dID});
//查询预约单
export const findOrder = (pName,pID)=>ajax(BASE_URL+'/web/api/findOrder',{pName,pID},'post');
//提交排班信息
export const scheduling = (dID,schedule)=>ajax(BASE_URL+'/web/api/scheduling',{dID,schedule},'post');
//获取所有医生
export const getDoctors = ()=>ajax(BASE_URL+'/web/api/getDoctors');

// export const getData = ()=>ajax('https://zackin.usemock.com/getData');
//登录
export const loginTest = (username,password,user_type)=>ajax(BASE_URL+'/web/api/test',{username,password,user_type},'post');
//退出登录
export const logout = ()=>ajax(BASE_URL+'/web/api/logout');
//自动登录
export const getUserInfo = ()=>ajax(BASE_URL+'/web/api/userInfo');
//获取科室
export const getDepartments = ()=>ajax(BASE_URL+'/web/api/departmentList');
//修改科室
export const changeSpecailty = (s_id,oldDepartment,newDepartment,s_name,introduction)=>ajax(BASE_URL+'/web/api/changeSpecailty',{s_id,oldDepartment,newDepartment,s_name,introduction},'post');
//修改医生信息
export const changeDoctor = (dID,dName,dGender,s_id,s_name,introduction,docTitle)=>ajax(BASE_URL+'/web/api/changeDoctor',{dID,dName,dGender,s_id,s_name,introduction,docTitle},'post');
//添加门诊部门
export const addDepartment = (departmentName)=>ajax(BASE_URL+'/web/api/addDepartment',{departmentName},'post');
//添加科室
export const addSpecialty = (departmentName,specialtyName,specialtyID,introduction)=>ajax(BASE_URL+'/web/api/addSpecialty',{departmentName,specialtyName,specialtyID,introduction},'post');
//根据条件查询医师
export const findDoc = (dName,dSpecialty,dTitle)=>ajax(BASE_URL+'/web/api/getDoctorsByCondition',{dName,dSpecialty,dTitle},'post');
//删除医生
export const deleteDoctor = (dID)=>ajax(BASE_URL+'/web/api/deleteDoctor',{dID},'post');
//删除科室
export const deleteSpecialty = (specialtyID,departmentName)=>ajax(BASE_URL+'/web/api/deleteSpecialty',{specialtyID,departmentName},'post');
//获取预约单
export const getOrders = ()=>ajax(BASE_URL+'/web/api/getOrders');
//根据条件查询订单
export const getOrdersByCondition = (regNumber,pName,pDocName,dpmt)=>ajax(BASE_URL+'/web/api/getOrdersByCondition',{regNumber,pName,pDocName,dpmt},'post');
//根据医生id查询订单
export const getOrdersByDocID = (dID)=>ajax(BASE_URL+'/web/api/getOrdersByDocID',{dID},'post');
// getOrdersByConditionAndID
export const getOrdersByConditionAndID = (regNumber,pName,docID)=>ajax(BASE_URL+'/web/api/getOrdersByConditionAndID',{regNumber,pName,docID},'post');