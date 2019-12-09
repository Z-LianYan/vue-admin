import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken, getUserInfo, routerMenuFilter } from '@/common/tools'

import Layout from '@/layout'


// console.log("router",router.selfaddRoutes())

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

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
      // next({ path: '/' })
      next()
      NProgress.done()

    } else {

      if(!store.state.accessMenu.routerMenu.length) {
        store.dispatch("accessMenu/list").then(data => {
          // console.log("data---permission",data);
          let accessRouter = routerMenuFilter(data);
          router.selfaddRoutes(accessRouter);
          store.commit("accessMenu/MENU_ROUTER", accessRouter);
          console.log("呵呵",store.state.accessMenu.routerMenu);
        })
      }




      
      next()

    }
  } else {
    console.log("to.path---",to.path);
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      console.log("to.path",to.path);
      // alert(to.path)
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
