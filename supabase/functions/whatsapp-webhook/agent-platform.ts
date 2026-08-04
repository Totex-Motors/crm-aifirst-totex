/**
 * agent-platform.ts — roteia mensagens UAZAPI pra Plataforma de Agentes V2.
 *
 * Espelha o telegram-webhook: lookup deployment (instância + palavra-chave) → autorização
 * (access_mode + whitelist) → chama agent-runner (lê o SSE) → envia resposta via UAZAPI.
 *
 * Retorna true se a mensagem FOI tratada pela V2 (o caller NÃO segue o fluxo legado).
 * Retorna false se não tratou (segue legado ai-sales-agent intacto).
 *
 * GATED pela flag config.agent_platform_v2_enabled — off = sempre false = legado.
 * Instâncias SEM deployment V2 ativo nunca casam → legado intacto.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface InstanceLike {
  id: string;
  api_url?: string | null;
  api_key?: string | null;
}

export async function tryHandleViaAgentPlatform(args: {
  supabase: any;
  instance: InstanceLike;
  senderPhone: string;
  text: string;
  messageId: string | null;
  leadId?: string | null;
}): Promise<boolean> {
  const { supabase, instance, senderPhone, text, messageId, leadId } = args;
  if (!text || !text.trim()) return false;
  // Ignora placeholders de mídia que não viraram texto/transcrição
  if (text === "[Mídia]") return false;

  // 1. Flag global — off = legado (config.value é TEXT neste CRM: JSON serializado)
  const { data: cfgRow } = await supabase
    .from("config").select("value").eq("key", "agent_platform_v2_enabled").maybeSingle();
  let flag: unknown = cfgRow?.value;
  if (typeof flag === "string") {
    try { flag = JSON.parse(flag); } catch { flag = null; }
  }
  if ((flag as { enabled?: boolean } | null)?.enabled !== true) return false;

  // 2. Lookup deployment (instância + palavra-chave via agent_route_lookup)
  const { data: routeRows, error: routeErr } = await supabase.rpc("agent_route_lookup", {
    p_channel: "whatsapp",
    p_instance_id: instance.id,
    p_ctx: { text },
  });
  if (routeErr) { console.error("[wpp-v2] route err:", routeErr.message); return false; }
  const match = Array.isArray(routeRows) ? routeRows[0] : routeRows;
  if (!match || !match.agent_slug) return false; // nenhum agente V2 nessa instância → legado

  // 3. Config do deployment → autorização
  const { data: dep } = await supabase
    .from("agents_deployments").select("config").eq("id", match.deployment_id).maybeSingle();
  const cfg = (dep?.config || {}) as Record<string, any>;
  const accessMode: string = cfg.access_mode || "open";
  const senderDigits = onlyDigits(senderPhone);

  // Resolve host (api_url) + token da instância pra enviar via UAZAPI (genérico: qualquer host)
  let inst = instance;
  if (!inst.api_url || !inst.api_key) {
    const { data: row } = await supabase
      .from("whatsapp_instances").select("api_url, api_key").eq("id", instance.id).maybeSingle();
    inst = { id: instance.id, api_url: instance.api_url || row?.api_url, api_key: instance.api_key || row?.api_key };
  }

  if (accessMode === "private") {
    const authorized: string[] = (cfg.authorized_numbers || []).map((n: string) => onlyDigits(String(n))).filter(Boolean);
    const ok = authorized.some((a) => a && (senderDigits.endsWith(a) || a.endsWith(senderDigits)));
    if (!ok) {
      // Não autorizado: manda msg padrão (se configurada) e marca como TRATADO (não cai no legado)
      if (cfg.unauthorized_message) await sendUazapi(supabase, inst, leadId, senderDigits, String(cfg.unauthorized_message));
      console.log(`[wpp-v2] número ${senderDigits} não autorizado (agente ${match.agent_slug}, modo private)`);
      return true;
    }
  }

  // Config do agente (settings) — usada pelos gates de humano e de horário
  const { data: agentCfg } = await supabase
    .from("agents_registry").select("settings").eq("id", match.agent_id).maybeSingle();
  const aSettings = (agentCfg?.settings || {}) as Record<string, any>;

  // GATE 1: atendimento híbrido — se um HUMANO respondeu recentemente, a IA não
  // atropela (espelha o v1). Auto-retoma sozinho: a janela olha só os últimos N min.
  // Mensagens da própria IA são marcadas com metadata.sent_by='ai_agent' (ver sendUazapi),
  // então não disparam o guard.
  if (leadId && aSettings.auto_pause_after_human_reply !== false) {
    const cooldownMin = Number(aSettings.human_cooldown_minutes) || 10;
    const cutoff = new Date(Date.now() - cooldownMin * 60 * 1000).toISOString();
    const { data: humanMsg } = await supabase
      .from("whatsapp_messages")
      .select("id")
      .eq("lead_id", leadId)
      .eq("is_from_me", true)
      .is("group_id", null)
      .gte("sent_at", cutoff)
      .not("metadata->>sent_by", "eq", "ai_agent")
      .order("sent_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (humanMsg) {
      console.log(`[wpp-v2] humano ativo no lead ${leadId} — agente v2 pausado (cooldown ${cooldownMin}min)`);
      return true; // suprimido — não responde nem cai no legado
    }
  }

  // 4. Sessão (1 por número + agente)
  const sessionKey = `whatsapp:${senderDigits}`;
  let sessionId: string | undefined;
  const { data: existing } = await supabase
    .from("agents_sessions").select("id")
    .eq("agent_id", match.agent_id).eq("channel", "whatsapp")
    .contains("provider_state", { external_session_key: sessionKey })
    .order("created_at", { ascending: false }).limit(1).maybeSingle();
  sessionId = existing?.id;
  if (!sessionId) {
    const { data: ns } = await supabase
      .from("agents_sessions").insert({
        agent_id: match.agent_id, channel: "whatsapp",
        title: `WhatsApp ${senderDigits}`,
        provider_state: { external_session_key: sessionKey, whatsapp_phone: senderDigits },
      }).select("id").single();
    sessionId = ns?.id;
  }

  // GATE 2: horário de atendimento (por agente, configurável em Regras).
  // Só bloqueia se working_hours_enabled. Fora do horário: NÃO chama o runner e
  // retorna true (não cai no legado). Opcional: manda out_of_office_message com cooldown.
  if (aSettings.working_hours_enabled === true && !isWithinWorkingHours(aSettings)) {
    const ooMsg = typeof aSettings.out_of_office_message === "string"
      ? aSettings.out_of_office_message.trim() : "";
    if (ooMsg) {
      // Cooldown de 4h por sessão pra não repetir a msg a cada mensagem do lead
      const COOLDOWN_MS = 4 * 60 * 60 * 1000;
      const { data: sess } = await supabase
        .from("agents_sessions").select("provider_state").eq("id", sessionId).maybeSingle();
      const ps = (sess?.provider_state || {}) as Record<string, any>;
      const lastOoo = ps.last_ooo_at ? new Date(ps.last_ooo_at).getTime() : 0;
      if (Date.now() - lastOoo > COOLDOWN_MS) {
        await sendUazapi(supabase, inst, leadId, senderDigits, ooMsg);
        await supabase.from("agents_sessions")
          .update({ provider_state: { ...ps, last_ooo_at: new Date().toISOString() } })
          .eq("id", sessionId);
      }
    }
    console.log(`[wpp-v2] fora do horário do agente ${match.agent_slug} — suprimido (sem responder)`);
    return true; // tratado (suprimido) — não chama runner nem cai no legado
  }

  // 5. Chama agent-runner e lê o SSE (igual telegram-webhook)
  let fullText = "";
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/agent-runner`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SERVICE_KEY}`, "apikey": SERVICE_KEY },
      body: JSON.stringify({
        agent_slug: match.agent_slug,
        channel: "whatsapp",
        session_id: sessionId,
        message: text,
        user_id: null,
        context: {
          instance_id: instance.id,
          whatsapp_phone: senderDigits,
          recipient: senderDigits,
          message_id: messageId,
          lead_id: leadId || null,  // lead já criado pelo webhook — agente usa pra agendar/qualificar
        },
      }),
    });
    if (!res.ok || !res.body) throw new Error(`agent-runner ${res.status}`);

    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const evs = buf.split("\n\n");
      buf = evs.pop() || "";
      for (const ev of evs) {
        const dl = ev.split("\n").find((l) => l.startsWith("data:"));
        if (!dl) continue;
        try { const d = JSON.parse(dl.slice(5).trim()); if (d.type === "text.delta") fullText += d.delta; } catch { /* ignore */ }
      }
    }
  } catch (e) {
    console.error("[wpp-v2] agent-runner err:", (e as Error).message);
    await sendUazapi(supabase, inst, leadId, senderDigits, "⚠️ Tive um problema técnico. Tenta de novo daqui a pouco?");
    return true;
  }

  // 6. Envia resposta via UAZAPI (split em ~4000 chars respeitando parágrafos)
  const finalText = fullText.trim() || "Desculpa, não consegui processar agora.";
  for (const chunk of splitText(finalText, 4000)) {
    await sendUazapi(supabase, inst, leadId, senderDigits, chunk);
  }
  return true;
}

