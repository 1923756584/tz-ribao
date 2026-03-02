---
title: "关于TZ日报"
date: 2026-03-02T12:00:00+08:00
draft: false
---

# 关于TZ日报

📰 **TZ日报** 是一个专注于AI资讯聚合的日报网站，每日自动抓取来自全球各大AI相关来源的最新动态。

## 🎯 我们的特色

### 1. 聚焦AI产品更新
我们的信息源优先覆盖AI产品发布、功能更新和前沿动态，包括：
- **大厂动态**：OpenAI、Anthropic、Google AI、Microsoft AI等
- **产品发布**：最新AI工具、API、SDK发布信息
- **X平台动态**：AI领域KOL的实时更新

### 2. 智能聚合与翻译
- 🤖 自动抓取50+个RSS源
- 🌐 智能翻译（支持中文）
- 📊 AI重要性评分，自动排序
- 💡 Jina AI智能摘要生成

### 3. 优雅的阅读体验
- 🎨 粉黑色调设计，高级平面风格
- 📱 响应式设计，支持移动端
- 🌙 暗色模式优化
- ⚡ 极速加载，无广告干扰

## 🔍 信息来源

我们的信息源分为9个优先级：

1. **🚀 AI产品更新** (最高优先级)
   - OpenAI、Anthropic、Google AI等官方博客

2. **✨ 产品发布平台**
   - Product Hunt AI、Hugging Face等

3. **𝕏 X平台动态**
   - AI领域KOL的Twitter更新（通过RSSHub获取）

4. **🔥 AI新闻**
   - TechCrunch AI、VentureBeat等专业媒体

5. **📄 AI学术研究**
   - Arxiv论文、MIT News等

6. **📦 开源项目**
   - GitHub、PyTorch、TensorFlow更新

7. **📰 科技媒体**
   - The Verge、Wired等

8. **🇨🇳 中文资讯**
   - 机器之心、量子位、InfoQ等

## ⏰ 更新时间

**每日自动更新**：每晚 23:00 (UTC+8)

通过GitHub Actions自动抓取、处理并部署到GitHub Pages。

## 🛠️ 技术栈

- **抓取引擎**: Node.js + rss-parser
- **翻译服务**: MyMemory、LibreTranslate、DeepL API
- **摘要生成**: Jina AI
- **静态网站**: Hugo + Hextra主题
- **部署**: GitHub Pages + GitHub Actions
- **样式**: 自定义CSS (粉黑色调设计)

## 📊 数据统计

- 📡 **50+** 个RSS源
- 📰 **60+** 条新闻/天
- 🌍 **10+** 个国家/地区
- 🌐 **自动翻译** 为中英文
- ⏱️ **30秒** 内完成抓取处理

## 🔗 相关链接

- 🏠 [网站首页](/)
- 📡 [RSS订阅](/index.xml)
- 💻 [GitHub仓库](https://github.com/1923756584/tz-ribao)
- 🐛 [报告问题](https://github.com/1923756584/tz-ribao/issues)

## 📄 使用说明

### 订阅RSS

```
https://1923756584.github.io/tz-ribao/index.xml
```

### 添加新RSS源

编辑项目中的 `config.js` 文件，添加新的RSS源配置。

### 本地运行

```bash
git clone https://github.com/1923756584/tz-ribao.git
cd tz-ribao
npm install
node fetch-news.js
```

## 🙏 致谢

- [Hextra主题](https://github.com/imfing/hextra)
- [rss-parser](https://github.com/rbren/rss-parser)
- [Jina AI](https://jina.ai)
- [MyMemory翻译API](https://mymemory.translated.net)

## 📧 联系我们

如需反馈问题或建议新功能，请通过以下方式联系我们：

- 🐛 [GitHub Issues](https://github.com/1923756584/tz-ribao/issues)
- 💬 在评论区留言

---

**最后更新**: 2026-03-02

**版本**: v2.0