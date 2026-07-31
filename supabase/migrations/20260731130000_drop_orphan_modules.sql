-- Remove tabelas órfãs de módulos que foram retirados do template (Eventos,
-- Customer Success parcial, Financeiro legado, Asaas, WhatsApp Communities).
--
-- Escopo auditado (2026-07-31): destas, foi confirmado que TODAS existem no
-- banco, têm ZERO referência no código vivo (src/ + supabase/functions) e estão
-- VAZIAS (0 linhas por table-stats). Por isso o drop é seguro e sem perda de dado.
--
-- O script avulso supabase/cleanup_unused_tables.sql listava muito mais tabelas,
-- mas parte delas está VIVA (transactions, email_automation_runs, email_templates,
-- cs_objectives, instagram_messages, etc) — NÃO entram aqui de propósito. Ver o
-- cabeçalho daquele script para o aviso.

BEGIN;

-- Customer Success (resíduo sem uso)
DROP TABLE IF EXISTS public.cs_interactions CASCADE;

-- NPS
DROP TABLE IF EXISTS public.nps_survey_schedule CASCADE;

-- Eventos / Event App
DROP TABLE IF EXISTS public.cs_events CASCADE;
DROP TABLE IF EXISTS public.cs_event_participant_sessions CASCADE;
DROP TABLE IF EXISTS public.cs_event_participant_profiles CASCADE;
DROP TABLE IF EXISTS public.cs_event_feed_posts CASCADE;
DROP TABLE IF EXISTS public.cs_event_feed_likes CASCADE;
DROP TABLE IF EXISTS public.cs_event_schedule_items CASCADE;
DROP TABLE IF EXISTS public.cs_event_schedule_bookmarks CASCADE;
DROP TABLE IF EXISTS public.cs_event_materials CASCADE;
DROP TABLE IF EXISTS public.cs_event_connections CASCADE;

-- Financeiro legado
DROP TABLE IF EXISTS public.financial_accounts CASCADE;
DROP TABLE IF EXISTS public.financial_categories CASCADE;
DROP TABLE IF EXISTS public.financial_entries CASCADE;

-- Asaas (cobranças)
DROP TABLE IF EXISTS public.asaas_customers CASCADE;
DROP TABLE IF EXISTS public.asaas_webhooks CASCADE;

-- WhatsApp Communities (NÃO confundir com cadências de follow-up do comercial:
-- wa_message_sequences / wa_sequence_steps / wa_sequence_enrollments — MANTIDAS)
DROP TABLE IF EXISTS public.wa_communities CASCADE;
DROP TABLE IF EXISTS public.wa_community_groups CASCADE;
DROP TABLE IF EXISTS public.wa_community_campaigns CASCADE;
DROP TABLE IF EXISTS public.wa_community_campaign_items CASCADE;

COMMIT;

NOTIFY pgrst, 'reload schema';
