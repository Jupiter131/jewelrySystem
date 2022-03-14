<template>
  <div class="wish_list_info">
    <div class="title">
      <span>我的心愿单</span>
    </div>
    <div class="img_list">
      <el-row>
        <el-col
          v-for="(item, index) in wish_list"
          :key="index"
          :span="6"
          class="list_item"
        >
          <el-card :body-style="{ padding: '1px',height: '363px' }" class="el_card" shadow="never">
            <div class="wrapInfo">
              <img
              :src="item.img_url"
              class="image"
            />
            <div style="padding: 14px;text-align: center;">
              <span class="goods_title">{{item.title}} {{item.type}}</span>
              <div class="bottom">
                ￥{{item.price}}
              </div>
              <div class="ToBuyWrap">
                <div class="goToBuy">
                  <div class="goToBugInner" @click="toGoodsDetails(item)">查看详情</div>
                </div>
              </div>
              <span class="delete" @click="deleteItem(item)"><i class="el-icon-close"></i></span>
            </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('wishInfo/getWishList')
    })

    const wish_list = computed(() => store.state.wishInfo.wish_list)

    const router = useRouter()
    const toGoodsDetails = (item:any) => {
      router.push(`/main/goods/detail/${item.product_id}`)
    }

    //删除心愿单
    const deleteItem = (item:any) => {
      const wishId = item.id
      store.dispatch('wishInfo/deleteWish',wishId)
    }
    return {
      wish_list,
      toGoodsDetails,
      deleteItem
    }
  }
})
</script>

<style scoped>
.wish_list_info {
  margin: 88px 272px 0 296px;
}

.title {
  font-size: 20px;
}

.img_list {
  width: 100%;
  margin-top: 34px;
}

.list_item {
  margin-bottom: 12px;
}

.wrapInfo {
  width:230px;
  border: 1px solid white;
}

.wrapInfo:hover {
  border: 1px solid #a78477;
}

.wrapInfo:hover .ToBuyWrap{
  display: flex;
}

.image {
  width: 230px;
  height: 230px;
}

.el_card {
  border: none
}

.goods_title {
  font-size: 12px;
}

.bottom {
  margin-top: 5px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 30px;
}

.ToBuyWrap{
  display: none;
}

.goToBuy {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #9c827d;
  height: 30px;
  width: 170px;
  margin: 0 auto;
}

.goToBugInner {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #9c827d;
  border-right: 1px solid #9c827d;
  height: 30px;
  width: 162px;
  font-size: 14px;
  color: #9c827d;
}

.delete {
  display: none;
  position: absolute;
  margin-left: 85px;
  margin-top: -345px
;
}

.wrapInfo:hover .delete{
  cursor: pointer;
  display: unset
}


.el-icon-close {
  font-size: 30px;
  color: #baa39f;
}
</style>
