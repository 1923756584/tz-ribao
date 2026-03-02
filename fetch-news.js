/**
 * TZ日报 - 新闻抓取脚本 v2.0
 * 功能：从 RSS 源抓取新闻，生成 Markdown 文件，自动翻译为中文
 * 特性：支持X平台、增强错误处理、智能摘要、超时重试
 */

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// 创建带超时和重试功能的fetch包装器
async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TZ-Ribao/1.0)',
        ...options.headers
      }
    });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}

// 带重试机制的fetch
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchWithTimeout(url, options, config.timeout?.rss || 30000);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`   请求失败，${delay}ms后重试 (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// RSS解析器配置
const parser = new Parser({
  timeout: config.timeout?.rss || 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; TZ-Ribao/1.0)'
  }
});

// 缓存对象
const cache = {
  translations: new Map(),
  fetchResults: new Map()
};

// Jina AI摘要生成
async function generateSummaryWithJina(url) {
  try {
    const jinaUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
    const response = await fetchWithRetry(jinaUrl, {}, 2, 1000);
    
    if (response.ok) {
      const text = await response.text();
      // 提取前200字符作为摘要
      const summary = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      return summary.slice(0, 300) + (summary.length > 300 ? '...' : '');
    }
  } catch (error) {
    console.log(`   Jina AI摘要生成失败: ${error.message}`);
  }
  return null;
}

// 翻译函数 - 使用多个备用API
async function translate(text) {
  if (!text || text.trim() === '') return text;
  
  // 如果已经是中文，直接返回
  const chineseRegex = /[\u4e00-\u9fa5]/;
  if (chineseRegex.test(text)) return text;
  
  // 检查缓存
  const cacheKey = text.slice(0, 100);
  if (cache.translations.has(cacheKey)) {
    return cache.translations.get(cacheKey);
  }
  
  // 限制文本长度
  const truncated = text.slice(0, 800);
  
  // 尝试多个翻译 API
  const apis = [
    // MyMemory API - 最稳定的免费翻译
    async () => {
      const encodedText = encodeURIComponent(truncated);
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|zh-CN`);
      if (response.ok) {
        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData.translatedText) {
          return data.responseData.translatedText;
        }
      }
      return null;
    },
    // LibreTranslate (公共实例)
    async () => {
      const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: truncated, source: 'en', target: 'zh' })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.translatedText) return data.translatedText;
      }
      return null;
    },
    // DeepL 备用
    async () => {
      try {
        const response = await fetch('https://api-free.deepl.com/v2/translate', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `text=${encodeURIComponent(truncated)}&source_lang=EN&target_lang=ZH`
        });
        if (response.ok) {
          const data = await response.json();
          if (data.translations && data.translations[0]) {
            return data.translations[0].text;
          }
        }
      } catch (e) {
        // DeepL 免费版可能有访问限制
      }
      return null;
    }
  ];
  
  // 依次尝试每个 API
  for (const apiFn of apis) {
    try {
      const result = await apiFn();
      if (result) {
        cache.translations.set(cacheKey, result);
        return result;
      }
    } catch (e) {
      // 继续尝试下一个 API
    }
    // 避免请求过快
    await new Promise(r => setTimeout(r, 500));
  }
  
  // 所有 API 都失败，返回原文
  return text;
}

// 批量翻译
async function translateBatch(texts) {
  const results = [];
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    if (!text || text.trim() === '') {
      results.push(text);
      continue;
    }
    
    // 检查是否已经是中文
    const chineseRegex = /[\u4e00-\u9fa5]/;
    if (chineseRegex.test(text)) {
      results.push(text);
      continue;
    }
    
    const translated = await translate(text);
    results.push(translated);
    
    // 每翻译 3 条输出一次进度
    if ((i + 1) % 3 === 0) {
      console.log(`   翻译进度: ${i + 1}/${texts.length}`);
    }
    
    // 避免请求过快
    await new Promise(r => setTimeout(r, 300));
  }
  return results;
}

// 智能摘要生成
async function generateSmartSummary(item) {
  // 1. 首先尝试使用Jina AI
  if (item.link) {
    const jinaSummary = await generateSummaryWithJina(item.link);
    if (jinaSummary) return jinaSummary;
  }
  
  // 2. 回退：提取内容摘要
  const content = item.contentSnippet || item.content || '';
  if (content) {
    // 清理HTML标签
    const cleanContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : '');
  }
  
  // 3. 最后回退：返回标题
  return item.title || '';
}

