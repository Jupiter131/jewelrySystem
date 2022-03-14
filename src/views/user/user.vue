<template>
  <div class="user">
    <el-container class="user-content">
      <el-header :class="[isActive ? 'isShow' : '']">
        <div class="logo-content" v-if="isActive">
          <img
            :title="backMain"
            @click="toMain"
            style="height: 60px; margin-top: 15px; cursor: pointer"
            src="https://lqsystem.oss-cn-guangzhou.aliyuncs.com/logo.png?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=1652484229&Signature=YiXwFQaahX0O2XfB%2FNS0EEngMTg%3D"
            alt=""
          />
        </div>
        <nav-header />
      </el-header>
      <el-container class="page" @scroll="scroll">
        <div class="page-content">
          <el-row>
            <el-col :span="4" style="height:864px"
              ><div class="grid-content bg-purple">
                <nav-menu />
                </div
            ></el-col>
            <el-col :span="20"
              ><div class="grid-content bg-purple-light">
                <router-view />
                </div
            ></el-col>
          </el-row>
        </div>
        <div class="footer">
          <footer-menu />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeader from '@/components/nav-header'
import NavMenu from '@/components/nav-menu'
import FooterMenu from '@/components/footer-menu'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    NavHeader,
    FooterMenu,
    NavMenu
  },
  setup() {
    const isActive = ref(true)
    const router = useRouter()
    const backMain = '回到首页'

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
      isActive,
      scroll,
      toMain,
      backMain
    }
  }
})
</script>

<style scoped lang="less">
.user {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.user-content {
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
  width: 100%;
  min-height: 100%;
  display: block;
  overflow-y: scroll;
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

.page-content {
  border: 1px solid #cfcfcf;
  height: 864px;
  margin-left: 80px;
  margin-top: 60px;
  margin-right: 80px;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

:deep(.el-header) {
  border-bottom: 0.1px solid rgb(235, 228, 228);
}

.footer {
  width: 100%;
}

.bg-purple {
  background: #f7f7f7;
  border-right: 1px solid #cfcfcf;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  min-height: 100%;
}

// .block {
//   height: 72px;
// }
</style>
