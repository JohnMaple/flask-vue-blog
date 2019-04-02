import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,  // api的base_url
  withCredentials: true,  // 跨域请求时发送cookies
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    // 发送请求之前组装headers
    if (store.getters.token) {
      // 让每个请求携带token--[X-Token] 为自定义key
      config.headers['X-Token'] = store.getters.token;
    }
    if (config.method === 'post') {
      config.data = config.params;
      config.params = '';
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
    let { data, code, result, message } = response.data;
    if (code !== 200) {
      // if(status===500) 处理token过期等
      return Promise.resolve(false);
    } else {
      return { data, result, message };
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;