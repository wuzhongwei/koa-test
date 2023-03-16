<template>
  <div>
    <div class="mt-4">
      <el-input
        v-model="value"
        placeholder="请输入姓名或者电话搜索"
        class="input-with-select"
        @keyup.enter="seatchHandle"
      >
        <template #append>
          <el-button :icon="Search" @click="seatchHandle" />
        </template>
      </el-input>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="birthday" label="生日"  width="120" />
      <el-table-column prop="occupation" label="职业" />
      <el-table-column prop="purchaseDate" label="购买日期" width="120" />
      <el-table-column prop="takingDate" label="取镜日期" width="120" />

      <el-table-column prop="glasses" label="镜架" />
      <el-table-column prop="glassesModel" label="镜架型号" width="120" />
      <el-table-column prop="glassescolor" label="镜架颜色" width="120" />
      <el-table-column prop="glassesPrice" label="镜架价格" width="120" />
      <el-table-column prop="glassesSellingPrice" label="镜架售价" width="120" />
      <el-table-column prop="eyeglass" label="镜片" />
      <el-table-column prop="eyeglassPrice" label="镜片价格" width="120" />
      <el-table-column prop="eyeglassSellingPrice" label="镜片售价" width="120" />
      <el-table-column prop="totalPrice" label="总价" />
      <el-table-column prop="frontmoney" label="定金" />
      <el-table-column prop="integral" label="尚欠" />
      <el-table-column label="操作" width="150" fixed="right">
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

    <el-dialog 
      @close="close" 
      v-model="dialogFormVisible" 
      title="修改" 
      :close-on-click-modal="false"
      width="1200"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
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
      <el-form-item label="积分" prop="integral">
        <el-input-number
          v-model="ruleForm.integral"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      </el-form>
      <el-table 
        :data="tableDataOne" 
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

import type { FormInstance } from 'element-plus'
import request from '@/utils/request';
let data = [
  {
    name: '远用',
    left: '右眼',
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
    left: '左眼',
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
    left: '右眼',
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
    left: '左眼',
    spheric: '',
    luminosity: '',
    axial: '',
    distance: '',
    height: '',
    corrected: '',
    naked: '',
  }
]
const value = ref('')
const tableDataOne = ref(data)
const dialogFormVisible = ref(false)
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
let tableData = ref([])
let currentPage = ref(1);
let pageSizes = ref(10)
let total = ref(0)
let ruleForm = reactive({
  integral: 0, // 积分
  name: '', // 姓名
  phone: '', // 电话
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

const removeHnalde = (id) => {
  request({
    url: '/api/remove',
    method: 'post',
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
  if (row.json) {
    tableDataOne.value = JSON.parse(row.json)
  } else {
    tableDataOne.value = data
  }
  
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

const close = () => {
  // ruleFormRef.value.resetFields()

}
const rules = reactive({
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
  phone: [{ required: true, message: '电话不能为空', trigger: 'blur'},],
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // formEl.resetFields()
  dialogFormVisible.value = false
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
      console.log('www',tableDataOne.value, JSON.stringify(tableDataOne.value))
      request({
        url: '/api/update',
        method: 'post',
        data: {
          ...ruleForm,
          json: JSON.stringify(tableDataOne.value),
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