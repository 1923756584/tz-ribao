// TZ日报 - RSS 源配置 v3.1
// 2026-03-03 - 完整48个RSS源配置

module.exports = {
  site: {
    title: 'TZ日报',
    description: '每日AI资讯聚合 - 聚焦AI产品更新与前沿动态',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  sources: [
    // Tier 1: AI产品更新 / 大模型（20个源）
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: 'AI产品' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/feed', category: 'AI产品' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: 'AI产品' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: 'AI产品' },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: 'AI产品' },
    { name: 'NVIDIA AI', url: 'https://blogs.nvidia.com/feed/', category: 'AI产品' },
    { name: 'DeepSeek', url: 'https://www.deepseek.com/feed', category: 'AI产品' },
    { name: '智谱AI', url: 'https://www.zhipuai.cn/feed', category: 'AI产品' },
    { name: 'Moonshot AI', url: 'https://www.moonshot.cn/feed', category: 'AI产品' },
    { name: '零一万物 (01.AI)', url: 'https://01.ai/feed', category: 'AI产品' },
    { name: '百川智能', url: 'https://www.baichuan-ai.com/feed', category: 'AI产品' },
    { name: '阶跃星辰', url: 'https://www.stepfun.com/feed', category: 'AI产品' },
    { name: 'Minimax', url: 'https://api.minimax.chat/feed', category: 'AI产品' },
    { name: '面壁智能', url: 'https://julius.ai/feed', category: 'AI产品' },
    { name: '360智脑', url: 'https://www.360.cn/ai/feed', category: 'AI产品' },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: 'AI产品' },
    { name: 'Stability AI', url: 'https://stability.ai/feed', category: 'AI产品' },
    { name: 'ElevenLabs', url: 'https://elevenlabs.io/blog', category: 'AI产品' },
    { name: 'Perplexity AI', url: 'https://www.perplexity.ai/feed', category: 'AI产品' },

    // Tier 2: 视频与艺术AI（8个源，第2优先级）
    { name: 'Midjourney', url: 'https://midjourney.com/feed', category: '视频与艺术AI' },
    { name: 'Runway ML', url: 'https://runwayml.com/feed', category: '视频与艺术AI' },
    { name: 'Suno AI', url: 'https://suno.com/feed', category: '视频与艺术AI' },
    { name: 'Udio AI', url: 'https://www.udio.com/feed', category: '视频与艺术AI' },
    { name: 'AIVA Music AI', url: 'https://www.aiva.ai/feed', category: '视频与艺术AI' },
    { name: 'Ideogram', url: 'https://ideogram.ai/feed', category: '视频与艺术AI' },

    // Tier 3: AI新闻 & 行业动态
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'AI新闻' },
    { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: 'AI新闻' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/tag/ai/feed/', category: 'AI新闻' },
    { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence-articles', category: 'AI新闻' },
    { name: 'AI News', url: 'https://artificialintelligence-news.feedspot.com/feeds/posts/default', category: 'AI新闻' },
    { name: 'Synced', url: 'https://syncedreview.com/tech/feed/', category: 'AI新闻' },
    { name: 'AI Business', url: 'https://www.aibusiness.com/feed', category: 'AI新闻' },
    { name: 'The Information', url: 'https://theinformation.com/feed', category: 'AI新闻' },
    { name: 'Ars Technica AI', url: 'https://arstechnica.com/tag/artificial-intelligence/feed', category: 'AI新闻' },

    // Tier 4: X平台
    { name: 'X: OpenAI', url: 'https://r.jina.ai/http://nitter.net/OpenAI', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Sam Altman', url: 'https://r.jina.ai/http://nitter.net/sama', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Andrej Karpathy', url: 'https://r.jina.ai/http://nitter.net/karpathy', category: 'X平台', platform: 'x', type: 'nitter' },
    { name: 'X: Yann LeCun', url: 'https://r.jina.ai/http://nitter.net/ylecun', category: 'X平台', platform: 'x', type: 'nitter' },

    // Tier 5: 产品平台 & 开源
    { name: 'Product Hunt AI', url: 'https://www.producthunt.com/topics/artificial-intelligence/rss', category: '产品发布' },
    { name: 'GitHub Blog', url: 'https://github.blog/feed', category: '开源' },
    { name: 'DeepMind Blog', url: 'https://deepmind.google/blog/', category: 'AI新闻' }
  ],

  categoryPriority: {
    'AI产品': 1,
    '视频与艺术AI': 2,
    '产品发布': 3,
    'X平台': 4,
    'AI新闻': 5,
    '学术研究': 6,
    '开源': 7,
    '中文资讯': 8
  },

  categoryNames: {
    'AI产品': '🚀 AI产品更新',
    '视频与艺术AI': '🎨 视频与艺术AI',
    '产品发布': '✨ 产品发布',
    'X平台': '𝕏 平台动态',
    'AI新闻': '🔥 AI新闻',
    '学术研究': '📄 AI学术研究',
    '开源': '📦 开源项目',
    '中文资讯': '📰 中文资讯'
  },

  maxItems: 100,

  excludeKeywords: ['美团', '电商', '购物', '外卖', '外卖平台'],

  baseUrl: 'https://1923756584.github.io/tz-ribao',

  encoding: 'utf-8',

  timeout: {
    rss: 30000,
    fetch: 45000
  }
};
