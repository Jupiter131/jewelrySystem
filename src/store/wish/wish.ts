import { Module } from 'vuex'

import {
  addToWishRequest,
  getWishListRequest,
  deleteWishRequest
} from '@/service/wish/wish_info'

import { ElMessage } from 'element-plus'

const WishInfoModule:Module<any,any> = {
  namespaced:true,
  state() {
    return {
      wish_list:[]
    }
  },
  getters:{},
  mutations:{
    getWishListInfo(state,newWishList) {
      state.wish_list = newWishList
    },
    deleteWish(state,paload) {
      state.wish_list = state.wish_list.filter((item:any) => item.id !== paload)
    }
  },
  actions:{
    //添加到心愿单
    async addToWish(store,paload:any) {
      const result =  await addToWishRequest(paload)
      if(result.affectedRows === 0){
        ElMessage({
          message: '已收藏',
          type: 'warning',
          offset: 128
        })
      }else{
        ElMessage({
          message: '收藏成功',
          type: 'warning',
          offset: 128
        })
      }
    },

    //用户获取心愿单列表
    async getWishList({commit}){
      const result = await getWishListRequest()
      commit('getWishListInfo',result)
    },

    //用户删除心愿单
    async deleteWish({commit},paload) {
      await deleteWishRequest(paload)
      commit('deleteWish',paload)
    }
  }
}

export default WishInfoModule
