<template>
  <div class="example-container">
    <h2>基础表单示例</h2>
    <Form v-model="formData" :items="formItems" />
    
    <div class="form-actions">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
    
    <div v-if="submitted" class="result-container">
      <h3>表单提交数据</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '../src/core'
import { ElButton } from 'element-plus'

const formData = ref({})
const submitted = ref(false)

// 表单项配置
const formItems = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    attrs: {
      placeholder: '请输入姓名'
    }
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    rules: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    attrs: {
      placeholder: '请输入手机号'
    }
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio-group',
    span: 24,
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' }
    ]
  },
  {
    prop: 'interests',
    label: '兴趣爱好',
    type: 'checkbox-group',
    span: 24,
    options: [
      { label: '阅读', value: 'reading' },
      { label: '旅行', value: 'travel' },
      { label: '音乐', value: 'music' },
      { label: '电影', value: 'movie' },
      { label: '运动', value: 'sports' }
    ]
  },
  {
    prop: 'education',
    label: '学历',
    type: 'select',
    span: 12,
    options: [
      { label: '高中', value: 'highschool' },
      { label: '大专', value: 'college' },
      { label: '本科', value: 'bachelor' },
      { label: '硕士', value: 'master' },
      { label: '博士', value: 'phd' }
    ],
    attrs: {
      placeholder: '请选择学历'
    }
  },
  {
    prop: 'birthday',
    label: '出生日期',
    type: 'date-picker',
    span: 12,
    attrs: {
      type: 'date',
      placeholder: '选择日期'
    }
  },
  {
    prop: 'description',
    label: '个人简介',
    type: 'input',
    span: 24,
    attrs: {
      type: 'textarea',
      rows: 4,
      placeholder: '请输入个人简介'
    }
  }
]

// 表单提交
const submitForm = () => {
  submitted.value = true
  console.log('表单数据:', formData.value)
}

// 表单重置
const resetForm = () => {
  formData.value = {}
  submitted.value = false
}
</script>

<style scoped>
.example-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.result-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

pre {
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
