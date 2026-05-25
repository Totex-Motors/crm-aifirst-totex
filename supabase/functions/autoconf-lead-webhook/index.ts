import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface AutoconfVehicle {
  id?: number | null;
  vehicle_type?: string | null;
  url?: string | null;
  brand?: string | null;
  model?: string | null;
  version?: string | null;
  year?: number | null;
  fabric_year?: number | null;
  color?: string | null;
  color_slug?: string | null;
  fuel?: string | null;
  fuel_slug?: string | null;
  gear?: string | null;
  gear_slug?: string | null;
  plate?: string | null;
  condition?: string | null;
  application_id?: string | null;
  application_name?: string | null;
  simulations?: unknown[];
}

interface AutoconfOrigin {
  nome: string;
  slug: string;
}

interface AutoconfPayload {
  type: string;
  // Actual field name in payload is create_at; date kept for backwards compat
  create_at?: string | null;
  date?: string | null;
  visited?: string | null;
  reason?: string | null;
  store?: string | null;
  creates_rescue_lead?: boolean | null;
  lead_id: number;
  user_res?: string | null;
  user_email?: string | null;
  name?: string | null;
  email?: string | null;
  mobile_phone?: string | null;
  phone?: string | null;
  message?: string | null;
  negotiation_type?: string | null;
  negotiation_type_slug?: string | null;
  interested_in_vehicle?: AutoconfVehicle[] | null;
  evaluated_vehicles?: AutoconfVehicle[] | null;
  origins?: AutoconfOrigin[] | null;
  // Legacy UTM fields (may not be present in newer payloads)
  lead_source?: string | null;
  lead_source_slug?: string | null;
  lead_medium?: string | null;
  lead_medium_slug?: string | null;
  lead_content?: string | null;
  lead_content_slug?: string | null;
  lead_campaign?: string | null;
  lead_campaign_slug?: string | null;
}

function normalizePhone(raw: string | null): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  // Already has country code (55 + 10/11 digits = 12/13 total)
  if (digits.length >= 12) return `+${digits}`;
  return `+55${digits}`;
}

// Maps AutoConf type strings (capitalized or slug) to internal event slugs
function normalizeEventType(type: string): string {
  const t = type.toLowerCase().trim();
  if (t === "novo atendimento" || t === "novo") return "novo";
  if (t === "sucesso") return "sucesso";
  if (t === "insucesso") return "insucesso";
  if (t === "visita") return "visita";
  return t;
}

