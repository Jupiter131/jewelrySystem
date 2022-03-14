<template>
  <div>
    <el-table :data="order_list" style="width: 100%" stripe>
      <el-table-column label="宝贝" width="500" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img :src="scope.row.img_url" style="width:100px;height:100px">
            <div class="baby_detail">
              <div>
                {{scope.row.title}} {{scope.row.type}}
              </div>
              <div>
                材质：{{scope.row.material_name}}
              </div>
              <div>
                尺寸：{{scope.row.size}}
              </div>
              <div>
                镌刻字：{{scope.row.engrave}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="120" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center;justify-content: center;">
            <span>{{ scope.row.real_price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80" align="center">
        <template #default="">
          <div style="display: flex; align-items: center;justify-content: center;">
            <span>1</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="实付款" width="120" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center;justify-content: center;">
            <span>{{ scope.row.real_price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="交易状态" width="120" align="center">
        <template #default="">
          <div style="display: flex; align-items: center;justify-content: center;">
            <span>交易成功</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center;justify-content: center;">
            <el-popconfirm title="确定删除这条记录吗?" @confirm="deleteOrder(scope.row)">
                <template #reference>
                  <i class="el-icon-delete" :title="deleteTips"></i>
                </template>
              </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const deleteTips = ref('删除')
    const store = useStore()
    const order_list = computed(() => store.state.orderInfo.paid_order_list)
    onMounted(() => {
      store.dispatch('orderInfo/getOrders')
    })

  const deleteOrder = (item:any) => {
    const order_id = item.id
    store.dispatch('orderInfo/deleteOrder',order_id)
  }
    return {
      order_list,
      deleteTips,
      deleteOrder
    }
  }
})
</script>

<style scoped>
.baby_detail {
  margin-left: 16px;
  text-align: left;
}

.el-icon-delete {
  font-size: 18px;
  cursor: pointer;
}

.el-icon-delete:hover {
  color: red;
}
</style>
