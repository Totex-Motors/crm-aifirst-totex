-- ============================================================================
-- Tags de templates da WhatsApp Cloud API
--
-- Contexto: o frontend (Marketing > WhatsApp Templates) já lê `whatsapp_template_tags`
-- e a coluna `whatsapp_cloud_templates.internal_tags`, mas nenhuma das duas existia.
-- A lista de tags vinha vazia e atribuir tag dava erro.
--
-- `whatsapp_cloud_templates` existe no banco de produção mas nunca foi criada por
-- uma migration. O CREATE ... IF NOT EXISTS abaixo é no-op em produção e garante
-- que um setup do zero (aluno rodando as migrations em ordem) não quebre no ALTER.
-- ============================================================================

-- 1) Templates da Cloud API (no-op onde já existe)
CREATE TABLE IF NOT EXISTS public.whatsapp_cloud_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),
  meta_template_id TEXT,
  meta_waba_id TEXT,
  name TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'pt_BR',
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  rejection_reason TEXT,
  components JSONB NOT NULL DEFAULT '[]'::jsonb,
  variables_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- sync-whatsapp-templates e create-whatsapp-template fazem upsert
-- com onConflict "tenant_id,name,language" — o unique abaixo é o que sustenta isso.
CREATE UNIQUE INDEX IF NOT EXISTS idx_whatsapp_cloud_templates_tenant_name_lang
  ON public.whatsapp_cloud_templates (tenant_id, name, language);

ALTER TABLE public.whatsapp_cloud_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_whatsapp_cloud_templates ON public.whatsapp_cloud_templates;
CREATE POLICY tenant_all_whatsapp_cloud_templates ON public.whatsapp_cloud_templates
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- 2) Catálogo de tags (por tenant)
CREATE TABLE IF NOT EXISTS public.whatsapp_template_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id(),
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#64748b',
  icon TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- slug identifica a tag dentro do tenant; internal_tags referencia por slug.
CREATE UNIQUE INDEX IF NOT EXISTS idx_whatsapp_template_tags_tenant_slug
  ON public.whatsapp_template_tags (tenant_id, slug);

CREATE INDEX IF NOT EXISTS idx_whatsapp_template_tags_tenant_position
  ON public.whatsapp_template_tags (tenant_id, position);

ALTER TABLE public.whatsapp_template_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_all_whatsapp_template_tags ON public.whatsapp_template_tags;
CREATE POLICY tenant_all_whatsapp_template_tags ON public.whatsapp_template_tags
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- 3) Tags atribuídas ao template (array de slugs)
ALTER TABLE public.whatsapp_cloud_templates
  ADD COLUMN IF NOT EXISTS internal_tags TEXT[] NOT NULL DEFAULT '{}';

-- Filtro por tag na listagem (WhatsAppTemplates.tsx) faz overlap em internal_tags.
CREATE INDEX IF NOT EXISTS idx_whatsapp_cloud_templates_internal_tags
  ON public.whatsapp_cloud_templates USING GIN (internal_tags);
