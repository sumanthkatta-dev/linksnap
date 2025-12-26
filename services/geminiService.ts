
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
 * Use Netlify Function backend proxy for better rate limits
 * This prevents hitting strict browser-based API limits
 */
export const analyzeResource = async (input: { base64Data?: string, url?: string }): Promise<AnalysisResult> => {
  // Check if running on Netlify (production)
  const isNetlify = typeof window !== 'undefined' && window.location.hostname.includes('netlify');
  const backendUrl = isNetlify ? '/.netlify/functions/analyze' : 'http://localhost:8888/.netlify/functions/analyze';
  
  const modelConfig = getFromStorage<{ model: string }>("model_config") || { model: "gemini-2.5-flash" };
  const model = modelConfig.model;

  try {
    // Send request to backend proxy instead of calling API directly
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base64Data: input.base64Data,
        url: input.url,
        model: model,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Backend error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
