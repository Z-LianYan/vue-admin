import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/utils/settings'
// import jsCookie from "js-cookie";
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    console.log("key",key,'value',value);
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      // jsCookie.set("theme",value);
      localStorage.setItem("theme",value);
      console.log("store---",state.theme);
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

