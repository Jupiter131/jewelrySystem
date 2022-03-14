import hyRequest from '../index'

import { IAccount, ILoginResult } from './type'

import { ElNotification } from 'element-plus'
import localCache from '@/utils/cache'

enum LoginAPI {
  AccountRegister = '/users',
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/', // 用法: role/1/menu
  EmailVerify = '/email',
  EmailLogin = '/emailLogin'
}

export function accountLoginRequest(params: IAccount) {
  return hyRequest.post<ILoginResult>({
    url: LoginAPI.AccountLogin,
    data: params,
    interceptors: {
      requestInterceptor: (config) => {
        return config
      },
      responseInterceptor: (res) => {
        const accountName = localCache.getCache('name')
        ElNotification({
          title: `欢迎${accountName}回来~`,
          message: 'Welcome back!',
          type: 'success',
          offset: 128
        })
        return res
      }
    }
  })
}

export function accountRegisterRequest(params: any) {
  return hyRequest.post({
    url: LoginAPI.AccountRegister,
    data: params,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求成功')
        return config
      },
      responseInterceptor: (res) => {
        console.log('注册成功')
        return res
      }
    }
  })
}

export function getUserInfoByIdRequest(params: number | string) {
  return hyRequest.get<any>({
    url: LoginAPI.LoginUserInfo + params,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求userInfo成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应userInfo成功');
        return res
      }
    }
  })
}

export function emailVerifyRequest(paload:any) {
  return hyRequest.post<any>({
    url:LoginAPI.EmailVerify,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求验证码成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应验证码成功');
        return res
      }
    }
  })
}

export function emailLoginRequest(payload:any) {
  return hyRequest.post<any>({
    url:LoginAPI.EmailLogin,
    data:payload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求邮箱登录成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应邮箱登录成功');
        return res
      }
    }
  })
}

// export function requestUserAvatarById(id: number) {
//   return hyRequest.get<any>({
//     url: '/users/' + id + '/avatar',
//     showLoading: false
//   })
// }

// export function requestUserMenusByRoleId(id: number) {
//   return hyRequest.get<IDataType>({
//     url: LoginAPI.UserMenus + id + '/menu',
//     showLoading: false
//   })
// }
