/**
 * Serviço para verificar disponibilidade de agenda
 * Consulta 2 fontes: company_activities + calendar_events (Google)
 */

import { supabase } from "@/lib/supabase";

export interface AvailabilityResult {
  team_member_id: string;
  name: string;
  status: "free" | "busy";
  conflicting_tasks: { id: string; name: string; start: string; end: string }[];
}

export interface DayScheduleItem {
  id: string;
  name: string;
  start: string;
  end: string;
  type: "task" | "google";
  taskType?: string;
}

export interface CheckAvailabilityResponse {
  success: boolean;
  has_conflicts: boolean;
  all_free: boolean;
  results: AvailabilityResult[];
  error?: string;
}

/**
 * Verifica disponibilidade de agenda para os membros do time
 * Consulta: company_activities + calendar_events (Google Calendar)
 *
 * @param teamMemberIds - IDs dos team_members (responsável + participantes)
 * @param startDateTime - Data/hora de início (formato datetime-local: "2026-02-02T11:00")
 * @param durationMinutes - Duração em minutos
 */
export async function checkCalendarAvailability(
  teamMemberIds: string[],
  startDateTime: string,
  durationMinutes: number
): Promise<CheckAvailabilityResponse> {
  if (!teamMemberIds.length) {
    return {
      success: true,
      has_conflicts: false,
      all_free: true,
      results: [],
    };
  }

  // Calcular intervalo da nova tarefa
  const startDate = new Date(startDateTime);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  // Timeout global de 5s — não travar UI se Supabase estiver lento
  const timeoutPromise = new Promise<CheckAvailabilityResponse>((resolve) =>
    setTimeout(() => resolve({
      success: true,
      has_conflicts: false,
      all_free: true,
      results: [],
    }), 5000)
  );

  return Promise.race([checkAvailabilityInternal(teamMemberIds, startDate, endDate), timeoutPromise]);
}

async function checkAvailabilityInternal(
  teamMemberIds: string[],
  startDate: Date,
  endDate: Date,
): Promise<CheckAvailabilityResponse> {
  try {
    const { data: members, error: membersError } = await supabase
      .from("team_members")
      .select("id, name, auth_user_id")
      .in("id", teamMemberIds);

    if (membersError) throw membersError;

    const memberMap = new Map(members?.map(m => [m.id, m]) || []);

    // Janela de busca: ±1 dia
    const windowStart = new Date(startDate.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const windowEnd = new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toISOString();

    // Fetch all sources in parallel
    const [tasksResult, googleEventsResult] = await Promise.all([
      // 1. company_activities (tarefas) - meetings e onboarding sempre bloqueiam
      // Calls só bloqueiam se tiverem meeting_link (reunião vinculada)
      supabase
        .from("company_activities")
        .select("id, name, scheduled_at, due_datetime, end_datetime, task_type, meeting_link, responsavel_id, participants")
        .eq("completed", false)
        .in("task_type", ["call", "meeting", "onboarding"])
        .or(`and(scheduled_at.gte.${windowStart},scheduled_at.lte.${windowEnd}),and(due_datetime.gte.${windowStart},due_datetime.lte.${windowEnd})`)
        .limit(200),

      // 2. calendar_events (Google Calendar)
      (async () => {
        const authUserIds = members
          ?.filter(m => m.auth_user_id)
          .map(m => m.auth_user_id!) || [];
        if (!authUserIds.length) return { data: [], error: null };
        return supabase
          .from("calendar_events")
          .select("id, title, start_datetime, end_datetime, team_member_id, status")
          .in("team_member_id", authUserIds)
          .neq("status", "cancelled")
          .gte("end_datetime", windowStart)
          .lte("start_datetime", windowEnd);
      })(),
    ]);

    const tasks = tasksResult.data || [];
    const googleEvents = googleEventsResult.data || [];

    // Build reverse map: auth_user_id → team_member_id
    const authToTeamMap = new Map<string, string>();
    members?.forEach(m => {
      if (m.auth_user_id) authToTeamMap.set(m.auth_user_id, m.id);
    });

    // Verificar conflitos para cada team_member
    const results: AvailabilityResult[] = [];

    for (const teamMemberId of teamMemberIds) {
      const member = memberMap.get(teamMemberId);
      const conflictingTasks: AvailabilityResult["conflicting_tasks"] = [];

      // 1. Check company_activities
      for (const task of tasks) {
        // Plain calls (without meeting link) don't block the calendar
        if (task.task_type === "call" && !task.meeting_link) continue;

        const isResponsavel = task.responsavel_id === teamMemberId;
        const isParticipant = task.participants?.includes(teamMemberId);
        if (!isResponsavel && !isParticipant) continue;

        const taskStartRaw = task.scheduled_at || task.due_datetime;
        if (!taskStartRaw) continue;
        const taskStart = new Date(taskStartRaw);
        const taskEnd = task.end_datetime
          ? new Date(task.end_datetime)
          : new Date(taskStart.getTime() + 60 * 60 * 1000);

        if (startDate < taskEnd && endDate > taskStart) {
          conflictingTasks.push({
            id: task.id,
            name: task.name,
            start: taskStart.toISOString(),
            end: taskEnd.toISOString(),
          });
        }
      }

      // 2. Check Google Calendar events
      const authUserId = member?.auth_user_id;
      if (authUserId) {
        for (const evt of googleEvents) {
          if (evt.team_member_id !== authUserId) continue;
          const evtStart = new Date(evt.start_datetime);
          const evtEnd = new Date(evt.end_datetime);
          if (startDate < evtEnd && endDate > evtStart) {
            conflictingTasks.push({
              id: evt.id,
              name: `Google: ${evt.title}`,
              start: evtStart.toISOString(),
              end: evtEnd.toISOString(),
            });
          }
        }
      }

      results.push({
        team_member_id: teamMemberId,
        name: member?.name || "Desconhecido",
        status: conflictingTasks.length > 0 ? "busy" : "free",
        conflicting_tasks: conflictingTasks,
      });
    }

    const hasConflicts = results.some(r => r.status === "busy");
    const allFree = results.every(r => r.status === "free");

    return {
      success: true,
      has_conflicts: hasConflicts,
      all_free: allFree,
      results,
    };

  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error);
    return {
      success: false,
      has_conflicts: false,
      all_free: false,
      results: [],
      error: "Falha ao verificar agenda",
    };
  }
}

