const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  site_data: state => state.siteSetting.site_data
}
export default getters
