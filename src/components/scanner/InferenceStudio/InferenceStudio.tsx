'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import {
  QUICK_SAMPLES,
  CUSTOM_UPLOAD_FALLBACK,
} from '@/data/samples';
import { FruitAnalysisData } from '@/types/scanner';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
import { Button } from '@/components/ui/Button/Button';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { QuickSamples } from '../QuickSamples/QuickSamples';
import { AnalysisResult } from '../AnalysisResult/AnalysisResult';
import styles from './InferenceStudio.module.css';

export function InferenceStudio() {
  const { ref, isVisible } = useRevealAnimation();
  const {
    previewUrl,
    fileName,
    error,
    handleFileSelect,
    setStaticPreview,
    clearPreview,
  } = useImagePreview();

  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<FruitAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runSimulatedInference = (targetData: FruitAnalysisData) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsAnalyzing(true);
    timerRef.current = setTimeout(() => {
      setActiveResult(targetData);
      setIsAnalyzing(false);
    }, 950);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSampleClick = (sample: FruitAnalysisData) => {
    setSelectedSampleId(sample.id);
    setStaticPreview(sample.image, sample.name);
    runSimulatedInference(sample);
  };

  const handleCustomFile = (file: File | null) => {
    const isValid = handleFileSelect(file);
    if (isValid && file) {
      setSelectedSampleId(null);
      const customResult: FruitAnalysisData = {
        ...CUSTOM_UPLOAD_FALLBACK,
        name: file.name,
      };
      runSimulatedInference(customResult);
    }
  };

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    clearPreview();
    setSelectedSampleId(null);
    setActiveResult(null);
    setIsAnalyzing(false);
  };

  const handleManualReanalyze = () => {
    if (!previewUrl) return;
    if (selectedSampleId) {
      const found = QUICK_SAMPLES.find((s) => s.id === selectedSampleId);
      if (found) {
        runSimulatedInference(found);
        return;
      }
    }
    runSimulatedInference({
      ...CUSTOM_UPLOAD_FALLBACK,
      name: fileName || 'Imagen analizada',
    });
  };

  const displayedLatency = activeResult ? activeResult.inferenceTime : 142;

  return (
    <section
      id="demo-en-vivo"
      ref={ref}
      className={`${styles.studioSection} ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
    >
      <div className={styles.studioCard}>
        {/* Encabezado */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logoBox}>
              <Image
                src="/images/branding/freshvision-symbol.svg"
                alt="freshVision Studio"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className={styles.title}>Live AI Inference Studio</h2>
              <p className={styles.description}>
                Sube una imagen o toma una foto para analizar su frescura en
                segundos.
              </p>
            </div>
          </div>

          <div className={styles.latencyBadge} title="Tiempo de inferencia simulado">
            <span className={styles.latencyDot} aria-hidden="true" />
            <span>{displayedLatency} ms</span>
          </div>
        </div>

        {/* Workspace 2 Columnas */}
        <div className={styles.workspaceGrid}>
          {/* Panel Izquierdo */}
          <div className={styles.leftColumn}>
            <ImageUploader
              previewUrl={previewUrl}
              fileName={fileName}
              error={error}
              onFileSelected={handleCustomFile}
              onClear={handleClear}
            />

            {previewUrl && (
              <div className={styles.analyzeButtonWrapper}>
                <Button
                  type="button"
                  size="md"
                  className={styles.fullWidthBtn}
                  onClick={handleManualReanalyze}
                  disabled={isAnalyzing}
                >
                  <Sparkles size={16} />
                  <span>
                    {isAnalyzing ? 'Analizando muestra...' : 'Ejecutar Inferencia IA'}
                  </span>
                </Button>
              </div>
            )}

            <QuickSamples
              samples={QUICK_SAMPLES}
              selectedId={selectedSampleId}
              onSelectSample={handleSampleClick}
            />
          </div>

          {/* Panel Derecho */}
          <div className={styles.rightColumn}>
            <AnalysisResult result={activeResult} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </section>
  );
}