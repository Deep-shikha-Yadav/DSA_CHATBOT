import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: "You are a strict DSA Instructor. Only answer Data Structures and Algorithms questions. If a question is not about DSA, decline to answer."
      }
    });

    return res.status(200).json({ answer: response.text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}