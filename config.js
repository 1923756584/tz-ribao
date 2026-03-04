// TZ日报 - RSS 源配置 v3.4
// 2026-03-03 - 按参考网站重构分类结构 + GitHub热门4个/3天 + 视频AI内容

module.exports = {
  site: {
    title: 'TZ日报',
    description: '每日AI资讯精选 - 产品更新·前沿研究·行业展望·GitHub热门',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },

  // 精选RSS源 - 参考ai.hubtoday.app结构
  sources: [
    // ====== 分类1: ✨ 产品更新 (保留"重要AI信息"的源，重命名) ======
    // 大厂AI产品博客
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: '产品更新' },
    { name: 'Anthropic', url: 'https://www.anthropic.com/news/rss', category: '产品更新' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss', category: '产品更新' },
    { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/', category: '产品更新' },
    { name: 'Meta AI', url: 'https://ai.meta.com/feed/', category: '产品更新' },
    { name: 'DeepMind Blog', url: 'https://deepmind.google/discover/blog/feed', category: '产品更新' },
    { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', category: '产品更新' },
    { name: 'Stability AI', url: 'https://stability.ai/feed', category: '产品更新' },
    { name: 'Perplexity AI', url: 'https://www.perplexity.ai/feed', category: '产品更新' },

    // 中国AI公司产品更新
    { name: 'DeepSeek (RSSHub)', url: 'https://r.jina.ai/http://www.deepseek.com/blog', category: '产品更新', type: 'jina' },
    { name: '智谱AI (RSSHub)', url: 'https://r.jina.ai/http://www.zhipuai.cn/blog', category: '产品更新', type: 'jina' },
    { name: 'Moonshot AI (RSSHub)', url: 'https://r.jina.ai/http://www.moonshot.cn/blog', category: '产品更新', type: 'jina' },
    { name: '零一万物 (RSSHub)', url: 'https://r.jina.ai/http://01.ai/blog', category: '产品更新', type: 'jina' },
    { name: '百川智能 (RSSHub)', url: 'https://r.jina.ai/http://www.baichuan-ai.com/blog', category: '产品更新', type: 'jina' },
    { name: 'Minimax (RSSHub)', url: 'https://r.jina.ai/http://www.minimax.ai/blog', category: '产品更新', type: 'jina' },
    { name: '阶跃星辰 (RSSHub)', url: 'https://r.jina.ai/http://www.stepfun.com/blog', category: '产品更新', type: 'jina' },
    { name: '面壁智能 (RSSHub)', url: 'https://r.jina.ai/http://julius.ai/blog', category: '产品更新', type: 'jina' },
    { name: '360智脑 (RSSHub)', url: 'https://r.jina.ai/http://www.360.cn/ai', category: '产品更新', type: 'jina' },

    // 视频AI产品（新增 - Sora、Veo、即梦可灵等）
    { name: 'OpenAI Sora Updates', url: 'https://openai.com/blog/rss.xml', category: '产品更新' },  // Sora更新也在主blog中
    { name: 'Google Veo Updates', url: 'https://blog.google/technology/ai/rss', category: '产品更新' },  // Veo更新在AI blog中（视频AI产品更新）
    { name: 'Google Imagen Video', url: 'https://blog.google/technology/ai/rss', category: '产品更新' },
    { name: 'Runway ML Blog', url: 'https://runwayml.com/blog?from_blog=true', category: '产品更新', type: 'scrape' },
    { name: 'Pika Labs Blog', url: 'https://r.jina.ai/http://www.pika.art/blog', category: '产品更新', type: 'jina' },
    { name: 'Luma Dream Machine', url: 'https://r.jina.ai/http://lumalabs.ai/blog', category: '产品更新', type: 'jina' },
    { name: '即梦可灵', url: 'https://r.jina.ai/http://jimeng.yunxiao.com', category: '产品更新', type: 'jina' },
    { name: '可灵AI Video', url: 'https://r.jina.ai/http://klingai.com', category: '产品更新', type: 'jina' },

    // AI行业媒体产品报道
    { name: 'TechCrunch AI Products', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: '产品更新' },
    { name: 'The Verge AI Products', url: 'https://www.theverge.com/rss/ai-artificial-intelligence-articles', category: '产品更新' },
    { name: 'VentureBeat AI Products', url: 'https://venturebeat.com/category/ai/feed/', category: '产品更新' },
    { name: 'AI News', url: 'https://artificialintelligence-news.com/feed/', category: '产品更新' },

    // ====== 分类2: 🔬 前沿研究（新增 - arXiv论文、学术研究） ======
    // arXiv学术论文
    { name: 'ArXiv AI (cs.AI)', url: 'https://export.arxiv.org/rss/cs.AI', category: '前沿研究' },
    { name: 'ArXiv Machine Learning (cs.LG)', url: 'https://export.arxiv.org/rss/cs.LG', category: '前沿研究' },
    { name: 'ArXiv Computer Vision (cs.CV)', url: 'https://export.arxiv.org/rss/cs.CV', category: '前沿研究' },
    { name: 'ArXiv Natural Language Processing (cs.CL)', url: 'https://export.arxiv.org/rss/cs.CL', category: '前沿研究' },
    { name: 'ArXiv Robotics (cs.RO)', url: 'https://export.arxiv.org/rss/cs.RO', category: '前沿研究' },
    { name: 'ArXiv Multiagent (cs.MA)', url: 'https://export.arxiv.org/rss/cs.MA', category: '前沿研究' },

    // 学术期刊和研究机构
    { name: 'Nature AI News', url: 'https://www.nature.com/natmachintellintelligence/articles.rss', category: '前沿研究' },
    { name: 'Science AI', url: 'https://www.science.org/rss/news_current.xml', category: '前沿研究' },
    { name: 'MIT Tech Research', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: '前沿研究' },

    // AI研究机构和实验室
    { name: 'OpenAI Research', url: 'https://openai.com/research/feed.xml', category: '前沿研究' },
    { name: 'Google DeepMind Research', url: 'https://deepmind.google/discover/blog/feed', category: '前沿研究' },
    { name: 'Meta AI Research', url: 'https://ai.meta.com/blog/research', category: '前沿研究', type: 'scrape' },
    { name: 'OpenAI Research Blog', url: 'https://openai.com/research', category: '前沿研究', type: 'scrape' },

    // ====== 分类3: 🌍 行业展望（新增 - 综合性新闻媒体、行业趋势） ======
    // 国际主流媒体
    { name: 'Reuters Technology', url: 'https://www.reuters.com/technology/rss', category: '行业展望' },
    { name: 'Bloomberg Technology', url: 'https://www.bloomberg.com/technology/rss.xml', category: '行业展望' },
    { name: 'WSJ Technology', url: 'https://wsj.com/xml/rss/3_7455.xml', category: '行业展望' },
    { name: 'FT Technology', url: 'https://www.ft.com/companies/technology/rss', category: '行业展望' },
    { name: 'The Information Technology', url: 'https://theinformation.com/feed', category: '行业展望' },

    // AI垂直媒体
    { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/topnews.rss', category: '行业展望' },
    { name: 'Wired Technology', url: 'https://www.wired.com/feed/rss', category: '行业展望' },
    { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: '行业展望' },
    { name: 'ZDNet AI', url: 'https://www.zdnet.com/topic/artificial-intelligence/rss.xml', category: '行业展望' },
    { name: 'The Register AI', url: 'https://www.theregister.com/topic/ai/headlines.atom', category: '行业展望' },

    // 投资和行业分析
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: '行业展望' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: '行业展望' },
    { name: 'AI Investment News', url: 'https://artificialintelligence-news.com/feed/', category: '行业展望' },
    { name: 'VentureBeat', url: 'https://venturebeat.com/feed/', category: '行业展望' },
    { name: 'Synced', url: 'https://syncedreview.com/tech/feed/', category: '行业展望' },

    // 中国科技媒体
    { name: '36氪AI (RSSHub)', url: 'https://r.jina.ai/http://36kr.com/ai', category: '行业展望', type: 'jina' },
    { name: '虎嗅AI (RSSHub)', url: 'https://r.jina.ai/http://huxiu.com/ai', category: '行业展望', type: 'jina' },
    { name: '雷锋网AI (RSSHub)', url: 'https://r.jina.ai/http://www.leiphone.com/ai', category: '行业展望', type: 'jina' },
    { name: 'InfoQ AI (RSSHub)', url: 'https://r.jina.ai/http://www.infoq.cn/ai', category: '行业展望', type: 'jina' },
    { name: '机器之心 (RSSHub)', url: 'https://r.jina.ai/http://www.jiqizhixin.com', category: '行业展望', type: 'jina' },
    { name: '钛媒体AI (RSSHub)', url: 'https://r.jina.ai/http://www.tmtpost.com/ai', category: '行业展望', type: 'jina' },
    { name: '量子位 (RSSHub)', url: 'https://r.jina.ai/http://www.qbitai.com', category: '行业展望', type: 'jina' },
    { name: '爱范儿AI (RSSHub)', url: 'https://r.jina.ai/http://www.ifanr.com/ai', category: '行业展望', type: 'jina' },

    // ====== 分类4: 📦 GitHub热门项目（4个，过去3天） ======
    // GitHub trending源（时间过滤在fetch-news.js中实现）
    { name: 'GitHub Trending Python', url: 'https://github.com/trending/python', category: 'GitH hot', type: 'github-trending-3days' },
    { name: 'GitHub Trending ML', url: 'https://github.com/trending/machine-learning', category: 'GitH hot', type: 'github-trending-3days' },
    { name: 'GitHub Trending AI', url: 'https://github.com/trending/artificial-intelligence', category: 'GitH hot', type: 'github-trending-3days' },
    { name: 'GitHub Trending LLM', url: 'https://github.com/trending/large-language-model', category: 'GitH hot', type: 'github-trending-3days' },

    // GitHub官方博客（用于获取官方产品更新）
    { name: 'GitHub Blog', url: 'https://github.blog/feed', category: '产品更新' },

    // ====== 分类5: 💬 社交动态（新增 - X/Twitter、Reddit、即刻等） ======
    // X/Twitter - AI Leaders
    { name: 'X: OpenAI', url: 'https://r.jina.ai/http://twitter.com/OpenAI', category: '社交动态', type: 'nitter' },
    { name: 'X: Sam Altman', url: 'https://r.jina.ai/http://twitter.com/sama', category: '社交动态', type: 'nitter' },
    { name: 'X: Andrej Karpathy', url: 'https://r.jina.ai/http://twitter.com/karpathy', category: '社交动态', type: 'nitter' },
    { name: 'X: Yann LeCun', url: 'https://r.jina.ai/http://twitter.com/ylecun', category: '社交动态', type: 'nitter' },
    { name: 'X: Demis Hassabis', url: 'https://r.jina.ai/http://twitter.com/demishassabis', category: '社交动态', type: 'nitter' },
    { name: 'X: DeepSeek', url: 'https://r.jina.ai/http://twitter.com/deepseek_ai', category: '社交动态', type: 'nitter' },
    { name: 'X: Elon Musk', url: 'https://r.jina.ai/http://twitter.com/elonmusk', category: '社交动态', type: 'nitter' },
    { name: 'X: Naval', url: 'https://r.jina.ai/http://twitter.com/naval', category: '社交动态', type: 'nitter' },
    { name: 'X: Paul Graham', url: 'https://r.jina.ai/http://twitter.com/paulg', category: '社交动态', type: 'nitter' },

    // Hacker News - 开发者社区动态
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: '社交动态' },
    { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', category: '社交动态' },
    { name: 'Hacker News ML', url: 'https://hnrss.org/newest?q=machine+learning', category: '社交动态' },

    // Reddit热门讨论
    { name: 'Reddit: r/artificial', url: 'https://www.reddit.com/r/artificial/new/.rss', category: '社交动态' },
    { name: 'Reddit: r/MachineLearning', url: 'https://www.reddit.com/r/MachineLearning/new/.rss', category: '社交动态' },
    { name: 'Reddit: r/singularity', url: 'https://www.reddit.com/r/singularity/new/.rss', category: '社交动态' },
    { name: 'Reddit: r/artificial', url: 'https://www.reddit.com/r/artificial/new/.rss', category: '社交动态' }
  ],

  // 分类优先级（按参考网站顺序）
  categoryPriority: {
    '产品更新': 1,
    '前沿研究': 2,
    '行业展望': 3,
    'GitH hot': 4,
    '社交动态': 5
  },

  // 分类显示名称
  categoryNames: {
    '产品更新': '✨ 产品更新',
    '前沿研究': '🔬 前沿研究',
    '行业展望': '🌍 行业展望',
    'GitH hot': '📦 GitHub热门',
    '社交动态': '💬 社交动态'
  },

  // 每分类文章数量配置（v3.4 - 按参考网站比例调整）
  categoryLimit: {
    '产品更新': { min: 8, max: 10 },      // 参考网站7篇
    '前沿研究': { min: 6, max: 8 },       // 参考网站7篇
    '行业展望': { min: 6, max: 8 },       // 参考网站6篇
    'GitH hot': { min: 4, max: 4 },       // 固定4个
    '社交动态': { min: 5, max: 8 }        // 参考网站5篇
  },

  maxArticlesPerSource: 8,
  baseUrl: 'https://1923756584.github.io/tz-ribao',
  encoding: 'utf-8',
  timeout: {
    rss: 30000,
    fetch: 45000
  }
};
