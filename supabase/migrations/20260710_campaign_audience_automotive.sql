-- =====================================================
-- Segmentação de audiência de campanhas por qualificação automotiva
-- =====================================================
-- Adiciona filtros de intenção de compra (troca, à vista, financiamento, compra)
-- às RPCs de contagem de audiência, substituindo a segmentação B2B por BANT.
-- Recria as duas overloads de get_campaign_audience_count preservando tudo,
-- só somando as 4 linhas de filtro intent_*.
-- =====================================================

-- Overload 1: (p_filters jsonb) — usada pelo preview do frontend (SQL estático)
CREATE OR REPLACE FUNCTION public.get_campaign_audience_count(p_filters jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$
DECLARE
  v_count INTEGER;
  v_tenant UUID := public.get_tenant_id();
BEGIN
  IF p_filters ? 'lead_ids' AND jsonb_array_length(p_filters->'lead_ids') > 0 THEN
    SELECT count(*) INTO v_count FROM leads l
    WHERE l.tenant_id = v_tenant
      AND l.id::text IN (SELECT jsonb_array_elements_text(p_filters->'lead_ids'))
      AND l.phone IS NOT NULL AND l.phone != '';
    RETURN v_count;
  END IF;

  SELECT count(*) INTO v_count FROM leads l
  WHERE l.tenant_id = v_tenant
    AND l.phone IS NOT NULL AND l.phone != ''
    AND (NOT p_filters ? 'pipeline_stage_ids' OR jsonb_array_length(p_filters->'pipeline_stage_ids') = 0 OR l.pipeline_stage_id::text IN (SELECT jsonb_array_elements_text(p_filters->'pipeline_stage_ids')))
    AND (NOT p_filters ? 'states' OR jsonb_array_length(p_filters->'states') = 0 OR l.state IN (SELECT jsonb_array_elements_text(p_filters->'states')))
    AND (NOT p_filters ? 'cities' OR jsonb_array_length(p_filters->'cities') = 0 OR l.city_name IN (SELECT jsonb_array_elements_text(p_filters->'cities')))
    AND (NOT p_filters ? 'utm_sources' OR jsonb_array_length(p_filters->'utm_sources') = 0 OR l.utm_source IN (SELECT jsonb_array_elements_text(p_filters->'utm_sources')))
    AND (NOT p_filters ? 'utm_campaigns' OR jsonb_array_length(p_filters->'utm_campaigns') = 0 OR l.utm_campaign IN (SELECT jsonb_array_elements_text(p_filters->'utm_campaigns')))
    AND (NOT p_filters ? 'sales_rep_ids' OR jsonb_array_length(p_filters->'sales_rep_ids') = 0 OR l.sales_rep_id::text IN (SELECT jsonb_array_elements_text(p_filters->'sales_rep_ids')))
    AND ((p_filters->>'score_min') IS NULL OR l.sales_score >= (p_filters->>'score_min')::numeric)
    AND ((p_filters->>'score_max') IS NULL OR l.sales_score <= (p_filters->>'score_max')::numeric)
    AND ((p_filters->>'created_after') IS NULL OR l.created_at >= (p_filters->>'created_after')::timestamptz)
    AND ((p_filters->>'created_before') IS NULL OR l.created_at <= (p_filters->>'created_before')::timestamptz)
    AND (NOT (p_filters ? 'no_sales_rep' AND (p_filters->>'no_sales_rep')::boolean) OR l.sales_rep_id IS NULL)
    AND (NOT (p_filters ? 'bant_budget' AND (p_filters->>'bant_budget')::boolean) OR l.bant_budget = true)
    AND (NOT (p_filters ? 'bant_authority' AND (p_filters->>'bant_authority')::boolean) OR l.bant_authority = true)
    AND (NOT (p_filters ? 'bant_need' AND (p_filters->>'bant_need')::boolean) OR l.bant_need = true)
    AND (NOT (p_filters ? 'bant_timeline' AND (p_filters->>'bant_timeline')::boolean) OR l.bant_timeline = true)
    AND (NOT (p_filters ? 'intent_trade_in' AND (p_filters->>'intent_trade_in')::boolean) OR l.intent_trade_in = true)
    AND (NOT (p_filters ? 'intent_cash' AND (p_filters->>'intent_cash')::boolean) OR l.intent_cash = true)
    AND (NOT (p_filters ? 'intent_finance_no_entry' AND (p_filters->>'intent_finance_no_entry')::boolean) OR l.intent_finance_no_entry = true)
    AND (NOT (p_filters ? 'intent_buy_only' AND (p_filters->>'intent_buy_only')::boolean) OR l.intent_buy_only = true);

  RETURN v_count;
END;
$function$;

-- Overload 2: (p_tenant_id uuid, p_filters jsonb) — construtor de SQL dinâmico
CREATE OR REPLACE FUNCTION public.get_campaign_audience_count(p_tenant_id uuid, p_filters jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$
DECLARE
  v_count INTEGER;
  v_query TEXT;
BEGIN
  v_query := 'SELECT COUNT(*)::INTEGER FROM leads WHERE tenant_id = $1';

  IF p_filters ? 'pipeline_stage_ids' AND jsonb_array_length(p_filters->'pipeline_stage_ids') > 0 THEN
    v_query := v_query || ' AND pipeline_stage_id IN (SELECT jsonb_array_elements_text($2->''pipeline_stage_ids'')::UUID)';
  END IF;
  IF p_filters ? 'sales_stages' AND jsonb_array_length(p_filters->'sales_stages') > 0 THEN
    v_query := v_query || ' AND sales_stage IN (SELECT jsonb_array_elements_text($2->''sales_stages''))';
  END IF;
  IF p_filters ? 'created_after' THEN
    v_query := v_query || ' AND created_at >= ($2->>''created_after'')::TIMESTAMPTZ';
  END IF;
  IF p_filters ? 'created_before' THEN
    v_query := v_query || ' AND created_at <= ($2->>''created_before'')::TIMESTAMPTZ';
  END IF;
  IF p_filters ? 'last_interaction_after' THEN
    v_query := v_query || ' AND last_interaction_at >= ($2->>''last_interaction_after'')::TIMESTAMPTZ';
  END IF;
  IF p_filters ? 'last_interaction_before' THEN
    v_query := v_query || ' AND last_interaction_at <= ($2->>''last_interaction_before'')::TIMESTAMPTZ';
  END IF;
  IF p_filters ? 'capital_min' THEN
    v_query := v_query || ' AND (metadata->>''capital_disponivel'')::NUMERIC >= ($2->>''capital_min'')::NUMERIC';
  END IF;
  IF p_filters ? 'capital_max' THEN
    v_query := v_query || ' AND (metadata->>''capital_disponivel'')::NUMERIC <= ($2->>''capital_max'')::NUMERIC';
  END IF;
  IF p_filters ? 'cities' AND jsonb_array_length(p_filters->'cities') > 0 THEN
    v_query := v_query || ' AND city_name IN (SELECT jsonb_array_elements_text($2->''cities''))';
  END IF;
  IF p_filters ? 'states' AND jsonb_array_length(p_filters->'states') > 0 THEN
    v_query := v_query || ' AND state IN (SELECT jsonb_array_elements_text($2->''states''))';
  END IF;
  IF p_filters ? 'utm_sources' AND jsonb_array_length(p_filters->'utm_sources') > 0 THEN
    v_query := v_query || ' AND utm_source IN (SELECT jsonb_array_elements_text($2->''utm_sources''))';
  END IF;
  IF p_filters ? 'utm_campaigns' AND jsonb_array_length(p_filters->'utm_campaigns') > 0 THEN
    v_query := v_query || ' AND utm_campaign IN (SELECT jsonb_array_elements_text($2->''utm_campaigns''))';
  END IF;
  IF p_filters ? 'score_min' THEN
    v_query := v_query || ' AND sales_score >= ($2->>''score_min'')::NUMERIC';
  END IF;
  IF p_filters ? 'score_max' THEN
    v_query := v_query || ' AND sales_score <= ($2->>''score_max'')::NUMERIC';
  END IF;
  IF p_filters ? 'sales_rep_ids' AND jsonb_array_length(p_filters->'sales_rep_ids') > 0 THEN
    v_query := v_query || ' AND sales_rep_id IN (SELECT jsonb_array_elements_text($2->''sales_rep_ids'')::UUID)';
  END IF;
  IF p_filters ? 'no_sales_rep' AND (p_filters->>'no_sales_rep')::BOOLEAN THEN
    v_query := v_query || ' AND sales_rep_id IS NULL';
  END IF;

  -- BANT (legado)
  IF p_filters ? 'bant_budget' AND (p_filters->>'bant_budget')::BOOLEAN THEN
    v_query := v_query || ' AND bant_budget = true';
  END IF;
  IF p_filters ? 'bant_authority' AND (p_filters->>'bant_authority')::BOOLEAN THEN
    v_query := v_query || ' AND bant_authority = true';
  END IF;
  IF p_filters ? 'bant_need' AND (p_filters->>'bant_need')::BOOLEAN THEN
    v_query := v_query || ' AND bant_need = true';
  END IF;
  IF p_filters ? 'bant_timeline' AND (p_filters->>'bant_timeline')::BOOLEAN THEN
    v_query := v_query || ' AND bant_timeline = true';
  END IF;

  -- Qualificação automotiva (intenção de compra)
  IF p_filters ? 'intent_trade_in' AND (p_filters->>'intent_trade_in')::BOOLEAN THEN
    v_query := v_query || ' AND intent_trade_in = true';
  END IF;
  IF p_filters ? 'intent_cash' AND (p_filters->>'intent_cash')::BOOLEAN THEN
    v_query := v_query || ' AND intent_cash = true';
  END IF;
  IF p_filters ? 'intent_finance_no_entry' AND (p_filters->>'intent_finance_no_entry')::BOOLEAN THEN
    v_query := v_query || ' AND intent_finance_no_entry = true';
  END IF;
  IF p_filters ? 'intent_buy_only' AND (p_filters->>'intent_buy_only')::BOOLEAN THEN
    v_query := v_query || ' AND intent_buy_only = true';
  END IF;

  v_query := v_query || ' AND phone IS NOT NULL AND phone != ''''';

  IF p_filters ? 'exclude_campaign_days' THEN
    v_query := v_query || ' AND id NOT IN (
      SELECT cl.lead_id FROM campaign_leads cl
      JOIN campaigns c ON c.id = cl.campaign_id
      WHERE cl.status NOT IN (''skipped'',''failed'')
      AND cl.created_at >= now() - (($2->>''exclude_campaign_days'')::INTEGER || '' days'')::INTERVAL
    )';
  END IF;

  EXECUTE v_query INTO v_count USING p_tenant_id, p_filters;
  RETURN COALESCE(v_count, 0);
END;
$function$;
