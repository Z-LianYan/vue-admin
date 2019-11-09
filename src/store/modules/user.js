import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { setToken, getToken, removeToken } from "@/common/tools";
import { Message, Loading } from 'element-ui';

const state = {
  token: getToken(),
  name: '哈哈哈哈',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  doLogin({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.DO_LOGIN, requestParams, { isLoading: true }).then(res => {
        Message.success(res.message);
        resolve(res);
        if (res.error == 0) {
          commit('SET_TOKEN', res.token);
          setToken(res.token);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  doLogout({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.DO_LOGOUT, requestParams).then(res => {
        console.log("res", res);

        if (res.error == 0) {
          resolve(res);
          removeToken();
          Message.success(res.message);
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

