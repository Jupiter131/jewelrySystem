<template>
  <div class="login">
    <el-container class="login-content">
      <el-header :class="[isActive ? 'isShow' : '']">
        <div class="logo-content" v-if="isActive">
          <img
            v-bind:title="backMain"
            @click="toMain"
            style="height: 60px; margin-top: 15px; cursor: pointer"
            src="https://lqsystem.oss-cn-guangzhou.aliyuncs.com/logo.png?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=1642442937&Signature=doKN7Z2FUXr6J1i74zeXf8sM%2B7c%3D"
            alt=""
          />
        </div>
        <nav-header />
      </el-header>
      <el-container class="page" @scroll="scroll">
        <div class="page_content">
          <el-row
            style="box-shadow: 0 0 4px 1px rgb(0 0 0 / 10%); height: 100%"
          >
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="loginContainer">
                  <div style="font-size: 22px; padding-bottom: 32px">
                    登录您的账号
                  </div>
                  <div style="padding-bottom: 32px">
                    若您已注册，请选择登录方式：
                  </div>
                  <login-panel />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="registerContainer">
                  <div style="font-size: 22px; padding-bottom: 32px">
                    创建您的账号
                  </div>
                  <div style="padding-bottom: 32px">
                    您可以在我的账号管理个人信息，获得最新资讯。
                  </div>
                  <ul style="margin-left: 0">
                    <li>管理您的个人信息</li>
                    <li>保存您的收货地址</li>
                    <li>收藏您喜欢的作品</li>
                    <li>查看您的订单信息</li>
                  </ul>
                  <div
                    class="register"
                    style="margin-top: 32px; margin-bottom: 60px"
                  >
                    <el-button
                      type="info"
                      class="login-btn"
                      style="background-color: black"
                      border-color:black
                      @click="drawer = true"
                    >
                      创建我的账号
                      <i class="el-icon-right"></i>
                    </el-button>
                    <el-drawer
                      v-model="drawer"
                      :with-header="false"
                      :before-close="handleClose"
                      size="30%"
                    >
                      <register />
                    </el-drawer>
                  </div>
                  <div style="display: flex">
                    <img
                      src="https://www.cartier.cn/front/img/login_logo.png?v=1.1.38"
                      alt=""
                      style="width: 262px; height: 128px; margin: 0 auto"
                    />
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <footer-menu />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
import NavHeader from '@/components/nav-header'
import { ElMessageBox } from 'element-plus'
import register from '@/views/register/register.vue'
import FooterMenu from '@/components/footer-menu'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    LoginPanel,
    NavHeader,
    register,
    FooterMenu
  },
  setup() {
    const isActive = ref(true)

    const router = useRouter()

    const backMain = '回到首页'

    const handleClose = (done: any) => {
      ElMessageBox.confirm('确定离开吗?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    const scroll = () => {
      let height = document.getElementsByClassName('page')[0].scrollTop
      if (height > 300) {
        isActive.value = false
      } else if (height <= 300) {
        isActive.value = true
      }
    }

    const toMain = () => {
      router.push('/main')
    }

    return {
      drawer: ref(false),
      handleClose,
      isActive,
      scroll,
      toMain,
      backMain
    }
  }
})
</script>

<style scoped lang="less">
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.login-content {
  height: 100%;
}

.el-header {
  display: grid;
  color: #333;
  text-align: center;
  align-items: center;
  transition: height 0.2s;
}

.isShow {
  height: 140px !important;
}
.page {
  // height: 100%;
  width: 100%;
  min-height: 100%;
  display: block;
  overflow-y: scroll;
  // flex-direction: column;
  // justify-content: space-between;
}

.page::-webkit-scrollbar {
  width: 5px;
}

.page::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(83, 83, 83, 0.2);
}

.page::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.page-main {
  padding: 0;
}

.page-content {
  height: calc(100% - 48px);
}

.page_content {
  background-color: #f7f7f7;
  height: 100%;
  // width: 100%;
  margin-left: 80px;
  margin-top: 60px;
  margin-right: 80px;
}

.bg-purple {
  background: #f7f7f7;
  height: 750px;
}
.bg-purple-light {
  background: #e5e9f2;
  height: 100%;
}

.loginContainer {
  padding: 72px 150px;
}

.registerContainer {
  padding: 72px 150px;
}

ul {
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.03125rem;
  text-indent: 1em;
  color: #767676;
  padding-left: 20px;
}

:deep(.el-header) {
  border-bottom: 0.1px solid rgb(235, 228, 228);
}

// .logo-content {
//   display: flex;
//   justify-content: space-between;
// }
</style>
