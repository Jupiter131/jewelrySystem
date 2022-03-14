import hyRequest from '../index'

enum WishInfoAPI {
  GetWishInfo = '/wish/',
  GetWishList = 'wish_list'
}

 export function addToWishRequest(paload:any) {
   return hyRequest.post<any>({
     url: WishInfoAPI.GetWishInfo + paload,
     showLoading:false,
     interceptors:{
      requestInterceptor: (config) => {
        console.log('请求添加心愿成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应添加心愿成功');
        return res
      }
     }
   })
 }

export function getWishListRequest() {
  return hyRequest.get<any>({
    url:WishInfoAPI.GetWishInfo + WishInfoAPI.GetWishList,
    showLoading:false,
    interceptors:{
      requestInterceptor: (config) => {
        console.log('请求心愿列表成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应心愿列表成功');
        return res
      }
     }
   })
 }

export function deleteWishRequest(paload:any) {
  return hyRequest.delete<any>({
    url:WishInfoAPI.GetWishInfo + paload,
    interceptors:{
      requestInterceptor: (config) => {
        console.log('请求删除心愿成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应删除心愿成功');
        return res
      }
     }
  })
}
