<template>
  <div class="cart_info">
    <div class="left_box">
      <p class="title">
        <span style="font-size: 28px">购物车</span>
        <span style="font-size: 14px; margin-left: 10px">{{order_list.length}}件商品</span>
        <span style="font-size: 14px; margin-left: 366px">已选{{select_num}}件</span>
        <el-checkbox
          style="margin-left: 20px"
          v-model="SelectAll"
          label="全选"
          @change="changeCheckedAll"
          class="check_box"
        ></el-checkbox>
      </p>
      <ul v-for="(item, index) in order_list" :key="index" class="ul">
        <li class="li">
          <img :src="item.img_url" class="order_img" />
          <div class="order_info">
            <div class="info_title">{{ item.title }} {{ item.type }}</div>
            <div class="info_price">￥{{ item.real_price }}</div>
            <div class="other_info">材质：
              <el-select
                  v-model="item.material_name"
                  placeholder=" "
                  class="select_material"
                  size="small"
                  @visible-change="getMaterial($event,item)"
                  @change="changeMaterial(item)"
                >
                  <el-option
                    v-for="(item,index) in material"
                    :key="index"
                    :label="item.label"
                    :value="item.name"
                  >
                    <span>{{ item.name }}</span>
                  </el-option>
                </el-select>
              </div>
            <div class="other_info">尺寸：
              <el-select
                  v-model="item.size"
                  placeholder=" "
                  class="select_material"
                  size="small"
                  @change="changeSize(item)"
                >
                  <el-option
                    v-for="(item,index) in goods_size"
                    :key="index"
                    :label="item.label"
                    :value="item.size"
                  >
                    <span>{{ item.size }}</span>
                  </el-option>
                </el-select>
              </div>
            <div class="engrave_info">镌刻字：
              <span class="engrave_name">{{ item.engrave }}</span>
            </div>
            <div class="bottom_info">
              <span class="put_in_wish" @click="AddWish(item)"><i class="el-icon-star-off"></i><a>加入心愿单</a></span>
              <el-popconfirm title="确定删除这条记录吗?" @confirm="deleteOrder(item)">
                <template #reference>
                  <span class="delete"><i class="el-icon-delete"></i><a>删除</a></span>
                </template>
              </el-popconfirm>
              <el-checkbox v-model="item.checked" @change="changeChecked(item)"></el-checkbox>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right_box">
      <div class="order_message">
        <div class="order_top">订单信息</div>
        <div class="order_inner1">
          <span>小结</span>
          <span class="inner_price">￥{{total_price}}</span>
        </div>
        <div class="order_inner2">
          <span>运费</span>
          <span class="inner_price">￥0</span>
        </div>
        <div class="total_price">
          <span style="font-size:13px">总计</span>
          <span style="font-size:20px">￥{{total_price}}</span>
        </div>
        <div class="wrapToBug">
          <span class="goToBuy">
            <div class="goToBugInner" @click="payGoods">去结算</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const isChecked = ref(true)
    const store = useStore()
    const SelectAll = ref(false)
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
      store.dispatch('orderInfo/getOrders')
    })

    const order_list = computed(() => store.state.orderInfo.order_list)
    const deleteOrder = (item:any) => {
      const order_id = item.id
      store.dispatch('orderInfo/deleteOrder',order_id)
    }

    const select_num = computed(() => store.state.orderInfo.order_list.filter((item:any) => item.checked  === true).length)
    const total_price = computed(() => store.state.orderInfo.order_list.filter((item:any) => item.checked  === true).reduce((preValue:any, item:any) => preValue + item.real_price,0))

    const changeChecked = (item:any) => {
      const orderId = item.id
      const isChecked = item.checked
      const paload = {
        checked:isChecked,
        order_id:orderId
      }
      store.dispatch('orderInfo/changeChecked',paload)
    }

    const changeCheckedAll = () => {
      const paload = {
        checked: SelectAll.value
      }
      store.dispatch('orderInfo/changeCheckedAll',paload)
    }

    const material = computed(() => store.state.productInfo.product_material_info)

    const getMaterial = (callback:any,item:any) => {
      if(callback) {
        const product_id = item.product_id
        store.dispatch('productInfo/getGoodsMaterialInfo',product_id)
      }
    }

    const changeMaterial = (item:any) => {
      let result = material.value.find(function (material:any) {
        return material.name == item.material_name
      })
      const multiple_number = ref(1)
      multiple_number.value = result.price
      const real_price = Math.round(item.price * multiple_number.value)


      const paload = {
        material_name:item.material_name,
        order_id:item.id,
        real_price
      }

      store.dispatch('orderInfo/changeMaterial',paload)
    }



    const changeSize = (item:any) => {
      const paload = {
        size:item.size,
        order_id:item.id
      }
      store.dispatch('orderInfo/changeSize',paload)
    }

    const AddWish = (item:any) => {
      const productId = item.product_id
      store.dispatch('wishInfo/addToWish',productId)
    }

  //结算
    const payGoods = () => {
      store.dispatch('orderInfo/payGoods')
    }
    return {
      SelectAll,
      order_list,
      deleteOrder,
      isChecked,
      changeChecked,
      changeCheckedAll,
      select_num,
      total_price,
      material,
      getMaterial,
      changeMaterial,
      goods_size,
      changeSize,
      AddWish,
      payGoods
    }
  }
})
</script>

