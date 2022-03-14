<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,onBeforeMount } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  created: function () {
    const isHasToken = localCache.getCache('token')

    if (!isHasToken) {
      localCache.setCache('id', 56)
    }
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('login/getUserInfoAction')
    })
  }
})
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
