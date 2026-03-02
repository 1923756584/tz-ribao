/**
 * TZ日报 - 新闻抓取脚本
 * 功能：从 RSS 源抓取新闻，生成 Markdown 文件
 * 支持中英文翻译
 */

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const parser = new Parser();

// 翻译函数（使用 MyMemory 免费 API）
async function translate(text) {
  if (!text || text.trim() === '') return text;
  
  // 如果已经是中文，直接返回
  const chineseRegex = /[\u4e00-\u9fa5]/;
  if (chineseRegex.test(text)) return text;
  
  try {
    const encodedText = encodeURIComponent(text.slice(0, 500));
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|zh-CN`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (err) {
    // 翻译失败，使用原文
  }
  
  return text;
}
async function translate(text) {
  if (!text || text.trim() === '') return text;
  
  // 如果已经是中文，直接返回
  const chineseRegex = /[\u4e00-\u9fa5]/;
  if (chineseRegex.test(text)) return text;
  
  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text.slice(0, 500), // 限制长度
        source: 'en',
        target: 'zh'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.translatedText || text;
    }
  } catch (err) {
    // 翻译失败，使用原文
  }
  
  return text;
}

// 获取今天的日期
function getToday() {
  const now = new Date();
  return {
    full: now.toISOString().slice(0, 10),           // 2026-03-01
    month: now.toISOString().slice(0, 7),            // 2026-03
    day: now.toISOString().slice(8, 10),             // 01
    chinese: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`,
    fileName: now.toISOString().slice(0, 10).replace(/-/g, '')
  };
}

// 简单标题去重
function deduplicate(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = item.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 过滤新闻
function filterNews(items) {
  const { filterKeywords, excludeKeywords } = config;
  
  return items.filter(item => {
    const title = item.title || '';
    const content = item.contentSnippet || '';
    const text = title + ' ' + content;
    
    // 排除关键词
    if (excludeKeywords) {
      for (const kw of excludeKeywords) {
        if (text.includes(kw)) return false;
      }
    }
    
    // 包含关键词（如果没有配置则全部通过）
    if (!filterKeywords || filterKeywords.length === 0) return true;
    
    for (const kw of filterKeywords) {
      if (text.toLowerCase().includes(kw.toLowerCase())) return true;
    }
    
    return false;
  });
}

// 生成 Markdown 内容
function generateMarkdown(articles, translatedTitles) {
  const date = getToday();
  const now = new Date();
  
  // Hugo front matter
  let md = `---\n`;
  md += `title: "${date.chinese} - TZ日报"\n`;
  md += `date: ${now.toISOString()}\n`;
  md += `draft: false\n`;
  md += `---\n\n`;
  
  md += `# ${date.chinese} - TZ日报\n\n`;
  md += `> 每日AI资讯聚合 | 更新时间：${date.chinese}\n\n`;
  md += `---\n\n`;
  
  // 按分类整理
  const categories = {};
  articles.forEach((article, index) => {
    const cat = article.category || '其他';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ ...article, translatedTitle: translatedTitles[index] });
  });
  
  // 输出分类
  for (const [cat, items] of Object.entries(categories)) {
    md += `## ${cat}\n\n`;
    items.forEach(item => {
      const title = item.translatedTitle || item.title;
      md += `### ${item.source}\n`;
      md += `**${title}**\n\n`;
      if (item.content) {
        md += `${item.content.slice(0, 300)}...\n\n`;
      }
      md += `[原文链接](${item.link})\n\n`;
      md += `---\n\n`;
    });
  }
  
  return md;
}

// 主函数
async function fetchNews() {
  console.log('🚀 开始抓取新闻...\n');
  
  const allArticles = [];
  
  // 抓取所有 RSS 源
  for (const source of config.sources) {
    try {
      console.log(`📡 抓取: ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      const items = feed.items.slice(0, 10).map(item => ({
        title: item.title || '',
        link: item.link || '',
        content: item.contentSnippet || item.content || '',
        pubDate: item.pubDate,
        source: source.name,
        category: source.category
      }));
      
      allArticles.push(...items);
      console.log(`   ✅ 获取 ${items.length} 条\n`);
    } catch (err) {
      console.log(`   ❌ 失败: ${err.message}\n`);
    }
  }
  
  // 去重 + 过滤
  let filtered = deduplicate(allArticles);
  filtered = filterNews(filtered);
  filtered = filtered.slice(0, config.maxItems);
  
  console.log(`📊 共获取 ${filtered.length} 条新闻\n`);
  
  // 翻译标题
  console.log('🌐 翻译标题为中文...\n');
  const titles = filtered.map(a => a.title);
  const translatedTitles = await Promise.all(
    titles.map(async (title, i) => {
      const translated = await translate(title);
      if ((i + 1) % 5 === 0) {
        console.log(`   翻译进度: ${i + 1}/${titles.length}`);
      }
      return translated;
    })
  );
  console.log('   翻译完成!\n');
  
  // 生成内容
  const date = getToday();
  const markdown = generateMarkdown(filtered, translatedTitles);
  
  // 输出到 hugo content 目录
  const outputDir = path.join(__dirname, 'hugo', 'content', date.month);
  const outputFile = path.join(outputDir, `${date.fileName}.md`);
  
  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(outputFile, markdown);
  console.log(`✅ 已生成: ${outputFile}\n`);
  
  // 同时输出一份到根目录（方便查看）
  fs.writeFileSync(path.join(__dirname, 'latest.md'), markdown);
  console.log(`✅ 已生成: latest.md\n`);
  
  // 确保生成了内容
  if (filtered.length > 0) {
    console.log('🎉 完成！');
    process.exit(0);
  } else {
    console.log('⚠️ 未获取到任何新闻');
    process.exit(1);
  }
}

// 执行
fetchNews().catch(err => {
  console.error('❌ 错误:', err);
  process.exit(1);
});
