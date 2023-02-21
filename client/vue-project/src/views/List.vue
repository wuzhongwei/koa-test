<template>
  <div class="mt-4">
    <el-input
      v-model="value"
      placeholder="请输入姓名或者手机号搜索"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search" />
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
    <el-pagination class="mt10" background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {Base64} from 'js-base64'
import request from '@/utils/request';
const value = ref('')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const base = function () {
  let token: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsInNjb3BlIjo4LCJpYXQiOjE2NzY5OTcwMzYsImV4cCI6MTY3NzA4MzQzNn0.VXuvnrvDIzd5v4VBgEIQJZSJeyDtmmBc5dyefAnSz6o'
  token = Base64.encode(`${token}:`)
  console.log('token', token)
  return `Basic ${token}`
}
request({
        url: '/api/userList',
        method: 'get',
        headers: {
          Authorization: base()
        }
      }).then((data) => {

      })
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