'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, AlertCircle } from 'lucide-react';
import { QUICK_SAMPLES } from '@/data/samples';
import { FruitAnalysisData } from '@/types/scanner';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
import { predictFruitImage } from '@/lib/api';
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
  const [currentFile, setCurrentFile] = useState<File | string | null>(null);
  const [activeResult, setActiveResult] = useState<FruitAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const executePrediction = async (
    source: File | string,
    name: string,
    fallbackSample?: FruitAnalysisData
  ) => {
    setIsAnalyzing(true);
    setApiError(null);

    try {
      const prediction = await predictFruitImage(source, name);
      setActiveResult(prediction);
    } catch (err) {
      console.error('Error al conectar con la API de freshVision:', err);
      if (fallbackSample) {
        // Si el backend no está encendido aún, muestra el respaldo de la muestra rápida
        setActiveResult(fallbackSample);
        setApiError('API sin conexión: mostrando datos de demostración.');
      } else {
        setApiError(
          'No se pudo conectar con el servidor de inferencia. Verifica que la API esté activa.'
        );
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleClick = (sample: FruitAnalysisData) => {
    setSelectedSampleId(sample.id);
    setCurrentFile(sample.image);
    setStaticPreview(sample.image, sample.name);
    executePrediction(sample.image, `${sample.id}.webp`, sample);
  };

  const handleCustomFile = (file: File | null) => {
    const isValid = handleFileSelect(file);
    if (isValid && file) {
      setSelectedSampleId(null);
      setCurrentFile(file);
      executePrediction(file, file.name);
    }
  };

  const handleClear = () => {
    clearPreview();
    setSelectedSampleId(null);
    setCurrentFile(null);
    setActiveResult(null);
    setApiError(null);
    setIsAnalyzing(false);
  };

  const handleManualReanalyze = () => {
    if (!currentFile) return;
    const fallback = selectedSampleId
      ? QUICK_SAMPLES.find((s) => s.id === selectedSampleId)
      : undefined;

    executePrediction(currentFile, fileName || 'image.webp', fallback);
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

          <div className={styles.latencyBadge} title="Tiempo de inferencia">
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
                    {isAnalyzing ? 'Analizando imagen...' : 'Volver a Analizar'}
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
            {apiError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: '#92400E',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                }}
                role="alert"
              >
                <AlertCircle size={15} />
                <span>{apiError}</span>
              </div>
            )}

            <AnalysisResult result={activeResult} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </section>
  );
}