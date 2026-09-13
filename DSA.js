import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: String(userQuestion),
      config: {
        systemInstruction: "You are a strict Data Structures and Algorithms instructor. If the user asks a question about Data Structures and Algorithms, explain it simply and politely. If the user asks anything unrelated, reply rudely."
      }
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});