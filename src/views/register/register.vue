<template>
  <div class="register">
    <div>
      <div style="display: flex">
        <img
          src="https://www.cartier.cn/front/img/login_banner.png?v=1.1.38"
          alt=""
          style="
            width: 60px;
            height: 52px;
            margin: 0 auto;
            padding: 16px 0 24px 0;
          "
        />
      </div>
      <div class="text1">创建我的账号</div>
      <div class="text2">
        <p style="padding: 0; margin: 0">您可以在您的账号内管理个人信息，</p>
        <p style="padding: 0; margin: 0">网站订单，最新资讯。</p>
      </div>
      <div class="mandatory">
        <div style="color: #767676">
          <span style="color: red">*</span>所有项目均为必填信息
        </div>
      </div>
      <el-form :rules="rules" :model="register" ref="formRef">
        <el-form-item prop="sex">
          <div style="display: flex">
            <el-radio-group
              v-model="radio"
              style="display: flex; margin: 0 auto"
            >
              <span style="margin-right: 40px; font-size: 14px; color: black">
                称谓<span style="color: red">*</span></span
              >
              <el-radio :label="1" style="margin-right: 40px" @change="toGirl">
                女士
              </el-radio>
              <el-radio :label="2" @click="toBoy"> 先生 </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="register.name"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="账号"
            required
            prefix-icon="el-icon-s-custom"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="register.password"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="密码"
            prefix-icon="el-icon-key"
            :show-password="true"
          />
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input
            type="password"
            v-model="register.confirm"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="确认您的密码"
            prefix-icon="el-icon-search"
            :show-password="true"
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="text"
            v-model="register.email"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="邮箱"
            prefix-icon="el-icon-s-promotion"
          />
        </el-form-item>
      </el-form>
      <div class="policy">
        有关我们如何使用您的个人信息，请参阅我们的<a href="">隐私政策</a>。
      </div>
      <div style="margin-bottom: 38px; margin-left: 70px">
        <el-checkbox
          v-model="checked"
          label="我已阅读、理解并同意隐私政策。"
          class="checkbox"
          @change="toDisabled"
        ></el-checkbox>
      </div>
      <div>
        <el-button
          type="info"
          :disabled="isDisabled"
          class="login-btn"
          @click="handleRegisterClick"
        >
          创建我的账号
          <i class="el-icon-right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const radio = ref(1)
    const name = ref('')
    const checked = ref(true)
    const isDisabled = ref(false)
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    const register = reactive({
      sex: 'lady',
      name: '',
      password: '',
      confirm: '',
      email: ''
    })

    const registerAction = () => {
      formRef.value?.validate(async (valid: any) => {
        if (valid) {
          //1.注册
          await store.dispatch('login/accountRegisterAction', {
            name: register.name,
            password: register.password,
            sex: register.sex,
            email: register.email
          })

          localCache.setCache('name', register.name)
          localCache.setCache('password', register.password)

          await store.dispatch('login/accountLoginAction', {
            name: register.name,
            password: register.password
          })
        }
      })
    }

    const handleRegisterClick = () => {
      registerAction()
    }

    const toDisabled = () => {
      isDisabled.value = !isDisabled.value
      console.log(isDisabled.value)
    }

    const toBoy = () => {
      register.sex = 'gentleman'
    }

    const toGirl = () => {
      register.sex = 'lady'
    }

    const isSamePwd = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'))
      } else if (value !== register.password) {
        callback(new Error('两次输入的密码不一致，请重新输入'))
      } else {
        callback()
      }
    }

    return {
      radio,
      name,
      checked,
      registerAction,
      register,
      toDisabled,
      isDisabled,
      toBoy,
      toGirl,
      handleRegisterClick,
      formRef,
      rules: {
        name: [
          {
            required: true,
            message: '请输入您的用户名',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{5,15}$/,
            message: '用户名长度范围为5~15个字符，由字母/数字组成',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入您的密码',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: '密码长度范围为6~20个字符，必须由字母/数字组成',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            required: true,
            validator: isSamePwd,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入您的邮箱',
            trigger: 'blur'
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '请输入正确的邮箱格式',
            trigger: 'blur'
          }
        ]
      }
    }
  }
})
</script>

<style scoped lang="less">
.register {
  padding: 0 88px;
  height: 100%;
  overflow-y: scroll;
  background-color: #f7f7f7;
}

.text1 {
  font-weight: 500;
  text-align: center;
  font-size: 22px;
  margin-bottom: 32px;
}

.text2 {
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 32px;
}

.mandatory {
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  margin-bottom: 32px;
}

.policy {
  margin-top: 32px;
  font-size: 14px;
  margin-bottom: 32px;
}

input {
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f7f7f7;
}

.input-label {
  position: absolute;
  left: 3px;
  top: -2px;
}

.input-fill:not(:placeholder-shown) ~ .input-label,
.input-fill:focus ~ .input-label {
  transform: scale(1) translate(0, -22px);
  transition-duration: 0.5s;
}

.input-fill:placeholder-shown::placeholder {
  color: transparent;
}

.login-btn {
  background-color: black;
  border-color: black;
  display: flex;
  margin: 0 auto;
}

.checkbox {
  color: gray;
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

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: rgb(41, 40, 40);
  background-color: rgb(41, 40, 40);
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: black;
}

:deep(.el-input__inner) {
  border: 0;
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 0.1px solid black;
  background-color: #f7f7f7;
}

:deep(.el-icon-s-custom:before) {
  color: black;
  font-size: 16px;
}

:deep(.el-icon-key:before) {
  color: black;
  font-size: 16px;
}

:deep(.el-icon-s-promotion:before) {
  color: black;
  font-size: 16px;
}

:deep(.el-icon-search:before) {
  color: black;
  font-size: 16px;
}
</style>
