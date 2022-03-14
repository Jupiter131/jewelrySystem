<template>
  <div class="headermenu">
    <el-popover
      placement="bottom"
      width="97%"
      trigger="hover"
      :show-after=showAfter
      :show-arrow="false"
    >
      <template #reference>
        <span class="headertext" @click="toBrandStory">
          <span style="font-size: 17px">品牌故事</span>
        </span>
      </template>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple" style="margin-left: 120px;margin-top: 60px">
            <img
              src="https://res.darryring.com/webimg/common/culture_nav.jpg"
              alt=""
            />
            <h2 style="height:20px"></h2>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light" style="margin-left: 120px;margin-top: 60px">
            <br><br>
            <div style="font-size:20px">JP提倡“用一生爱一人”的真爱信仰</div>
            <br><br>
            <div style="font-size:16px;">
            <div style="padding-bottom:10px">自品牌创立之初便立下世间独特规定</div>
            <div style="padding-bottom:10px">每位男士凭身份证一生仅能定制一枚JP求婚钻戒</div>
            <div style="padding-bottom:10px">赠予此生挚爱一人，寓意“一生 · 唯一 · 真爱”</div>
            </div>
            <br />
            <span>
              <a href="/main/brandstory">了解品牌故事</a>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" style="margin-left: 30px;margin-top: 50px">
            <h2 style="height:20px"></h2>
            <div style="font-size:20px;color:rgba(87, 24, 24, 0.548);font-weight:800">一枚JP，一个故事</div>
            <br />
            <span>
              <a href="#">明星故事</a>
            </span><br /><br>
            <span>
              <a href="#">粉丝故事</a>
              </span><br /><br>
            <span>
              <a href="#">JP专题</a>
              </span><br>
            <br />
            <div style="font-size:20px;color:rgba(87, 24, 24, 0.548);font-weight:800">关于JP</div>
            <br>
            <span>
              <a href="#">品牌文化</a>
            </span><br />
          </div>
        </el-col>
      </el-row>
    </el-popover>
    <el-popover
      placement="bottom"
      title="求婚钻戒"
      trigger="hover"
      :show-after=showAfter
    >
      <template #reference>
        <span class="headertext" @click="toGoods1">
          <span @click="toBrandStory" style="font-size: 17px">求婚钻戒</span>
        </span>
      </template>
      <div>goods1</div>
    </el-popover>
    <el-popover
      placement="bottom"
      title="结婚对戒"
      trigger="hover"
      :show-after=showAfter
    >
      <template #reference>
        <span class="headertext" @click="toGoods2">
          <span @click="toBrandStory" style="font-size: 17px">结婚对戒</span>
        </span>
      </template>
      <div>goods2</div>
    </el-popover>
    <el-popover
      placement="bottom"
      title="真爱礼物"
      trigger="hover"
      :show-after=showAfter
    >
      <template #reference>
        <span class="headertext" @click="toGoods3">
          <span @click="toBrandStory" style="font-size: 17px">真爱礼物</span>
        </span>
      </template>
      <div>goods3</div>
    </el-popover>
    <el-popover
      placement="bottom"
      title="真爱婚礼"
      trigger="hover"
      :show-after=showAfter
    >
      <template #reference>
        <span class="headertext" @click="toWedding">
          <span @click="toBrandStory" style="font-size: 17px">真爱婚礼</span>
        </span>
      </template>
      <div>wedding</div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const showAfter = 250

    const toBrandStory = () => {
      router.push('/main/brandstory')
    }

    const toGoods1 = () => {
      // store.dispatch('productInfo/getProductSeriesInfo')
      router.push('/main/goods/1')
    }

    const toGoods2 = () => {
      router.push('/main/goods/2')
    }

    const toGoods3 = () => {
      router.push('/main/goods/3')
    }

    const toWedding = () => {
      router.push('/main/wedding')
    }
    return {
      toBrandStory,
      toGoods1,
      toGoods2,
      toGoods3,
      toWedding,
      showAfter
    }
  }
})
</script>

<style scoped lang="less">
.headertext {
  padding: 10px;
}
.headertext:hover {
  color: #5b3f35;
  cursor: pointer;
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
</style>
