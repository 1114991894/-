import express from 'express';
const app = express();

// 解析请求体（支持 JSON 和表单格式）
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 抖音 Webhook 校验接口（同时支持 GET/POST）
app.all('/api/webhook', (req, res) => {
  // 从 query 或 body 中提取 challenge
  const challenge = req.query.challenge || req.body.challenge;
  
  if (challenge) {
    // 核心：必须仅返回 challenge 字符串，不能加任何其他内容
    res.setHeader('Content-Type', 'text/plain');
    res.send(challenge);
  } else {
    res.status(400).send('缺少 challenge 参数');
  }
});

// 健康检查接口（可选，用于测试服务是否正常运行）
app.get('/api/health', (req, res) => {
  res.send('ok');
});

// 启动服务（适配 Vercel 环境变量）
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`抖音 Webhook 服务运行在端口 ${port}`);
});

export default app;
