import { Module } from 'vuex'

import {
  AddOrderInfoRequest,
  getOrdersRequest,
  deleteOrderRequest,
  changeCheckedRequest,
  changeCheckedAllRequest,
  changeMaterialRequest,
  changeSizeRequest,
  payGoodsRequest
} from '@/service/order/order_info'

import {
  veryfyAuthActionRequest,
} from '@/service/user_info/user_info'

import localCache from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'

const OrderInfoModule:Module<any,any> = {
  namespaced:true,
  state() {
    return {
      order_list:[],
      paid_order_list:[]
    }
  },
  getters:{},
  mutations:{
    changeOrdersList(state,newOrders) {
      state.order_list = newOrders.filter((item:any) => item.paied === 'no')
    },
    getPaidOrder(state,newOrders) {
      state.paid_order_list = newOrders.filter((item:any) => item.paied === 'yes')
    },
    deleteOrder(state,paload) {
      state.order_list = state.order_list.filter((item:any) => item.id !== paload)
      state.paid_order_list = state.paid_order_list.filter((item:any) => item.id !== paload)
    },
    changeChecked(state) {
      state.order_list.forEach((item:any) => {
        if(item.checked === '1'){
          item.checked = true
        }else if(item.checked === '0'){
          item.checked = false
        }
      });
    },
    changeCheckedAll(state,CheckedAll) {
      state.order_list.forEach((item:any) => {
        item.checked = CheckedAll
      })
    },
    changeRealPrice(state,paload) {
      const result = state.order_list.find(function (item:any) {
        return item.id == paload.order_id
      })
      result.real_price = paload.real_price
    },
    changePaid(state) {
      state.order_list = state.order_list.filter((item:any) => item.checked !== true)
    }
  },
  actions:{
    async addOrderInfo(store,paload:any) {
      await AddOrderInfoRequest(paload)
    },

    async getOrders({commit}) {
      const orders = await getOrdersRequest()

      commit('changeOrdersList',orders)
      commit('getPaidOrder',orders)
      commit('changeChecked')
    },

    async deleteOrder({commit},paload:any) {
      await deleteOrderRequest(paload)
      commit('deleteOrder',paload)
    },

    async changeChecked(store,paload:any) {
      await changeCheckedRequest(paload)
    },

    async changeCheckedAll({commit},paload:any) {
      await changeCheckedAllRequest(paload)
      const CheckedAll = paload.checked
      commit('changeCheckedAll',CheckedAll)
    },

    async veryfyAuthToCartAction() {
      const token = localCache.getCache('token')
      if(token){
        const result =  await veryfyAuthActionRequest()
        if(result === '授权成功~'){
          router.push('/cart')
        }
      }else{
        ElMessage({
          message: '您尚未登录~',
          type: 'warning',
          offset: 128
        })
        router.push('/login')
      }
    },

    async veryfyAuthToWishListAction() {
      const token = localCache.getCache('token')
      if(token){
        const result =  await veryfyAuthActionRequest()
        if(result === '授权成功~'){
          router.push('/wish_list')
        }
      }else{
        ElMessage({
          message: '您尚未登录~',
          type: 'warning',
          offset: 128
        })
        router.push('/login')
      }
    },

    async changeMaterial({commit},paload:any) {
      await changeMaterialRequest(paload)
      commit('changeRealPrice',paload)
    },

    async changeSize(store,paload:any) {
      await changeSizeRequest(paload)
    },

    async payGoods({commit}) {
      await payGoodsRequest()
      commit('changePaid')
      ElMessage({
        message: '结算成功~',
        type: 'success',
        offset: 128
      })
    }
  }
}

export default OrderInfoModule
