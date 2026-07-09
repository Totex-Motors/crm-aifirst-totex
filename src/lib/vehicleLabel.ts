// Helper para extrair um rótulo curto do veículo de interesse de um lead.
// Aceita o campo vehicle_of_interest (objeto ou array) em formatos variados
// (pt/en), vindo do AutoConf/feed ou preenchido manualmente.

type AnyRecord = Record<string, unknown>;

function firstVehicle(raw: unknown): AnyRecord | null {
  if (!raw) return null;
  if (Array.isArray(raw)) return (raw[0] as AnyRecord) ?? null;
  if (typeof raw === "object") return raw as AnyRecord;
  return null;
}

/** Retorna algo como "Toyota Corolla 2022" ou null se não houver dados. */
export function getVehicleLabel(raw: unknown): string | null {
  const v = firstVehicle(raw);
  if (!v) return null;

  // Título pronto tem prioridade
  const title = v.title ?? v.titulo ?? v.nome ?? v.name;
  if (title) return String(title);

  const make = v.make ?? v.marca ?? v.brand;
  const model = v.model ?? v.modelo;
  const year = v.year ?? v.ano;

  const label = [make, model, year].filter(Boolean).join(" ").trim();
  return label || null;
}
