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
      <el-table-column label="操作" width="150">
        <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
      </el-table-column>

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

    <el-dialog @close="close" v-model="dialogFormVisible" title="修改" :close-on-click-modal="false">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" maxlength="100" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="100" />
        </el-form-item>
        <el-form-item label="眼镜架" prop="glasses">
          <el-input v-model="ruleForm.glasses" maxlength="100" />
        </el-form-item>
        <el-form-item label="眼镜片" prop="eyeglass">
          <el-input v-model="ruleForm.eyeglass" maxlength="100" />
        </el-form-item>
        <el-form-item label="太阳镜" prop="sunglasses">
          <el-input v-model="ruleForm.sunglasses" maxlength="100" />
        </el-form-item>
        <el-form-item label="老花镜" prop="oldGlasses">
          <el-input v-model="ruleForm.oldGlasses" maxlength="100" />
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input-number
            v-model="ruleForm.integral"
            :min="1"
            controls-position="right"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary"  @click="submitForm(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {Base64} from 'js-base64'
import type { FormInstance } from 'element-plus'
import request from '@/utils/request';
import { getToken } from '@/utils/auth';
const value = ref('')
const dialogFormVisible = ref(false)

let tableData = ref([])
let currentPage = ref(1);
let pageSizes = ref(4)
let total = ref(0)
let ruleForm = reactive({
  integral: 0, // 积分
  name: '', // 姓名
  phone: '', // 手机号
  glasses: '',  // 眼镜架
  eyeglass: '', // 眼镜片
  sunglasses: '', // 太阳镜
  oldGlasses: '', // 老花镜
})
const base = function () {
  let token: any = getToken()
  token = Base64.encode(`${token}:`)
  return `Basic ${token}`
}
const removeHnalde = (id) => {
  request({
    url: '/api/remove',
    method: 'post',
    headers: {
      Authorization: base()
    },
    data: {
      id
    }
  }).then(({data}) => {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}
const handleEdit = (index, row) => {
  ruleForm = reactive({
    ...row
  })
  dialogFormVisible.value = true
}
const handleDelete = (data, row) => {
  
  ElMessageBox.confirm(
    '确认删除?',
    '',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    tableData.value = tableData.value.filter(item => item.id !== row.id)
    removeHnalde(row.id)
  })
  .catch(() => {
  })
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

let isNext = true
let timer = null
const ruleFormRef = ref<FormInstance>()

const close = () => {
  // ruleFormRef.value.resetFields()

}
const rules = reactive({
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur'},],
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // formEl.resetFields()
  dialogFormVisible.value = false
}
const handleChange = () => {

}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  clearTimeout(timer);
  timer = setTimeout(() => {
    isNext = true
  }, 200)
  if (!isNext) return
  isNext = false
  formEl.validate((valid) => {
    if (valid) {
      request({
        url: '/api/update',
        method: 'post',
        headers: {
          Authorization: base()
        },
        data: {
          ...ruleForm
        }
      }).then((data) => {
        dialogFormVisible.value = false
        if (data.code === 0) {
          ElMessage.success('修改成功');
          init()
        } else {
          ElMessage.error('修改失败');
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
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