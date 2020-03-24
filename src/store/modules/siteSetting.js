import * as requstTools from "@/utils/request";
import * as aipUrl from "@/common/api";
import { Message, Loading } from 'element-ui';

const state = {
    site_data:{
        site_logo:"",
        site_title:""
    }
}

const mutations = {
    SET_SITE_DATA(state,data){
        state.site_data = {
            ...data
        }
    }
}

const actions = {
    getSetData({ commit, state }, requestParams) {
        return new Promise((resolve, reject) => {
            requstTools.get(aipUrl.GET_SITE_SETTING_DATA, requestParams).then(res => {
                if (res.error == 0) {
                    commit('SET_SITE_DATA',res.data[0]);
                    resolve(res.data);
                } else {
                    Message.error(res.message);
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    eidtSetting({ commit, state }, requestParams) {
        return new Promise((resolve, reject) => {
            requstTools.post(aipUrl.EDIT_SITE_SITTING, requestParams).then(res => {
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

