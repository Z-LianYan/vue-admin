import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/views/login/index';
import Error_404 from '@/views/404';
import Dashboard from '@/views/dashboard/index';

//管理员
import Manager from '@/views/manager/index';
import ManagerAdd from '@/views/manager/add';
import ManagerEdit from '@/views/manager/edit';

//角色
import RoleList from '@/views/role/index';


/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Error_404, hidden: true },
  {
    path: '/', component: Layout, redirect: '/dashboard', children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: { title: '首页', icon: 'dashboard' } }
    ]
  },
  {
    path: '/system', component: Layout, redirect: '/system/manager', meta: { title: '系统设置', icon: 'nested' }, children: [
      { path: 'manager', name: 'manager', component: Manager, meta: { title: '管理员列表', icon: 'dashboard' } },//管理员
      { path: 'manager/add', name: 'managerAdd', component: ManagerAdd, meta: { title: '添加管理员', icon: 'dashboard' },hidden: true},//添加管理员
      { path: 'manager/edit/:id', name: 'managerEdit', component: ManagerEdit, meta: { title: '编辑管理员', icon: 'dashboard' },hidden: true},//编辑管理员
      { path: 'role', name: 'role', component: RoleList, meta: { title: '角色列表', icon: 'dashboard' }},
    ]
  },

  {
    path: '/nested', component: Layout, redirect: '/nested/menu1', name: 'Nested', meta: { title: 'Nested', icon: 'nested' }, children: [{
      path: 'menu1', component: () => import('@/views/nested/menu1/index'), name: 'Menu1', meta: { title: 'Menu1' }, children: [
        { path: 'menu1-1', component: () => import('@/views/nested/menu1/menu1-1'), name: 'Menu1-1', meta: { title: 'Menu1-1' } },
        {
          path: 'menu1-2', component: () => import('@/views/nested/menu1/menu1-2'), name: 'Menu1-2', meta: { title: 'Menu1-2' }, children: [
            { path: 'menu1-2-1', component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'), name: 'Menu1-2-1', meta: { title: 'Menu1-2-1' } },
            { path: 'menu1-2-2', component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'), name: 'Menu1-2-2', meta: { title: 'Menu1-2-2' } }
          ]
        },
        { path: 'menu1-3', component: () => import('@/views/nested/menu1/menu1-3'), name: 'Menu1-3', meta: { title: 'Menu1-3' } }
      ]
    },
    { path: 'menu2', component: () => import('@/views/nested/menu2/index'), meta: { title: 'menu2' } }
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
