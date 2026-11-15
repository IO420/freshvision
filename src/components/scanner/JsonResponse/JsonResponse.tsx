'use client';

import React, { useState } from 'react';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { ApiJsonPayload } from '@/types/scanner';
import styles from './JsonResponse.module.css';

interface JsonResponseProps {
  payload: ApiJsonPayload;
}

export function JsonResponse({ payload }: JsonResponseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const lines = [
    { num: 1, content: <span className={styles.punctuation}>{'{'}</span> },
    {
      num: 2,
      content: (
        <>
          {'  '}
          <span className={styles.key}>&quot;status&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.number}>{payload.status}</span>
          <span className={styles.punctuation}>,</span>
        </>
      ),
    },
    {
      num: 3,
      content: (
        <>
          {'  '}
          <span className={styles.key}>&quot;confidence&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.number}>{payload.confidence}</span>
          <span className={styles.punctuation}>,</span>
        </>
      ),
    },
    {
      num: 4,
      content: (
        <>
          {'  '}
          <span className={styles.key}>&quot;label&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.string}>&quot;{payload.label}&quot;</span>
          <span className={styles.punctuation}>,</span>
        </>
      ),
    },
    {
      num: 5,
      content: (
        <>
          {'  '}
          <span className={styles.key}>&quot;freshness&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.string}>&quot;{payload.freshness}&quot;</span>
          <span className={styles.punctuation}>,</span>
        </>
      ),
    },
    {
      num: 6,
      content: (
        <>
          {'  '}
          <span className={styles.key}>&quot;inference_time&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.number}>{payload.inference_time_ms}</span>
        </>
      ),
    },
    { num: 7, content: <span className={styles.punctuation}>{'}'}</span> },
  ];

  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLeft}>
          <Code2 size={16} className={styles.codeIcon} />
          <span>Ver Respuesta JSON de la API</span>
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <div
        className={`${styles.collapseWrapper} ${isOpen ? styles.expanded : ''}`}
      >
        <div className={styles.collapseInner}>
          <pre className={styles.editor}>
            <code>
              {lines.map((line) => (
                <div key={line.num} className={styles.line}>
                  <span className={styles.lineNumber}>{line.num}</span>
                  <span>{line.content}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}