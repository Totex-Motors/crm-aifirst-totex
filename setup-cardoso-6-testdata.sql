-- =====================================================
-- Grupo Cardoso — 5 Leads de teste pra ver o pipeline funcionando
-- =====================================================
-- Pode deletar tudo depois com: DELETE FROM leads WHERE source = '[TEST]';
-- =====================================================

DO $$
DECLARE
  v_pv          uuid;
  v_pp          uuid;
  v_pv_novo     uuid;
  v_pv_qual     uuid;
  v_pv_td_agd   uuid;
  v_pp_novo     uuid;
  v_pp_qual     uuid;
  v_pp_showroom uuid;
  v_marcos      uuid;
  v_sdr1        uuid;
  v_vend_pv1    uuid;
  v_vend_pp1    uuid;
  v_lead1 uuid := gen_random_uuid();
  v_lead2 uuid := gen_random_uuid();
  v_lead3 uuid := gen_random_uuid();
  v_lead4 uuid := gen_random_uuid();
  v_lead5 uuid := gen_random_uuid();
BEGIN
  SELECT id INTO v_pv FROM sales_pipelines WHERE name = 'Cardoso Veiculos';
  SELECT id INTO v_pp FROM sales_pipelines WHERE name = 'Cardoso Prime';
  SELECT id INTO v_pv_novo     FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Novo Lead';
  SELECT id INTO v_pv_qual     FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Qualificado';
  SELECT id INTO v_pv_td_agd   FROM sales_pipeline_stages WHERE pipeline_id = v_pv AND name = 'Test Drive Agendado';
  SELECT id INTO v_pp_novo     FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Novo Lead';
  SELECT id INTO v_pp_qual     FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Qualificado';
  SELECT id INTO v_pp_showroom FROM sales_pipeline_stages WHERE pipeline_id = v_pp AND name = 'Agendamento Showroom';

  SELECT id INTO v_marcos    FROM team_members WHERE email = 'marcovend@gmail.com';
  SELECT id INTO v_sdr1      FROM team_members WHERE email = 'sdr1@cardosogrupo.com.br';
  SELECT id INTO v_vend_pv1  FROM team_members WHERE email = 'vendedor.veiculos1@cardosogrupo.com.br';
  SELECT id INTO v_vend_pp1  FROM team_members WHERE email = 'vendedor.prime1@cardosogrupo.com.br';

  -- LEAD 1: Veiculos / Novo Lead (acabou de chegar)
  INSERT INTO leads (id, name, email, phone, sales_rep_id, sales_stage, sales_score, pipeline_stage_id, source)
  VALUES (v_lead1, 'Joao Silva',  'joao.silva@gmail.com',   '11987654321', v_sdr1,     'new',         45, v_pv_novo,   '[TEST] WhatsApp');

  INSERT INTO deals (lead_id, title, status, pipeline_id, pipeline_stage_id, sales_rep_id, product_id)
  VALUES (v_lead1, 'Joao Silva - HB20', 'open', v_pv, v_pv_novo, v_sdr1, 'cv-popular-seminovo');

  -- LEAD 2: Veiculos / Qualificado (BANT validado)
  INSERT INTO leads (id, name, email, phone, sales_rep_id, sales_stage, sales_score, pipeline_stage_id, source)
  VALUES (v_lead2, 'Maria Santos','maria.s@gmail.com',     '11988887777', v_vend_pv1, 'qualified',   75, v_pv_qual,   '[TEST] Site');

  INSERT INTO deals (lead_id, title, status, pipeline_id, pipeline_stage_id, sales_rep_id, product_id)
  VALUES (v_lead2, 'Maria Santos - Corolla', 'open', v_pv, v_pv_qual, v_vend_pv1, 'cv-medio-seminovo');

  -- LEAD 3: Veiculos / Test Drive Agendado
  INSERT INTO leads (id, name, email, phone, sales_rep_id, sales_stage, sales_score, pipeline_stage_id, source)
  VALUES (v_lead3, 'Pedro Costa', 'pedrocosta@gmail.com',  '11999998888', v_vend_pv1, 'meeting',     85, v_pv_td_agd, '[TEST] Indicacao');

  INSERT INTO deals (lead_id, title, status, pipeline_id, pipeline_stage_id, sales_rep_id, product_id)
  VALUES (v_lead3, 'Pedro Costa - Tracker 0KM', 'open', v_pv, v_pv_td_agd, v_vend_pv1, 'cv-medio-0km');

  -- LEAD 4: Prime / Novo Lead (premium)
  INSERT INTO leads (id, name, email, phone, sales_rep_id, sales_stage, sales_score, pipeline_stage_id, source)
  VALUES (v_lead4, 'Ricardo Almeida','ricardo.a@empresa.com.br','11955554444', v_sdr1, 'new',         60, v_pp_novo,   '[TEST] Indicacao');

  INSERT INTO deals (lead_id, title, status, pipeline_id, pipeline_stage_id, sales_rep_id, product_id)
  VALUES (v_lead4, 'Ricardo Almeida - BMW X5', 'open', v_pp, v_pp_novo, v_sdr1, 'cp-luxo-seminovo');

  -- LEAD 5: Prime / Qualificado (super luxo)
  INSERT INTO leads (id, name, email, phone, sales_rep_id, sales_stage, sales_score, pipeline_stage_id, source)
  VALUES (v_lead5, 'Camila Ribeiro','camila.r@gmail.com',  '11944443333', v_vend_pp1, 'qualified',   90, v_pp_qual,   '[TEST] Showroom');

  INSERT INTO deals (lead_id, title, status, pipeline_id, pipeline_stage_id, sales_rep_id, product_id)
  VALUES (v_lead5, 'Camila Ribeiro - Porsche Cayenne', 'open', v_pp, v_pp_qual, v_vend_pp1, 'cp-super-luxo');
END $$;

-- Confirma
SELECT 'Leads totais' AS metric, COUNT(*) AS qtd FROM leads
UNION ALL
SELECT 'Deals abertos', COUNT(*) FROM deals WHERE status = 'open'
UNION ALL
SELECT 'Deals em Cardoso Veiculos', COUNT(*) FROM deals d JOIN sales_pipelines p ON d.pipeline_id = p.id WHERE p.name = 'Cardoso Veiculos'
UNION ALL
SELECT 'Deals em Cardoso Prime', COUNT(*) FROM deals d JOIN sales_pipelines p ON d.pipeline_id = p.id WHERE p.name = 'Cardoso Prime';
