<template>
  <div>
    goods2
    <div>
      <el-button :disabled="disabled" @click="sendcode" class="sendcode">{{btntxt}}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(false)
    const time = ref(60)
    const btntxt = ref('发送验证码')

    const sendcode = () => {
      time.value = 60,
      timer()
    }

    const timer = () => {
      if (time.value > 0) {
        disabled.value = true
        time.value--
        btntxt.value = time.value + '秒'
        setTimeout(timer, 1000)
      } else {
        time.value = 0
        btntxt.value = '发送验证码'
        disabled.value = false
      }
    }

    return {
      disabled,
      time,
      btntxt,
      sendcode
    }
  }
})
</script>

<style scoped></style>
