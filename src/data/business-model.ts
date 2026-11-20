import { BusinessPlan } from '@/types/business';

export const BUSINESS_PLANS: BusinessPlan[] = [
  
  {
    id: 'Gratuito',
    title: 'Plan Gratuito',
    subtitle: '(Freemium)',
    description:
      'Escanear un máximo de 20 fotos al día',
    highlightTag: 'Consumo Inteligente',
    iconName: 'smartphone',
  },
  {
    id: 'Suscripción',
    title: 'Plan Premium',
    subtitle: '(Freemium)',
    description:
      'Escanear un hasta  100 fotos al día',
    highlightTag: 'Consumo Inteligente',
    iconName: 'store',
  },
  {
    id: 'Roadmap',
    title: 'Roadmap Fase 2',
    subtitle: '(Multi-detección de Anaquel)',
    description:
      'Detección simultánea de múltiples objetos para auditar estantes completos en tiempo real.',
    highlightTag: 'Visión Escalar',
    iconName: 'rocket',
    hasMultiDetectionPreview: true,
  },
];