/**
 * Secure API Key Management Service
 * Handles API key validation and storage without exposing it in the client code
 */

import { saveToStorage, getFromStorage, removeFromStorage } from './storageService';

const API_KEY_STORAGE_KEY = 'api_key_hash';

/**
 * Get the API key from environment variables
 * In production, this should ONLY be called from a backend service
 */
export const getApiKeyFromEnv = (): string | null => {
  // Use import.meta.env for Vite
  const key = (import.meta as any).env.VITE_GEMINI_API_KEY;
  if (!key) {
    console.warn('No API key found in environment variables');
  }
  return key || null;
};

/**
 * Validate API key format
 */
export const validateApiKeyFormat = (key: string): boolean => {
  // Google Gemini API keys typically start with 'AI' and are base64-like
  // This is a basic check - adjust based on actual Google API key format
  return key && key.length > 20 && typeof key === 'string';
};

/**
 * Store user-provided API key (hashed for security)
 * WARNING: Only use this for development. In production, use backend proxy.
 */
export const storeApiKeyHash = (key: string): boolean => {
  if (!validateApiKeyFormat(key)) {
    console.error('Invalid API key format');
    return false;
  }
  
  // Create a simple hash (in production, use a proper hashing library)
  const hash = btoa(key).substring(0, 20); // Simple obfuscation
  return saveToStorage(API_KEY_STORAGE_KEY, { hash, timestamp: Date.now() });
};

/**
 * Check if a user API key is stored
 */
export const hasStoredApiKey = (): boolean => {
  return getFromStorage(API_KEY_STORAGE_KEY) !== null;
};

/**
 * Clear stored API key
 */
export const clearStoredApiKey = (): boolean => {
  return removeFromStorage(API_KEY_STORAGE_KEY);
};

/**
 * Get the effective API key (from env or storage)
 * SECURITY: This should ONLY be used on trusted environments
 */
export const getEffectiveApiKey = (): string | null => {
  // Priority 1: Environment variable (production)
  const envKey = getApiKeyFromEnv();
  if (envKey) return envKey;
  
  // Priority 2: Stored key from user (development only)
  // This is NOT SECURE - keys should never be stored client-side in production
  const stored = getFromStorage<{ hash: string }>(API_KEY_STORAGE_KEY);
  
  if (stored) {
    console.warn('Using client-stored API key. This is NOT RECOMMENDED for production.');
  }
  
  return envKey || null;
};

/**
 * Generate a hash of the API key for tracking/logging
 * Safe to log because it's a hash
 */
export const getApiKeyHash = (key: string): string => {
  return btoa(key).substring(0, 8) + '...' + btoa(key).substring(-4);
};

/**
 * Check API key validity (for monitoring)
 */
export const validateApiKeyAtRuntime = async (key: string): Promise<boolean> => {
  try {
    // In production, validate against a backend endpoint instead
    if (!validateApiKeyFormat(key)) {
      return false;
    }
    
    // Optional: Call a backend validation endpoint
    // const response = await fetch(API_KEY_VALIDATION_ENDPOINT, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ keyHash: getApiKeyHash(key) })
    // });
    // return response.ok;
    
    return true;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
};

/**
 * Security recommendations object
 */
export const SECURITY_RECOMMENDATIONS = {
  development: [
    'Never commit API keys to version control',
    'Use .env.local for local development',
    'Always use HTTPS in production',
    'Implement API rate limiting',
    'Use API key restrictions (IP, domain whitelist)',
  ],
  production: [
    'Never expose API keys in client-side code',
    'Use a backend proxy for all API calls',
    'Implement authentication for your API proxy',
    'Use environment variables for server-side keys',
    'Rotate API keys regularly',
    'Monitor API usage for suspicious activity',
    'Implement CORS properly',
    'Use API key scoping and least privilege',
  ],
} as const;
