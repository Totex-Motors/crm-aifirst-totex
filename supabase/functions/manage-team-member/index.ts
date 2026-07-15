import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // ========================================
    // AUTORIZAÇÃO: SOMENTE ADMINS AUTENTICADOS
    // ========================================
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return jsonResponse({ error: "Unauthorized: missing bearer token" }, 401);
    }

    const jwt = authHeader.replace("Bearer ", "");

    // Cliente com JWT do usuário pra validar sessão
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: userData, error: userErr } = await userClient.auth.getUser(jwt);
    if (userErr || !userData?.user) {
      return jsonResponse({ error: "Unauthorized: invalid token" }, 401);
    }

    const callerAuthId = userData.user.id;

    // Cliente service_role pra operações admin
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verifica se o caller é admin ATIVO no team_members
    const { data: callerMember, error: callerErr } = await supabase
      .from("team_members")
      .select("id, role, is_active, tenant_id")
      .eq("auth_user_id", callerAuthId)
      .maybeSingle();

    if (callerErr || !callerMember) {
      return jsonResponse({ error: "Forbidden: caller not found in team_members" }, 403);
    }

    if (!callerMember.is_active) {
      return jsonResponse({ error: "Forbidden: caller is inactive" }, 403);
    }

    if (callerMember.role !== "admin") {
      return jsonResponse({ error: "Forbidden: admin role required" }, 403);
    }

    // ========================================
    // CALLER VALIDADO COMO ADMIN — PROCESSA AÇÃO
    // ========================================
    // Frontend envia o corpo achatado: { action, ...campos }
    const body = await req.json();
    const { action } = body;

    if (action === "create") {
      const { email, password, name, role, team, phone } = body;

      if (!email || !password || !name || !role) {
        return jsonResponse({ error: "Missing required fields: email, password, name, role" }, 400);
      }

      // Herda o tenant do admin que está criando (single-tenant cai no padrão)
      const tenantId = callerMember.tenant_id;

      // 1. Create auth user — carimba tenant_id no app_metadata pro JWT/RLS
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
        app_metadata: tenantId ? { tenant_id: tenantId } : undefined,
      });

      if (authError) {
        return jsonResponse({ error: `Auth error: ${authError.message}` }, 400);
      }

      // 2. Insert team_member (mesmo tenant do admin)
      const { data: teamMember, error: tmError } = await supabase
        .from("team_members")
        .insert({
          email,
          name,
          role,
          team: team || "comercial",
          phone: phone || null,
          auth_user_id: authData.user.id,
          tenant_id: tenantId,
          is_active: true,
        })
        .select()
        .single();

      if (tmError) {
        // Rollback: delete auth user if team_member insert fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        return jsonResponse({ error: `Team member error: ${tmError.message}` }, 400);
      }

      return jsonResponse({ success: true, team_member: teamMember });
    }

    if (action === "update") {
      const { member_id, name, phone, role, team } = body;

      if (!member_id) {
        return jsonResponse({ error: "Missing required field: member_id" }, 400);
      }

      const updates: Record<string, unknown> = {};
      if (name !== undefined) updates.name = name;
      if (phone !== undefined) updates.phone = phone;
      if (role !== undefined) updates.role = role;
      if (team !== undefined) updates.team = team;

      const { data: updated, error } = await supabase
        .from("team_members")
        .update(updates)
        .eq("id", member_id)
        .select()
        .single();

      if (error) {
        return jsonResponse({ error: `Update error: ${error.message}` }, 400);
      }

      return jsonResponse({ success: true, team_member: updated });
    }

    if (action === "toggle_active") {
      const { member_id, is_active } = body;

      if (!member_id || typeof is_active !== "boolean") {
        return jsonResponse({ error: "Missing required fields: member_id, is_active" }, 400);
      }

      const { data: updated, error } = await supabase
        .from("team_members")
        .update({ is_active })
        .eq("id", member_id)
        .select("id, auth_user_id");

      if (error) {
        return jsonResponse({ error: `Toggle active error: ${error.message}` }, 400);
      }

      const authUserId = updated?.[0]?.auth_user_id as string | null;
      if (authUserId) {
        // ban_duration "none" reativa; ~100 anos equivale a banimento indefinido
        const { error: banErr } = await supabase.auth.admin.updateUserById(authUserId, {
          ban_duration: is_active ? "none" : "876000h",
        });
        if (banErr) {
          console.error("[manage-team-member] Falha ao (des)banir conta:", banErr.message);
        }
      }

      return jsonResponse({ success: true });
    }

    if (action === "reset_password") {
      const { member_id, new_password } = body;

      if (!member_id || !new_password) {
        return jsonResponse({ error: "Missing required fields: member_id, new_password" }, 400);
      }

      // Descobre o auth_user_id a partir do team_member
      const { data: member, error: memberErr } = await supabase
        .from("team_members")
        .select("auth_user_id")
        .eq("id", member_id)
        .maybeSingle();

      if (memberErr || !member?.auth_user_id) {
        return jsonResponse({ error: "Team member not found or has no auth user" }, 404);
      }

      const { error } = await supabase.auth.admin.updateUserById(member.auth_user_id, {
        password: new_password,
      });

      if (error) {
        return jsonResponse({ error: `Reset password error: ${error.message}` }, 400);
      }

      return jsonResponse({ success: true });
    }

    return jsonResponse(
      { error: `Unknown action: ${action}. Valid: create, update, toggle_active, reset_password` },
      400
    );
  } catch (err) {
    return jsonResponse({ error: (err as Error).message }, 500);
  }
});
