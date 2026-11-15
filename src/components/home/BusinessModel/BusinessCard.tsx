'use client';

import React from 'react';
import { Smartphone, Store, Rocket, ArrowRight } from 'lucide-react';
import { BusinessPlan } from '@/types/business';
import styles from './BusinessModel.module.css';

interface BusinessCardProps {
  plan: BusinessPlan;
}

const ICON_MAP = {
  smartphone: <Smartphone size={22} />,
  store: <Store size={22} />,
  rocket: <Rocket size={22} />,
};

export function BusinessCard({ plan }: BusinessCardProps) {
  const handleCardAction = () => {
    const studioSection = document.getElementById('demo-en-vivo');
    if (studioSection) {
      studioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleCardAction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardAction();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${plan.title} ${plan.subtitle}`}
    >
      <div>
        <div className={styles.topRow}>
          <span className={styles.iconContainer}>
            {ICON_MAP[plan.iconName]}
          </span>
          <span className={styles.tag}>{plan.highlightTag}</span>
        </div>

        <div className={styles.body} style={{ marginTop: '18px' }}>
          <div className={styles.titleGroup}>
            <h3 className={styles.title}>{plan.title}</h3>
            <span className={styles.subtitle}>{plan.subtitle}</span>
          </div>

          <p className={styles.description}>{plan.description}</p>

          {plan.hasMultiDetectionPreview && (
            <div
              className={styles.boundingBoxPreview}
              aria-label="Vista conceptual de detección múltiple en anaquel"
            >
              <div className={styles.bboxItem}>
                <span className={styles.bboxLabel}>OBJ_01: Manzanas</span>
                <span className={styles.bboxScore}>98% Fresca</span>
              </div>
              <div className={`${styles.bboxItem} ${styles.bboxWarning}`}>
                <span className={styles.bboxLabel}>OBJ_02: Plátanos</span>
                <span className={styles.bboxScore}>Rotar 48h</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footerRow}>
        <span className={styles.ctaLabel}>Explorar alcance</span>
        <span className={styles.arrowButton} aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      </div>

      <span className={styles.bottomAccent} aria-hidden="true" />
    </article>
  );
}