export interface BusinessPlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlightTag: string;
  iconName: 'smartphone' | 'store' | 'rocket';
  hasMultiDetectionPreview?: boolean;
}