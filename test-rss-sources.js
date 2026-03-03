#!/usr/bin/env node

// RSS源测试脚本 - 测试"艺术视频音乐AI"分类的所有源
const fetch = require('node-fetch');
const Parser = require('rss-parser');
const parser = new Parser();

// "艺术视频音乐AI"分类的所有源
const testSources = [
  { name: 'Stable Diffusion Art', url: 'https://stablediffusionart.com/feed/' },
  { name: 'AI Art Daily', url: 'https://aiartdaily.com/feed/' },
  { name: 'VentureBeat Generative AI', url: 'https://venturebeat.com/category/generative-ai/feed/' },
  { name: 'TechCrunch Generative AI', url: 'https://techcrunch.com/category/generative-ai/feed/' },
  { name: 'ElevenLabs Blog', url: 'https://elevenlabs.io/blog' },
  { name: 'B站: AI绘图', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E7%BB%98%E5%9B%BE' },
  { name: 'B站: AI视频', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E8%A7%86%E9%A2%91' },
  { name: 'B站: AI音乐', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/ai%E9%9F%B3%E4%B9%90' },
  { name: 'B站: AIGC', url: 'https://r.jina.ai/http://www.bilibili.com/v/kw/aigc' },
  { name: 'YouTube: Two Minute Papers', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCFZNV9CdKz9A4qS3iM2pJ0w' },
  { name: 'YouTube: AI Generated Artists', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC4KZbYqQY8Wf-2dX0z0kQ' },
  { name: 'YouTube: AI Art', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC4KZbYqQY8Wf-2dX0z0kQ' },
  { name: 'YouTube: AI Music', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIe-3XJ9aXzS9eX8HmD6A' },
  { name: 'YouTube: AI Video', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCJ8JW3D8yXwQQ8XwX8X8X8X' },
  { name: 'YouTube: AI Generative', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v' },
  { name: 'YouTube: AI Animation', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIe-3XJ9aXzS9eX8HmD6A' },
  { name: 'YouTube: AI Tools', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v' },
  { name: 'YouTube: AI Tutorial', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX8w5v9rZ8v8v8v8v8v8v8v' },
];

async function testSource(source) {
  try {
    console.log(`\n测试: ${source.name}`);
    console.log(`URL: ${source.url}`);

    const response = await fetch(source.url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.log(`❌ 失败: HTTP ${response.status} ${response.statusText}`);
      return { source, status: 'failed', error: `HTTP ${response.status}` };
    }

    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);

    if (!contentType.includes('rss') && !contentType.includes('xml') && !contentType.includes('atom') && !contentType.includes('html')) {
      console.log(`⚠️  警告: 非标准RSS内容类型`);
    }

    const feedText = await response.text();

    // 尝试解析RSS
    const feed = await parser.parseString(feedText);
    const itemCount = feed.items ? feed.items.length : 0;

    if (itemCount === 0) {
      console.log(`⚠️  警告: RSS解析成功但无文章`);
      return { source, status: 'empty', itemCount: 0 };
    }

    console.log(`✅ 成功: ${itemCount}篇文章`);
    console.log(`   最新文章: ${feed.items[0].title?.substring(0, 50) || '无法获取标题'}`);

    return { source, status: 'success', itemCount, feed };

  } catch (error) {
    console.log(`❌ 失败: ${error.message}`);
    return { source, status: 'error', error: error.message };
  }
}

async function testAllSources() {
  console.log('==========================================');
  console.log('测试"艺术视频音乐AI"分类的所有RSS源');
  console.log('==========================================');

  const results = [];

  for (const source of testSources) {
    const result = await testSource(source);
    results.push(result);

    // 小延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 汇总结果
  console.log('\n\n==========================================');
  console.log('测试结果汇总');
  console.log('==========================================');

  const successCount = results.filter(r => r.status === 'success').length;
  const emptyCount = results.filter(r => r.status === 'empty').length;
  const failedCount = results.filter(r => r.status === 'failed' || r.status === 'error').length;

  console.log(`\n总数: ${results.length}`);
  console.log(`✅ 成功: ${successCount}`);
  console.log(`⚠️  空内容: ${emptyCount}`);
  console.log(`❌ 失败: ${failedCount}`);

  console.log('\n成功的源:');
  results.filter(r => r.status === 'success').forEach(r => {
    console.log(`  ✓ ${r.source.name} (${r.itemCount}篇)`);
  });

  console.log('\n空内容的源:');
  results.filter(r => r.status === 'empty').forEach(r => {
    console.log(`  ⚠️  ${r.source.name}`);
  });

  console.log('\n失败的源:');
  results.filter(r => r.status === 'failed' || r.status === 'error').forEach(r => {
    console.log(`  ✗ ${r.source.name} - ${r.error || r.error}`);
  });

  // 只有成功的源统计
  const totalArticlesFromSuccess = results
    .filter(r => r.status === 'success')
    .reduce((sum, r) => sum + r.itemCount, 0);

  console.log(`\n成功的源总共提供 ${totalArticlesFromSuccess} 篇文章`);

  if (successCount < 2) {
    console.log('\n⚠️  警告: 成功的源太少，无法满足6-10篇文章的需求');
  }
}

testAllSources().catch(console.error);
