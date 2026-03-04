// TZ日报 - RSS 源配置 v3.4
// 2026-03-03 - 按参考网站重构分类结构 + GitHub热门4个/3天 + 视频AI内容

module.exports = {
  site: {
    title: 'TZ日报',
    description: '每日AI资讯精选 - 产品更新·前沿研究·行业展望·GitHub热门',
    author: 'TZ',
    url: 'https://1923756584.github.io/tz-ribao'
  },
  categoryPriority: {
    '产品更新': 1,
    '前沿研究': 2,
    '行业展望': 3,
    'GitH hot': 4,
    '社交动态': 5
  },
  categoryNames: {
    '产品更新': '✨ 产品更新',
    '前沿研究': '🔬 前沿研究',
    '行业展望': '🌍 行业展望',
    'GitH hot': '📦 GitHub热门',
    '社交动态': '💬 社交动态'
  },
  categoryLimit: {
    '产品更新': { min: 8, max: 10 },
    '前沿研究': { min: 6, max: 8 },
    '行业展望': { min: 6, max: 8 },
    'GitH hot': { min: 4, max: 4 },
    '社交动态': { min: 5, max: 8 }
  },
  maxArticlesPerSource: 8
};
