CREATE OR REPLACE FUNCTION public.populate_campaign_leads(p_campaign_id uuid)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog
AS $_$
DECLARE
  v_filters JSONB;
  v_count INTEGER;
  v_query TEXT;
  v_tenant UUID := public.get_tenant_id();
BEGIN
  SELECT audience_filters INTO v_filters
  FROM campaigns WHERE id = p_campaign_id AND tenant_id = v_tenant;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Campaign % not found in tenant %', p_campaign_id, v_tenant;
  END IF;
  IF v_filters IS NULL THEN
    RAISE EXCEPTION 'Campaign has no audience_filters';
  END IF;

  IF v_filters ? 'lead_ids' AND jsonb_array_length(v_filters->'lead_ids') > 0 THEN
    INSERT INTO campaign_leads (tenant_id, campaign_id, lead_id, assigned_to)
    SELECT v_tenant, p_campaign_id, l.id, l.sales_rep_id
    FROM leads l
    WHERE l.tenant_id = v_tenant
      AND l.id::text IN (SELECT jsonb_array_elements_text(v_filters->'lead_ids'))
      AND l.phone IS NOT NULL AND l.phone != ''
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    UPDATE campaigns SET total_leads = v_count, audience_count = v_count, updated_at = now()
    WHERE id = p_campaign_id AND tenant_id = v_tenant;
    RETURN v_count;
  END IF;

  v_query := format('INSERT INTO campaign_leads (tenant_id, campaign_id, lead_id, assigned_to)
    SELECT %L::uuid, $2, l.id, l.sales_rep_id
    FROM leads l WHERE l.tenant_id = %L::uuid', v_tenant, v_tenant);

  IF v_filters ? 'pipeline_stage_ids' AND jsonb_array_length(v_filters->'pipeline_stage_ids') > 0 THEN
    v_query := v_query || ' AND l.pipeline_stage_id IN (SELECT jsonb_array_elements_text($1->''pipeline_stage_ids'')::UUID)';
  END IF;
  IF v_filters ? 'sales_stages' AND jsonb_array_length(v_filters->'sales_stages') > 0 THEN
    v_query := v_query || ' AND l.sales_stage IN (SELECT jsonb_array_elements_text($1->''sales_stages''))';
  END IF;
  IF v_filters ? 'created_after' THEN
    v_query := v_query || ' AND l.created_at >= ($1->>''created_after'')::TIMESTAMPTZ';
  END IF;
  IF v_filters ? 'created_before' THEN
    v_query := v_query || ' AND l.created_at <= ($1->>''created_before'')::TIMESTAMPTZ';
  END IF;
  IF v_filters ? 'last_interaction_after' THEN
    v_query := v_query || ' AND l.last_interaction_at >= ($1->>''last_interaction_after'')::TIMESTAMPTZ';
  END IF;
  IF v_filters ? 'last_interaction_before' THEN
    v_query := v_query || ' AND l.last_interaction_at <= ($1->>''last_interaction_before'')::TIMESTAMPTZ';
  END IF;
  IF v_filters ? 'capital_min' THEN
    v_query := v_query || ' AND (l.metadata->>''capital_disponivel'')::NUMERIC >= ($1->>''capital_min'')::NUMERIC';
  END IF;
  IF v_filters ? 'capital_max' THEN
    v_query := v_query || ' AND (l.metadata->>''capital_disponivel'')::NUMERIC <= ($1->>''capital_max'')::NUMERIC';
  END IF;
  IF v_filters ? 'cities' AND jsonb_array_length(v_filters->'cities') > 0 THEN
    v_query := v_query || ' AND l.city_name IN (SELECT jsonb_array_elements_text($1->''cities''))';
  END IF;
  IF v_filters ? 'states' AND jsonb_array_length(v_filters->'states') > 0 THEN
    v_query := v_query || ' AND l.state IN (SELECT jsonb_array_elements_text($1->''states''))';
  END IF;
  IF v_filters ? 'utm_sources' AND jsonb_array_length(v_filters->'utm_sources') > 0 THEN
    v_query := v_query || ' AND l.utm_source IN (SELECT jsonb_array_elements_text($1->''utm_sources''))';
  END IF;
  IF v_filters ? 'utm_campaigns' AND jsonb_array_length(v_filters->'utm_campaigns') > 0 THEN
    v_query := v_query || ' AND l.utm_campaign IN (SELECT jsonb_array_elements_text($1->''utm_campaigns''))';
  END IF;
  IF v_filters ? 'score_min' THEN
    v_query := v_query || ' AND l.sales_score >= ($1->>''score_min'')::NUMERIC';
  END IF;
  IF v_filters ? 'score_max' THEN
    v_query := v_query || ' AND l.sales_score <= ($1->>''score_max'')::NUMERIC';
  END IF;
  IF v_filters ? 'sales_rep_ids' AND jsonb_array_length(v_filters->'sales_rep_ids') > 0 THEN
    v_query := v_query || ' AND l.sales_rep_id IN (SELECT jsonb_array_elements_text($1->''sales_rep_ids'')::UUID)';
  END IF;
  IF v_filters ? 'no_sales_rep' AND (v_filters->>'no_sales_rep')::BOOLEAN THEN
    v_query := v_query || ' AND l.sales_rep_id IS NULL';
  END IF;
  IF v_filters ? 'bant_budget' AND (v_filters->>'bant_budget')::BOOLEAN THEN
    v_query := v_query || ' AND l.bant_budget = true';
  END IF;
  IF v_filters ? 'bant_authority' AND (v_filters->>'bant_authority')::BOOLEAN THEN
    v_query := v_query || ' AND l.bant_authority = true';
  END IF;
  IF v_filters ? 'bant_need' AND (v_filters->>'bant_need')::BOOLEAN THEN
    v_query := v_query || ' AND l.bant_need = true';
  END IF;
  IF v_filters ? 'bant_timeline' AND (v_filters->>'bant_timeline')::BOOLEAN THEN
    v_query := v_query || ' AND l.bant_timeline = true';
  END IF;

  v_query := v_query || ' AND l.phone IS NOT NULL AND l.phone != ''''';

  IF v_filters ? 'exclude_campaign_days' THEN
    v_query := v_query || format(' AND l.id NOT IN (
      SELECT cl.lead_id FROM campaign_leads cl
      JOIN campaigns c ON c.id = cl.campaign_id
      WHERE cl.tenant_id = %L::uuid
        AND cl.status NOT IN (''skipped'',''failed'')
        AND cl.sent_at > now() - (($1->>''exclude_campaign_days'')::int || '' days'')::interval
    )', v_tenant);
  END IF;

  IF v_filters ? 'exclude_lead_ids' AND jsonb_array_length(v_filters->'exclude_lead_ids') > 0 THEN
    v_query := v_query || ' AND l.id::text NOT IN (SELECT jsonb_array_elements_text($1->''exclude_lead_ids''))';
  END IF;

  v_query := v_query || ' ON CONFLICT DO NOTHING';

  EXECUTE v_query USING v_filters, p_campaign_id;
  GET DIAGNOSTICS v_count = ROW_COUNT;

  UPDATE campaigns SET total_leads = v_count, audience_count = v_count, updated_at = now()
  WHERE id = p_campaign_id AND tenant_id = v_tenant;

  RETURN v_count;
END;
$_$;

GRANT EXECUTE ON FUNCTION public.populate_campaign_leads(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_campaign_audience_count(p_filters jsonb)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
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
    AND (NOT (p_filters ? 'bant_timeline' AND (p_filters->>'bant_timeline')::boolean) OR l.bant_timeline = true);

  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_campaign_audience_count(jsonb) TO authenticated;
