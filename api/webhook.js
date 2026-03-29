import express from 'express';
const app = express();

// 必须解析 JSON 格式请求体（抖音校验是 POST JSON）
app.use(express.json());

// 抖音 Webhook 校验接口（路径必须是 /api/webhook）
app.post('/api/webhook', (req, res) => {
  const challenge = req.body.challenge;
  if (challenge) {
    // 关键：返回纯文本，不能有任何额外内容
    res.setHeader('Content-Type', 'text/plain');
    return res.send(challenge);
  }
  res.status(400).send('missing challenge');
});

// 健康检查（用于测试服务是否存活）
app.get('/api/health', (req, res) => res.send('ok'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
export default app;
