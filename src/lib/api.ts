import axios from "axios";
import { FreshnessStatus, FruitAnalysisData } from "@/types/scanner";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

export type ModelClassKey =
  | "freshapples"
  | "freshbanana"
  | "freshoranges"
  | "rottenapples"
  | "rottenbanana"
  | "rottenoranges";

export interface RawBackendPrediction {
  filename: string;
  clase: ModelClassKey | string;
  confianza: number;
  probabilidades?: Record<string, number>;
}

const CLASS_CATALOG: Record<
  ModelClassKey,
  {
    label: string;
    status: FreshnessStatus;
    freshness: string;
    shelfLife: string;
    retail: string;
    consumer: string;
  }
> = {
  freshapples: {
    label: "Manzana Roja",
    status: "fresh",
    freshness: "Fresca",
    shelfLife: "5-7 días",
    retail:
      "Mantener en anaquel principal con monitoreo estándar de temperatura.",
    consumer:
      "Excelente punto de frescura y textura para consumo durante la semana.",
  },
  freshbanana: {
    label: "Plátano Cavendish",
    status: "fresh",
    freshness: "Fresca",
    shelfLife: "4-6 días",
    retail: "Mantener en exhibición principal. Vida útil estimada: 4 a 6 días.",
    consumer:
      "Punto óptimo de maduración para consumo directo o almacenamiento en hogar.",
  },
  freshoranges: {
    label: "Naranja Valencia",
    status: "fresh",
    freshness: "Fresca",
    shelfLife: "7-10 días",
    retail:
      "Apta para exhibición estándar en área de cítricos con rotación regular.",
    consumer:
      "Fruta fresca y jugosa, ideal para consumo durante los próximos 7 a 10 días.",
  },
  rottenapples: {
    label: "Manzana Deteriorada",
    status: "spoiled",
    freshness: "Deteriorada",
    shelfLife: "No apta",
    retail:
      "Retirar inmediatamente del lote para evitar liberación de etileno y merma cruzada.",
    consumer:
      "No recomendable para consumo. Presenta signos avanzados de descomposición.",
  },
  rottenbanana: {
    label: "Plátano Deteriorado",
    status: "spoiled",
    freshness: "Deteriorada",
    shelfLife: "No apta",
    retail:
      "Retirar de piso de venta de inmediato y registrar como merma orgánica.",
    consumer:
      "No apto para consumo fresco debido a oxidación y deterioro avanzado.",
  },
  rottenoranges: {
    label: "Naranja con Merma",
    status: "spoiled",
    freshness: "Deteriorada",
    shelfLife: "No apta",
    retail:
      "Retirar inmediatamente del lote para evitar contaminación fúngica cruzada.",
    consumer:
      "No recomendable para consumo. Presenta signos visibles de deterioro.",
  },
};

function mapClassMetadata(rawClass: string) {
  const key = rawClass.toLowerCase().trim() as ModelClassKey;

  if (key in CLASS_CATALOG) {
    return CLASS_CATALOG[key];
  }

  // Respaldo genérico por si en el futuro agregas nuevas clases al modelo
  const isSpoiled = key.startsWith("rotten");
  return {
    label: rawClass,
    status: (isSpoiled ? "spoiled" : "fresh") as FreshnessStatus,
    freshness: isSpoiled ? "Deteriorada" : "Fresca",
    shelfLife: isSpoiled ? "No apta" : "5-7 días",
    retail: isSpoiled
      ? "Retirar inmediatamente del lote para evitar contaminación cruzada."
      : "Mantener en anaquel principal con monitoreo estándar.",
    consumer: isSpoiled
      ? "No recomendable para consumo."
      : "Apta para compra y consumo fresco.",
  };
}

export async function predictFruitImage(
  imageSource: File | string,
  fileName = "sample.webp",
): Promise<FruitAnalysisData> {
  const formData = new FormData();

  if (imageSource instanceof File) {
    formData.append("file", imageSource);
  } else {
    const response = await fetch(imageSource);
    const blob = await response.blob();
    const fileFromSample = new File([blob], fileName, {
      type: blob.type || "image/webp",
    });
    formData.append("file", fileFromSample);
  }

  const startTime = performance.now();

  const { data } = await apiClient.post<RawBackendPrediction>(
    "/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  const inferenceTime = Math.max(1, Math.round(performance.now() - startTime));
  const meta = mapClassMetadata(data.clase);

  const normalizedConfidence =
    data.confianza > 1 ? data.confianza / 100 : data.confianza;

return {
    id: `api-${Date.now()}`,
    name: data.filename || fileName,
    image: typeof imageSource === 'string' ? imageSource : '',
    fruitType: meta.label,
    status: meta.status,
    confidence: Number(normalizedConfidence.toFixed(4)),
    freshness: meta.freshness,
    shelfLife: meta.shelfLife,
    inferenceTime,
    retailRecommendation: meta.retail,
    consumerRecommendation: meta.consumer,
    jsonResponse: {
      filename: data.filename || fileName,
      clase: data.clase,
      confianza: data.confianza,
      probabilidades: data.probabilidades ?? {},
    },
  };
}
