<template>
  <div class="goods_details">
    <div class="content">
      <div class="left_box">
        <div class="select_img">
          <div
            style="width: 133px; margin-left: 42px"
            v-for="(item, index) in goods_details_img"
            :key="index"
            class="wrap_small_img"
          >
            <img class="small_img" :src="item.detail_img_url" @click="image_change(item.detail_img_url)"/>
          </div>
        </div>
        <div class="display_img">
          <img
            class="big_img"
            :src="goods_details_info.img_url"
          />
        </div>
      </div>
      <div class="right_box">
        <div class="goods_info">
          <div style="font-size: 12px">
            {{ goods_details_info.type }} ——产品编号
            {{ goods_details_info.product_number }}
          </div>
          <div style="font-size: 27px; margin-top: 18px">
            {{ goods_details_info.title }}
          </div>
          <div class="select_box">
            <div class="wrap_select">
              <div class="wrap_material">
                <span class="material_name">材质：</span>
                <el-select
                  v-model="material"
                  placeholder=" "
                  class="select_material"
                  @change="change_material(material)"
                >
                  <el-option
                    v-for="(item,index) in goods_material_info"
                    :key="index"
                    :label="item.label"
                    :value="item.name"
                  >
                    <span style='width:100px'>{{ item.name }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="wrap_material">
                <span class="material_name">主钻：</span>
                <el-select
                  v-model="main_diamond"
                  placeholder=" "
                  class="select_material"
                >
                  <el-option
                    v-for="(item,index) in goods_main_diammond"
                    :key="index"
                    :label="item.label"
                    :value="item.diamond"
                  >
                    <span style='width:100px'>{{ item.diamond }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="wrap_material">
                <span class="material_name">尺寸：</span>
                <el-select
                  v-model="size"
                  placeholder=" "
                  class="select_material"
                >
                  <el-option
                    v-for="(item,index) in goods_size"
                    :key="index"
                    :label="item.label"
                    :value="item.size"
                  >
                    <span style='width:100px'>{{ item.size }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="wrap_engrave_title">
                <span class="engrave_name">免费镌刻：<span style="font-size:13px;color:#9c827d">{{art_word}}</span></span>
                <span class="add_btn" @click="isAddArtWord">点击添加</span>
              </div>
              <div v-if="isShow">
                <div class="wrap_engrave_content">
                  <span class="art_word">是否需要艺术字</span>
                  <el-radio v-model="isNeedArtWord" label="yes" class="left_radio">是</el-radio>
                  <el-radio v-model="isNeedArtWord" label="no">否</el-radio>
                </div>
                <div class="art_word_form">
                  <input v-model="input_art_word" placeholder="限输入长度5个汉字或10个字母" class="art_word_input" maxlength="10"/>
                  <button class="conform_art_word" @click="confirm_art_word">确定</button>
                </div>
              </div>
              <div class="goods_price">￥{{real_price}}</div>
              <div class="toBuyWrap">
                <span class="goToBuy">
                  <div class="goToBugInner" @click="payGoods">立即购买</div>
                </span>
                <span class="goToCart" @click="AddToCart">
                  <div style="display:flex">放入购物车<i class="el-icon-shopping-cart-2"></i></div>
                </span>
              </div>
              <div class="tips">
                <p>配送说明：预计15个工作日送达(限大陆地区),如需加急或者其他地区请咨询客服。</p>
              </div>
              <div class="other_operation">
                <span><i class="el-icon-upload2"></i><a>分享</a></span>
                <span class="put_in_collections" @click="AddWish"><i class="el-icon-star-off"></i><a>加入心愿单</a></span>
                <span><i class="el-icon-phone-outline"></i><a>客服咨询</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const goods_main_diammond = computed(() => [
        {
          diamond:'30分F色'
        },
        {
          diamond:'50分D色'
        },
        {
          diamond:'100分F色'
        },
        {
          diamond:'100分J色'
        },
      ])
    const goods_size = computed(() => [
      {
        size:'5'
      },
      {
        size:'6'
      },
      {
        size:'7'
      },
      {
        size:'8'
      },
      {
        size:'9'
      },
      {
        size:'10'
      },
      {
        size:'11'
      },
      {
        size:'12'
      },
      {
        size:'13'
      },
      {
        size:'14'
      },
      {
        size:'15'
      },
      {
        size:'16'
      },
      {
        size:'17'
      },
      {
        size:'18'
      },
      {
        size:'19'
      },
      {
        size:'20'
      },
      {
        size:'21'
      },
      {
        size:'22'
      },
      {
        size:'23'
      },
      {
        size:'24'
      },
      {
        size:'25'
      },
      {
        size:'26'
      },
      {
        size:'27'
      },
      {
        size:'28'
      },
      {
        size:'29'
      },
      {
        size:'30'
      },
    ])
    onMounted(() => {
      const productId = router.currentRoute.value.params.id
      //请求商品图片
      store.dispatch('productInfo/getGoodsDetailImg', productId)
      //请求商品其他数据
      store.dispatch('productInfo/getGoodsDetailInfo', productId)
      //请求商品材质种类
      store.dispatch('productInfo/getGoodsMaterialInfo', productId)
    })
    //商品图片
    const goods_details_img = computed(
      () => store.state.productInfo.product_detail_img
    )
    //商品信息
    const goods_details_info = computed(
      () => store.state.productInfo.product_detail_info
    )
    //材质信息
    const goods_material_info = computed(
      () => store.state.productInfo.product_material_info
    )

    // const real_price = computed(() => goods_details_info.value.price * goods_material_info)
    const material = ref('白18K金')
    const main_diamond = ref('30分F色')
    const size = ref('5')

    //确认添加刻字
    const isNeedArtWord = ref('yes')
    const input_art_word = ref('')
    const art_word = ref('')
    const isShow = ref(false)
    const isAddArtWord = () => {
      isShow.value = true
    }
    const confirm_art_word = () => {
      isShow.value = false
      art_word.value = input_art_word.value
    }

    //商品详情中图片的切换
    const image_change = (url:any) => {
      store.dispatch('productInfo/changImg',url)
    }

    //动态根据材质不同显示不同价格
    const change_material = (material:any) => {
      let result = goods_material_info.value.find(function (item:any) {
        return item.name == material
      })
      multiple_number.value = result.price
    }
    const multiple_number = ref(1)
    const real_price = computed(() => Math.round(goods_details_info.value.price * multiple_number.value))

    //添加到购物车
    const AddToCart = () => {
      const product = {
        product_id:'',
        size:'',
        material_name:'',
        engrave:'',
        real_price: 0,
        paied:'',
        checked: false
      }
      product.product_id = goods_details_info.value.id
      product.size = size.value
      product.material_name = material.value
      product.engrave = art_word.value
      product.real_price = real_price.value
      product.paied = 'no'
      product.checked = false

      store.dispatch('orderInfo/addOrderInfo',product)
      ElMessage({
          message: '加入购物车成功~',
          duration: 1000,
          type: 'success',
          offset: 128
        })
    }

    //加入心愿单
    const AddWish = () => {
      const productId = router.currentRoute.value.params.id
      store.dispatch('wishInfo/addToWish',productId)
    }

    //购买商品
    const payGoods = () => {
      const product = {
        product_id:'',
        size:'',
        material_name:'',
        engrave:'',
        real_price: 0,
        paied:'',
        checked: false
      }
      product.product_id = goods_details_info.value.id
      product.size = size.value
      product.material_name = material.value
      product.engrave = art_word.value
      product.real_price = real_price.value
      product.paied = 'yes'
      product.checked = false

      store.dispatch('orderInfo/addOrderInfo',product)
      ElMessage({
          message: '购买成功~',
          duration: 1000,
          type: 'success',
          offset: 128
        })
    }

    return {
      goods_details_img,
      goods_details_info,
      goods_material_info,
      material,
      goods_size,
      main_diamond,
      size,
      goods_main_diammond,
      isNeedArtWord,
      input_art_word,
      isAddArtWord,
      isShow,
      confirm_art_word,
      art_word,
      image_change,
      AddToCart,
      change_material,
      real_price,
      AddWish,
      payGoods
    }
  }
})
</script>

