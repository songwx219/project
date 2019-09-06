/** 请求拦截器 */
import axios from 'axios'
import { stringify } from 'qs' // 引入qs模块，用来序列化post类型的数据
// import { Toast } from 'mand-mobile' // 引入mand弹出提示


// 先导入vuex,因为我们要使用到里面的状态对象 vuex的路径根据自己的路径去写
import store from '../store'
let userData = store.state.user.userData
let formDataState=false
// axios https://www.kancloud.cn/yunye/axios/234845
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://'
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'http://'
// }

axios.defaults.timeout = 10000 // 请求超时设置
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证,默认否
axios.defaults.headers={"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    // let header=formDataState?'multipart/form-data;':''
    
    return config
  },
  error => {
    // Toast.failed('请求过程出错')
    console.log(error)
    return Promise.error(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.loginStatus){
    window.location.replace('/#/login')
  }
  return response
}, function (error) {
  // Toast.failed('响应过程出错')
  console.log(error)
  return Promise.reject(error)
})


var request = async (options) => {
  formDataState=false;
  let bodydata=null
  if(options.type){
    formDataState=true;
    axios.defaults.headers={"Content-Type":"multipart/form-data;"}
    options.body.append('sid',userData.sid)
    options.body.append('sessionid',userData.sessionid)
    bodydata=options.body;
  }else{
    // 每次请求传入当前登录用户id
    if (userData.sid) {
      if (options.body) {
        options.body.sid = userData.sid
        options.body.sessionid = userData.sessionid
      }
      if (options.params) {
        options.params.sid = userData.sid
        options.params.sessionid = userData.sessionid
      }
    }
    bodydata=stringify(options.body);
    axios.defaults.headers={"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
  }
  // 表单传值参数格式化
  return axios.request({
    url: `http://127.0.0.1:3000${options.url}`,
    method: options.method,
    data: bodydata,
    params: options.params,
  }).then(response => {
    return response
  }, err => {
    // Toast.failed(err.messge)
    throw err
  }).catch((error) => {
    // Toast.failed('请求失败')
    throw error
  })
}
// http请求方式
export const http = {}
const methods = ['get', 'post', 'put', 'delete']
methods.forEach(method => {
  http[method] = (url, params = {},type=false) => {
    if (method === 'get') {
      return request({ url, params, method })
    }
    return request({ url, body: params, method ,type})
  }
})

export default function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        const obj = {
          get: http['get'],
          post: http['post'],
          put: http['put'],
          delete: http['delete']
        }
        return obj
      }
    }
  })
}
