import axios from 'axios';
import { FreshnessStatus, FruitAnalysisData } from '@/types/scanner';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 15000,
});


export interface RawBackendPrediction {
  label?: string;
  fruit?: string;
  class_name?: string;
  freshness?: string;
  status?: string;
  confidence?: number;
  inference_time_ms?: number;
  inference_time?: number;
}

function resolveFreshnessStatus(rawText: string): FreshnessStatus {
  const normalized = rawText.toLowerCase();

  if (
    normalized.includes('spoiled') ||
    normalized.includes('rotten') ||
    normalized.includes('deteriorad') ||
    normalized.includes('merma') ||
    normalized.includes('bad')
  ) {
    return 'spoiled';
  }

  if (
    normalized.includes('ripe') ||
    normalized.includes('warning') ||
    normalized.includes('madur') ||
    normalized.includes('expirar') ||
    normalized.includes('rotacion')
  ) {
    return 'warning';
  }

  return 'fresh';
}

function getRecommendationsByStatus(status: FreshnessStatus) {
  switch (status) {
    case 'spoiled':
      return {
        freshnessLabel: 'Deteriorada',
        shelfLife: 'No apta',
        retail:
          'Retirar inmediatamente del lote para evitar contaminación cruzada.',
        consumer:
          'No recomendable para consumo. Presenta signos visibles de deterioro.',
      };
    case 'warning':
      return {
        freshnessLabel: 'Próxima a expirar',
        shelfLife: '2-3 días',
        retail:
          'Priorizar en frente de anaquel o aplicar descuento de rotación rápida.',
        consumer:
          'Ideal para consumo inmediato en los próximos 2 a 3 días.',
      };
    case 'fresh':
    default:
      return {
        freshnessLabel: 'Fresca',
        shelfLife: '5-7 días',
        retail:
          'Mantener en anaquel principal con monitoreo estándar de temperatura.',
        consumer:
          'Excelente punto de frescura para consumo durante toda la semana.',
      };
  }
}

export async function predictFruitImage(
  imageSource: File | string,
  fileName = 'sample.webp'
): Promise<FruitAnalysisData> {
  const formData = new FormData();

  if (imageSource instanceof File) {
    formData.append('file', imageSource);
  } else {
    // Si viene de las Muestras Rápidas (ruta local /images/fruits/...), la convertimos a Blob/File
    const response = await fetch(imageSource);
    const blob = await response.blob();
    const fileFromSample = new File([blob], fileName, {
      type: blob.type || 'image/webp',
    });
    formData.append('file', fileFromSample);
  }

  const startTime = performance.now();

  
  const { data } = await apiClient.post<RawBackendPrediction>(
    '/predict',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  const elapsedMs = Math.round(performance.now() - startTime);

  const detectedLabel =
    data.label || data.fruit || data.class_name || 'Producto Analizado';
  const rawCondition = data.freshness || data.status || 'Fresca';
  const status = resolveFreshnessStatus(rawCondition);
  const meta = getRecommendationsByStatus(status);

  
  const rawConf = typeof data.confidence === 'number' ? data.confidence : 0.9;
  const normalizedConfidence = rawConf > 1 ? rawConf / 100 : rawConf;
  const inferenceTime =
    data.inference_time_ms ?? data.inference_time ?? elapsedMs;

  return {
    id: `api-${Date.now()}`,
    name: fileName,
    image: typeof imageSource === 'string' ? imageSource : '',
    fruitType: detectedLabel,
    status,
    confidence: Number(normalizedConfidence.toFixed(4)),
    freshness: meta.freshnessLabel,
    shelfLife: meta.shelfLife,
    inferenceTime,
    retailRecommendation: meta.retail,
    consumerRecommendation: meta.consumer,
    jsonResponse: {
      status: 200,
      confidence: Number(normalizedConfidence.toFixed(4)),
      label: detectedLabel,
      freshness: meta.freshnessLabel,
      shelf_life_days: meta.shelfLife,
      inference_time_ms: inferenceTime,
    },
  };
}