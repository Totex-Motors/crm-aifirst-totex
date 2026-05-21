-- Corrige RLS policies permissivas demais identificadas na auditoria de segurança.

-- 1. _deal_stage_audit: qualquer autenticado podia ler histórico de deals de qualquer tenant.
--    Tabela não tem tenant_id direto — filtra via join com deals.
DROP POLICY IF EXISTS authenticated_access ON public._deal_stage_audit;
CREATE POLICY tenant_select_deal_stage_audit ON public._deal_stage_audit
  FOR SELECT TO authenticated
  USING (
    deal_id IN (
      SELECT id FROM public.deals WHERE tenant_id = public.get_tenant_id()
    )
  );

-- 2. twilio_call_logs: qualquer autenticado podia ler logs de chamadas de qualquer tenant.
--    Tabela não tem tenant_id — filtra via team_member.
DROP POLICY IF EXISTS authenticated_access ON public.twilio_call_logs;
CREATE POLICY tenant_select_twilio_call_logs ON public.twilio_call_logs
  FOR SELECT TO authenticated
  USING (
    team_member_id IN (
      SELECT id FROM public.team_members WHERE tenant_id = public.get_tenant_id()
    )
  );

-- 3. tenants: políticas que expunham a lista completa de tenants.
--    Usuário autenticado só pode ver o próprio tenant.
DROP POLICY IF EXISTS tenant_select ON public.tenants;
DROP POLICY IF EXISTS tenants_select_superadmin ON public.tenants;
CREATE POLICY tenant_select_own ON public.tenants
  FOR SELECT TO authenticated
  USING (id = public.get_tenant_id());
