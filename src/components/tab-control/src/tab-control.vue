<template>
  <div class="tag1">
    Jupiter / 求婚钻戒 / <span style="color: #9c827d">所有商品</span>
  </div>
  <div class="tag2">求婚钻戒</div>
  <ul
    class="series_list"
    v-for="(item, index) in series"
    :key="index"
    ref="myName"
    @click="itemClick(item,index)"
  >
    <li class="item_name">{{ item.name }}</li>
  </ul>
  <div style="height: 30px"></div>
  <div class="select">
    <span class="has_select">已选筛选</span>
    <span class="clear_all">全部清除</span>
  </div>
  <el-tag type="info" effect="plain" class="tag" closable v-model="tag">
    <span>系列：</span>
    <span>{{tag}}</span>
  </el-tag>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  props: {
    series: {
      type: Array,
      default(): any {
        return []
      }
    }
  },
  emits: ['tabClick'],
  setup(props, context) {
    const tag = ref('MY HEART 系列')
    const itemClick = (item:any,index: any) => {
      context.emit('tabClick', index + 1)
      tag.value = item.name
    }
    return {
      itemClick,
      tag
    }
  }
})
</script>

<style scoped>
.tag1 {
  font-size: 13px;
  line-height: 58px;
  height: 58px;
  width: 240px;
}
.tag2 {
  font-size: 32px;
  line-height: 48px;
  font-weight: 500;
  margin-bottom: 54px;
}
.series_list {
  list-style-type: none;
  padding: 14px 0;
  margin: 0;
  font-size: 14px;
  cursor: pointer;
}

.series_list:hover {
  font-size: 16px;
  color: #a78477;
  transition-duration: 0.3s;
}

.item_name {
  line-height: 14px;
}

.select {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

.has_select {
  font-size: 16px;
  font-weight: 700;
  color: #22282d;
}

.clear_all {
  cursor: pointer;
  font-size: 12px;
  padding-right: 20px;
}

.tag {
  margin-top: 26px ;
  /* text-align: center; */
  /* width: 165px; */
  color: black;
  border-color: black;
  border-radius: unset;
}
</style>
