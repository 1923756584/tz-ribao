// TZ日报 - RSS 源配置
// 2026-03-02 更新 - 优化信息源结构，以AI产品更新为优先

module.exports = {
  // 网站配置
  site: {
    title: 'TZ日报',
    description: '每日AI资讯聚合 - 聚焦AI产品更新与前沿动态',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // RSS 源列表 - 按优先级排序（从上到下重要性递减）
  sources: [
    // ===== Tier 1: AI产品发布与更新（最高优先级）=====
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: 'AI产品' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: 'AI产品' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: 'AI产品' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: 'AI产品' },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: 'AI产品' },
    { name: 'NVIDIA AI', url: 'https://blogs.nvidia.com/feed/', category: 'AI产品' },
    
    // ===== Tier 2: AI产品发布平台 =====
    { name: 'Product Hunt AI', url: 'https://www.producthunt.com/topics/artificial-intelligence/rss', category: '产品发布' },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: 'AI产品' },
    
    // ===== Tier 3: AI模型与工具更新 =====
    { name: 'Replicate', url: 'https://replicate.com/blog/rss', category: 'AI产品' },
    { name: 'LangChain', url: 'https://blog.langchain.dev/rss/', category: 'AI产品' },
    { name: 'Cohere', url: 'https://cohere.com/feed', category: 'AI产品' },
    { name: 'Mistral AI', url: 'https://mistral.ai/news/rss/', category: 'AI产品' },
    
    // ===== Tier 4: AI技术新闻与深度报道 =====
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'AI新闻' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/tag/ai/feed/', category: 'AI新闻' },
    { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: 'AI新闻' },
    { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence-articles', category: 'AI新闻' },
    
    // ===== Tier 5: X平台 (Twitter) AI账号（通过Nitter或RSSHub获取）=====
    { name: 'X: OpenAI', url: 'https://r.jina.ai/http://nitter.net/OpenAI', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Sam Altman', url: 'https://r.jina.ai/http://nitter.net/sama', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Andrej Karpathy', url: 'https://r.jina.ai/http://nitter.net/karpathy', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Yann LeCun', url: 'https://r.jina.ai/http://nitter.net/ylecun', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Geoffrey Hinton', url: 'https://r.jina.ai/http://nitter.net/geoffrey_hinton', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Hugging Face', url: 'https://r.jina.ai/http://nitter.com/HuggingFace', category: 'X平台', platform: 'x', type: 'nitter' },
    
    // ===== Tier 6: 学术前沿 =====
    { name: 'Arxiv AI', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术研究' },
    { name: 'Arxiv ML', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术研究' },
    { name: 'Arxiv CL', url: 'http://export.arxiv.org/api/query?search_query=cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=15', category: '学术研究' },
    { name: 'DeepMind Blog', url: 'https://www.deepmind.com/blog/feed/basic', category: '学术研究' },
    
    // ===== Tier 7: 开源AI项目更新 =====
    { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: '开源' },
    { name: 'Pytorch', url: 'https://pytorch.org/blog/feed/', category: '开源' },
    { name: 'TensorFlow', url: 'https://blog.tensorflow.org/feed/', category: '开源' },
    
    // ===== Tier 8: 精选科技媒体 =====
    { name: 'Wired AI', url: 'https://www.wired.com/tag/artificialintelligence/rss', category: '科技媒体' },
    { name: 'IEEE Spectrum AI', url: 'https://spectrum.ieee.org/topic/artificial-intelligence/rss', category: '科技媒体' },
    { name: 'Ars Technica AI', url: 'https://arstechnica.com/tag/artificial-intelligence/feed/', category: '科技媒体' },
    
    // ===== Tier 9: 中文AI资讯 =====
    { name: '机器之心', url: 'https://www.jiqizhixin.com/rss', category: '中文资讯' },
    { name: '量子位', url: 'https://www.qbitai.com/feed', category: '中文资讯' },
    { name: 'InfoQ AI', url: 'https://www.infoq.cn/topic/ai/rss', category: '中文资讯' },
  ],

  // 每天抓取多少条新闻
  maxItems: 80,

  // 请求超时配置（毫秒）
  timeout: {
    rss: 30000,        // RSS请求超时30秒
    translation: 45000, // 翻译请求超时45秒
    retry: 3,         // 重试次数
    retryDelay: 2000  // 重试间隔2秒
  },

  // 过滤关键词 - 用于筛选AI相关内容
  filterKeywords: [
    'AI', 'LLM', 'GPT', 'Claude', 'ChatGPT', 'machine learning', 'deep learning', 
    '模型', '智能体', 'agent', 'AIGC', 'OpenAI', 'Anthropic', 'Google', 'Microsoft',
    'Meta', 'Nvidia', 'Hugging Face', 'Chatbot', 'API', 'MCP', 'function calling',
    'RAG', 'agents', '人工智能', '大模型', '多模态', 'vision', '图像生成',
    '文本生成', 'code generation', '编程助手', 'copilot', 'manifold', 'reasoning'
  ],
  
  // 排除关键词 - 过滤无关内容
  excludeKeywords: [
    'porn', 'casino', 'gambling', '彩票', '招聘', '求职', '兼职', '广告',
    '色情', '博彩', '诈骗', '区块链', 'cryptocurrency', 'web3', 'NFT', 'defi',
    '金融诈骗', '投资课程', '理财培训', '股票推荐', '数字货币'
  ],
  
  // 产品更新关键词 - 用于识别产品发布类新闻
  productKeywords: [
    '发布', 'launch', 'release', 'announce', 'introducing', '推出', '上线',
    'new', 'available', 'update', '升级', '功能更新', 'feature', 'capabilities',
    '版本', 'version', 'API', 'SDK', '模型发布', '开源', '开源发布',
    '新功能', '新特性', '更新', '升级', '优化', '改进'
  ],

  // 分类优先级 - 用于排序（数值越小越靠前）
  categoryPriority: {
    'AI产品': 1,
    '产品发布': 2,
    'X平台': 3,
    'AI新闻': 4,
    '学术研究': 5,
    '开源': 6,
    '科技媒体': 7,
    '中文资讯': 8
  },

  // 分类名称映射
  categoryNames: {
    'AI产品': '🚀 AI产品更新',
    '产品发布': '✨ 产品发布',
    'X平台': '𝕏 平台动态',
    'AI新闻': '🔥 AI新闻',
    '学术研究': '📄 AI学术研究',
    '开源': '📦 开源项目',
    '科技媒体': '📰 科技媒体',
    '中文资讯': '🇨🇳 中文资讯'
  }
};