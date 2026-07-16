-- =============================================================================
-- Fix critical RLS policies — remove always-true policies que ofuscavam
-- as policies corretas (tenant_*) e travam config a admin
-- =============================================================================
-- IMPORTANTE: pra cada tabela, as policies "tenant_*" já estão corretas
-- (filtram por tenant_id = get_tenant_id()). Estamos só apagando as
-- always-true que estavam em paralelo. RLS faz OR entre policies do mesmo
-- comando, então a always-true estava neutralizando o filtro de tenant.
-- =============================================================================

-- 1) commission_rules — drop 4
DROP POLICY IF EXISTS "Authenticated users can delete commission_rules" ON public.commission_rules;
DROP POLICY IF EXISTS "Authenticated users can insert commission_rules" ON public.commission_rules;
DROP POLICY IF EXISTS "Authenticated users can view commission_rules"   ON public.commission_rules;
DROP POLICY IF EXISTS "Authenticated users can update commission_rules" ON public.commission_rules;

-- 2) commissions — drop 3 (a DELETE já era só tenant)
DROP POLICY IF EXISTS "Authenticated users can insert commissions" ON public.commissions;
DROP POLICY IF EXISTS "Authenticated users can view commissions"   ON public.commissions;
DROP POLICY IF EXISTS "Authenticated users can update commissions" ON public.commissions;

-- 3) deal_payments — drop 4
DROP POLICY IF EXISTS "Authenticated users can delete deal_payments" ON public.deal_payments;
DROP POLICY IF EXISTS "Authenticated users can insert deal_payments" ON public.deal_payments;
DROP POLICY IF EXISTS "Authenticated users can view deal_payments"   ON public.deal_payments;
DROP POLICY IF EXISTS "Authenticated users can update deal_payments" ON public.deal_payments;

-- 4) deal_payment_installments — drop 3 (a DELETE já era só tenant)
DROP POLICY IF EXISTS "Authenticated users can insert deal_payment_installments" ON public.deal_payment_installments;
DROP POLICY IF EXISTS "Authenticated users can view deal_payment_installments"   ON public.deal_payment_installments;
DROP POLICY IF EXISTS "Authenticated users can update deal_payment_installments" ON public.deal_payment_installments;

-- 5) config — CASO ESPECIAL (sem tenant_id, guarda API keys)
-- Drop policies abertas, cria nova só pra admin
DROP POLICY IF EXISTS config_write_authenticated ON public.config;
DROP POLICY IF EXISTS config_read_authenticated  ON public.config;

CREATE POLICY config_admin_all ON public.config
  FOR ALL
  TO authenticated
  USING (public.is_tenant_admin() OR public.is_superadmin())
  WITH CHECK (public.is_tenant_admin() OR public.is_superadmin());
