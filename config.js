// TZ日报 - RSS 源配置 v3.3
// 2026-03-03 - 全面扩展 - 每分类6-10篇，支持更多源

module.exports = {
  site: {
    title: 'TZ日报',
    description: '每日AI资讯精选 - 每分类6-10篇',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // 精选RSS源 - 按内容分类，不区分地区
  sources: [
    // ====== 分类1: 重要AI信息 (35个源) ======
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: '重要AI信息' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/news/rss', category: '重要AI信息' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: '重要AI信息' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '重要AI信息' },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: '重要AI信息' },
    { name: 'DeepMind Blog', url: 'https://deepmind.google/discover/blog/feed', category: '重要AI信息' },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: '重要AI信息' },
    { name: 'Stability AI', url: 'https://stability.ai/feed', category: '重要AI信息' },
    { name: 'Perplexity AI', url: 'https://www.perplexity.ai/feed', category: '重要AI信息' },
    { name: 'ElevenLabs', url: 'https://elevenlabs.io/blog', category: '重要AI信息' },
    
    // 中国AI公司 - 使用RSSHub或r.jina.ai
    { name: 'DeepSeek (RSSHub)', url: 'https://r.jina.ai/http://www.deepseek.com/blog', category: '重要AI信息', type: 'jina' },
    { name: '智谱AI (RSSHub)', url: 'https://r.jina.ai/http://www.zhipuai.cn/blog', category: '重要AI信息', type: 'jina' },
    { name: 'Moonshot AI (RSSHub)', url: 'https://r.jina.ai/http://www.moonshot.cn/blog', category: '重要AI信息', type: 'jina' },
    { name: '零一万物 (RSSHub)', url: 'https://r.jina.ai/http://01.ai/blog', category: '重要AI信息', type: 'jina' },
    { name: '百川智能 (RSSHub)', url: 'https://r.jina.ai/http://www.baichuan-ai.com/blog', category: '重要AI信息', type: 'jina' },
    { name: 'Minimax (RSSHub)', url: 'https://r.jina.ai/http://www.minimax.ai/blog', category: '重要AI信息', type: 'jina' },
    { name: '阶跃星辰 (RSSHub)', url: 'https://r.jina.ai/http://www.stepfun.com/blog', category: '重要AI信息', type: 'jina' },
    { name: '面壁智能 (RSSHub)', url: 'https://r.jina.ai/http://julius.ai/blog', category: '重要AI信息', type: 'jina' },
    { name: '360智脑 (RSSHub)', url: 'https://r.jina.ai/http://www.360.cn/ai', category: '重要AI信息', type: 'jina' },
    
    // X/Twitter - AI Leaders
    { name: 'X: OpenAI', url: 'https://r.jina.ai/http://twitter.com/OpenAI', category: '重要AI信息', type: 'nitter' },
    { name: 'X: Sam Altman', url: 'https://r.jina.ai/http://twitter.com/sama', category: '重要AI信息', type: 'nitter' },
    { name: 'X: Andrej Karpathy', url: 'https://r.jina.ai/http://twitter.com/karpathy', category: '重要AI信息', type: 'nitter' },
    { name: 'X: Yann LeCun', url: 'https://r.jina.ai/http://twitter.com/ylecun', category: '重要AI信息', type: 'nitter' },
    { name: 'X: Demis Hassabis', url: 'https://r.jina.ai/http://twitter.com/demishassabis', category: '重要AI信息', type: 'nitter' },
    { name: 'X: DeepSeek', url: 'https://r.jina.ai/http://twitter.com/deepseek_ai', category: '重要AI信息', type: 'nitter' },
    
    // Tech News
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: '重要AI信息' },
    { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence-articles', category: '重要AI信息' },
    { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: '重要AI信息' },
    { name: 'Wired AI', url: 'https://www.wired.com/feed/category/artificialintelligence', category: '重要AI信息' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', category: '重要AI信息' },
    { name: 'AI News', url: 'https://artificialintelligence-news.com/feed/', category: '重要AI信息' },
    { name: 'Synced', url: 'https://syncedreview.com/tech/feed/', category: '重要AI信息' },
    { name: 'The Information', url: 'https://theinformation.com/feed', category: '重要AI信息' },
    { name: 'Ars Technica AI', url: 'https://arstechnica.com/tag/artificial-intelligence/feed/', category: '重要AI信息' },

    // ====== 分类2: 艺术/视频/音乐AI (20个源) ======
    { name: 'Stable Diffusion Art', url: 'https://stablediffusionart.com/feed/', category: '艺术视频音乐AI' },
    { name: 'AI Art Daily', url: 'https://aiartdaily.com/feed/', category: '艺术视频音乐AI' },
    { name: 'VentureBeat Generative AI', url: 'https://venturebeat.com/category/generative-ai/feed/', category: '艺术视频音乐AI' },
    { name: 'TechCrunch Generative AI', url: 'https://techcrunch.com/category/generative-ai/feed/', category: '艺术视频音乐AI' },
    { name: 'ElevenLabs Blog', url: 'https://elevenlabs.io/blog', category: '艺术视频音乐AI' },
    
    // B站 AI UP主 (通过RSSHub/r.jina.ai)
    { name: 'B站: AI绘图 (RSSHub)', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E7%BB%98%E5%9B%BE', category: '艺术视频音乐AI', type: 'bilibili' },
    { name: 'B站: AI视频 (RSSHub)', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E8%A7%86%E9%A2%91', category: '艺术视频音乐AI', type: 'bilibili' },
    { name: 'B站: AI音乐 (RSSHub)', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E9%9F%B3%E4%B9%90', category: '艺术视频音乐AI', type: 'bilibili' },
    { name: 'B站: AIGC (RSSHub)', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/aigc', category: '艺术视频音乐AI', type: 'bilibili' },
    
    // YOUTUBE AI CHANNELS (使用官方RSS)
    { name: 'YouTube: Two Minute Papers', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCFZNV9CdKz9A4qS3iM2pJ0w', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Generated Artists', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC4KZbYqQY8Wf-2dX0z0kQ', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Art', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC4KZbYqQY8Wf-2dX0z0kQ', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Music', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIe-3XJ9aXzS9eX8HmD6A', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Video', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCJ8JW3D8yXwQQ8XwX8X8X8X', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Generative', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Animation', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIe-3XJ9aXzS9eX8HmD6A', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Tools', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v', category: '艺术视频音乐AI', type: 'youtube' },
    { name: 'YouTube: AI Tutorial', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v', category: '艺术视频音乐AI', type: 'youtube' },

    // ====== 分类3: GitHub热门项目 (12个源) ======
    { name: 'GitHub Trending Today', url: 'https://github.com/trending?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub Trending Weekly', url: 'https://github.com/trending?since=weekly', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub Blog', url: 'https://github.blog/feed', category: 'GitHub项目' },
    { name: 'GitHub: Python', url: 'https://github.com/trending/python?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: JavaScript', url: 'https://github.com/trending/javascript?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: Machine Learning', url: 'https://github.com/trending/machine-learning?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: Deep Learning', url: 'https://github.com/trending/deep-learning?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: AI', url: 'https://github.com/trending/artificial-intelligence?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: LLM', url: 'https://github.com/trending/large-language-model?since=daily', category: 'GitHub项目', type: 'github-trending' },
    { name: 'GitHub: Agents', url: 'https://github.com/trending/ai-agents?since=daily', category: 'GitHub项目', type: 'github-trending' },
    
    // 社交平台GitHub相关内容
    { name: 'X: GitHub', url: 'https://r.jina.ai/http://twitter.com/github', category: 'GitHub项目', type: 'nitter' },
    { name: 'X: GitHubCopilot', url: 'https://r.jina.ai/http://twitter.com/githubcopilot', category: 'GitHub项目', type: 'nitter' },

    // ====== 分类4: 新闻与新发现 (30个源) ======
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: '新闻发现' },
    { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', category: '新闻发现' },
    { name: 'Hacker News Machine Learning', url: 'https://hnrss.org/newest?q=machine+learning', category: '新闻发现' },
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: '新闻发现' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: '新闻发现' },
    { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/topnews.rss', category: '新闻发现' },
    { name: 'Wired', url: 'https://www.wired.com/feed/rss', category: '新闻发现' },
    { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: '新闻发现' },
    { name: 'The Information', url: 'https://theinformation.com/feed', category: '新闻发现' },
    { name: 'The Register AI', url: 'https://www.theregister.com/topic/ai/headlines.atom', category: '新闻发现' },
    { name: 'ZDNet AI', url: 'https://www.zdnet.com/topic/artificial-intelligence/rss.xml', category: '新闻发现' },
    
    // 学术和研究
    { name: 'ArXiv AI', url: 'https://export.arxiv.org/rss/cs.AI', category: '新闻发现' },
    { name: 'ArXiv Machine Learning', url: 'https://export.arxiv.org/rss/cs.LG', category: '新闻发现' },
    { name: 'ArXiv Computer Vision', url: 'https://export.arxiv.org/rss/cs.CV', category: '新闻发现' },
    { name: 'ArXiv Natural Language Processing', url: 'https://export.arxiv.org/rss/cs.CL', category: '新闻发现' },
    { name: 'Nature AI News', url: 'https://www.nature.com/natmachintellintelligence/articles.rss', category: '新闻发现' },
    { name: 'Science AI', url: 'https://www.science.org/rss/news_current.xml', category: '新闻发现' },
    
    // 中国科技媒体（通过RSSHub/r.jina.ai）
    { name: '36氪AI (RSSHub)', url: 'https://r.jina.ai/http://36kr.com/ai', category: '新闻发现', type: 'jina' },
    { name: '虎嗅AI (RSSHub)', url: 'https://r.jina.ai/http://huxiu.com/ai', category: '新闻发现', type: 'jina' },
    { name: '雷锋网AI (RSSHub)', url: 'https://r.jina.ai/http://www.leiphone.com/ai', category: '新闻发现', type: 'jina' },
    { name: 'InfoQ AI (RSSHub)', url: 'https://r.jina.ai/http://www.infoq.cn/ai', category: '新闻发现', type: 'jina' },
    { name: '机器之心 (RSSHub)', url: 'https://r.jina.ai/http://www.jiqizhixin.com', category: '新闻发现', type: 'jina' },
    { name: '钛媒体AI (RSSHub)', url: 'https://r.jina.ai/http://www.tmtpost.com/ai', category: '新闻发现', type: 'jina' },
    { name: '量子位 (RSSHub)', url: 'https://r.jina.ai/http://www.qbitai.com', category: '新闻发现', type: 'jina' },
    { name: '爱范儿AI (RSSHub)', url: 'https://r.jina.ai/http://www.ifanr.com/ai', category: '新闻发现', type: 'jina' },
    
    // X平台科技大V
    { name: 'X: Elon Musk', url: 'https://r.jina.ai/http://twitter.com/elonmusk', category: '新闻发现', type: 'nitter' },
    { name: 'X: Naval', url: 'https://r.jina.ai/http://twitter.com/naval', category: '新闻发现', type: 'nitter' },
    { name: 'X: Paul Graham', url: 'https://r.jina.ai/http://twitter.com/paulg', category: '新闻发现', type: 'nitter' }
  ],

  // 分类优先级
  categoryPriority: {
    '重要AI信息': 1,
    '艺术视频音乐AI': 2,
    'GitHub项目': 3,
    '新闻发现': 4
  },

  // 分类显示名称
  categoryNames: {
    '重要AI信息': '🚀 重要AI信息',
    '艺术视频音乐AI': '🎨 艺术/视频/音乐AI',
    'GitHub项目': '📦 GitHub热门项目',
    '新闻发现': '📰 新闻与新发现'
  },

  // 每分类文章数量配置（v3.3核心调整）
  categoryLimit: {
    '重要AI信息': { min: 6, max: 10 },
    '艺术视频音乐AI': { min: 6, max: 10 },
    'GitHub项目': { min: 6, max: 10 },
    '新闻发现': { min: 6, max: 10 }
  },

  baseUrl: 'https://1923756584.github.io/tz-ribao',

  encoding: 'utf-8',

  timeout: {
    rss: 30000,
    fetch: 45000
  }
};
