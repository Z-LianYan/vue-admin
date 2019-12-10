import Vue from 'vue'

import 'default-passive-events' //(处理警告)Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；

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

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