const STAGE_MAP: Record<string, string> = {
  novo: "new",
  sucesso: "ganho",
  insucesso: "perdido",
  // visita: no stage change — keep existing stage
};

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const authHeader = req.headers.get("Authorization");
  const receivedToken =
    authHeader?.replace(/^Bearer\s+/i, "").trim() ||
    url.searchParams.get("secret") ||
    null;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const envConfiguredSecret =
    Deno.env.get("AUTOCONF_WEBHOOK_SECRET")?.trim() || null;
  const environment =
    Deno.env.get("DENO_ENV")?.trim().toLowerCase() || "production";
  const allowInsecureWebhook =
    Deno.env.get("AUTOCONF_WEBHOOK_ALLOW_INSECURE") === "true";
  const isNonProductionEnvironment = [
    "development",
    "dev",
    "setup",
    "local",
    "test",
  ].includes(environment);

  // Prefer env secret; keep config-table fallback for compatibility.
  const { data: secretRow } = await supabase
    .from("config")
    .select("value")
    .eq("key", "AUTOCONF_WEBHOOK_SECRET")
    .maybeSingle();

  const configuredSecret =
    envConfiguredSecret || secretRow?.value?.trim() || null;

  if (!configuredSecret) {
    if (!(allowInsecureWebhook && isNonProductionEnvironment)) {
      console.error(
        "[AutoConf] Webhook secret is not configured; refusing to run in open mode",
      );
      return new Response("Forbidden", { status: 403 });
    }
  } else if (!receivedToken || receivedToken !== configuredSecret) {
    console.warn("[AutoConf] Unauthorized webhook attempt");
    return new Response("Unauthorized", { status: 401 });
  }

  let body: AutoconfPayload;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventType = normalizeEventType(body.type);
  const { lead_id } = body;
  console.log(
    `[AutoConf] Event type="${body.type}" (normalized=${eventType}) lead_id=${lead_id}`,
  );

  if (!["novo", "sucesso", "insucesso", "visita"].includes(eventType)) {
    return new Response(
      JSON.stringify({
        ok: true,
        skipped: true,
        reason: `type="${body.type}" not handled`,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const phone = normalizePhone(body.mobile_phone || body.phone || null);
  const externalId = String(lead_id);

  // Source from origins[] (actual payload) or legacy lead_source fields
  const primaryOrigin = body.origins?.[0];
  const sourceLabel = primaryOrigin?.nome || body.lead_source || null;
  const sourceSlug = primaryOrigin?.slug || body.lead_source_slug || null;
  const source = sourceLabel || "autoconf";

  const eventDate = body.create_at || body.date || null;
  const salesStage = STAGE_MAP[eventType] ?? null;

  const autoconfMetadata: Record<string, unknown> = {
    lead_id: externalId,
    event_type: eventType,
    event_date: eventDate,
    store: body.store || null,
    user_res: body.user_res || null,
    user_email: body.user_email || null,
    message: body.message || null,
    negotiation_type: body.negotiation_type || null,
    negotiation_type_slug: body.negotiation_type_slug || null,
    vehicle_of_interest: body.interested_in_vehicle?.length
      ? body.interested_in_vehicle
      : null,
    evaluated_vehicles: body.evaluated_vehicles?.length
      ? body.evaluated_vehicles
      : null,
    visited: body.visited || null,
    reason: body.reason || null,
    creates_rescue_lead: body.creates_rescue_lead ?? null,
    origins: body.origins || null,
    ...(eventType === "insucesso"
      ? { lost_reason: body.reason ?? null }
      : {}),
  };

  const sharedFields: Record<string, unknown> = {
    external_id: externalId,
    negotiation_type: body.negotiation_type || null,
    // Store first vehicle in dedicated column; full array stays in metadata.autoconf
    vehicle_of_interest: body.interested_in_vehicle?.[0] ?? null,
    evaluated_vehicles: body.evaluated_vehicles?.length ? body.evaluated_vehicles : null,
    source,
    utm_source: sourceSlug || sourceLabel || null,
    utm_medium: body.lead_medium_slug || body.lead_medium || null,
    utm_campaign: body.lead_campaign_slug || body.lead_campaign || null,
    utm_content: body.lead_content_slug || body.lead_content || null,
    updated_at: new Date().toISOString(),
    // Only change sales_stage for events that have a mapped stage
    ...(salesStage ? { sales_stage: salesStage } : {}),
  };

  // 1. Find by external_id (primary dedup key — AutoConf lead_id)
  const { data: byExternalId } = await supabase
    .from("leads")
    .select("id, metadata")
    .eq("external_id", externalId)
    .maybeSingle();

  if (byExternalId) {
    await supabase
      .from("leads")
      .update({
        ...sharedFields,
        metadata: {
          ...(byExternalId.metadata ?? {}),
          autoconf: {
            ...(byExternalId.metadata?.autoconf ?? {}),
            ...autoconfMetadata,
          },
        },
      })
      .eq("id", byExternalId.id);
    console.log(
      `[AutoConf] Updated lead ${byExternalId.id} via external_id (type=${eventType})`,
    );
    return new Response(
      JSON.stringify({ ok: true, lead_id: byExternalId.id }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  // 2. Fallback: match by last 8 phone digits (handles 9th digit divergence)
  if (phone) {
    const last8 = phone.replace(/\D/g, "").slice(-8);
    const { data: byPhone } = await supabase
      .from("leads")
      .select("id, metadata")
      .ilike("phone", `%${last8}`)
      .limit(1)
      .maybeSingle();

    if (byPhone) {
      await supabase
        .from("leads")
        .update({
          ...sharedFields,
          phone,
          metadata: {
            ...(byPhone.metadata ?? {}),
            autoconf: {
              ...(byPhone.metadata?.autoconf ?? {}),
              ...autoconfMetadata,
            },
          },
        })
        .eq("id", byPhone.id);
      console.log(
        `[AutoConf] Updated lead ${byPhone.id} via phone fallback (type=${eventType})`,
      );
      return new Response(
        JSON.stringify({ ok: true, lead_id: byPhone.id }),
        { headers: { "Content-Type": "application/json" } },
      );
    }
  }

  // 3. Non-novo events without a matching lead — don't create a ghost record
  if (eventType !== "novo") {
    console.warn(
      `[AutoConf] No lead found for type=${eventType} lead_id=${lead_id}`,
    );
    return new Response(
      JSON.stringify({
        ok: false,
        error: `No existing lead found for ${eventType} event`,
      }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!phone && !body.email) {
    return new Response(
      JSON.stringify({ ok: false, error: "No phone or email in payload" }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  // 4. Create new lead
  const { data: newLead, error } = await supabase
    .from("leads")
    .insert({
      name: body.name || phone || body.email || "Sem nome",
      email: body.email || null,
      phone: phone || null,
      status: "new",
      metadata: {
        autoconf: autoconfMetadata,
      },
      ...sharedFields,
    })
    .select("id, tenant_id")
    .single();

  if (error) {
    console.error("[AutoConf] Error creating lead:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to create lead" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  console.log(
    `[AutoConf] Created lead ${newLead.id} name="${body.name}" source=${source}`,
  );

  // 5. Auto-create deal in first pipeline stage
  try {
    let stagesQuery = supabase
      .from("sales_pipeline_stages")
      .select("id, pipeline_id")
      .order("position", { ascending: true })
      .limit(1);

    if (newLead.tenant_id) {
      stagesQuery = stagesQuery.eq("tenant_id", newLead.tenant_id);
    }

    const { data: firstStage } = await stagesQuery.maybeSingle();

    if (firstStage) {
      const dealData: Record<string, unknown> = {
        lead_id: newLead.id,
        pipeline_stage_id: firstStage.id,
        pipeline_id: firstStage.pipeline_id,
        title: body.name || phone || body.email || "Lead AutoConf",
        status: "negotiation",
        stage_changed_at: new Date().toISOString(),
      };
      if (newLead.tenant_id) dealData.tenant_id = newLead.tenant_id;

      const { error: dealError } = await supabase.from("deals").insert(dealData);
      if (dealError) {
        console.warn("[AutoConf] Could not create deal:", dealError.message);
      } else {
        console.log(`[AutoConf] Created deal for lead ${newLead.id} in stage ${firstStage.id}`);
      }
    } else {
      console.warn("[AutoConf] No pipeline stages found — deal not created");
    }
  } catch (dealErr) {
    console.warn("[AutoConf] Deal creation failed (non-fatal):", dealErr);
  }

  return new Response(
    JSON.stringify({ ok: true, lead_id: newLead.id }),
    { headers: { "Content-Type": "application/json" } },
  );
});
