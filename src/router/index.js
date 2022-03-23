import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import G2 from '../views/G2.vue'
import Canvas from '../views/Canvas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/homePage'
  },
  {
    path:'/home',
    name:'Home',
    component:Home,
    children:[
      {path:'/homePage',name:'HomePage',component:function () {
        return import(/* webpackChunkName: "doctors" */ '../views/HomePage.vue')
      }},
      {path:'/doctors',name:'Doctors',component: function () {
        return import(/* webpackChunkName: "doctors" */ '../views/doctor/Doctors.vue')
      }},
      {path:'/addDoctor',name:'AddDoctor',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/doctor/AddDoctor.vue')
      }},
      {path:'/departments',name:'Departments',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '../views/department/Departments.vue')
      }},
      {path:'/addDepartments',name:'AddDepartments',component: function () {
        return import(/* webpackChunkName: "addDoctor" */ '@/components/Calendar.vue')
      }}
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path:'/canvas',
    name:'Canvas',
    component:Canvas
  }
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
  if(to.path == "/login"){
    if(token){
      next("/home");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(token) {
      next();
    }else{
      next("/login");
    }
  }
})
export default router
