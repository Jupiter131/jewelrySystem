<template>
  <div class="order_message">
    <div class="wrap_title">
      <div class="title">订单信息</div>
    </div>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1" @click="toWholeOrder">全部订单</el-menu-item>
    <el-menu-item index="2" @click="toUnpaid">待付款</el-menu-item>
    <el-menu-item index="3" @click="toUnapproved">待审核</el-menu-item>
    <el-menu-item index="4" @click="toApproved">已审核</el-menu-item>
    <el-menu-item index="5" @click="toPaid">已完成</el-menu-item>
  </el-menu>
  <div class="content">
    <router-view />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()
    const activeIndex = ref('1')
    const toWholeOrder = () => {
      router.push('/user/orderMessage/wholeOrder')
    }

    const toUnpaid = () => {
      router.push('/user/orderMessage/unpaid')
    }

    const toUnapproved = () => {
      router.push('/user/orderMessage/unapproved')
    }

    const toApproved = () => {
      router.push('/user/orderMessage/approved')
    }

    const toPaid = () => {
      router.push('/user/orderMessage/paid')
    }
    return {
      activeIndex,
      toWholeOrder,
      toUnpaid,
      toUnapproved,
      toApproved,
      toPaid
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

ul {
  margin: 0 20px;
  display: flex;
}
li {
  color: black;
  border-bottom: unset;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  width: 231px;
}

:deep(.el-menu--horizontal>.el-menu-item.is-active) {
  background-color: #ffffff;
  border-bottom: 2px solid #9c827d;
}

:deep(.el-menu--horizontal>.el-menu-item) {
  height: 36px;
  line-height: 36px;
  color: black;
  background-color: #f1f1f1;
}

.el-menu-demo {
  margin-top: 20px;
}

.content {
  padding: 10px 30px;
}
</style>
