-- =============================================================================
-- Function Hardening — resolve ~220 warnings do Supabase Advisor
-- =============================================================================
-- A) SET search_path em funcs do public (excluindo as que vêm de extensões)
-- B) REVOKE EXECUTE FROM anon em SECURITY DEFINER (excluindo extensões)
-- C) REVOKE EXECUTE FROM authenticated em TRIGGERS + helpers internos
-- =============================================================================

-- A) search_path imutável em todas as funções "do projeto" (não-extensão)
DO $$
DECLARE
  f record;
BEGIN
  FOR f IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prokind = 'f'
      AND NOT EXISTS (
        SELECT 1 FROM pg_depend d
        WHERE d.objid = p.oid AND d.deptype = 'e'
      )
  LOOP
    EXECUTE format('ALTER FUNCTION %s SET search_path = public, pg_catalog', f.sig);
  END LOOP;
END $$;

-- B) REVOKE EXECUTE FROM anon em SECURITY DEFINER (não-extensão)
DO $$
DECLARE
  f record;
BEGIN
  FOR f IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prosecdef = true
      AND p.prokind = 'f'
      AND NOT EXISTS (
        SELECT 1 FROM pg_depend d
        WHERE d.objid = p.oid AND d.deptype = 'e'
      )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon', f.sig);
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC', f.sig);
  END LOOP;
END $$;

-- C1) REVOKE EXECUTE FROM authenticated em TRIGGERS
REVOKE EXECUTE ON FUNCTION public.auto_clear_handled_on_new_message() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.create_lead_and_deal_from_pain_registration() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.enroll_lead_in_cadence() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.fn_config_audit() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_lead_from_deal() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_vehicle_sold_on_deal_insert() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_vehicle_sold_on_deal_won() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_auto_move_on_call() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_auto_move_on_task() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_auto_move_on_whatsapp_message() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_enqueue_for_ai_agent() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;

-- C2) REVOKE EXECUTE FROM authenticated em helpers internos
REVOKE EXECUTE ON FUNCTION public.enqueue_message_for_ai_agent(uuid, uuid, text, integer) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.process_ai_agent_queue() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.try_acquire_agent_lock(uuid, interval) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_ai_agent_event(uuid, text, text, text, uuid, uuid, jsonb) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.dispatch_meta_ads_sync() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.auto_move_deal_to_em_contato(uuid, uuid) FROM authenticated;
