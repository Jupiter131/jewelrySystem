import { Module } from 'vuex'
import { ElNotification } from 'element-plus'

import {
  accountLoginRequest,
  accountRegisterRequest,
  getUserInfoByIdRequest,
  emailVerifyRequest,
  emailLoginRequest
  // requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { IAccount } from '@/service/login/type'
// import { ILoginState } from './types'
// import { IRootState } from '../types'

const loginModule: Module<any,any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      id: 56,
      userInfo: {},
      userMenus: [
        {
          id: 1,
          name: '账户设置',
          type: 1,
          icon: 'el-icon-setting',
          children: [
            {
              id: 11,
              name: '个人资料',
              type: 2,
              children:null,
              parentId: 1,
              routerTo: '/user/accountSetting'
            },
            {
              id: 12,
              name: '隐私设置',
              type: 2,
              children:null,
              parentId: 1,
              routerTo: '/user/privacySetting'
            },
            {
              id: 13,
              name: '地址管理',
              type: 2,
              children: null,
              parentId: 1,
              routerTo: '/user/addressManagement'
            },
            {
              id: 14,
              name: '修改密码',
              type: 2,
              children: null,
              parentId: 1,
              routerTo: '/user/passwordModification'
            },
          ]
        },
        {
          id: 2,
          name: '订单中心',
          type: 1,
          icon: 'el-icon-document',
          children: [
            {
              id: 21,
              name: '销售订单',
              type: 2,
              children: null,
              parentId: 2,
              routerTo: '/user/orderMessage'
            },
            {
              id: 22,
              name: '真爱之旅',
              type: 2,
              children: null,
              parentId: 2,
              routerTo: '/user/trueLoveJourney'
            },
          ]
        },
        {
          id: 3,
          name: '购物',
          type: 1,
          icon: 'el-icon-shopping-cart-full',
          children: [
            {
              id: 31,
              name: '我的购物车',
              type: 2,
              children:null,
              parentId: 3,
              routerTo: '/cart'
            },
            {
              id: 32,
              name: '我的收藏',
              type: 2,
              children: null,
              parentId: 3,
              routerTo: '/wish_list'
            }
          ]
        },
        {
          id: 4,
          name: '真爱俱乐部',
          type: 1,
          icon: 'el-icon-cold-drink',
          children: [
            {
              id: 41,
              name: '纪念日管理',
              type: 2,
              children: null,
              parentId: 4,
              routerTo: '/user/myAnniversary'
            }
          ]
        },
        {
          id: 5,
          name: '客户服务',
          type: 1,
          icon: 'el-icon-user',
          children: [
            {
              id: 51,
              name: '退换货/售后',
              type: 2,
              children: null,
              parentId: 5,
              routerTo: '/user/customerService'
            },
          ]
        },
        {
          id: 6,
          name: '系统消息',
          type: 1,
          icon: 'el-icon-monitor',
          children: null
        }
      ]
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeId(state, id: number) {
      state.id = id
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async getUserInfoAction({rootState}) {

      const id = localCache.getCache('id')
      const getUserInfo = await getUserInfoByIdRequest(id)

      const { phone_number,birthday,detail_address,emotional_state,real_name,sex,true_love } = getUserInfo

      rootState.userInfo.myPhoneNumber = phone_number
      rootState.userInfo.myBirthday = birthday
      rootState.userInfo.mySex = sex
      rootState.userInfo.myEmotionalState = emotional_state
      rootState.userInfo.myTrueLove = true_love
      rootState.userInfo.myRealName = real_name
      rootState.userInfo.myDetailAddress = detail_address

    },

    async accountLoginAction({ rootState,commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { token, id } = loginResult

      commit('changeId', id)
      commit('changeToken', token)
      localCache.setCache('token', token)
      localCache.setCache('id', id)

      // 2.请求用户信息
      const userInfoResult = await getUserInfoByIdRequest(id)
      const userInfo = userInfoResult

      const { phone_number,real_name,true_love,sex,detail_address,emotional_state,birthday } = userInfo
      rootState.userInfo.myPhoneNumber = phone_number
      rootState.userInfo.myRealName = real_name
      rootState.userInfo.myTrueLove = true_love
      rootState.userInfo.myDetailAddress = detail_address
      rootState.userInfo.myBirthday = birthday
      rootState.userInfo.mySex = sex
      rootState.userInfo.myEmotionalState = emotional_state

      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo', userInfo)

      //跳到首页
      router.push('/main')
    },
    async accountRegisterAction(store, payload: IAccount) {
      await accountRegisterRequest(payload)
    },
    async loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    async emailVerifyAction(store,payload:any) {
      await emailVerifyRequest(payload)
    },
    async emailLoginAction({rootState,commit},payload:any) {
      //1.登录逻辑
      const loginResult = await emailLoginRequest(payload)
      const { token, id, name } = loginResult

      commit('changeId', id)
      commit('changeToken', token)
      localCache.setCache('token', token)
      localCache.setCache('name', name)
      localCache.setCache('id', id)

      // 2.请求用户信息
      const userInfoResult = await getUserInfoByIdRequest(id)
      const userInfo = userInfoResult

      const { phone_number,real_name,true_love,sex,detail_address,emotional_state,birthday } = userInfo
      rootState.userInfo.myPhoneNumber = phone_number
      rootState.userInfo.myRealName = real_name
      rootState.userInfo.myTrueLove = true_love
      rootState.userInfo.myDetailAddress = detail_address
      rootState.userInfo.myBirthday = birthday
      rootState.userInfo.mySex = sex
      rootState.userInfo.myEmotionalState = emotional_state

      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo', userInfo)

      //跳到首页
      router.push('/main')
      const accountName = localCache.getCache('name')
        ElNotification({
          title: `欢迎${accountName}回来~`,
          message: 'Welcome back!',
          type: 'success',
          offset: 128
        })
    }
  }
}

export default loginModule
