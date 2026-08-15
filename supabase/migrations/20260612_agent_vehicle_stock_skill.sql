-- =====================================================
-- Skill de Estoque de Veículos para a Plataforma de Agentes
-- =====================================================
-- Dá ao agente (ex: Gestor de Tráfego) acesso ao estoque REAL da loja
-- (tabela public.vehicles, sincronizada do feed XML) — sem precisar de
-- arquivo XML/CSV. Duas funções SECURITY DEFINER + registro como tools.
--
--   agent_skill_list_vehicles  → busca/filtra veículos disponíveis
--   agent_skill_get_vehicle    → detalhe completo de 1 veículo (fotos, opcionais)
--
-- Tenant resolvido via agent_resolve_tenant(p_user_id) (mesmo padrão das
-- demais skills). Só retorna estoque ATIVO e NÃO vendido.
-- =====================================================

-- ---------- 1. Listar / buscar estoque disponível ----------
CREATE OR REPLACE FUNCTION public.agent_skill_list_vehicles(
  p_user_id   uuid    DEFAULT NULL,
  p_search    text    DEFAULT NULL,
  p_make      text    DEFAULT NULL,
  p_model     text    DEFAULT NULL,
  p_body      text    DEFAULT NULL,
  p_fuel      text    DEFAULT NULL,
  p_price_min numeric DEFAULT NULL,
  p_price_max numeric DEFAULT NULL,
  p_year_min  integer DEFAULT NULL,
  p_limit     integer DEFAULT 20
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_tenant uuid;
  v_total  integer;
  v_rows   jsonb;
  v_limit  integer := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);
BEGIN
  v_tenant := agent_resolve_tenant(p_user_id);

  WITH filtered AS (
    SELECT v.*
    FROM vehicles v
    WHERE (v_tenant IS NULL OR v.tenant_id = v_tenant)
      AND v.is_active = true
      AND v.is_sold = false
      AND (p_make      IS NULL OR v.make  ILIKE '%'||p_make||'%')
      AND (p_model     IS NULL OR v.model ILIKE '%'||p_model||'%')
      AND (p_body      IS NULL OR v.body  ILIKE '%'||p_body||'%')
      AND (p_fuel      IS NULL OR v.fuel  ILIKE '%'||p_fuel||'%')
      AND (p_price_min IS NULL OR v.price >= p_price_min)
      AND (p_price_max IS NULL OR v.price <= p_price_max)
      AND (p_year_min  IS NULL OR v.year  >= p_year_min)
      AND (p_search    IS NULL OR (
            v.title   ILIKE '%'||p_search||'%' OR
            v.make    ILIKE '%'||p_search||'%' OR
            v.model   ILIKE '%'||p_search||'%' OR
            v.version ILIKE '%'||p_search||'%' OR
            v.color   ILIKE '%'||p_search||'%'))
  ),
  limited AS (
    SELECT * FROM filtered
    ORDER BY price DESC NULLS LAST
    LIMIT v_limit
  )
  SELECT
    (SELECT count(*) FROM filtered),
    (SELECT jsonb_agg(jsonb_build_object(
      'id',                f.id,
      'titulo',            f.title,
      'marca',             f.make,
      'modelo',            f.model,
      'versao',            f.version,
      'ano',               f.year,
      'ano_fabricacao',    f.fabric_year,
      'cor',               f.color,
      'km',                f.mileage,
      'combustivel',       f.fuel,
      'cambio',            f.gear,
      'carroceria',        f.body,
      'condicao',          f.condition,
      'preco',             f.price,
      'preco_promocional', f.promotion_price,
      'url',               f.url,
      'foto',              f.images->0,
      'n_fotos',           jsonb_array_length(COALESCE(f.images, '[]'::jsonb))
    )) FROM limited f)
  INTO v_total, v_rows;

  RETURN jsonb_build_object(
    'ok',               true,
    'total_disponivel', COALESCE(v_total, 0),
    'retornados',       COALESCE(jsonb_array_length(v_rows), 0),
    'veiculos',         COALESCE(v_rows, '[]'::jsonb)
  );
END $function$;

