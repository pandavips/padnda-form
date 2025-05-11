# Pd Form

自用的一个小工具.
基于Vue 3和Element Plus的表单生成器，让表单构建变得简单高效。

[English](./README_EN.md) | 简体中文

## 特性

- 🚀 **简单易用** - 使用JSON配置生成表单，无需手动编写重复代码
- 📦 **组件丰富** - 支持Element Plus的所有表单组件
- 🛠️ **灵活定制** - 支持自定义组件注册、丰富的插槽配置
- 🔍 **完整类型定义** - 使用TypeScript开发，提供完整类型提示
- 📱 **响应式布局** - 支持灵活的栅格布局

## 安装

```bash
# npm
npm install pd-form

# yarn
yarn add pd-form

# pnpm
pnpm add pd-form
```

## 快速开始

```vue
<template>
  <Form v-model="formData" :items="formItems" />
</template>

<script setup lang="ts">
import { Form } from 'pd-form'
import { ref } from 'vue'

const formData = ref({})
const formItems = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  }
]
</script>
```

## 表单配置

### 表单项属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域字段名 | string | - |
| label | 标签文本 | string | - |
| type | 表单项类型 | string | 'input' |
| span | 栅格占据的列数 | number (1-24) | 24 |
| show | 是否显示 | boolean | true |
| value | 默认值 | any | '' |
| options | 选项配置（用于select等组件） | Array | [] |
| rules | 校验规则 | Array | - |
| attrs | 传递给表单控件的属性 | Object | {} |
| itemSlots | 表单项插槽 | Object | {} |
| widgetSlots | 控件插槽 | Object | {} |

### 表单实例方法

您可以通过ref获取表单实例，访问以下属性和方法：

- `formRef`: Element Plus的表单实例引用
- `formItemsRefs`: 所有表单项的实例引用
- `widgetRefs`: 所有表单控件的实例引用

## 自定义组件

```ts
import { formControllerManager } from 'pd-form'
import MyComponent from './MyComponent.vue'

// 注册自定义组件
formControllerManager.register('my-component', MyComponent)
```

## 开发贡献

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建库
pnpm build:lib

# 运行测试
pnpm test
```

## 许可证

[MIT](./LICENSE)
