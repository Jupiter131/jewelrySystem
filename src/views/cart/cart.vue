<template>
  <div class="main">
    <el-container class="main-content">
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
        <el-main class="page-main">
          <el-tooltip
            class="item"
            effect="dark"
            content="backtop"
            placement="left"
          >
            <el-backtop target=".page"></el-backtop>
          </el-tooltip>
          <cart-info />
        </el-main>
        <div class="footer">
          <footer-menu />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated } from 'vue'
import NavHeader from '@/components/nav-header'
import FooterMenu from '@/components/footer-menu'
import { useRouter } from 'vue-router'
import CartInfo from '@/views/cart/cart_info.vue'
export default defineComponent({
  components: {
    NavHeader,
    FooterMenu,
    CartInfo
  },
  setup () {
    const router = useRouter()
    const isActive = ref(true)
    const backMain = '回到首页'

    //切换子路由时回到顶部
    onUpdated(() => {
      document.getElementsByClassName('page')[0].scrollTop = 0
    })
    //监听页面高度变化
    const scroll = () => {
      let height = document.getElementsByClassName('page')[0].scrollTop
      if (height > 10) {
        isActive.value = false
      } else if (height <= 10) {
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
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;
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

.page-main {
  padding: 0;
  overflow: unset;

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

.footer {
  width: 100%;
}

:deep(.el-header) {
  border-bottom: 0.1px solid rgb(235, 228, 228);
}
</style>
