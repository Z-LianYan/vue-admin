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
        }else{
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

