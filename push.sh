#!/bin/bash
# TZ日报 - 一键推送脚本

echo "🚀 开始推送代码到 GitHub..."
cd ~/TZ-ribao

# 检查是否已有远程仓库
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "📡 添加远程仓库..."
    git remote add origin https://github.com/1923756584/tz-ribao.git
fi

echo "📤 推送代码..."
git push -u origin main

echo "✅ 推送完成！"
