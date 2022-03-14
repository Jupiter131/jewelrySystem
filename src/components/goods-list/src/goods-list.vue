<template>
  <div class="goods_list">
    <el-row>
      <el-col
        :span="8"
        v-for="(item, index) in goodsList"
        :key="index"
        style="margin-bottom: 6px"
        @mouseenter="mouseEnter(index)"
        @mouseleave="mouseLeave(index)"
        @click="toGoodsDetails(item)"
      >
        <el-card
          :body-style="{ padding: '0px', height: '460px' }"
          shadow="never"
          class="product_border"
        >
          <div class="goods_img">
            <img :src="item.img_url" class="img_change" />
          </div>
          <div style="margin-top: 10px; text-align: center">
            <div>{{ item.title + item.type }}</div>
            <div
              style="margin-top: 12px; margin-bottom: 12px"
              class="default_price"
            >
              ￥{{item.price}}
            </div>
            <div class="ToBuyWrap">
              <div class="goToBuy">
                <div class="goToBugInner">立即购买</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    goods_list: {
      type: Array,
      default(): any {
        return []
      }
    }
  },
  setup(props: any) {
    //是否显示立即购买
    const goodsList = computed(() => props.goods_list)
    //鼠标移进移出效果
    const mouseEnter = (index: any) => {
      const num = index
      const url_change = goodsList.value[num].img_url
      goodsList.value[num].img_url = goodsList.value[num].img_url_change
      goodsList.value[num].img_url_change = url_change

    }
    const mouseLeave = (index: any) => {
      const num = index
      const url_change = goodsList.value[num].img_url_change
      goodsList.value[num].img_url_change = goodsList.value[num].img_url
      goodsList.value[num].img_url = url_change
    }

    //路由跳转到商品详情页
    const router = useRouter()
    const toGoodsDetails = (item:any) => {
      router.push(`/main/goods/detail/${item.id}`)
    }

    return {
      mouseEnter,
      goodsList,
      mouseLeave,
      toGoodsDetails
    }
  }
})
</script>

<style scoped>
.default_price {
  line-height: 24px;
  font-weight: 600;
}

.goods_img {
  height: 329px;
}

.goods_img img {
  width: 330px;
}

.product_border:hover {
  border: 1px solid #a78477;
}


.product_border {
  border: none;
  cursor: pointer;
}

.ToBuyWrap {
  display: none;
}
.product_border:hover .ToBuyWrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.goToBuy {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #9c827d;
  height: 30px;
  width: 136px;
}

.goToBugInner {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #9c827d;
  border-right: 1px solid #9c827d;
  height: 30px;
  width: 125px;
  font-size: 14px;
  color: #9c827d;
}
</style>
