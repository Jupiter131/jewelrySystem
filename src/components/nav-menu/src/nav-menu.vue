<template>
  <div class="nav-menu">
    <el-menu
      class="el-menu-vertical"
      background-color="white"
      text-color="black"
      :default-active="currentIndex"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span style="font-size:16px">{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 遍历里面的item -->
              <el-menu-item :index="subitem.id + ''" @click="toContent(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

// import { IRootState } from '@/store/types'

export default defineComponent({
  setup() {
    const currentIndex = ref<string>('11')
    const store = useStore()
    const userMenus = store.state.login.userMenus
    const router = useRouter()

    const toContent = (subitem:any) => {
      const routerTo = subitem.routerTo
      router.push(`${routerTo}`)
    }
    return {
      userMenus,
      toContent,
      currentIndex
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: white; //logo 背景色

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: black; //logo文字颜色
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #f7f7f7 !important; //二级菜单背景色
    }
  }

  :deep(.el-submenu__title) {
    background-color: #f7f7f7 !important; //一级菜单背景色
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #8b766c !important; // 鼠标放上去文字颜色
    background-color: #f0eeee !important ;
  }

  .el-menu-item.is-active {
    color: #8b766c !important; //选中后文字颜色
    background-color: #f0eeee !important; //选择背景色
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
