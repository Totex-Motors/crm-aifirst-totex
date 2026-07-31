-- Round-robin atômico de atribuição de leads por instância de WhatsApp.
--
-- Motivação: o webhook da Cloud API atribuía `sales_rep_id` a leads novos via
-- leitura-depois-escrita no edge function (lê quem foi atribuído por último,
-- escolhe, depois insere). Sob mensagens simultâneas, duas invocações liam o
-- mesmo estado e escolhiam o mesmo vendedor — race condition que desbalanceia
-- a fila em volume de tráfego pago.
--
-- Solução: um cursor por instância incrementado atomicamente. O
-- `INSERT ... ON CONFLICT DO UPDATE ... RETURNING` pega row lock na linha do
-- cursor, serializando invocações concorrentes e devolvendo valores distintos e
-- monotônicos. Cada valor mapeia num índice diferente do pool em rotação.

-- ── Estado do cursor (uma linha por instância) ──
CREATE TABLE IF NOT EXISTS public.whatsapp_rr_cursor (
  instance_id uuid PRIMARY KEY,
  counter     bigint NOT NULL DEFAULT 0,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Tabela interna, acessada só pela RPC (SECURITY DEFINER) e pelo service role.
-- RLS habilitada sem policy = nega acesso direto de clientes authenticated.
ALTER TABLE public.whatsapp_rr_cursor ENABLE ROW LEVEL SECURITY;

-- ── Função de escolha atômica ──
CREATE OR REPLACE FUNCTION public.pick_round_robin_rep(p_instance_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_pool    uuid[];
  v_counter bigint;
  v_idx     int;
BEGIN
  IF p_instance_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Pool elegível: membros ativos vinculados à instância, exceto admin.
  -- SDRs têm prioridade; se não houver nenhum, usa qualquer vendedor vinculado.
  -- Ordenação estável por id para o round-robin ser determinístico.
  SELECT COALESCE(
    (SELECT array_agg(id ORDER BY id) FROM public.profiles
       WHERE whatsapp_instance_id = p_instance_id AND is_active AND role = 'sdr'),
    (SELECT array_agg(id ORDER BY id) FROM public.profiles
       WHERE whatsapp_instance_id = p_instance_id AND is_active AND role <> 'admin')
  ) INTO v_pool;

  IF v_pool IS NULL OR array_length(v_pool, 1) IS NULL THEN
    RETURN NULL;
  END IF;

  -- Incremento atômico: o row lock do UPSERT serializa chamadas concorrentes.
  INSERT INTO public.whatsapp_rr_cursor (instance_id, counter, updated_at)
    VALUES (p_instance_id, 1, now())
  ON CONFLICT (instance_id)
    DO UPDATE SET counter = public.whatsapp_rr_cursor.counter + 1, updated_at = now()
  RETURNING counter INTO v_counter;

  -- Mapeia o contador para índice do pool (array é 1-based).
  v_idx := ((v_counter - 1) % array_length(v_pool, 1)) + 1;
  RETURN v_pool[v_idx];
END;
$$;

GRANT EXECUTE ON FUNCTION public.pick_round_robin_rep(uuid) TO service_role, authenticated;