<style scoped lang="less">
.cart_info {
  margin-top: 68px;
  display: flex;
  justify-content: center;
}

.left_box {
  /* height: 500px;
  overflow-y: scroll; */
  width: 633px;
}

/* .left_box::-webkit-scrollbar {
  width: 2px;
}

.left_box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(83, 83, 83, 0.2);
}

.left_box::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
} */

.right_box {
  margin-left: 30px;
  width: 479px;
}

.title {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  padding-bottom: 26px;
  border-bottom: 1px solid #22282d;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

.ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.ul .li {
  display: flex;
  padding: 36px 0;
  border-bottom: 1px solid #999ca2;
}

.order_img {
  height: 200px;
  width: 200px;
}

.order_info {
  margin-left: 36px;
  width: 100%;
}

.info_title {
  font-size: 14px;
}

.info_price {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 700;
}

.other_info {
  margin-top: 6px;
  font-size: 14px;
}

.engrave_info {
  margin-top: 6px;
  font-size: 14px;
  line-height: 32px;
  width: 122px;
}

.engrave_name {
  float: right;
  color: #606266;
}

.bottom_info {
  width: 100%;
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.delete {
  margin-right: 160px;
  cursor: pointer;
}

.order_message {
  margin-top: 58px;
  background-color: #f2eded;
  padding: 24px;
}

.order_top {
  font-size: 17px;
  margin-bottom: 30px;
}

.order_inner1 {
  font-size: 14px;
  margin-top: 20px;
}

.order_inner2 {
  font-size: 14px;
  margin-top: 20px;
  padding-bottom: 72px;
  border-bottom: 1px solid black;
}

.inner_price {
  float: right;
}

.total_price {
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.goToBuy {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  height: 54px;
  width: 100%;
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
  height: 54px;
  width: 99%;
  font-size: 15px;
  color: white;
}

.wrapToBug {
  padding-bottom: 60px;
}

.check_box {
  color: black;
}

:deep(.el-checkbox__inner) {
  border-color: #a17f7f;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
  color: #a17f7f;
}

:deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
  border-color: #a17f7f;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #a17f7f;
  border-color: #a17f7f;
}

:deep(.el-input__inner) {
  border: none;
  border-radius: 0;
  text-align: right;
  padding-right: 34px;
  width: 110px;
}

:deep(.el-select .el-input .el-select__caret) {
  color: black;
}

.put_in_wish {
  cursor: pointer;
}

a,a:link{
  cursor: pointer;
  font-size: 16px;
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
