<template>
  <div class="goods1">
    <div class="left_box">
      <tab-control :series = product_series @tabClick='changeIndex'/>
    </div>
    <div class="content_box">
      <div class="top_sort">
        <el-dropdown>
          <span class="el-dropdown-link">
            排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>默认</el-dropdown-item>
              <el-dropdown-item>按人气</el-dropdown-item>
              <el-dropdown-item>按新品</el-dropdown-item>
              <el-dropdown-item>按价格</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <goods-list :goods_list = product />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,computed,ref } from 'vue'
import { useStore } from 'vuex'
import TabControl from '@/components/tab-control'
import GoodsList from '@/components/goods-list'

export default defineComponent({
  components:{
    TabControl,
    GoodsList
  },
  setup() {

    const store = useStore()
    onMounted(() => {
      store.dispatch('productInfo/getProductSeries')
      store.dispatch('productInfo/getProductSeriesInfo',seriesId.value)
    })

    const seriesId = ref(1)
    const product_series = computed(() => store.state.productInfo.product_series)
    const product =  computed(() => store.state.productInfo.product_series_info)
    const changeIndex = (index:any) => {
      seriesId.value = index
      store.dispatch('productInfo/getProductSeriesInfo',seriesId.value)
    }




    return {
      product_series,
      product,
      changeIndex
    }
  }
})
</script>

<style scoped>
.goods1 {
  display: flex;
  margin: 0 180px;
}
.left_box {
  width: 240px;
}
.content_box {
  width: 100%;
}

.top_sort {
  margin: 30px 0;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  padding-right: 30px;
}
.el-dropdown-link {
  color: black;
  cursor: pointer;
}
</style>
