import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

// Shape real do RPC get_daily_activity_summary (fonte da verdade:
// src/types/database.types.ts). O RPC devolve UMA linha agregada por dia —
// nao ha quebra por vendedor, entao nao existem campos calls_connected /
// followups_done / meetings_* etc. (isso era resquicio do template B2B).
export interface ActivitySummaryRow {
  calls_count: number;
  messages_sent: number;
  messages_received: number;
  tasks_completed: number;
  deals_created: number;
  leads_created: number;
}

export function useDailyActivitySummary(date: Date, teamMemberId?: string) {
  return useQuery({
    queryKey: ['daily-activity-summary', format(date, 'yyyy-MM-dd'), teamMemberId],
    queryFn: async (): Promise<ActivitySummaryRow[]> => {
      const { data, error } = await supabase.rpc('get_daily_activity_summary', {
        p_date: format(date, 'yyyy-MM-dd'),
        p_team_member_id: teamMemberId || null,
      });
      if (error) throw error;
      return (data ?? []) as ActivitySummaryRow[];
    },
    staleTime: 30_000,
  });
}

/** Totais do dia (o RPC ja retorna agregado; normalizamos para numeros). */
export function useDailyActivityTotals(date: Date) {
  const { data, ...rest } = useDailyActivitySummary(date);

  const row = data?.[0];
  const totals: ActivitySummaryRow = {
    calls_count: Number(row?.calls_count ?? 0),
    messages_sent: Number(row?.messages_sent ?? 0),
    messages_received: Number(row?.messages_received ?? 0),
    tasks_completed: Number(row?.tasks_completed ?? 0),
    deals_created: Number(row?.deals_created ?? 0),
    leads_created: Number(row?.leads_created ?? 0),
  };

  return { data: row ? totals : undefined, rows: data, ...rest };
}
