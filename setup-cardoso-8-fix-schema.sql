-- =====================================================
-- Patch: adiciona colunas/tabelas que o frontend espera
-- mas o template baseline nao tem (mismatch do template).
-- =====================================================

-- 1) Colunas faltantes em LEADS
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS star_type TEXT,
  ADD COLUMN IF NOT EXISTS acao_de_hoje TEXT,
  ADD COLUMN IF NOT EXISTS status_de_resposta TEXT,
  ADD COLUMN IF NOT EXISTS etapa_funil TEXT,
  ADD COLUMN IF NOT EXISTS instagram_profile_id TEXT,
  ADD COLUMN IF NOT EXISTS stage_changed_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;

-- 2) Coluna sdr_id em DEALS + FK
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS sdr_id UUID;

DO $$ BEGIN
  ALTER TABLE public.deals
    ADD CONSTRAINT deals_sdr_id_fkey
    FOREIGN KEY (sdr_id) REFERENCES public.team_members(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3) Coluna is_critical em COMPANY_ACTIVITIES
ALTER TABLE public.company_activities
  ADD COLUMN IF NOT EXISTS is_critical BOOLEAN DEFAULT false;

-- 4) Stub: dropdown_options (canal/conteudo/campanha/etc — opcoes de UI)
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
DO $$ BEGIN
  CREATE POLICY "dropdown_read_all" ON public.dropdown_options FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "dropdown_write_all" ON public.dropdown_options FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 5) Stub: sales_playbook (singular — script geral de vendas em texto)
CREATE TABLE IF NOT EXISTS public.sales_playbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.sales_playbook ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "playbook_read_all" ON public.sales_playbook FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "playbook_write_all" ON public.sales_playbook FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 6) Stub: sales_goals (meta de receita por periodo)
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
DO $$ BEGIN
  CREATE POLICY "goals_read_all" ON public.sales_goals FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "goals_write_all" ON public.sales_goals FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Reload PostgREST
NOTIFY pgrst, 'reload schema';

-- Confirma
SELECT
  (SELECT count(*) FROM information_schema.columns WHERE table_name='leads' AND column_name IN ('star_type','acao_de_hoje','status_de_resposta','etapa_funil','instagram_profile_id','stage_changed_at','monthly_revenue')) AS leads_cols_ok,
  (SELECT count(*) FROM information_schema.columns WHERE table_name='deals' AND column_name='sdr_id') AS deals_sdr_id,
  (SELECT count(*) FROM information_schema.columns WHERE table_name='company_activities' AND column_name='is_critical') AS ca_is_critical,
  (SELECT count(*) FROM information_schema.tables WHERE table_name IN ('dropdown_options','sales_playbook','sales_goals') AND table_schema='public') AS stub_tables;
