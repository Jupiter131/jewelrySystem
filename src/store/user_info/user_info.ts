import { Module } from 'vuex'

import {
  UpdateUserPhoneByIdRequest,
  UpdateUserRealNameByIdRequest,
  veryfyAuthActionRequest,
  UpdateTrueLoveByIdRequest,
  UpdateDetailAddressByIdRequest,
  UpdateBirthdayByIdRequest,
  UpdateSexByIdRequest,
  UpdateEmotionalStateByIdRequest,
  GetAddressListByIdRequest,
  DeleteAddressRequest,
  ManageAddressRequest,
  CreateAddressRequest,
  VerifyPasswordRequest,
  UpdatePasswordRequest
} from '@/service/user_info/user_info'

import router from '@/router'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

const UserInfoModule: Module<any,any> = {
  namespaced:true,
  state() {
    return {
      token: '',
      id: '',
      myPhoneNumber: '',
      myBirthday:'',
      mySex:'',
      myEmotionalState:'',
      myTrueLove:'',
      myRealName:'',
      myDetailAddress:'',
      addressList:[],
    }
  },
  getters: {},
  mutations:{
    changePhoneNumber(state,newPhoneNumber:number) {
      state.myPhoneNumber = newPhoneNumber
    },
    changeRealName(state,newRealName:any) {
      state.myRealName = newRealName
    },
    changeTrueLove(state,newTrueLove:any) {
      state.myTrueLove = newTrueLove
    },
    changeDetailAddress(state,newDetailAddress:any) {
      state.myDetailAddress = newDetailAddress
    },
    changeBirthday(state,newBirthday:any) {
      state.myBirthday = newBirthday
    },
    changeSex(state,newSex:any) {
      state.mySex = newSex
    },
    changeEmotionalState(state,newEmotionalState:any) {
      state.myEmotionalState = newEmotionalState
    },
    changeAddressList(state,newAddressList:any) {
      state.addressList = newAddressList
    },
    deleteAddress(state,addressId:any) {
      state.addressList = state.addressList.filter((item:any) => item.id !== addressId)
    },
    changeAddress(state,paload:any) {
      const result = state.addressList.find(function (item:any) {
        return item.id == paload.addressId
      })
      result.receive_name = paload.receive_name
      result.receive_region = paload.receive_region
      result.receive_address = paload.receive_address
      result.receive_phone = paload.receive_phone
    },
  },
  actions:{
    async veryfyAuthAction() {
      const token = localCache.getCache('token')
      if(token){
        const result =  await veryfyAuthActionRequest()
        if(result === '????????????~'){
          router.push('/user')
        }
      }else{
        ElMessage({
          message: '???????????????~',
          type: 'warning',
          offset: 128
        })
        router.push('/login')
      }

    },

    async UpdatePhoneAction({ commit },paload) {
      //1.????????????Phone??????
      const { phone_number } = paload

      commit('changePhoneNumber',phone_number)

      await UpdateUserPhoneByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateRealNameAction({ commit },paload) {
      //1.????????????RealName??????
      const { real_name } = paload

      commit('changePhoneNumber',real_name)

      await UpdateUserRealNameByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateTrueLoveAction({ commit },paload) {
      //1.????????????TrueLove??????
      const { true_love } = paload

      commit('changeTrueLove',true_love)

      await UpdateTrueLoveByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateBirthdayAction({commit},paload) {
      //1.????????????Birthday??????
      const { birthday } = paload
      commit('changeBirthday',birthday)
      await UpdateBirthdayByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateDetailAddressAction({commit},paload) {
      //1.????????????DetailAddress??????
      const { detail_address } = paload
      commit('changeDetailAddress',detail_address)
      await UpdateDetailAddressByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateSexAction({commit},paload) {
      //1.????????????Sex??????
      const { sex } = paload
      commit('changeSex',sex)
      await UpdateSexByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async UpdateEmotionalStateAction({commit},paload) {
      //1.????????????Sex??????
      const { emotional_state } = paload
      commit('changeEmotionalState',emotional_state)
      await UpdateEmotionalStateByIdRequest(paload)
      //??????????????????
      ElMessage({
        message: '????????????~',
        duration: 1000,
        type: 'success',
        offset: 128
      })
    },

    async GetAddressListAction({commit}) {
      const result = await GetAddressListByIdRequest()
      commit('changeAddressList',result)
    },

    async DeleteAddressAction({commit},paload) {
      await DeleteAddressRequest(paload)
      commit('deleteAddress',paload)
    },

    async ManageAddressAction({commit},paload) {
      await ManageAddressRequest(paload)
      commit('changeAddress',paload)
    },

    async CreateAddressAction({commit},paload) {
      await CreateAddressRequest(paload)
      const result = await GetAddressListByIdRequest()
      commit('changeAddressList',result)
    },

    async VerifyPasswordAction(store,paload) {
      const result = await VerifyPasswordRequest(paload)
      return result
    },

    async UpdatePasswordAction(store,paload) {
      await UpdatePasswordRequest(paload)
    }
  },

}

export default UserInfoModule
