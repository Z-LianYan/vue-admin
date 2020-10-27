import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/views/system/login';
import Error_404 from '@/views/system/404';



export const constantRoutes = [
  { path: '/login',name:"login", component: Login, hidden: true },
  // { path: '/404',name:"error_404", component: Error_404, hidden: true },
  {
    path: '/', component: ()=>import("@/layout"), redirect: '/dashboard', children: [
      { path: 'dashboard', 
        name: 'Dashboard', 
        component:()=>import("@/views/dashboard/index"), 
        meta: { 
          title: '首页', icon: 'el-icon-s-home',
          affix:true,
          activeMenu: '/dashboard'
        } 
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

router.selfaddRoutes = function (params){
  router.matcher = new Router().matcher;
  router.addRoutes(params)
}


export default router
