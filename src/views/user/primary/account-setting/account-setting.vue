<template>
  <div class="account-setting">
    <div class="wrap_title">
      <div class="title">个人资料</div>
    </div>
    <ul class="my-data-list">
      <li class="my-avatar">
        <span class="em">头像：</span>
        <el-upload
          class="avatar-uploader"
          action="/api/upload/avatar"
          :headers="headers"
          name="avatar"
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-avatar :size="110" :src="avatarUrl" class="picture" @click="btnClick"></el-avatar> -->
        <i class="el-icon-back" style="color: #cbcbcb; margin-left: 20px"></i>
        <span
          style="
            color: #b1aeae;
            margin-left: 6px;
            font-size: 14px;
            text-align: center;
          "
          >点击上传<br />支持jpg、png格式</span
        >
      </li>
      <li class="name">
        <span class="message">会员昵称：</span>
        <span>{{ name }}</span>
        <i
          class="el-icon-lock"
          style="margin-left: 30px; font-size: 16px"
          @click="InputNameActive"
        ></i>
        <span class="tips">经注册后不可修改</span>
      </li>
      <li class="realName">
        <span class="message">真实姓名：</span>
        <span v-if="isInputRealName">{{ realName }}</span>
        <el-input
          v-else-if="!isInputRealName"
          style="width: 150px"
          type="text"
          @blur="InputRealNameInActive"
          v-model="realName"
          size="small"
          v-focus
          :min="3"
          :maxlength="10"
          :show-word-limit="true"
        />
        <i
          class="el-icon-edit"
          style="margin-left: 30px; cursor: pointer"
          @click="InputRealNameActive"
        ></i>
        <span class="tips">10个字符以内</span>
      </li>
      <li class="phone">
        <span class="message">手机号码：</span>
        <span v-if="isInputPhone">{{ phone }}</span>
        <el-input
          v-else-if="!isInputPhone"
          style="width: 150px"
          type="text"
          @blur="InputPhoneInActive"
          v-model="phone"
          size="small"
          v-focus
          :maxlength="11"
          :show-word-limit="true"
        />
        <i
          class="el-icon-edit"
          style="margin-left: 30px; cursor: pointer"
          @click="InputPhoneActive"
        ></i>
        <span class="tips">请填写您的真实手机号</span>
      </li>
      <li class="sex">
        <span class="message">您的性别：</span>
        <el-radio-group v-model="selectSex">
          <el-radio :label="'gentleman'" @change="toGentleman">男士</el-radio>
          <el-radio :label="'lady'" @change="toLady">女士</el-radio>
        </el-radio-group>
      </li>
      <li class="yourState">
        <span class="message">情感状态：</span>
        <el-radio-group v-model="selectYourState">
          <el-radio :label="'single'" @change="toSingle">单身</el-radio>
          <el-radio :label="'inLove'" @change="toInLove">恋爱中</el-radio>
          <el-radio :label="'engaged'" @change="toEngaged">订婚中</el-radio>
          <el-radio :label="'married'" @change="toMarried">已婚</el-radio>
        </el-radio-group>
      </li>
      <li class="birthday">
        <span class="message">出生日期：</span>
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="请选择您的出生日期"
          @blur="InputBirthdayOver"
        >
        </el-date-picker>
        <i class="el-icon-back" style="color: #cbcbcb; margin-left: 20px"></i>
        <span class="tips">填写您的真实生日，我们会不定期给您惊喜噢</span>
      </li>
      <li class="trueLove">
        <span class="message">真爱宣言：</span>
        <span v-if="isInputTrueLove">{{ trueLove }}</span>
        <el-input
          v-else-if="!isInputTrueLove"
          style="width: 700px"
          type="text"
          @blur="InputTrueLoveInActive"
          v-model="trueLove"
          size="small"
          v-focus
          :show-word-limit="true"
          :maxlength="48"
        />
        <i
          class="el-icon-edit"
          style="margin-left: 30px; cursor: pointer"
          @click="InputTrueLoveActive"
        ></i>
        <span class="tips">48个字符以内</span>
      </li>
      <li class="address">
        <span class="message">详细地址：</span>
        <span v-if="isInputAddress">{{ address }}</span>
        <el-input
          v-else-if="!isInputAddress"
          style="width: 600px"
          type="text"
          @blur="InputAddressInActive"
          v-model="address"
          size="small"
          v-focus
          :show-word-limit="true"
          :maxlength="48"
        />
        <i
          class="el-icon-edit"
          style="margin-left: 30px; cursor: pointer"
          @click="InputAddressActive"
        ></i>
        <span class="tips">请详细填写正确的地址，方便您收货，48个字符以内</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.querySelector('input').focus()
      }
    }
  },
  setup() {
    const store = useStore()

    const avatarId = ref(localCache.getCache('id'))
    const avatarUrl = computed(
      () => `http://localhost:8000/users/${avatarId.value}/avatar`
    )
    const token = localCache.getCache('token')

    const headers = {
      Authorization: `Bearer ${token}`
    }
    //会员昵称
    const name = ref(localCache.getCache('name'))
    const isInputName = ref(true)
    const InputNameActive = () => (isInputName.value = false)
    const InputNameInActive = () => (isInputName.value = true)

    //真实姓名
    const realName = ref(store.state.userInfo.myRealName)
    const isInputRealName = ref(true)
    const InputRealNameActive = () => (isInputRealName.value = false)
    const InputRealNameInActive = () => {
      isInputRealName.value = true
      store.state.userInfo.myRealName = realName.value
      const realNameMessage = {
        real_name: realName.value
      }
      store.dispatch('userInfo/UpdateRealNameAction', { ...realNameMessage })
    }

    //手机号
    const phone = ref(store.state.userInfo.myPhoneNumber)
    const isInputPhone = ref(true)
    const InputPhoneActive = () => (isInputPhone.value = false)
    const InputPhoneInActive = () => {
      isInputPhone.value = true
      store.state.userInfo.myPhoneNumber = phone.value
      //传入的参数
      const phoneMessage = {
        phone_number: phone.value
      }
      store.dispatch('userInfo/UpdatePhoneAction', { ...phoneMessage })
    }

    //性别
    const selectSex = ref(store.state.userInfo.mySex)
    const toLady = () => {
      selectSex.value = 'lady'
      store.state.userInfo.mySex = selectSex.value
      //传入参数
      const mySex = {
        sex: selectSex.value
      }
      store.dispatch('userInfo/UpdateSexAction',{ ...mySex })
    }
    const toGentleman = () => {
      selectSex.value = 'gentleman'
      store.state.userInfo.mySex = selectSex.value
      //传入参数
      const mySex = {
        sex: selectSex.value
      }
      store.dispatch('userInfo/UpdateSexAction',{ ...mySex })
    }

    //情感状态
    const selectYourState = ref(store.state.userInfo.myEmotionalState)
    const toSingle = () => {
      selectYourState.value = 'single'
      store.state.userInfo.myEmotionalState = selectYourState.value
      //传入参数
      const myEmotionalState = {
        emotional_state:selectYourState.value
      }
      store.dispatch('userInfo/UpdateEmotionalStateAction',{ ...myEmotionalState })
    }
    const toInLove = () => {
      selectYourState.value = 'inLove'
      store.state.userInfo.myEmotionalState = selectYourState.value
      //传入参数
      const myEmotionalState = {
        emotional_state:selectYourState.value
      }
      store.dispatch('userInfo/UpdateEmotionalStateAction',{ ...myEmotionalState })
    }
    const toEngaged = () => {
      selectYourState.value = 'engaged'
      store.state.userInfo.myEmotionalState = selectYourState.value
      //传入参数
      const myEmotionalState = {
        emotional_state:selectYourState.value
      }
      store.dispatch('userInfo/UpdateEmotionalStateAction',{ ...myEmotionalState })
    }
    const toMarried = () => {
      selectYourState.value = 'married'
      store.state.userInfo.myEmotionalState = selectYourState.value
      //传入参数
      const myEmotionalState = {
        emotional_state:selectYourState.value
      }
      store.dispatch('userInfo/UpdateEmotionalStateAction',{ ...myEmotionalState })
    }

    //出生日期
    const birthday = ref(store.state.userInfo.myBirthday)
    const InputBirthdayOver = () => {
      //保存数据
      store.state.userInfo.myBirthday = birthday.value
      //传入参数
      const myBirthdayMessage = {
        birthday: birthday.value
      }
      store.dispatch('userInfo/UpdateBirthdayAction',{ ...myBirthdayMessage })
    }

    //真爱宣言
    const trueLove = ref(store.state.userInfo.myTrueLove)
    const isInputTrueLove = ref(true)
    const InputTrueLoveActive = () => (isInputTrueLove.value = false)
    const InputTrueLoveInActive = () => {
      isInputTrueLove.value = true
      store.state.userInfo.myTureLove = trueLove.value
      //传入参数
      const trueLoveMessage = {
        true_love: trueLove.value
      }
      store.dispatch('userInfo/UpdateTrueLoveAction', { ...trueLoveMessage })
    }

    //详细地址
    const address = ref(store.state.userInfo.myDetailAddress)
    const isInputAddress = ref(true)
    const InputAddressActive = () => {
      isInputAddress.value = false
    }
    const InputAddressInActive = () => {
      isInputAddress.value = true
      store.state.userInfo.myDetailAddress = address.value
      //传入参数
      const addressMessage = {
        detail_address: address.value
      }
      store.dispatch('userInfo/UpdateDetailAddressAction', {
        ...addressMessage
      })
    }

    //上传头像
    const beforeUpload = () => {
      return new Promise((resolve, reject) => {
        ElMessageBox.confirm('确认更改头像吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async (success: any) => {
            await ElMessage({
              type: 'success',
              message: '修改成功!',
              offset: 128,
              duration: 1000
            })
            setTimeout(() => {
              location.reload()
            }, 500)
            resolve(success)
          })
          .catch((err: any) => {
            ElMessage({
              type: 'success',
              message: '已取消更改'
            })
            reject(err)
          })
      })
    }
    return {
      avatarUrl,
      headers,
      beforeUpload,
      name,
      isInputName,
      InputNameActive,
      InputNameInActive,
      realName,
      isInputRealName,
      InputRealNameActive,
      InputRealNameInActive,
      phone,
      isInputPhone,
      InputPhoneActive,
      InputPhoneInActive,
      selectSex,
      toLady,
      selectYourState,
      toSingle,
      toInLove,
      toEngaged,
      toMarried,
      birthday,
      InputBirthdayOver,
      trueLove,
      isInputTrueLove,
      InputTrueLoveActive,
      InputTrueLoveInActive,
      address,
      isInputAddress,
      InputAddressActive,
      InputAddressInActive,
      toGentleman
    }
  }
})
</script>

<style scoped>
.account-setting {
  padding: 0 0;
  height: 100%;
  width: 100%;
}
.title {
  color: #666;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  font-weight: 700;
  text-indent: 1em;
}

.wrap_title {
  padding: 0 20px;
}

.my-data-list {
  margin-left: 60px;
  margin-top: 60px;
  list-style: none;
  padding-bottom: 50px;
}

.my-avatar {
  display: flex;
  justify-content: left;
  align-items: center;
}

.em {
  width: 74px;
  margin-left: 32px;
  font-size: 16px;
  font-style: normal;
}
.picture {
  margin-left: 30px;
  cursor: pointer;
}

.avatar-uploader .el-upload {
  border: 1px dashed #b1aeae;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #b1aeae;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: flex;
}

.message {
  padding-right: 26px;
}

.name {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.realName {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.phone {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.tips {
  font-size: 12px;
  color: #b1aeae;
  margin-left: 10px;
}

.sex {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.yourState {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.birthday {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.trueLove {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

.address {
  display: flex;
  align-items: center;
  margin-top: 42px;
  height: 32px;
}

:deep(.el-input__inner) {
  height: 30px;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: rgb(41, 40, 40);
  background-color: rgb(41, 40, 40);
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: black;
}
</style>
