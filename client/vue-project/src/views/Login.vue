<template>
  <div class="login-wrapper">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :rules="rules" ref="login" :model="formInline" class="ms-content">
        <el-form-item prop="account">
          <el-input v-model="formInline.account" placeholder="请输入用户名">
            <template #prepend><el-button :icon="User"></el-button></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input @keyup.enter="submitForm(login)" :type="passwordType?'text':'password'" v-model="formInline.password" placeholder="请输入密码">
            <template #prepend><el-button :icon="Lock"></el-button></template>
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <el-icon v-if="passwordType"><View /></el-icon>
            <el-icon v-else><Hide /></el-icon>
          </span>
        </el-form-item>
        <el-form-item><div class="jizhu"><el-checkbox v-model="checked1" label="记住密码" size="large" /></div></el-form-item>
        <div class="btn-wrapper"><el-button type="primary" @click="submitForm(login)" :loading="loading">登录</el-button></div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User, View, Hide } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { setToken } from '@/utils/auth';
import request from '@/utils/request';
import {useUserStore} from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const account = localStorage.getItem('account') || ''
const password = localStorage.getItem('password') || ''
let takeNotes: any = localStorage.getItem('takeNotes') || true
if (takeNotes) {
  takeNotes = JSON.parse(takeNotes)
}
const formInline = reactive({
  account, // admin
  password, // admin123
})
const passwordType = ref(false)
const checked1 = ref(takeNotes)
const loading = ref(false)
const rules = {
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const login = ref<FormInstance>();
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
const showPwd = () =>{
  passwordType.value = !passwordType.value
}
const submitForm = (formEl) => {
  if (!formEl) return;
  loading.value = true
  formEl.validate((valid: boolean) => {
    if (valid) {
      request({
        url: '/api/token',
        method: 'post',
        data: {
          ...formInline,
          type: '101'
        }
      }).then((data) => {
        if (data.code === 0) {
          ElMessage.success('登录成功');
          if (checked1.value) {
            localStorage.setItem('account', formInline.account)
            localStorage.setItem('password', formInline.password)
          } else {
            localStorage.removeItem('account')
            localStorage.removeItem('password')
          }
          localStorage.setItem('takeNotes', JSON.stringify(checked1.value))
          data = data.data
          setToken(data.token)
          userStore.token = data.token
          const redirect: any = route.query.redirect || ''
          router.push({
            path: redirect,
            query: getOtherQuery(route.query)
          });
        } else {
          ElMessage.error(data.message);
        }
        
      }).finally(() => {
        loading.value = false
      })
    } else {
      // ElMessage.error('登录成功');
      return false;
    }
  });
};

</script>
  
<style scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/login-bg.jpg);
  background-size: 100%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255,255,255,.3);
  overflow: hidden;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  border-bottom: 1px solid #ddd;
}
.ms-content {
  padding: 30px;
}
.btn-wrapper button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  cursor: pointer;
  user-select: none;
}
.jizhu {
  position: absolute;
  right: 0;
}
.jizhu :deep(.el-checkbox__label) {
  color: #000;
}

</style>