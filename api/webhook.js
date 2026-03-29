// api/webhook.js
export default async function handler(req, res) {
  // 1. 确保是 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. 解析请求体 (Body)
    // 注意：抖音发送的是 JSON 格式，Vercel 会自动解析 req.body
    const body = req.body;

    // 3. 提取 Challenge 值
    // 根据抖音文档，Challenge 通常在 content.challenge 或直接在 body 中
    // 建议打印 body 查看结构（仅调试时开启，上线后注释掉）
    // console.log('Received Body:', body);

    let challenge = body?.content?.challenge; // 常见结构
    if (!challenge) {
      challenge = body?.challenge; // 备用结构
    }

    if (!challenge) {
      return res.status(400).json({ error: 'Challenge not found in request' });
    }

    // 4. 原样返回 Challenge 值
    // 注意：有些平台要求直接返回纯文本，有些要求 JSON。
    // 抖音文档通常要求解析出值并回复该值。为了保险，我们可以尝试直接发送字符串。
    res.status(200).send(challenge);

  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}