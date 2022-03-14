import hyRequest from '../index'

enum OrderInfoAPI {
  AddOrderInfo = '/order',
  OperateOrder = '/order/',
  ChangeChecked = 'checked/',
  ChangeCheckedAll = 'checkedAll',
  ChangeMaterial = 'material/',
  ChangeSize = 'size/',
  PayGoods = '/payGoods'
}

export function AddOrderInfoRequest(paload:any) {
  return hyRequest.post<any>({
    url:OrderInfoAPI.AddOrderInfo,
    data:paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求提交订单成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应提交订单成功');
        return res
      }
    }
  })
}

export function getOrdersRequest() {
  return hyRequest.get<any>({
    url:OrderInfoAPI.AddOrderInfo,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('获取所有订单成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应所有订单成功');
        return res
      }
    }
  })
}

export function deleteOrderRequest(paload:any) {
  return hyRequest.delete<any>({
    url:OrderInfoAPI.OperateOrder + paload,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求删除订单成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应删除订单成功');
        return res
      }
    }
  })
}

export function changeCheckedRequest(paload:any) {
  return hyRequest.patch<any>({
    url:OrderInfoAPI.OperateOrder + OrderInfoAPI.ChangeChecked + paload.order_id,
    data:paload,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求改变checked成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应改变checked成功');
        return res
      }
    }
  })
}

export function changeCheckedAllRequest(paload:any) {
  return hyRequest.patch<any>({
    url:OrderInfoAPI.OperateOrder + OrderInfoAPI.ChangeCheckedAll,
    data:paload,
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求改变所有checked成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应改变所有checked成功');
        return res
      }
    }
  })
}

export function changeMaterialRequest(paload:any) {
  return hyRequest.patch<any>({
    url:OrderInfoAPI.OperateOrder + OrderInfoAPI.ChangeMaterial + paload.order_id,
    data:paload,
    showLoading:false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求改变订单材质成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应改变订单材质成功');
        return res
      }
    }
  })
}

export function changeSizeRequest(paload:any) {
  return hyRequest.patch<any>({
    url:OrderInfoAPI.OperateOrder + OrderInfoAPI.ChangeSize + paload.order_id,
    data:paload,
    showLoading:false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求改变订单尺寸成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应改变订单尺寸成功');
        return res
      }
    }
  })
}

export function payGoodsRequest() {
  return hyRequest.patch<any>({
    url:OrderInfoAPI.AddOrderInfo + OrderInfoAPI.PayGoods,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求购物车结算成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应购物车结算成功');
        return res
      }
    }
  })
}
