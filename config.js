// TZ日报 - RSS 源配置 v3.2
// 2026-03-03 - 精选配置 - 6-10篇高质量内容

module.exports = {
  site: {
    title: 'TZ日报',
    description: '每日AI资讯精选 - 6-10篇重要信息',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // 精选RSS源 - 添加地区标记 (regioin: '中国' | '美国' | '国际')
  sources: [
    // 分类1: 重要AI信息（国内+国外）- 源15个
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'Anthropic', url: 'https://www.anthropic.com/news/rss', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'DeepMind Blog', url: 'https://deepmind.google/discover/blog/feed', category: '重要AI信息', region: '美国', priority: 1 },
    { name: 'DeepSeek', url: 'https://www.deepseek.com/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: '智谱AI', url: 'https://www.zhipuai.cn/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: 'Moonshot AI', url: 'https://www.moonshot.cn/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: '零一万物 (01.AI)', url: 'https://01.ai/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: '百川智能', url: 'https://www.baichuan-ai.com/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: 'Minimax', url: 'https://api.minimax.chat/feed', category: '重要AI信息', region: '中国', priority: 1 },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: '重要AI信息', region: '国际', priority: 1 },
    { name: 'Stability AI', url: 'https://stability.ai/feed', category: '重要AI信息', region: '国际', priority: 1 },
    { name: 'Perplexity AI', url: 'https://www.perplexity.ai/feed', category: '重要AI信息', region: '美国', priority: 1 },

    // 分类2: 艺术/视频/音乐AI - 源4个
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', category: '艺术类AI', region: '美国', priority: 2 },
    { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence-articles', category: '艺术类AI', region: '美国', priority: 2 },
    { name: 'ElevenLabs', url: 'https://elevenlabs.io/blog', category: '艺术类AI', region: '国际', priority: 2 },
    { name: 'Synced AI Art', url: 'https://syncedreview.com/category/future-of-ai/feed/', category: '艺术类AI', region: '国际', priority: 2 },

    // 分类3: GitHub热门项目 - 源2个
    { name: 'GitHub Trending AI', url: 'https://github.com/trending?since=daily&l=python', category: 'GitHub项目', region: '国际', priority: 3, type: 'github-trending' },
    { name: 'GitHub Blog', url: 'https://github.blog/feed', category: 'GitHub项目', region: '国际', priority: 3 },

    // 分类4: 新闻/新发现 - 源5个
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: '新闻发现', region: '美国', priority: 4 },
    { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: '新闻发现', region: '美国', priority: 4 },
    { name: 'AI News', url: 'https://artificialintelligence-news.feedspot.com/feeds/posts/default', category: '新闻发现', region: '国际', priority: 4 },
    { name: 'The Information', url: 'https://theinformation.com/feed', category: '新闻发现', region: '美国', priority: 4 },
    { name: 'Synced Review', url: 'https://syncedreview.com/tech/feed/', category: '新闻发现', region: '国际', priority: 4 }
  ],

  // 新的分类优先级（按用户需求排序）
  categoryPriority: {
    '重要AI信息': 1,
    '艺术类AI': 2,
    'GitHub项目': 3,
    '新闻发现': 4
  },

  // 分类显示名称
  categoryNames: {
    '重要AI信息': '🚀 重要AI信息',
    '艺术类AI': '🎨 艺术/视频/音乐AI',
    'GitHub项目': '📦 GitHub热门项目',
    '新闻发现': '📰 新闻与新发现'
  },

  // 每分类文章数量配置（总共6-10篇）
  categoryLimit: {
    '重要AI信息': { min: 3, max: 4 },
    '艺术类AI': { min: 1, max: 2 },
    'GitHub项目': { min: 1, max: 2 },
    '新闻发现': { min: 1, max: 2 }
  },

  // 总文章数量范围
  totalArticleRange: { min: 6, max: 10 },

  // 排除关键词
  excludeKeywords: ['美团', '电商', '购物', '外卖', '外卖平台'],

  baseUrl: 'https://1923756584.github.io/tz-ribao',

  encoding: 'utf-8',

  timeout: {
    rss: 30000,
    fetch: 45000
  }
};
