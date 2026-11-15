import React from 'react';
import Image from 'next/image';
import { Camera, Code2, Apple, Activity, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="el-problema" className={styles.heroSection}>
      <div className={styles.container}>
        {/* Columna Izquierda */}
        <div className={styles.content}>
          <Badge icon={<Camera size={14} />}>
            Visión por Computadora aplicada a Retail y Consumo
          </Badge>

          <h1 className={styles.headline}>
            Reduce hasta un <span className={styles.highlight}>35%</span> la merma
            de perecederos con una sola fotografía.
          </h1>

          <p className={styles.subheadline}>
            Auditoría inteligente de frescura para cadenas de supermercados y
            selección óptica instantánea para consumidores. Impulsado por Redes
            Neuronales Convolucionales.
          </p>

          <div className={styles.ctaGroup}>
            <Button href="#demo-en-vivo" size="lg">
              <Camera size={18} />
              <span>Analizar Fruta Ahora</span>
            </Button>

            <Button href="#arquitectura-ia" variant="outline" size="lg">
              <Code2 size={18} />
              <span>Ver Arquitectura API</span>
            </Button>
          </div>
        </div>

        {/* Columna Derecha: Fotografía + HUD + Tarjetas Flotantes */}
        <div className={styles.visualWrapper}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/hero/apple-freshness-hero.jpg"
              alt="Análisis óptico de frescura sobre manzana roja"
              fill
              sizes="(max-width: 767px) 100vw, 430px"
              className={styles.heroImage}
              priority
            />

            {/* Esquinas de enfoque HUD + Línea de escaneo */}
            <div className={styles.hudOverlay} aria-hidden="true">
              <span className={`${styles.corner} ${styles.topLeft}`} />
              <span className={`${styles.corner} ${styles.topRight}`} />
              <span className={`${styles.corner} ${styles.bottomLeft}`} />
              <span className={`${styles.corner} ${styles.bottomRight}`} />
              <div className={styles.scanLine} />
            </div>
          </div>

          {/* Tres Tarjetas Flotantes de Telemetría */}
          <div className={styles.telemetryStack}>
            <div className={styles.telemetryCard}>
              <span className={styles.iconBoxRed}>
                <Apple size={18} />
              </span>
              <div className={styles.telemetryMeta}>
                <span className={styles.telemetryLabel}>Clase</span>
                <span className={styles.telemetryValue}>Manzana Roja</span>
              </div>
            </div>

            <div className={styles.telemetryCard}>
              <span className={styles.iconBoxGreen}>
                <Activity size={18} />
              </span>
              <div className={styles.telemetryMeta}>
                <span className={styles.telemetryLabel}>Frescura</span>
                <span className={styles.telemetryMono}>96.8%</span>
              </div>
            </div>

            <div className={styles.telemetryCard}>
              <span className={styles.iconBoxGreen}>
                <Calendar size={18} />
              </span>
              <div className={styles.telemetryMeta}>
                <span className={styles.telemetryLabel}>Vida útil est.</span>
                <span className={styles.telemetryValue}>5-7 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}