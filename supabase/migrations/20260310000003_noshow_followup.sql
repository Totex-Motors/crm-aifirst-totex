-- Extensoes necessarias pro cron (idempotente)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Tabela de follow-ups automáticos para leads no-show
CREATE TABLE IF NOT EXISTS noshow_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id),
  deal_id UUID REFERENCES deals(id),
  attempt_number INTEGER NOT NULL DEFAULT 1,
  message_sent TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_noshow_followups_lead ON noshow_followups(lead_id, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_noshow_followups_status ON noshow_followups(status);

-- Cron: disparar follow-up de no-show seg-sex às 9:30 BRT (12:30 UTC).
-- URL lida de config (preenchida no setup). Edge function deve ser deployada com --no-verify-jwt.
DO $$ BEGIN
  PERFORM cron.unschedule('noshow-followup') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname='noshow-followup');
EXCEPTION WHEN OTHERS THEN NULL; END $$;

SELECT cron.schedule(
  'noshow-followup',
  '30 12 * * 1-5',
  $$
  SELECT net.http_post(
    url := (SELECT value FROM config WHERE key='SUPABASE_PROJECT_URL') || '/functions/v1/process-noshow-followup',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := '{}'::jsonb
  );
  $$
);
