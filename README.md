# freshVision

**Tecnología que mantiene lo natural** — Plataforma de visión por computadora aplicada a Retail y Consumo para la auditoría inteligente de frescura en frutas y productos perecederos mediante Redes Neuronales Convolucionales (CNN).

---

## Descripción General

**freshVision** reduce hasta en un **35% la merma de productos perecederos** a partir de una sola fotografía. La aplicación web combina una landing page comercial con un **Live AI Inference Studio** interactivo que permite evaluar el estado de frescura de frutas en tiempo real, calcular el nivel de certeza del modelo y emitir recomendaciones accionables tanto para cadenas de supermercados (**B2B**) como para consumidores finales (**B2C**).

### Características Principales

* **Live AI Inference Studio:** Carga de imágenes mediante *Drag & Drop*, explorador de archivos, captura directa con cámara móvil (`capture="environment"`) y muestras rápidas de prueba.
* **Diagnóstico Semántico y Telemetría:** Clasificación visual inmediata (*Apta para venta / Fresca*, *Rotación urgente* o *No apta para venta / Merma*), barra de certeza animada y tiempo de inferencia en milisegundos.
* **Recomendaciones Duales (B2B / B2C):** Sugerencias operativas para gestión de anaquel en retail y orientación de consumo en hogar.
* **Inspector de Respuesta JSON:** Visor desplegable estilo editor de código con resaltado sintáctico que muestra la salida cruda de la API (`filename`, `clase`, `confianza` y distribución de `probabilidades`).
* **Arquitectura Modular y Escalable:** Desarrollada con Next.js App Router, TypeScript y CSS Modules sin dependencias de frameworks CSS externos.

---

## Stack Tecnológico

### Frontend
* **Framework:** Next.js (App Router)
* **Lenguaje:** TypeScript
* **Librería UI:** React
* **Estilos:** CSS Modules (`.module.css`) con sistema de tokens globales
* **Iconografía:** Lucide React
* **Cliente HTTP:** Axios

### Backend e Inteligencia Artificial
* **API REST:** FastAPI (Python)
* **Modelo de Visión:** TensorFlow / Redes Neuronales Convolucionales (CNN)

---

## Estructura del Proyecto

```text
freshvision/
├── public/
│   └── images/
│       ├── branding/
│       │   └── freshvision-symbol.svg
│       ├── fruits/
│       │   ├── apple-ripe.webp
│       │   ├── banana-fresh.webp
│       │   └── orange-spoiled.webp
│       └── hero/
│           └── apple-freshness-hero.webp
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── BusinessModel/
│   │   │   └── Hero/
│   │   ├── layout/
│   │   │   ├── Footer/
│   │   │   ├── Navbar/
│   │   │   └── SectionContainer/
│   │   ├── scanner/
│   │   │   ├── AnalysisResult/
│   │   │   ├── ConfidenceBar/
│   │   │   ├── ImageUploader/
│   │   │   ├── InferenceStudio/
│   │   │   ├── JsonResponse/
│   │   │   ├── QuickSamples/
│   │   │   └── RecommendationCard/
│   │   └── ui/
│   │       ├── Badge/
│   │       ├── Button/
│   │       └── SectionHeading/
│   │
│   ├── data/
│   │   ├── business-model.ts
│   │   └── samples.ts
│   │
│   ├── hooks/
│   │   ├── useImagePreview.ts
│   │   └── useRevealAnimation.ts
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── styles/
│   │   ├── animations.css
│   │   └── variables.css
│   │
│   └── types/
│       ├── business.ts
│       └── scanner.ts
│
├── .env.local
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Requisitos Previos

* **Node.js:** v18.18 o superior
* **Gestor de paquetes:** `npm`, `pnpm` o `yarn`
* **Backend FastAPI:** Servidor de inferencia ejecutándose localmente o en la nube (opcional; el frontend cuenta con respaldo de demostración si la API no está disponible)

---

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/freshvision.git
   cd freshvision
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto y define la URL de tu servidor de inferencia:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Contrato de Integración con la API

El frontend envía una petición `POST` con `Content-Type: multipart/form-data` al endpoint `/predict` adjuntando la imagen bajo el campo `file`.

### Clases Soportadas por el Modelo

| Clase API | Etiqueta Visual | Estado |
| :--- | :--- | :--- |
| `freshapples` | Manzana Roja | Fresca |
| `freshbanana` | Plátano Cavendish | Fresca |
| `freshoranges` | Naranja Valencia | Fresca |
| `rottenapples` | Manzana Deteriorada | Deteriorada (Merma) |
| `rottenbanana` | Plátano Deteriorado | Deteriorada (Merma) |
| `rottenoranges` | Naranja con Merma | Deteriorada (Merma) |

### Ejemplo de Respuesta Esperada (`200 OK`)

```json
{
  "filename": "orange-spoiled.jpg",
  "clase": "rottenoranges",
  "confianza": 1,
  "probabilidades": {
    "freshapples": 0,
    "freshbanana": 0,
    "freshoranges": 0,
    "rottenapples": 0,
    "rottenbanana": 0,
    "rottenoranges": 1
  }
}
```

---

## Modelo de Negocio Híbrido

* **Plan B2C (Freemium):** Escaneo individual gratuito para consumidores en el supermercado mediante cámara móvil instantánea.
* **Plan B2B (SaaS Supermercados):** Suscripción mensual por sucursal para auditoría automatizada de mermas y optimización de rotación en anaquel.
* **Roadmap Fase 2 (Multi-detección de Anaquel):** Evolución del motor hacia detección simultánea de múltiples productos en estantes completos.

---

## Equipo

* **Carlos Axel Espinosa Ramírez**
* **Lino Eduardo Avilés Hernández**
* **Imanol Alexy Mendez Amel**
* **Luis Angel Cipres Flores**
* **Eduardo Yair Gonzalez Lopez**
* **Ramón Mediana Hernandez**


---

© 2026 **freshVision**. Todos los derechos reservados.