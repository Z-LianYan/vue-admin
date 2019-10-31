// import { getToken, setToken, removeToken } from '@/utils/auth'

import { resetRouter } from '@/router'
import * as RequstTools from "@/utils/request";
import * as AipUrl from "@/common/api";
import { promises } from 'fs';

const state = {
  token: '',
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit,state }, requestParams) {
    return new Promise((resolve,reject)=>{
      RequstTools.post(AipUrl.test_post,requestParams,{isLoading:false,hint:"获取数据中..."}).then(res => {
        commit('SET_TOKEN', res.message)
        console.log("store被触发，我就呵呵了",res)
        resolve(res.data)
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

