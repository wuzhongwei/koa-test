
<template>
  <div class="w1050">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="70px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" maxlength="100" style="width:196px" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone" maxlength="100" style="width:196px" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" maxlength="100" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" maxlength="100" />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"
          placeholder="请输入生日"
          value-format="YYYY-MM-DD"
          style="width:196px"
        />
      </el-form-item>
      <el-form-item label="职业" prop="occupation">
        <el-input v-model="ruleForm.occupation" maxlength="100" />
      </el-form-item>
      <el-form-item label="购买日期" prop="purchaseDate">
        <el-date-picker
          v-model="ruleForm.purchaseDate"
          type="date"
          placeholder="购买日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="取镜日期" prop="takingDate">
        <el-date-picker
          v-model="ruleForm.takingDate"
          type="date"
          placeholder="取镜日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <div></div>
      <el-form-item label="镜架" prop="glasses">
        <el-input v-model="ruleForm.glasses" maxlength="100" style="width:100px" />
      </el-form-item>
      <el-form-item label="镜架型号" prop="glassesModel">
        <el-input v-model="ruleForm.glassesModel" maxlength="100" style="width:100px"  />
      </el-form-item>
      <el-form-item label="镜架颜色" prop="glassescolor">
        <el-input v-model="ruleForm.glassescolor" maxlength="100" style="width:100px"  />
      </el-form-item>
      <el-form-item label="镜架价格" prop="glassesPrice">
        <el-input v-model="ruleForm.glassesPrice" maxlength="100" style="width:100px"  />
      </el-form-item>
      <el-form-item label="镜架售价" prop="glassesSellingPrice">
        <el-input v-model="ruleForm.glassesSellingPrice" maxlength="100" style="width:100px"  />
      </el-form-item>

      <el-form-item label="镜片" prop="eyeglass">
        <el-input v-model="ruleForm.eyeglass" maxlength="100" />
      </el-form-item>
      <el-form-item label="镜片价格" prop="eyeglassPrice">
        <el-input v-model="ruleForm.eyeglassPrice" maxlength="100" />
      </el-form-item>
      <el-form-item label="镜片售价" prop="eyeglassSellingPrice">
        <el-input v-model="ruleForm.eyeglassSellingPrice" maxlength="100" />
      </el-form-item>

      <el-form-item label="总价" prop="totalPrice">
        <el-input v-model="ruleForm.totalPrice" maxlength="100" />
      </el-form-item>
      <el-form-item label="定金" prop="frontmoney">
        <el-input v-model="ruleForm.frontmoney" maxlength="100" />
      </el-form-item>
      <el-form-item label="尚欠" prop="notyetPrice">
        <el-input v-model="ruleForm.notyetPrice" maxlength="100" />
      </el-form-item>


      <!-- <el-form-item label="太阳镜" prop="sunglasses">
        <el-input v-model="ruleForm.sunglasses" maxlength="100" />
      </el-form-item>
      <el-form-item label="老花镜" prop="oldGlasses">
        <el-input v-model="ruleForm.oldGlasses" maxlength="100" />
      </el-form-item> -->
      <el-form-item label="积分" prop="integral">
        <el-input-number
          v-model="ruleForm.integral"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
    </el-form>
    <el-table 
      :data="tableData" 
      border 
      :span-method="objectSpanMethod"
      :header-cell-style="headerStyle"
      stripe
    >
      <el-table-column align="center" prop="name" label=""/>
      <el-table-column align="center" prop="left" label=""/>
      <el-table-column align="center" prop="spheric" label="球镜">
        <template #default="props">
          <el-input v-model="props.row.spheric" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="luminosity" label="光度">
        <template #default="props">
          <el-input v-model="props.row.luminosity" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="axial" label="轴位">
        <template #default="props">
          <el-input v-model="props.row.axial" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="distance" label="瞳距">
        <template #default="props">
          <el-input v-model="props.row.distance" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="height" label="瞳高">
        <template #default="props">
          <el-input v-model="props.row.height" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="corrected" label="矫正视力">
        <template #default="props">
          <el-input v-model="props.row.corrected" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="naked" label="裸眼视力">
        <template #default="props">
          <el-input v-model="props.row.naked" />
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
let isNext = true
let timer = null
let data = [
  {
    name: '远用',
    left: '右',
    spheric: '',
    luminosity: '',
    axial: '',
    distance: '',
    height: '',
    corrected: '',
    naked: '',
  },
  {
    name: '远用',
    left: '左',
    spheric: '',
    luminosity: '',
    axial: '',
    distance: '',
    height: '',
    corrected: '',
    naked: '',
  },
  {
    name: '近用',
    left: '右',
    spheric: '',
    luminosity: '',
    axial: '',
    distance: '',
    height: '',
    corrected: '',
    naked: '',
  },
  {
    name: '近用',
    left: '左',
    spheric: '',
    luminosity: '',
    axial: '',
    distance: '',
    height: '',
    corrected: '',
    naked: '',
  }
]
const tableData = ref(JSON.parse(JSON.stringify(data)))
const ruleFormRef = ref<FormInstance>()
  const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  // columnIndex当前列 rowIndex当前行
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}
const headerStyle = ({row, column, rowIndex, columnIndex}) =>{
  row[0].colSpan = 2
  if (columnIndex === 1) {
    return {
      display: 'none'
    }
  }
}

const ruleForm = reactive({
  integral: 0, // 积分
  name: '', // 姓名
  phone: '', // 手机号
  glasses: '',  // 眼镜架
  eyeglass: '', // 眼镜片
  sunglasses: '', // 太阳镜
  oldGlasses: '', // 老花镜
  degrees: '', // 度数
  age: '', // 年龄
  address: '', // 地址
  birthday: '', // 生日
  occupation: '', // 职业
  purchaseDate: '', // 购买日期
  takingDate: '', // 取镜日期
  glassesModel: '', // 型号
  glassescolor: '', // 颜色
  glassesPrice: '', // 价格
  glassesSellingPrice: '', // 售价
  eyeglassPrice: '', // 价格
  eyeglassSellingPrice: '', // 售价
  totalPrice: '', // 总价
  frontmoney: '', // 定金
  notyetPrice: '', // 尚欠
})


const rules = reactive({
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
  phone: [{ required: true, message: '电话不能为空', trigger: 'blur'},],
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  tableData.value = JSON.parse(JSON.stringify(data))
  formEl.resetFields()
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
        data: {
          action: 'add',
          json: JSON.stringify(tableData.value),
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
<style scoped>
.footer {
  padding: 20px 0;
  text-align: right;
}
</style>