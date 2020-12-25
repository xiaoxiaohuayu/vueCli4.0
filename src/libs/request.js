import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue'
import get from 'lodash/get';
import storage from './storage';
import store from '@/store'

// 创建 axios 实例
const request = axios.create({
 // API 请求的默认前缀
//  baseURL: process.env.VUE_APP_BASE_URL,
 timeout: 10000, // 请求超时时间
});
// 异常拦截处理器
const errorHandler = (error,status) => {
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

// request interceptor
// request.interceptors.request.use((config) => {
//  // 如果 token 存在
//  // 让每个请求携带自定义 token 请根据实际情况自行修改
//  // eslint-disable-next-line no-param-reassign
//  console.log(config,'config')
//  config.data=qs.stringify(config.data);
//  config.headers.Authorization = `bearer ${storage._getStorage('ACCESS_TOKEN')}`;
//  return config;
// }, errorHandler);
/**----------------------------------*/
request.interceptors.request.use(
  config => {
    if (store.getters.token || storage._getStorage('token')) {
      config.headers['X-Token'] = getToken()
    }
    // console.log(store.getters.token,storage._getStorage('token'))
    return config
  },
  
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
/**----------------------------------*/
// response interceptor
// request.interceptors.response.use((response) => {
//  const dataAxios = response.data;
//  // 这个状态码是和后端约定的
//  const { code } = dataAxios;
//  // 根据 code 进行判断
//  if (code === undefined) {
//    // 如果没有 code 代表这不是项目后端开发的接口
//    return dataAxios;
//  // eslint-disable-next-line no-else-return
//  } else {
//    // 有 code 代表这是一个后端接口 可以进行进一步的判断
//    switch (code) {
//      case 200:
//        // [ 示例 ] code === 200 代表没有错误
//        return dataAxios.data;
//      case 'xxx':
//        // [ 示例 ] 其它和后台约定的 code
//        return 'xxx';
//      default:
//        // 不是正确的 code
//        return '不是正确的code';
//    }
//  }
// }, errorHandler);
/**------------------------------- */
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      // console.log(res,res.message)
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
    console.log('err' + error) // for debug
    message.error({
      message: error.message || errorHandler(message,res.status),
      duration: 3
    })
    return Promise.reject(error)
  }
)
/**------------------------------- */
export default request;
