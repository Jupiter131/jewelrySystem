import hyRequest from '../index'

// import localCache from '@/utils/cache'

enum ProductInfoAPI {
  GetProductInfo = '/product/',
  GetProductSeriesInfo = '/series',
  GetProduct = '/product',
  GetProductDetailImg = '/goods_img/',
  GetProductDetailInfo = '/goods_detail_info/',
  GetProductMaterialInfo = '/material_info/'
}

export function getProductSeriesRequest() {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProductInfo + ProductInfoAPI.GetProductSeriesInfo,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求商品系列成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应商品系列成功');
        return res
      }
    }
  })
}

export function getProductInfoRequest() {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProduct,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求商品成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应商品成功');
        return res
      }
    }
  })
}

export function getProductSeriesInfoRequest(paload:any) {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProductInfo + paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求系列对应商品成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应系列对应商品成功');
        return res
      }
    }
  })
}

export function getProductDetailImgRequest(paload:any) {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProduct + ProductInfoAPI.GetProductDetailImg + paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求单个商品图片成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应单个商品图片成功');
        return res
      }
    }
  })
}

export function getProductDetailInfoRequest(paload:any) {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProduct + ProductInfoAPI.GetProductDetailInfo + paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求单个商品其他数据成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应单个商品其他数据成功');
        return res
      }
    }
  })
}

export function getGoodsMaterialInfoRequest(paload:any) {
  return hyRequest.get<any>({
    url: ProductInfoAPI.GetProduct + ProductInfoAPI.GetProductMaterialInfo + paload,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求单个商品材质类型成功');
        return config
      },
      responseInterceptor: (res) => {
        console.log('响应单个商品材质类型成功');
        return res
      }
    }
  })
}
