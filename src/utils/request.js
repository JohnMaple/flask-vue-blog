import axios from 'axios';
import qs from 'qs';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,  // api的base_url
  withCredentials: true,  // 跨域请求时发送cookies
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    let tokenType = config.url.indexOf("admin") != -1 ? 'Token' : 'Backend-Token'
    let token = tokenType == 'Backend-Token' ? store.getters.adminToken : store.getters.token
    // 发送请求之前组装headers
    if (token) {
      // 让每个请求携带token--[X-Token] 为自定义key
      // config.headers['X-Token'] = store.getters.token;
      config.headers['Authorization'] = 'Bearer ' + getToken(tokenType)
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error);   // for debug
    Promise.reject(error);
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error && error.response) {
      const { data } = error.response
      Message({
        message: data.msg || error.message,
        type: 'error',
        duration: 5 * 1000
      });
      // switch (error.response.status) {
      //   case 400: // 请求错误
      //   case 401: // 授权失败，请重新登录
      //   case 403: // 禁止访问，没有权限
      //   case 404: // 资源未找到
      //   case 500: // 服务器内部错误
      //   default:
      //     Message({
      //       message: data.msg || error.message,
      //       type: 'error',
      //       duration: 5 * 1000
      //     });
      // }

    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
    }
    console.log("err" + error); // for debug
    return Promise.reject(error);

  }
);

export default service;
