<template>
 <div class="body">
  <van-search show-action @search="onSearch" v-model="search" placeholder="请输入手机号或者姓名搜索">
    <template #action>
      <div @click="onSearch">搜索</div>
    </template>
  </van-search>  
  
  <van-cell-group v-if="Object.keys(tableData).length">
    <van-cell title="姓名" :value="tableData.name || '暂无数据'" />
    <van-cell title="镜架" :value="tableData.glasses || '暂无数据'" />
    <van-cell title="镜片" :value="tableData.eyeglass || '暂无数据'" />
    <van-cell title="度数" :value="tableData.degrees || '暂无数据'" />
  </van-cell-group>
 <div class="tc" v-else>
  <div v-if="!tableData.length">暂时数据</div>
</div>
 </div>
</template>
<script lang="ts" setup>
import { showLoadingToast } from 'vant';
import 'vant/lib/index.css';
import { ref } from 'vue';
import request from '@/utils/request';

let currentPage = ref(1);
let pageSizes = ref(10)
let total = ref(0)
let tableData = ref([])
let search = ref('')

const onSearch = (val) => {
  init()
}
const init = () => {
  let loading = showLoadingToast({
    duration: 0,
    message: '加载中...',
    forbidClick: true,
  });
  request({
    url: '/api/userListNoAuth',
    method: 'get',
    params: {
      phone: search.value 
    }
  }).then(({data}) => {
    tableData.value = data || {}
  }).finally(() => {
    loading.close()
  })
}
// init()
</script>
<style scoped>
.body {
  background-color: #eff2f5;
  height: 100%;
}
.tc {
  text-align:center;
  margin: 10px 0;
}
</style>