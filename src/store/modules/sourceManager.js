import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { Message, Loading } from 'element-ui';

const state = {
}

const mutations = {}

const actions = {
    getUploadQiNiuToken({ commit, state }, requestParams) {
        return new Promise((resolve, reject) => {
            requstTools.get(aipUrl.GET_QINIU_TOKEN, requestParams).then(res => {
                if (res.error == 0) {
                resolve(res.data);
                } else {
                Message.error(res.message);
                }
            }).catch(error => {
                reject(error);
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

