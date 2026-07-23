import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Shape real do RPC get_sales_performance (fonte da verdade:
// src/types/database.types.ts). Agrega negociacoes por vendedor no periodo.
// Os campos B2B antigos (tasks/completion_rate/noshow/followups/streak) nunca
// existiram no RPC e geravam NaN no dashboard.
export interface SalesPerformanceRow {
  team_member_id: string;
  team_member_name: string;
  deals_count: number;
  total_revenue: number;
  won_count: number;
  lost_count: number;
}

export function useSalesPerformance(filters: { dateFrom: Date; dateTo: Date }) {
  return useQuery({
    queryKey: [
      'dashboard-v2-performance',
      filters.dateFrom.toISOString(),
      filters.dateTo.toISOString(),
    ],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_sales_performance', {
        p_date_from: filters.dateFrom.toISOString().split('T')[0],
        p_date_to: filters.dateTo.toISOString().split('T')[0],
      });

      if (error) throw error;
      return (data ?? []) as SalesPerformanceRow[];
    },
    staleTime: 60_000,
  });
}
