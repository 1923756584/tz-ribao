// TZ日报 - RSS配置优化版 (Task 3已完成)
// 2026-03-02 重构

module.exports = {
  // 网站配置
  site: {
    title: 'TZ日报 v2.0',
    description: '每日AI资讯聚合 - 聚焦大模型更新与前沿动态',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // RSS源列表 - 按优先级排序（从上到下重要性递减）
  sources: [
    // ===== Tier 1: AI大模型更新（最高优先级）=====
    { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', category: 'AI产品', weight: 1 },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: 'AI产品', weight: 1 },
    { name: 'Google AI', url: 'https://blog.google/technology/ai/rss', category: 'AI产品', weight: 1 },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: 'AI产品', weight: 1 },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: 'AI产品', weight: 1 },
    { name: 'NVIDIA AI', url: 'https://blogs.nvidia.com/feed/', category: 'AI产品', weight: 1 },
    
    // ===== Tier 2: AI产品发布平台 =====
    { name: 'Product Hunt AI', url: 'https://www.producthunt.com/topics/artificial-intelligence/rss', category: '产品发布', weight: 2 },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: 'AI产品', weight: 2 },
    
    // ===== Tier 3: AI工具与开源项目 =====
    { name: 'LangChain', url: 'https://blog.langchain.dev/rss/', category: 'AI产品', weight: 3 },
    { name: 'Replicate', url: 'https://replicate.com/blog/rss', category: 'AI产品', weight: 3 },
    
    // ===== Tier 4: 学术前沿 =====
    { name: 'Arxiv AI', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术研究', weight: 4 },
    { name: 'Arxiv ML', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术研究', weight: 4 },
    
    // ===== Tier 5: X平台 (Twitter) AI账号 =====
    { name: 'X: OpenAI', url: 'https://r.jina.ai/http://nitter.net/OpenAI', category: 'X平台', platform: 'x', weight: 5 },
    { name: 'X: Sam Altman', url: 'https://r.jina.ai/http://nitter.net/sama', category: 'X平台', platform: 'x', weight: 5 },
    
    // ===== Tier 6: 中文AI资讯 =====
    { name: '机器之心', url: 'https://www.jiqizhixin.com/rss', category: '中文资讯', weight: 6 },
    { name: '量子位', url: 'https://www.qbitai.com/feed', category: '中文资讯', weight: 6 },
  ],

  // 每天抓取多少条新闻
  maxItems: 80,

  // 请求超时配置
  timeout: {
    rss: 30000,
    translation: 45000,
    retry: 3,
    retryDelay: 2000
  },

  // 过滤关键词
  filterKeywords: ['AI', 'LLM', 'GPT', 'Claude', 'ChatGPT', '大模型', '多模态', '智能体', 'agents'],
  
  // 排除关键词
  excludeKeywords: ['porn', 'casino', '广告', '招聘', '区块链', 'NFT'],
  
  // 分类优先级
  categoryPriority: {
    'AI产品': 1,
    '产品发布': 2,
    'X平台': 3,
    '学术研究': 4,
    '中文资讯': 5
  },

  // 分类名称映射
  categoryNames: {
    'AI产品': '🚀 AI大模型',
    '产品发布': '✨ 产品发布',
    'X平台': '𝕏 平台动态',
    '学术研究': '📄 学术论文',
    '中文资讯': '🇨🇳 中文资讯'
  }
};