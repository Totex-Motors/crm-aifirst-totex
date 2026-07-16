-- ============================================================================
-- Treinamento com IA: roleplay_sessions + sales_training_cases
--
-- A rota /comercial/treinamento está no sidebar e tem duas features:
--
--  1. Roleplay (simulador de call). JÁ FUNCIONA hoje: as personas são
--     hardcoded (DEFAULT_PERSONAS) e as edge functions roleplay-session e
--     roleplay-evaluate não tocam o banco. O que quebrava era o fim: o
--     saveSession dá throw, então o vendedor treinava, recebia a nota e
--     perdia tudo ao salvar. E o histórico nunca listava nada.
--
--  2. Biblioteca de casos reais. Nunca teve tabela — a página sempre caiu
--     no estado vazio.
--
-- Nenhuma das duas tabelas existiu em migration alguma.
-- ============================================================================

-- 1) Sessões de roleplay
CREATE TABLE IF NOT EXISTS public.roleplay_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),

  sales_rep_id UUID,

  -- Slug da persona ('roberto_cetico', 'ana_preco', ...), não UUID:
  -- as personas são hardcoded no front, não vêm de tabela.
  persona_id TEXT,
  persona_name TEXT NOT NULL,
  persona_role TEXT,
  persona_company TEXT,

  scenario TEXT NOT NULL,
  voice TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,

  -- Só os trechos finais da transcrição (transcription.filter(t => t.isFinal)).
  transcription JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- JSON completo da roleplay-evaluate: nota_geral, veredicto, fases, etc.
  evaluation JSONB,

  -- nota_geral do avaliador (0-100).
  score INTEGER,
  -- veredicto do avaliador: o cliente compraria?
  verdict TEXT CHECK (verdict IS NULL OR verdict IN ('sim', 'nao', 'talvez')),

  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.roleplay_sessions
  DROP CONSTRAINT IF EXISTS roleplay_sessions_sales_rep_id_fkey;
ALTER TABLE public.roleplay_sessions
  ADD CONSTRAINT roleplay_sessions_sales_rep_id_fkey
  FOREIGN KEY (sales_rep_id) REFERENCES public.team_members(id) ON DELETE SET NULL;

ALTER TABLE public.roleplay_sessions
  DROP CONSTRAINT IF EXISTS roleplay_sessions_created_by_fkey;
ALTER TABLE public.roleplay_sessions
  ADD CONSTRAINT roleplay_sessions_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- useRoleplayHistory: ordena por created_at desc dentro do tenant.
CREATE INDEX IF NOT EXISTS idx_roleplay_sessions_tenant_created
  ON public.roleplay_sessions (tenant_id, created_at DESC);
-- Evolução da nota por vendedor.
CREATE INDEX IF NOT EXISTS idx_roleplay_sessions_rep_created
  ON public.roleplay_sessions (sales_rep_id, created_at DESC) WHERE sales_rep_id IS NOT NULL;

ALTER TABLE public.roleplay_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_roleplay_sessions ON public.roleplay_sessions;
CREATE POLICY tenant_all_roleplay_sessions ON public.roleplay_sessions
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- 2) Biblioteca de casos reais (chamadas/reuniões salvas como material)
CREATE TABLE IF NOT EXISTS public.sales_training_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),

  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'geral',
  source_type TEXT NOT NULL DEFAULT 'manual',

  call_history_id UUID,
  meeting_id UUID,

  transcription JSONB,
  ai_analysis JSONB,
  record_url TEXT,
  key_moments JSONB,
  notes TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',

  difficulty TEXT,
  outcome TEXT,

  lead_id UUID,
  sales_rep_id UUID,
  created_by UUID,

  rating NUMERIC(3,1),
  view_count INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.sales_training_cases
  DROP CONSTRAINT IF EXISTS sales_training_cases_call_history_id_fkey;
ALTER TABLE public.sales_training_cases
  ADD CONSTRAINT sales_training_cases_call_history_id_fkey
  FOREIGN KEY (call_history_id) REFERENCES public.call_history(id) ON DELETE SET NULL;

ALTER TABLE public.sales_training_cases
  DROP CONSTRAINT IF EXISTS sales_training_cases_meeting_id_fkey;
ALTER TABLE public.sales_training_cases
  ADD CONSTRAINT sales_training_cases_meeting_id_fkey
  FOREIGN KEY (meeting_id) REFERENCES public.meetings(id) ON DELETE SET NULL;

-- useSalesTrainingCases faz embed lead:leads(id, name) — precisa desta FK.
ALTER TABLE public.sales_training_cases
  DROP CONSTRAINT IF EXISTS sales_training_cases_lead_id_fkey;
ALTER TABLE public.sales_training_cases
  ADD CONSTRAINT sales_training_cases_lead_id_fkey
  FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;

-- ... e sales_rep:team_members(id, name).
ALTER TABLE public.sales_training_cases
  DROP CONSTRAINT IF EXISTS sales_training_cases_sales_rep_id_fkey;
ALTER TABLE public.sales_training_cases
  ADD CONSTRAINT sales_training_cases_sales_rep_id_fkey
  FOREIGN KEY (sales_rep_id) REFERENCES public.team_members(id) ON DELETE SET NULL;

ALTER TABLE public.sales_training_cases
  DROP CONSTRAINT IF EXISTS sales_training_cases_created_by_fkey;
ALTER TABLE public.sales_training_cases
  ADD CONSTRAINT sales_training_cases_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Listagem: ordena por created_at desc, filtra por category/outcome/difficulty.
CREATE INDEX IF NOT EXISTS idx_sales_training_cases_tenant_created
  ON public.sales_training_cases (tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_training_cases_tenant_category
  ON public.sales_training_cases (tenant_id, category);
CREATE INDEX IF NOT EXISTS idx_sales_training_cases_tags
  ON public.sales_training_cases USING GIN (tags);

ALTER TABLE public.sales_training_cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_sales_training_cases ON public.sales_training_cases;
CREATE POLICY tenant_all_sales_training_cases ON public.sales_training_cases
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- 3) RPC de contagem de views
-- useIncrementViewCount chama esta RPC; o fallback dele passa uma Promise como
-- valor de coluna e falharia. Com a RPC existindo, o fallback nunca roda.
-- SECURITY INVOKER: o RLS acima já restringe ao tenant do chamador.
CREATE OR REPLACE FUNCTION public.increment_training_view_count(case_id UUID)
RETURNS void
LANGUAGE sql
SET search_path = public, pg_catalog
AS $$
  UPDATE public.sales_training_cases
  SET view_count = view_count + 1
  WHERE id = case_id;
$$;
