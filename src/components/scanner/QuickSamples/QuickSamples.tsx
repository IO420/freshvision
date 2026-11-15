'use client';

import React from 'react';
import Image from 'next/image';
import { FruitAnalysisData } from '@/types/scanner';
import styles from './QuickSamples.module.css';

interface QuickSamplesProps {
  samples: FruitAnalysisData[];
  selectedId: string | null;
  onSelectSample: (sample: FruitAnalysisData) => void;
}

export function QuickSamples({
  samples,
  selectedId,
  onSelectSample,
}: QuickSamplesProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Muestras Rápidas:</span>

      <div className={styles.grid}>
        {samples.map((sample) => {
          const isSelected = selectedId === sample.id;

          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className={`${styles.card} ${isSelected ? styles.active : ''}`}
              aria-pressed={isSelected}
            >
              <div className={styles.thumbWrapper}>
                <Image
                  src={sample.image}
                  alt={sample.name}
                  fill
                  sizes="120px"
                  className={styles.thumbImage}
                />
              </div>
              <span className={styles.label}>{sample.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}