<template>
  <div class="main">
    <el-tabs type="card" v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="添加" name="/add"></el-tab-pane>
      <el-tab-pane label="查询" name="/list"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
const activeName = ref('first')
const router = useRouter();
const route = useRoute();
activeName.value = route.path

const handleClick = (tab: TabPaneName) => {
  router.push(`${tab}`);
}
</script>
<style>

</style>