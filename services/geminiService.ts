import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

export const analyzeScreenshot = async (base64Data: string): Promise<GeminiResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  // Use gemini-2.5-flash for vision tasks as per guidelines
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `You are a specialized AI Vision agent for LinkSnap. Your job is to extract the PRIMARY website or tool featured in a screenshot.

CRITICAL RULE: IGNORE THE CONTAINER
- If the screenshot is a YouTube video, Instagram post, or TikTok, DO NOT return "youtube.com" or "instagram.com". 
- These platforms are just the "delivery vehicle". You must look INSIDE the content area (the video frame or the posted image).
- Identify the software, tool, or website being discussed, demonstrated, or showcased.
- Look for logos in the corner of video frames, URLs written in video captions, or "Link in Bio" references.

EXTRACTION HIERARCHY:
1. A website URL visible inside a video/image (e.g., a browser tab shown within a screen recording).
2. A brand name/logo visible in the content (e.g., the Framer logo in a design tutorial).
3. The specific tool being reviewed or mentioned in the title/captions.

CATEGORIES:
- "Music", "Design", "Development", "Entertainment", "Social", "Productivity", "Content".`;

  const userPrompt = "Analyze this screenshot. Extract the actual tool/website being shown. Ignore the social media platform (YouTube/Instagram/etc) if it is just the host.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { text: userPrompt },
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Data.split(",")[1] || base64Data,
            },
          },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            url: { 
              type: Type.STRING,
              description: "The actual tool/website URL or name. NEVER youtube.com or instagram.com unless the site itself is the subject."
            },
            category: { 
              type: Type.STRING,
              description: "One of the provided categories."
            },
            suggestedCategories: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            subCategory: { 
              type: Type.STRING,
              description: "A specific niche, e.g. 'AI Video Generator'."
            },
            description: { 
              type: Type.STRING,
              description: "A 5-word summary of the tool/website."
            },
          },
          required: ["url", "category", "suggestedCategories", "subCategory", "description"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(text) as GeminiResponse;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
};