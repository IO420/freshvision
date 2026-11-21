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
    shelfLife: '4-6 días',
    inferenceTime: 128,
    retailRecommendation:
      'Mantener en exhibición principal. Vida útil estimada: 4 a 6 días.',
    consumerRecommendation:
      'Punto óptimo de maduración para consumo directo o almacenamiento en hogar.',
    jsonResponse: {
      filename: 'banana-fresh.webp',
      clase: 'freshbanana',
      confianza: 0.982,
      probabilidades: {
        freshapples: 0.002,
        freshbanana: 0.982,
        freshoranges: 0.001,
        rottenapples: 0.003,
        rottenbanana: 0.011,
        rottenoranges: 0.001,
      },
    },
  },
  {
    id: 'apple',
    name: 'Manzana Madura',
    image: '/images/fruits/apple-ripe.webp',
    fruitType: 'Manzana Roja',
    status: 'fresh',
    confidence: 0.947,
    freshness: 'Fresca',
    shelfLife: '5-7 días',
    inferenceTime: 142,
    retailRecommendation:
      'Mantener en anaquel principal con monitoreo estándar de temperatura.',
    consumerRecommendation:
      'Excelente punto de frescura y textura para consumo durante la semana.',
    jsonResponse: {
      filename: 'apple-ripe.webp',
      clase: 'freshapples',
      confianza: 0.947,
      probabilidades: {
        freshapples: 0.947,
        freshbanana: 0.004,
        freshoranges: 0.008,
        rottenapples: 0.036,
        rottenbanana: 0.002,
        rottenoranges: 0.003,
      },
    },
  },
  {
    id: 'orange',
    name: 'Naranja con Merma',
    image: '/images/fruits/orange-spoiled.webp',
    fruitType: 'Naranja con Merma',
    status: 'spoiled',
    confidence: 1,
    freshness: 'Deteriorada',
    shelfLife: 'No apta',
    inferenceTime: 156,
    retailRecommendation:
      'Retirar inmediatamente del lote para evitar contaminación fúngica cruzada.',
    consumerRecommendation:
      'No recomendable para consumo. Presenta signos visibles de deterioro.',
    jsonResponse: {
      filename: 'orange-spoiled.webp',
      clase: 'rottenoranges',
      confianza: 1,
      probabilidades: {
        freshapples: 0,
        freshbanana: 0,
        freshoranges: 0,
        rottenapples: 0,
        rottenbanana: 0,
        rottenoranges: 1,
      },
    },
  },
];