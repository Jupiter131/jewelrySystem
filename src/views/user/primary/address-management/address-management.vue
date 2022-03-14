<template>
  <div class="address_management">
    <div class="wrap_title">
      <div class="title">地址管理</div>
    </div>
    <div class="my_address_table">
      <el-table
        :data="address_list"
        style="width: 100%; font-size: 12px"
        border
      >
        <el-table-column
          class="table_detail"
          prop="receive_name"
          label="收件人姓名"
          width="210"
          align="center"
        />
        <el-table-column
          class="table_detail"
          prop="receive_region"
          label="地区"
          width="210"
          align="center"
        />
        <el-table-column
          class="table_detail"
          prop="receive_address"
          label="详细地址"
          width="281px"
          align="center"
        />
        <el-table-column
          class="table_detail"
          prop="receive_phone"
          label="联系方式"
          width="210px"
          align="center"
        />
        <el-table-column
          class="table_detail"
          prop="operation"
          label="操作"
          width="210px"
          align="center"
        >
          <template #default="scope">
            <el-button
              size="mini"
              type="info"
              plain
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <button class="addAddress" @click="addAddress">添加收货地址</button>
      <el-dialog v-model="dialogVisible" width="33%">
        <template #title>
          <span class="dialog_title">编辑收货地址</span>
        </template>
        <el-form ref="formRef" label-width="120px" style="width: 468px">
          <el-form-item label="收件人：">
            <el-input
              v-model="receive_name"
              placeholder="请您填写收件人姓名"
              :maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item label="地区：">
            <el-select v-model="receive_region" placeholder="请选择" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input
              v-model="receive_address"
              placeholder="请您填写收件人详细地址"
              :maxlength="48"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input
              v-model="receive_phone"
              placeholder="请您填写收件人手机号码"
              :maxlength="11"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="keep">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const props = {
      expandTrigger: 'hover'
    }
    const store = useStore()
    const address_list = computed(() => store.state.userInfo.addressList)
    const handleDelete = (index: any, row: any) => {
      const address_id = row.id
      store.dispatch('userInfo/DeleteAddressAction', address_id)
    }
    onMounted(() => {
      store.dispatch('userInfo/GetAddressListAction')
    })

    const dialogVisible = ref(false)
    const receive_name = ref('')
    const receive_region = ref('')
    const receive_address = ref('')
    const receive_phone = ref('')
    const addressId = ref('')

    const handleEdit = (index: any, row: any) => {
      receive_name.value = row.receive_name
      receive_region.value = row.receive_region
      receive_address.value = row.receive_address
      receive_phone.value = row.receive_phone
      addressId.value =  row.id
      dialogVisible.value = true
    }

    const addAddress = () => {
      dialogVisible.value = true
      receive_name.value = ''
      receive_region.value = ''
      receive_address.value = ''
      receive_phone.value = ''
      addressId.value =  ''
    }

    const options = [
      {
        value: '广东',
        label: '广东',
      },
      {
        value: '北京',
        label: '北京',
      },
      {
        value: '河北',
        label: '河北',
      },
      {
        value: '山西',
        label: '山西',
      },
      {
        value: '辽宁',
        label: '辽宁',
      },
      {
        value: '吉林',
        label: '吉林',
      },
      {
        value: '黑龙江',
        label: '黑龙江',
      },
      {
        value: '江苏',
        label: '江苏',
      },
      {
        value: '浙江',
        label: '浙江',
      },
      {
        value: '安徽',
        label: '安徽',
      },
      {
        value: '福建',
        label: '福建',
      },
      {
        value: '江西',
        label: '江西',
      },
      {
        value: '山东',
        label: '山东',
      },
      {
        value: '河南',
        label: '河南',
      },
      {
        value: '湖北',
        label: '湖北',
      },
      {
        value: '湖南',
        label: '湖南',
      },
      {
        value: '海南',
        label: '海南',
      },
      {
        value: '四川',
        label: '四川',
      },
      {
        value: '贵州',
        label: '贵州',
      },
      {
        value: '云南',
        label: '云南',
      },
      {
        value: '陕西',
        label: '陕西',
      },
      {
        value: '甘肃',
        label: '甘肃',
      },
      {
        value: '青海',
        label: '青海',
      },
      {
        value: '台湾',
        label: '台湾',
      },
      {
        value: '内蒙古',
        label: '内蒙古',
      },
      {
        value: '广西',
        label: '广西',
      },
      {
        value: '西藏',
        label: '西藏',
      },
      {
        value: '宁夏',
        label: '宁夏',
      },
      {
        value: '新疆',
        label: '新疆',
      },
      {
        value: '天津',
        label: '天津',
      },
      {
        value: '上海',
        label: '上海',
      },
      {
        value: '重庆',
        label: '重庆',
      },
      {
        value: '香港',
        label: '香港',
      },
      {
        value: '澳门',
        label: '澳门',
      },
    ]

    const keep = () => {
      dialogVisible.value = false
      const paload = {
        addressId:addressId.value,
        receive_name: receive_name.value,
        receive_region: receive_region.value,
        receive_address: receive_address.value,
        receive_phone: receive_phone.value
      }
      if(paload.addressId === '') {
        store.dispatch('userInfo/CreateAddressAction',paload)
      }else{
        store.dispatch('userInfo/ManageAddressAction',paload)
      }
    }
    return {
      address_list,
      handleDelete,
      dialogVisible,
      handleEdit,
      receive_name,
      receive_region,
      receive_address,
      receive_phone,
      props,
      options,
      keep,
      addAddress
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

.my_address_table {
  display: grid;
  padding: 30px 36px;
}

.table_detail {
  background-color: #666;
}

:deep(.el-table thead) {
  color: #666;
}

.el-table :deep(th.is-leaf) {
  background-color: rgb(247, 247, 247);
}

.addAddress {
  cursor: pointer;
  border: 1px solid #9c827d;
  background-color: #fff;
  color: #9c827d;
  margin: 20px auto;
  font-size: 14px;
  width: 120px;
  height: 30px;
}

.addAddress:hover {
  color: #fff;
  background-color: #9c827d;
}

.dialog_title {
  font-size: 14px;
  font-weight: 700;
  color: #9c827d;
}

:deep(.el-dialog__body) {
  padding: 30px 0 0 0;
}
</style>
