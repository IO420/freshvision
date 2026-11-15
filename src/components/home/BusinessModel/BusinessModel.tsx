'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BUSINESS_PLANS } from '@/data/business-model';
import { SectionContainer } from '@/components/layout/SectionContainer/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { BusinessCard } from './BusinessCard';
import styles from './BusinessModel.module.css';

export function BusinessModel() {
  return (
    <SectionContainer id="modelo-de-negocio">
      <SectionHeading
        title="Modelo de Negocio Híbrido"
        subtitle="Innovación escalable para un futuro más fresco."
        icon={<TrendingUp size={20} />}
      />

      <div className={styles.grid}>
        {BUSINESS_PLANS.map((plan) => (
          <BusinessCard key={plan.id} plan={plan} />
        ))}
      </div>
    </SectionContainer>
  );
}