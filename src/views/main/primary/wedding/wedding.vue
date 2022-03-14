<template>
  <div class="wedding">
    <div class="wedding_top_img"></div>
    <div class="wedding_text">
      <div>Jupiter真爱婚礼</div>
      <div>
        从|<span class="top_text_detail">求婚</span>|到|<span
          class="top_text_detail"
          >婚礼</span
        >|一站式婚策服务
      </div>
      <div class="wedding_planning">
        <div>Jupiter惊喜求婚策划</div>
        <div class="line"></div>
        <div class="planning_detail">
          由Jupiter金牌策划师专属策划浪漫、有仪式的求婚惊喜
        </div>
        <div class="planning_detail">让'Me'成为'We'</div>
        <el-row style="margin-top:60px">
          <el-col :span="12">
            <img class="wedding_scene_img1" :src=weddingImageUrl.wedding_scene1 alt="" />
          </el-col>
          <el-col :span="12">
            <img class="wedding_scene_img2" :src=weddingImageUrl.wedding_scene2 alt="">
          </el-col>
        </el-row>
      </div>
      <div class="wedding_planning">
        <div>Jupiter真爱婚礼策划</div>
        <div class="line"></div>
        <p class="planning_detail">
          由Jupiter金牌婚礼团队一对一专属服务<br>
          为信仰真爱的你打造最神圣、虔诚的婚礼仪式<br>
          谱写专属"我们"的Jupiter真爱婚礼
        </p>
        <img class="wedding_scene_img3" :src=weddingImageUrl.wedding_scene3 alt="">
        <div>
          <el-button type="warning" class="bottom_btn">立即预约</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const weddingImageUrl = {
      wedding_scene1:
        'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/wedding_scene1.png?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=11641820975&Signature=FAHRomnM7AScuyIB7HMD96DBlXo%3D',
      wedding_scene2:
        'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/wedding_scene2.png?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=101641821003&Signature=S3HEaxYkBFMkXw0A2ufI6YAvCls%3D',
      wedding_scene3:
        'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/wedding_scene3.jpg?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=11641821029&Signature=%2F%2BblrfDEZqmZxD8XNCGCr6D1bGE%3D'
    }
    return {
      weddingImageUrl
    }
  }
})
</script>

<style scoped>
.wedding {
  width: 100%;
  height: 100%;
}

.wedding_top_img {
  margin-top: 6px;
  display: block;
  background: url(https://lqsystem.oss-cn-guangzhou.aliyuncs.com/wedding.png?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=11641820926&Signature=xrCDM8hz4Ub2NzYw0RBPgEGRCSE%3D)
    no-repeat 50%;
  background-size: auto 100%;
  height: 450px;
}

.wedding_text {
  font-family: YouYuan;
  margin: 0 96px;
  padding: 80px 0 0;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 2px;
  color: #5b3f35;
  line-height: 48px;
}

.top_text_detail {
  color: #af6348;
  letter-spacing: 3px;
  margin: 0 5px;
}

.wedding_planning {
  margin-top: 60px;
  font-family: YouYuan;
  padding: 80px 0 92px;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 2px;
  color: #5b3f35;
  line-height: 48px;
  background-color: #f9f9f9;
}

.line {
  width: 46px;
  height: 4px;
  background-color: #a78477;
  margin: 30px auto 30px;
}

.planning_detail {
  font-family: Microsoft YaHei;
  font-weight: 500;
  line-height: 30px;
  font-size: 15px;
  color: #726f6f;
}

.wedding_scene_img1 {
  width: 600px;
  height: 400px;
  margin-right: -80px;
}

.wedding_scene_img2 {
  width: 600px;
  height: 400px;
  margin-left: -80px;
}

.wedding_scene_img3 {
  margin-top: 36px;
  width: 87%;
}

.bottom_btn {
  margin-top: 60px;
  width: 225px;
  height: 63px;
  background-color: #a98f83;
  border-color: #a98f83;
  font-size: 23px;
  font-family: YouYuan;
}
</style>