// 计算AI重要性分数
function calculateAIScore(item) {
  let score = 0;
  const title = (item.title || '').toLowerCase();
  const content = ((item.contentSnippet || item.content) || '').toLowerCase();
  const text = title + ' ' + content;
  
  // 产品发布关键词 +3分
  const productKeywords = config.productKeywords || [];
  for (const kw of productKeywords) {
    if (text.includes(kw.toLowerCase())) {
      score += 3;
    }
  }
  
  // 基础AI关键词 +1分
  const filterKeywords = config.filterKeywords || [];
  for (const kw of filterKeywords) {
    if (text.includes(kw.toLowerCase())) {
      score += 1;
    }
  }
  
  // 大厂产品 +2分
  const majorCompanies = ['openai', 'anthropic', 'google', 'microsoft', 'meta', 'nvidia', 'huggingface'];
  for (const company of majorCompanies) {
    if (text.includes(company)) {
      score += 2;
    }
  }
  
  return score;
}

// 获取今天的日期
function getToday() {
  const now = new Date();
  return {
    full: now.toISOString().slice(0, 10),
    month: now.toISOString().slice(0, 7),
    chinese: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`,
    fileName: now.toISOString().slice(0, 10).replace(/-/g, '')
  };
}

// 简单标题去重
function deduplicate(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = (item.title || '').toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 过滤新闻
function filterNews(items) {
  const { filterKeywords, excludeKeywords } = config;
  
  return items.filter(item => {
    const title = item.title || '';
    const content = item.contentSnippet || item.content || '';
    const text = title + ' ' + content;
    
    // 排除关键词
    if (excludeKeywords) {
      for (const kw of excludeKeywords) {
        if (text.toLowerCase().includes(kw.toLowerCase())) return false;
      }
    }
    
    // 包含关键词
    if (!filterKeywords || filterKeywords.length === 0) return true;
    
    for (const kw of filterKeywords) {
      if (text.toLowerCase().includes(kw.toLowerCase())) return true;
    }
    
    return false;
  });
}

// 清理文本
function cleanText(text) {
  if (!text) return '';
  // 移除HTML标签，保留可读文本
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trim();
}

// 生成 Markdown 内容
function generateMarkdown(articles, translatedTitles, translatedContents, today) {
  const now = new Date();
  
  // Hugo front matter
  let md = `---
`;
  md += `title: "${today.chinese} - TZ日报"
`;
  md += `date: ${now.toISOString()}
`;
  md += `draft: false
`;
  md += `---\n\n`;
  
  md += `# ${today.chinese} - TZ日报\n\n`;
  md += `> 📊 今日汇总 ${articles.length} 条 | 📡 ${articles.filter(a => a.category === 'AI产品').length} 个产品更新 | 🕐 ${now.toLocaleString('zh-CN')}\n\n`;
  md += `---\n\n`;
  
  // 统计摘要
  const categoryStats = {};
  const prioritySorted = Object.entries(config.categoryPriority || {}).sort((a, b) => a[1] - b[1]);
  const orderedCategories = prioritySorted.map(([name]) => name);
  
  // 按分类整理
  const categorized = {};
  articles.forEach((article, index) => {
    const cat = article.category || '其他';
    if (!categorized[cat]) categorized[cat] = [];
    
    categorized[cat].push({
      ...article,
      translatedTitle: translatedTitles[index],
      translatedContent: translatedContents[index],
      originalIndex: index
    });
    
    categoryStats[cat] = (categoryStats[cat] || 0) + 1;
  });
  
  // 输出分类统计
  md += `## 📊 今日概览\n\n`;
  for (const [cat, count] of Object.entries(categoryStats)) {
    const displayName = (config.categoryNames || {})[cat] || cat;
    md += `- **${displayName.replace(/^[^ ]+ /, '')}**: ${count} 条\n`;
  }
  md += `\n---\n\n`;
  
  // 按优先级输出分类内容
  for (const categoryName of orderedCategories) {
    const items = categorized[categoryName];
    if (!items || items.length === 0) continue;
    
    const displayName = (config.categoryNames || {})[categoryName] || categoryName;
    md += `## ${displayName}\n\n`;
    
    items.forEach(item => {
      const title = item.translatedTitle || item.title;
      const content = item.translatedContent || '';
      
      // 产品更新标识
      const isProductUpdate = config.productKeywords?.some(kw => 
        (title + ' ' + content).toLowerCase().includes(kw.toLowerCase())
      );
      
      const updateIcon = isProductUpdate ? '✨ ' : '';
      
      md += `### ${updateIcon}${item.source}\n`;
      md += `**[${title}](${item.link})**\n\n`;
      
      if (content) {
        md += `${content}\n\n`;
      }
      
      md += `📅 ${item.pubDate || new Date().toISOString()}\n\n`;
      md += `---\n\n`;
    });
  }
  
  return md;
}

// 日志记录
function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '✅';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

// 主函数
async function fetchNews() {
  log('info', '🚀 开始抓取新闻...');
  
  const allArticles = [];
  const today = getToday();
  
  // 抓取所有 RSS 源
  for (const [index, source] of config.sources.entries()) {
    try {
      log('info', `📡 [${index + 1}/${config.sources.length}] 抓取: ${source.name}...`);
      
      let items = [];
      
      // X平台源特殊处理
      if (source.platform === 'x' || source.type === 'nitter') {
        // 对于X平台，使用Jina AI摘要
        const response = await fetchWithRetry(source.url, {}, 2, 2000);
        if (response.ok) {
          const text = await response.text();
          // 提取推文内容
          const tweets = text.split('\n').filter(line => line.trim() && !line.startsWith('http'));
          items = tweets.slice(0, 5).map((content, i) => ({
            title: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
            link: source.url,
            content: content,
            pubDate: new Date().toISOString(),
            source: source.name,
            category: source.category
          }));
        }
      } else {
        // 普通RSS源
        const feed = await parser.parseURL(source.url);
        items = feed.items.slice(0, 10).map(item => ({
          title: item.title || '',
          link: item.link || '',
          content: item.contentSnippet || item.content || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source.name,
          category: source.category,
          aiScore: 0 // 初始化AI分数
        }));
      }
      
      // 计算AI重要性分数
      items.forEach(item => {
        item.aiScore = calculateAIScore(item);
      });
      
      allArticles.push(...items);
      log('info', `   ✅ 获取 ${items.length} 条 (AI分数: ${items.reduce((sum, i) => sum + i.aiScore, 0)})`);
      
    } catch (err) {
      log('warn', `   ⚠️ 失败: ${err.message}`);
    }
    
    // 源之间稍作延迟
    await new Promise(r => setTimeout(r, 500));
  }
  
  // 去重 + 过滤 + 按AI分数排序
  let filtered = deduplicate(allArticles);
  filtered = filterNews(filtered);
  
  // 按AI分数排序（产品更新优先）
  filtered.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
  
  filtered = filtered.slice(0, config.maxItems || 60);
  
  log('info', `📊 共获取 ${filtered.length} 条新闻 (来自 ${new Set(filtered.map(f => f.source)).size} 个源)`);
  
  if (filtered.length === 0) {
    log('error', '⚠️ 未获取到任何新闻');
    process.exit(1);
  }
  
  // 翻译标题
  log('info', '🌐 翻译标题...');
  const titles = filtered.map(a => a.title);
  const translatedTitles = await translateBatch(titles);
  log('info', '✅ 标题翻译完成');
  
  // 智能生成摘要
  log('info', '📝 生成智能摘要...');
  const summaries = [];
  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    const summary = await generateSmartSummary(item);
    summaries.push(summary);
    
    if ((i + 1) % 5 === 0) {
      log('info', `   摘要进度: ${i + 1}/${filtered.length}`);
    }
  }
  
  // 翻译摘要
  log('info', '🌐 翻译摘要...');
  const translatedContents = await translateBatch(summaries);
  log('info', '✅ 摘要翻译完成');
  
  // 生成内容
  log('info', '📝 生成Markdown内容...');
  const markdown = generateMarkdown(filtered, translatedTitles, translatedContents, today);
  
  // 确保目录存在
  const outputDir = path.join(__dirname, 'hugo', 'content', today.month);
  const outputFile = path.join(outputDir, `${today.fileName}.md`);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(outputFile, markdown);
  log('info', `✅ 已生成: ${outputFile}`);
  
  // 同时输出一份到根目录
  const latestPath = path.join(__dirname, 'latest.md');
  fs.writeFileSync(latestPath, markdown);
  log('info', `✅ 已生成: latest.md`);
  
  // 生成运行日志
  const logData = {
    timestamp: new Date().toISOString(),
    articlesCount: filtered.length,
    sourcesCount: new Set(filtered.map(f => f.source)).size,
    categories: Object.entries(
      filtered.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([cat, count]) => ({
      category: cat,
      count,
      displayName: (config.categoryNames || {})[cat] || cat
    })),
    topSources: Object.entries(
      filtered.reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]).slice(0, 5)
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'hugo', 'data', 'latest-log.json'),
    JSON.stringify(logData, null, 2)
  );
  
  log('info', '🎉 全部完成！');
  process.exit(0);
}

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
  log('error', `未处理的Promise拒绝: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', error => {
  log('error', `未捕获的异常: ${error.message}`);
  process.exit(1);
});

// 执行
fetchNews().catch(err => {
  log('error', `捕获错误: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});