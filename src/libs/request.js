import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue'
import get from 'lodash/get';
import storage from './storage';
import { store } from '@/store'
import { router }from '@/router/index'

// 创建 axios 实例
const request = axios.create({
 // API 请求的默认前缀
//  baseURL: process.env.VUE_APP_BASE_URL,
 timeout: 10000, // 请求超时时间
});
// 异常拦截处理器
const errorHandler = (error,status) => {
  status = status ? status: 408
 switch (status) {
   /* eslint-disable no-param-reassign */
   case 400: error.content = '请求错误'; break;
   case 401: error.content = '未授权，请登录'; break;
   case 403: error.content = '拒绝访问'; break;
   case 404: error.content = `请求地址出错: ${error.response.config.url}`; break;
   case 408: error.content = '请求超时'; break;
   case 500: error.content = '服务器内部错误'; break;
   case 501: error.content = '服务未实现'; break;
   case 502: error.content = '网关错误'; break;
   case 503: error.content = '服务不可用'; break;
   case 504: error.content = '网关超时'; break;
   case 505: error.content = 'HTTP版本不受支持'; break;
   default: break;
   /* eslint-disabled */
 }
 return error.content;
};

/**----------------------------------*/
// 请求拦截
request.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token') || store.state.user && store.state.user.token) {
      config.headers['Authorization'] = sessionStorage.getItem('token') || store.state.user && store.state.user.token
    }else{
      // router.push('/')
    }
    return config
  },
  
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
/**----------------------------------*/
/**------------------------------- */
//响应拦截
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      console.log(res,'@@@@@@@@@@',res.message)
      message.error({
        content: res.message || errorHandler(message,res.status),
        duration: 3
      })
      return Promise.reject(new Error(res.message))
    } else {
      return res
    }
  },
  error => {
    message.error({
      content:errorHandler(message,408),
      duration: 3,
    })
    return Promise.reject(error)
  }
)
/**------------------------------- */
export default request;
