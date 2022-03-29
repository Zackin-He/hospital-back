import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Message} from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/homePage',
    meta: {
      roles: ['admin', 'doctor']
    }
  },
  {
    path:'/home',
    name:'Home',
    component:Home,
    meta: {
      roles: ['admin', 'doctor']
    },
    children:[
      {path:'/homePage',name:'HomePage',component:function () {
        return import(/* webpackChunkName: "doctors" */ '../views/HomePage.vue')
      },meta: {
        roles: ['admin', 'doctor']
      }},
      {path:'/doctors',name:'Doctors',component: function () {
        return import(/* webpackChunkName: "doctors" */ '../views/doctor/Doctors.vue')
      },meta: {
        roles: ['admin', 'doctor']
      }},
      {path:'/addDoctor',name:'AddDoctor',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/doctor/AddDoctor.vue')
      },meta: {
        roles: ['admin']
      }},
      {path:'/departments',name:'Departments',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/department/Departments.vue')
      },meta: {
        roles: ['admin']
      }},
      {path:'/addDepartments',name:'AddDepartments',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/department/AddDepartment.vue')
      },meta: {
        roles: ['admin']
      }},
      {path:'/personSchedule',name:'PersonSchedule',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/doctor/Scheduling.vue')
      },meta: {
        roles: ['admin', 'doctor']
      }},
      {path:'/orders',name:'Orders',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/order/Orders.vue')
      },meta: {
        roles: ['admin','doctor']
      }}
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    meta: {
      roles: ['admin', 'doctor']
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let type = localStorage.getItem("user_type");
  if(to.path == "/login"){
    if(token){
      next("/home");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(token) {
      if (to.meta.roles.includes(type)) {
        next();
      }else{
        Message({
          showClose: true,
          message: '你无权限访问该页面!',
          type: 'warning'
        });
        console.log(from,to);
        next('/homePage')
      }
    }else{
      next("/login");
    }
  }
})
export default router
