// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      if (err.response.status === 409) {
        ElMessage({
          message: err.response.data,
          type: 'warning',
          offset: 128
        })
      } else if(err.response.status === 400){
        ElMessage({
          message: err.response.data,
          type: 'warning',
          offset: 128
        })
      }else if(err.response.status === 401){
        ElMessage({
          message: err.response.data,
          type: 'warning',
          offset: 128
        })
      }
      return err
    }
  }
})

export default hyRequest
