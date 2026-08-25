import { GoogleGenAI } from '@google/genai';

type ChatRole = 'user' | 'model';

type ChatMessage = {
  role: ChatRole;
  text: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
};

type VercelRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_REQUESTS_PER_WINDOW = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

const SERVER_SYSTEM_INSTRUCTION = `
Tu es l’assistant officiel de iVISION Agency, une agence de marketing digital en Algérie.
Réponds de façon utile, concise et professionnelle. Réponds dans la langue de l’utilisateur.
Présente iVISION avec honnêteté : acquisition digitale, Meta Ads, Google Ads, création de contenu,
création de sites web, SEO et accompagnement stratégique. Ne garantis jamais un résultat, un ROI,
un classement Google ou un délai commercial. Ne demande jamais de mot de passe, de clé API ou de
coordonnées bancaires. Pour une demande commerciale précise, oriente vers le formulaire de devis
ou WhatsApp. Si tu ne connais pas une information, dis-le clairement.
`.trim();

function parseBody(body: unknown): ChatRequest {
  if (typeof body === 'string') {
    const parsed = JSON.parse(body) as unknown;
    return (parsed ?? {}) as ChatRequest;
  }
  return (body ?? {}) as ChatRequest;
}

function getClientKey(req: VercelRequest): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (Array.isArray(forwarded)) return forwarded[0] || 'unknown';
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim() || 'unknown';
  return 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = requestBuckets.get(key);
  if (!current || current.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  if (isRateLimited(getClientKey(req))) {
    return res.status(429).json({ error: 'Trop de demandes. Réessayez dans une minute.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Le service IA n’est pas configuré.' });
  }

  try {
    const body = parseBody(req.body);
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages = rawMessages
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
      }));

    const normalizedMessages = messages[0]?.role === 'model' ? messages.slice(1) : messages;
    if (normalizedMessages.length === 0 || normalizedMessages.every(({ role }) => role !== 'user')) {
      return res.status(400).json({ error: 'Aucun message utilisateur valide.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: normalizedMessages.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      })),
      config: {
        systemInstruction: SERVER_SYSTEM_INSTRUCTION,
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
    return res.status(400).json({ error: 'Requête invalide ou service IA temporairement indisponible.' });
  }
}
