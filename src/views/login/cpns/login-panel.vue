<template>
  <div class="login-panel">
    <div class="methods">
      <el-button class="loginMethod"  @click="toAccountMethod"
        ><i class="el-icon-user-solid"></i>账号登录</el-button
      >
      <el-button class="loginMethod"  @click="toPhoneMethod"
        ><i class="el-icon-mobile-phone"></i>邮箱登录</el-button
      >
    </div>
    <div class="mandatory">
      <span style="color: red">*</span>所有项目均为必填信息
    </div>
    <div v-if="isAccount === true">
      <login-account ref="accountRef" :isKeepPassword="isKeepPassword" />
    </div>
    <div v-else-if="isAccount === false">
      <login-phone ref="phoneRef" />
    </div>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" label="checkbox" class="myCheckBox"
        >记住密码</el-checkbox
      >
      <el-link type="default" :underline="false">忘记密码?</el-link>
    </div>
    <div class="loginbutton">
      <el-button type="info" class="login-btn" @click="handleLoginClick" style="background-color:black" border-color:black>
        立即登录
        <i class="el-icon-position"></i>
      </el-button>
      <div style="font-size:14px;width:340px;line-height:24px">
        <br>
        <br>
        <span>有关我们如何使用您的个人信息，请参阅我们的<a href="">隐私政策</a>。</span>
        <span style="color:#767676">我们为向您提供产品或服务（包括订购、售后、预约等）和发送相关通知需要处理您的以上个人信息，并将您的个人信息披露给我们境外的关联公司。有关这些关联公司的名称和联系资料请点击此处。</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')
    const isAccount = ref(true)

    const toPhoneMethod = () => {
      isAccount.value = false,
      currentTab.value = 'email'

    }

    const toAccountMethod = () => {
      isAccount.value = true,
      currentTab.value = 'account'
    }

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }

    return {
      isAccount,
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
      toPhoneMethod,
      toAccountMethod
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 100%;

  .methods {
    padding-bottom: 32px;
    .loginMethod {
      width: 120px;
    }
  }

  .mandatory {
    width: 100%;
    margin-bottom: 32px;
    font-size: 14px;
    margin-left: 220px;
  }

  .title {
    text-align: center;
  }

  .account-control {
    width: 400px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .loginbutton {
    margin-top: 32px;
  }

  .login-btn {
    width: 140px;
    margin-top: 10px;
  }
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: black;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: black;
  border-color: black;
}

:deep(.el-checkbox__input .el-checkbox__inner) {
  border-color: black;
}

:deep(.el-link.el-link--default:hover) {
    color: black;
}
</style>
