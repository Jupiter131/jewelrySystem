<template>
  <div class="nav-header">
    <div class="content">
      <div class="logo">
        <el-popover
          placement="bottom"
          trigger="hover"
          width="250px"
        >
          <template #reference>
            <div class="talk">
              <i
                class="el-icon-chat-dot-round"
                style="font-size: 20px; margin-right: 10px"
              ></i>
              <span style="font-size: 16px">联系我们</span>
            </div>
          </template>
          <el-row>
            <el-col :span="11">
              <div class="reback">
                <div>
                  <i class="el-icon-service" style="font-size:28px;margin:0 6px"></i>
                  <a class="link">电话咨询</a>
                </div>
                <div style="margin-top:30px">
                  <i class="el-icon-edit-outline" style="font-size:28px;margin:0 6px"></i>
                  <a class="link">意见反馈</a>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="center-line"></div>
            </el-col>
            <el-col :span="11">
              <div class="talk-to-me">
                <img :src="codeUrl" style="width: 107px" />
                <div style="margin-left: 10px">联系专属顾问</div>
              </div>
            </el-col>
          </el-row>
        </el-popover>
      </div>
      <header-menu />
      <div class="input">
        <el-input
          placeholder="请输入商品名称/门店名称"
          v-model="inputContent"
          class="input-with-select"
          size="small"
        >
          <template #append>
            <el-button icon="el-icon-search" size="small"></el-button>
          </template>
        </el-input>
      </div>
      <div class="right">
        <el-row class="buttons">
          <span :title="shopping_cart_icon" @click="toCart">
            <i class="el-icon-shopping-cart-2"></i>
          </span>
          <span :title="collection">
            <i class="el-icon-collection-tag" @click="toWishList"></i>
          </span>
          <span :title="message">
            <span class="dot"></span>
            <i class="el-icon-chat-dot-round"></i>
          </span>
        </el-row>
        <div class="userInfo">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                size="medium"
                :src="avatarUrl"
                class="el-avatar"
              ></el-avatar>
              <span style="width: 54px; margin-top: 2px">
                <div v-if="NameIsNull == null">未登录</div>
                <div v-else>
                  {{ userName }}
                </div>
              </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-cloudy-and-sunny" @click="toLogin"
                  >登录/切换</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-s-custom" @click="toUser"
                  >用户信息</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-circle-close" @click="exitLogin"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import headerMenu from './header-menu.vue'

import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    headerMenu
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()
    const name = computed(() => store.state.name)
    const inputContent = ref()
    const router = useRouter()
    const userName = localCache.getCache('name')
    const avatarId = localCache.getCache('id')
    const avatarUrl = `http://localhost:8000/users/${avatarId}/avatar`
    const NameIsNull = localCache.getCache('name')
    const codeUrl =
      'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/code.jpg?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=1650409104&Signature=x2%2F%2FTJGuVwzTtrjwKoLBddXKNco%3D'

    const shopping_cart_icon = '购物车'
    const collection = '我的收藏'
    const message = '消息'

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const toMain = () => {
      router.push('/main/maincontent')
    }

    const toLogin = () => {
      router.push('/login')
    }

    const toUser = () => {
      store.dispatch('userInfo/veryfyAuthAction')
    }

    const toCart = () => {
      store.dispatch('orderInfo/veryfyAuthToCartAction')
    }

    const toWishList = () => {
      store.dispatch('orderInfo/veryfyAuthToWishListAction')
    }

    const exitLogin = () => {
      localCache.clearCache()
      location.reload()
    }
    return {
      name,
      isFold,
      handleFoldClick,
      inputContent,
      toMain,
      toLogin,
      toUser,
      userName,
      avatarUrl,
      NameIsNull,
      codeUrl,
      shopping_cart_icon,
      collection,
      message,
      toCart,
      toWishList,
      exitLogin
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 25px;
    margin-top: 6px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
    .logo {
      align-items: center;
      .img {
        height: 20px;
      }
      .title {
        padding-left: 10px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }

  .el-menu-item:hover {
    color: rgb(131, 185, 247) !important; // 鼠标放上去文字颜色
    background-color: rgb(245, 251, 253) !important ;
  }
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-avatar {
  margin-top: 3px;
  margin-right: 10px;
}

.right {
  display: flex;
  flex-direction: row;

  .buttons {
    margin-right: 10px;

    i,
    span {
      position: relative;
      display: flex;
      width: 40px;
      height: 100%;
      font-size: 20px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
    }

    i:hover {
      background: #f6f6f6;
    }

    .dot {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.talk {
  cursor: pointer;
}

.talk:hover {
  color: #5b3f35;
  cursor: pointer;
}
.tall-to-me .reback {
  display: block;
}

.reback {
  margin-top: 18px;
}

.center-line {
  width:0.5px;
  background-color:rgb(243, 234, 234);
  height:100%
}

a,a:link{
	color:#000;
	text-decoration:none;
	position:relative;
	padding-bottom: 3px;
}
a:after{
    content: "";
    width: 0;
    height: 2px;
    background: rgba(136, 36, 36, 0.548);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .8s;
}
a:hover:after,a.active:after{
	left: 0%;
    width: 100%;
}

.link {
  cursor: pointer;
}
</style>
