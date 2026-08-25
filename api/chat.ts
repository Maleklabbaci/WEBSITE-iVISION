import { GoogleGenAI } from '@google/genai';

type ChatRole = 'user' | 'model';

type ChatMessage = {
  role: ChatRole;
  text: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
  systemInstruction?: string;
};

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

function parseBody(body: unknown): ChatRequest {
  if (typeof body === 'string') {
    return JSON.parse(body) as ChatRequest;
  }
  return (body ?? {}) as ChatRequest;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Le service IA n’est pas configuré.' });
  }

  try {
    const body = parseBody(req.body);
    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message): message is ChatMessage =>
              Boolean(message) &&
              (message.role === 'user' || message.role === 'model') &&
              typeof message.text === 'string' &&
              message.text.trim().length > 0,
          )
          .slice(-MAX_MESSAGES)
          .map((message) => ({
            role: message.role,
            text: message.text.trim().slice(0, MAX_MESSAGE_LENGTH),
          }))
      : [];

    if (messages.length === 0) {
      return res.status(400).json({ error: 'Aucun message valide.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: messages.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      })),
      config: {
        systemInstruction: body.systemInstruction?.slice(0, 8000),
        maxOutputTokens: 600,
        temperature: 0.4,
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return res.status(502).json({ error: 'Réponse vide du service IA.' });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Le service IA est temporairement indisponible.' });
  }
}
