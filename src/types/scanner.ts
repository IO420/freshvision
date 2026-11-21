export type FreshnessStatus = 'fresh' | 'warning' | 'spoiled';

export interface ApiJsonPayload {
  filename: string;
  clase: string;
  confianza: number;
  probabilidades: Record<string, number>;
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