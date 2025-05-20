const express = require('express');
const fetch = require('node-fetch'); // o usa `global.fetch` en Node 18
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ reply: 'Error al conectar con OpenAI.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
