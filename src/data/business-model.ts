import { BusinessPlan } from '@/types/business';

export const BUSINESS_PLANS: BusinessPlan[] = [
  {
    id: 'b2c',
    title: 'Plan B2C',
    subtitle: '(Freemium)',
    description:
      'Escaneo individual gratuito para consumidores en el súper mediante cámara móvil instantánea.',
    highlightTag: 'Consumo Inteligente',
    iconName: 'smartphone',
  },
  {
    id: 'b2b',
    title: 'Plan B2B',
    subtitle: '(SaaS Supermercados)',
    description:
      'Suscripción mensual por sucursal para auditoría automatizada de mermas y rotación de anaquel.',
    highlightTag: 'Optimización Retail',
    iconName: 'store',
  },
  {
    id: 'roadmap',
    title: 'Roadmap Fase 2',
    subtitle: '(Multi-detección de Anaquel)',
    description:
      'Detección simultánea de múltiples objetos para auditar estantes completos en tiempo real.',
    highlightTag: 'Visión Escalar',
    iconName: 'rocket',
    hasMultiDetectionPreview: true,
  },
];