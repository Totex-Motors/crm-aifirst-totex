-- =====================================================
-- Grupo Cardoso — Tabela de Estoque (vehicles) + config
-- =====================================================
-- Cada veiculo do XML vira uma linha. Sync por external_id
-- (campo <ID> do XML). Sincronizado por edge function +
-- cron a cada 15 min.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.vehicles (
  -- Identificacao (external_id = ID do XML)
  id TEXT PRIMARY KEY,
  url TEXT,
  title TEXT NOT NULL,
  description TEXT,

  -- Classificacao
  seller TEXT NOT NULL,           -- "Cardoso Veiculos" | "Cardoso Prime"
  category TEXT,                  -- carros, motos, etc
  condition TEXT,                 -- usado | novo
  negotiation TEXT,               -- CONSIGNACAO etc

  -- Veiculo
  make TEXT,                      -- Toyota, BMW, etc
  model TEXT,                     -- Corolla, X5
  version TEXT,                   -- Versao completa
  body TEXT,                      -- Hatch, Sedan, SUV
  year INTEGER,
  fabric_year INTEGER,
  color TEXT,
  mileage INTEGER,                -- KM
  fuel TEXT,                      -- gasolina, etanol, hibrido, eletrico
  gear TEXT,                      -- manual, automatico
  motor TEXT,
  doors INTEGER,
  hp TEXT,
  fipe TEXT,                      -- codigo FIPE

  -- Placas (parcial + completa)
  plate TEXT,                     -- F**-***3
  full_plate TEXT,                -- FRA5C63

  -- Precos
  price NUMERIC(12,2),            -- price atual
  regular_price NUMERIC(12,2),
  promotion_price NUMERIC(12,2),

  -- Localizacao
  location_country TEXT,
  location_state TEXT,
  location_city TEXT,
  neighborhood TEXT,
  zip_code TEXT,

  -- Media (arrays JSON)
  images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  video TEXT,

  -- Status (gerenciado pela sync)
  is_active BOOLEAN DEFAULT true,        -- false = removido do feed (vendido?)
  is_sold BOOLEAN DEFAULT false,
  last_seen_at TIMESTAMPTZ DEFAULT now(),

  -- Metadados do feed
  published_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ,
  raw_xml TEXT,                          -- pro debug

  -- Auditoria
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001'
);

-- Indices uteis pra consultas no front
CREATE INDEX IF NOT EXISTS idx_vehicles_seller ON public.vehicles(seller) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_make_model ON public.vehicles(make, model) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON public.vehicles(price) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_condition ON public.vehicles(condition) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON public.vehicles(year DESC);

-- Coluna vehicle_id em deals (vincula deal a veiculo especifico)
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS vehicle_id TEXT;

DO $$ BEGIN
  ALTER TABLE public.deals
    ADD CONSTRAINT deals_vehicle_id_fkey
    FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY tenant_select_vehicles ON public.vehicles FOR SELECT
    USING (tenant_id = get_tenant_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY tenant_write_vehicles ON public.vehicles FOR ALL
    USING (tenant_id = get_tenant_id())
    WITH CHECK (tenant_id = get_tenant_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- URL do feed XML em config (le pela edge function)
INSERT INTO public.config (key, value, updated_at)
VALUES ('VEHICLE_FEED_URL', 'https://autoconf-prod.s3.sa-east-1.amazonaws.com/estoque-site/Y8Q0TzqSZnV6G46jxZP9WucGWWHWgFafZdUSIL8w.xml', NOW())
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Trigger pra atualizar updated_at
CREATE OR REPLACE FUNCTION public.touch_vehicles_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS trg_vehicles_touch ON public.vehicles;
CREATE TRIGGER trg_vehicles_touch BEFORE UPDATE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.touch_vehicles_updated_at();

NOTIFY pgrst, 'reload schema';

-- Confirma
SELECT 'OK' AS status,
  (SELECT count(*) FROM information_schema.tables WHERE table_name='vehicles' AND table_schema='public') AS vehicles_table,
  (SELECT value FROM config WHERE key='VEHICLE_FEED_URL') AS feed_url,
  (SELECT count(*) FROM information_schema.columns WHERE table_name='deals' AND column_name='vehicle_id') AS deals_vehicle_id;
