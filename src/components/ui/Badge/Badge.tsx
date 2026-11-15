import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'neutral';
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'brand', icon }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {icon && icon}
      <span>{children}</span>
    </span>
  );
}