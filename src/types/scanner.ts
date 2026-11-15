export type FreshnessStatus = 'fresh' | 'warning' | 'spoiled';

export interface ApiJsonPayload {
  status: number;
  confidence: number;
  label: string;
  freshness: string;
  shelf_life_days: string;
  inference_time_ms: number;
}

export interface FruitAnalysisData {
  id: string;
  name: string;
  image: string;
  fruitType: string;
  status: FreshnessStatus;
  confidence: number;
  freshness: string;
  shelfLife: string;
  inferenceTime: number;
  retailRecommendation: string;
  consumerRecommendation: string;
  jsonResponse: ApiJsonPayload;
}