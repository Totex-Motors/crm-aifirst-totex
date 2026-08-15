-- ============================================================
-- 0000 — Pré-requisitos pra CRMs de versões ANTIGAS do template
--
-- CRMs instalados antes da era multi-tenant não têm get_tenant_id()
-- nem a tabela tenants — e as migrations do Instagram dependem delas.
-- Este arquivo cria versões compatíveis SÓ SE não existirem: num CRM
-- novo ele é 100% no-op; num antigo, destrava a instalação sem mudar
-- nenhum comportamento (tudo cai no tenant default).
-- ============================================================

-- Tenant default (mesma constante usada pelo template multi-tenant)
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'default',
  slug text UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.tenants (id, name, slug, is_active)
VALUES ('00000000-0000-0000-0000-000000000001', 'default', 'default', true)
ON CONFLICT (id) DO NOTHING;

-- get_tenant_id(): lê app_metadata.tenant_id do JWT com fallback pro default.
-- Idêntica à do template multi-tenant — se um dia o mentorado atualizar o CRM
-- inteiro, nada muda.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'get_tenant_id'
  ) THEN
    CREATE FUNCTION public.get_tenant_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $fn$
      SELECT COALESCE(
        NULLIF(((current_setting('request.jwt.claims', true))::jsonb
                 -> 'app_metadata' ->> 'tenant_id'), '')::uuid,
        '00000000-0000-0000-0000-000000000001'::uuid
      )
    $fn$;
  END IF;
END $$;

-- Tabela config (chave-valor) — presente desde as primeiras versões, mas
-- garante em instalações muito customizadas.
CREATE TABLE IF NOT EXISTS public.config (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- tenant_config_overrides: usada pelo helper de config das functions.
CREATE TABLE IF NOT EXISTS public.tenant_config_overrides (
  tenant_id uuid NOT NULL,
  key text NOT NULL,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, key)
);
ALTER TABLE public.tenant_config_overrides ENABLE ROW LEVEL SECURITY;
