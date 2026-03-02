// Simple static file server for Hugo site preview
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const PORT = 1314;
const ROOT = __dirname;

// Create a simple HTML page for site navigation
function generateIndexPage() {
  const dirs = fs.readdirSync(path.join(ROOT, 'content'), { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== '_index.md')
    .map(d => d.name);
  
  const contentDirs = dirs.map(dir => {
    const files = fs.readdirSync(path.join(ROOT, 'content', dir))
      .filter(f => f.endsWith('.md') && !f.startsWith('_'))
      .sort()
      .reverse()
      .slice(0, 10)
      .map(f => {
        const content = fs.readFileSync(path.join(ROOT, 'content', dir, f), 'utf8');
        const match = content.match(/title:\s*"([^"]+)"/);
        const title = match ? match[1] : f.replace('.md', '');
        return `<li><a href="/${dir}/${f.replace('.md', '/')}">${title}</a></li>`;
      })
      .join('\n      ');
    
    return `
      <div class="month">
        <h2>📅 ${dir}</h2>
        <ul>${files}</ul>
      </div>
    `;
  }).join('\n    ');
  
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TZ日报 - 本地预览</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0c0c0d 0%, #121214 100%);
      color: #f8f9fa;
      padding: 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      background: linear-gradient(45deg, #ff6b9d, #9d4edd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #a0a0a5;
      margin-bottom: 30px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .month {
      background: rgba(22, 22, 24, 0.8);
      border: 1px solid #28282d;
      border-radius: 12px;
      padding: 20px;
      backdrop-filter: blur(8px);
    }
    .month h2 {
      color: #ff6b9d;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }
    ul {
      list-style: none;
    }
    li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 107, 157, 0.1);
    }
    li:last-child {
      border-bottom: none;
    }
    a {
      color: #9d4edd;
      text-decoration: none;
      transition: color 0.3s;
    }
    a:hover {
      color: #ff6b9d;
    }
    .section {
      margin: 30px 0;
      padding: 20px;
      background: rgba(22, 22, 24, 0.6);
      border-radius: 12px;
      border: 1px solid #28282d;
    }
    .section h2 {
      color: #9d4edd;
      margin-bottom: 15px;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    .feature {
      padding: 15px;
      background: rgba(255, 107, 157, 0.1);
      border-radius: 8px;
      border-left: 4px solid #ff6b9d;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #a0a0a5;
      border-top: 1px solid #28282d;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(45deg, #ff6b9d, #9d4edd);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      margin-left: 8px;
    }
    code {
      background: rgba(157, 78, 221, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      color: #d16aff;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TZ日报 v2.0</h1>
    <p class="subtitle">每日AI资讯聚合 · 粉黑色调设计 · 智能摘要翻译</p>
    
    <div class="section">
      <h2>🚀 网站架构</h2>
      <div class="features">
        <div class="feature">
          <strong>35个RSS源</strong><br>
          6个X平台账号 + AI产品优先
        </div>
        <div class="feature">
          <strong>智能翻译</strong><br>
          MyMemory → Libre → DeepL
        </div>
        <div class="feature">
          <strong>粉黑UI</strong><br>
          383行定制CSS + 霓虹效果
        </div>
        <div class="feature">
          <strong>自动部署</strong><br>
          GitHub Actions 23:00运行
        </div>
      </div>
    </div>

    <div class="grid">
      ${contentDirs}
    </div>
    
    <div class="section">
      <h2>📊 今日统计</h2>
      <p>尝试抓取35个源，成功10个，失败8个（403/404/超时）</p>
      <p>重点关注：中文资讯源表现良好，AI产品源部分需优化</p>
    </div>

    <div class="footer">
      <p>&copy; 2026 TZ日报 | 基于 Hugo + Hextra 主题构建</p>
      <p>每晚会自动生成最新一期的AI资讯日报</p>
    </div>
  </div>
</body>
</html>
  `;
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(ROOT, urlPath);
  
  // 如果是根目录，返回导航页面
  if (urlPath === '/index.html') {
    const html = generateIndexPage();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }
  
  // Markdown文件转换为HTML预览
  if (filePath.endsWith('.md')) {
    try {
      const mdContent = fs.readFileSync(filePath, 'utf8');
      const html = convertMarkdownToPreview(mdContent, urlPath);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch (e) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Markdown文件未找到');
    }
  }
  
  // 其他文件直接提供
  try {
    const content = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (e) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(generate404Page());
  }
});

// Markdown转换为HTML预览
function convertMarkdownToPreview(md, url) {
  // 移除front matter
  const content = md.replace(/---[\s\S]*?---/, '').trim();
  
  // 简单的Markdown转为HTML
  const html = content
    .replace(/^# (.*$)/gim, '<h1 class="gradient-text">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="neon-text">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="accent-text">$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n/gim, '<br>')
    .replace(/^---$/gim, '<hr class="neon-divider">');
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${extractTitle(md)} - TZ日报</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0c0c0d 0%, #121214 100%);
      color: #f8f9fa;
      padding: 20px;
      line-height: 1.6;
    }
    .container { max-width: 1000px; margin: 0 auto; }
    .gradient-text {
      background: linear-gradient(45deg, #ff6b9d, #9d4edd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2rem;
      margin: 20px 0;
    }
    .neon-text { color: #9d4edd; margin: 15px 0; }
    .accent-text { color: #4cc9f0; margin: 10px 0; }
    strong { color: #ff6b9d; font-weight: 600; }
    a {
      color: #9d4edd;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s;
    }
    a:hover { border-bottom-color: #ff6b9d; }
    .back-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background: linear-gradient(45deg, #ff6b9d, #9d4edd);
      color: white;
      border-radius: 8px;
      text-decoration: none;
    }
    hr {
      border: none;
      height: 2px;
      background: linear-gradient(90deg, #ff6b9d, #9d4edd);
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back-btn">← 返回首页</a>
    <article>
      ${html}
    </article>
  </div>
</body>
</html>
  `;
}

// 提取标题
function extractTitle(md) {
  const match = md.match(/title:\s*"([^"]+)"/);
  if (match) return match[1];
  
  const h1Match = md.match(/^# (.*$)/m);
  return h1Match ? h1Match[1] : '无标题';
}

// 404页面
function generate404Page() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>404 - 页面未找到 | TZ日报</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0c0c0d;
      color: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    .neon-text {
      font-size: 8rem;
      background: linear-gradient(45deg, #ff2a6d, #d16aff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(255, 42, 109, 0.5);
    }
    .message {
      font-size: 1.2rem;
      color: #a0a0a5;
      margin: 20px 0;
    }
    a {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(45deg, #ff6b9d, #9d4edd);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      transition: transform 0.3s;
    }
    a:hover { transform: translateY(-2px); }
  </style>
</head>
<body>
  <div>
    <h1 class="neon-text">404</h1>
    <p class="message">Oops! 这个页面可能已经被AI接管了...</p>
    <p><a href="/">返回首页 →</a></p>
  </div>
</body>
</html>
  `;
}

// 启动服务器
server.listen(PORT, '127.0.0.1', () => {
  console.log('🚀 TZ日报预览服务器已启动');
  console.log('📺 访问地址: http://127.0.0.1:' + PORT);
  console.log('📖 可查看所有生成的日报内容');
  console.log('');
  console.log('🎨 特色功能:');
  console.log('✅ 粉黑色调渐变设计');
  console.log('✅ 智能翻译和摘要');
  console.log('✅ X平台AI账号集成');
  console.log('✅ 优先级排序显示');
  console.log('✅ 404友好提示');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
