<template>
  <div class="w1050 tr"><el-button class="out" @click="outHandle">退出登录</el-button></div>
  <v-sidebar class="w1050" />
  <router-view class="w1050"></router-view>
</template>
<script lang="ts" setup>
import { removeToken } from '@/utils/auth'
import vSidebar from '../components/sidebar.vue';
const outHandle = () => {
  removeToken()
  location.reload()
}
</script>
<style scoped>
.tr {
  text-align: right;
}
.out {
  text-align: right; margin: 10px 0 0;
}
</style>