"use client";

import React, { useState } from "react";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";
import { ApiJsonPayload } from "@/types/scanner";
import styles from "./JsonResponse.module.css";

interface JsonResponseProps {
  payload: ApiJsonPayload;
}

export function JsonResponse({ payload }: JsonResponseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const probEntries = Object.entries(payload.probabilidades || {});

  const lines: React.ReactNode[] = [
    <span key="open" className={styles.punctuation}>
      {"{"}
    </span>,
    <React.Fragment key="filename">
      {"  "}
      <span className={styles.key}>&quot;filename&quot;</span>
      <span className={styles.punctuation}>: </span>
      <span className={styles.string}>&quot;{payload.filename}&quot;</span>
      <span className={styles.punctuation}>,</span>
    </React.Fragment>,
    <React.Fragment key="clase">
      {"  "}
      <span className={styles.key}>&quot;clase&quot;</span>
      <span className={styles.punctuation}>: </span>
      <span className={styles.string}>&quot;{payload.clase}&quot;</span>
      <span className={styles.punctuation}>,</span>
    </React.Fragment>,
    <React.Fragment key="confianza">
      {"  "}
      <span className={styles.key}>&quot;confianza&quot;</span>
      <span className={styles.punctuation}>: </span>
      <span className={styles.number}>{payload.confianza}</span>
      <span className={styles.punctuation}>,</span>
    </React.Fragment>,
    <React.Fragment key="prob-open">
      {"  "}
      <span className={styles.key}>&quot;probabilidades&quot;</span>
      <span className={styles.punctuation}>: {"{"}</span>
    </React.Fragment>,
    ...probEntries.map(([key, value], index) => {
      const isLast = index === probEntries.length - 1;
      return (
        <React.Fragment key={`prob-${key}`}>
          {"    "}
          <span className={styles.key}>&quot;{key}&quot;</span>
          <span className={styles.punctuation}>: </span>
          <span className={styles.number}>{value}</span>
          {!isLast && <span className={styles.punctuation}>,</span>}
        </React.Fragment>
      );
    }),
    <React.Fragment key="prob-close">
      {"  "}
      <span className={styles.punctuation}>{"}"}</span>
    </React.Fragment>,
    <span key="close" className={styles.punctuation}>
      {"}"}
    </span>,
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
        className={`${styles.collapseWrapper} ${isOpen ? styles.expanded : ""}`}
      >
        <div className={styles.collapseInner}>
          <pre className={styles.editor}>
            <code>
              {lines.map((lineContent, idx) => (
                <div key={idx} className={styles.line}>
                  <span className={styles.lineNumber}>{idx + 1}</span>
                  <span>{lineContent}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
