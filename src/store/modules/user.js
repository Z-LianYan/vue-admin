import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import router from '@/router/index';
import { setToken, getToken, removeToken, setUserInfo, getUserInfo,removeUserInfo } from "@/common/tools";
import { Message, Loading } from 'element-ui';

const state = {
  token: getToken(),
  userInfo: getUserInfo(),
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  doLogin({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.DO_LOGIN, requestParams).then(res => {
        resolve(res);
        if (res.error == 0) {
          commit('SET_TOKEN', res.token);
          setToken(res.token);
          commit('SET_USERINFO', res.data);
          setUserInfo(res.data);
          Message.success(res.message);
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
          removeToken();
          removeUserInfo();
          router.replace({path:"/login",query:{redirect:router.currentRoute.fullPath}})

          // router.replace({path:"/login"})
          // router.push({ path: '/login'})
          
          // router.push({path:"/login"});

          console.log("user.js 退出系统")

          router.go(0)

          

          Message.success(res.message);


          
        }else{
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

