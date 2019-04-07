const getters = {
  token: state => state.user.token, // 前台登录token
  adminToken: state => state.admin.token, // 后台登录token
};

export default getters;