<template>
  <div class="email-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item prop="email">
        <el-input
          type="text"
          v-model="account.email"
          prefix-icon="el-icon-message"
          required
          placeholder="邮箱"
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="get-code">
          <el-input
            v-model="account.code"
            prefix-icon="el-icon-key"
            placeholder="验证码"
          />
          <el-button :disabled="disabled" @click="sendcode" class="sendcode">{{
            btntxt
          }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const account = reactive({
      email: '',
      code: ''
    })
    const disabled = ref(false)
    const time = ref(60)
    const btntxt = ref('获取验证码')
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()

    const sendcode = () => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          // 发送验证码
          time.value = 60
          timer()
          const paload = {
            send_email:account.email
          }
          store.dispatch('login/emailVerifyAction',paload)
        }
      })
    }

    const timer = () => {
      if (time.value > 0) {
        disabled.value = true
        time.value--
        btntxt.value = time.value + '秒'
        setTimeout(timer, 1000)
      } else {
        time.value = 0
        btntxt.value = '发送验证码'
        disabled.value = false
      }
    }

    const loginAction = () => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          // 1.开始进行登录验证
          const paload = {
            send_email:account.email,
            code:account.code
          }
          store.dispatch('login/emailLoginAction',paload)
        }
      })
    }

    return {
      account,
      disabled,
      time,
      btntxt,
      sendcode,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>
.email-account {
  width: 400px;
  height: 120px;
}

.get-code {
  display: flex;
}

.sendcode {
  margin-left: 8px;
  width: 142px;
}

:deep(.el-input__inner) {
  border: 0;
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f7f7f7;
}
</style>
