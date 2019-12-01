import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

import { getToken, getUserInfo } from '@/common/tools'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist


let routerMenu = [
  {
    path: "/system",
    component: () => import('@/layout'),
    redirect: "/system/manager",
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
    children: [
      //管理员
      {
        path: "manager",
        component: () => import('@/views/system/manager/index'),
        meta: { title: "管理员管理", icon: "el-icon-s-management" }
      }, //管理员
      {
        path: "manager/add",
        component: () => import('@/views/system/manager/add'),
        meta: { title: "添加管理员" },
        hidden: true
      }, //添加管理员
      {
        path: "manager/edit/:id",
        component: () => import('@/views/system/manager/edit'),
        meta: { title: "编辑管理员", icon: "dashboard" },
        hidden: true
      }, //编辑管理员

      //角色管理
      {
        path: "role",
        component: () => import('@/views/system/role/index'),
        meta: { title: "角色管理", icon: "el-icon-user" }
      },
      {
        path: "role/add",
        component: () => import('@/views/system/role/add'),
        meta: { title: "添加角色" },
        hidden: true
      },
      {
        path: "role/edit/:id",
        component: () => import('@/views/system/role/edit'),
        meta: { title: "编辑角色" },
        hidden: true
      }
    ]
  }
]


router.addRoutes(routerMenu);





router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})