<style scoped lang='less'>
.goods_details {
  height: 100%;
  padding: 0 88px;
}

.content {
  display: flex;
  margin-top: 60px;
}

.left_box {
  display: flex;
}

.right_box {
  width: 500px;
  margin-left: 110px;
}

.select_img {
  width: 186px;
}

.display_img {
  width: 632px;
}

.wrap_small_img {
  height: 145px
}

.wrap_small_img:hover .small_img {
  width: 133px;
  height: 133px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid #9c827d;
}

.small_img {
  width: 133px;
  height: 133px;
  margin-bottom: 8px;
  cursor: pointer;
}


.big_img {
  width: 632px;
  height: 632px;
}

.select_box {
  margin-top: 60px;
  height: 252px;
  /* background-color: pink; */
}

.select_material {
  width: 100%;
}

.add_btn {
  color: #9c827d;
  font-size: 15px;
  font-weight: 500;
  padding-right: 10px;
  cursor: pointer;
}

.wrap_material {
  display: flex;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #ebecee;
  justify-content: space-between;
}

.wrap_engrave_title {
  display: flex;
  align-items: center;
  height: 64px;
  justify-content: space-between;
}

.wrap_engrave_content {
  margin-bottom: 20px;
}

.engrave_name {
  font-weight: 700;
  font-size: 15px;
}

