import Layout from '@/layout';
import LayoutFollow from '@/layout/LayoutFollow';
import router from '@/router';
const _import = require('@/router/_import_' + process.env.NODE_ENV)

export function setToken(token) {
  localStorage.token = token;
}
export function getToken() {
  return localStorage.token;
}
export function removeToken() {
  delete localStorage.token;
}

export function setUserInfo(userInfo) {
  localStorage.userInfo = JSON.stringify(userInfo);
}
export function getUserInfo() {
  return localStorage.userInfo ? JSON.parse(localStorage.userInfo) : "";
}
export function removeUserInfo() {
  delete localStorage.userInfo;
}

export function routerMenuFilter(routerData) { //遍历后台传来的路由字符串，转换为组件对象
  console.log("菜单",routerData);
  var accessedRouters = routerData.filter(route => {
    route.meta = {
      title: route.title,
      icon: route.icon,
      keep_alive: route.keep_alive==1?true:false,
      affix: !route.affix? false:true
    }
    if (route.component) {
      switch(route.component){
        case 'Layout':
          route.component = resolve => require(["@/layout"],resolve);
          break;
        case 'LayoutFollow':
          route.component = resolve => require(["@/layout/LayoutFollow"],resolve);
          break;
        case 'LayoutFollowFollow':
          route.component = resolve => require(["@/layout/LayoutFollowFollow"],resolve);
          break;
        default:
          route.component = _import(route.component);
      }
    }
    if (!route.redirect) {
      delete route.redirect
    }
    if (route.children && route.children.length) {

      route.children = routerMenuFilter(route.children)
    }
    delete route.title
    delete route.icon
    delete route.keep_alive
    delete route.module_id
    delete route._id
    delete route.affix
    return true
  })

  return accessedRouters
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}