// TZ日报 - RSS 源配置 (简化版 - 用于测试部署)
// 2026-03-03 - 临时缩减RSS源数量以解决GitHub Actions超时问题

module.exports = {
  // 网站配置
  site: {
    title: 'TZ日报',
    description: '每日AI资讯聚合 - 聚焦AI产品更新与前沿动态',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // RSS 源列表 - 简化为5个主要源进行测试
  sources: [
    // Tier 1: AI产品发布（主要源）
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: 'AI产品' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: 'AI产品' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: 'AI产品' },

    // Tier 2: 视频与艺术AI
    { name: 'Midjourney', url: 'https://midjourney.com/feed', category: '视频与艺术AI' },
    { name: 'Runway ML', url: 'https://runwayml.com/feed', category: '视频与艺术AI' }
  ],

  // 分类优先级
  categoryPriority: {
    'AI产品': 1,              // 1. 大模型更新
    '视频与艺术AI': 2,        // 2. 视频与艺术AI
    '产品发布': 3,            // Product Hunt
    'X平台': 4,                // X (Twitter)
    'AI新闻': 5,               // 新闻资讯
    '学术研究': 6,             // 学术
    '开源': 7,                 // 开源
    '中文资讯': 8              // 中文
  },

  // 最大显示条目数
  maxItems: 20,

  // 排除关键词
  excludeKeywords: ['美团', '电商', '购物', '外卖', '外卖平台'],

  // 基础URL配置
  baseUrl: 'https://1923756584.github.io/tz-ribao',

  // 字符编码
  encoding: 'utf-8',

  // 超时设置（毫秒）
  timeout: {
    rss: 30000,                // RSS请求超时 30秒
    fetch: 45000               // 单个fetch操作超时 45秒
  }
};
