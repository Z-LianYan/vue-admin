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
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.MANAGER_LIST, requestParams).then(res => {
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
  //获取角色列表
  getRoleList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.GET_ROLE_LIST, requestParams).then(res => {
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
  //添加管理员
  doAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.MANAGER_ADD, requestParams).then(res => {
        
        if (res.error == 0) {
          Message.success(res.message);
          resolve();
        }else{
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取单个管理员信息
  getSingleData({ commit, state }, requestParams){
    return new Promise((resolve, reject) => {
      requstTools.get(aipUrl.GET_SINGLE_DATA, requestParams).then(res => {
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
  //编辑管理员
  doEdit({ commit, state }, requestParams){
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.GET_MANAGER_EDIT, requestParams).then(res => {
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
  //删除
  doDelete({ commit, state }, requestParams){
    return new Promise((resolve, reject) => {
      requstTools.post(aipUrl.MANAGER_DELETE, requestParams).then(res => {
        if (res.error == 0) {
          resolve();
          Message.success(res.message);
        }else{
          Message.error(res.message);
        }
      }).catch(error => {
        reject(error)
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

