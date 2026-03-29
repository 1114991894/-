const express = require('express');
const app = express();
app.use(express.json()); // 解析POST请求的JSON体
app.use(express.urlencoded({ extended: true })); // 解析表单格式

// 处理抖音Webhooks的GET/POST请求
app.all('/douyin-webhooks', (req, res) => {
  // 提取challenge参数（GET从query取，POST从body取）
  const challenge = req.query.challenge || req.body.challenge;
  if (challenge) {
    res.send(challenge); // 核心：直接返回challenge值
  } else {
    res.status(400).send('缺少challenge参数');
  }
});

// 启动服务，适配平台端口（部署平台会自动分配PORT环境变量）
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务运行在端口${port}`);
});
