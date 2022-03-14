<template>
  <div class="maincontent">

    <!-- 走马灯 -->
    <el-carousel indicator-position="outside" height="600px" class="carousel">
      <el-carousel-item v-for="item in picture" :key="item.id">
        <h3>
          <img :src="item.src" alt="" style="width: 100%; height: 600px" />
        </h3>
      </el-carousel-item>
    </el-carousel>

    <div class="main-text">
      <p
        style="
          font-size: 24px;
          font-family: Iowan Old Style Italic;
          font-style: italic;
          color: #ae0a2a;
          padding-top: 12px;
          margin-bottom: 25px;
          text-align: center;
        "
        data-v-02e83fca=""
      >
        The One And Only
      </p>

      <div class="slogan" style="text-align: center">
        <h4 style="margin-bottom: 0">
          Jupiter求婚钻戒，男士凭身份证一生仅能定制一枚
        </h4>
        <h4 style="margin-top: 3px">寓意“一生 • 唯一 • 真爱”</h4>
      </div>
    </div>
    <div class="footer">
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const picture = [
      {
        id: 1,
        src: 'https://fastdfscdn.darryring.com/group1/M00/0F/62/wKgcl2G5qkmAWRUuAAmBq1a7AIY268.jpg'
      },
      {
        id: 2,
        src: 'https://fastdfscdn.darryring.com/group1/M00/0F/64/wKgclmG5qt2AGYEpAAj54YEhrqU324.jpg'
      },
      {
        id: 3,
        src: 'https://fastdfscdn.darryring.com/group1/M00/0D/9D/wKgcl2GmDjGAV1SrAAicAd0RqNQ037.jpg'
      },
      {
        id: 4,
        src: 'https://fastdfscdn.darryring.com/group1/M00/0E/A6/wKgcl2Gx0yKAfSWVAAecE-KRqDc799.jpg'
      }
    ]
    return {
      picture
    }
  }
})
</script>

<style scoped>
.carousel {
  margin-top: -12px;
}

ul,
li {
  display: inline-block;
}

.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}

.page-component__scroll {
  height: 500px;
}
</style>
