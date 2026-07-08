-- =====================================================
-- Qualificação automotiva (BANT do nicho de veículos) para o Agente de IA
-- =====================================================
-- 1. Garante as colunas de intenção no lead (fresh installs — na Cardoso já existem)
-- 2. Expõe os campos de qualificação automotiva no schema do tool `update_lead`
--    dos agentes já provisionados, pra o LLM conseguir passá-los.
-- Idempotente: pode rodar múltiplas vezes sem efeito colateral.
-- =====================================================

-- 1) Colunas de qualificação automotiva na tabela leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS intent_buy_only          boolean,
  ADD COLUMN IF NOT EXISTS intent_trade_in          boolean,
  ADD COLUMN IF NOT EXISTS intent_finance_no_entry  boolean,
  ADD COLUMN IF NOT EXISTS intent_cash              boolean,
  ADD COLUMN IF NOT EXISTS intent_sell              boolean,
  ADD COLUMN IF NOT EXISTS intent_special_search    boolean,
  ADD COLUMN IF NOT EXISTS negotiation_type         text,
  ADD COLUMN IF NOT EXISTS vehicle_of_interest      jsonb;

-- 2) Injeta os parâmetros automotivos no schema do tool `update_lead` já existente.
--    Merge por concat de jsonb — re-rodar só re-aplica as mesmas chaves.
UPDATE public.ai_agent_tools
SET parameters = jsonb_set(
      COALESCE(parameters, jsonb_build_object('type','object','properties','{}'::jsonb)),
      '{properties}',
      COALESCE(parameters->'properties', '{}'::jsonb) || jsonb_build_object(
        'intent_buy_only',         jsonb_build_object('type','boolean','description','Lead quer so comprar, sem carro na troca'),
        'intent_trade_in',         jsonb_build_object('type','boolean','description','Lead tem um carro pra dar de entrada/troca'),
        'intent_finance_no_entry', jsonb_build_object('type','boolean','description','Lead precisa financiar sem entrada'),
        'intent_cash',             jsonb_build_object('type','boolean','description','Lead vai pagar a vista'),
        'intent_sell',             jsonb_build_object('type','boolean','description','Lead so quer vender o carro, nao comprar'),
        'intent_special_search',   jsonb_build_object('type','boolean','description','Lead busca um modelo fora do estoque'),
        'negotiation_type',        jsonb_build_object('type','string','description','Como pretende negociar: troca, financiamento, a vista, consorcio'),
        'vehicle_of_interest',     jsonb_build_object('type','object','description','Veiculo que o lead quer, ex: {"make":"Toyota","model":"Corolla","year":2020}')
      )
    )
WHERE name = 'update_lead';
