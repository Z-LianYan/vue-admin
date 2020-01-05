import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken, getUserInfo, routerMenuFilter } from '@/common/tools'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  

  if (hasToken) {

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()

    } else {

      if(!store.state.accessMenu.routerMenu.length) {
        store.dispatch("accessMenu/getAccessMenu").then(data => {
          var error_404 = { path: '*', redirect: '/404', hidden: true };
          var accessRouter = routerMenuFilter(data.data);
          accessRouter.push(error_404);
          var router_menu = router.options.routes.concat(accessRouter);
          router.selfaddRoutes(router_menu);
          store.commit("accessMenu/MENU_ROUTER", router_menu);
        })
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
