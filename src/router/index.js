import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/views/system/login';
import Error_404 from '@/views/system/404';
import Dashboard from '@/views/dashboard/index';

//管理员
import Manager from '@/views/system/manager/index';
import ManagerAdd from '@/views/system/manager/add';
import ManagerEdit from '@/views/system/manager/edit';

//角色
import RoleList from '@/views/system/role/index';
import RoleAdd from '@/views/system/role/add';
import RoleEdit from '@/views/system/role/edit';

//权限
import AccessList from '@/views/system/access/index';
import AccessAdd from '@/views/system/access/add';
import AccessEdit from '@/views/system/access/edit';

//角色授权
import Authorization from '@/views/system/authorization/index';

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Error_404, hidden: true },
  {
    path: '/', component: Layout, redirect: '/dashboard', children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: { title: '首页', icon: 'el-icon-s-home' } }
    ]
  },

  {
    path: '/system', component: Layout, redirect: '/system/manager', meta: { title: '系统设置', icon: 'el-icon-s-tools' }, children: [

      //管理员
      { path: 'manager', name: 'manager', component: Manager, meta: { title: '管理员管理', icon: 'el-icon-s-management' } },//管理员
      { path: 'manager/add', name: 'managerAdd', component: ManagerAdd, meta: { title: '添加管理员' }, hidden: true },//添加管理员
      { path: 'manager/edit/:id', name: 'managerEdit', component: ManagerEdit, meta: { title: '编辑管理员', icon: 'dashboard' }, hidden: true },//编辑管理员

      //角色管理
      { path: 'role', name: 'role', component: RoleList, meta: { title: '角色管理', icon: 'el-icon-user' } },
      { path: 'role/add', name: 'roleAdd', component: RoleAdd, meta: { title: '添加角色' }, hidden: true },
      { path: 'role/edit/:id', name: 'roleEdit', component: RoleEdit, meta: { title: '编辑角色' }, hidden: true },

      //权限管理
      { path: 'access', name: 'access', component: AccessList, meta: { title: '权限管理', icon: 'el-icon-key' } },
      { path: 'access/add', name: 'accessAdd', component: AccessAdd, meta: { title: '添加权限' }, hidden: true },
      { path: 'access/edit/:id', name: 'accessEdit', component: AccessEdit, meta: { title: '编辑权限' }, hidden: true },

      //角色授权
      { path: 'authorization', name: 'authorization', component: Authorization, meta: { title: '角色授权' }, hidden: true },

    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