.art_word {
  font-size: 12px;
}

.material_name {
  font-weight: 700;
  font-size: 14px;
  width: 60px;
}


:deep(.el-input__inner) {
  border: none;
  border-radius: 0;
  text-align: right;
  padding-right: 34px;
}

:deep(.el-select .el-input .el-select__caret) {
  color: black;
}

.left_radio {
  margin-left: 33px;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #9e8282;
  background-color: #9e8282;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #9e8282;
}

.art_word_input {
  height: 34px;
  width: 350px;
  border: 1px solid #22282d;
  border-radius: 0;
  font-size: 12px;
  text-indent: 16px;
}

.art_word_form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conform_art_word {
  width: 60px;
  height: 38px;
  font-size: 13px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
}

.goods_price {
  font-size: 26px;
  font-weight: 700;
  color: #22282d;
  line-height: 31px;
  margin-top: 26px;
}

.toBuyWrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
}

.goToBuy {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  height: 48px;
  width: 236px;
  cursor: pointer;
}

.goToCart {
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 236px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}

.goToBugInner {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid white;
  border-right: 1px solid white;
  font-weight: 600;
  height: 48px;
  width: 232px;
  font-size: 15px;
  color: white;
}

.el-icon-shopping-cart-2 {
  margin-left: 10px;
  font-size: 18px;
}

.tips {
  font-size: 12px;
  line-height: 14px;
}

.other_operation {
  display: flex;
}

.other_operation span {
  margin-top: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
}

.other_operation a {
  margin-right: 10px;
  font-size: 14px;
}

.other_operation i {
  margin-right: 8px;
}

.el-icon-upload2{
  font-size: 20px;
}

 .el-icon-star-off {
  font-size: 20px;
}

.put_in_collections:hover .el-icon-star-off{
  color: #9c827d;
}

 .el-icon-phone-outline {
  font-size: 20px;
}

a,a:link{
  cursor: pointer;
  font-size: 14px;
	color:black;
	text-decoration:none;
	position:relative;
	padding-bottom: 3px;
}
a:after{
    content: "";
    width: 0;
    height: 2px;
    background: #9c827d;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .3s;
}
a:hover:after,a.active:after{
	left: 0%;
  width: 100%;
}
</style>
