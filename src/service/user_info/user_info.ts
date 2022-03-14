import hyRequest from '../index'

// import { IId } from './type'

import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

enum UserInfoAPI {
  UpdateMessage = '/users/',
  UpdatePhone = '/phone',
  UpdateRealName = '/realName',
  UpdateTrueLove = '/trueLove',
  UpdateDetailAddress = '/detail_address',
  UpdateBirthday = '/birthday',
  UpdateSex = '/sex',
  UpdateEmotionalState = '/emotional_state',
  AddressManagement = 'address_management',
  AddressManage = 'address_management/',
  GetAddressList = '/address_list',
  VerifyPassword = 'verifyPassword',
  UpdatePassword = 'password'
}

//修改Phone
export function UpdateUserPhoneByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdatePhone,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updatePhone成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updatePhone成功');
        return res
      }
    }
  })
}

//修改真实姓名
export function UpdateUserRealNameByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateRealName,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateRealName成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateRealName成功');
        return res
      }
    }
  })
}

//修改性别
export function UpdateSexByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateSex,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateSex成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateSex成功');
        return res
      }
    }
  })
}

//修改情感状态
export function UpdateEmotionalStateByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateEmotionalState,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateEmotionalState成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateEmotionalState成功');
        return res
      }
    }
  })
}

//修改真爱宣言
export function UpdateTrueLoveByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateTrueLove,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateTrueLove成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateTrueLove成功');
        return res
      }
    }
  })
}

//修改出生日期
export function UpdateBirthdayByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateBirthday,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateBirthday成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateBirthday成功');
        return res
      }
    }
  })
}

//修改详细地址
export function UpdateDetailAddressByIdRequest(params:any) {
  const id =  localCache.getCache('id')

  return hyRequest.patch<any>({
    url: UserInfoAPI.UpdateMessage + id + UserInfoAPI.UpdateDetailAddress,
    data: params,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求updateDetailAddress成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应updateDetailAddress成功');
        return res
      }
    }
  })
}

//确认是否已授权
export function veryfyAuthActionRequest() {
  return hyRequest.get<any>({
    url:'/test',
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求授权成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应授权成功');
        return res
      }
    }
  })
}

//获取收货地址
export function GetAddressListByIdRequest() {
  return hyRequest.get<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.AddressManagement + UserInfoAPI.GetAddressList,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求地址列表成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应地址列表成功');
        return res
      }
    }
  })
}

//删除收货地址
export function DeleteAddressRequest(paload:any) {
  return hyRequest.delete<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.AddressManage + paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求删除地址成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应删除地址成功');
        return res
      }
    }
  })
}

//修改收货地址
export function ManageAddressRequest(paload:any) {
  return hyRequest.patch<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.AddressManage + paload.addressId,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求修改地址成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应修改地址成功');
        return res
      }
    }
  })
}

//新增收货地址
export function CreateAddressRequest(paload:any) {
  return hyRequest.post<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.AddressManagement,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求新增地址成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应新增地址成功');
        return res
      }
    }
  })
}

//判断旧密码和新密码是否一致
export function VerifyPasswordRequest(paload:any) {
  return hyRequest.post<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.VerifyPassword,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求验证密码成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应验证密码成功');
        return res
      }
    }
  })
}

//修改密码
export function UpdatePasswordRequest(paload:any) {
  return hyRequest.patch<any>({
    url:UserInfoAPI.UpdateMessage + UserInfoAPI.UpdatePassword,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求修改密码成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应修改密码成功');
        ElMessage({
          message: '修改密码成功',
          type: 'success',
          offset: 128
        })
        return res
      }
    }
  })
}
