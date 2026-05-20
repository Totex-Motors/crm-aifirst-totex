-- =====================================================
-- Grupo Cardoso — Integração Estoque ↔ Pipeline
-- =====================================================

CREATE EXTENSION IF NOT EXISTS unaccent;

-- 1) TRIGGER: deal entra em estágio is_won=true => marca vehicle is_sold=true
CREATE OR REPLACE FUNCTION public.sync_vehicle_sold_on_deal_won()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_is_won BOOLEAN;
  v_is_lost BOOLEAN;
BEGIN
  IF NEW.pipeline_stage_id IS NULL OR NEW.vehicle_id IS NULL THEN RETURN NEW; END IF;
  IF OLD.pipeline_stage_id IS NOT DISTINCT FROM NEW.pipeline_stage_id THEN RETURN NEW; END IF;

  SELECT is_won, is_lost INTO v_is_won, v_is_lost
  FROM sales_pipeline_stages WHERE id = NEW.pipeline_stage_id;

  IF v_is_won THEN
    UPDATE public.vehicles
    SET is_sold = true, is_active = false, updated_at = NOW()
    WHERE id = NEW.vehicle_id AND is_sold = false;
  END IF;

  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_sync_vehicle_sold ON public.deals;
CREATE TRIGGER trg_sync_vehicle_sold
  AFTER UPDATE OF pipeline_stage_id ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.sync_vehicle_sold_on_deal_won();

-- Tambem dispara no INSERT (raro, mas suporta o caso "deal ja entra como ganho")
CREATE OR REPLACE FUNCTION public.sync_vehicle_sold_on_deal_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_is_won BOOLEAN;
BEGIN
  IF NEW.pipeline_stage_id IS NULL OR NEW.vehicle_id IS NULL THEN RETURN NEW; END IF;
  SELECT is_won INTO v_is_won FROM sales_pipeline_stages WHERE id = NEW.pipeline_stage_id;
  IF v_is_won THEN
    UPDATE public.vehicles
    SET is_sold = true, is_active = false, updated_at = NOW()
    WHERE id = NEW.vehicle_id AND is_sold = false;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_sync_vehicle_sold_insert ON public.deals;
CREATE TRIGGER trg_sync_vehicle_sold_insert
  AFTER INSERT ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.sync_vehicle_sold_on_deal_insert();

-- 2) Mapping vehicle.seller -> pipeline name (helper)
-- Cardoso Veículos -> pipeline "Cardoso Veiculos"
-- Cardoso Prime    -> pipeline "Cardoso Prime"
-- (case insensitive + tolerante a acento)
CREATE OR REPLACE FUNCTION public.pipeline_for_vehicle(p_seller text)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT id FROM sales_pipelines
  WHERE LOWER(unaccent(name)) = LOWER(unaccent(p_seller))
  LIMIT 1
$$;

-- 3) RPC: lista veículos disponíveis pra picker do deal (filtro por pipeline ou seller)
CREATE OR REPLACE FUNCTION public.list_available_vehicles(
  p_pipeline_id uuid DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_limit integer DEFAULT 100
)
RETURNS TABLE(
  id text, title text, seller text, make text, model text, year integer,
  mileage integer, condition text, color text, price numeric, image text
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  WITH pipe AS (
    SELECT name FROM sales_pipelines WHERE id = p_pipeline_id
  )
  SELECT
    v.id, v.title, v.seller, v.make, v.model, v.year,
    v.mileage, v.condition, v.color, v.price,
    (v.images->>0) AS image
  FROM vehicles v
  LEFT JOIN pipe p ON true
  WHERE v.is_active = true AND v.is_sold = false
    AND (p.name IS NULL OR LOWER(unaccent(v.seller)) = LOWER(unaccent(p.name)))
    AND (
      p_search IS NULL OR p_search = ''
      OR v.title ILIKE '%' || p_search || '%'
      OR v.make ILIKE '%' || p_search || '%'
      OR v.model ILIKE '%' || p_search || '%'
      OR v.full_plate ILIKE '%' || p_search || '%'
    )
  ORDER BY v.price DESC
  LIMIT p_limit
$$;

-- 4) View: deal + vehicle info enriquecida (pro card do kanban)
CREATE OR REPLACE VIEW public.deals_with_vehicle AS
SELECT
  d.id AS deal_id,
  d.vehicle_id,
  v.title AS vehicle_title,
  v.make AS vehicle_make,
  v.model AS vehicle_model,
  v.year AS vehicle_year,
  v.price AS vehicle_price,
  (v.images->>0) AS vehicle_image
FROM deals d
LEFT JOIN vehicles v ON v.id = d.vehicle_id;

-- Habilita unaccent (uma vez, se ainda nao)
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Reload PostgREST
NOTIFY pgrst, 'reload schema';

-- Smoke test
SELECT
  (SELECT count(*) FROM pg_trigger WHERE tgname IN ('trg_sync_vehicle_sold','trg_sync_vehicle_sold_insert')) AS triggers_ok,
  (SELECT count(*) FROM list_available_vehicles(NULL, NULL, 5)) AS sample_available,
  (SELECT count(*) FROM list_available_vehicles((SELECT id FROM sales_pipelines WHERE name='Cardoso Prime'), NULL, 50)) AS prime_available,
  (SELECT count(*) FROM list_available_vehicles((SELECT id FROM sales_pipelines WHERE name='Cardoso Veiculos'), NULL, 50)) AS veiculos_available;
