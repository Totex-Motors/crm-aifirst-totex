ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS external_id text,
  ADD COLUMN IF NOT EXISTS negotiation_type text,
  ADD COLUMN IF NOT EXISTS vehicle_of_interest jsonb,
  ADD COLUMN IF NOT EXISTS evaluated_vehicles jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS lost_reason text;

CREATE INDEX IF NOT EXISTS leads_external_id_idx ON public.leads (external_id)
  WHERE external_id IS NOT NULL;

COMMENT ON COLUMN public.leads.external_id IS 'ID do lead na plataforma de origem (ex: AutoConf lead_id). Usado para deduplicação.';
COMMENT ON COLUMN public.leads.vehicle_of_interest IS 'Veículo de interesse do lead (JSON do AutoConf interested_in_vehicle).';
COMMENT ON COLUMN public.leads.evaluated_vehicles IS 'Veículos avaliados para troca (JSON do AutoConf evaluated_vehicles[]).';
COMMENT ON COLUMN public.leads.lost_reason IS 'Motivo da perda do lead (AutoConf insucesso.reason).';
