import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AnalysisRequest {
  base64Data?: string;
  url?: string;
  model?: string;
  apiKey?: string;
}

const sanitizeText = (value: string | undefined, maxLen = 2000): string => {
  if (!value) return '';
  const cleaned = value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim();
  return cleaned.slice(0, maxLen);
};

const sanitizeUrl = (value: string | undefined): string | null => {
  const cleaned = sanitizeText(value, 2048);
  if (!cleaned) return null;
  try {
    const parsed = new URL(cleaned);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { base64Data, url, model = 'gemini-2.5-flash', apiKey }: AnalysisRequest = req.body || {};

    if (!apiKey || apiKey.length < 20 || !apiKey.startsWith('AI')) {
      return res.status(401).json({ error: 'API key required' });
    }

    const safeUrl = sanitizeUrl(url);

    if (!base64Data && !safeUrl) {
      return res.status(400).json({ error: 'base64Data or url required' });
    }

    const systemInstruction = `Identify software tools, web apps, and digital products.
Extract: tool name, official URL, category, description, pricing, and platform.
Use Google Search to verify details. Keep response concise.`;

    const userPrompt = safeUrl
      ? `Analyze URL: ${safeUrl}. Extract: name, category, description, pricing, platforms.`
      : 'Identify this product from image. Extract: name, category, description, pricing, platforms.';

    const genAI = new GoogleGenerativeAI(apiKey);
    const geminiModel = genAI.getGenerativeModel({
      model,
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            url: { type: 'STRING' },
            category: { type: 'STRING' },
            suggestedCategories: {
              type: 'ARRAY',
              items: { type: 'STRING' },
            },
            subCategory: { type: 'STRING' },
            description: { type: 'STRING' },
            pricing: { type: 'STRING' },
            platform: { type: 'STRING' },
          },
          required: ['url', 'category', 'description', 'pricing', 'platform'],
        },
      },
    });

    const content: any[] = [{ text: userPrompt }];

    if (base64Data) {
      const safeImage = sanitizeText(base64Data, 1_000_000);
      content.push({
        inlineData: {
          mimeType: 'image/png',
          data: safeImage.includes(',') ? safeImage.split(',')[1] : safeImage,
        },
      });
    }

    const response = await geminiModel.generateContent(content);
    const result = JSON.parse(response.response.text());

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Vercel analyze error:', error);
    return res.status(500).json({ error: error?.message || 'Analysis failed' });
  }
};

export default handler;
