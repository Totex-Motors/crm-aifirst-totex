CREATE OR REPLACE FUNCTION public.populate_email_campaign_leads(p_campaign_id uuid)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog AS $$
DECLARE
  v_count INT;
  v_filters JSONB;
  v_tenant UUID := public.get_tenant_id();
BEGIN
  SELECT audience_filters INTO v_filters FROM email_campaigns
  WHERE id = p_campaign_id AND tenant_id = v_tenant;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Campaign % not found in tenant %', p_campaign_id, v_tenant;
  END IF;
  IF v_filters IS NULL THEN v_filters := '{}'::jsonb; END IF;

  DELETE FROM email_campaign_leads
  WHERE campaign_id = p_campaign_id AND tenant_id = v_tenant AND status = 'pending';

  -- MODO 1: lista importada (uploaded_emails) — ignora todos os outros
  -- Insere emails direto sem precisar que estejam cadastrados como leads.
  IF v_filters ? 'uploaded_emails' AND jsonb_array_length(v_filters->'uploaded_emails') > 0 THEN
    INSERT INTO email_campaign_leads (tenant_id, campaign_id, lead_id, email)
    SELECT v_tenant, p_campaign_id, NULL::uuid, LOWER(TRIM(em.value))
    FROM jsonb_array_elements_text(v_filters->'uploaded_emails') em(value)
    WHERE em.value IS NOT NULL AND em.value != ''
      AND em.value ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
      AND NOT EXISTS (
        SELECT 1 FROM email_unsubscribes u
        WHERE u.email = LOWER(TRIM(em.value)) AND u.tenant_id = v_tenant
      )
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
  END IF;

  -- MODO 2: leads específicos
  IF v_filters ? 'lead_ids' AND jsonb_array_length(v_filters->'lead_ids') > 0 THEN
    INSERT INTO email_campaign_leads (tenant_id, campaign_id, lead_id, email)
    SELECT v_tenant, p_campaign_id, l.id, l.email FROM leads l
    WHERE l.tenant_id = v_tenant
      AND l.id::text IN (SELECT jsonb_array_elements_text(v_filters->'lead_ids'))
      AND l.email IS NOT NULL AND l.email != ''
      AND (l.email_opted_out IS NULL OR l.email_opted_out = false)
      AND NOT EXISTS (SELECT 1 FROM email_unsubscribes u WHERE u.email = l.email AND u.tenant_id = v_tenant)
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
  END IF;

  -- MODO 3: filtros (padrão)
  INSERT INTO email_campaign_leads (tenant_id, campaign_id, lead_id, email)
  SELECT v_tenant, p_campaign_id, l.id, l.email FROM leads l
  WHERE l.tenant_id = v_tenant
    AND l.email IS NOT NULL AND l.email != ''
    AND (l.email_opted_out IS NULL OR l.email_opted_out = false)
    AND NOT EXISTS (SELECT 1 FROM email_unsubscribes u WHERE u.email = l.email AND u.tenant_id = v_tenant)
    AND (v_filters->'pipeline_stage_ids' IS NULL OR jsonb_array_length(v_filters->'pipeline_stage_ids') = 0
         OR l.pipeline_stage_id::text IN (SELECT jsonb_array_elements_text(v_filters->'pipeline_stage_ids')))
    AND (v_filters->'states' IS NULL OR jsonb_array_length(v_filters->'states') = 0
         OR l.state IN (SELECT jsonb_array_elements_text(v_filters->'states')))
    AND (v_filters->'cities' IS NULL OR jsonb_array_length(v_filters->'cities') = 0
         OR l.city_name IN (SELECT jsonb_array_elements_text(v_filters->'cities')))
    AND (v_filters->'utm_sources' IS NULL OR jsonb_array_length(v_filters->'utm_sources') = 0
         OR l.utm_source IN (SELECT jsonb_array_elements_text(v_filters->'utm_sources')))
    AND ((v_filters->>'score_min') IS NULL OR l.sales_score >= (v_filters->>'score_min')::int)
    AND ((v_filters->>'score_max') IS NULL OR l.sales_score <= (v_filters->>'score_max')::int)
    AND ((v_filters->>'created_after') IS NULL OR l.created_at >= (v_filters->>'created_after')::timestamptz)
    AND ((v_filters->>'created_before') IS NULL OR l.created_at <= (v_filters->>'created_before')::timestamptz)
    AND (v_filters->'sales_rep_ids' IS NULL OR jsonb_array_length(v_filters->'sales_rep_ids') = 0
         OR l.sales_rep_id::text IN (SELECT jsonb_array_elements_text(v_filters->'sales_rep_ids')))
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END $$;

