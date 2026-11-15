'use client';

import React, { useRef, useState } from 'react';
import { CloudUpload, Camera, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  previewUrl: string | null;
  fileName: string | null;
  error: string | null;
  onFileSelected: (file: File | null) => void;
  onClear: () => void;
}

export function ImageUploader({
  previewUrl,
  fileName,
  error,
  onFileSelected,
  onClear,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    onFileSelected(droppedFile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileSelected(selected);
    e.target.value = '';
  };

  return (
    <div className={styles.wrapper}>
      {/* Inputs ocultos para explorador y cámara */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleInputChange}
        aria-label="Seleccionar imagen desde dispositivo"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hiddenInput}
        onChange={handleInputChange}
        aria-label="Capturar fotografía con cámara"
      />

      {previewUrl ? (
        <div className={styles.previewContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={fileName || 'Vista previa de fruta seleccionada'}
            className={styles.previewImage}
          />
          <div className={styles.previewOverlay}>
            <span className={styles.fileLabel}>
              {fileName || 'Imagen cargada'}
            </span>
            <div className={styles.previewActions}>
              <button
                type="button"
                className={styles.actionIconBtn}
                onClick={() => fileInputRef.current?.click()}
                title="Reemplazar fotografía"
              >
                <RefreshCw size={13} />
                <span>Cambiar</span>
              </button>
              <button
                type="button"
                className={`${styles.actionIconBtn} ${styles.clearBtn}`}
                onClick={onClear}
                title="Quitar imagen"
                aria-label="Limpiar selección"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.uploadIconWrapper}>
            <CloudUpload size={22} />
          </div>

          <p className={styles.primaryText}>
            Arrastra una imagen aquí o{' '}
            <button
              type="button"
              className={styles.browseTrigger}
              onClick={() => fileInputRef.current?.click()}
            >
              explora
            </button>
          </p>

          <p className={styles.secondaryText}>o usa tu cámara</p>

          <Button
            type="button"
            size="sm"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera size={16} />
            <span>Capturar con Cámara</span>
          </Button>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}