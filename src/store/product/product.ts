import { Module } from 'vuex'

import {
  getProductInfoRequest,
  getProductSeriesRequest,
  getProductSeriesInfoRequest,
  getProductDetailImgRequest,
  getProductDetailInfoRequest,
  getGoodsMaterialInfoRequest
} from '@/service/product/product_info'

// import router from '@/router'
// import localCache from '@/utils/cache'

const ProductInfoModule:Module<any,any> = {
  namespaced:true,
  state() {
    return {
      //商品系列
      product_series:[],
      //全部商品
      product:[],
      //商品系列对应的商品
      product_series_info:[],
      //单个商品的图片信息
      product_detail_img:[],
      //单个商品的基本信息
      product_detail_info:{},
      //单个商品的材质信息
      product_material_info:[]
    }
  },
  getters: {},
  mutations:{
    changeProductSeries(state,newProductSeries){
      state.product_series = newProductSeries
    },
    changeProduct(state,newProduct){
      state.product = newProduct
    },
    changeProductSeriesInfo(state,newProductSeriesInfo){
      state.product_series_info = newProductSeriesInfo
    },
    changeProductDetailImg(state,newProductDetailImg){
      state.product_detail_img = newProductDetailImg
    },
    changeProductDetailInfo(state,newProductDetailInfo){
      state.product_detail_info = newProductDetailInfo
    },
    changeProductMaterialInfo(state,newProductMaterialInfo){
      state.product_material_info = newProductMaterialInfo
    },
    changeImgUrl(state,newUrl) {
      state.product_detail_info.img_url = newUrl
    }
  },
  actions:{
    //获取系列
    async getProductSeries({commit}){
      const ProductSeriesInfo =  await getProductSeriesRequest()

      commit('changeProductSeries',ProductSeriesInfo)
    },

    //获取所有商品
    async getProductInfo({commit}) {
      const ProductInfo = await getProductInfoRequest()

      commit('changeProduct',ProductInfo)
    },

    //获取某系列对应所有商品
    async getProductSeriesInfo({commit},paload:any) {
      const ProductSeriesInfo = await getProductSeriesInfoRequest(paload)
      commit('changeProductSeriesInfo',ProductSeriesInfo)
    },

    //获取某个商品对应的图片
    async getGoodsDetailImg({commit},paload:any) {
      const ProductDetailImg = await getProductDetailImgRequest(paload)

      commit('changeProductDetailImg',ProductDetailImg)
    },

    //获取某个商品的其他数据
    async getGoodsDetailInfo({commit},paload:any) {
      const ProductDeatilInfo = await getProductDetailInfoRequest(paload)

      commit('changeProductDetailInfo',ProductDeatilInfo)
    },
 
    //获取某个商品的材质种类
    async getGoodsMaterialInfo({commit},paload:any) {
      const ProductMaterialInfo = await getGoodsMaterialInfoRequest(paload)

      commit('changeProductMaterialInfo',ProductMaterialInfo)
    },

    //商品详情中图片的切换
    async changImg({commit},paload:any) {
      commit('changeImgUrl',paload)
    }
  }
}

export default ProductInfoModule
