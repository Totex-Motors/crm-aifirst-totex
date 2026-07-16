-- ============================================================================
-- vehicles — estoque de veiculos (tabela central do nicho automotivo)
--
-- A tabela existe em producao desde o setup do Grupo Cardoso, mas foi criada
-- pelo script avulso `setup-cardoso-9-vehicles.sql`, na raiz do repo — nunca
-- por migration. Um setup do zero rodando so as migrations ficava SEM ela, e o
-- CRM automotivo nao funciona sem estoque (deals.vehicle_id aponta pra ca).
--
-- Esta migration reproduz o schema aplicado em producao: as 44 colunas foram
-- conferidas uma a uma contra o banco e batem com o script.
--
-- Diferencas deliberadas em relacao ao script avulso:
--
--  1. NAO faz o INSERT de config.VEHICLE_FEED_URL. O script gravava a URL do
--     S3 do Grupo Cardoso hardcoded; a URL do feed e chave de integracao,
--     configurada em /configuracoes > Integracoes e lida via
--     requireIntegrationKey(). Semear a URL de um cliente no banco de todos
--     seria hardcode de config (ver "Armadilhas conhecidas" no CLAUDE.md).
--
--  2. tenant_id usa get_tenant_id() em vez do UUID do tenant default
--     hardcoded. Equivalente hoje (a funcao cai nesse mesmo tenant quando o JWT
--     nao traz tenant_id) e correto quando houver multi-tenant de verdade.
--
--  3. Policies com (SELECT get_tenant_id()) em vez da chamada direta — evita
--     reavaliar a funcao por linha. E o padrao do resto do projeto.
-- ============================================================================

-- id e TEXT: e o <ID> do feed XML, nao UUID gerado.
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY,
  url TEXT,
  title TEXT NOT NULL,
  description TEXT,

  -- Classificacao
  seller TEXT NOT NULL,
  category TEXT,
  condition TEXT,
  negotiation TEXT,

  -- Veiculo
  make TEXT,
  model TEXT,
  version TEXT,
  body TEXT,
  year INTEGER,
  fabric_year INTEGER,
  color TEXT,
  mileage INTEGER,
  fuel TEXT,
  gear TEXT,
  motor TEXT,
  doors INTEGER,
  hp TEXT,
  fipe TEXT,

  -- Placas (parcial + completa)
  plate TEXT,
  full_plate TEXT,

  -- Precos
  price NUMERIC(12,2),
  regular_price NUMERIC(12,2),
  promotion_price NUMERIC(12,2),

  -- Localizacao
  location_country TEXT,
  location_state TEXT,
  location_city TEXT,
  neighborhood TEXT,
  zip_code TEXT,

  -- Media
  images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  video TEXT,

  -- Status (gerenciado pela sync)
  is_active BOOLEAN DEFAULT true,
  is_sold BOOLEAN DEFAULT false,
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),

  -- Metadados do feed
  published_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ,
  raw_xml TEXT,

  -- Auditoria
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  tenant_id UUID NOT NULL DEFAULT public.get_tenant_id()
);

-- Alinha o default do tenant onde a tabela ja existia com o default hardcoded.
ALTER TABLE public.vehicles
  ALTER COLUMN tenant_id SET DEFAULT public.get_tenant_id();

-- Indices das consultas do front (filtram estoque ativo).
CREATE INDEX IF NOT EXISTS idx_vehicles_seller ON public.vehicles(seller) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_make_model ON public.vehicles(make, model) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON public.vehicles(price) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_condition ON public.vehicles(condition) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON public.vehicles(year DESC);

-- Vincula a negociacao ao veiculo. TEXT pra casar com vehicles.id.
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS vehicle_id TEXT;

ALTER TABLE public.deals
  DROP CONSTRAINT IF EXISTS deals_vehicle_id_fkey;
ALTER TABLE public.deals
  ADD CONSTRAINT deals_vehicle_id_fkey
  FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_deals_vehicle_id
  ON public.deals(vehicle_id) WHERE vehicle_id IS NOT NULL;

-- RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_select_vehicles ON public.vehicles;
CREATE POLICY tenant_select_vehicles ON public.vehicles
  FOR SELECT TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()));

DROP POLICY IF EXISTS tenant_write_vehicles ON public.vehicles;
CREATE POLICY tenant_write_vehicles ON public.vehicles
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));

-- updated_at automatico
CREATE OR REPLACE FUNCTION public.touch_vehicles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_vehicles_touch ON public.vehicles;
CREATE TRIGGER trg_vehicles_touch
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.touch_vehicles_updated_at();
