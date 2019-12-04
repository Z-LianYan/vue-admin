import Layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

export  function setToken(token){
    localStorage.token = token;
}
export function getToken(){
    return localStorage.token;
}
export function removeToken(){
    delete localStorage.token;
}

export  function setUserInfo(userInfo){
    localStorage.userInfo = JSON.stringify(userInfo);
}
export function getUserInfo(){
    return localStorage.userInfo;
}
export function removeUserInfo(){
    delete localStorage.userInfo;
}

export function routerMenuFilter(routerData) { //遍历后台传来的路由字符串，转换为组件对象
    var accessedRouters = routerData.filter(route => {
      if (route.component) {
        if (route.component === 'Layout') { //Layout组件特殊处理
          route.component = Layout
        } else {
          route.component = _import(route.component)
        }
      }
      if (route.children && route.children.length) {
        route.children = routerMenuFilter(route.children)
      }
      return true
    })
  
    return accessedRouters
  }