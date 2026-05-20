-- =====================================================
-- Grupo Cardoso — Configuracao 4/4: Regras de Automacao
-- =====================================================
-- Move leads automaticamente no pipeline baseado em eventos.
-- Cada regra: 1 trigger -> 1 acao. Filtros por pipeline pra
-- nao misturar Veiculos e Prime.
-- =====================================================

DELETE FROM sales_automation_rules WHERE name LIKE 'Cardoso —%' OR name LIKE 'Cardoso -%';

-- IDs dos estagios pra cada pipeline (recupera dinamicamente)
DO $$
DECLARE
  -- Veiculos
  v_pv          uuid;
  v_pv_qual     uuid;
  v_pv_td_agd   uuid;
  v_pv_td_real  uuid;
  v_pv_perdido  uuid;
  -- Prime
  v_pp          uuid;
  v_pp_qual     uuid;
  v_pp_td_agd   uuid;
  v_pp_td_real  uuid;
  v_pp_perdido  uuid;
BEGIN
  SELECT id INTO v_pv FROM sales_pipelines WHERE name = 'Cardoso Veiculos';
  SELECT id INTO v_pv_qual    FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Qualificado';
  SELECT id INTO v_pv_td_agd  FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Test Drive Agendado';
  SELECT id INTO v_pv_td_real FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Test Drive Realizado';
  SELECT id INTO v_pv_perdido FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Perdido';

  SELECT id INTO v_pp FROM sales_pipelines WHERE name = 'Cardoso Prime';
  SELECT id INTO v_pp_qual    FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Qualificado';
  SELECT id INTO v_pp_td_agd  FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Test Drive Agendado';
  SELECT id INTO v_pp_td_real FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Test Drive Realizado';
  SELECT id INTO v_pp_perdido FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Perdido';

  -- =================== VEICULOS ===================

  INSERT INTO sales_automation_rules (name, description, trigger_type, trigger_conditions, action_type, action_config, priority) VALUES
  ('Cardoso - VEICULOS - Lead respondeu -> Qualificado',
   'Quando lead responde no WhatsApp e ainda esta em Novo Lead ou Tentando Contato, move pra Qualificado.',
   'lead_replied',
   jsonb_build_object('pipeline_id', v_pv::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pv_qual::text, 'only_if_position_less_than', 3),
   10),

  ('Cardoso - VEICULOS - Reuniao/Test Drive agendado -> Test Drive Agendado',
   'Quando uma reuniao/visita e marcada, move o deal pra etapa correta.',
   'meeting_scheduled',
   jsonb_build_object('pipeline_id', v_pv::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pv_td_agd::text, 'only_if_position_less_than', 4),
   10),

  ('Cardoso - VEICULOS - Test Drive realizado -> Test Drive Realizado',
   'Quando a reuniao termina como realizada, avanca o deal pra etapa pos visita.',
   'meeting_completed',
   jsonb_build_object('pipeline_id', v_pv::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pv_td_real::text, 'only_if_position_less_than', 5),
   10),

  ('Cardoso - VEICULOS - No-show -> Perdido (com followup ativo)',
   'Lead nao apareceu. Move pra perdido APENAS apos 3 tentativas falhas (cadencia faz tentativas antes).',
   'meeting_no_show',
   jsonb_build_object('pipeline_id', v_pv::text, 'after_attempts', 3),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pv_perdido::text),
   20);

  -- =================== PRIME ===================

  INSERT INTO sales_automation_rules (name, description, trigger_type, trigger_conditions, action_type, action_config, priority) VALUES
  ('Cardoso - PRIME - Lead respondeu -> Qualificado',
   'Lead Prime respondeu. Move pra Qualificado (pula pre-qualificacao se ja deu sinal claro).',
   'lead_replied',
   jsonb_build_object('pipeline_id', v_pp::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pp_qual::text, 'only_if_position_less_than', 4),
   10),

  ('Cardoso - PRIME - Visita Showroom agendada -> Test Drive Agendado',
   'Visita ao showroom marcada. Move o deal.',
   'meeting_scheduled',
   jsonb_build_object('pipeline_id', v_pp::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pp_td_agd::text, 'only_if_position_less_than', 7),
   10),

  ('Cardoso - PRIME - Test Drive realizado -> Test Drive Realizado',
   'Test drive do veiculo Prime realizado.',
   'meeting_completed',
   jsonb_build_object('pipeline_id', v_pp::text),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pp_td_real::text, 'only_if_position_less_than', 8),
   10),

  ('Cardoso - PRIME - No-show -> Perdido (apos 3 tentativas)',
   'Cliente Prime nao apareceu. Move pra perdido apos 3 tentativas de reagendamento.',
   'meeting_no_show',
   jsonb_build_object('pipeline_id', v_pp::text, 'after_attempts', 3),
   'move_deal_stage',
   jsonb_build_object('target_stage_id', v_pp_perdido::text),
   20);

END $$;

-- Confirma
SELECT
  CASE
    WHEN name LIKE '%VEICULOS%' THEN 'Cardoso Veiculos'
    WHEN name LIKE '%PRIME%' THEN 'Cardoso Prime'
  END AS pipeline,
  trigger_type,
  is_active
FROM sales_automation_rules
WHERE name LIKE 'Cardoso -%'
ORDER BY pipeline, trigger_type;
