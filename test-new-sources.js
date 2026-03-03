#!/usr/bin/env node

// 测试新的"艺术视频音乐AI"分类RSS源
const fetch = require('node-fetch');
const Parser = require('rss-parser');
const parser = new Parser();

// 新的"艺术视频音乐AI"分类的所有源
const testSources = [
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
  { name: 'Magenta TensorFlow', url: 'https://magenta.withgoogle.com/feed.xml' },
  { name: 'Reddit: r/StableDiffusion', url: 'https://www.reddit.com/r/StableDiffusion/new/.rss' },
  { name: 'Reddit: r/AIArt', url: 'https://www.reddit.com/r/AIArt/new/.rss' },
  { name: 'Reddit: r/aiArt', url: 'https://www.reddit.com/r/aiArt/new/.rss' },
  { name: 'Reddit: r/StableDiffusionArt', url: 'https://www.reddit.com/r/StableDiffusionArt/new/.rss' },
  { name: 'Runway ML Newsletter', url: 'https://runwayml.com/news?from_blog=true' },
  { name: 'MusicSmith AI Blog', url: 'https://r.jina.ai/http://musicsmith.ai/blog' },
  { name: 'MusicGPT Blog', url: 'https://r.jina.ai/http://musicgpt.com/blog/' },
  { name: 'Neume Blog', url: 'https://r.jina.ai/http://neume.io/blog' },
  { name: 'Reddit: r/VideoEditingAI', url: 'https://www.reddit.com/r/VideoEditingAI/new/.rss' },
  { name: 'Reddit: r/aiMusic', url: 'https://www.reddit.com/r/aiMusic/new/.rss' },
  { name: 'Reddit: r/ArtificialIntelligence', url: 'https://www.reddit.com/r/ArtificialIntelligence/new/.rss' },
  { name: 'Generative AI Art (beehiiv)', url: 'https://r.jina.ai/http://aigenart.beehiiv.com' },
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

    const feedText = await response.text();

    // 尝试解析RSS
    const feed = await parser.parseString(feedText);
    const itemCount = feed.items ? feed.items.length : 0;

    if (itemCount === 0) {
      console.log(`⚠️  警告: RSS解析成功但无文章`);
      return { source, status: 'empty', itemCount: 0 };
    }

    console.log(`✅ 成功: ${itemCount}篇文章`);
    console.log(`   最新文章: ${feed.items[0].title?.substring(0, 60) || '无法获取标题'}...`);

    return { source, status: 'success', itemCount, feed };

  } catch (error) {
    console.log(`❌ 失败: ${error.message}`);
    return { source, status: 'error', error: error.message };
  }
}

async function testAllSources() {
  console.log('==========================================');
  console.log('测试新的"艺术视频音乐AI"分类的所有RSS源');
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

  if (successCount >= 6) {
    console.log('\n✅ 成功的源数量足夠，可以满足6-10篇文章的需求！');
  } else {
    console.log('\n⚠️  警告: 成功的源数量不足，无法满足6-10篇文章的需求');
  }
}

testAllSources().catch(console.error);
