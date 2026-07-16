-- =============================================================================
-- Fix Supabase Security Advisor — 4 ERRORs
-- =============================================================================
-- 1) RLS em ai_agent_chat_events (filtra via leads.tenant_id)
-- 2) RLS em noshow_followups (filtra via leads.tenant_id)
-- 3) View deals_with_vehicle: security_definer -> security_invoker
-- 4) View v_ai_agent_dashboard: security_definer -> security_invoker
--
-- Edge functions usam service_role e bypassam RLS, então INSERT/UPDATE/DELETE
-- continuam funcionando sem policies explícitas.
-- =============================================================================

-- 1) ai_agent_chat_events
ALTER TABLE public.ai_agent_chat_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_select_ai_agent_chat_events ON public.ai_agent_chat_events;
CREATE POLICY tenant_select_ai_agent_chat_events
  ON public.ai_agent_chat_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.leads l
      WHERE l.id = ai_agent_chat_events.lead_id
        AND l.tenant_id = (SELECT public.get_tenant_id())
    )
  );

-- 2) noshow_followups
ALTER TABLE public.noshow_followups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_select_noshow_followups ON public.noshow_followups;
CREATE POLICY tenant_select_noshow_followups
  ON public.noshow_followups
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.leads l
      WHERE l.id = noshow_followups.lead_id
        AND l.tenant_id = (SELECT public.get_tenant_id())
    )
  );

-- 3 & 4) Views com SECURITY INVOKER
ALTER VIEW public.deals_with_vehicle SET (security_invoker = on);
ALTER VIEW public.v_ai_agent_dashboard SET (security_invoker = on);
