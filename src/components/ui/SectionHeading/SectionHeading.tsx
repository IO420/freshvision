import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function SectionHeading({ title, subtitle, icon }: SectionHeadingProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        {icon && <span className={styles.iconWrapper}>{icon}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}