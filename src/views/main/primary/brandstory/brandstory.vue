<template>
  <div class="brandstory">
    <div class="topImage"></div>
    <div class="brand_text1">
      <span style="color: #5b3f35">品牌理念</span>
      <div class="line"></div>
      <p class="brand_idea">
        无论时代如何变化，每个人在内心深处依然渴望一生一世的真爱<br />
        Jupiter品牌凝聚最虔诚、最有态度的真爱信仰<br />
        希望通过自身力量让爱情变得更美好<br />
        让坚信真爱的人都能找到一生唯一真爱<br />
        把真爱信仰传播到世界的各个角落<br />
        这是Jupiter创建的初衷，也是品牌一直以来的追求
      </p>
    </div>
    <div class="brand_text2">
      <span style="color: #5b3f35">品牌寄语</span>
      <div class="line"></div>
      <p class="brand_hope">
        Jupiter品牌倡导用自己的一生去守护挚爱<br />
        守护不一定是一次的承诺<br />
        而是一生的坚守 <br />
        在所有的日子里<br>
        幸福、欢笑、感动<br />
        都是我们真爱的印记<br />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.brandstory {
  width: 100%;
  height: 100%;
}

.topImage {
  margin-top: 6px;
  display: block;
  background: url(https://fastdfscdn.darryring.com/group1/M00/11/3A/wKgclmHL_uWASqZeAABn9qV_Zgg24.webp)
    no-repeat 50%;
  background-size: auto 100%;
  height: 514px;
}

.brand_text1 {
  margin: 0 96px;
  padding: 100px 0 92px;
  text-align: center;
  font-weight: 400;
  font-size: 36px;
  letter-spacing: 8px;
}

.brand_text2 {
  margin: 0 96px;
  padding: 100px 0 92px;
  text-align: center;
  font-weight: 400;
  font-size: 36px;
  letter-spacing: 8px;
  background-color: #f8f8f8;
}

.line {
  width: 46px;
  height: 4px;
  background-color: #a78477;
  margin: 36px auto 26px;
}

.brand_idea {
  font-size: 16px;
  line-height: 36px;
  color: #696665;
  font-weight: 400;
  letter-spacing: 3px;
}

.brand_hope {
  font-size: 16px;
  line-height: 36px;
  color: #696665;
  font-weight: 400;
  letter-spacing: 3px;
}
</style>
