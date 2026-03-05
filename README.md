# TZ日报

> 每日AI资讯聚合

## 🚀 快速开始

### 1. 创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名填写：`tz-ribao`
3. 选择 **Public**
4. 点击 **Create repository**

### 2. 上传代码

在终端执行：

```bash
cd ~/TZ-ribao
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/1923756584/tz-ribao.git
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **gh-pages**，目录选 **/(root)**
4. 保存

### 4. 启用 Actions

1. 进入仓库 **Settings** → **Actions** → **General**
2. 勾选 **Read and write**
3. 保存

### 5. 第一次手动运行

1. 进入仓库 **Actions** 页面
2. 点击 **Daily Update**
3. 点击 **Run workflow** → **Run workflow**

### 6. 查看网站

等待约 2 分钟，访问：`https://1923756584.github.io/tz-ribao/`

---

## ⚙️ 自定义 RSS 源

编辑 `config.js` 文件：

```javascript
sources: [
  // 在这里添加新的 RSS 源
  { name: '新站名', url: 'RSS地址', category: '分类' },
]
```

添加后提交更改即可。

---

## 📅 自动更新时间

目前配置为 **每天 23:00** 自动更新。

如需修改，编辑 `.github/workflows/daily.yml`：

```yaml
schedule:
  - cron: '0 23 * * *'  # 每天23点
```

---

## 📁 项目结构

```
TZ-ribao/
├── config.js          # RSS 源配置
├── fetch-news.js      # 抓取脚本
├── package.json       # 项目配置
├── hugo/              # Hugo 网站配置
│   ├── config.toml
│   └── content/       # 生成的新闻内容
└── .github/
    └── workflows/
        └── daily.yml  # 自动更新配置
```

---

## ❓ 常见问题

**Q: 网站显示 404？**
A: 确认 GitHub Pages 已启用，并等待 2 分钟让 Actions 完成第一次部署。

**Q: 想手动更新？**
A: 进入 Actions → Daily Update → Run workflow

**Q: RSS 源不工作？**
A: 检查 config.js 中的 URL 是否正确，有些网站可能需要代理。

---

有问题请提 Issue！
# Test
test: 手动触发工作流测试 2026年 3月 6日 星期五 00时12分16秒 CST
force refresh 2026年 3月 6日 星期五 00时29分08秒 CST
