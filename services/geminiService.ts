
import { AnalysisResult, GroundingSource } from "../types";
import { getFromStorage } from "./storageService";

export const AVAILABLE_MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", tier: "free", description: "Latest ultra-fast model, best for speed" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", tier: "paid", description: "Advanced reasoning with enhanced quality" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", tier: "free", description: "Balanced performance and speed" },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite", tier: "free", description: "Lightweight version for simple tasks" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", tier: "free", description: "Fast and efficient for most tasks" },
  { id: "gemini-1.5-flash-8b", name: "Gemini 1.5 Flash 8B", tier: "free", description: "Compact model with lower latency" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", tier: "paid", description: "Advanced model with higher quality" },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview", tier: "free", description: "Preview of next generation (default)" },
];

/**
 * Use Vercel API route backend proxy for better limits and security
 */
export const analyzeResource = async (input: { base64Data?: string, url?: string }): Promise<AnalysisResult> => {
  // Use Vercel API route; in Vite dev (localhost:5173) proxy to local API server on 3000
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const backendUrl = isLocal && window.location.port === '5173'
    ? 'http://localhost:3000/api/analyze'
    : '/api/analyze';
  
  const modelConfig = getFromStorage<{ model: string }>("model_config") || { model: "gemini-2.5-flash" };
  const model = modelConfig.model;

  const userKey = getFromStorage<{ key: string }>("user_api_key")?.key;

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base64Data: input.base64Data,
        url: input.url,
        model: model,
        apiKey: userKey,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      let message = `Backend error: ${response.status}`;
      try {
        const parsed = text ? JSON.parse(text) : null;
        if (parsed?.error) message = parsed.error;
      } catch {
        /* ignore parse errors */
      }
      throw new Error(message);
    }

    try {
      return JSON.parse(text) as AnalysisResult;
    } catch (err) {
      console.error('Analysis Error: invalid JSON response', text);
      throw new Error('Invalid JSON from backend');
    }
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
