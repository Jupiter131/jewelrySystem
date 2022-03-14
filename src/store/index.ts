import { createStore,Store,useStore as useVuexStore } from 'vuex'

import login from './login/login'
import userInfo from './user_info/user_info'
import productInfo from './product/product'
import orderInfo from './order/order'
import wishInfo from './wish/wish'

import { IRootState } from './types'
import { IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'Jupiter',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    userInfo,
    productInfo,
    orderInfo,
    wishInfo
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