-- ---------- 2. Detalhe completo de 1 veículo (fotos + opcionais) ----------
CREATE OR REPLACE FUNCTION public.agent_skill_get_vehicle(
  p_user_id    uuid DEFAULT NULL,
  p_vehicle_id text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_tenant uuid;
  v_out    jsonb;
BEGIN
  v_tenant := agent_resolve_tenant(p_user_id);

  SELECT jsonb_build_object(
    'id',                v.id,
    'titulo',            v.title,
    'descricao',         v.description,
    'marca',             v.make,
    'modelo',            v.model,
    'versao',            v.version,
    'ano',               v.year,
    'ano_fabricacao',    v.fabric_year,
    'cor',               v.color,
    'km',                v.mileage,
    'combustivel',       v.fuel,
    'cambio',            v.gear,
    'motor',             v.motor,
    'potencia',          v.hp,
    'portas',            v.doors,
    'carroceria',        v.body,
    'condicao',          v.condition,
    'preco',             v.price,
    'preco_regular',     v.regular_price,
    'preco_promocional', v.promotion_price,
    'fipe',              v.fipe,
    'cidade',            v.location_city,
    'estado',            v.location_state,
    'url',               v.url,
    'video',             v.video,
    'fotos',             COALESCE(v.images, '[]'::jsonb),
    'opcionais',         COALESCE(v.features, '[]'::jsonb)
  ) INTO v_out
  FROM vehicles v
  WHERE v.id = p_vehicle_id
    AND v.is_active = true
    AND (v_tenant IS NULL OR v.tenant_id = v_tenant);

  IF v_out IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Veículo não encontrado ou indisponível no estoque.');
  END IF;

  RETURN jsonb_build_object('ok', true, 'veiculo', v_out);
END $function$;

-- ---------- 3. Permissões (mesmo padrão das demais skills) ----------
DO $$
DECLARE fn text;
BEGIN
  FOREACH fn IN ARRAY ARRAY[
    'agent_skill_list_vehicles(uuid,text,text,text,text,text,numeric,numeric,integer,integer)',
    'agent_skill_get_vehicle(uuid,text)'
  ] LOOP
    BEGIN
      EXECUTE format('REVOKE ALL ON FUNCTION public.%s FROM PUBLIC', fn);
      EXECUTE format('GRANT EXECUTE ON FUNCTION public.%s TO authenticated, service_role', fn);
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
  END LOOP;
END $$;

-- ---------- 4. Registra as tools no agente Gestor de Tráfego (idempotente, por slug) ----------
-- Portável: só registra se o agente existir neste ambiente.
DELETE FROM agents_tools t
USING agents_registry r
WHERE t.agent_id = r.id
  AND r.slug = 'vinicius-gestor-de-trafego'
  AND t.name IN ('listar_estoque_veiculos', 'detalhe_veiculo');

INSERT INTO agents_tools (agent_id, name, description, parameters_schema, action_type, action_config, usage_mode, is_active, provider)
SELECT r.id, 'listar_estoque_veiculos',
  'Lista/busca veículos DISPONÍVEIS no estoque REAL da loja (sincronizado do feed, sem precisar de XML/CSV). Use pra escolher quais carros anunciar e montar campanhas. Todos os filtros são opcionais. Retorna marca, modelo, ano, preço, km, cor, carroceria, URL e 1 foto. Sempre use os dados reais daqui, nunca invente carros/preços.',
  '{"type":"object","properties":{"search":{"type":"string"},"make":{"type":"string"},"model":{"type":"string"},"body":{"type":"string"},"fuel":{"type":"string"},"price_min":{"type":"number"},"price_max":{"type":"number"},"year_min":{"type":"integer"},"limit":{"type":"integer"}}}'::jsonb,
  'sql',
  '{"function":"agent_skill_list_vehicles","params_map":{"p_user_id":"{{user_id}}","p_search":"{{search}}","p_make":"{{make}}","p_model":"{{model}}","p_body":"{{body}}","p_fuel":"{{fuel}}","p_price_min":"{{price_min}}","p_price_max":"{{price_max}}","p_year_min":"{{year_min}}","p_limit":"{{limit}}"}}'::jsonb,
  'always', true, NULL
FROM agents_registry r WHERE r.slug = 'vinicius-gestor-de-trafego';

INSERT INTO agents_tools (agent_id, name, description, parameters_schema, action_type, action_config, usage_mode, is_active, provider)
SELECT r.id, 'detalhe_veiculo',
  'Detalhe COMPLETO de 1 veículo do estoque pelo id (vindo do listar_estoque_veiculos): descrição, TODAS as fotos, opcionais, motor, potência, FIPE, cidade e URL. Use ao montar o criativo de um carro específico.',
  '{"type":"object","required":["vehicle_id"],"properties":{"vehicle_id":{"type":"string"}}}'::jsonb,
  'sql',
  '{"function":"agent_skill_get_vehicle","params_map":{"p_user_id":"{{user_id}}","p_vehicle_id":"{{vehicle_id}}"}}'::jsonb,
  'always', true, NULL
FROM agents_registry r WHERE r.slug = 'vinicius-gestor-de-trafego';
