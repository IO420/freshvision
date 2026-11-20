import React from 'react';

/**
 * Sección de Misión y Visión para freshVision.
 * Colócala después de la sección "Modelo de Negocio Híbrido" y antes del Footer.
 * En el Header, puedes agregar un enlace: <a href="#identidad">Nosotros</a>
 */
export default function MisionVision() {
  return (
    <section
      id="identidad"
      className="py-20 px-6 max-w-6xl mx-auto"
      aria-labelledby="identidad-titulo"
    >
      {/* Encabezado de sección */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
          Identidad y Propósito
        </span>
        <h2
          id="identidad-titulo"
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        >
          Tecnología que mantiene lo natural
        </h2>
        <p className="text-slate-400 text-base md:text-lg">
          Conectamos la visión por computadora con el consumo responsable y la
          eficiencia en anaquel.
        </p>
      </div>

      {/* Tarjetas paralelas: Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta Misión */}
        <article className="rounded-2xl p-8 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Misión</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Democratizar el control de calidad de alimentos perecederos mediante
            visión por computadora, brindando a supermercados y consumidores
            diagnósticos instantáneos de frescura que optimizan la rotación en
            anaquel y reducen la merma hasta en un 35&nbsp;%.
          </p>
        </article>

        {/* Tarjeta Visión */}
        <article className="rounded-2xl p-8 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Visión</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Consolidarnos como el estándar tecnológico de auditoría óptica en el
            sector retail y en el consumo inteligente, impulsando cadenas de
            suministro más sostenibles donde la inteligencia artificial elimine
            el desperdicio innecesario de alimentos.
          </p>
        </article>
      </div>
    </section>
  );
}
