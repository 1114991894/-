import express from 'express';
const app = express();

// 解析 JSON 请求体（抖音校验是 POST JSON）
app.use(express.json());

// 抖音 Webhook 校验接口（路径必须是 /api/webhook）
app.post('/api/webhook', (req, res) => {
  const challenge = req.body.challenge;
  
  if (challenge) {
    // 核心修复：按照抖音要求返回 "text 格式的 json 数据"
    res.setHeader('Content-Type', 'text/plain'); // 抖音文档指定类型
    return res.send(JSON.stringify({ challenge })); // 包裹成 JSON 字符串返回
  }
  
  res.status(400).send(JSON.stringify({ error: '缺少 challenge 参数' }));
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Webhook service running on port ${port}`));

export default app;
