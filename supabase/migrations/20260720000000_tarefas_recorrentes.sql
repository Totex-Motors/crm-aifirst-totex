-- ============================================================================
-- Tarefas recorrentes — colunas de recorrência em company_activities
--
-- BUG ATIVO que isto corrige: o CreateTaskModal envia is_recurring em TODO
-- payload (não só quando a tarefa é recorrente), e a coluna não existe. O
-- PostgREST rejeita no schema cache antes de tocar o banco:
--
--   POST company_activities {"is_recurring": false}
--   -> PGRST204: Could not find the 'is_recurring' column ... in the schema cache
--
-- Como useCreateTask faz `.insert({ ...input })` e `if (error) throw error`,
-- NENHUMA tarefa podia ser criada por esse modal — que é alcançável do inbox,
-- do detalhe de chamada, do calendário e do pós-chamada.
--
-- Semântica (useTasks.ts): tarefa recorrente não conclui. Ao "concluir", ela
-- se reagenda para hoje + recurrence_interval_days, incrementa recurrence_count
-- e empilha o histórico em metadata.recurrence_history (metadata é jsonb e já
-- existe — recurrence_history/recurrence_resolved não precisam de coluna).
-- ============================================================================

ALTER TABLE public.company_activities
  -- CreateTaskModal manda sempre, default false. NOT NULL evita tri-state.
  ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN NOT NULL DEFAULT false,
  -- Intervalo entre renovações. Null quando a tarefa não é recorrente
  -- (o modal manda undefined nesse caso). Default da UI é 2 dias.
  ADD COLUMN IF NOT EXISTS recurrence_interval_days INTEGER,
  -- Quantas vezes já renovou. useCompleteTask faz (recurrence_count || 0) + 1.
  ADD COLUMN IF NOT EXISTS recurrence_count INTEGER NOT NULL DEFAULT 0;

-- Um intervalo <= 0 faria a tarefa renovar no passado ou no mesmo instante.
ALTER TABLE public.company_activities
  DROP CONSTRAINT IF EXISTS company_activities_recurrence_interval_positive;
ALTER TABLE public.company_activities
  ADD CONSTRAINT company_activities_recurrence_interval_positive
  CHECK (recurrence_interval_days IS NULL OR recurrence_interval_days > 0);

-- As listas de tarefa filtram recorrentes pendentes; parcial porque a grande
-- maioria das linhas não é recorrente.
CREATE INDEX IF NOT EXISTS idx_company_activities_recurring
  ON public.company_activities (tenant_id, scheduled_at)
  WHERE is_recurring = true;
