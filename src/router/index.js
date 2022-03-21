import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import G2 from '../views/G2.vue'
import Canvas from '../views/Canvas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'Home',
    component:Home,
    children:[
      {path:'/doctors',name:'Doctors',component: function () {
        return import(/* webpackChunkName: "about" */ '../views/doctor/Doctors.vue')
      }},
      {path:'/addDoctor',name:'AddDoctor',component: function () {
        return import(/* webpackChunkName: "about" */ '../views/doctor/AddDoctor.vue')
      }}
    ]
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

export default router
