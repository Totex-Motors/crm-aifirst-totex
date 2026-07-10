-- =====================================================
-- Filtros de qualificação automotiva no Inbox
-- =====================================================
-- Adiciona os campos de intenção de compra (veículo de interesse, troca, forma de
-- pagamento) ao retorno da RPC do inbox, pra substituir os filtros B2B
-- (faturamento/empresa/funcionários) por filtros do nicho de veículos.
-- Recria só a overload de 14 parâmetros (a que o frontend chama).
-- =====================================================

DROP FUNCTION IF EXISTS public.get_cs_inbox_with_metrics(
  uuid, integer, text, text, text, boolean, text, text, boolean, boolean,
  text, uuid, uuid, text
);

CREATE OR REPLACE FUNCTION public.get_cs_inbox_with_metrics(
  p_instance_id uuid DEFAULT NULL::uuid, p_limit integer DEFAULT 50,
  p_product_filter text DEFAULT NULL::text, p_health_filter text DEFAULT NULL::text,
  p_sla_filter text DEFAULT NULL::text, p_only_pending boolean DEFAULT false,
  p_search text DEFAULT NULL::text, p_sort_mode text DEFAULT 'recent'::text,
  p_hide_handled boolean DEFAULT false, p_only_with_tasks boolean DEFAULT false,
  p_funnel_filter text DEFAULT NULL::text, p_pipeline_id uuid DEFAULT NULL::uuid,
  p_stage_id uuid DEFAULT NULL::uuid, p_team_filter text DEFAULT NULL::text
)
 RETURNS TABLE(
   conversation_id text, conversation_type text, lead_id uuid, group_id uuid,
   contact_phone text, conversation_name text, last_message text, last_message_at timestamp with time zone,
   last_sender_name text, is_from_me boolean, unread_count bigint, organization_id uuid,
   organization_name text, health_status text, health_score integer, instance_id uuid,
   instance_name text, lead_photo_url text, lead_products text[], pending_reply boolean,
   wait_minutes integer, sla_status text, assigned_agent_id uuid, assigned_agent_name text,
   is_handled boolean, handled_at timestamp with time zone, handled_reason text,
   pending_tasks_count integer, lead_company_name text, lead_job_title text,
   lead_vehicle_of_interest jsonb, lead_negotiation_type text,
   lead_intent_trade_in boolean, lead_intent_cash boolean, lead_intent_finance_no_entry boolean
 )
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$
BEGIN
  RETURN QUERY
  WITH conversations AS (
    SELECT DISTINCT ON (CASE WHEN m.group_id IS NOT NULL THEN m.group_id::TEXT ELSE m.lead_id::TEXT END)
      CASE WHEN m.group_id IS NOT NULL THEN m.group_id::TEXT ELSE m.lead_id::TEXT END AS conv_id,
      CASE WHEN m.group_id IS NOT NULL THEN 'grupo' ELSE 'individual' END AS conv_type,
      CASE WHEN m.group_id IS NULL THEN m.lead_id ELSE NULL END AS m_lead_id,
      m.group_id AS m_group_id,
      CASE WHEN m.group_id IS NOT NULL THEN m.sender_phone ELSE COALESCE(l.phone, m.sender_phone) END AS m_contact_phone,
      COALESCE(g.name, l.name, m.sender_name) AS conv_name,
      m.content AS last_msg, m.created_at AS last_msg_at, m.sender_name AS last_sender,
      m.is_from_me AS m_is_from_me, 0::BIGINT AS unread,
      NULL::uuid AS m_org_id, NULL::text AS org_name,
      m.instance_id AS m_instance_id, wi.name AS inst_name,
      l.photo_url AS photo_url, ARRAY[]::TEXT[] AS products,
      (NOT m.is_from_me) AS pending,
      GREATEST(0, EXTRACT(EPOCH FROM (NOW() - m.created_at))::INTEGER / 60) AS wait_mins,
      false AS m_is_handled, NULL::timestamptz AS m_handled_at, NULL::text AS m_handled_reason,
      0 AS m_pending_tasks, l.company_name AS m_company_name, l.job_title AS m_job_title,
      l.vehicle_of_interest AS m_vehicle_interest, l.negotiation_type AS m_negotiation_type,
      l.intent_trade_in AS m_intent_trade_in, l.intent_cash AS m_intent_cash,
      l.intent_finance_no_entry AS m_intent_finance
    FROM whatsapp_messages m
    LEFT JOIN leads l ON m.lead_id = l.id
    LEFT JOIN whatsapp_groups g ON m.group_id = g.id
    LEFT JOIN whatsapp_instances wi ON m.instance_id = wi.id
    WHERE (p_instance_id IS NULL OR m.instance_id = p_instance_id)
      AND (p_search IS NULL OR LENGTH(p_search) < 3
           OR COALESCE(g.name, l.name, m.sender_name) ILIKE '%' || p_search || '%'
           OR m.sender_phone ILIKE '%' || p_search || '%'
           OR l.phone ILIKE '%' || p_search || '%'
           OR l.company_name ILIKE '%' || p_search || '%')
    ORDER BY CASE WHEN m.group_id IS NOT NULL THEN m.group_id::TEXT ELSE m.lead_id::TEXT END, m.created_at DESC
  ),
  filtered AS (
    SELECT c.*, 'unknown' AS final_health_status, NULL::INTEGER AS final_health_score,
      CASE WHEN c.pending AND c.wait_mins > 120 THEN 'critical'
           WHEN c.pending AND c.wait_mins > 30 THEN 'warning'
           ELSE 'ok' END AS final_sla_status
    FROM conversations c
    WHERE (p_sla_filter IS NULL OR
           (p_sla_filter = 'critical' AND c.pending AND c.wait_mins > 120) OR
           (p_sla_filter = 'warning' AND c.pending AND c.wait_mins > 30 AND c.wait_mins <= 120) OR
           (p_sla_filter = 'ok' AND (NOT c.pending OR c.wait_mins <= 30)))
      AND (NOT p_only_pending OR c.pending)
  )
  SELECT f.conv_id::TEXT, f.conv_type::TEXT, f.m_lead_id, f.m_group_id,
    f.m_contact_phone::TEXT, f.conv_name::TEXT, f.last_msg::TEXT, f.last_msg_at,
    f.last_sender::TEXT, f.m_is_from_me, f.unread, f.m_org_id, f.org_name,
    f.final_health_status::TEXT, f.final_health_score, f.m_instance_id, f.inst_name::TEXT,
    f.photo_url::TEXT, f.products, f.pending, f.wait_mins::INTEGER, f.final_sla_status::TEXT,
    NULL::UUID, NULL::TEXT, f.m_is_handled, f.m_handled_at, f.m_handled_reason,
    f.m_pending_tasks, f.m_company_name::TEXT, f.m_job_title::TEXT,
    f.m_vehicle_interest, f.m_negotiation_type::TEXT,
    f.m_intent_trade_in, f.m_intent_cash, f.m_intent_finance
  FROM filtered f
  ORDER BY CASE WHEN p_sort_mode = 'priority' THEN
    CASE WHEN f.pending AND NOT f.m_is_handled THEN 0 ELSE 1 END ELSE 0 END,
    CASE WHEN p_sort_mode = 'priority' THEN f.wait_mins ELSE 0 END DESC,
    f.last_msg_at DESC
  LIMIT p_limit;
END;
$function$;
