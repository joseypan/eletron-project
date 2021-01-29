/*
 * @FileDescription: 封装请求api，对请求成功或者失败做统一处理
 * @Author: 潘旭敏
 * @Date: 2021-01-29
 * @LastEditors: 潘旭敏
 * @LastEditTime:2021-01-29
 */
import axios from 'axios'
import { Message } from 'element-ui'

if (process.env.NODE_ENV === 'development') {
  // 开发阶段的基础地址
  axios.defaults.baseURL = 'http://www.apiying.com'
} else if (process.env.NODE_ENV === 'production') {
  // 生产阶段的基础地址
  axios.defaults.baseURL = 'http://www.apiying.com'
}

// 请求超时时间

// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     config.headers.token = localStorage.getItem('token')
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   }
// )
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.success) {
      // 响应成功
      return response.data.result
    } else {
      // 响应失败
      Message({
        message: response.data.message,
        type: 'error',
        duration: 800
      })
    }
  },
  // 服务状态码不是200的情况
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 800
    })
  }
)
/**
 * 描述：封装请求方法
 * @param { Object } options 包含请求类型请求地址等信息
 * @return { Promise } promise类型对象
 */
export default function request (options) {
  return new Promise((resolve, reject) => {
    if (options.type === 'get') {
      // get方式请求
      axios
        .get(options.url, options.params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } else if (options.type === 'post') {
      // post方式请求
      axios
        .post(options.url, options.params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
