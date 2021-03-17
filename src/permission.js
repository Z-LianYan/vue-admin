import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken, getUserInfo, routerMenuFilter } from '@/common/tools'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist


let isLoadingMenu = true;//处理刷新页面请求两遍菜单
router.beforeEach((to, from, next) => {

  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  
  if (hasToken) {

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if(!store.state.accessMenu.routerMenu.length && isLoadingMenu && to.path !== '/404') {
        isLoadingMenu=false;
        store.dispatch("accessMenu/getAccessMenu");
        store.dispatch("siteSetting/getSetData");
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})