export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ScanResult {
  id: string;
  url: string;
  category: string;
  suggestedCategories?: string[];
  subCategory: string;
  description: string;
  pricing?: string; 
  platform?: string;
  timestamp: number;
  imageData?: string;
  sources?: GroundingSource[];
}

export type ViewMode = 'grid' | 'list';

export interface GeminiResponse {
  url: string;
  category: string;
  suggestedCategories: string[];
  subCategory: string;
  description: string;
  pricing: string;
  platform: string;
}

export interface AnalysisResult extends GeminiResponse {
  sources: GroundingSource[];
}
