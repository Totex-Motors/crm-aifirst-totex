-- =====================================================
-- Stubs vazios pras tabelas de webinar referenciadas pelo
-- frontend (modulo de eventos foi removido do template,
-- mas os hooks ainda fazem JOIN). Tabelas ficam vazias
-- pra sempre — apenas evitam erro 404 no PostgREST.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.webinar_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  event_date TIMESTAMPTZ,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.lead_webinar_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  webinar_config_id UUID,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FK separada (o frontend referencia pelo nome do constraint)
DO $$ BEGIN
  ALTER TABLE public.lead_webinar_enrollments
    ADD CONSTRAINT lead_webinar_enrollments_webinar_config_id_fkey
    FOREIGN KEY (webinar_config_id) REFERENCES public.webinar_config(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  webinar_config_id UUID,
  attended BOOLEAN,
  total_duration_minutes INTEGER,
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS allow read (PostgREST precisa)
ALTER TABLE public.webinar_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_webinar_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "stub_read_all" ON public.webinar_config FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "stub_read_all" ON public.lead_webinar_enrollments FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "stub_read_all" ON public.event_registrations FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Reload PostgREST schema cache pra reconhecer FKs novas
NOTIFY pgrst, 'reload schema';

SELECT 'Stubs criadas' AS status,
  (SELECT count(*) FROM information_schema.tables WHERE table_name IN ('webinar_config','lead_webinar_enrollments','event_registrations') AND table_schema='public') AS qtd_tabelas;
