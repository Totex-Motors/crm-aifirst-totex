-- Patch de schema do template, promovido do script avulso
-- `setup-cardoso-8-fix-schema.sql` (raiz do repo) para uma migration de verdade.
--
-- Apesar do prefixo "cardoso", este arquivo NÃO era dado de cliente: adicionava
-- colunas/tabelas que o frontend espera e o baseline não tinha (star_type usado
-- na feature de estrela do lead, dropdown_options, sales_goals, etc). Sem esta
-- migration, um setup do zero rodando só as migrations ficava sem essas
-- estruturas e quebrava queries. Ver CLAUDE.md: "Se algum [script cardoso] criar
-- estrutura que o codigo precisa, essa estrutura pertence a uma migration".
--
-- Idempotente e fiel ao estado atual de produção (policies abertas com
-- USING (true), como já estão no banco) — re-aplicar é no-op.

-- ── 1) Colunas faltantes em leads ──
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS star_type TEXT,
  ADD COLUMN IF NOT EXISTS acao_de_hoje TEXT,
  ADD COLUMN IF NOT EXISTS status_de_resposta TEXT,
  ADD COLUMN IF NOT EXISTS etapa_funil TEXT,
  ADD COLUMN IF NOT EXISTS instagram_profile_id TEXT,
  ADD COLUMN IF NOT EXISTS stage_changed_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;

-- ── 2) deals.sdr_id + FK ──
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS sdr_id UUID;

ALTER TABLE public.deals DROP CONSTRAINT IF EXISTS deals_sdr_id_fkey;
ALTER TABLE public.deals
  ADD CONSTRAINT deals_sdr_id_fkey
  FOREIGN KEY (sdr_id) REFERENCES public.team_members(id) ON DELETE SET NULL;

-- ── 3) company_activities.is_critical ──
ALTER TABLE public.company_activities
  ADD COLUMN IF NOT EXISTS is_critical BOOLEAN DEFAULT false;

-- ── 4) dropdown_options (opções de UI: canal/conteúdo/campanha/etc) ──
CREATE TABLE IF NOT EXISTS public.dropdown_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_type TEXT NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  is_system BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.dropdown_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dropdown_read_all" ON public.dropdown_options;
CREATE POLICY "dropdown_read_all" ON public.dropdown_options FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "dropdown_write_all" ON public.dropdown_options;
CREATE POLICY "dropdown_write_all" ON public.dropdown_options FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── 5) sales_playbook (script geral de vendas em texto) ──
CREATE TABLE IF NOT EXISTS public.sales_playbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.sales_playbook ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "playbook_read_all" ON public.sales_playbook;
CREATE POLICY "playbook_read_all" ON public.sales_playbook FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "playbook_write_all" ON public.sales_playbook;
CREATE POLICY "playbook_write_all" ON public.sales_playbook FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── 6) sales_goals (meta de receita por período) ──
CREATE TABLE IF NOT EXISTS public.sales_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID,
  period_start DATE,
  period_end DATE,
  target_revenue NUMERIC,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.sales_goals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "goals_read_all" ON public.sales_goals;
CREATE POLICY "goals_read_all" ON public.sales_goals FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "goals_write_all" ON public.sales_goals;
CREATE POLICY "goals_write_all" ON public.sales_goals FOR ALL TO authenticated USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
