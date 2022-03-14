<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item prop="name" class="form">
        <el-input
          type="text"
          v-model="account.name"
          style="width: 100%"
          class="input-control input-fill"
          placeholder="账号"
          required
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="account.password"
          style="width: 100%"
          class="input-control input-fill"
          placeholder="密码"
          prefix-icon="el-icon-key"
          :show-password="true"
          @keyup.enter="enterKeyup"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'

export default defineComponent({
  props:["isKeepPassword"],
  setup(props) {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {

      formRef.value?.validate((valid: any) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    const enterKeyup = () => {
      const isKeepPassword = props.isKeepPassword
      loginAction(isKeepPassword)
    }

    return {
      account,
      rules,
      loginAction,
      formRef,
      enterKeyup
    }
  }
})
</script>

<style scoped lang="less">
input {
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f7f7f7;
}

.login-account {
  width: 400px;
  height: 120px;
  /* padding-bottom: 32px; */
}

.input-label {
  position: absolute;
  left: 3px;
  top: -2px;
}

// /deep/ .input-fill:not(:placeholder-shown) ~ .input-label,
// /deep/ .input-fill:focus ~ .input-label {
//   transform: scale(1.1) translate(0, -22px);
//   transition-duration: 1s;
// }

// /deep/ .input-fill:placeholder-shown::placeholder {
//   color: transparent;
// }

:deep(.el-input__inner) {
  border: 0;
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f7f7f7;
}
</style>
