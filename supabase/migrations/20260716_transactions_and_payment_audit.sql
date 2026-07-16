-- ============================================================================
-- transactions + deal_payment_audit_log
--
-- Duas tabelas que o código consulta desde sempre mas que nunca existiram
-- em nenhuma migration.
--
-- `transactions` é o histórico de compra do lead. Além do LTV no frontend,
-- alimenta calculate-lead-score, generate-briefing e analyze-conversation —
-- ou seja, hoje o scoring e os briefings da IA rodam sem saber se o lead já
-- comprou. O insert em useNegociacaoPayments falha em silêncio (só
-- console.error), então o pagamento confirma e o LTV nunca é gravado.
--
-- `deal_payment_audit_log` é a trilha de auditoria de edições de pagamento.
--
-- Não inclui deal_negotiation_details de propósito: os campos que o código
-- espera misturam o nicho automotivo (entrada, garantia CDC) com legado de
-- SaaS (tempo_acesso_meses, bonus_saas), e isso precisa de decisão de
-- produto antes de virar schema.
-- ============================================================================

-- 1) Histórico de compra / LTV
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),

  lead_id UUID,
  deal_id UUID,
  deal_payment_id UUID,

  -- products.id é TEXT no schema base, não UUID.
  product_id TEXT,
  product_name TEXT,

  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  -- Valores em uso no código: 'paid', 'refunded', 'RECEIVED', 'approved'.
  -- Sem CHECK: a base legada tem casing inconsistente e um CHECK quebraria
  -- o CancelRefundModal, que filtra pelos quatro.
  status TEXT NOT NULL DEFAULT 'paid',
  payment_method TEXT,
  payment_platform TEXT,

  transaction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.transactions
  DROP CONSTRAINT IF EXISTS transactions_lead_id_fkey;
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_lead_id_fkey
  FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;

ALTER TABLE public.transactions
  DROP CONSTRAINT IF EXISTS transactions_deal_id_fkey;
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_deal_id_fkey
  FOREIGN KEY (deal_id) REFERENCES public.deals(id) ON DELETE SET NULL;

-- CASCADE: apagar o pagamento apaga a transação derivada dele.
ALTER TABLE public.transactions
  DROP CONSTRAINT IF EXISTS transactions_deal_payment_id_fkey;
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_deal_payment_id_fkey
  FOREIGN KEY (deal_payment_id) REFERENCES public.deal_payments(id) ON DELETE CASCADE;

ALTER TABLE public.transactions
  DROP CONSTRAINT IF EXISTS transactions_product_id_fkey;
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;

-- useLeadTransactions / useClientLTV / edge functions: filtram por lead_id
-- e ordenam por transaction_date ou created_at.
CREATE INDEX IF NOT EXISTS idx_transactions_tenant_lead_date
  ON public.transactions (tenant_id, lead_id, transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_tenant_lead_created
  ON public.transactions (tenant_id, lead_id, created_at DESC);

-- useNegociacaoPayments checa transação existente por pagamento;
-- CancelRefundModal atualiza via .in('deal_payment_id', ...).
CREATE INDEX IF NOT EXISTS idx_transactions_deal_payment
  ON public.transactions (deal_payment_id) WHERE deal_payment_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_transactions_deal
  ON public.transactions (deal_id) WHERE deal_id IS NOT NULL;

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_transactions ON public.transactions;
CREATE POLICY tenant_all_transactions ON public.transactions
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- 2) Auditoria de edições de pagamento
CREATE TABLE IF NOT EXISTS public.deal_payment_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),

  deal_payment_id UUID NOT NULL,
  deal_id UUID,
  changed_by UUID,

  change_type TEXT NOT NULL DEFAULT 'edit',
  -- [{ field, old_value, new_value }] — montado em useNegociacaoPayments.
  changes JSONB NOT NULL DEFAULT '[]'::jsonb,
  reason TEXT,

  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.deal_payment_audit_log
  DROP CONSTRAINT IF EXISTS deal_payment_audit_log_deal_payment_id_fkey;
ALTER TABLE public.deal_payment_audit_log
  ADD CONSTRAINT deal_payment_audit_log_deal_payment_id_fkey
  FOREIGN KEY (deal_payment_id) REFERENCES public.deal_payments(id) ON DELETE CASCADE;

ALTER TABLE public.deal_payment_audit_log
  DROP CONSTRAINT IF EXISTS deal_payment_audit_log_deal_id_fkey;
ALTER TABLE public.deal_payment_audit_log
  ADD CONSTRAINT deal_payment_audit_log_deal_id_fkey
  FOREIGN KEY (deal_id) REFERENCES public.deals(id) ON DELETE CASCADE;

-- O nome desta constraint é load-bearing: useNegociacaoPayments faz o embed
-- team_members!deal_payment_audit_log_changed_by_fkey(id, name).
-- SET NULL preserva a trilha se o membro for removido.
ALTER TABLE public.deal_payment_audit_log
  DROP CONSTRAINT IF EXISTS deal_payment_audit_log_changed_by_fkey;
ALTER TABLE public.deal_payment_audit_log
  ADD CONSTRAINT deal_payment_audit_log_changed_by_fkey
  FOREIGN KEY (changed_by) REFERENCES public.team_members(id) ON DELETE SET NULL;

-- Histórico por pagamento, mais recente primeiro.
CREATE INDEX IF NOT EXISTS idx_deal_payment_audit_payment_changed
  ON public.deal_payment_audit_log (deal_payment_id, changed_at DESC);

ALTER TABLE public.deal_payment_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_deal_payment_audit_log ON public.deal_payment_audit_log;
CREATE POLICY tenant_all_deal_payment_audit_log ON public.deal_payment_audit_log
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));
