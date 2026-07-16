-- ============================================================================
-- deal_negotiation_details — detalhes da negociação ganha
--
-- Tabela que o código consulta desde sempre e que nunca existiu em migration
-- nenhuma: useNegotiationDetails e useClientTimeline liam, WinNegociacaoModal
-- gravava via useNegociacoes. Todas falhavam em silêncio.
--
-- Os campos que o código esperava misturavam o nicho automotivo (entrada,
-- garantia CDC) com legado de SaaS/infoproduto. tempo_acesso_meses e
-- bonus_saas ficam de fora: são resquício do template e o CLAUDE.md pede
-- para não reintroduzir o legado B2B no nicho automotivo.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.deal_negotiation_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),

  deal_id UUID NOT NULL,

  -- Entrada: o cliente pagou o valor total? Se não, quanto falta.
  entrada_completa BOOLEAN NOT NULL DEFAULT true,
  valor_faltante NUMERIC(14,2) NOT NULL DEFAULT 0,

  -- CDC (Crédito Direto ao Consumidor): 7 dias de direito de arrependimento.
  garantia_cdc BOOLEAN NOT NULL DEFAULT false,
  -- WinNegociacaoModal manda wonDate no formato YYYY-MM-DD, não ISO completo.
  garantia_cdc_inicio DATE,

  observacoes_cs TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.deal_negotiation_details
  DROP CONSTRAINT IF EXISTS deal_negotiation_details_deal_id_fkey;
ALTER TABLE public.deal_negotiation_details
  ADD CONSTRAINT deal_negotiation_details_deal_id_fkey
  FOREIGN KEY (deal_id) REFERENCES public.deals(id) ON DELETE CASCADE;

-- useNegociacoes faz upsert com onConflict: 'deal_id' — sem este unique o
-- upsert falha. Uma negociação tem no máximo um registro de detalhes.
CREATE UNIQUE INDEX IF NOT EXISTS idx_deal_negotiation_details_deal
  ON public.deal_negotiation_details (deal_id);

ALTER TABLE public.deal_negotiation_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_deal_negotiation_details ON public.deal_negotiation_details;
CREATE POLICY tenant_all_deal_negotiation_details ON public.deal_negotiation_details
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));
