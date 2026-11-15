'use client';

import React, { useEffect, useState } from 'react';
import { FreshnessStatus } from '@/types/scanner';
import styles from './ConfidenceBar.module.css';

interface ConfidenceBarProps {
  confidence: number;
  status: FreshnessStatus;
}

export function ConfidenceBar({ confidence, status }: ConfidenceBarProps) {
  const targetPercent = Number((confidence * 100).toFixed(1));
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    setAnimatedWidth(0);
    const frame = requestAnimationFrame(() => {
      setAnimatedWidth(targetPercent);
    });
    return () => cancelAnimationFrame(frame);
  }, [targetPercent]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.percentage}>{targetPercent}% de certeza</span>
        <span className={styles.caption}>Índice de confianza CNN</span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={targetPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Nivel de certeza del análisis"
      >
        <div
          className={`${styles.fill} ${styles[status]}`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
}