/**
 * agent-tool-schedule — adaptador de tool de AGENDAMENTO para a plataforma v2.
 *
 * O executor de `edge_function` do agent-runner chama esta função com o contrato
 *   { arguments, user_id, session_id }
 * e espera um JSON de volta. Aqui traduzimos pro contrato próprio da `book-meeting`
 * ({ action, ... }) SEM tocar naquela função (que também serve o formulário público).
 *
 * Robustez: o telefone/nome do lead são derivados da SESSÃO do WhatsApp
 * (agents_sessions.provider_state.whatsapp_phone), não do que o LLM "acha" — assim
 * o agendamento cai sempre no lead certo.
 *
 * Ações (via arguments.action):
 *  - "check_availability": retorna { days: [{date, slots[]}] } ou { already_booked }
 *  - "book": agenda no slot escolhido (arguments.slot_datetime ISO) e retorna
 *            { success, meeting_link, scheduled_at, lead_id }
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const raw = await req.json().catch(() => ({}));
    const args = (raw.arguments || raw || {}) as Record<string, any>;
    const sessionId: string | null = raw.session_id || null;

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // Deriva telefone/nome do lead pela sessão (fonte da verdade, não o LLM)
    let phone: string | null = args.phone || null;
    let name: string | null = args.name || null;
    if (sessionId && (!phone || !name)) {
      const { data: sess } = await supabase
        .from("agents_sessions").select("provider_state").eq("id", sessionId).maybeSingle();
      const ps = (sess?.provider_state || {}) as Record<string, any>;
      phone = phone || ps.whatsapp_phone || null;
      if (phone && !name) {
        const { data: lead } = await supabase.rpc("find_lead_by_phone_normalized", {
          p_phone: String(phone).replace(/\D/g, ""),
        });
        const leadRow = Array.isArray(lead) ? lead[0] : lead;
        name = leadRow?.name || null;
      }
    }

    const action: string = args.action || (args.slot_datetime ? "book" : "check_availability");

    const bookBody = action === "check_availability"
      ? { action: "check_availability", phone, email: args.email || null }
      : {
          action: "book",
          name: name || args.name || phone || "Lead WhatsApp",
          phone,
          email: args.email || null,
          vehicle_interest: args.vehicle_interest || null,
          negotiation: args.negotiation || null,
          slot_datetime: args.slot_datetime || null,
          utm_source: "agente_ia",
          utm_campaign: "atendimento_whatsapp",
        };

    if (action === "book" && !phone) {
      return json({ error: "Não consegui identificar o telefone do lead pra agendar." }, 200);
    }

    const res = await fetch(`${SUPABASE_URL}/functions/v1/book-meeting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "apikey": SERVICE_KEY,
      },
      body: JSON.stringify(bookBody),
    });

    const text = await res.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return json(data, res.ok ? 200 : 200); // devolve o erro como resultado da tool (o LLM lida)
  } catch (err) {
    console.error("[agent-tool-schedule] error:", (err as Error).message);
    return json({ error: (err as Error).message || "erro interno" }, 200);
  }
});
