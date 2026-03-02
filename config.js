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

  // RSS 源列表
  sources: [
    // ===== 中文科技媒体 =====
    { name: '爱范儿', url: 'https://www.ifanr.com/feed/', category: '中文' },
    { name: '少数派', url: 'https://sspai.com/feed/', category: '中文' },
    { name: '酷壳', url: 'https://coolshell.cn/feed/', category: '中文' },
    { name: '极客公园', url: 'https://www.geekpark.net/rss/', category: '中文' },
    { name: '机核', url: 'https://www.gcores.com/rss/', category: '中文' },
    { name: 'Solidot', url: 'https://www.solidot.org/index.rss', category: '中文' },
    
    // ===== AI 新闻 =====
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'AI新闻' },
    { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', category: 'AI新闻' },
    
    // ===== 学术论文 =====
    { name: 'Arxiv AI', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=10', category: '学术' },
    { name: 'Arxiv ML', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=10', category: '学术' },
    
    // ===== 大厂博客 =====
    { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', category: '前沿' },
    { name: 'Google AI', url: 'https://blog.google/technology/ai/rss', category: '前沿' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '前沿' },
    { name: 'MIT News AI', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2', category: '学术' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: '前沿' },
    
    // ===== 科技新闻 =====
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: '科技' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: '科技' },
    { name: 'Wired', url: 'https://www.wired.com/feed/rss', category: '科技' },
    
    // ===== 开源 =====
    { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: '开源' },
  ],

  // 每天抓取多少条新闻
  maxItems: 30,

  // 过滤关键词
  filterKeywords: ['AI', 'LLM', 'GPT', 'Claude', 'machine learning', 'deep learning', 'model', 'agent', 'OpenAI', 'Google', 'Microsoft', 'Anthropic', '人工智能', '大模型', 'AIGC', 'ChatGPT', '智能体'],
  
  // 排除关键词
  excludeKeywords: ['Porn', 'casino', '广告', '招聘', '求职', '兼职'],
  
  // 分类名称映射
  categoryNames: {
    '中文': '📰 中文资讯',
    'AI新闻': '🔥 AI新闻',
    '学术': '📄 学术论文',
    '前沿': '🚀 前沿动态',
    '科技': '💻 科技要闻',
    '开源': '📦 开源资讯',
  }
};
