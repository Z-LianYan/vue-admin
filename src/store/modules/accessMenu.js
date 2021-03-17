import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { Message, Loading } from 'element-ui';

import store from '@/store';
import { getToken, getUserInfo, routerMenuFilter } from '@/common/tools';
import router from '@/router'

const state = {
  routerMenu:[],
  initialize_system:false
}

const mutations = {
  MENU_ROUTER:(state,data)=>{
    state.routerMenu = data
  }
}

const actions = {
  list({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.ACCESS_MENU_LIST, requestParams).then(res => {
        if (res.error == 0) {
          resolve(res.data);
        } else {
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  doAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.ACCESS_MENU_ADD, requestParams).then(res => {
        if (res.error == 0) {
          Message.success(res.message);
          resolve();
        } else {
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  doEdit({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.ACCESS_MENU_EDIT, requestParams).then(res => {
        if (res.error == 0) {
          Message.success(res.message);
          resolve();
        } else {
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  doDel({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.ACCESS_MENU_DEL, requestParams).then(res => {
        if (res.error == 0) {
          Message.success(res.message);
          resolve();
        } else {
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  
  getAccessMenu({ commit, state },requestParams){
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.GET_ACCESS_MENU, requestParams).then(res => {
        if (res.error == 0) {
          console.log("菜---哈哈哈哈---单",res.data);
          resolve(res.data);
          var accessRouter = routerMenuFilter(res.data.data);

          console.log("菜------单",accessRouter);
          var router_menu = router.options.routes.concat(accessRouter);
          store.commit("accessMenu/MENU_ROUTER", router_menu);

          var error_404 = { path: '*', redirect: '/404', hidden: true };
          router_menu.push(error_404);
          router.selfaddRoutes(router_menu);//返回的数据，生成路由
          
          state.initialize_system = true;
        } else {
          Message.error(res.message);
          state.initialize_system = true;
        }
      }).catch(error => {
        reject(error);
        state.initialize_system = true;
      })
    })
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