/**
 * Busca a agenda do dia para um team_member (tasks + google events)
 * Usado no mini display de agenda ao criar tarefa
 */
export async function getDaySchedule(
  teamMemberId: string,
  dateStr: string // "2026-03-23"
): Promise<DayScheduleItem[]> {
  try {
    const dayStart = new Date(`${dateStr}T00:00:00-03:00`).toISOString();
    const dayEnd = new Date(`${dateStr}T23:59:59-03:00`).toISOString();

    const { data: member } = await supabase
      .from("team_members")
      .select("auth_user_id")
      .eq("id", teamMemberId)
      .single();

    const [tasksResult, googleResult] = await Promise.all([
      supabase
        .from("company_activities")
        .select("id, name, scheduled_at, end_datetime, task_type, meeting_link")
        .eq("completed", false)
        .eq("responsavel_id", teamMemberId)
        .in("task_type", ["call", "meeting", "onboarding"])
        .gte("scheduled_at", dayStart)
        .lte("scheduled_at", dayEnd)
        .order("scheduled_at")
        .limit(50),

      member?.auth_user_id
        ? supabase
            .from("calendar_events")
            .select("id, title, start_datetime, end_datetime")
            .eq("team_member_id", member.auth_user_id)
            .neq("status", "cancelled")
            .gte("start_datetime", dayStart)
            .lte("start_datetime", dayEnd)
            .order("start_datetime")
            .limit(50)
        : Promise.resolve({ data: [] }),
    ]);

    const items: DayScheduleItem[] = [];

    // Tasks (only meetings/onboarding and calls with meet)
    for (const t of tasksResult.data || []) {
      if (t.task_type === "call" && !t.meeting_link) continue;
      const start = t.scheduled_at!;
      const end = t.end_datetime || new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString();
      items.push({ id: t.id, name: t.name, start, end, type: "task", taskType: t.task_type });
    }

    // Google events
    for (const e of googleResult.data || []) {
      items.push({ id: e.id, name: e.title || "Evento Google", start: e.start_datetime, end: e.end_datetime, type: "google" });
    }

    return items.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  } catch (error) {
    console.error("Erro ao buscar agenda do dia:", error);
    return [];
  }
}
