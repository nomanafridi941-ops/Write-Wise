const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/llama', async (req, res) => {
  const { prompt, systemPrompt, max_tokens = 2000, temperature = 0.7 } = req.body;
  const API_KEY = process.env.TOGETHER_API_KEY || 'ts-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz';
  const url = 'https://api.together.ai/v1/chat/completions';

  const payload = {
    model: 'meta-llama/Llama-3.1-405B-Instruct-Turbo',
    messages: [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt }
    ],
    max_tokens,
    temperature
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Llama API error' });
    }
    res.json({ content: data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Llama proxy server running on port ${PORT}`);
});
