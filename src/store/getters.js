const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token, // 前台登录token
  adminToken: state => state.admin.token, // 后台登录token
};

export default getters;