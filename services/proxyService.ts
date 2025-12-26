/**
 * Proxy Service - Client-side proxy caller
 * Calls the backend API proxy instead of directly calling Gemini API
 */

interface AnalysisRequest {
  imageUrl?: string;
  url?: string;
  userQuery?: string;
}

interface AnalysisResponse {
  success: boolean;
  data?: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    sentiment: string;
  };
  error?: string;
}

/**
 * Get the API endpoint based on environment
 */
const getApiEndpoint = (): string => {
  // In development, use local netlify functions
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8888/.netlify/functions/analyze';
  }

  // In production, use the deployed endpoint
  const endpoint = (import.meta as any).env.VITE_API_ENDPOINT;
  if (endpoint) {
    return endpoint;
  }

  // Default to current origin with /.netlify/functions path
  return `${window.location.origin}/.netlify/functions/analyze`;
};

/**
 * Call the backend API proxy to analyze content
 */
export const analyzeWithProxy = async (
  request: AnalysisRequest
): Promise<AnalysisResponse> => {
  try {
    const endpoint = getApiEndpoint();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data: AnalysisResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Proxy analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Analysis failed',
    };
  }
};

/**
 * Check if proxy is available
 */
export const isProxyAvailable = async (): Promise<boolean> => {
  try {
    const endpoint = getApiEndpoint();
    const response = await fetch(endpoint, {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};
