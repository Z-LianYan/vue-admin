import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { setToken, getToken, removeToken } from "@/common/tools";
import { Message, Loading } from 'element-ui';

const state = {
}

const mutations = {
}

const actions = {
  list({ commit, state }, requestParams) {
    console.log("storehahahha ")
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.MANAGER_LIST, requestParams).then(res => {
        if (res.error == 0) {
          resolve(res.data);
        } else {
          Message.success(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取角色列表
  getRoleList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.GET_ROLE_LIST, requestParams).then(res => {
        if (res.error == 0) {
          resolve(res.data);
        } else {
          Message.success(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  //添加管理员
  doAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.MANAGER_ADD, requestParams).then(res => {
        Message.success(res.message);
        if (res.error == 0) {
          resolve(res.data);
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

