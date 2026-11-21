import React from 'react';

export default function MisionVision() {
  return (
    <section id="identidad" className="mv-section">
      <style>{`
        .mv-section {
          padding: 5rem 1.5rem;
          max-width: 72rem;
          margin: 0 auto;
        }
        .mv-header {
          text-align: center;
          max-width: 42rem;
          margin: 0 auto 3rem;
        }
        .mv-badge {
          display: inline-block;
          padding: 0.35rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 9999px;
          background-color: rgba(16, 185, 129, 0.12);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.25);
          margin-bottom: 1rem;
        }
        .mv-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          line-height: 1.2;
          color: #0f172a;
          margin: 0 0 0.75rem;
        }
        .mv-subtitle {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .mv-grid {
            grid-template-columns: 1fr;
          }
        }
        .mv-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }
        .mv-card-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }
        .mv-icon-box {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mv-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }
        .mv-card-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #334155;
          margin: 0;
        }
      `}</style>

      <div className="mv-header">
        <span className="mv-badge">Identidad y Propósito</span>
        <h2 className="mv-title">Tecnología que mantiene lo natural</h2>
        <p className="mv-subtitle">
          Conectamos la visión por computadora con el consumo responsable y la eficiencia en anaquel.
        </p>
      </div>

      <div className="mv-grid">
        <article className="mv-card">
          <div className="mv-card-header">
            <div className="mv-icon-box" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="mv-card-title">Misión</h3>
          </div>
          <p className="mv-card-text">
            Democratizar el control de calidad de alimentos perecederos mediante visión por computadora, brindando a supermercados y consumidores diagnósticos instantáneos de frescura que optimizan la rotación en anaquel y reducen la merma hasta en un 35 %.
          </p>
        </article>

        <article className="mv-card">
          <div className="mv-card-header">
            <div className="mv-icon-box" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="mv-card-title">Visión</h3>
          </div>
          <p className="mv-card-text">
            Consolidarnos como el estándar tecnológico de auditoría óptica en el sector retail y en el consumo inteligente, impulsando cadenas de suministro más sostenibles donde la inteligencia artificial elimine el desperdicio innecesario de alimentos.
          </p>
        </article>
      </div>
    </section>
  );
}