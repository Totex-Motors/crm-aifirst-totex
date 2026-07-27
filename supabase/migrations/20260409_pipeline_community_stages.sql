-- ============================================================================
-- Pipeline Webinário: novas etapas no início pra rastrear entrada na comunidade.
-- Vincula campanhas de distribuição (wa_community_campaigns) a webinários.
--
-- OBS (jul/2026): o subsistema de Webinário foi removido do template automotivo
-- (ver 20260727120000_drop_webinar_pipeline). Esta migration foi tornada
-- defensiva: só roda se a tabela webinar_config existir. Em setup do zero (sem
-- webinário) ela vira no-op; na base onde já foi aplicada, nada muda.
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'webinar_config'
  ) THEN
    RETURN;
  END IF;

  -- 1) Vincula campanha de distribuição → webinário
  ALTER TABLE wa_community_campaigns
    ADD COLUMN IF NOT EXISTS webinar_config_id UUID
    REFERENCES webinar_config(id) ON DELETE SET NULL;

  -- 2) Renomeia 'Novo' → 'Lead capturado' no pipeline Webinário
  UPDATE sales_pipeline_stages
  SET name = 'Lead capturado'
  WHERE pipeline_id = (SELECT id FROM sales_pipelines WHERE name = 'Webinário')
    AND name = 'Novo';

  -- 3) Desloca todas as etapas position >= 2 em +2 pra abrir espaço
  UPDATE sales_pipeline_stages
  SET position = position + 2
  WHERE pipeline_id = (SELECT id FROM sales_pipelines WHERE name = 'Webinário')
    AND position >= 2;

  -- 4) Insere as duas etapas novas (verde = entrou, laranja = não entrou)
  INSERT INTO sales_pipeline_stages (pipeline_id, name, position, color, is_won, is_lost)
  SELECT p.id, v.name, v.position, v.color, false, false
  FROM sales_pipelines p
  CROSS JOIN (VALUES
    ('Entrou na comunidade', 2, '#10B981'),
    ('Não entrou na comunidade', 3, '#F97316')
  ) AS v(name, position, color)
  WHERE p.name = 'Webinário';
END $$;
