'use client';

import React from 'react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
import styles from './SectionContainer.module.css';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className = '',
}: SectionContainerProps) {
  const { ref, isVisible } = useRevealAnimation();

  return (
    <section
      id={id}
      ref={ref}
      className={`${styles.section} ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${className}`.trim()}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}