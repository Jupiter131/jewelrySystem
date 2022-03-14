<template>
  <div class="password-modification">
    <div class="wrap_title">
      <div class="title">修改密码</div>
    </div>
    <div class="content">
      <el-form :rules="rules" :model="register" ref="formRef">
        <el-form-item prop="old_password">
          <el-input
            type="password"
            v-model="register.old_password"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="请输入旧密码"
            required
            prefix-icon="el-icon-key"
            :show-password="true"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="register.password"
            style="width: 100%"
            class="input-control input-fill"
            placeholder="请输入新密码"
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
            placeholder="请再次确认新密码"
            prefix-icon="el-icon-key"
            :show-password="true"
          />
        </el-form-item>
      </el-form>
      <button class="confirm" @click="handlePassword">确认修改</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const register = reactive({
      old_password: '',
      password: '',
      confirm: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const isSamePwd = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'))
      } else if (value !== register.password) {
        callback(new Error('两次输入的密码不一致，请重新输入'))
      } else {
        callback()
      }
    }

    const handlePassword = () => {
      updatePasswordAction()
    }

    const updatePasswordAction = () => {
      formRef.value?.validate(async (valid: any) => {
        if (valid) {
          const oldPassword = {
            password: register.old_password
          }
          store.dispatch('userInfo/VerifyPasswordAction', oldPassword).then(
            (res) => {
              if (res === 'success') {
                const newPassword = {
                  password: register.password
                }
                store.dispatch('userInfo/UpdatePasswordAction',newPassword)
              }
            },
            (err) => {
              console.log(err)
            }
          )
        }
      })
    }

    return {
      register,
      handlePassword,
      formRef,
      rules: {
        old_password: [
          {
            required: true,
            message: '请输入您的旧密码',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: '密码长度范围为6~20个字符',
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
        ]
      }
    }
  }
})
</script>

<style scoped>
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

.content {
  padding: 30px 450px;
}

.confirm {
  width: 100%;
  height: 40px;
  background-color: #fff;
  border: 1px solid #9c827d;
  font-size: 14px;
  color: #9c827d;
  cursor: pointer;
}

.confirm:hover {
  color: #fff;
  background-color: #9c827d;
}
</style>
