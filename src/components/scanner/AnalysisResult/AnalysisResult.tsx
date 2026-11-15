import React from 'react';
import { ScanLine, Check, AlertTriangle, XOctagon } from 'lucide-react';
import { FruitAnalysisData } from '@/types/scanner';
import { ConfidenceBar } from '../ConfidenceBar/ConfidenceBar';
import { RecommendationCard } from '../RecommendationCard/RecommendationCard';
import { JsonResponse } from '../JsonResponse/JsonResponse';
import styles from './AnalysisResult.module.css';

interface AnalysisResultProps {
  result: FruitAnalysisData | null;
  isAnalyzing: boolean;
}

const VERDICT_CONFIG = {
  fresh: {
    label: 'APTA PARA VENTA / FRESCA',
    bannerClass: styles.bannerFresh,
    icon: <Check size={18} strokeWidth={2.6} />,
  },
  warning: {
    label: 'ROTACIÓN URGENTE / PRÓXIMA A EXPIRAR',
    bannerClass: styles.bannerWarning,
    icon: <AlertTriangle size={18} strokeWidth={2.4} />,
  },
  spoiled: {
    label: 'NO APTA PARA VENTA / MERMA',
    bannerClass: styles.bannerSpoiled,
    icon: <XOctagon size={18} strokeWidth={2.4} />,
  },
};

export function AnalysisResult({ result, isAnalyzing }: AnalysisResultProps) {
  if (isAnalyzing) {
    return (
      <div className={styles.loadingState} aria-live="polite">
        <div className={styles.tensorStatus}>
          <span className={styles.spinnerDot} />
          <span>Preprocesando tensor (224x224) → Ejecutando CNN...</span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressIndeterminate} />
        </div>

        <div className={styles.skeletonBanner} />
        <div className={styles.skeletonBar} />
        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.wireframeBox}>
          <ScanLine size={34} strokeWidth={1.75} />
        </div>
        <p className={styles.emptyTitle}>Esperando imagen para inferencia...</p>
        <p className={styles.emptySubtitle}>
          Sube una fotografía, activa tu cámara o selecciona una de las muestras
          rápidas para visualizar el diagnóstico óptico.
        </p>
      </div>
    );
  }

  const verdict = VERDICT_CONFIG[result.status];

  return (
    <div className={styles.panel}>
      {/* Banner de Veredicto */}
      <div
        className={`${styles.verdictBanner} ${verdict.bannerClass}`}
        role="status"
      >
        <div className={styles.verdictLeft}>
          <span className={styles.verdictIconCircle}>{verdict.icon}</span>
          <div>
            <div className={styles.verdictTitle}>{verdict.label}</div>
            <div className={styles.verdictSub}>
              Clase detectada: <strong>{result.fruitType}</strong> · Vida útil:{' '}
              <strong>{result.shelfLife}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Confianza */}
      <ConfidenceBar confidence={result.confidence} status={result.status} />

      {/* Recomendaciones B2B y B2C */}
      <RecommendationCard
        retailText={result.retailRecommendation}
        consumerText={result.consumerRecommendation}
      />

      {/* Acordeón JSON */}
      <JsonResponse payload={result.jsonResponse} />
    </div>
  );
}