GRANT EXECUTE ON FUNCTION public.populate_email_campaign_leads(uuid) TO authenticated;

-- Idem pra count
CREATE OR REPLACE FUNCTION public.get_email_audience_count(p_filters jsonb DEFAULT '{}'::jsonb)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog AS $$
DECLARE
  v_count INT;
  v_tenant UUID := public.get_tenant_id();
BEGIN
  -- Modo lista importada: conta direto (deduplicado + valida formato + remove unsubscribed)
  IF p_filters ? 'uploaded_emails' AND jsonb_array_length(p_filters->'uploaded_emails') > 0 THEN
    SELECT count(DISTINCT LOWER(TRIM(em.value))) INTO v_count
    FROM jsonb_array_elements_text(p_filters->'uploaded_emails') em(value)
    WHERE em.value IS NOT NULL AND em.value != ''
      AND em.value ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
      AND NOT EXISTS (
        SELECT 1 FROM email_unsubscribes u
        WHERE u.email = LOWER(TRIM(em.value)) AND u.tenant_id = v_tenant
      );
    RETURN v_count;
  END IF;

  IF p_filters ? 'lead_ids' AND jsonb_array_length(p_filters->'lead_ids') > 0 THEN
    SELECT count(*) INTO v_count FROM leads l
    WHERE l.tenant_id = v_tenant
      AND l.id::text IN (SELECT jsonb_array_elements_text(p_filters->'lead_ids'))
      AND l.email IS NOT NULL AND l.email != ''
      AND (l.email_opted_out IS NULL OR l.email_opted_out = false)
      AND NOT EXISTS (SELECT 1 FROM email_unsubscribes u WHERE u.email = l.email AND u.tenant_id = v_tenant);
    RETURN v_count;
  END IF;

  SELECT count(*) INTO v_count FROM leads l
  WHERE l.tenant_id = v_tenant
    AND l.email IS NOT NULL AND l.email != ''
    AND (l.email_opted_out IS NULL OR l.email_opted_out = false)
    AND NOT EXISTS (SELECT 1 FROM email_unsubscribes u WHERE u.email = l.email AND u.tenant_id = v_tenant)
    AND (p_filters->'pipeline_stage_ids' IS NULL OR jsonb_array_length(p_filters->'pipeline_stage_ids') = 0
         OR l.pipeline_stage_id::text IN (SELECT jsonb_array_elements_text(p_filters->'pipeline_stage_ids')))
    AND (p_filters->'states' IS NULL OR jsonb_array_length(p_filters->'states') = 0
         OR l.state IN (SELECT jsonb_array_elements_text(p_filters->'states')))
    AND (p_filters->'cities' IS NULL OR jsonb_array_length(p_filters->'cities') = 0
         OR l.city_name IN (SELECT jsonb_array_elements_text(p_filters->'cities')))
    AND (p_filters->'utm_sources' IS NULL OR jsonb_array_length(p_filters->'utm_sources') = 0
         OR l.utm_source IN (SELECT jsonb_array_elements_text(p_filters->'utm_sources')))
    AND ((p_filters->>'score_min') IS NULL OR l.sales_score >= (p_filters->>'score_min')::int)
    AND ((p_filters->>'score_max') IS NULL OR l.sales_score <= (p_filters->>'score_max')::int)
    AND ((p_filters->>'created_after') IS NULL OR l.created_at >= (p_filters->>'created_after')::timestamptz)
    AND ((p_filters->>'created_before') IS NULL OR l.created_at <= (p_filters->>'created_before')::timestamptz)
    AND (p_filters->'sales_rep_ids' IS NULL OR jsonb_array_length(p_filters->'sales_rep_ids') = 0
         OR l.sales_rep_id::text IN (SELECT jsonb_array_elements_text(p_filters->'sales_rep_ids')));

  RETURN v_count;
END $$;

GRANT EXECUTE ON FUNCTION public.get_email_audience_count(jsonb) TO authenticated;
