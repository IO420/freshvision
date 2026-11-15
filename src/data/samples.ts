import { FruitAnalysisData } from '@/types/scanner';

export const QUICK_SAMPLES: FruitAnalysisData[] = [
  {
    id: 'banana',
    name: 'Plátano Óptimo',
    image: '/images/fruits/banana-fresh.webp',
    fruitType: 'Plátano Cavendish',
    status: 'fresh',
    confidence: 0.982,
    freshness: 'Fresca',
    shelfLife: '5-7 días',
    inferenceTime: 128,
    retailRecommendation:
      'Mantener en anaquel principal. Vida útil estimada: 5 a 7 días.',
    consumerRecommendation:
      'Excelente punto de maduración para consumo durante toda la semana.',
    jsonResponse: {
      status: 200,
      confidence: 0.982,
      label: 'Plátano Cavendish',
      freshness: 'Fresca',
      shelf_life_days: '5-7',
      inference_time_ms: 128,
    },
  },
  {
    id: 'apple',
    name: 'Manzana Madura',
    image: '/images/fruits/apple-ripe.webp',
    fruitType: 'Manzana Roja',
    status: 'warning',
    confidence: 0.947,
    freshness: 'Próxima a expirar',
    shelfLife: '2-3 días',
    inferenceTime: 142,
    retailRecommendation:
      'Priorizar en frente de anaquel o aplicar descuento de rotación rápida.',
    consumerRecommendation:
      'Ideal para consumo inmediato en los próximos 2 a 3 días.',
    jsonResponse: {
      status: 200,
      confidence: 0.947,
      label: 'Manzana Roja',
      freshness: 'Próxima a expirar',
      shelf_life_days: '2-3',
      inference_time_ms: 142,
    },
  },
  {
    id: 'orange',
    name: 'Naranja con Merma',
    image: '/images/fruits/orange-spoiled.jpg',
    fruitType: 'Naranja Valencia',
    status: 'spoiled',
    confidence: 0.963,
    freshness: 'Deteriorada',
    shelfLife: 'No apta',
    inferenceTime: 156,
    retailRecommendation:
      'Retirar inmediatamente del lote para evitar contaminación cruzada.',
    consumerRecommendation:
      'No recomendable para consumo. Presenta signos visibles de oxidación.',
    jsonResponse: {
      status: 200,
      confidence: 0.963,
      label: 'Naranja Valencia',
      freshness: 'Deteriorada',
      shelf_life_days: '0',
      inference_time_ms: 156,
    },
  },
];

export const CUSTOM_UPLOAD_FALLBACK: FruitAnalysisData = {
  id: 'custom-upload',
  name: 'Muestra Personalizada',
  image: '',
  fruitType: 'Producto Perecedero Detectado',
  status: 'fresh',
  confidence: 0.954,
  freshness: 'Fresca',
  shelfLife: '4-6 días',
  inferenceTime: 139,
  retailRecommendation:
    'Mantener en exhibición estándar con monitoreo regular de temperatura.',
  consumerRecommendation:
    'Apta para compra y consumo fresco en condiciones normales de hogar.',
  jsonResponse: {
    status: 200,
    confidence: 0.954,
    label: 'Producto Perecedero',
    freshness: 'Fresca',
    shelf_life_days: '4-6',
    inference_time_ms: 139,
  },
};