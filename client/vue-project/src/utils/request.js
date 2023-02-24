import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import {Base64} from 'js-base64';
import {useUserStore} from '@/stores/user'
import { getToken } from '@/utils/auth'
let userStore = useUserStore()
// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  timeout: 5000 // request timeout
})
const base = function () {
  let token = getToken()
  token = Base64.encode(`${token}:`)
  return `Basic ${token}`
}
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (userStore.token) {
      config.headers['Authorization'] = base()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0) {
      const errorMsg = res.message || '请求失败'
      ElMessage({
        message: errorMsg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm('token已失效', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userStore.resetToken.then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(errorMsg))
    } else {
      return res
    }
  },
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service