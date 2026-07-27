-- ============================================================================
-- Remove o subsistema de "Webinário" (resquício do template de infoproduto).
-- No nicho automotivo a concessionária não usa pipeline de webinário.
--
-- Remove:
--   - tabelas-stub vazias: lead_webinar_enrollments, event_registrations,
--     webinar_config (criadas por setup-cardoso-7-webinar-stubs.sql só pra
--     evitar 404 no PostgREST; o front que fazia JOIN foi removido)
--   - colunas webinar_config_id em leads e wa_community_campaigns
--     (adicionadas por 20260408000001 e 20260409)
--
-- NÃO remove a linha do pipeline "Webinário" em sales_pipelines nem deals
-- vinculados — isso é dado do cliente e deve ser feito pela UI, se desejado.
--
-- Idempotente: seguro re-aplicar.
-- ============================================================================

-- 1) Colunas que referenciam webinar_config (dropar FK + coluna)
ALTER TABLE IF EXISTS public.leads
  DROP CONSTRAINT IF EXISTS leads_webinar_config_id_fkey;
ALTER TABLE IF EXISTS public.leads
  DROP COLUMN IF EXISTS webinar_config_id;

ALTER TABLE IF EXISTS public.wa_community_campaigns
  DROP CONSTRAINT IF EXISTS wa_community_campaigns_webinar_config_id_fkey;
ALTER TABLE IF EXISTS public.wa_community_campaigns
  DROP COLUMN IF EXISTS webinar_config_id;

DROP INDEX IF EXISTS public.idx_leads_webinar_config;

-- 2) Tabelas-stub (dependentes primeiro; CASCADE cobre FKs remanescentes)
DROP TABLE IF EXISTS public.lead_webinar_enrollments CASCADE;
DROP TABLE IF EXISTS public.event_registrations CASCADE;
DROP TABLE IF EXISTS public.webinar_config CASCADE;

-- 3) Recarregar cache de schema do PostgREST
NOTIFY pgrst, 'reload schema';
