import axios from 'axios';
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
    // 发送请求之前组装headers
    if (store.getters.token) {
      // 让每个请求携带token--[X-Token] 为自定义key
      config.headers['X-Token'] = store.getters.token;
      // config.headers['X-Token'] = getToken()
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

    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
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