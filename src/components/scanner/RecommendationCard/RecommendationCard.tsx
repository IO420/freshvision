import React from 'react';
import { Store, User } from 'lucide-react';
import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  retailText: string;
  consumerText: string;
}

export function RecommendationCard({
  retailText,
  consumerText,
}: RecommendationCardProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.iconCircle}>
            <Store size={16} />
          </span>
          <h4 className={styles.title}>Acción Retail (B2B)</h4>
        </div>
        <p className={styles.description}>{retailText}</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.iconCircle}>
            <User size={16} />
          </span>
          <h4 className={styles.title}>Acción Consumidor (B2C)</h4>
        </div>
        <p className={styles.description}>{consumerText}</p>
      </div>
    </div>
  );
}