function onlyDigits(s: string): string { return String(s).replace(/\D/g, ""); }

// Horário de atendimento do agente (fuso America/Sao_Paulo), espelha a lógica do
// ai-sales-agent v1. days: 0=Dom..6=Sab. Padrão aberto se campos ausentes.
function isWithinWorkingHours(s: Record<string, any>): boolean {
  const start = typeof s.working_hours_start === "string" ? s.working_hours_start : "00:00";
  const end = typeof s.working_hours_end === "string" ? s.working_hours_end : "23:59";
  const days: number[] = Array.isArray(s.working_days) ? s.working_days : [0, 1, 2, 3, 4, 5, 6];
  const brNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  if (!days.includes(brNow.getDay())) return false;
  const cur = `${String(brNow.getHours()).padStart(2, "0")}:${String(brNow.getMinutes()).padStart(2, "0")}`;
  return cur >= start && cur <= end;
}

async function sendUazapi(
  supabase: any,
  instance: InstanceLike,
  leadId: string | null | undefined,
  number: string,
  text: string,
): Promise<void> {
  // api_url vem da tabela de instâncias — NUNCA hardcode de URL UAZAPI (regra do projeto)
  const base = (instance.api_url || "").replace(/\/$/, "");
  if (!base) {
    console.error("[wpp-v2] sendUazapi: instance.api_url vazio — configure a URL da instância");
    return;
  }
  try {
    await fetch(`${base}/send/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": instance.api_key || "" },
      body: JSON.stringify({ number: onlyDigits(number), text }),
    });
  } catch (e) { console.error("[wpp-v2] sendUazapi err:", (e as Error).message); return; }

  // Registra a saída marcada como IA: (a) o guard de humano não se auto-pausa e
  // (b) a mensagem aparece no inbox atribuída à IA. A echo do UAZAPI reconcilia
  // via dedup por conteúdo do webhook (janela 60s), preservando o sent_by.
  try {
    await supabase.from("whatsapp_messages").insert({
      instance_id: instance.id,
      lead_id: leadId || null,
      message_id: `v2-${crypto.randomUUID()}`,
      content: text,
      message_type: "text",
      sender_phone: onlyDigits(number),
      is_from_me: true,
      sent_at: new Date().toISOString(),
      metadata: { sent_by: "ai_agent", sent_by_name: "Agente IA" },
    });
  } catch (e) { console.error("[wpp-v2] record out msg err:", (e as Error).message); }
}

function splitText(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const out: string[] = [];
  let cur = "";
  for (const para of text.split("\n\n")) {
    if (cur && (cur + "\n\n" + para).length > max) { out.push(cur); cur = para; }
    else cur = cur ? cur + "\n\n" + para : para;
  }
  if (cur) out.push(cur);
  return out;
}
