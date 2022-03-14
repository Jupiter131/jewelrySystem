<template>
  <div class="footer">
    <div class="footer-icon">
      <div class="icon-list">
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon1" alt=""/>
          <span class="icon_text1">权威认证</span>
          <span class="icon_text2">国际专业鉴定GIA证书 保障钻石品质</span>
        </span>
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon2" alt=""/>
          <span class="icon_text1">一钻双证</span>
          <span class="icon_text2">提供国际 国内权威证书</span>
        </span>
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon3" alt=""/>
          <span class="icon_text1">终身免费护理</span>
          <span class="icon_text2">免费钻戒专业体验和清洗保养服务</span>
        </span>
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon4" alt=""/>
          <span class="icon_text1">全程保险</span>
          <span class="icon_text2">为爱保价速递 购物无忧</span>
        </span>
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon5" alt=""/>
          <span class="icon_text1">会员专享</span>
          <span class="icon_text2">加入真爱俱乐部 享终身特权服务</span>
        </span>
        <span style="display: grid; text-align: center">
          <img style="width: 40px;margin:0 auto" :src="imgUrl.footerIcon6" alt=""/>
          <span class="icon_text1">全球免运费</span>
          <span class="icon_text2">默认全程顺丰保价速递 您无需承担任何费用</span>
        </span>
      </div>
    </div>
    <div class="footer-menu">
      <div class="footer-content">
        <div class="info-left">
          <div class="info-tag">
            <div class="footer-top"><i class="el-icon-phone-outline"></i> <span class="btn-text">联系我们</span></div>
            <ul style="list-style-type:none">
              <li><a href="">公司简介</a></li>
              <li><a href="">商务合作</a></li>
              <li><a href="">联系我们</a></li>
            </ul>
            <div class="footer-btn"><i class="el-icon-user"></i> <span class="btn-text">店员登录</span></div>
            <div class="footer-btn"><i class="el-icon-reading"></i> <span class="btn-text">隐私政策</span></div>
            <div class="footer-btn"><i class="el-icon-apple"></i> <span class="btn-text">简体中文</span></div>
          </div>
          <div class="info-tag">
            <div class="footer-top"><i class="el-icon-coffee-cup"></i> <span class="btn-text">服务</span></div>
            <ul style="list-style-type:none">
              <li><a href="">专属定制</a></li>
              <li><a href="">售后服务</a></li>
              <li><a href="">费用标准</a></li>
              <li><a href="">购买规则</a></li>
              <li><a href="">购买流程</a></li>
              <li><a href="">专业认证</a></li>
              <li><a href="">咨询中心</a></li>
              <li><a href="">品牌专题</a></li>
            </ul>
          </div>
          <div class="info-tag">
            <div class="footer-top"><i class="el-icon-present"></i> <span class="btn-text">真爱体验店</span></div>
            <ul style="list-style-type:none">
              <li><a href="">附近体验店</a></li>
            </ul>
          </div>
        </div>
        <div class="info-right">
          <div class="footer-top"><i class="el-icon-present"></i> <span class="btn-text">扫码关注我们</span></div>
          <div class="code-image">
            <img :src=imgUrl.code style="width:107px;margin-right:42px" >
            <img :src=imgUrl.avatar style="width:107px" >
          </div>
          <div class="end_text">
            抢先了解最新设计，特别活动，新店开张等更多消息
          </div>
        </div>
      </div>
    </div>
    <div class="nothing"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const imgUrl = {
      footerIcon1:
        'https://res.darryring.com/webimg/index/footer_icon_01.png',
      footerIcon2:
        'https://res.darryring.com/webimg/index/footer_icon_02.png',
      footerIcon3:
        'https://res.darryring.com/webimg/index/footer_icon_03.png',
      footerIcon4:
        'https://res.darryring.com/webimg/index/footer_icon_04.png',
      footerIcon5:
        'https://res.darryring.com/webimg/index/footer_icon_05.png',
      footerIcon6:
        'https://res.darryring.com/webimg/index/footer_icon_06.png',
      code:
        'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/code.jpg?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=1650409104&Signature=x2%2F%2FTJGuVwzTtrjwKoLBddXKNco%3D',
      avatar:
        'https://lqsystem.oss-cn-guangzhou.aliyuncs.com/Jupiter.jpg?OSSAccessKeyId=LTAI5t7uqRQur3W2ywVE2yQ2&Expires=101641820855&Signature=YS2%2BAHsW9gioJot2Z8xnnAG9ddg%3D'
    }

    return {
      imgUrl
    }
  }
})
</script>

<style scoped>
.footer {
  width: 100%;
}

.footer-icon {
  display: flex;
  justify-content: center;
  margin: 100px 80px;
  height: 108px;
}

.icon-list {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}

.footer-menu {
  padding: 0;
  height: 380px;
  background-color: #696665;
}

.nothing {
  height: 60px;
}

.icon_text1{
  font-size: 14px;
  margin-top: 14px;
}

.icon_text2 {
  font-size: 12px;
  line-height: 24px;
  margin-top: 10px;
}

.footer-content {
  padding: 54px 0;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1400px;
}

.info-left{
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin-left: 5rem;
}

.info-tag {
  margin-right: 14%;
}

.info-right {
  margin-right: 5rem;
}

a,a:link{
	color:#adaaa9;
	text-decoration:none;
	position:relative;
	padding-bottom: 3px;
}
a:after{
    content: "";
    width: 0;
    height: 2px;
    background: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .8s;
}
a:hover:after,a.active:after{
	left: 0%;
    width: 100%;
}

ul {
  margin-left: 20px;
  margin-bottom: 30px;
  padding: 0;
}
li {
  margin-top: 15px;
}

.footer-top {
  color: white;
}

.footer-btn{
  margin-bottom: 30px;
  color: white;
}

.code-image{
  margin-top: 27px;
}

.end_text {
  font-size: 14px;
  line-height: 30px;
  width:260px;
  margin-top:12px;
  color: white;
}
</style>
