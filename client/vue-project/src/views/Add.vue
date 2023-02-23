
<template>
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
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import {Base64} from 'js-base64';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
import { getToken } from '@/utils/auth';
let isNext = true
let timer = null
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  integral: 0, // 积分
  name: '', // 姓名
  phone: '', // 手机号
  glasses: '',  // 眼镜架
  eyeglass: '', // 眼镜片
  sunglasses: '', // 太阳镜
  oldGlasses: '', // 老花镜
})


const rules = reactive({
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur'},],
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const handleChange = () => {

}
const base = function () {
  let token: any = getToken()
  token = Base64.encode(`${token}:`)
  return `Basic ${token}`
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
        url: '/api/create',
        method: 'post',
        headers: {
          Authorization: base()
        },
        data: {
          action: 'add',
          ...ruleForm
        }
      }).then((data) => {
        if (data.code === 0) {
          ElMessage.success('添加用户成功');
          ruleFormRef.value.resetFields()
        } else {
          ElMessage.error('创建用户失败');
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

</style>