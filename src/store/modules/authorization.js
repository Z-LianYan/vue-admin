import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { setToken, getToken, removeToken } from "@/common/tools";
import { Message, Loading } from 'element-ui';

const state = {
}

const mutations = {
}

const actions = {
    //获取角色授权
    roleAuth({ commit, state }, requestParams) {
        return new Promise((resolve, reject) => {
            requstTools.get(aipUrl.AUTHORIZATION_ROLE_AUTH, requestParams).then(res => {
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
    roleAuthorizationEdit({ commit, state }, requestParams) {
        return new Promise((resolve, reject) => {
            requstTools.post(aipUrl.AUTHORIZATION_EDIT, requestParams).then(res => {
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

