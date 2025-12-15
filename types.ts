
export interface ScanResult {
  id: string;
  url: string;
  category: string;
  suggestedCategories?: string[]; // New: alternatives for user to pick from
  subCategory: string;
  description: string;
  timestamp: number;
  imageData?: string; // Base64 of the screenshot
}

export type ViewMode = 'grid' | 'list';

export interface GeminiResponse {
  url: string;
  category: string;
  suggestedCategories: string[];
  subCategory: string;
  description: string;
}
