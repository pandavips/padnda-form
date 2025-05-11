# Panda Form 发布指南

本文档提供了如何发布 Pd Form 到 npm 的详细步骤。

## 发布准备

在发布新版本之前，请确保完成以下步骤：

1. 确保所有功能开发和 bug 修复已完成
2. 确保所有测试通过 (`pnpm test`)
3. 确保文档已更新，包括 README 和 CHANGELOG
4. 更新 package.json 中的版本号

## 发布流程

### 1. 检查发布内容

使用预发布检查脚本来验证将要发布的文件内容是否正确：

```bash
pnpm prepublish-check
```

这个脚本会构建项目、创建一个临时的 npm 包、并列出包含的文件，以便你可以检查是否有任何遗漏或多余的文件。

### 2. 登录 npm

确保你已经登录到 npm 账号：

```bash
npm login
```

### 3. 发布包

发布前确保你有权限发布此包。然后运行：

```bash
pnpm publish:npm
```

这将构建并发布包到 npm。

### 4. 验证发布

发布完成后，请验证包已经成功发布，并且可以正常安装使用：

```bash
# 创建一个临时目录
mkdir -p /tmp/test-panda-form && cd /tmp/test-panda-form

# 初始化项目
npm init -y

# 安装刚发布的包
npm install panda-form
```

## 版本更新指南

遵循[语义化版本控制](https://semver.org/lang/zh-CN/)原则：

- **主版本号**：当你做了不兼容的 API 修改
- **次版本号**：当你做了向下兼容的功能性新增
- **修订号**：当你做了向下兼容的问题修正

## 自动化发布

项目配置了 `semantic-release`，你也可以使用它来自动处理版本管理和发布：

```bash
pnpm semantic-release
```

这将根据提交信息自动确定版本号、生成变更日志、创建 GitHub 发布和发布到 npm。
