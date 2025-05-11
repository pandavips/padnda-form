# Pd Form

A form generator based on Vue 3 and Element Plus, making form building simple and efficient.

English | [简体中文](./README.md)

## Features

- 🚀 **Easy to Use** - Generate forms using JSON configuration, no need to write repetitive code
- 📦 **Rich Components** - Support for all Element Plus form components
- 🛠️ **Flexible Customization** - Support for custom component registration, rich slot configuration
- 🔍 **Complete Type Definitions** - Developed with TypeScript, providing complete type hints
- 📱 **Responsive Layout** - Support for flexible grid layout

## Installation

```bash
# npm
npm install pd-form

# yarn
yarn add pd-form

# pnpm
pnpm add pd-form
```

## Quick Start

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
    label: 'Name',
    type: 'input',
    rules: [{ required: true, message: 'Please enter your name', trigger: 'blur' }]
  },
  {
    prop: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
  }
]
</script>
```

## Form Configuration

### Form Item Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| prop | Field name | string | - |
| label | Label text | string | - |
| type | Form item type | string | 'input' |
| span | Number of grid columns | number (1-24) | 24 |
| show | Whether to show | boolean | true |
| value | Default value | any | '' |
| options | Options configuration (for select, etc.) | Array | [] |
| rules | Validation rules | Array | - |
| attrs | Attributes passed to form controls | Object | {} |
| itemSlots | Form item slots | Object | {} |
| widgetSlots | Widget slots | Object | {} |

### Form Instance Methods

You can access the following properties and methods by getting the form instance through ref:

- `formRef`: Element Plus form instance reference
- `formItemsRefs`: References to all form items
- `widgetRefs`: References to all form controls

## Custom Components

```ts
import { formControllerManager } from 'pd-form'
import MyComponent from './MyComponent.vue'

// Register custom component
formControllerManager.register('my-component', MyComponent)
```

## Development

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build library
pnpm build:lib

# Run tests
pnpm test
```

## License

[MIT](./LICENSE)
