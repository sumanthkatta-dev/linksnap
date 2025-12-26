import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI, Type } from '@google/generative-ai';

// Initialize Gemini with API key from environment (server-side only)
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

interface AnalysisRequest {
  base64Data?: string;
  url?: string;
  model?: string;
}

interface AnalysisResponse {
  url?: string;
  category?: string;
  suggestedCategories?: string[];
  subCategory?: string;
  description?: string;
  pricing?: string;
  platform?: string;
  sources?: Array<{ title: string; uri: string }>;
  error?: string;
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body required' }),
      };
    }

    if (!process.env.VITE_GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' }),
      };
    }

    const { base64Data, url, model = 'gemini-2.5-flash' }: AnalysisRequest = JSON.parse(event.body);

    if (!base64Data && !url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'base64Data or url required' }),
      };
    }

    const systemInstruction = `Identify software tools, web apps, and digital products. 
Extract: tool name, official URL, category, description, pricing, and platform.
Use Google Search to verify details. Keep response concise.`;

    const userPrompt = url 
      ? `Analyze URL: ${url}. Extract: name, category, description, pricing, platforms.`
      : "Identify this product from image. Extract: name, category, description, pricing, platforms.";

    const geminiModel = genAI.getGenerativeModel({
      model,
      systemInstruction,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            url: { type: Type.STRING },
            category: { type: Type.STRING },
            suggestedCategories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            subCategory: { type: Type.STRING },
            description: { type: Type.STRING },
            pricing: { type: Type.STRING },
            platform: { type: Type.STRING },
          },
          required: ['url', 'category', 'description', 'pricing', 'platform'],
        },
      },
    });

    let content: any[] = [{ text: userPrompt }];

    if (base64Data) {
      content.push({
        inlineData: {
          mimeType: 'image/png',
          data: base64Data.includes(',') ? base64Data.split(',')[1] : base64Data,
        },
      });
    }

    const response = await geminiModel.generateContent(content);
    const result = JSON.parse(response.response.text());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Backend analyze error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Analysis failed',
      }),
    };
  }
};
