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
    // AI 新闻
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'AI新闻' },
    { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', category: 'AI新闻' },
    
    // 学术论文 (Arxiv) - AI/ML/CV
    { name: 'Arxiv AI', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术' },
    { name: 'Arxiv ML', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术' },
    { name: 'Arxiv CV', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.CV&sortBy=submittedDate&sortOrder=descending&max_results=10', category: '学术' },
    
    // 大厂博客
    { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', category: '前沿' },
    { name: 'Google AI', url: 'https://blog.google/technology/ai/rss', category: '前沿' },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: '前沿' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '前沿' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: '前沿' },
    
    // 科技新闻
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: '科技' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: '科技' },
    
    // 开源
    { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: '开源' },
  ],

  // 每天抓取多少条新闻
  maxItems: 25,

  // 过滤关键词 - 保留包含这些词的新闻
  filterKeywords: ['AI', 'LLM', 'GPT', 'Claude', 'machine learning', 'deep learning', '模型', '大模型', '智能体', 'agent', 'OpenAI', 'Google', 'Meta', 'Microsoft', 'Anthropic'],
  
  // 排除关键词
  excludeKeywords: ['广告', '推广', '招聘', '求职'],
}
