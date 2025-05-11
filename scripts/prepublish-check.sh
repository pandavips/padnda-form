#!/bin/bash

# 确保脚本在任何错误时退出
set -e

echo "================================================"
echo "开始准备 Pd Form 发布..."
echo "================================================"

# 清理和构建
echo "正在清理旧的构建文件..."
rm -rf dist

echo "正在构建库文件..."
pnpm build

# 创建临时目录用于测试打包
echo "正在创建临时目录进行打包测试..."
TEMP_DIR=$(mktemp -d)
echo "临时目录: $TEMP_DIR"

# 复制package.json和其他必要文件到临时目录
echo "正在复制必要文件到临时目录..."
cp package.json README.md README_EN.md LICENSE CHANGELOG.md "$TEMP_DIR"
cp -r dist "$TEMP_DIR"

# 进入临时目录
cd "$TEMP_DIR"

# 使用npm pack打包但不发布
echo "正在打包测试..."
npm pack

# 解压生成的tgz文件到另一个临时目录进行检查
echo "正在解压tgz文件以检查内容..."
EXTRACT_DIR="$TEMP_DIR/extract"
mkdir -p "$EXTRACT_DIR"
tar -xzf *.tgz -C "$EXTRACT_DIR"

echo "================================================"
echo "打包内容概览:"
echo "================================================"

# 列出包内容
echo "正在列出包内容..."
find "$EXTRACT_DIR/package" -type f | sort | sed 's|'"$EXTRACT_DIR/package"'/||'

echo "================================================"
echo "打包测试完成!"
echo "检查上面的列表，确保所有需要的文件都已包含，并且没有不需要的文件。"
echo "如果一切正常，你可以运行 'npm publish' 来发布包。"
echo "================================================"

# 清理临时目录
echo "清理临时文件..."
rm -rf "$TEMP_DIR"

echo "完成!"
