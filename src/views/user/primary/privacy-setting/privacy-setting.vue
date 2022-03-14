<template>
  <div class="privacy_setting">
    <div class="wrap_title">
      <div class="title">隐私设置</div>
    </div>
    <div class="content">
      <span class="content_title">是否公开购买记录</span>
      <el-switch v-model="value2"  active-color="#13ce66" disabled />
      <div class="tips">选择是，您将对外公开是否已购的信息；选择否，只有凭您本人和您伴侣购买时登记的手机号所注册的账户才能查看购买记录。</div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  setup () {
    const value2 = ref(false)

    return {
      value2
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

.content {
  padding: 30px 0 20px 36px;
}

.content_title {
  font-size: 15px;
  padding-right: 176px;
}

.tips {
  line-height: 18px;
  margin-top: 16px;
  font-size: 12px;
  color: #aaa;
  width: 340px;
}
</style>
