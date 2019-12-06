import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets



import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './permission'

import '@/common/filters';

import '@/ElementUi'

import '@/icons' // icon

console.log("environment", process.env.NODE_ENV)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// const addRoutes = [
//   {
//     path: '/system', component: () => import("@/layout"), redirect: '/system/manager', meta: { 'title': '系统设置', 'icon': 'el-icon-s-tools' }, children: [

//       //管理员
//       { path: 'manager', component: () => import("@/views/system/manager/index"), meta: { 'title': '管理员管理', icon: 'el-icon-s-management' } },//管理员

//       //角色管理
//       { path: 'role', component: () => import("@/views/system/role/index"), meta: { title: '角色管理', icon: 'el-icon-user' } },

//     ]
//   }
// ]

// router.addRoutes(addRoutes)
// console.log("router----",router);





Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
