-- ============================================================================
-- Vincula leads ao webinário ativo no momento do cadastro.
-- (No template AI-First o modulo webinar_config foi removido — coluna adicionada
--  sem FK pra nao quebrar; FK e criada condicionalmente se a tabela existir.)
-- ============================================================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS webinar_config_id UUID;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'webinar_config'
  ) THEN
    BEGIN
      ALTER TABLE leads
        ADD CONSTRAINT leads_webinar_config_id_fkey
        FOREIGN KEY (webinar_config_id) REFERENCES webinar_config(id) ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_leads_webinar_config
  ON leads(webinar_config_id)
  WHERE webinar_config_id IS NOT NULL;

COMMENT ON COLUMN leads.webinar_config_id IS
  'Webinário ativo no momento do cadastro do lead. Setado pela edge function quiz-api.';
