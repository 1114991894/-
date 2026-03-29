import express from 'express';
const app = express();

// 必须先解析 JSON 请求体，这是解决 400 错误的关键
app.use(express.json());

// 抖音 Webhook 校验接口
app.post('/api/webhook', (req, res) => {
  // 从请求体中获取 challenge
  const challenge = req.body.challenge;

  if (challenge) {
    // 严格按照抖音要求：返回 text/plain 格式的 JSON 字符串
    res.setHeader('Content-Type', 'text/plain');
    return res.send(JSON.stringify({ challenge }));
  }

  // 处理缺少参数的情况
  res.status(400).send(JSON.stringify({ error: '缺少 challenge 参数' }));
});

// 健康检查接口（用于测试服务是否存活）
app.get('/api/health', (req, res) => {
  res.send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`服务运行在端口 ${port}`));
export default app;
