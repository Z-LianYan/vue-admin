import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import router from '@/router/index';
import { setToken, getToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from "@/common/tools";
import { Message, Loading } from 'element-ui';

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: getUserInfo(),
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {

    set({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        requstTools.post('/API/set', requestParams).then(res => {
          resolve(res);
          // if (res.error == 0) {
            
          //   // Message.success(res.message);
          // } else {
          //   Message.error(res.message);
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },
    get({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        requstTools.post('/API/get', requestParams).then(res => {
          resolve(res);
        }).catch(error => {
          reject(error)
        })
      })
    },



    doLogin({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        requstTools.post(aipUrl.DO_LOGIN, requestParams).then(res => {
          resolve(res);
          if (res.error == 0) {
            commit('SET_TOKEN', res.token);
            setToken(res.token);
            commit('SET_USERINFO', res.data);
            setUserInfo(res.data);
            console.log("登录成功",res);
            // Message.success(res.message);
          } else {
            Message.error(res.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    doLogout({ commit, state }, requestParams) {

      return new Promise((resolve, reject) => {

        requstTools.post(aipUrl.DO_LOGOUT, requestParams).then(res => {
          if (res.error == 0) {
            resolve();
            removeToken();
            removeUserInfo();
            router.replace({ path: "/login", query: { redirect: router.currentRoute.fullPath } })
            Message.success(res.message);
          } else {
            Message.error(res.message);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    doModifyPassword({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        requstTools.post(aipUrl.DO_MODIFY_PASSWORD, requestParams).then(res => {
          if (res.error == 0) {
            resolve();
            Message.success(res.message);
          } else {
            Message.error(res.message);
            reject(error)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },


  }
}


