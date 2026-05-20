-- =============================================================
-- Adicionar colunas de org/product/schedule em nps_responses
-- (no-op se tabela nps_responses nao existe — modulo NPS removido no template)
-- =============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'nps_responses'
  ) THEN
    ALTER TABLE nps_responses
      ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id),
      ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id);

    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'nps_survey_schedule'
    ) THEN
      ALTER TABLE nps_responses
        ADD COLUMN IF NOT EXISTS survey_schedule_id UUID REFERENCES nps_survey_schedule(id);
    END IF;

    CREATE INDEX IF NOT EXISTS idx_nps_responses_org ON nps_responses(organization_id, created_at DESC);
  END IF;
END $$;
