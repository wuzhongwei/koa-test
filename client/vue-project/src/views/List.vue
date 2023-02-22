<template>
  <div>
    <div class="mt-4">
      <el-input
        v-model="value"
        placeholder="请输入姓名或者手机号搜索"
        class="input-with-select"
        @keyup.enter="seatchHandle"
      >
        <template #append>
          <el-button :icon="Search" @click="seatchHandle" />
        </template>
      </el-input>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="glasses" label="眼镜架" />
      <el-table-column prop="eyeglass" label="眼镜片" />
      <el-table-column prop="sunglasses" label="太阳镜" />
      <el-table-column prop="oldGlasses" label="老花镜" />
      <el-table-column prop="integral" label="积分" />
    </el-table>
    <div class="mt10">
      <el-pagination 
        :page-size="pageSizes"
        class="mt10" 
        background layout="prev, pager, next" 
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {Base64} from 'js-base64'
import request from '@/utils/request';
import { getToken } from '@/utils/auth';
const value = ref('')

let tableData = ref([])
let currentPage = ref(1);
let pageSizes = ref(4)
let total = ref(0)
const base = function () {
  let token: any = getToken()
  token = Base64.encode(`${token}:`)
  return `Basic ${token}`
}
const currentChange = (val) => {
  currentPage.value = val
  init()
}
const init = () => {
  request({
    url: '/api/userList',
    method: 'get',
    headers: {
      Authorization: base()
    },
    params: {
      currentPage: currentPage.value,
      pageSizes: pageSizes.value
    }
  }).then(({data}) => {
    tableData.value = data.list
    total.value = data.total
  })
}
const seatchHandle = () => {
  request({
    url: '/api/userList',
    method: 'get',
    headers: {
      Authorization: base()
    },
    params: {
      phone: value.value
    }
  }).then(({data}) => {
    tableData.value = data.list
    total.value = data.total
  })
}
init()
</script>
<style>
.mt-4 {
  margin-bottom: 10px;
  width: 400px;
}
.mt10 {
  margin-top: 10px;
  display: flex;
  justify-content: right;
}
</style>