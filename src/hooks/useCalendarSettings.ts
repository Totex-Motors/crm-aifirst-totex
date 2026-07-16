import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

// ── Types ────────────────────────────────────────────────────────────────

export interface WorkingHours {
  [day: string]: { start: string; end: string } | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start_datetime: string;
  end_datetime: string;
  all_day: boolean | null;
  location: string | null;
  meet_link: string | null;
  html_link: string | null;
  status: string | null;
  team_member_id: string | null;
}

// ── Google Calendar Events ───────────────────────────────────────────────

export const useGoogleCalendarEvents = (teamMemberId?: string, startDate?: string, endDate?: string) => {
  const { teamMember } = useAuth();
  const id = teamMemberId || teamMember?.id;
  // calendar_events.team_member_id references profiles.id, so look up via auth_user_id
  const authUserId = teamMember?.auth_user_id;

  return useQuery({
    queryKey: ["google-calendar-events", id, startDate, endDate],
    queryFn: async () => {
      // Find auth_user_id for this team member if viewing someone else
      let profileId = authUserId;
      if (teamMemberId && teamMemberId !== teamMember?.id) {
        const { data: tm } = await supabase
          .from("team_members")
          .select("auth_user_id")
          .eq("id", teamMemberId)
          .single();
        profileId = tm?.auth_user_id || null;
      }

      if (!profileId) return [];

      let query = supabase
        .from("calendar_events")
        .select("id, title, start_datetime, end_datetime, all_day, location, meet_link, html_link, status, team_member_id")
        .eq("team_member_id", profileId)
        .neq("status", "cancelled");

      if (startDate) query = query.gte("end_datetime", startDate);
      if (endDate) query = query.lte("start_datetime", endDate);

      const { data, error } = await query.order("start_datetime", { ascending: true });
      if (error) throw error;
      return (data || []) as CalendarEvent[];
    },
    enabled: !!id,
  });
};

// ── Helpers ──────────────────────────────────────────────────────────────

export function defaultWorkingHours(): WorkingHours {
  return {
    "0": null,
    "1": { start: "09:00", end: "18:00" },
    "2": { start: "09:00", end: "18:00" },
    "3": { start: "09:00", end: "18:00" },
    "4": { start: "09:00", end: "18:00" },
    "5": { start: "09:00", end: "18:00" },
    "6": null,
  };
}

export function isWithinWorkingHours(
  dayOfWeek: number,
  timeMinutes: number,
  workingHours: WorkingHours
): boolean {
  const dayConfig = workingHours[String(dayOfWeek)];
  if (!dayConfig) return false;
  const [startH, startM] = dayConfig.start.split(":").map(Number);
  const [endH, endM] = dayConfig.end.split(":").map(Number);
  const startMin = startH * 60 + startM;
  const endMin = endH * 60 + endM;
  return timeMinutes >= startMin && timeMinutes < endMin;
}
