// TZ日报 - RSS 源配置
// 2026-03-02 更新

module.exports = {
  // 网站配置
  site: {
    title: 'TZ日报',
    description: '每日AI资讯聚合',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // RSS 源列表 - 稳定可用
  sources: [
    // 中文源 - 36氪
    { name: '36氪', url: 'https://www.36kr.com/feed/', category: '中文' },
    { name: '36氪 AI', url: 'https://www.36kr.com/information/AI/feed', category: '中文' },
    
    // 中文源 - 虎嗅
    { name: '虎嗅', url: 'https://www.huxiu.com/rss.xml', category: '中文' },
    
    // 中文源 - 极客公园
    { name: '极客公园', url: 'https://www.geekpark.net/rss', category: '中文' },
    
    // AI 新闻
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'AI新闻' },
    { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', category: 'AI新闻' },
    
    // 学术论文 (Arxiv) - AI/ML/CV
    { name: 'Arxiv AI', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=10', category: '学术' },
    { name: 'Arxiv ML', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=10', category: '学术' },
    
    // 大厂博客
    { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', category: '前沿' },
    { name: 'Google AI', url: 'https://blog.google/technology/ai/rss', category: '前沿' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '前沿' },
    
    // 科技新闻
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: '科技' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: '科技' },
    
    // 开源
    { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: '开源' },
  ],

  // 每天抓取多少条新闻
  maxItems: 20,

  // 过滤关键词 - 保留包含这些词的新闻
  filterKeywords: ['AI', 'LLM', 'GPT', 'Claude', 'machine learning', 'deep learning', '模型', '大模型', '智能体', 'agent', 'OpenAI', 'Google', 'Microsoft', '人工智能', '大模型', 'AIGC', 'ChatGPT'],
  
  // 排除关键词
  excludeKeywords: ['广告', '推广', '招聘', '求职', ' Porn', 'casino'],
  
  // 中文分类名称映射
  categoryNames: {
    '中文': '📰 中文资讯',
    'AI新闻': '🔥 AI新闻',
    '学术': '📄 学术论文',
    '前沿': '🚀 前沿动态',
    '科技': '💻 科技要闻',
    '开源': '📦 开源资讯',
  }
};
