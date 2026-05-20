// =====================================================
// sync-vehicle-stock
// =====================================================
// Le o feed XML em config.VEHICLE_FEED_URL e sincroniza
// a tabela `vehicles`:
//   - upsert por id (campo <ID> do XML)
//   - veiculos sumidos do feed -> is_active=false (vendidos/removidos)
//
// Chamado por:
//   - POST direto (debug)
//   - Cron pg_cron a cada 15 min
// =====================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { requireIntegrationKey } from "../_shared/config.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ---------- XML helpers (regex — formato controlado, ASCII tags) ----------
function getTag(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : null;
}
function getAllTags(xml: string, tag: string): string[] {
  const out: string[] = [];
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}
function num(v: string | null | undefined): number | null {
  if (!v) return null;
  const n = parseFloat(String(v).replace(/[^0-9.,-]/g, "").replace(",", "."));
  return isNaN(n) ? null : n;
}
function int(v: string | null | undefined): number | null {
  const n = num(v);
  return n === null ? null : Math.round(n);
}
function parseDate(v: string | null): string | null {
  if (!v) return null;
  // formato "2026-05-12 11:13:11" ou unix epoch
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.replace(" ", "T") + "Z";
  if (/^\d+$/.test(v)) {
    const ts = parseInt(v, 10);
    if (ts > 1e12) return new Date(ts).toISOString();
    if (ts > 1e9) return new Date(ts * 1000).toISOString();
  }
  return null;
}

// ---------- Parser de cada AD ----------
function parseAd(adXml: string) {
  const id = getTag(adXml, "ID");
  if (!id) return null;

  // Imagens: pode ter multiplas IMAGE_URL dentro de <IMAGES>
  const imagesBlock = getTag(adXml, "IMAGES") || "";
  const images = getAllTags(imagesBlock, "IMAGE_URL");

  // Features
  const featuresBlock = getTag(adXml, "FEATURES") || "";
  const features = getAllTags(featuresBlock, "FEATURE");

  // PRICES embutido
  const pricesBlock = getTag(adXml, "PRICES") || "";
  const regular_price = num(getTag(pricesBlock, "REGULAR_PRICE"));
  const promotion_price = num(getTag(pricesBlock, "PROMOTION_PRICE"));

  return {
    id,
    url: getTag(adXml, "URL"),
    title: getTag(adXml, "TITLE") || "(sem titulo)",
    description: getTag(adXml, "DESCRIPTION"),

    seller: getTag(adXml, "SELLER") || "Desconhecido",
    category: getTag(adXml, "CATEGORY"),
    condition: getTag(adXml, "CONDITION"),
    negotiation: getTag(adXml, "NEGOTIATION"),

    make: getTag(adXml, "MAKE"),
    model: getTag(adXml, "MODEL"),
    version: getTag(adXml, "VERSION"),
    body: getTag(adXml, "BODY"),
    year: int(getTag(adXml, "YEAR")),
    fabric_year: int(getTag(adXml, "FABRIC_YEAR")),
    color: getTag(adXml, "COLOR"),
    mileage: int(getTag(adXml, "MILEAGE")),
    fuel: getTag(adXml, "FUEL"),
    gear: getTag(adXml, "gear"),  // lowercase no XML
    motor: getTag(adXml, "MOTOR"),
    doors: int(getTag(adXml, "DOORS")),
    hp: getTag(adXml, "HP"),
    fipe: getTag(adXml, "FIPE"),

    plate: getTag(adXml, "PLATE"),
    full_plate: getTag(adXml, "FULL_PLATE"),

    price: num(getTag(adXml, "PRICE")),
    regular_price,
    promotion_price,

    location_country: getTag(adXml, "LOCATION_COUNTRY"),
    location_state: getTag(adXml, "LOCATION_STATE"),
    location_city: getTag(adXml, "LOCATION_CITY"),
    neighborhood: getTag(adXml, "NEIGHBORHOOD"),
    zip_code: getTag(adXml, "ZIP_CODE"),

    images: images,
    features: features,
    video: getTag(adXml, "VIDEO") || null,

    published_at: parseDate(getTag(adXml, "PUBLISHED")),
    last_updated_at: parseDate(getTag(adXml, "LAST_UPDATED")) || parseDate(getTag(adXml, "DATE")),

    is_active: true,
    is_sold: false,
    last_seen_at: new Date().toISOString(),
  };
}

// ---------- Handler ----------
Deno.serve(async (_req) => {
  const startedAt = Date.now();
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const feedUrl = await requireIntegrationKey(supabase, "VEHICLE_FEED_URL");
    console.log("[sync-vehicle-stock] Fetching", feedUrl);

    const xmlRes = await fetch(feedUrl);
    if (!xmlRes.ok) throw new Error(`Feed HTTP ${xmlRes.status}`);
    const xml = await xmlRes.text();

    // Extrai cada <AD>...</AD>
    const adMatches = xml.match(/<AD>[\s\S]*?<\/AD>/g) || [];
    console.log(`[sync-vehicle-stock] ${adMatches.length} ADs no feed`);

    const seenIds: string[] = [];
    let upserted = 0;
    let failed = 0;
    const errors: string[] = [];

    // Processa em lotes pra evitar query muito longa
    const batchSize = 25;
    for (let i = 0; i < adMatches.length; i += batchSize) {
      const batch = adMatches.slice(i, i + batchSize)
        .map((adXml) => parseAd(adXml))
        .filter((v): v is NonNullable<typeof v> => v !== null);

      if (batch.length === 0) continue;

      for (const v of batch) seenIds.push(v.id);

      const { error } = await supabase
        .from("vehicles")
        .upsert(batch, { onConflict: "id" });

      if (error) {
        failed += batch.length;
        errors.push(`Batch ${i}: ${error.message}`);
        console.error("[sync-vehicle-stock] Upsert error:", error);
      } else {
        upserted += batch.length;
      }
    }

    // Marca como inativo qualquer veiculo no banco que nao apareceu no feed
    // (provavel vendido). NAO deleta — preserva historico de leads/deals.
    let deactivated = 0;
    if (seenIds.length > 0) {
      const { data: deactivatedRows, error: deactErr } = await supabase
        .from("vehicles")
        .update({ is_active: false, is_sold: true })
        .eq("is_active", true)
        .not("id", "in", `(${seenIds.map((id) => `"${id}"`).join(",")})`)
        .select("id");
      if (deactErr) console.error("[sync-vehicle-stock] Deactivate error:", deactErr);
      deactivated = deactivatedRows?.length || 0;
    }

    const elapsed = Date.now() - startedAt;
    const summary = {
      status: failed === 0 ? "ok" : "partial",
      ads_in_feed: adMatches.length,
      upserted,
      failed,
      deactivated,
      elapsed_ms: elapsed,
      errors: errors.slice(0, 5),
    };
    console.log("[sync-vehicle-stock] DONE", summary);

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
      status: failed === 0 ? 200 : 207,
    });
  } catch (e: any) {
    console.error("[sync-vehicle-stock] FATAL", e);
    return new Response(JSON.stringify({ status: "error", error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
