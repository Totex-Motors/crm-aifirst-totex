export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      _deal_stage_audit: {
        Row: {
          changed_at: string | null
          deal_id: string
          id: number
          new_stage_id: string | null
          new_stage_name: string | null
          old_stage_id: string | null
          old_stage_name: string | null
          query_source: string | null
        }
        Insert: {
          changed_at?: string | null
          deal_id: string
          id?: number
          new_stage_id?: string | null
          new_stage_name?: string | null
          old_stage_id?: string | null
          old_stage_name?: string | null
          query_source?: string | null
        }
        Update: {
          changed_at?: string | null
          deal_id?: string
          id?: number
          new_stage_id?: string | null
          new_stage_name?: string | null
          old_stage_id?: string | null
          old_stage_name?: string | null
          query_source?: string | null
        }
        Relationships: []
      }
      admin_impersonation_tokens: {
        Row: {
          admin_member_id: string
          created_at: string | null
          expires_at: string
          id: string
          target_member_id: string
          tenant_id: string
          token: string
          used: boolean | null
        }
        Insert: {
          admin_member_id: string
          created_at?: string | null
          expires_at?: string
          id?: string
          target_member_id: string
          tenant_id: string
          token?: string
          used?: boolean | null
        }
        Update: {
          admin_member_id?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          target_member_id?: string
          tenant_id?: string
          token?: string
          used?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_impersonation_tokens_admin_member_id_fkey"
            columns: ["admin_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_impersonation_tokens_target_member_id_fkey"
            columns: ["target_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_jobs: {
        Row: {
          agent_id: string
          attempts: number
          channel: string
          completed_at: string | null
          created_at: string
          error: string | null
          external_id: string | null
          id: string
          poll_config: Json
          provider: string | null
          result: Json | null
          resume_context: Json
          resumed: boolean
          session_id: string | null
          status: string
          timeout_at: string
          tool_name: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          attempts?: number
          channel?: string
          completed_at?: string | null
          created_at?: string
          error?: string | null
          external_id?: string | null
          id?: string
          poll_config?: Json
          provider?: string | null
          result?: Json | null
          resume_context?: Json
          resumed?: boolean
          session_id?: string | null
          status?: string
          timeout_at?: string
          tool_name: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          attempts?: number
          channel?: string
          completed_at?: string | null
          created_at?: string
          error?: string | null
          external_id?: string | null
          id?: string
          poll_config?: Json
          provider?: string | null
          result?: Json | null
          resume_context?: Json
          resumed?: boolean
          session_id?: string | null
          status?: string
          timeout_at?: string
          tool_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_jobs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_jobs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agents_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_note_versions: {
        Row: {
          author: string
          author_id: string | null
          content: string
          created_at: string
          id: string
          note_id: string
          title: string | null
        }
        Insert: {
          author: string
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          note_id: string
          title?: string | null
        }
        Update: {
          author?: string
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          note_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_note_versions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "agent_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_notes: {
        Row: {
          agent_id: string
          archived: boolean
          content: string
          created_at: string
          embedding: string | null
          embedding_at: string | null
          id: string
          metadata: Json
          owner_user_id: string | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          archived?: boolean
          content?: string
          created_at?: string
          embedding?: string | null
          embedding_at?: string | null
          id?: string
          metadata?: Json
          owner_user_id?: string | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          archived?: boolean
          content?: string
          created_at?: string
          embedding?: string | null
          embedding_at?: string | null
          id?: string
          metadata?: Json
          owner_user_id?: string | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_notes_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_notes_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_reminders: {
        Row: {
          agent_id: string
          channel: string
          created_at: string
          error: string | null
          fire_at: string
          id: string
          message: string
          repeat_every_minutes: number | null
          repeat_until: string | null
          resume_context: Json
          sent_at: string | null
          session_id: string | null
          status: string
          times_fired: number
        }
        Insert: {
          agent_id: string
          channel?: string
          created_at?: string
          error?: string | null
          fire_at: string
          id?: string
          message: string
          repeat_every_minutes?: number | null
          repeat_until?: string | null
          resume_context?: Json
          sent_at?: string | null
          session_id?: string | null
          status?: string
          times_fired?: number
        }
        Update: {
          agent_id?: string
          channel?: string
          created_at?: string
          error?: string | null
          fire_at?: string
          id?: string
          message?: string
          repeat_every_minutes?: number | null
          repeat_until?: string | null
          resume_context?: Json
          sent_at?: string | null
          session_id?: string | null
          status?: string
          times_fired?: number
        }
        Relationships: [
          {
            foreignKeyName: "agent_reminders_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_routing_log: {
        Row: {
          channel: string
          created_at: string
          decision: string
          id: string
          instance_id: string | null
          lead_id: string | null
          legacy_agent_id: string | null
          match_used: Json | null
          message_id: string | null
          reason: string | null
          routed_agent_id: string | null
          routed_agent_slug: string | null
          routed_deployment_id: string | null
          routing_ctx: Json | null
          v2_enabled: boolean
        }
        Insert: {
          channel: string
          created_at?: string
          decision: string
          id?: string
          instance_id?: string | null
          lead_id?: string | null
          legacy_agent_id?: string | null
          match_used?: Json | null
          message_id?: string | null
          reason?: string | null
          routed_agent_id?: string | null
          routed_agent_slug?: string | null
          routed_deployment_id?: string | null
          routing_ctx?: Json | null
          v2_enabled?: boolean
        }
        Update: {
          channel?: string
          created_at?: string
          decision?: string
          id?: string
          instance_id?: string | null
          lead_id?: string | null
          legacy_agent_id?: string | null
          match_used?: Json | null
          message_id?: string | null
          reason?: string | null
          routed_agent_id?: string | null
          routed_agent_slug?: string | null
          routed_deployment_id?: string | null
          routing_ctx?: Json | null
          v2_enabled?: boolean
        }
        Relationships: []
      }
      agents_action_log: {
        Row: {
          agent_id: string | null
          created_at: string
          duration_ms: number | null
          error: string | null
          id: string
          idempotency_key: string | null
          input: Json | null
          output: Json | null
          session_id: string | null
          status: string
          tool_name: string
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          id?: string
          idempotency_key?: string | null
          input?: Json | null
          output?: Json | null
          session_id?: string | null
          status: string
          tool_name: string
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          id?: string
          idempotency_key?: string | null
          input?: Json | null
          output?: Json | null
          session_id?: string | null
          status?: string
          tool_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_action_log_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_action_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agents_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_core_memory: {
        Row: {
          agent_id: string
          block_key: string
          content: string
          created_at: string
          id: string
          metadata: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          agent_id: string
          block_key: string
          content: string
          created_at?: string
          id?: string
          metadata?: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          agent_id?: string
          block_key?: string
          content?: string
          created_at?: string
          id?: string
          metadata?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      agents_deployments: {
        Row: {
          agent_id: string
          channel: string
          config: Json
          created_at: string
          id: string
          is_active: boolean
        }
        Insert: {
          agent_id: string
          channel: string
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
        }
        Update: {
          agent_id?: string
          channel?: string
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "agents_deployments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_integration_providers: {
        Row: {
          category: string
          created_at: string
          credential_type: string | null
          description: string
          display_name: string
          icon: string
          is_active: boolean
          required_env_vars: string[] | null
          setup_url: string | null
          slug: string
        }
        Insert: {
          category: string
          created_at?: string
          credential_type?: string | null
          description: string
          display_name: string
          icon?: string
          is_active?: boolean
          required_env_vars?: string[] | null
          setup_url?: string | null
          slug: string
        }
        Update: {
          category?: string
          created_at?: string
          credential_type?: string | null
          description?: string
          display_name?: string
          icon?: string
          is_active?: boolean
          required_env_vars?: string[] | null
          setup_url?: string | null
          slug?: string
        }
        Relationships: []
      }
      agents_logs: {
        Row: {
          agent_id: string | null
          cached_tokens: number | null
          cost_brl: number | null
          created_at: string
          error: string | null
          id: string
          input_tokens: number | null
          latency_ms: number | null
          model: string | null
          output_tokens: number | null
          provider: string | null
          sampled: boolean | null
          session_id: string | null
          status_code: number | null
          ttft_ms: number | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          cached_tokens?: number | null
          cost_brl?: number | null
          created_at?: string
          error?: string | null
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          model?: string | null
          output_tokens?: number | null
          provider?: string | null
          sampled?: boolean | null
          session_id?: string | null
          status_code?: number | null
          ttft_ms?: number | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          cached_tokens?: number | null
          cost_brl?: number | null
          created_at?: string
          error?: string | null
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          model?: string | null
          output_tokens?: number | null
          provider?: string | null
          sampled?: boolean | null
          session_id?: string | null
          status_code?: number | null
          ttft_ms?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      agents_messages: {
        Row: {
          content: string | null
          cost_brl: number | null
          created_at: string
          embedding: string | null
          id: string
          raw: Json | null
          role: string
          session_id: string
          status: string
          token_count: number | null
          tool_call_id: string | null
          tool_calls: Json | null
        }
        Insert: {
          content?: string | null
          cost_brl?: number | null
          created_at?: string
          embedding?: string | null
          id?: string
          raw?: Json | null
          role: string
          session_id: string
          status?: string
          token_count?: number | null
          tool_call_id?: string | null
          tool_calls?: Json | null
        }
        Update: {
          content?: string | null
          cost_brl?: number | null
          created_at?: string
          embedding?: string | null
          id?: string
          raw?: Json | null
          role?: string
          session_id?: string
          status?: string
          token_count?: number | null
          tool_call_id?: string | null
          tool_calls?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agents_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_provider_credentials: {
        Row: {
          auth_data: Json
          created_at: string
          id: string
          is_active: boolean
          is_shared: boolean
          label: string
          last_refreshed_at: string | null
          last_used_at: string | null
          metadata: Json | null
          owner_user_id: string | null
          provider_type: string
          updated_at: string
        }
        Insert: {
          auth_data: Json
          created_at?: string
          id?: string
          is_active?: boolean
          is_shared?: boolean
          label: string
          last_refreshed_at?: string | null
          last_used_at?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          provider_type: string
          updated_at?: string
        }
        Update: {
          auth_data?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          is_shared?: boolean
          label?: string
          last_refreshed_at?: string | null
          last_used_at?: string | null
          metadata?: Json | null
          owner_user_id?: string | null
          provider_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_provider_credentials_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_registry: {
        Row: {
          avatar_color: string | null
          created_at: string
          created_by: string | null
          credential_id: string | null
          daily_cost_limit_brl: number | null
          daily_token_limit: number | null
          description: string | null
          display_name: string
          emoji: string | null
          endpoint_url: string | null
          id: string
          is_active: boolean
          is_template: boolean
          model: string
          parent_agent_id: string | null
          provider: string
          required_providers: string[]
          responsible_user_id: string | null
          settings: Json
          slug: string
          system_prompt: string
          template_variables: Json
          tier: string | null
          updated_at: string
          version: number
        }
        Insert: {
          avatar_color?: string | null
          created_at?: string
          created_by?: string | null
          credential_id?: string | null
          daily_cost_limit_brl?: number | null
          daily_token_limit?: number | null
          description?: string | null
          display_name: string
          emoji?: string | null
          endpoint_url?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          model: string
          parent_agent_id?: string | null
          provider: string
          required_providers?: string[]
          responsible_user_id?: string | null
          settings?: Json
          slug: string
          system_prompt: string
          template_variables?: Json
          tier?: string | null
          updated_at?: string
          version?: number
        }
        Update: {
          avatar_color?: string | null
          created_at?: string
          created_by?: string | null
          credential_id?: string | null
          daily_cost_limit_brl?: number | null
          daily_token_limit?: number | null
          description?: string | null
          display_name?: string
          emoji?: string | null
          endpoint_url?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          model?: string
          parent_agent_id?: string | null
          provider?: string
          required_providers?: string[]
          responsible_user_id?: string | null
          settings?: Json
          slug?: string
          system_prompt?: string
          template_variables?: Json
          tier?: string | null
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "agents_registry_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "agents_provider_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_registry_parent_agent_id_fkey"
            columns: ["parent_agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_sessions: {
        Row: {
          agent_id: string
          channel: string
          created_at: string
          id: string
          provider_state: Json
          status: string
          summary: string | null
          title: string | null
          updated_at: string
          user_id: string | null
          working_memory: Json
        }
        Insert: {
          agent_id: string
          channel: string
          created_at?: string
          id?: string
          provider_state?: Json
          status?: string
          summary?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          working_memory?: Json
        }
        Update: {
          agent_id?: string
          channel?: string
          created_at?: string
          id?: string
          provider_state?: Json
          status?: string
          summary?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          working_memory?: Json
        }
        Relationships: [
          {
            foreignKeyName: "agents_sessions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_skill_catalog: {
        Row: {
          action_config: Json
          action_type: string
          category: string
          created_at: string
          default_usage_mode: string
          description: string
          display_name: string
          emoji: string | null
          id: string
          is_recommended: boolean
          parameters_schema: Json
          provider: string | null
          slug: string
        }
        Insert: {
          action_config: Json
          action_type: string
          category: string
          created_at?: string
          default_usage_mode?: string
          description: string
          display_name: string
          emoji?: string | null
          id?: string
          is_recommended?: boolean
          parameters_schema: Json
          provider?: string | null
          slug: string
        }
        Update: {
          action_config?: Json
          action_type?: string
          category?: string
          created_at?: string
          default_usage_mode?: string
          description?: string
          display_name?: string
          emoji?: string | null
          id?: string
          is_recommended?: boolean
          parameters_schema?: Json
          provider?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_skill_catalog_provider_fkey"
            columns: ["provider"]
            isOneToOne: false
            referencedRelation: "agents_integration_providers"
            referencedColumns: ["slug"]
          },
        ]
      }
      agents_tools: {
        Row: {
          action_config: Json
          action_type: string
          agent_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          parameters_schema: Json
          provider: string | null
          requires_approval: boolean
          usage_mode: string
        }
        Insert: {
          action_config: Json
          action_type: string
          agent_id: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          parameters_schema: Json
          provider?: string | null
          requires_approval?: boolean
          usage_mode?: string
        }
        Update: {
          action_config?: Json
          action_type?: string
          agent_id?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          parameters_schema?: Json
          provider?: string | null
          requires_approval?: boolean
          usage_mode?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_tools_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_versions: {
        Row: {
          agent_id: string
          avatar_color: string | null
          change_summary: string | null
          created_at: string
          created_by: string | null
          credential_id: string | null
          daily_cost_limit_brl: number | null
          daily_token_limit: number | null
          description: string | null
          display_name: string | null
          emoji: string | null
          endpoint_url: string | null
          id: string
          is_published: boolean | null
          model: string | null
          provider: string | null
          published_at: string | null
          settings: Json | null
          snapshot: Json | null
          summary: string | null
          system_prompt: string | null
          tier: string | null
          version: number | null
          version_number: number | null
        }
        Insert: {
          agent_id: string
          avatar_color?: string | null
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          credential_id?: string | null
          daily_cost_limit_brl?: number | null
          daily_token_limit?: number | null
          description?: string | null
          display_name?: string | null
          emoji?: string | null
          endpoint_url?: string | null
          id?: string
          is_published?: boolean | null
          model?: string | null
          provider?: string | null
          published_at?: string | null
          settings?: Json | null
          snapshot?: Json | null
          summary?: string | null
          system_prompt?: string | null
          tier?: string | null
          version?: number | null
          version_number?: number | null
        }
        Update: {
          agent_id?: string
          avatar_color?: string | null
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          credential_id?: string | null
          daily_cost_limit_brl?: number | null
          daily_token_limit?: number | null
          description?: string | null
          display_name?: string | null
          emoji?: string | null
          endpoint_url?: string | null
          id?: string
          is_published?: boolean | null
          model?: string | null
          provider?: string | null
          published_at?: string | null
          settings?: Json | null
          snapshot?: Json | null
          summary?: string | null
          system_prompt?: string | null
          tier?: string | null
          version?: number | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_versions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_cadence_enrollments: {
        Row: {
          agent_id: string
          completed_at: string | null
          created_at: string | null
          current_step: number
          enrolled_at: string | null
          id: string
          last_step_at: string | null
          lead_id: string
          metadata: Json | null
          next_action_at: string | null
          stage: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          enrolled_at?: string | null
          id?: string
          last_step_at?: string | null
          lead_id: string
          metadata?: Json | null
          next_action_at?: string | null
          stage: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          enrolled_at?: string | null
          id?: string
          last_step_at?: string | null
          lead_id?: string
          metadata?: Json | null
          next_action_at?: string | null
          stage?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_cadence_enrollments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_cadence_enrollments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_cadence_enrollments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_chat_events: {
        Row: {
          agent_id: string | null
          conversation_id: string | null
          created_at: string
          event_type: string
          id: string
          lead_id: string
          message: string
          metadata: Json | null
          reason: string | null
        }
        Insert: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          lead_id: string
          message: string
          metadata?: Json | null
          reason?: string | null
        }
        Update: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          lead_id?: string
          message?: string
          metadata?: Json | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_chat_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_chat_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_chat_events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_chat_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_conversations: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          last_message_id: string | null
          last_processed_at: string | null
          lead_id: string | null
          messages_history: Json | null
          metadata: Json | null
          pause_reason: string | null
          paused_at: string | null
          paused_by: string | null
          processing_lock: string | null
          status: string | null
          tenant_id: string
          total_messages_received: number | null
          total_messages_sent: number | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          last_processed_at?: string | null
          lead_id?: string | null
          messages_history?: Json | null
          metadata?: Json | null
          pause_reason?: string | null
          paused_at?: string | null
          paused_by?: string | null
          processing_lock?: string | null
          status?: string | null
          tenant_id?: string
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          last_processed_at?: string | null
          lead_id?: string | null
          messages_history?: Json | null
          metadata?: Json | null
          pause_reason?: string | null
          paused_at?: string | null
          paused_by?: string | null
          processing_lock?: string | null
          status?: string | null
          tenant_id?: string
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_logs: {
        Row: {
          agent_id: string | null
          conversation_id: string | null
          created_at: string | null
          data: Json | null
          id: string
          lead_id: string | null
          log_type: string
          tenant_id: string
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          log_type: string
          tenant_id?: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          log_type?: string
          tenant_id?: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_message_queue: {
        Row: {
          attempts: number | null
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string
          max_attempts: number | null
          message_content: string | null
          message_id: string | null
          message_metadata: Json | null
          processed_at: string | null
          result: Json | null
          scheduled_for: string
          status: string | null
          tenant_id: string
        }
        Insert: {
          attempts?: number | null
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id: string
          max_attempts?: number | null
          message_content?: string | null
          message_id?: string | null
          message_metadata?: Json | null
          processed_at?: string | null
          result?: Json | null
          scheduled_for: string
          status?: string | null
          tenant_id?: string
        }
        Update: {
          attempts?: number | null
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string
          max_attempts?: number | null
          message_content?: string | null
          message_id?: string | null
          message_metadata?: Json | null
          processed_at?: string | null
          result?: Json | null
          scheduled_for?: string
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_message_queue_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_message_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_message_queue_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_message_queue_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_scheduled_followups: {
        Row: {
          agent_id: string | null
          attempts: number
          context_note: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          lead_id: string
          scheduled_at: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          attempts?: number
          context_note?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          lead_id: string
          scheduled_at: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          attempts?: number
          context_note?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string
          scheduled_at?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_scheduled_followups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_send_counts: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string
          message_count: number | null
          tenant_id: string
          window_start: string
          window_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instance_id: string
          message_count?: number | null
          tenant_id?: string
          window_start: string
          window_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string
          message_count?: number | null
          tenant_id?: string
          window_start?: string
          window_type?: string
        }
        Relationships: []
      }
      ai_agent_tools: {
        Row: {
          action_config: Json | null
          action_type: string
          agent_id: string | null
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          name: string
          parameters: Json | null
          priority: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          action_config?: Json | null
          action_type: string
          agent_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          parameters?: Json | null
          priority?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          action_config?: Json | null
          action_type?: string
          agent_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          parameters?: Json | null
          priority?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_tools_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_tools_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_tools_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_sales_agents: {
        Row: {
          cadence_steps: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          instance_id: string | null
          is_active: boolean | null
          max_tokens: number | null
          model: string | null
          name: string
          personality_traits: Json | null
          pipeline_id: string | null
          settings: Json | null
          system_prompt: string
          target_stages: string[] | null
          temperature: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          cadence_steps?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          max_tokens?: number | null
          model?: string | null
          name: string
          personality_traits?: Json | null
          pipeline_id?: string | null
          settings?: Json | null
          system_prompt: string
          target_stages?: string[] | null
          temperature?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          cadence_steps?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          max_tokens?: number | null
          model?: string | null
          name?: string
          personality_traits?: Json | null
          pipeline_id?: string | null
          settings?: Json | null
          system_prompt?: string
          target_stages?: string[] | null
          temperature?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_sales_agents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_sales_agents_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_sales_agents_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_sales_agents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      analysis_templates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          prompt: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          prompt: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          prompt?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      asaas_customers: {
        Row: {
          asaas_customer_id: string
          cpf_cnpj: string
          created_at: string | null
          email: string | null
          id: string
          lead_id: string
          name: string
          phone: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          asaas_customer_id: string
          cpf_cnpj: string
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id: string
          name: string
          phone?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          asaas_customer_id?: string
          cpf_cnpj?: string
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id?: string
          name?: string
          phone?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asaas_customers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asaas_customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      asaas_webhooks: {
        Row: {
          asaas_payment_id: string | null
          created_at: string | null
          error: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          tenant_id: string
        }
        Insert: {
          asaas_payment_id?: string | null
          created_at?: string | null
          error?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          tenant_id?: string
        }
        Update: {
          asaas_payment_id?: string | null
          created_at?: string | null
          error?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asaas_webhooks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          all_day: boolean | null
          attendees: Json | null
          calendar_id: string
          created_at: string | null
          deal_id: string | null
          description: string | null
          end_datetime: string
          google_event_id: string
          html_link: string | null
          id: string
          lead_id: string | null
          location: string | null
          meet_link: string | null
          organizer_email: string | null
          raw_event: Json | null
          start_datetime: string
          status: string | null
          synced_at: string | null
          team_member_id: string | null
          tenant_id: string
          timezone: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          all_day?: boolean | null
          attendees?: Json | null
          calendar_id?: string
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          end_datetime: string
          google_event_id: string
          html_link?: string | null
          id?: string
          lead_id?: string | null
          location?: string | null
          meet_link?: string | null
          organizer_email?: string | null
          raw_event?: Json | null
          start_datetime: string
          status?: string | null
          synced_at?: string | null
          team_member_id?: string | null
          tenant_id?: string
          timezone?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          all_day?: boolean | null
          attendees?: Json | null
          calendar_id?: string
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          end_datetime?: string
          google_event_id?: string
          html_link?: string | null
          id?: string
          lead_id?: string | null
          location?: string | null
          meet_link?: string | null
          organizer_email?: string | null
          raw_event?: Json | null
          start_datetime?: string
          status?: string | null
          synced_at?: string | null
          team_member_id?: string | null
          tenant_id?: string
          timezone?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "calendar_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_sync_channels: {
        Row: {
          calendar_id: string | null
          channel_id: string
          created_at: string | null
          expiration: string
          id: string
          is_active: boolean | null
          resource_id: string
          sync_token: string | null
          team_member_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          calendar_id?: string | null
          channel_id: string
          created_at?: string | null
          expiration: string
          id?: string
          is_active?: boolean | null
          resource_id: string
          sync_token?: string | null
          team_member_id: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          calendar_id?: string | null
          channel_id?: string
          created_at?: string | null
          expiration?: string
          id?: string
          is_active?: boolean | null
          resource_id?: string
          sync_token?: string | null
          team_member_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_sync_channels_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_sync_channels_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      call_history: {
        Row: {
          ai_key_points: Json | null
          ai_processed_at: string | null
          ai_processing_error: string | null
          ai_sentiment: string | null
          ai_suggested_tasks: Json | null
          ai_summary: string | null
          call_outcome: string | null
          call_outcome_details: Json | null
          call_type: string
          caller_phone: string | null
          created_at: string | null
          direction: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          peer_name: string | null
          peer_phone: string | null
          peer_profile_picture: string | null
          receiver_phone: string | null
          record_status: string | null
          record_url: string | null
          started_at: string | null
          status: string
          team_member_id: string | null
          tenant_id: string
          transcription: string | null
          transcriptions: Json | null
          updated_at: string | null
          wavoip_call_id: string | null
          wavoip_device_id: string | null
          wavoip_session_id: string | null
        }
        Insert: {
          ai_key_points?: Json | null
          ai_processed_at?: string | null
          ai_processing_error?: string | null
          ai_sentiment?: string | null
          ai_suggested_tasks?: Json | null
          ai_summary?: string | null
          call_outcome?: string | null
          call_outcome_details?: Json | null
          call_type?: string
          caller_phone?: string | null
          created_at?: string | null
          direction: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          peer_name?: string | null
          peer_phone?: string | null
          peer_profile_picture?: string | null
          receiver_phone?: string | null
          record_status?: string | null
          record_url?: string | null
          started_at?: string | null
          status?: string
          team_member_id?: string | null
          tenant_id?: string
          transcription?: string | null
          transcriptions?: Json | null
          updated_at?: string | null
          wavoip_call_id?: string | null
          wavoip_device_id?: string | null
          wavoip_session_id?: string | null
        }
        Update: {
          ai_key_points?: Json | null
          ai_processed_at?: string | null
          ai_processing_error?: string | null
          ai_sentiment?: string | null
          ai_suggested_tasks?: Json | null
          ai_summary?: string | null
          call_outcome?: string | null
          call_outcome_details?: Json | null
          call_type?: string
          caller_phone?: string | null
          created_at?: string | null
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          peer_name?: string | null
          peer_phone?: string | null
          peer_profile_picture?: string | null
          receiver_phone?: string | null
          record_status?: string | null
          record_url?: string | null
          started_at?: string | null
          status?: string
          team_member_id?: string | null
          tenant_id?: string
          transcription?: string | null
          transcriptions?: Json | null
          updated_at?: string | null
          wavoip_call_id?: string | null
          wavoip_device_id?: string | null
          wavoip_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_history_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_history_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_history_wavoip_device_id_fkey"
            columns: ["wavoip_device_id"]
            isOneToOne: false
            referencedRelation: "wavoip_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_instance_stats: {
        Row: {
          blocks_detected_day: number | null
          cooldown_until: string | null
          daily_limit_override: number | null
          date: string
          hour_bucket: number
          id: string
          instance_id: string
          last_block_at: string | null
          messages_sent_day: number | null
          messages_sent_hour: number | null
          tenant_id: string
          updated_at: string | null
          warmup_day: number | null
          warmup_started_at: string | null
        }
        Insert: {
          blocks_detected_day?: number | null
          cooldown_until?: string | null
          daily_limit_override?: number | null
          date?: string
          hour_bucket?: number
          id?: string
          instance_id: string
          last_block_at?: string | null
          messages_sent_day?: number | null
          messages_sent_hour?: number | null
          tenant_id: string
          updated_at?: string | null
          warmup_day?: number | null
          warmup_started_at?: string | null
        }
        Update: {
          blocks_detected_day?: number | null
          cooldown_until?: string | null
          daily_limit_override?: number | null
          date?: string
          hour_bucket?: number
          id?: string
          instance_id?: string
          last_block_at?: string | null
          messages_sent_day?: number | null
          messages_sent_hour?: number | null
          tenant_id?: string
          updated_at?: string | null
          warmup_day?: number | null
          warmup_started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_instance_stats_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_instance_stats_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_leads: {
        Row: {
          assigned_to: string | null
          campaign_id: string
          created_at: string | null
          delivered_at: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          instance_id: string | null
          lead_id: string
          read_at: string | null
          resolved_message: string | null
          responded_at: string | null
          response_message_id: string | null
          retry_count: number | null
          sent_at: string | null
          status: string
          tenant_id: string
          updated_at: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          campaign_id: string
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          instance_id?: string | null
          lead_id: string
          read_at?: string | null
          resolved_message?: string | null
          responded_at?: string | null
          response_message_id?: string | null
          retry_count?: number | null
          sent_at?: string | null
          status?: string
          tenant_id: string
          updated_at?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          campaign_id?: string
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          instance_id?: string | null
          lead_id?: string
          read_at?: string | null
          resolved_message?: string | null
          responded_at?: string | null
          response_message_id?: string | null
          retry_count?: number | null
          sent_at?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          name: string
          tenant_id: string
          updated_at: string | null
          usage_count: number | null
          variables: string[] | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name: string
          tenant_id: string
          updated_at?: string | null
          usage_count?: number | null
          variables?: string[] | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
          usage_count?: number | null
          variables?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          assignment_distribution_config_id: string | null
          assignment_mode: string
          assignment_target_id: string | null
          audience_count: number | null
          audience_filters: Json
          batch_pause_max_seconds: number | null
          batch_pause_min_seconds: number | null
          batch_size: number | null
          blocked_count: number | null
          business_hours_end: string | null
          business_hours_start: string | null
          cloud_template_id: string | null
          cloud_template_params: Json | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          daily_limit_per_instance: number | null
          delay_max_seconds: number | null
          delay_min_seconds: number | null
          delivered_count: number | null
          description: string | null
          failed_count: number | null
          hourly_limit_per_instance: number | null
          id: string
          instance_ids: string[]
          message_content: string
          message_contents: Json | null
          name: string
          pause_reason: string | null
          paused_at: string | null
          provider: string
          read_count: number | null
          responded_count: number | null
          scheduled_at: string | null
          sent_count: number | null
          started_at: string | null
          status: string
          template_id: string | null
          tenant_id: string
          total_leads: number | null
          updated_at: string | null
        }
        Insert: {
          assignment_distribution_config_id?: string | null
          assignment_mode?: string
          assignment_target_id?: string | null
          audience_count?: number | null
          audience_filters?: Json
          batch_pause_max_seconds?: number | null
          batch_pause_min_seconds?: number | null
          batch_size?: number | null
          blocked_count?: number | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          cloud_template_id?: string | null
          cloud_template_params?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          daily_limit_per_instance?: number | null
          delay_max_seconds?: number | null
          delay_min_seconds?: number | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          hourly_limit_per_instance?: number | null
          id?: string
          instance_ids?: string[]
          message_content: string
          message_contents?: Json | null
          name: string
          pause_reason?: string | null
          paused_at?: string | null
          provider?: string
          read_count?: number | null
          responded_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string
          template_id?: string | null
          tenant_id: string
          total_leads?: number | null
          updated_at?: string | null
        }
        Update: {
          assignment_distribution_config_id?: string | null
          assignment_mode?: string
          assignment_target_id?: string | null
          audience_count?: number | null
          audience_filters?: Json
          batch_pause_max_seconds?: number | null
          batch_pause_min_seconds?: number | null
          batch_size?: number | null
          blocked_count?: number | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          cloud_template_id?: string | null
          cloud_template_params?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          daily_limit_per_instance?: number | null
          delay_max_seconds?: number | null
          delay_min_seconds?: number | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          hourly_limit_per_instance?: number | null
          id?: string
          instance_ids?: string[]
          message_content?: string
          message_contents?: Json | null
          name?: string
          pause_reason?: string | null
          paused_at?: string | null
          provider?: string
          read_count?: number | null
          responded_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string
          template_id?: string | null
          tenant_id?: string
          total_leads?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_assignment_distribution_config_id_fkey"
            columns: ["assignment_distribution_config_id"]
            isOneToOne: false
            referencedRelation: "lead_distribution_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_assignment_target_id_fkey"
            columns: ["assignment_target_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_cloud_template_id_fkey"
            columns: ["cloud_template_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_cloud_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "campaign_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_configs: {
        Row: {
          created_at: string | null
          display_name: string
          id: string
          model: string
          provider: string | null
          slug: string
          system_prompt: string
          temperature: number | null
          tenant_id: string
          tools: Json | null
          top_p: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id?: string
          model?: string
          provider?: string | null
          slug: string
          system_prompt: string
          temperature?: number | null
          tenant_id?: string
          tools?: Json | null
          top_p?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: string
          model?: string
          provider?: string | null
          slug?: string
          system_prompt?: string
          temperature?: number | null
          tenant_id?: string
          tools?: Json | null
          top_p?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_configs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_configurations: {
        Row: {
          config_data: Json | null
          config_type: string
          created_at: string | null
          id: number
          organization_id: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          config_data?: Json | null
          config_type: string
          created_at?: string | null
          id?: number
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          config_data?: Json | null
          config_type?: string
          created_at?: string | null
          id?: number
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_configurations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          raw: Json | null
          role: string
          session_id: string
          tenant_id: string
          token_count: number | null
          tool_name: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          raw?: Json | null
          role: string
          session_id: string
          tenant_id?: string
          token_count?: number | null
          tool_name?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          raw?: Json | null
          role?: string
          session_id?: string
          tenant_id?: string
          token_count?: number | null
          tool_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          config_id: string
          created_at: string | null
          created_by: string | null
          id: string
          last_response_id: string | null
          summary: string | null
          tenant_id: string
          title: string | null
          token_budget: number | null
          updated_at: string | null
        }
        Insert: {
          config_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_response_id?: string | null
          summary?: string | null
          tenant_id?: string
          title?: string | null
          token_budget?: number | null
          updated_at?: string | null
        }
        Update: {
          config_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_response_id?: string | null
          summary?: string | null
          tenant_id?: string
          title?: string | null
          token_budget?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "chat_configs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      client_onboarding_data: {
        Row: {
          completion_percent: number | null
          created_at: string | null
          current_stage: string | null
          data: Json | null
          id: string
          lead_id: string | null
          organization_id: string | null
          tenant_id: string
          transcript: string | null
          updated_at: string | null
        }
        Insert: {
          completion_percent?: number | null
          created_at?: string | null
          current_stage?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          organization_id?: string | null
          tenant_id: string
          transcript?: string | null
          updated_at?: string | null
        }
        Update: {
          completion_percent?: number | null
          created_at?: string | null
          current_stage?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          organization_id?: string | null
          tenant_id?: string
          transcript?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_onboarding_data_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_onboarding_data_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_onboarding_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_playbooks: {
        Row: {
          context: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          organization_id: string | null
          phases: Json
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          organization_id?: string | null
          phases?: Json
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          organization_id?: string | null
          phases?: Json
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coach_playbooks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_playbooks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_playbooks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_sessions: {
        Row: {
          alerts_triggered: number | null
          briefing: string | null
          call_id: string | null
          checklist_state: Json | null
          created_at: string | null
          current_phase_index: number | null
          ended_at: string | null
          events: Json | null
          id: string
          lead_id: string | null
          phases_completed: number | null
          playbook_id: string | null
          started_at: string | null
          suggestions_shown: number | null
          team_member_id: string | null
          tenant_id: string
        }
        Insert: {
          alerts_triggered?: number | null
          briefing?: string | null
          call_id?: string | null
          checklist_state?: Json | null
          created_at?: string | null
          current_phase_index?: number | null
          ended_at?: string | null
          events?: Json | null
          id?: string
          lead_id?: string | null
          phases_completed?: number | null
          playbook_id?: string | null
          started_at?: string | null
          suggestions_shown?: number | null
          team_member_id?: string | null
          tenant_id?: string
        }
        Update: {
          alerts_triggered?: number | null
          briefing?: string | null
          call_id?: string | null
          checklist_state?: Json | null
          created_at?: string | null
          current_phase_index?: number | null
          ended_at?: string | null
          events?: Json | null
          id?: string
          lead_id?: string | null
          phases_completed?: number | null
          playbook_id?: string | null
          started_at?: string | null
          suggestions_shown?: number | null
          team_member_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_sessions_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "call_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_playbook_id_fkey"
            columns: ["playbook_id"]
            isOneToOne: false
            referencedRelation: "coach_playbooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_rules: {
        Row: {
          calculate_on: string | null
          commission_type: string
          commission_value: number
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          payment_trigger: string
          priority: number | null
          product_id: string | null
          sales_rep_id: string | null
          tenant_id: string
          updated_at: string | null
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          calculate_on?: string | null
          commission_type: string
          commission_value: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          payment_trigger?: string
          priority?: number | null
          product_id?: string | null
          sales_rep_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          calculate_on?: string | null
          commission_type?: string
          commission_value?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          payment_trigger?: string
          priority?: number | null
          product_id?: string | null
          sales_rep_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          base_amount: number
          commission_amount: number
          commission_rule_id: string | null
          created_at: string | null
          deal_id: string
          deal_payment_id: string | null
          gateway_fee_amount: number | null
          id: string
          net_amount: number | null
          notes: string | null
          paid_at: string | null
          payment_reference: string | null
          reference_date: string | null
          sales_rep_id: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          base_amount: number
          commission_amount: number
          commission_rule_id?: string | null
          created_at?: string | null
          deal_id: string
          deal_payment_id?: string | null
          gateway_fee_amount?: number | null
          id?: string
          net_amount?: number | null
          notes?: string | null
          paid_at?: string | null
          payment_reference?: string | null
          reference_date?: string | null
          sales_rep_id: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          base_amount?: number
          commission_amount?: number
          commission_rule_id?: string | null
          created_at?: string | null
          deal_id?: string
          deal_payment_id?: string | null
          gateway_fee_amount?: number | null
          id?: string
          net_amount?: number | null
          notes?: string | null
          paid_at?: string | null
          payment_reference?: string | null
          reference_date?: string | null
          sales_rep_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_commission_rule_id_fkey"
            columns: ["commission_rule_id"]
            isOneToOne: false
            referencedRelation: "commission_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "commissions_deal_payment_id_fkey"
            columns: ["deal_payment_id"]
            isOneToOne: false
            referencedRelation: "deal_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      company_activities: {
        Row: {
          ai_generated: boolean | null
          assignee: string | null
          call_channel: string | null
          call_duration_seconds: number | null
          client_contact_method: string | null
          completed: boolean | null
          completed_at: string | null
          confirmed_by_client: boolean | null
          created_at: string | null
          created_by_id: string | null
          date: string | null
          description: string | null
          due_datetime: string | null
          end_datetime: string | null
          external_call_id: string | null
          google_calendar_synced: boolean | null
          google_event_id: string | null
          id: string
          is_all_day: boolean | null
          is_critical: boolean | null
          is_recurring: boolean
          lead_id: string | null
          meeting_id: string | null
          meeting_link: string | null
          metadata: Json | null
          name: string
          notes: string | null
          organization_id: string | null
          outcome: string | null
          parent_task_id: string | null
          participants: string[] | null
          priority: string | null
          product_id: string | null
          recording_url: string | null
          recurrence_count: number
          recurrence_interval_days: number | null
          reminder_at: string | null
          reminder_sent_at: string | null
          responsavel_id: string | null
          scheduled_at: string | null
          source_id: string | null
          source_type: string | null
          status: string | null
          task_type: string | null
          team: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          assignee?: string | null
          call_channel?: string | null
          call_duration_seconds?: number | null
          client_contact_method?: string | null
          completed?: boolean | null
          completed_at?: string | null
          confirmed_by_client?: boolean | null
          created_at?: string | null
          created_by_id?: string | null
          date?: string | null
          description?: string | null
          due_datetime?: string | null
          end_datetime?: string | null
          external_call_id?: string | null
          google_calendar_synced?: boolean | null
          google_event_id?: string | null
          id?: string
          is_all_day?: boolean | null
          is_critical?: boolean | null
          is_recurring?: boolean
          lead_id?: string | null
          meeting_id?: string | null
          meeting_link?: string | null
          metadata?: Json | null
          name: string
          notes?: string | null
          organization_id?: string | null
          outcome?: string | null
          parent_task_id?: string | null
          participants?: string[] | null
          priority?: string | null
          product_id?: string | null
          recording_url?: string | null
          recurrence_count?: number
          recurrence_interval_days?: number | null
          reminder_at?: string | null
          reminder_sent_at?: string | null
          responsavel_id?: string | null
          scheduled_at?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          task_type?: string | null
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          assignee?: string | null
          call_channel?: string | null
          call_duration_seconds?: number | null
          client_contact_method?: string | null
          completed?: boolean | null
          completed_at?: string | null
          confirmed_by_client?: boolean | null
          created_at?: string | null
          created_by_id?: string | null
          date?: string | null
          description?: string | null
          due_datetime?: string | null
          end_datetime?: string | null
          external_call_id?: string | null
          google_calendar_synced?: boolean | null
          google_event_id?: string | null
          id?: string
          is_all_day?: boolean | null
          is_critical?: boolean | null
          is_recurring?: boolean
          lead_id?: string | null
          meeting_id?: string | null
          meeting_link?: string | null
          metadata?: Json | null
          name?: string
          notes?: string | null
          organization_id?: string | null
          outcome?: string | null
          parent_task_id?: string | null
          participants?: string[] | null
          priority?: string | null
          product_id?: string | null
          recording_url?: string | null
          recurrence_count?: number
          recurrence_interval_days?: number | null
          reminder_at?: string | null
          reminder_sent_at?: string | null
          responsavel_id?: string | null
          scheduled_at?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          task_type?: string | null
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_activities_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_activities_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_activities_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_activities_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_activity_meeting"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parent_task"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "company_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      config: {
        Row: {
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      config_audit_log: {
        Row: {
          action: string
          changed_by_name: string | null
          changed_by_user_id: string | null
          changed_fields: string[] | null
          created_at: string | null
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string
          table_name: string
          tenant_id: string | null
        }
        Insert: {
          action: string
          changed_by_name?: string | null
          changed_by_user_id?: string | null
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id: string
          table_name: string
          tenant_id?: string | null
        }
        Update: {
          action?: string
          changed_by_name?: string | null
          changed_by_user_id?: string | null
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string
          table_name?: string
          tenant_id?: string | null
        }
        Relationships: []
      }
      cs_conversation_handled: {
        Row: {
          group_id: string | null
          handled_at: string | null
          handled_by: string | null
          id: string
          lead_id: string | null
          notes: string | null
          reason: string | null
          tenant_id: string
        }
        Insert: {
          group_id?: string | null
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          reason?: string | null
          tenant_id?: string
        }
        Update: {
          group_id?: string | null
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          reason?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_conversation_handled_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_handled_handled_by_fkey"
            columns: ["handled_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_handled_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_handled_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_conversation_notes: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          group_id: string | null
          id: string
          is_pinned: boolean | null
          lead_id: string | null
          note_type: string | null
          tenant_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          is_pinned?: boolean | null
          lead_id?: string | null
          note_type?: string | null
          tenant_id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          is_pinned?: boolean | null
          lead_id?: string | null
          note_type?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_conversation_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_notes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_conversation_notes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_engagement_metrics: {
        Row: {
          id: string
          member_area_completed_lessons: number | null
          member_area_last_access: string | null
          member_area_time_spent_minutes: number | null
          member_area_total_lessons: number | null
          organization_id: string
          product_features_used: Json | null
          product_id: string
          product_last_login: string | null
          product_total_logins: number | null
          tenant_id: string
          updated_at: string | null
          whatsapp_group_last_message: string | null
          whatsapp_group_total_messages: number | null
          whatsapp_support_last_message: string | null
          whatsapp_support_total_tickets: number | null
          zoom_last_participation: string | null
          zoom_total_minutes: number | null
          zoom_total_participations: number | null
        }
        Insert: {
          id?: string
          member_area_completed_lessons?: number | null
          member_area_last_access?: string | null
          member_area_time_spent_minutes?: number | null
          member_area_total_lessons?: number | null
          organization_id: string
          product_features_used?: Json | null
          product_id: string
          product_last_login?: string | null
          product_total_logins?: number | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_group_last_message?: string | null
          whatsapp_group_total_messages?: number | null
          whatsapp_support_last_message?: string | null
          whatsapp_support_total_tickets?: number | null
          zoom_last_participation?: string | null
          zoom_total_minutes?: number | null
          zoom_total_participations?: number | null
        }
        Update: {
          id?: string
          member_area_completed_lessons?: number | null
          member_area_last_access?: string | null
          member_area_time_spent_minutes?: number | null
          member_area_total_lessons?: number | null
          organization_id?: string
          product_features_used?: Json | null
          product_id?: string
          product_last_login?: string | null
          product_total_logins?: number | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_group_last_message?: string | null
          whatsapp_group_total_messages?: number | null
          whatsapp_support_last_message?: string | null
          whatsapp_support_total_tickets?: number | null
          zoom_last_participation?: string | null
          zoom_total_minutes?: number | null
          zoom_total_participations?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_engagement_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_engagement_metrics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_engagement_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_connections: {
        Row: {
          created_at: string
          event_id: string
          id: string
          requester_rsvp_id: string
          status: string
          target_rsvp_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          requester_rsvp_id: string
          status?: string
          target_rsvp_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          requester_rsvp_id?: string
          status?: string
          target_rsvp_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_connections_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_connections_requester_rsvp_id_fkey"
            columns: ["requester_rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_connections_target_rsvp_id_fkey"
            columns: ["target_rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_feed_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          rsvp_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          rsvp_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          rsvp_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_feed_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "cs_event_feed_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_feed_likes_rsvp_id_fkey"
            columns: ["rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_feed_posts: {
        Row: {
          author_avatar_url: string | null
          author_name: string
          content: string
          created_at: string
          event_id: string
          id: string
          image_urls: string[] | null
          is_pinned: boolean | null
          likes_count: number | null
          updated_at: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_name: string
          content: string
          created_at?: string
          event_id: string
          id?: string
          image_urls?: string[] | null
          is_pinned?: boolean | null
          likes_count?: number | null
          updated_at?: string
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string
          content?: string
          created_at?: string
          event_id?: string
          id?: string
          image_urls?: string[] | null
          is_pinned?: boolean | null
          likes_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_feed_posts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_materials: {
        Row: {
          available_after: string | null
          category: string | null
          created_at: string
          description: string | null
          event_id: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          schedule_item_id: string | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          available_after?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          event_id: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          schedule_item_id?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          available_after?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          event_id?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          schedule_item_id?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_materials_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_materials_schedule_item_id_fkey"
            columns: ["schedule_item_id"]
            isOneToOne: false
            referencedRelation: "cs_event_schedule_items"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_participant_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          display_name: string
          event_id: string
          id: string
          interests: string[] | null
          job_title: string | null
          linkedin_url: string | null
          rsvp_id: string
          show_email: boolean | null
          show_linkedin: boolean | null
          show_phone: boolean | null
          skills: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name: string
          event_id: string
          id?: string
          interests?: string[] | null
          job_title?: string | null
          linkedin_url?: string | null
          rsvp_id: string
          show_email?: boolean | null
          show_linkedin?: boolean | null
          show_phone?: boolean | null
          skills?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name?: string
          event_id?: string
          id?: string
          interests?: string[] | null
          job_title?: string | null
          linkedin_url?: string | null
          rsvp_id?: string
          show_email?: boolean | null
          show_linkedin?: boolean | null
          show_phone?: boolean | null
          skills?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_participant_profiles_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_participant_profiles_rsvp_id_fkey"
            columns: ["rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_participant_sessions: {
        Row: {
          created_at: string
          event_id: string
          expires_at: string
          id: string
          last_seen_at: string | null
          rsvp_id: string
          token: string
        }
        Insert: {
          created_at?: string
          event_id: string
          expires_at?: string
          id?: string
          last_seen_at?: string | null
          rsvp_id: string
          token: string
        }
        Update: {
          created_at?: string
          event_id?: string
          expires_at?: string
          id?: string
          last_seen_at?: string | null
          rsvp_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_participant_sessions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_participant_sessions_rsvp_id_fkey"
            columns: ["rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_rsvps: {
        Row: {
          checked_in_at: string | null
          checked_in_by: string | null
          companion_checked_in: boolean | null
          companion_checked_in_at: string | null
          companion_email: string | null
          companion_name: string | null
          companion_phone: string | null
          confirmed_at: string | null
          created_at: string | null
          custom_answers: Json | null
          dietary_restrictions: string | null
          event_id: string
          guest_company: string | null
          guest_email: string
          guest_name: string
          guest_phone: string | null
          has_companion: boolean | null
          id: string
          is_client: boolean | null
          lead_id: string | null
          notes: string | null
          organization_id: string | null
          rsvp_status: string
          source: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          checked_in_at?: string | null
          checked_in_by?: string | null
          companion_checked_in?: boolean | null
          companion_checked_in_at?: string | null
          companion_email?: string | null
          companion_name?: string | null
          companion_phone?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          custom_answers?: Json | null
          dietary_restrictions?: string | null
          event_id: string
          guest_company?: string | null
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          has_companion?: boolean | null
          id?: string
          is_client?: boolean | null
          lead_id?: string | null
          notes?: string | null
          organization_id?: string | null
          rsvp_status?: string
          source?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          checked_in_at?: string | null
          checked_in_by?: string | null
          companion_checked_in?: boolean | null
          companion_checked_in_at?: string | null
          companion_email?: string | null
          companion_name?: string | null
          companion_phone?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          custom_answers?: Json | null
          dietary_restrictions?: string | null
          event_id?: string
          guest_company?: string | null
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          has_companion?: boolean | null
          id?: string
          is_client?: boolean | null
          lead_id?: string | null
          notes?: string | null
          organization_id?: string | null
          rsvp_status?: string
          source?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_rsvps_checked_in_by_fkey"
            columns: ["checked_in_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_rsvps_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_rsvps_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_rsvps_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_schedule_bookmarks: {
        Row: {
          created_at: string
          id: string
          rsvp_id: string
          schedule_item_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rsvp_id: string
          schedule_item_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rsvp_id?: string
          schedule_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_schedule_bookmarks_rsvp_id_fkey"
            columns: ["rsvp_id"]
            isOneToOne: false
            referencedRelation: "cs_event_rsvps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_event_schedule_bookmarks_schedule_item_id_fkey"
            columns: ["schedule_item_id"]
            isOneToOne: false
            referencedRelation: "cs_event_schedule_items"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_event_schedule_items: {
        Row: {
          category: string | null
          created_at: string
          day_date: string
          description: string | null
          end_time: string
          event_id: string
          id: string
          room: string | null
          sort_order: number | null
          speaker_avatar_url: string | null
          speaker_name: string | null
          speaker_title: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          day_date: string
          description?: string | null
          end_time: string
          event_id: string
          id?: string
          room?: string | null
          sort_order?: number | null
          speaker_avatar_url?: string | null
          speaker_name?: string | null
          speaker_title?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          day_date?: string
          description?: string | null
          end_time?: string
          event_id?: string
          id?: string
          room?: string | null
          sort_order?: number | null
          speaker_avatar_url?: string | null
          speaker_name?: string | null
          speaker_title?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_event_schedule_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cs_events"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_events: {
        Row: {
          allow_companion: boolean | null
          banner_url: string | null
          capacity: number | null
          created_at: string | null
          created_by: string | null
          custom_questions: Json | null
          description: string | null
          end_date: string | null
          end_time: string | null
          guide_url: string | null
          id: string
          is_online: boolean | null
          location: string | null
          location_details: string | null
          max_companions_per_guest: number | null
          name: string
          online_link: string | null
          product_id: string | null
          rsvp_deadline: string | null
          rsvp_enabled: boolean | null
          rsvp_token: string
          settings: Json | null
          slug: string | null
          start_date: string
          start_time: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          allow_companion?: boolean | null
          banner_url?: string | null
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          custom_questions?: Json | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          guide_url?: string | null
          id?: string
          is_online?: boolean | null
          location?: string | null
          location_details?: string | null
          max_companions_per_guest?: number | null
          name: string
          online_link?: string | null
          product_id?: string | null
          rsvp_deadline?: string | null
          rsvp_enabled?: boolean | null
          rsvp_token?: string
          settings?: Json | null
          slug?: string | null
          start_date: string
          start_time?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          allow_companion?: boolean | null
          banner_url?: string | null
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          custom_questions?: Json | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          guide_url?: string | null
          id?: string
          is_online?: boolean | null
          location?: string | null
          location_details?: string | null
          max_companions_per_guest?: number | null
          name?: string
          online_link?: string | null
          product_id?: string | null
          rsvp_deadline?: string | null
          rsvp_enabled?: boolean | null
          rsvp_token?: string
          settings?: Json | null
          slug?: string | null
          start_date?: string
          start_time?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_health_current: {
        Row: {
          engagement_score: number | null
          health_status: Database["public"]["Enums"]["health_status"]
          id: string
          objectives_score: number | null
          organization_id: string
          overall_score: number
          product_id: string
          sentiment_score: number | null
          tenant_id: string
          updated_at: string | null
          usage_score: number | null
        }
        Insert: {
          engagement_score?: number | null
          health_status: Database["public"]["Enums"]["health_status"]
          id?: string
          objectives_score?: number | null
          organization_id: string
          overall_score: number
          product_id: string
          sentiment_score?: number | null
          tenant_id?: string
          updated_at?: string | null
          usage_score?: number | null
        }
        Update: {
          engagement_score?: number | null
          health_status?: Database["public"]["Enums"]["health_status"]
          id?: string
          objectives_score?: number | null
          organization_id?: string
          overall_score?: number
          product_id?: string
          sentiment_score?: number | null
          tenant_id?: string
          updated_at?: string | null
          usage_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_health_current_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_health_current_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_health_current_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_health_scores_history: {
        Row: {
          calculated_at: string | null
          engagement_score: number | null
          health_status: Database["public"]["Enums"]["health_status"]
          id: string
          objectives_score: number | null
          organization_id: string
          overall_score: number
          product_id: string
          sentiment_score: number | null
          tenant_id: string
          usage_score: number | null
        }
        Insert: {
          calculated_at?: string | null
          engagement_score?: number | null
          health_status: Database["public"]["Enums"]["health_status"]
          id?: string
          objectives_score?: number | null
          organization_id: string
          overall_score: number
          product_id: string
          sentiment_score?: number | null
          tenant_id?: string
          usage_score?: number | null
        }
        Update: {
          calculated_at?: string | null
          engagement_score?: number | null
          health_status?: Database["public"]["Enums"]["health_status"]
          id?: string
          objectives_score?: number | null
          organization_id?: string
          overall_score?: number
          product_id?: string
          sentiment_score?: number | null
          tenant_id?: string
          usage_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_health_scores_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_health_scores_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_health_scores_history_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_inbox_metrics: {
        Row: {
          assigned_agent_id: string | null
          assigned_at: string | null
          avg_response_time_minutes: number | null
          conversation_key: string
          created_at: string | null
          first_customer_message_at: string | null
          first_response_at: string | null
          group_id: string | null
          id: string
          instance_id: string | null
          is_waiting_response: boolean | null
          last_customer_message_at: string | null
          last_response_at: string | null
          lead_id: string | null
          sla_breached_at: string | null
          sla_status: string | null
          tenant_id: string
          total_interactions: number | null
          total_messages_received: number | null
          total_messages_sent: number | null
          total_sla_breaches: number | null
          updated_at: string | null
          wait_started_at: string | null
        }
        Insert: {
          assigned_agent_id?: string | null
          assigned_at?: string | null
          avg_response_time_minutes?: number | null
          conversation_key: string
          created_at?: string | null
          first_customer_message_at?: string | null
          first_response_at?: string | null
          group_id?: string | null
          id?: string
          instance_id?: string | null
          is_waiting_response?: boolean | null
          last_customer_message_at?: string | null
          last_response_at?: string | null
          lead_id?: string | null
          sla_breached_at?: string | null
          sla_status?: string | null
          tenant_id?: string
          total_interactions?: number | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          total_sla_breaches?: number | null
          updated_at?: string | null
          wait_started_at?: string | null
        }
        Update: {
          assigned_agent_id?: string | null
          assigned_at?: string | null
          avg_response_time_minutes?: number | null
          conversation_key?: string
          created_at?: string | null
          first_customer_message_at?: string | null
          first_response_at?: string | null
          group_id?: string | null
          id?: string
          instance_id?: string | null
          is_waiting_response?: boolean | null
          last_customer_message_at?: string | null
          last_response_at?: string | null
          lead_id?: string | null
          sla_breached_at?: string | null
          sla_status?: string | null
          tenant_id?: string
          total_interactions?: number | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          total_sla_breaches?: number | null
          updated_at?: string | null
          wait_started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_inbox_metrics_assigned_agent_id_fkey"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_inbox_metrics_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_inbox_metrics_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_inbox_metrics_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_inbox_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_interactions: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          interaction_timestamp: string | null
          member_id: string | null
          metadata: Json | null
          organization_id: string
          product_id: string | null
          scheduled_at: string | null
          sentiment: Database["public"]["Enums"]["sentiment"] | null
          status: string | null
          tenant_id: string
          title: string
          type: Database["public"]["Enums"]["interaction_type"]
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_timestamp?: string | null
          member_id?: string | null
          metadata?: Json | null
          organization_id: string
          product_id?: string | null
          scheduled_at?: string | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          status?: string | null
          tenant_id?: string
          title: string
          type: Database["public"]["Enums"]["interaction_type"]
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_timestamp?: string | null
          member_id?: string | null
          metadata?: Json | null
          organization_id?: string
          product_id?: string | null
          scheduled_at?: string | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          status?: string | null
          tenant_id?: string
          title?: string
          type?: Database["public"]["Enums"]["interaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "cs_interactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_interactions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_interactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_interactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_objectives: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          days_target: number
          deadline: string
          description: string
          id: string
          metadata: Json | null
          notes: string | null
          organization_id: string
          product_id: string
          status: Database["public"]["Enums"]["objective_status"] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          days_target: number
          deadline: string
          description: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          organization_id: string
          product_id: string
          status?: Database["public"]["Enums"]["objective_status"] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          days_target?: number
          deadline?: string
          description?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          organization_id?: string
          product_id?: string
          status?: Database["public"]["Enums"]["objective_status"] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_objectives_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_objectives_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_objectives_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_objectives_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_response_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          product_id: string | null
          shortcut: string | null
          team: string | null
          tenant_id: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          product_id?: string | null
          shortcut?: string | null
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          product_id?: string | null
          shortcut?: string | null
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_response_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_response_templates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_response_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_success_metrics: {
        Row: {
          id: string
          is_success_case: boolean | null
          nps_collected_at: string | null
          nps_feedback: string | null
          nps_score: number | null
          organization_id: string
          product_id: string
          referrals_converted: number | null
          referrals_count: number | null
          referrals_target: number | null
          success_case_published_at: string | null
          success_case_url: string | null
          tenant_id: string
          testimonial_collected: boolean | null
          testimonial_content: string | null
          testimonial_date: string | null
          testimonial_rating: number | null
          testimonial_video_url: string | null
          updated_at: string | null
          upsell_date: string | null
          upsell_done: boolean | null
          upsell_product: string | null
          upsell_value: number | null
        }
        Insert: {
          id?: string
          is_success_case?: boolean | null
          nps_collected_at?: string | null
          nps_feedback?: string | null
          nps_score?: number | null
          organization_id: string
          product_id: string
          referrals_converted?: number | null
          referrals_count?: number | null
          referrals_target?: number | null
          success_case_published_at?: string | null
          success_case_url?: string | null
          tenant_id?: string
          testimonial_collected?: boolean | null
          testimonial_content?: string | null
          testimonial_date?: string | null
          testimonial_rating?: number | null
          testimonial_video_url?: string | null
          updated_at?: string | null
          upsell_date?: string | null
          upsell_done?: boolean | null
          upsell_product?: string | null
          upsell_value?: number | null
        }
        Update: {
          id?: string
          is_success_case?: boolean | null
          nps_collected_at?: string | null
          nps_feedback?: string | null
          nps_score?: number | null
          organization_id?: string
          product_id?: string
          referrals_converted?: number | null
          referrals_count?: number | null
          referrals_target?: number | null
          success_case_published_at?: string | null
          success_case_url?: string | null
          tenant_id?: string
          testimonial_collected?: boolean | null
          testimonial_content?: string | null
          testimonial_date?: string | null
          testimonial_rating?: number | null
          testimonial_video_url?: string | null
          updated_at?: string | null
          upsell_date?: string | null
          upsell_done?: boolean | null
          upsell_product?: string | null
          upsell_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_success_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_success_metrics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_success_metrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_touchpoints: {
        Row: {
          channel: Database["public"]["Enums"]["touchpoint_channel"]
          checkpoint_day: number | null
          created_at: string | null
          created_by: string | null
          follow_up_deadline: string | null
          id: string
          metadata: Json | null
          next_action: string | null
          next_contact_date: string | null
          organization_id: string
          product_id: string
          sentiment: Database["public"]["Enums"]["sentiment"] | null
          source: string | null
          status: string | null
          summary: string
          tenant_id: string
          touchpoint_date: string
          type: Database["public"]["Enums"]["touchpoint_type"]
          updated_at: string | null
        }
        Insert: {
          channel: Database["public"]["Enums"]["touchpoint_channel"]
          checkpoint_day?: number | null
          created_at?: string | null
          created_by?: string | null
          follow_up_deadline?: string | null
          id?: string
          metadata?: Json | null
          next_action?: string | null
          next_contact_date?: string | null
          organization_id: string
          product_id: string
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          source?: string | null
          status?: string | null
          summary: string
          tenant_id?: string
          touchpoint_date: string
          type: Database["public"]["Enums"]["touchpoint_type"]
          updated_at?: string | null
        }
        Update: {
          channel?: Database["public"]["Enums"]["touchpoint_channel"]
          checkpoint_day?: number | null
          created_at?: string | null
          created_by?: string | null
          follow_up_deadline?: string | null
          id?: string
          metadata?: Json | null
          next_action?: string | null
          next_contact_date?: string | null
          organization_id?: string
          product_id?: string
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          source?: string | null
          status?: string | null
          summary?: string
          tenant_id?: string
          touchpoint_date?: string
          type?: Database["public"]["Enums"]["touchpoint_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_touchpoints_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_touchpoints_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_touchpoints_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_touchpoints_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_contacts: {
        Row: {
          created_at: string | null
          deal_id: string
          id: string
          is_primary: boolean | null
          lead_id: string
          notes: string | null
          role: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deal_id: string
          id?: string
          is_primary?: boolean | null
          lead_id: string
          notes?: string | null
          role?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deal_id?: string
          id?: string
          is_primary?: boolean | null
          lead_id?: string
          notes?: string | null
          role?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_contacts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_contacts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "deal_contacts_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_contacts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_loss_reasons: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          position: number | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          position?: number | null
          tenant_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          position?: number | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_loss_reasons_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_negotiation_details: {
        Row: {
          created_at: string
          deal_id: string
          entrada_completa: boolean
          garantia_cdc: boolean
          garantia_cdc_inicio: string | null
          id: string
          observacoes_cs: string | null
          tenant_id: string
          updated_at: string
          valor_faltante: number
        }
        Insert: {
          created_at?: string
          deal_id: string
          entrada_completa?: boolean
          garantia_cdc?: boolean
          garantia_cdc_inicio?: string | null
          id?: string
          observacoes_cs?: string | null
          tenant_id?: string
          updated_at?: string
          valor_faltante?: number
        }
        Update: {
          created_at?: string
          deal_id?: string
          entrada_completa?: boolean
          garantia_cdc?: boolean
          garantia_cdc_inicio?: string | null
          id?: string
          observacoes_cs?: string | null
          tenant_id?: string
          updated_at?: string
          valor_faltante?: number
        }
        Relationships: [
          {
            foreignKeyName: "deal_negotiation_details_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_negotiation_details_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
        ]
      }
      deal_payment_audit_log: {
        Row: {
          change_type: string
          changed_at: string
          changed_by: string | null
          changes: Json
          deal_id: string | null
          deal_payment_id: string
          id: string
          reason: string | null
          tenant_id: string
        }
        Insert: {
          change_type?: string
          changed_at?: string
          changed_by?: string | null
          changes?: Json
          deal_id?: string | null
          deal_payment_id: string
          id?: string
          reason?: string | null
          tenant_id?: string
        }
        Update: {
          change_type?: string
          changed_at?: string
          changed_by?: string | null
          changes?: Json
          deal_id?: string | null
          deal_payment_id?: string
          id?: string
          reason?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_payment_audit_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_payment_audit_log_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_payment_audit_log_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "deal_payment_audit_log_deal_payment_id_fkey"
            columns: ["deal_payment_id"]
            isOneToOne: false
            referencedRelation: "deal_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_payment_installments: {
        Row: {
          amount: number
          asaas_installment_id: string | null
          created_at: string | null
          deal_payment_id: string
          due_date: string
          id: string
          installment_number: number
          paid_at: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          amount: number
          asaas_installment_id?: string | null
          created_at?: string | null
          deal_payment_id: string
          due_date: string
          id?: string
          installment_number: number
          paid_at?: string | null
          status?: string
          tenant_id?: string
        }
        Update: {
          amount?: number
          asaas_installment_id?: string | null
          created_at?: string | null
          deal_payment_id?: string
          due_date?: string
          id?: string
          installment_number?: number
          paid_at?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_payment_installments_deal_payment_id_fkey"
            columns: ["deal_payment_id"]
            isOneToOne: false
            referencedRelation: "deal_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_payment_installments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_payments: {
        Row: {
          amount: number
          asaas_invoice_number: string | null
          asaas_payment_id: string | null
          billing_type: string
          created_at: string | null
          deal_id: string
          description: string | null
          due_date: string
          gateway: string | null
          id: string
          installment_value: number | null
          installments: number | null
          invoice_url: string | null
          metadata: Json | null
          paid_at: string | null
          payer_lead_id: string | null
          payment_link: string | null
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          asaas_invoice_number?: string | null
          asaas_payment_id?: string | null
          billing_type: string
          created_at?: string | null
          deal_id: string
          description?: string | null
          due_date: string
          gateway?: string | null
          id?: string
          installment_value?: number | null
          installments?: number | null
          invoice_url?: string | null
          metadata?: Json | null
          paid_at?: string | null
          payer_lead_id?: string | null
          payment_link?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          asaas_invoice_number?: string | null
          asaas_payment_id?: string | null
          billing_type?: string
          created_at?: string | null
          deal_id?: string
          description?: string | null
          due_date?: string
          gateway?: string | null
          id?: string
          installment_value?: number | null
          installments?: number | null
          invoice_url?: string | null
          metadata?: Json | null
          paid_at?: string | null
          payer_lead_id?: string | null
          payment_link?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_payments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_payments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "deal_payments_payer_lead_id_fkey"
            columns: ["payer_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_payments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          ai_proposal_suggestion: Json | null
          ai_win_probability: number | null
          created_at: string | null
          discount_percent: number | null
          discount_reason: string | null
          expected_close_date: string | null
          id: string
          installments: number | null
          lead_id: string
          lost_at: string | null
          lost_reason: string | null
          metadata: Json | null
          negotiated_price: number | null
          notes: string | null
          original_price: number | null
          payment_method: string | null
          payment_status: string | null
          pipeline_id: string | null
          pipeline_stage_id: string | null
          product_id: string | null
          proposal_sent_at: string | null
          proposal_url: string | null
          sales_rep_id: string | null
          sdr_id: string | null
          stage_changed_at: string | null
          status: string | null
          tenant_id: string
          title: string | null
          total_paid: number | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_source: string | null
          vehicle_id: string | null
          won_at: string | null
        }
        Insert: {
          ai_proposal_suggestion?: Json | null
          ai_win_probability?: number | null
          created_at?: string | null
          discount_percent?: number | null
          discount_reason?: string | null
          expected_close_date?: string | null
          id?: string
          installments?: number | null
          lead_id: string
          lost_at?: string | null
          lost_reason?: string | null
          metadata?: Json | null
          negotiated_price?: number | null
          notes?: string | null
          original_price?: number | null
          payment_method?: string | null
          payment_status?: string | null
          pipeline_id?: string | null
          pipeline_stage_id?: string | null
          product_id?: string | null
          proposal_sent_at?: string | null
          proposal_url?: string | null
          sales_rep_id?: string | null
          sdr_id?: string | null
          stage_changed_at?: string | null
          status?: string | null
          tenant_id?: string
          title?: string | null
          total_paid?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_source?: string | null
          vehicle_id?: string | null
          won_at?: string | null
        }
        Update: {
          ai_proposal_suggestion?: Json | null
          ai_win_probability?: number | null
          created_at?: string | null
          discount_percent?: number | null
          discount_reason?: string | null
          expected_close_date?: string | null
          id?: string
          installments?: number | null
          lead_id?: string
          lost_at?: string | null
          lost_reason?: string | null
          metadata?: Json | null
          negotiated_price?: number | null
          notes?: string | null
          original_price?: number | null
          payment_method?: string | null
          payment_status?: string | null
          pipeline_id?: string | null
          pipeline_stage_id?: string | null
          product_id?: string | null
          proposal_sent_at?: string | null
          proposal_url?: string | null
          sales_rep_id?: string | null
          sdr_id?: string | null
          stage_changed_at?: string | null
          status?: string | null
          tenant_id?: string
          title?: string | null
          total_paid?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_source?: string | null
          vehicle_id?: string | null
          won_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_pipeline_stage_id_fkey"
            columns: ["pipeline_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_sdr_id_fkey"
            columns: ["sdr_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      dropdown_options: {
        Row: {
          created_at: string | null
          field_type: string
          id: string
          is_system: boolean | null
          label: string
          position: number | null
          tenant_id: string
          value: string
        }
        Insert: {
          created_at?: string | null
          field_type: string
          id?: string
          is_system?: boolean | null
          label: string
          position?: number | null
          tenant_id?: string
          value: string
        }
        Update: {
          created_at?: string | null
          field_type?: string
          id?: string
          is_system?: boolean | null
          label?: string
          position?: number | null
          tenant_id?: string
          value?: string
        }
        Relationships: []
      }
      email_automation_runs: {
        Row: {
          automation_id: string | null
          completed_at: string | null
          context: Json | null
          current_node_id: string | null
          id: string
          lead_id: string | null
          scheduled_next_at: string | null
          started_at: string | null
          status: string | null
          tenant_id: string
        }
        Insert: {
          automation_id?: string | null
          completed_at?: string | null
          context?: Json | null
          current_node_id?: string | null
          id?: string
          lead_id?: string | null
          scheduled_next_at?: string | null
          started_at?: string | null
          status?: string | null
          tenant_id?: string
        }
        Update: {
          automation_id?: string | null
          completed_at?: string | null
          context?: Json | null
          current_node_id?: string | null
          id?: string
          lead_id?: string | null
          scheduled_next_at?: string | null
          started_at?: string | null
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_automation_runs_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "email_automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_automation_runs_lead_id_fkey1"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_automation_runs_legacy: {
        Row: {
          email_to: string
          error_message: string | null
          id: string
          lead_id: string | null
          resend_id: string | null
          rule_id: string
          sent_at: string
          status: string
          template_id: string | null
        }
        Insert: {
          email_to: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          resend_id?: string | null
          rule_id: string
          sent_at?: string
          status: string
          template_id?: string | null
        }
        Update: {
          email_to?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          resend_id?: string | null
          rule_id?: string
          sent_at?: string
          status?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_automation_runs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_automation_runs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "sales_automation_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_automation_runs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_automations: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          flow_json: Json | null
          id: string
          is_active: boolean | null
          name: string
          tenant_id: string
          trigger_event: string | null
          trigger_filter: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_json?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          tenant_id?: string
          trigger_event?: string | null
          trigger_filter?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_json?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          tenant_id?: string
          trigger_event?: string | null
          trigger_filter?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_automations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaign_leads: {
        Row: {
          bounced_at: string | null
          brevo_message_id: string | null
          campaign_id: string
          click_count: number | null
          clicked_at: string | null
          clicked_urls: string[] | null
          complained_at: string | null
          created_at: string | null
          delivered_at: string | null
          email: string
          error_message: string | null
          failed_at: string | null
          id: string
          lead_id: string | null
          name: string | null
          open_count: number | null
          opened_at: string | null
          sent_at: string | null
          status: string
          tenant_id: string
          unsubscribed_at: string | null
          updated_at: string | null
        }
        Insert: {
          bounced_at?: string | null
          brevo_message_id?: string | null
          campaign_id: string
          click_count?: number | null
          clicked_at?: string | null
          clicked_urls?: string[] | null
          complained_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email: string
          error_message?: string | null
          failed_at?: string | null
          id?: string
          lead_id?: string | null
          name?: string | null
          open_count?: number | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string
          tenant_id: string
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          bounced_at?: string | null
          brevo_message_id?: string | null
          campaign_id?: string
          click_count?: number | null
          clicked_at?: string | null
          clicked_urls?: string[] | null
          complained_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email?: string
          error_message?: string | null
          failed_at?: string | null
          id?: string
          lead_id?: string | null
          name?: string | null
          open_count?: number | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string
          tenant_id?: string
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          audience_filters: Json | null
          automation_id: string | null
          bounced_count: number | null
          clicked_count: number | null
          complained_count: number | null
          completed_at: string | null
          content_json: Json | null
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          description: string | null
          failed_count: number | null
          from_email: string
          from_name: string
          html_cache: string | null
          html_content: string | null
          id: string
          list_id: string | null
          name: string
          opened_count: number | null
          pause_reason: string | null
          paused_at: string | null
          preheader: string | null
          reply_to: string | null
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number | null
          settings: Json | null
          source_type: string
          started_at: string | null
          status: string
          subject: string
          template_id: string | null
          tenant_id: string
          total_bounced: number | null
          total_clicked: number | null
          total_delivered: number | null
          total_leads: number | null
          total_opened: number | null
          total_recipients: number | null
          total_sent: number | null
          total_unsubscribed: number | null
          unsubscribed_count: number | null
          updated_at: string | null
        }
        Insert: {
          audience_filters?: Json | null
          automation_id?: string | null
          bounced_count?: number | null
          clicked_count?: number | null
          complained_count?: number | null
          completed_at?: string | null
          content_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          from_email?: string
          from_name?: string
          html_cache?: string | null
          html_content?: string | null
          id?: string
          list_id?: string | null
          name: string
          opened_count?: number | null
          pause_reason?: string | null
          paused_at?: string | null
          preheader?: string | null
          reply_to?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          settings?: Json | null
          source_type?: string
          started_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
          tenant_id: string
          total_bounced?: number | null
          total_clicked?: number | null
          total_delivered?: number | null
          total_leads?: number | null
          total_opened?: number | null
          total_recipients?: number | null
          total_sent?: number | null
          total_unsubscribed?: number | null
          unsubscribed_count?: number | null
          updated_at?: string | null
        }
        Update: {
          audience_filters?: Json | null
          automation_id?: string | null
          bounced_count?: number | null
          clicked_count?: number | null
          complained_count?: number | null
          completed_at?: string | null
          content_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          from_email?: string
          from_name?: string
          html_cache?: string | null
          html_content?: string | null
          id?: string
          list_id?: string | null
          name?: string
          opened_count?: number | null
          pause_reason?: string | null
          paused_at?: string | null
          preheader?: string | null
          reply_to?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          settings?: Json | null
          source_type?: string
          started_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
          tenant_id?: string
          total_bounced?: number | null
          total_clicked?: number | null
          total_delivered?: number | null
          total_leads?: number | null
          total_opened?: number | null
          total_recipients?: number | null
          total_sent?: number | null
          total_unsubscribed?: number | null
          unsubscribed_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "email_automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "email_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json | null
          send_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          send_id?: string | null
          tenant_id?: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          send_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_events_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "email_sends"
            referencedColumns: ["id"]
          },
        ]
      }
      email_lists: {
        Row: {
          created_at: string | null
          created_by: string | null
          criteria: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          is_dynamic: boolean | null
          name: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          criteria?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_dynamic?: boolean | null
          name: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          criteria?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_dynamic?: boolean | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_lists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sends: {
        Row: {
          automation_run_id: string | null
          bounce_reason: string | null
          bounced_at: string | null
          campaign_id: string | null
          click_count: number | null
          clicked_at: string | null
          clicked_url: string | null
          created_at: string | null
          delivered_at: string | null
          device_type: string | null
          email: string
          error_message: string | null
          html: string | null
          id: string
          lead_id: string | null
          open_count: number | null
          opened_at: string | null
          resend_id: string | null
          sent_at: string | null
          status: string | null
          tenant_id: string
          unsubscribed_at: string | null
          user_agent: string | null
        }
        Insert: {
          automation_run_id?: string | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          click_count?: number | null
          clicked_at?: string | null
          clicked_url?: string | null
          created_at?: string | null
          delivered_at?: string | null
          device_type?: string | null
          email: string
          error_message?: string | null
          html?: string | null
          id?: string
          lead_id?: string | null
          open_count?: number | null
          opened_at?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id?: string
          unsubscribed_at?: string | null
          user_agent?: string | null
        }
        Update: {
          automation_run_id?: string | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          click_count?: number | null
          clicked_at?: string | null
          clicked_url?: string | null
          created_at?: string | null
          delivered_at?: string | null
          device_type?: string | null
          email?: string
          error_message?: string | null
          html?: string | null
          id?: string
          lead_id?: string | null
          open_count?: number | null
          opened_at?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id?: string
          unsubscribed_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequence_enrollments: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: number | null
          email: string
          enrolled_at: string | null
          exit_reason: string | null
          id: string
          lead_id: string | null
          name: string | null
          next_step_at: string | null
          sequence_id: string
          status: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          email: string
          enrolled_at?: string | null
          exit_reason?: string | null
          id?: string
          lead_id?: string | null
          name?: string | null
          next_step_at?: string | null
          sequence_id: string
          status?: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: number | null
          email?: string
          enrolled_at?: string | null
          exit_reason?: string | null
          id?: string
          lead_id?: string | null
          name?: string | null
          next_step_at?: string | null
          sequence_id?: string
          status?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sequence_enrollments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_enrollments_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequence_logs: {
        Row: {
          bounced_at: string | null
          brevo_message_id: string | null
          clicked_at: string | null
          created_at: string | null
          delivered_at: string | null
          email: string
          enrollment_id: string
          error_message: string | null
          id: string
          lead_id: string | null
          opened_at: string | null
          sent_at: string | null
          sequence_id: string
          status: string
          step_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          bounced_at?: string | null
          brevo_message_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email: string
          enrollment_id: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          sent_at?: string | null
          sequence_id: string
          status?: string
          step_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          bounced_at?: string | null
          brevo_message_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email?: string
          enrollment_id?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          sent_at?: string | null
          sequence_id?: string
          status?: string
          step_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sequence_logs_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "email_sequence_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_logs_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_logs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "email_sequence_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequence_steps: {
        Row: {
          clicked_count: number | null
          created_at: string | null
          delay_days: number | null
          delay_hours: number | null
          html_content: string | null
          id: string
          opened_count: number | null
          sent_count: number | null
          sequence_id: string
          skip_if_clicked: boolean | null
          skip_if_opened: boolean | null
          step_order: number
          subject: string
          template_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          clicked_count?: number | null
          created_at?: string | null
          delay_days?: number | null
          delay_hours?: number | null
          html_content?: string | null
          id?: string
          opened_count?: number | null
          sent_count?: number | null
          sequence_id: string
          skip_if_clicked?: boolean | null
          skip_if_opened?: boolean | null
          step_order?: number
          subject?: string
          template_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          clicked_count?: number | null
          created_at?: string | null
          delay_days?: number | null
          delay_hours?: number | null
          html_content?: string | null
          id?: string
          opened_count?: number | null
          sent_count?: number | null
          sequence_id?: string
          skip_if_clicked?: boolean | null
          skip_if_opened?: boolean | null
          step_order?: number
          subject?: string
          template_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_steps_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          exit_on_bounce: boolean | null
          exit_on_deal_won: boolean | null
          exit_on_reply: boolean | null
          exit_on_unsubscribe: boolean | null
          from_email: string
          from_name: string
          id: string
          name: string
          reply_to: string | null
          status: string
          tenant_id: string
          total_completed: number | null
          total_enrolled: number | null
          total_exited: number | null
          trigger_config: Json | null
          trigger_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          exit_on_bounce?: boolean | null
          exit_on_deal_won?: boolean | null
          exit_on_reply?: boolean | null
          exit_on_unsubscribe?: boolean | null
          from_email?: string
          from_name?: string
          id?: string
          name: string
          reply_to?: string | null
          status?: string
          tenant_id: string
          total_completed?: number | null
          total_enrolled?: number | null
          total_exited?: number | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          exit_on_bounce?: boolean | null
          exit_on_deal_won?: boolean | null
          exit_on_reply?: boolean | null
          exit_on_unsubscribe?: boolean | null
          from_email?: string
          from_name?: string
          id?: string
          name?: string
          reply_to?: string | null
          status?: string
          tenant_id?: string
          total_completed?: number | null
          total_enrolled?: number | null
          total_exited?: number | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          bounce_reason: string | null
          consent_at: string | null
          consent_ip: string | null
          consent_source: string | null
          created_at: string | null
          email: string
          id: string
          lead_id: string | null
          status: string
          tenant_id: string
          unsubscribe_token: string | null
          unsubscribed_at: string | null
          updated_at: string | null
        }
        Insert: {
          bounce_reason?: string | null
          consent_at?: string | null
          consent_ip?: string | null
          consent_source?: string | null
          created_at?: string | null
          email: string
          id?: string
          lead_id?: string | null
          status?: string
          tenant_id?: string
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          bounce_reason?: string | null
          consent_at?: string | null
          consent_ip?: string | null
          consent_source?: string | null
          created_at?: string | null
          email?: string
          id?: string
          lead_id?: string | null
          status?: string
          tenant_id?: string
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_subscribers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          category: string | null
          content_json: Json | null
          created_at: string | null
          created_by: string | null
          design_json: Json | null
          html_content: string
          id: string
          is_active: boolean | null
          last_used_at: string | null
          name: string
          preheader: string | null
          subject: string
          tenant_id: string
          text_content: string | null
          thumbnail_url: string | null
          updated_at: string | null
          usage_count: number | null
          variables: string[] | null
        }
        Insert: {
          category?: string | null
          content_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          design_json?: Json | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name: string
          preheader?: string | null
          subject?: string
          tenant_id: string
          text_content?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          usage_count?: number | null
          variables?: string[] | null
        }
        Update: {
          category?: string | null
          content_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          design_json?: Json | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          name?: string
          preheader?: string | null
          subject?: string
          tenant_id?: string
          text_content?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          usage_count?: number | null
          variables?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      email_unsubscribes: {
        Row: {
          created_at: string | null
          email: string
          id: string
          lead_id: string | null
          reason: string | null
          source: string | null
          tenant_id: string
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          lead_id?: string | null
          reason?: string | null
          source?: string | null
          tenant_id: string
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          lead_id?: string | null
          reason?: string | null
          source?: string | null
          tenant_id?: string
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_unsubscribes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          created_at: string | null
          id: string
          lead_id: string | null
          tenant_id: string
          total_duration_minutes: number | null
          webinar_config_id: string | null
        }
        Insert: {
          attended?: boolean | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          tenant_id?: string
          total_duration_minutes?: number | null
          webinar_config_id?: string | null
        }
        Update: {
          attended?: boolean | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          tenant_id?: string
          total_duration_minutes?: number | null
          webinar_config_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          institution: string | null
          is_active: boolean | null
          is_default: boolean | null
          name: string
          position: number | null
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          institution?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          position?: number | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          institution?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          position?: number | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_system: boolean | null
          name: string
          parent_id: string | null
          position: number | null
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name: string
          parent_id?: string | null
          position?: number | null
          tenant_id?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name?: string
          parent_id?: string | null
          position?: number | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "financial_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_entries: {
        Row: {
          amount: number
          category_id: string
          created_at: string | null
          created_by: string | null
          description: string
          due_date: string | null
          entry_date: string
          financial_account_id: string | null
          id: string
          metadata: Json | null
          notes: string | null
          paid_at: string | null
          payment_method: string | null
          receipt_url: string | null
          recurrence: string | null
          recurrence_end_date: string | null
          status: string | null
          tags: string[] | null
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          category_id: string
          created_at?: string | null
          created_by?: string | null
          description: string
          due_date?: string | null
          entry_date: string
          financial_account_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurrence?: string | null
          recurrence_end_date?: string | null
          status?: string | null
          tags?: string[] | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          due_date?: string | null
          entry_date?: string
          financial_account_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurrence?: string | null
          recurrence_end_date?: string | null
          status?: string | null
          tags?: string[] | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_entries_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "financial_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_entries_financial_account_id_fkey"
            columns: ["financial_account_id"]
            isOneToOne: false
            referencedRelation: "financial_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_entries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_campaigns: {
        Row: {
          also_distribute_to_sellers: boolean
          api_key: string
          created_at: string
          id: string
          is_active: boolean
          message_template: string
          min_capital_tier: string
          name: string
          tenant_id: string
          updated_at: string
          whatsapp_instance_id: string | null
        }
        Insert: {
          also_distribute_to_sellers?: boolean
          api_key?: string
          created_at?: string
          id?: string
          is_active?: boolean
          message_template?: string
          min_capital_tier?: string
          name: string
          tenant_id?: string
          updated_at?: string
          whatsapp_instance_id?: string | null
        }
        Update: {
          also_distribute_to_sellers?: boolean
          api_key?: string
          created_at?: string
          id?: string
          is_active?: boolean
          message_template?: string
          min_capital_tier?: string
          name?: string
          tenant_id?: string
          updated_at?: string
          whatsapp_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franchise_campaigns_whatsapp_instance_id_fkey"
            columns: ["whatsapp_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_distribution_log: {
        Row: {
          campaign_id: string
          created_at: string
          franchise_member_id: string
          id: string
          lead_id: string | null
          tenant_id: string
          whatsapp_error: string | null
          whatsapp_sent: boolean | null
        }
        Insert: {
          campaign_id: string
          created_at?: string
          franchise_member_id: string
          id?: string
          lead_id?: string | null
          tenant_id?: string
          whatsapp_error?: string | null
          whatsapp_sent?: boolean | null
        }
        Update: {
          campaign_id?: string
          created_at?: string
          franchise_member_id?: string
          id?: string
          lead_id?: string | null
          tenant_id?: string
          whatsapp_error?: string | null
          whatsapp_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "franchise_distribution_log_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "franchise_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "franchise_distribution_log_franchise_member_id_fkey"
            columns: ["franchise_member_id"]
            isOneToOne: false
            referencedRelation: "franchise_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "franchise_distribution_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_members: {
        Row: {
          campaign_id: string
          cities: string[] | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          phone: string
          position: number
          tenant_id: string
          updated_at: string
          utm_identifier: string | null
        }
        Insert: {
          campaign_id: string
          cities?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          phone: string
          position?: number
          tenant_id?: string
          updated_at?: string
          utm_identifier?: string | null
        }
        Update: {
          campaign_id?: string
          cities?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          phone?: string
          position?: number
          tenant_id?: string
          updated_at?: string
          utm_identifier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franchise_members_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "franchise_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      google_ads_accounts: {
        Row: {
          account_id: string
          account_name: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_synced_date: string | null
          organization_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_date?: string | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_date?: string | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_ads_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      google_ads_campaign_data: {
        Row: {
          account_id: string
          average_cpc_micros: number | null
          campaign_id: string
          campaign_name: string | null
          campaign_status: string | null
          clicks: number | null
          conversions: number | null
          cost_micros: number | null
          created_at: string | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          organization_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          average_cpc_micros?: number | null
          campaign_id: string
          campaign_name?: string | null
          campaign_status?: string | null
          clicks?: number | null
          conversions?: number | null
          cost_micros?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          average_cpc_micros?: number | null
          campaign_id?: string
          campaign_name?: string | null
          campaign_status?: string | null
          clicks?: number | null
          conversions?: number | null
          cost_micros?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_ads_campaign_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      google_ads_daily_data: {
        Row: {
          account_id: string
          average_cpc_micros: number | null
          clicks: number | null
          conversions: number | null
          cost_micros: number | null
          created_at: string | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          organization_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          average_cpc_micros?: number | null
          clicks?: number | null
          conversions?: number | null
          cost_micros?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          average_cpc_micros?: number | null
          clicks?: number | null
          conversions?: number | null
          cost_micros?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_ads_daily_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      import_jobs: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string | null
          created_count: number | null
          failed_count: number | null
          file_name: string | null
          id: string
          skipped_count: number | null
          tenant_id: string
          total_rows: number | null
          updated_count: number | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          created_count?: number | null
          failed_count?: number | null
          file_name?: string | null
          id?: string
          skipped_count?: number | null
          tenant_id: string
          total_rows?: number | null
          updated_count?: number | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          created_count?: number | null
          failed_count?: number | null
          file_name?: string | null
          id?: string
          skipped_count?: number | null
          tenant_id?: string
          total_rows?: number | null
          updated_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "import_jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_business_accounts: {
        Row: {
          access_token: string
          biography: string | null
          created_at: string | null
          facebook_page_id: string | null
          followers_count: number | null
          id: string
          instagram_business_id: string | null
          instagram_username: string
          name: string
          profile_picture_url: string | null
          status: string | null
          teams: string[] | null
          tenant_id: string
          token_expires_at: string | null
          updated_at: string | null
          webhook_verify_token: string | null
        }
        Insert: {
          access_token: string
          biography?: string | null
          created_at?: string | null
          facebook_page_id?: string | null
          followers_count?: number | null
          id?: string
          instagram_business_id?: string | null
          instagram_username: string
          name: string
          profile_picture_url?: string | null
          status?: string | null
          teams?: string[] | null
          tenant_id?: string
          token_expires_at?: string | null
          updated_at?: string | null
          webhook_verify_token?: string | null
        }
        Update: {
          access_token?: string
          biography?: string | null
          created_at?: string | null
          facebook_page_id?: string | null
          followers_count?: number | null
          id?: string
          instagram_business_id?: string | null
          instagram_username?: string
          name?: string
          profile_picture_url?: string | null
          status?: string | null
          teams?: string[] | null
          tenant_id?: string
          token_expires_at?: string | null
          updated_at?: string | null
          webhook_verify_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instagram_business_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_comments: {
        Row: {
          account_id: string
          author_instagram_id: string
          author_name: string | null
          author_profile_pic: string | null
          author_username: string | null
          comment_id: string
          commented_at: string
          content: string
          created_at: string | null
          id: string
          lead_id: string | null
          parent_comment_id: string | null
          post_id: string
          post_thumbnail_url: string | null
          post_url: string | null
          replied_at: string | null
          replied_by: string | null
          reply_content: string | null
          status: string | null
          tenant_id: string
        }
        Insert: {
          account_id: string
          author_instagram_id: string
          author_name?: string | null
          author_profile_pic?: string | null
          author_username?: string | null
          comment_id: string
          commented_at: string
          content: string
          created_at?: string | null
          id?: string
          lead_id?: string | null
          parent_comment_id?: string | null
          post_id: string
          post_thumbnail_url?: string | null
          post_url?: string | null
          replied_at?: string | null
          replied_by?: string | null
          reply_content?: string | null
          status?: string | null
          tenant_id?: string
        }
        Update: {
          account_id?: string
          author_instagram_id?: string
          author_name?: string | null
          author_profile_pic?: string | null
          author_username?: string | null
          comment_id?: string
          commented_at?: string
          content?: string
          created_at?: string | null
          id?: string
          lead_id?: string | null
          parent_comment_id?: string | null
          post_id?: string
          post_thumbnail_url?: string | null
          post_url?: string | null
          replied_at?: string | null
          replied_by?: string | null
          reply_content?: string | null
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_comments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "instagram_business_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_comments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_comments_replied_by_fkey"
            columns: ["replied_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_comments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_conversations: {
        Row: {
          account_id: string
          assigned_to: string | null
          avg_response_time_minutes: number | null
          created_at: string | null
          first_response_at: string | null
          id: string
          last_agent_message_at: string | null
          last_client_message_at: string | null
          last_message: string | null
          last_message_at: string | null
          lead_id: string | null
          metadata: Json | null
          participant_instagram_id: string
          participant_name: string | null
          participant_profile_pic: string | null
          participant_username: string | null
          social_seller_stage_id: string | null
          stage_changed_at: string | null
          stage_changed_by: string | null
          status: string | null
          tenant_id: string
          thread_id: string
          total_messages: number | null
          unread_count: number | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          assigned_to?: string | null
          avg_response_time_minutes?: number | null
          created_at?: string | null
          first_response_at?: string | null
          id?: string
          last_agent_message_at?: string | null
          last_client_message_at?: string | null
          last_message?: string | null
          last_message_at?: string | null
          lead_id?: string | null
          metadata?: Json | null
          participant_instagram_id: string
          participant_name?: string | null
          participant_profile_pic?: string | null
          participant_username?: string | null
          social_seller_stage_id?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status?: string | null
          tenant_id?: string
          thread_id: string
          total_messages?: number | null
          unread_count?: number | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          assigned_to?: string | null
          avg_response_time_minutes?: number | null
          created_at?: string | null
          first_response_at?: string | null
          id?: string
          last_agent_message_at?: string | null
          last_client_message_at?: string | null
          last_message?: string | null
          last_message_at?: string | null
          lead_id?: string | null
          metadata?: Json | null
          participant_instagram_id?: string
          participant_name?: string | null
          participant_profile_pic?: string | null
          participant_username?: string | null
          social_seller_stage_id?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status?: string | null
          tenant_id?: string
          thread_id?: string
          total_messages?: number | null
          unread_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instagram_conversations_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "instagram_business_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_conversations_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_conversations_social_seller_stage_id_fkey"
            columns: ["social_seller_stage_id"]
            isOneToOne: false
            referencedRelation: "social_seller_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_conversations_stage_changed_by_fkey"
            columns: ["stage_changed_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_engagement: {
        Row: {
          account_id: string
          dms_last_30_days: number | null
          dms_last_7_days: number | null
          engagement_score: number | null
          first_interaction_at: string | null
          id: string
          interactions_last_30_days: number | null
          interactions_last_7_days: number | null
          last_comment_at: string | null
          last_dm_at: string | null
          last_interaction_at: string | null
          last_story_reply_at: string | null
          lead_id: string
          tenant_id: string
          total_comments: number | null
          total_dms: number | null
          total_post_shares: number | null
          total_story_mentions: number | null
          total_story_replies: number | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          dms_last_30_days?: number | null
          dms_last_7_days?: number | null
          engagement_score?: number | null
          first_interaction_at?: string | null
          id?: string
          interactions_last_30_days?: number | null
          interactions_last_7_days?: number | null
          last_comment_at?: string | null
          last_dm_at?: string | null
          last_interaction_at?: string | null
          last_story_reply_at?: string | null
          lead_id: string
          tenant_id?: string
          total_comments?: number | null
          total_dms?: number | null
          total_post_shares?: number | null
          total_story_mentions?: number | null
          total_story_replies?: number | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          dms_last_30_days?: number | null
          dms_last_7_days?: number | null
          engagement_score?: number | null
          first_interaction_at?: string | null
          id?: string
          interactions_last_30_days?: number | null
          interactions_last_7_days?: number | null
          last_comment_at?: string | null
          last_dm_at?: string | null
          last_interaction_at?: string | null
          last_story_reply_at?: string | null
          lead_id?: string
          tenant_id?: string
          total_comments?: number | null
          total_dms?: number | null
          total_post_shares?: number | null
          total_story_mentions?: number | null
          total_story_replies?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instagram_engagement_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "instagram_business_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_engagement_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_engagement_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string | null
          error_message: string | null
          id: string
          instagram_message_id: string | null
          is_from_me: boolean | null
          media_url: string | null
          message_type: string | null
          read_at: string | null
          reference_id: string | null
          reference_preview_url: string | null
          reference_type: string | null
          reference_url: string | null
          sender_instagram_id: string | null
          sender_username: string | null
          sent_at: string
          status: string | null
          tenant_id: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          instagram_message_id?: string | null
          is_from_me?: boolean | null
          media_url?: string | null
          message_type?: string | null
          read_at?: string | null
          reference_id?: string | null
          reference_preview_url?: string | null
          reference_type?: string | null
          reference_url?: string | null
          sender_instagram_id?: string | null
          sender_username?: string | null
          sent_at: string
          status?: string | null
          tenant_id?: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          instagram_message_id?: string | null
          is_from_me?: boolean | null
          media_url?: string | null
          message_type?: string | null
          read_at?: string | null
          reference_id?: string | null
          reference_preview_url?: string | null
          reference_type?: string | null
          reference_url?: string | null
          sender_instagram_id?: string | null
          sender_username?: string | null
          sent_at?: string
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "instagram_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instagram_messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_settings: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          provider: string
          settings: Json | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider: string
          settings?: Json | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          settings?: Json | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_conversions: {
        Row: {
          conversion_type: string
          created_at: string | null
          deal_id: string | null
          extra_data: Json | null
          id: string
          lead_id: string
          origin: string | null
          raw_payload: Json | null
          sales_rep_id: string | null
          source: string | null
          tenant_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          conversion_type?: string
          created_at?: string | null
          deal_id?: string | null
          extra_data?: Json | null
          id?: string
          lead_id: string
          origin?: string | null
          raw_payload?: Json | null
          sales_rep_id?: string | null
          source?: string | null
          tenant_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          conversion_type?: string
          created_at?: string | null
          deal_id?: string | null
          extra_data?: Json | null
          id?: string
          lead_id?: string
          origin?: string | null
          raw_payload?: Json | null
          sales_rep_id?: string | null
          source?: string | null
          tenant_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_conversions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_conversions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "lead_conversions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_conversions_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_conversions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_diagnostics_v2: {
        Row: {
          age: string | null
          ai_challenges: string | null
          ai_course_experience: string | null
          ai_knowledge_detail: string | null
          ai_knowledge_level: string | null
          biggest_dream: string | null
          business_description: string | null
          business_stage: string
          created_at: string | null
          current_activity: string | null
          event_id: string | null
          gender: string | null
          id: string
          immersion_content: string | null
          income_types: string | null
          lead_id: string
          monthly_revenue: string | null
          motivation: string | null
          other_goal: string | null
          qualification_score: number | null
          tenant_id: string
          time_consuming: string | null
          updated_at: string | null
          which_ai_course: string | null
        }
        Insert: {
          age?: string | null
          ai_challenges?: string | null
          ai_course_experience?: string | null
          ai_knowledge_detail?: string | null
          ai_knowledge_level?: string | null
          biggest_dream?: string | null
          business_description?: string | null
          business_stage: string
          created_at?: string | null
          current_activity?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          immersion_content?: string | null
          income_types?: string | null
          lead_id: string
          monthly_revenue?: string | null
          motivation?: string | null
          other_goal?: string | null
          qualification_score?: number | null
          tenant_id?: string
          time_consuming?: string | null
          updated_at?: string | null
          which_ai_course?: string | null
        }
        Update: {
          age?: string | null
          ai_challenges?: string | null
          ai_course_experience?: string | null
          ai_knowledge_detail?: string | null
          ai_knowledge_level?: string | null
          biggest_dream?: string | null
          business_description?: string | null
          business_stage?: string
          created_at?: string | null
          current_activity?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          immersion_content?: string | null
          income_types?: string | null
          lead_id?: string
          monthly_revenue?: string | null
          motivation?: string | null
          other_goal?: string | null
          qualification_score?: number | null
          tenant_id?: string
          time_consuming?: string | null
          updated_at?: string | null
          which_ai_course?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_diagnostics_v2_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_diagnostics_v2_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_distribution_config: {
        Row: {
          api_key: string
          auto_create_deal: boolean
          created_at: string
          first_stage_id: string | null
          id: string
          is_active: boolean
          method: string
          name: string
          pipeline_id: string | null
          product_id: string | null
          require_availability: boolean
          tenant_id: string
          updated_at: string
        }
        Insert: {
          api_key?: string
          auto_create_deal?: boolean
          created_at?: string
          first_stage_id?: string | null
          id?: string
          is_active?: boolean
          method?: string
          name?: string
          pipeline_id?: string | null
          product_id?: string | null
          require_availability?: boolean
          tenant_id?: string
          updated_at?: string
        }
        Update: {
          api_key?: string
          auto_create_deal?: boolean
          created_at?: string
          first_stage_id?: string | null
          id?: string
          is_active?: boolean
          method?: string
          name?: string
          pipeline_id?: string | null
          product_id?: string | null
          require_availability?: boolean
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_distribution_config_first_stage_id_fkey"
            columns: ["first_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_config_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_config_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_distribution_log: {
        Row: {
          config_id: string | null
          created_at: string
          deal_id: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          method_used: string
          source: string
          team_member_id: string | null
          tenant_id: string
        }
        Insert: {
          config_id?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          method_used?: string
          source?: string
          team_member_id?: string | null
          tenant_id?: string
        }
        Update: {
          config_id?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          method_used?: string
          source?: string
          team_member_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_distribution_log_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "lead_distribution_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_log_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_distribution_members: {
        Row: {
          config_id: string
          id: string
          is_active: boolean
          position: number
          team_member_id: string
          tenant_id: string
          weight: number
        }
        Insert: {
          config_id: string
          id?: string
          is_active?: boolean
          position?: number
          team_member_id: string
          tenant_id?: string
          weight?: number
        }
        Update: {
          config_id?: string
          id?: string
          is_active?: boolean
          position?: number
          team_member_id?: string
          tenant_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "lead_distribution_members_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "lead_distribution_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_members_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_distribution_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_webinar_enrollments: {
        Row: {
          created_at: string | null
          deal_id: string | null
          id: string
          lead_id: string | null
          tenant_id: string
          webinar_config_id: string | null
        }
        Insert: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          tenant_id?: string
          webinar_config_id?: string | null
        }
        Update: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          tenant_id?: string
          webinar_config_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_webinar_enrollments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_webinar_enrollments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "lead_webinar_enrollments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_webinar_enrollments_webinar_config_id_fkey"
            columns: ["webinar_config_id"]
            isOneToOne: false
            referencedRelation: "webinar_config"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          acao_de_hoje: string | null
          address: string | null
          address_complement: string | null
          address_number: string | null
          address_province: string | null
          ai_conversation_insights: Json | null
          ai_last_analysis_at: string | null
          ai_proposal_suggestion: Json | null
          attachments: string[] | null
          bant_authority: boolean | null
          bant_budget: boolean | null
          bant_need: boolean | null
          bant_timeline: boolean | null
          business_type: string | null
          capital_disponivel: string | null
          city_name: string | null
          company_name: string | null
          context: string | null
          country: string | null
          cpf_cnpj: string | null
          created_at: string | null
          document: string | null
          email: string | null
          email_opted_out: boolean | null
          engagement_score: number | null
          etapa_funil: string | null
          evaluated_vehicles: Json | null
          expected_revenue: number | null
          external_id: string | null
          franchise_campaign_id: string | null
          franchise_member_id: string | null
          franchise_member_name: string | null
          franchise_member_phone: string | null
          gender: string | null
          id: string
          instagram: string | null
          instagram_id: string | null
          instagram_profile_id: string | null
          instagram_verified_at: string | null
          intent_buy_only: boolean | null
          intent_cash: boolean | null
          intent_finance_no_entry: boolean | null
          intent_sell: boolean | null
          intent_special_search: boolean | null
          intent_trade_in: boolean | null
          is_icp: boolean | null
          is_internal_contact: boolean | null
          job_title: string | null
          last_interaction_at: string | null
          last_message_received_at: string | null
          last_message_sent_at: string | null
          lost_reason: string | null
          melhor_horario_contato: string | null
          messages_count: number | null
          metadata: Json | null
          monthly_revenue: string | null
          name: string
          negotiation_type: string | null
          original_source: string | null
          original_utm_campaign: string | null
          original_utm_content: string | null
          original_utm_medium: string | null
          original_utm_source: string | null
          original_utm_term: string | null
          person_type: string | null
          phone: string | null
          photo_url: string | null
          pipeline_stage_id: string | null
          pode_completar_capital: boolean | null
          postal_code: string | null
          qualification: Json | null
          regiao_interesse: string | null
          region: string | null
          revenue_range: string | null
          sales_rep_id: string | null
          sales_score: number | null
          sales_score_reason: string | null
          sales_stage: string | null
          source: string | null
          stage_changed_at: string | null
          star_type: string | null
          state: string | null
          status: string | null
          status_de_resposta: string | null
          tags: string[] | null
          tenant_id: string
          timing_negocio: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          vehicle_of_interest: Json | null
          webinar_config_id: string | null
        }
        Insert: {
          acao_de_hoje?: string | null
          address?: string | null
          address_complement?: string | null
          address_number?: string | null
          address_province?: string | null
          ai_conversation_insights?: Json | null
          ai_last_analysis_at?: string | null
          ai_proposal_suggestion?: Json | null
          attachments?: string[] | null
          bant_authority?: boolean | null
          bant_budget?: boolean | null
          bant_need?: boolean | null
          bant_timeline?: boolean | null
          business_type?: string | null
          capital_disponivel?: string | null
          city_name?: string | null
          company_name?: string | null
          context?: string | null
          country?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          document?: string | null
          email?: string | null
          email_opted_out?: boolean | null
          engagement_score?: number | null
          etapa_funil?: string | null
          evaluated_vehicles?: Json | null
          expected_revenue?: number | null
          external_id?: string | null
          franchise_campaign_id?: string | null
          franchise_member_id?: string | null
          franchise_member_name?: string | null
          franchise_member_phone?: string | null
          gender?: string | null
          id?: string
          instagram?: string | null
          instagram_id?: string | null
          instagram_profile_id?: string | null
          instagram_verified_at?: string | null
          intent_buy_only?: boolean | null
          intent_cash?: boolean | null
          intent_finance_no_entry?: boolean | null
          intent_sell?: boolean | null
          intent_special_search?: boolean | null
          intent_trade_in?: boolean | null
          is_icp?: boolean | null
          is_internal_contact?: boolean | null
          job_title?: string | null
          last_interaction_at?: string | null
          last_message_received_at?: string | null
          last_message_sent_at?: string | null
          lost_reason?: string | null
          melhor_horario_contato?: string | null
          messages_count?: number | null
          metadata?: Json | null
          monthly_revenue?: string | null
          name: string
          negotiation_type?: string | null
          original_source?: string | null
          original_utm_campaign?: string | null
          original_utm_content?: string | null
          original_utm_medium?: string | null
          original_utm_source?: string | null
          original_utm_term?: string | null
          person_type?: string | null
          phone?: string | null
          photo_url?: string | null
          pipeline_stage_id?: string | null
          pode_completar_capital?: boolean | null
          postal_code?: string | null
          qualification?: Json | null
          regiao_interesse?: string | null
          region?: string | null
          revenue_range?: string | null
          sales_rep_id?: string | null
          sales_score?: number | null
          sales_score_reason?: string | null
          sales_stage?: string | null
          source?: string | null
          stage_changed_at?: string | null
          star_type?: string | null
          state?: string | null
          status?: string | null
          status_de_resposta?: string | null
          tags?: string[] | null
          tenant_id?: string
          timing_negocio?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vehicle_of_interest?: Json | null
          webinar_config_id?: string | null
        }
        Update: {
          acao_de_hoje?: string | null
          address?: string | null
          address_complement?: string | null
          address_number?: string | null
          address_province?: string | null
          ai_conversation_insights?: Json | null
          ai_last_analysis_at?: string | null
          ai_proposal_suggestion?: Json | null
          attachments?: string[] | null
          bant_authority?: boolean | null
          bant_budget?: boolean | null
          bant_need?: boolean | null
          bant_timeline?: boolean | null
          business_type?: string | null
          capital_disponivel?: string | null
          city_name?: string | null
          company_name?: string | null
          context?: string | null
          country?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          document?: string | null
          email?: string | null
          email_opted_out?: boolean | null
          engagement_score?: number | null
          etapa_funil?: string | null
          evaluated_vehicles?: Json | null
          expected_revenue?: number | null
          external_id?: string | null
          franchise_campaign_id?: string | null
          franchise_member_id?: string | null
          franchise_member_name?: string | null
          franchise_member_phone?: string | null
          gender?: string | null
          id?: string
          instagram?: string | null
          instagram_id?: string | null
          instagram_profile_id?: string | null
          instagram_verified_at?: string | null
          intent_buy_only?: boolean | null
          intent_cash?: boolean | null
          intent_finance_no_entry?: boolean | null
          intent_sell?: boolean | null
          intent_special_search?: boolean | null
          intent_trade_in?: boolean | null
          is_icp?: boolean | null
          is_internal_contact?: boolean | null
          job_title?: string | null
          last_interaction_at?: string | null
          last_message_received_at?: string | null
          last_message_sent_at?: string | null
          lost_reason?: string | null
          melhor_horario_contato?: string | null
          messages_count?: number | null
          metadata?: Json | null
          monthly_revenue?: string | null
          name?: string
          negotiation_type?: string | null
          original_source?: string | null
          original_utm_campaign?: string | null
          original_utm_content?: string | null
          original_utm_medium?: string | null
          original_utm_source?: string | null
          original_utm_term?: string | null
          person_type?: string | null
          phone?: string | null
          photo_url?: string | null
          pipeline_stage_id?: string | null
          pode_completar_capital?: boolean | null
          postal_code?: string | null
          qualification?: Json | null
          regiao_interesse?: string | null
          region?: string | null
          revenue_range?: string | null
          sales_rep_id?: string | null
          sales_score?: number | null
          sales_score_reason?: string | null
          sales_stage?: string | null
          source?: string | null
          stage_changed_at?: string | null
          star_type?: string | null
          state?: string | null
          status?: string | null
          status_de_resposta?: string | null
          tags?: string[] | null
          tenant_id?: string
          timing_negocio?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vehicle_of_interest?: Json | null
          webinar_config_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_franchise_campaign_id_fkey"
            columns: ["franchise_campaign_id"]
            isOneToOne: false
            referencedRelation: "franchise_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_franchise_member_id_fkey"
            columns: ["franchise_member_id"]
            isOneToOne: false
            referencedRelation: "franchise_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_pipeline_stage_id_fkey"
            columns: ["pipeline_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_provider_configs: {
        Row: {
          api_key: string
          created_at: string | null
          id: string
          is_active: boolean
          provider: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          provider: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          provider?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      marketing_forms: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          fields: Json
          id: string
          is_active: boolean | null
          last_submission_at: string | null
          name: string
          redirect_url: string | null
          settings: Json
          style: Json
          submissions_count: number | null
          success_message: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          last_submission_at?: string | null
          name: string
          redirect_url?: string | null
          settings?: Json
          style?: Json
          submissions_count?: number | null
          success_message?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          last_submission_at?: string | null
          name?: string
          redirect_url?: string | null
          settings?: Json
          style?: Json
          submissions_count?: number | null
          success_message?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_forms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          activity_id: string | null
          ai_analysis: Json | null
          audio_url: string | null
          created_at: string | null
          created_by: string | null
          ended_at: string | null
          id: string
          key_points: Json | null
          lead_id: string | null
          meeting_link: string | null
          meeting_type: string | null
          organization_id: string | null
          participants: Json
          processed_at: string | null
          soniox_session_id: string | null
          started_at: string | null
          status: string | null
          summary: string | null
          team: string | null
          tenant_id: string
          title: string
          transcriptions: Json | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          activity_id?: string | null
          ai_analysis?: Json | null
          audio_url?: string | null
          created_at?: string | null
          created_by?: string | null
          ended_at?: string | null
          id?: string
          key_points?: Json | null
          lead_id?: string | null
          meeting_link?: string | null
          meeting_type?: string | null
          organization_id?: string | null
          participants: Json
          processed_at?: string | null
          soniox_session_id?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          team?: string | null
          tenant_id?: string
          title: string
          transcriptions?: Json | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          activity_id?: string | null
          ai_analysis?: Json | null
          audio_url?: string | null
          created_at?: string | null
          created_by?: string | null
          ended_at?: string | null
          id?: string
          key_points?: Json | null
          lead_id?: string | null
          meeting_link?: string | null
          meeting_type?: string | null
          organization_id?: string | null
          participants?: Json
          processed_at?: string | null
          soniox_session_id?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          team?: string | null
          tenant_id?: string
          title?: string
          transcriptions?: Json | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "company_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_calls_history: {
        Row: {
          attendance_percentage: number | null
          call_date: string | null
          call_id: string | null
          call_title: string | null
          call_total_duration: number | null
          call_type: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          join_time: string | null
          lead_id: string | null
          leave_time: string | null
          member_email: string | null
          member_user_id: string | null
          organization_id: string | null
          tenant_id: string
        }
        Insert: {
          attendance_percentage?: number | null
          call_date?: string | null
          call_id?: string | null
          call_title?: string | null
          call_total_duration?: number | null
          call_type?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          join_time?: string | null
          lead_id?: string | null
          leave_time?: string | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          tenant_id?: string
        }
        Update: {
          attendance_percentage?: number | null
          call_date?: string | null
          call_id?: string | null
          call_title?: string | null
          call_total_duration?: number | null
          call_type?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          join_time?: string | null
          lead_id?: string | null
          leave_time?: string | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_calls_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_calls_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_calls_history_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_daily_activity: {
        Row: {
          activity_date: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          lessons_completed: number | null
          lessons_watched: number | null
          member_email: string | null
          member_user_id: string | null
          organization_id: string | null
          page_views: number | null
          sessions: number | null
          tenant_id: string
          time_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          activity_date?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          lessons_completed?: number | null
          lessons_watched?: number | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          page_views?: number | null
          sessions?: number | null
          tenant_id?: string
          time_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          activity_date?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          lessons_completed?: number | null
          lessons_watched?: number | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          page_views?: number | null
          sessions?: number | null
          tenant_id?: string
          time_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_daily_activity_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_daily_activity_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_daily_activity_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_engagement_snapshots: {
        Row: {
          calls_attended: number | null
          calls_total_minutes: number | null
          created_at: string | null
          days_since_last_access: number | null
          id: string
          last_access: string | null
          last_call_date: string | null
          lead_id: string | null
          lessons_completed: number | null
          lessons_completion_rate: number | null
          lessons_started: number | null
          member_email: string | null
          member_name: string | null
          member_user_id: string | null
          member_user_id_external: string | null
          organization_id: string | null
          risk_score: number | null
          risk_status: string | null
          sessions_last_30_days: number | null
          sessions_last_7_days: number | null
          snapshot_hour: string | null
          tenant_id: string
          total_sessions: number | null
          total_time_minutes: number | null
        }
        Insert: {
          calls_attended?: number | null
          calls_total_minutes?: number | null
          created_at?: string | null
          days_since_last_access?: number | null
          id?: string
          last_access?: string | null
          last_call_date?: string | null
          lead_id?: string | null
          lessons_completed?: number | null
          lessons_completion_rate?: number | null
          lessons_started?: number | null
          member_email?: string | null
          member_name?: string | null
          member_user_id?: string | null
          member_user_id_external?: string | null
          organization_id?: string | null
          risk_score?: number | null
          risk_status?: string | null
          sessions_last_30_days?: number | null
          sessions_last_7_days?: number | null
          snapshot_hour?: string | null
          tenant_id?: string
          total_sessions?: number | null
          total_time_minutes?: number | null
        }
        Update: {
          calls_attended?: number | null
          calls_total_minutes?: number | null
          created_at?: string | null
          days_since_last_access?: number | null
          id?: string
          last_access?: string | null
          last_call_date?: string | null
          lead_id?: string | null
          lessons_completed?: number | null
          lessons_completion_rate?: number | null
          lessons_started?: number | null
          member_email?: string | null
          member_name?: string | null
          member_user_id?: string | null
          member_user_id_external?: string | null
          organization_id?: string | null
          risk_score?: number | null
          risk_status?: string | null
          sessions_last_30_days?: number | null
          sessions_last_7_days?: number | null
          snapshot_hour?: string | null
          tenant_id?: string
          total_sessions?: number | null
          total_time_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "member_engagement_snapshots_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_engagement_snapshots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_engagement_snapshots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_lessons_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          last_watched_at: string | null
          lead_id: string | null
          lesson_id: string | null
          lesson_title: string | null
          member_email: string | null
          member_user_id: string | null
          organization_id: string | null
          project_id: string | null
          seconds_watched: number | null
          started_at: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_watched_at?: string | null
          lead_id?: string | null
          lesson_id?: string | null
          lesson_title?: string | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          seconds_watched?: number | null
          started_at?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_watched_at?: string | null
          lead_id?: string | null
          lesson_id?: string | null
          lesson_title?: string | null
          member_email?: string | null
          member_user_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          seconds_watched?: number | null
          started_at?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_lessons_progress_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_lessons_progress_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_lessons_progress_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_accounts: {
        Row: {
          account_id: string
          account_name: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_syncing: boolean | null
          last_synced_date: string | null
          organization_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_syncing?: boolean | null
          last_synced_date?: string | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          account_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_syncing?: boolean | null
          last_synced_date?: string | null
          organization_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_ad_data: {
        Row: {
          account_id: string
          ad_id: string
          ad_name: string | null
          adset_id: string | null
          adset_name: string | null
          aggregation_level: string
          body: string | null
          campaign_id: string | null
          campaign_name: string | null
          campaign_objective: string | null
          clicks: number | null
          cost_per_conversion: number | null
          cpc: number | null
          created_at: string | null
          ctr: number | null
          date: string
          description: string | null
          frequency: number | null
          headline: string | null
          id: string
          image_url: string | null
          impressions: number | null
          link_url: string | null
          organization_id: string | null
          primary_conversions: number | null
          spend: number | null
          status: string | null
          tenant_id: string
          thumbnail_url: string | null
          total_conversions: number | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          ad_id: string
          ad_name?: string | null
          adset_id?: string | null
          adset_name?: string | null
          aggregation_level: string
          body?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_objective?: string | null
          clicks?: number | null
          cost_per_conversion?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          description?: string | null
          frequency?: number | null
          headline?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          link_url?: string | null
          organization_id?: string | null
          primary_conversions?: number | null
          spend?: number | null
          status?: string | null
          tenant_id?: string
          thumbnail_url?: string | null
          total_conversions?: number | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          ad_id?: string
          ad_name?: string | null
          adset_id?: string | null
          adset_name?: string | null
          aggregation_level?: string
          body?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_objective?: string | null
          clicks?: number | null
          cost_per_conversion?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          description?: string | null
          frequency?: number | null
          headline?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          link_url?: string | null
          organization_id?: string | null
          primary_conversions?: number | null
          spend?: number | null
          status?: string | null
          tenant_id?: string
          thumbnail_url?: string | null
          total_conversions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_ad_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_conversions: {
        Row: {
          ad_data_id: string | null
          conversion_count: number | null
          conversion_type: string
          conversion_value: number | null
          cost_per_conversion: number | null
          created_at: string | null
          id: string
          organization_id: string | null
          tenant_id: string
        }
        Insert: {
          ad_data_id?: string | null
          conversion_count?: number | null
          conversion_type: string
          conversion_value?: number | null
          cost_per_conversion?: number | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          tenant_id?: string
        }
        Update: {
          ad_data_id?: string | null
          conversion_count?: number | null
          conversion_type?: string
          conversion_value?: number | null
          cost_per_conversion?: number | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_conversions_ad_data_id_fkey"
            columns: ["ad_data_id"]
            isOneToOne: false
            referencedRelation: "meta_ads_ad_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meta_ads_conversions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_daily_data: {
        Row: {
          account_id: string
          aggregation_level: string
          conversion_rate: number | null
          cpl: number | null
          created_at: string | null
          ctr: number | null
          date: string
          frequency: number | null
          id: string
          organization_id: string | null
          tenant_id: string
          total_clicks: number | null
          total_impressions: number | null
          total_leads: number | null
          total_spend: number | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          aggregation_level: string
          conversion_rate?: number | null
          cpl?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          frequency?: number | null
          id?: string
          organization_id?: string | null
          tenant_id?: string
          total_clicks?: number | null
          total_impressions?: number | null
          total_leads?: number | null
          total_spend?: number | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          aggregation_level?: string
          conversion_rate?: number | null
          cpl?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          frequency?: number | null
          id?: string
          organization_id?: string | null
          tenant_id?: string
          total_clicks?: number | null
          total_impressions?: number | null
          total_leads?: number | null
          total_spend?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_daily_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_sync_log: {
        Row: {
          account_id: string | null
          completed_at: string | null
          created_at: string | null
          end_date: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          organization_id: string | null
          records_processed: number | null
          start_date: string | null
          status: string
          sync_type: string
          tenant_id: string
        }
        Insert: {
          account_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          end_date?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          organization_id?: string | null
          records_processed?: number | null
          start_date?: string | null
          status?: string
          sync_type: string
          tenant_id?: string
        }
        Update: {
          account_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          end_date?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          organization_id?: string | null
          records_processed?: number | null
          start_date?: string | null
          status?: string
          sync_type?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_sync_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_lead_ads_forms: {
        Row: {
          created_at: string | null
          form_id: string
          form_name: string
          id: string
          is_enabled: boolean | null
          last_lead_at: string | null
          leads_count: number | null
          page_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          form_id: string
          form_name: string
          id?: string
          is_enabled?: boolean | null
          last_lead_at?: string | null
          leads_count?: number | null
          page_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          form_id?: string
          form_name?: string
          id?: string
          is_enabled?: boolean | null
          last_lead_at?: string | null
          leads_count?: number | null
          page_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      meta_lead_ads_logs: {
        Row: {
          assigned_to_name: string | null
          created_at: string | null
          deal_id: string | null
          error_message: string | null
          form_id: string | null
          form_name: string | null
          id: string
          lead_email: string | null
          lead_id: string | null
          lead_name: string | null
          lead_phone: string | null
          leadgen_id: string | null
          page_id: string | null
          raw_data: Json | null
          status: string | null
          tenant_id: string
        }
        Insert: {
          assigned_to_name?: string | null
          created_at?: string | null
          deal_id?: string | null
          error_message?: string | null
          form_id?: string | null
          form_name?: string | null
          id?: string
          lead_email?: string | null
          lead_id?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          leadgen_id?: string | null
          page_id?: string | null
          raw_data?: Json | null
          status?: string | null
          tenant_id: string
        }
        Update: {
          assigned_to_name?: string | null
          created_at?: string | null
          deal_id?: string | null
          error_message?: string | null
          form_id?: string | null
          form_name?: string | null
          id?: string
          lead_email?: string | null
          lead_id?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          leadgen_id?: string | null
          page_id?: string | null
          raw_data?: Json | null
          status?: string | null
          tenant_id?: string
        }
        Relationships: []
      }
      meta_lead_ads_pages: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_lead_at: string | null
          page_access_token: string
          page_id: string
          page_name: string
          tenant_id: string
          total_leads_synced: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_lead_at?: string | null
          page_access_token: string
          page_id: string
          page_name: string
          tenant_id: string
          total_leads_synced?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_lead_at?: string | null
          page_access_token?: string
          page_id?: string
          page_name?: string
          tenant_id?: string
          total_leads_synced?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migration_log: {
        Row: {
          activities_created: number | null
          batch_offset: number
          created_at: string | null
          deals_created: number | null
          deals_processed: number | null
          error_details: Json | null
          errors: number | null
          id: string
          leads_created: number | null
          leads_deduped: number | null
          message: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          activities_created?: number | null
          batch_offset?: number
          created_at?: string | null
          deals_created?: number | null
          deals_processed?: number | null
          error_details?: Json | null
          errors?: number | null
          id?: string
          leads_created?: number | null
          leads_deduped?: number | null
          message?: string | null
          status?: string
          tenant_id?: string
        }
        Update: {
          activities_created?: number | null
          batch_offset?: number
          created_at?: string | null
          deals_created?: number | null
          deals_processed?: number | null
          error_details?: Json | null
          errors?: number | null
          id?: string
          leads_created?: number | null
          leads_deduped?: number | null
          message?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "migration_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      noshow_followups: {
        Row: {
          attempt_number: number
          created_at: string | null
          deal_id: string | null
          id: string
          lead_id: string
          message_sent: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          attempt_number?: number
          created_at?: string | null
          deal_id?: string | null
          id?: string
          lead_id: string
          message_sent?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          attempt_number?: number
          created_at?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string
          message_sent?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "noshow_followups_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "noshow_followups_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "noshow_followups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          channel: string | null
          created_at: string | null
          error_message: string | null
          event_id: string | null
          event_type: string | null
          id: string
          message: string | null
          rule_id: string | null
          rule_name: string | null
          sent_at: string | null
          status: string | null
          target: string | null
          tenant_id: string
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          error_message?: string | null
          event_id?: string | null
          event_type?: string | null
          id?: string
          message?: string | null
          rule_id?: string | null
          rule_name?: string | null
          sent_at?: string | null
          status?: string | null
          target?: string | null
          tenant_id?: string
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          error_message?: string | null
          event_id?: string | null
          event_type?: string | null
          id?: string
          message?: string | null
          rule_id?: string | null
          rule_name?: string | null
          sent_at?: string | null
          status?: string | null
          target?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "notification_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_rules: {
        Row: {
          action_channel: string
          action_instance_id: string | null
          action_target_id: string | null
          action_target_phone: string | null
          action_target_type: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          enabled: boolean | null
          id: string
          message_template: string
          name: string
          tenant_id: string
          trigger_days: string[] | null
          trigger_event: string | null
          trigger_minutes: number | null
          trigger_time: string | null
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          action_channel: string
          action_instance_id?: string | null
          action_target_id?: string | null
          action_target_phone?: string | null
          action_target_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          message_template: string
          name: string
          tenant_id?: string
          trigger_days?: string[] | null
          trigger_event?: string | null
          trigger_minutes?: number | null
          trigger_time?: string | null
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          action_channel?: string
          action_instance_id?: string | null
          action_target_id?: string | null
          action_target_phone?: string | null
          action_target_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          message_template?: string
          name?: string
          tenant_id?: string
          trigger_days?: string[] | null
          trigger_event?: string | null
          trigger_minutes?: number | null
          trigger_time?: string | null
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_rules_action_instance_id_fkey"
            columns: ["action_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      nps_survey_schedule: {
        Row: {
          completed_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          lead_id: string | null
          milestone: string
          organization_id: string
          product_id: string
          scheduled_for: string
          sent_at: string | null
          status: string
          token: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          milestone: string
          organization_id: string
          product_id: string
          scheduled_for: string
          sent_at?: string | null
          status?: string
          token?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          milestone?: string
          organization_id?: string
          product_id?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "nps_survey_schedule_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_survey_schedule_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nps_survey_schedule_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_stages: {
        Row: {
          checklist: Json | null
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_final: boolean | null
          name: string
          position: number
          slug: string
          tenant_id: string
        }
        Insert: {
          checklist?: Json | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_final?: boolean | null
          name: string
          position?: number
          slug: string
          tenant_id: string
        }
        Update: {
          checklist?: Json | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_final?: boolean | null
          name?: string
          position?: number
          slug?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_stages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      onboardings: {
        Row: {
          activity_id: string | null
          add_to_whatsapp: boolean | null
          additional_members: Json | null
          approved_at: string | null
          approved_by: string | null
          confirmed_data: Json | null
          created_at: string | null
          created_by: string | null
          dossier: Json | null
          early_access_at: string | null
          early_access_granted: boolean | null
          external_org_id: string | null
          form_completed_at: string | null
          form_opened_at: string | null
          form_sent_at: string | null
          form_token: string | null
          form_url: string | null
          id: string
          journey_config: Json | null
          meeting_id: string | null
          organization_id: string | null
          plan: string | null
          product_id: string
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          seats_limit: number | null
          send_welcome: boolean | null
          status: string
          tenant_id: string
          transcription_raw: string | null
          transcription_source: string | null
          updated_at: string | null
          webhook_response: Json | null
        }
        Insert: {
          activity_id?: string | null
          add_to_whatsapp?: boolean | null
          additional_members?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          confirmed_data?: Json | null
          created_at?: string | null
          created_by?: string | null
          dossier?: Json | null
          early_access_at?: string | null
          early_access_granted?: boolean | null
          external_org_id?: string | null
          form_completed_at?: string | null
          form_opened_at?: string | null
          form_sent_at?: string | null
          form_token?: string | null
          form_url?: string | null
          id?: string
          journey_config?: Json | null
          meeting_id?: string | null
          organization_id?: string | null
          plan?: string | null
          product_id?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          seats_limit?: number | null
          send_welcome?: boolean | null
          status?: string
          tenant_id?: string
          transcription_raw?: string | null
          transcription_source?: string | null
          updated_at?: string | null
          webhook_response?: Json | null
        }
        Update: {
          activity_id?: string | null
          add_to_whatsapp?: boolean | null
          additional_members?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          confirmed_data?: Json | null
          created_at?: string | null
          created_by?: string | null
          dossier?: Json | null
          early_access_at?: string | null
          early_access_granted?: boolean | null
          external_org_id?: string | null
          form_completed_at?: string | null
          form_opened_at?: string | null
          form_sent_at?: string | null
          form_token?: string | null
          form_url?: string | null
          id?: string
          journey_config?: Json | null
          meeting_id?: string | null
          organization_id?: string | null
          plan?: string | null
          product_id?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          seats_limit?: number | null
          send_welcome?: boolean | null
          status?: string
          tenant_id?: string
          transcription_raw?: string | null
          transcription_source?: string | null
          updated_at?: string | null
          webhook_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_onboarding_activity"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "company_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_onboarding_meeting"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          can_invite: boolean | null
          contact_id: string
          created_at: string | null
          id: string
          invite_expires_at: string | null
          invite_token: string | null
          invited_at: string | null
          invited_by: string | null
          is_admin: boolean | null
          job_title: string | null
          joined_at: string | null
          organization_id: string
          role: Database["public"]["Enums"]["member_role"]
          status: Database["public"]["Enums"]["member_status"] | null
          tenant_id: string
          updated_at: string | null
          user_id: string | null
          whatsapp_added_at: string | null
          whatsapp_in_group: boolean | null
        }
        Insert: {
          can_invite?: boolean | null
          contact_id: string
          created_at?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token?: string | null
          invited_at?: string | null
          invited_by?: string | null
          is_admin?: boolean | null
          job_title?: string | null
          joined_at?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["member_role"]
          status?: Database["public"]["Enums"]["member_status"] | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
          whatsapp_added_at?: string | null
          whatsapp_in_group?: boolean | null
        }
        Update: {
          can_invite?: boolean | null
          contact_id?: string
          created_at?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token?: string | null
          invited_at?: string | null
          invited_by?: string | null
          is_admin?: boolean | null
          job_title?: string | null
          joined_at?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["member_role"]
          status?: Database["public"]["Enums"]["member_status"] | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
          whatsapp_added_at?: string | null
          whatsapp_in_group?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_products: {
        Row: {
          created_at: string | null
          cs_rep_id: string | null
          cs_status: Database["public"]["Enums"]["cs_status"] | null
          deal_id: string | null
          expires_at: string | null
          id: string
          journey_stage: Database["public"]["Enums"]["journey_stage"] | null
          metadata: Json | null
          notes: string | null
          onboarding_completed_at: string | null
          onboarding_started_at: string | null
          onboarding_status:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          organization_id: string
          product_id: string
          starts_at: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cs_rep_id?: string | null
          cs_status?: Database["public"]["Enums"]["cs_status"] | null
          deal_id?: string | null
          expires_at?: string | null
          id?: string
          journey_stage?: Database["public"]["Enums"]["journey_stage"] | null
          metadata?: Json | null
          notes?: string | null
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          organization_id: string
          product_id: string
          starts_at?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cs_rep_id?: string | null
          cs_status?: Database["public"]["Enums"]["cs_status"] | null
          deal_id?: string | null
          expires_at?: string | null
          id?: string
          journey_stage?: Database["public"]["Enums"]["journey_stage"] | null
          metadata?: Json | null
          notes?: string | null
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          organization_id?: string
          product_id?: string
          starts_at?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_products_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          ai_insights: Json | null
          billing_contact_email: string | null
          billing_contact_name: string | null
          billing_contact_phone: string | null
          churn_reason: string | null
          churned_at: string | null
          contract_end: string | null
          contract_start: string | null
          created_at: string | null
          early_access_at: string | null
          early_access_granted: boolean | null
          external_member_area_org_id: string | null
          external_member_area_user_id: string | null
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          org_type: Database["public"]["Enums"]["organization_type"]
          plan: string | null
          primary_color: string | null
          primary_contact_id: string | null
          seats_limit: number | null
          settings: Json | null
          slug: string
          status: Database["public"]["Enums"]["organization_status"] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          ai_insights?: Json | null
          billing_contact_email?: string | null
          billing_contact_name?: string | null
          billing_contact_phone?: string | null
          churn_reason?: string | null
          churned_at?: string | null
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string | null
          early_access_at?: string | null
          early_access_granted?: boolean | null
          external_member_area_org_id?: string | null
          external_member_area_user_id?: string | null
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          org_type?: Database["public"]["Enums"]["organization_type"]
          plan?: string | null
          primary_color?: string | null
          primary_contact_id?: string | null
          seats_limit?: number | null
          settings?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["organization_status"] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          ai_insights?: Json | null
          billing_contact_email?: string | null
          billing_contact_name?: string | null
          billing_contact_phone?: string | null
          churn_reason?: string | null
          churned_at?: string | null
          contract_end?: string | null
          contract_start?: string | null
          created_at?: string | null
          early_access_at?: string | null
          early_access_granted?: boolean | null
          external_member_area_org_id?: string | null
          external_member_area_user_id?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          org_type?: Database["public"]["Enums"]["organization_type"]
          plan?: string | null
          primary_color?: string | null
          primary_contact_id?: string | null
          seats_limit?: number | null
          settings?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["organization_status"] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      pain_registrations: {
        Row: {
          amount_balance: number | null
          amount_paid: number | null
          amount_total: number | null
          assignee: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          id: string
          lead_id: string | null
          loss_reason: string | null
          monthly_revenue: string | null
          name: string
          notes: string | null
          payment_details: string | null
          payment_method: string | null
          payment_option: string | null
          payment_platform: string | null
          phone: string
          status: string | null
          tenant_id: string
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          amount_balance?: number | null
          amount_paid?: number | null
          amount_total?: number | null
          assignee?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id?: string | null
          loss_reason?: string | null
          monthly_revenue?: string | null
          name: string
          notes?: string | null
          payment_details?: string | null
          payment_method?: string | null
          payment_option?: string | null
          payment_platform?: string | null
          phone: string
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          amount_balance?: number | null
          amount_paid?: number | null
          amount_total?: number | null
          assignee?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          lead_id?: string | null
          loss_reason?: string | null
          monthly_revenue?: string | null
          name?: string
          notes?: string | null
          payment_details?: string | null
          payment_method?: string | null
          payment_option?: string | null
          payment_platform?: string | null
          phone?: string
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pain_registrations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pain_registrations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_gateway_fees: {
        Row: {
          billing_type: string
          created_at: string | null
          fee_fixed: number
          fee_percent: number
          gateway_id: string
          id: string
          tenant_id: string
        }
        Insert: {
          billing_type: string
          created_at?: string | null
          fee_fixed?: number
          fee_percent?: number
          gateway_id: string
          id?: string
          tenant_id?: string
        }
        Update: {
          billing_type?: string
          created_at?: string | null
          fee_fixed?: number
          fee_percent?: number
          gateway_id?: string
          id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_gateway_fees_gateway_id_fkey"
            columns: ["gateway_id"]
            isOneToOne: false
            referencedRelation: "payment_gateways"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_gateway_fees_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_gateways: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          tenant_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_gateways_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          cs_config: Json | null
          cs_process_type: string | null
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          onboarding_required: boolean | null
          onboarding_steps: Json | null
          price: number | null
          primary_color: string | null
          settings: Json | null
          sku: string | null
          slug: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          cs_config?: Json | null
          cs_process_type?: string | null
          description?: string | null
          id: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          onboarding_required?: boolean | null
          onboarding_steps?: Json | null
          price?: number | null
          primary_color?: string | null
          settings?: Json | null
          sku?: string | null
          slug: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          cs_config?: Json | null
          cs_process_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          onboarding_required?: boolean | null
          onboarding_steps?: Json | null
          price?: number | null
          primary_color?: string | null
          settings?: Json | null
          sku?: string | null
          slug?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          google_access_token: string | null
          google_calendar_connected: boolean | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          role: string
          team: string | null
          tenant_id: string
          updated_at: string | null
          whatsapp_instance_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          google_access_token?: string | null
          google_calendar_connected?: boolean | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          role?: string
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_instance_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          google_access_token?: string | null
          google_calendar_connected?: boolean | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          role?: string
          team?: string | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_whatsapp_instance_id_fkey"
            columns: ["whatsapp_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      receive_lead_logs: {
        Row: {
          api_key: string | null
          assigned_to: string | null
          assigned_to_name: string | null
          config_id: string | null
          created_at: string | null
          deal_id: string | null
          dedup_match: string | null
          error_details: Json | null
          error_message: string | null
          existing_lead_id: string | null
          id: string
          lead_email: string | null
          lead_id: string | null
          lead_name: string | null
          lead_phone: string | null
          lead_source: string | null
          origin: string | null
          processing_ms: number | null
          raw_payload: Json | null
          status: string
          tenant_id: string
        }
        Insert: {
          api_key?: string | null
          assigned_to?: string | null
          assigned_to_name?: string | null
          config_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          dedup_match?: string | null
          error_details?: Json | null
          error_message?: string | null
          existing_lead_id?: string | null
          id?: string
          lead_email?: string | null
          lead_id?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          lead_source?: string | null
          origin?: string | null
          processing_ms?: number | null
          raw_payload?: Json | null
          status?: string
          tenant_id?: string
        }
        Update: {
          api_key?: string | null
          assigned_to?: string | null
          assigned_to_name?: string | null
          config_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          dedup_match?: string | null
          error_details?: Json | null
          error_message?: string | null
          existing_lead_id?: string | null
          id?: string
          lead_email?: string | null
          lead_id?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          lead_source?: string | null
          origin?: string | null
          processing_ms?: number | null
          raw_payload?: Json | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receive_lead_logs_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receive_lead_logs_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "lead_distribution_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receive_lead_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      roleplay_sessions: {
        Row: {
          created_at: string
          created_by: string | null
          duration_seconds: number
          evaluation: Json | null
          id: string
          persona_company: string | null
          persona_id: string | null
          persona_name: string
          persona_role: string | null
          sales_rep_id: string | null
          scenario: string
          score: number | null
          tenant_id: string
          transcription: Json
          verdict: string | null
          voice: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          duration_seconds?: number
          evaluation?: Json | null
          id?: string
          persona_company?: string | null
          persona_id?: string | null
          persona_name: string
          persona_role?: string | null
          sales_rep_id?: string | null
          scenario: string
          score?: number | null
          tenant_id?: string
          transcription?: Json
          verdict?: string | null
          voice: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          duration_seconds?: number
          evaluation?: Json | null
          id?: string
          persona_company?: string | null
          persona_id?: string | null
          persona_name?: string
          persona_role?: string | null
          sales_rep_id?: string | null
          scenario?: string
          score?: number | null
          tenant_id?: string
          transcription?: Json
          verdict?: string | null
          voice?: string
        }
        Relationships: [
          {
            foreignKeyName: "roleplay_sessions_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_alerts: {
        Row: {
          actioned_at: string | null
          alert_type: string
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_actioned: boolean | null
          is_read: boolean | null
          lead_id: string
          metadata: Json | null
          priority: number | null
          sales_rep_id: string | null
          tenant_id: string
          title: string
        }
        Insert: {
          actioned_at?: string | null
          alert_type: string
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_actioned?: boolean | null
          is_read?: boolean | null
          lead_id: string
          metadata?: Json | null
          priority?: number | null
          sales_rep_id?: string | null
          tenant_id?: string
          title: string
        }
        Update: {
          actioned_at?: string | null
          alert_type?: string
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_actioned?: boolean | null
          is_read?: boolean | null
          lead_id?: string
          metadata?: Json | null
          priority?: number | null
          sales_rep_id?: string | null
          tenant_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_alerts_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_alerts_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_alerts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_automation_rules: {
        Row: {
          action_config: Json | null
          action_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          priority: number | null
          team: string | null
          tenant_id: string
          trigger_conditions: Json | null
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          action_config?: Json | null
          action_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          priority?: number | null
          team?: string | null
          tenant_id?: string
          trigger_conditions?: Json | null
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          action_config?: Json | null
          action_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          priority?: number | null
          team?: string | null
          tenant_id?: string
          trigger_conditions?: Json | null
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_automation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_automation_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_goals: {
        Row: {
          created_at: string | null
          id: string
          period_end: string | null
          period_start: string | null
          target_revenue: number | null
          team_member_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          target_revenue?: number | null
          team_member_id?: string | null
          tenant_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          target_revenue?: number | null
          team_member_id?: string | null
          tenant_id?: string
        }
        Relationships: []
      }
      sales_materials: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          file_size: number | null
          file_url: string
          id: string
          is_active: boolean | null
          mime_type: string | null
          name: string
          tags: string[] | null
          tenant_id: string
          thumbnail_url: string | null
          type: string
          updated_at: string | null
          usage_hint: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          is_active?: boolean | null
          mime_type?: string | null
          name: string
          tags?: string[] | null
          tenant_id?: string
          thumbnail_url?: string | null
          type: string
          updated_at?: string | null
          usage_hint?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          is_active?: boolean | null
          mime_type?: string | null
          name?: string
          tags?: string[] | null
          tenant_id?: string
          thumbnail_url?: string | null
          type?: string
          updated_at?: string | null
          usage_hint?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_materials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_materials_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_notes: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          id: string
          lead_id: string | null
          note_type: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          note_type?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          note_type?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_notes_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_notes_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "sales_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_notes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_pipeline_stages: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          is_lost: boolean | null
          is_won: boolean | null
          name: string
          pipeline_id: string
          position: number
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_lost?: boolean | null
          is_won?: boolean | null
          name: string
          pipeline_id: string
          position: number
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_lost?: boolean | null
          is_won?: boolean | null
          name?: string
          pipeline_id?: string
          position?: number
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_pipeline_stages_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipeline_stages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_pipeline_transitions: {
        Row: {
          action: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          source_pipeline_id: string | null
          source_stage_id: string | null
          target_pipeline_id: string | null
          target_stage_id: string | null
          tenant_id: string
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          source_pipeline_id?: string | null
          source_stage_id?: string | null
          target_pipeline_id?: string | null
          target_stage_id?: string | null
          tenant_id?: string
        }
        Update: {
          action?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          source_pipeline_id?: string | null
          source_stage_id?: string | null
          target_pipeline_id?: string | null
          target_stage_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_pipeline_transitions_source_pipeline_id_fkey"
            columns: ["source_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipeline_transitions_source_stage_id_fkey"
            columns: ["source_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipeline_transitions_target_pipeline_id_fkey"
            columns: ["target_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipeline_transitions_target_stage_id_fkey"
            columns: ["target_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipeline_transitions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_pipelines: {
        Row: {
          created_at: string | null
          default_sales_rep_id: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          position: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_sales_rep_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          position?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_sales_rep_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          position?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_pipelines_default_sales_rep_id_fkey"
            columns: ["default_sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_pipelines_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_playbook: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_playbooks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          steps: Json
          tenant_id: string
          trigger_conditions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          steps?: Json
          tenant_id?: string
          trigger_conditions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
          tenant_id?: string
          trigger_conditions?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_playbooks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_training_cases: {
        Row: {
          ai_analysis: Json | null
          call_history_id: string | null
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          id: string
          key_moments: Json | null
          lead_id: string | null
          meeting_id: string | null
          notes: string | null
          outcome: string | null
          rating: number | null
          record_url: string | null
          sales_rep_id: string | null
          source_type: string
          tags: string[]
          tenant_id: string
          title: string
          transcription: Json | null
          updated_at: string
          view_count: number
        }
        Insert: {
          ai_analysis?: Json | null
          call_history_id?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          key_moments?: Json | null
          lead_id?: string | null
          meeting_id?: string | null
          notes?: string | null
          outcome?: string | null
          rating?: number | null
          record_url?: string | null
          sales_rep_id?: string | null
          source_type?: string
          tags?: string[]
          tenant_id?: string
          title: string
          transcription?: Json | null
          updated_at?: string
          view_count?: number
        }
        Update: {
          ai_analysis?: Json | null
          call_history_id?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          key_moments?: Json | null
          lead_id?: string | null
          meeting_id?: string | null
          notes?: string | null
          outcome?: string | null
          rating?: number | null
          record_url?: string | null
          sales_rep_id?: string | null
          source_type?: string
          tags?: string[]
          tenant_id?: string
          title?: string
          transcription?: Json | null
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_training_cases_call_history_id_fkey"
            columns: ["call_history_id"]
            isOneToOne: false
            referencedRelation: "call_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_training_cases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_training_cases_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_training_cases_sales_rep_id_fkey"
            columns: ["sales_rep_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      sdr_closer_transfers: {
        Row: {
          accepted_at: string | null
          closer_id: string | null
          created_at: string
          deal_id: string
          from_pipeline_id: string
          from_stage_id: string
          id: string
          lead_id: string
          qualification_snapshot: Json | null
          return_notes: string | null
          return_reason: string | null
          returned_at: string | null
          sdr_id: string
          status: string
          tenant_id: string
          to_pipeline_id: string
          to_stage_id: string
          transferred_at: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          closer_id?: string | null
          created_at?: string
          deal_id: string
          from_pipeline_id: string
          from_stage_id: string
          id?: string
          lead_id: string
          qualification_snapshot?: Json | null
          return_notes?: string | null
          return_reason?: string | null
          returned_at?: string | null
          sdr_id: string
          status?: string
          tenant_id: string
          to_pipeline_id: string
          to_stage_id: string
          transferred_at?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          closer_id?: string | null
          created_at?: string
          deal_id?: string
          from_pipeline_id?: string
          from_stage_id?: string
          id?: string
          lead_id?: string
          qualification_snapshot?: Json | null
          return_notes?: string | null
          return_reason?: string | null
          returned_at?: string | null
          sdr_id?: string
          status?: string
          tenant_id?: string
          to_pipeline_id?: string
          to_stage_id?: string
          transferred_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sdr_closer_transfers_closer_id_fkey"
            columns: ["closer_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_from_pipeline_id_fkey"
            columns: ["from_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_from_stage_id_fkey"
            columns: ["from_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_sdr_id_fkey"
            columns: ["sdr_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_to_pipeline_id_fkey"
            columns: ["to_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sdr_closer_transfers_to_stage_id_fkey"
            columns: ["to_stage_id"]
            isOneToOne: false
            referencedRelation: "sales_pipeline_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      social_seller_alerts: {
        Row: {
          action_notes: string | null
          actioned_at: string | null
          actioned_by: string | null
          alert_type: string
          conversation_id: string
          created_at: string | null
          detected_keywords: string[] | null
          from_stage: string | null
          id: string
          lead_id: string | null
          message: string | null
          rule_id: string | null
          status: string | null
          tenant_id: string
          title: string
          to_stage: string | null
          trigger_message: string | null
          viewed_at: string | null
        }
        Insert: {
          action_notes?: string | null
          actioned_at?: string | null
          actioned_by?: string | null
          alert_type: string
          conversation_id: string
          created_at?: string | null
          detected_keywords?: string[] | null
          from_stage?: string | null
          id?: string
          lead_id?: string | null
          message?: string | null
          rule_id?: string | null
          status?: string | null
          tenant_id?: string
          title: string
          to_stage?: string | null
          trigger_message?: string | null
          viewed_at?: string | null
        }
        Update: {
          action_notes?: string | null
          actioned_at?: string | null
          actioned_by?: string | null
          alert_type?: string
          conversation_id?: string
          created_at?: string | null
          detected_keywords?: string[] | null
          from_stage?: string | null
          id?: string
          lead_id?: string | null
          message?: string | null
          rule_id?: string | null
          status?: string | null
          tenant_id?: string
          title?: string
          to_stage?: string | null
          trigger_message?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_seller_alerts_actioned_by_fkey"
            columns: ["actioned_by"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_alerts_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "instagram_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_alerts_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_alerts_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "social_seller_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_alerts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      social_seller_rules: {
        Row: {
          alert_message: string | null
          create_alert: boolean | null
          created_at: string | null
          description: string | null
          from_stage_id: string | null
          id: string
          is_active: boolean | null
          name: string
          notification_template: string | null
          notify_whatsapp: boolean | null
          priority: number | null
          tenant_id: string
          to_stage_id: string
          trigger_config: Json
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          alert_message?: string | null
          create_alert?: boolean | null
          created_at?: string | null
          description?: string | null
          from_stage_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notification_template?: string | null
          notify_whatsapp?: boolean | null
          priority?: number | null
          tenant_id?: string
          to_stage_id: string
          trigger_config?: Json
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          alert_message?: string | null
          create_alert?: boolean | null
          created_at?: string | null
          description?: string | null
          from_stage_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notification_template?: string | null
          notify_whatsapp?: boolean | null
          priority?: number | null
          tenant_id?: string
          to_stage_id?: string
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_seller_rules_from_stage_id_fkey"
            columns: ["from_stage_id"]
            isOneToOne: false
            referencedRelation: "social_seller_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_seller_rules_to_stage_id_fkey"
            columns: ["to_stage_id"]
            isOneToOne: false
            referencedRelation: "social_seller_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      social_seller_stages: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_converted: boolean | null
          is_final: boolean | null
          name: string
          position: number
          slug: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_converted?: boolean | null
          is_final?: boolean | null
          name: string
          position: number
          slug: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_converted?: boolean | null
          is_final?: boolean | null
          name?: string
          position?: number
          slug?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_seller_stages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          auth_user_id: string | null
          availability_status: string
          avatar_url: string | null
          created_at: string | null
          current_activity: string | null
          current_activity_at: string | null
          current_activity_meta: Json | null
          email: string
          focus_mode_config: Json | null
          focus_mode_enabled: boolean | null
          google_access_token: string | null
          google_calendar_connected: boolean | null
          google_calendar_sync_token: string | null
          google_calendar_watch_channel_id: string | null
          google_calendar_watch_expiration: string | null
          google_calendar_watch_resource_id: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          id: string
          is_active: boolean | null
          is_superadmin: boolean | null
          name: string
          paused_at: string | null
          paused_reason: string | null
          phone: string | null
          role: string
          sub_role: string | null
          team: string | null
          telnyx_caller_id: string | null
          telnyx_enabled: boolean | null
          tenant_id: string
          twilio_caller_id: string | null
          twilio_enabled: boolean | null
          updated_at: string | null
          wavoip_device_id: string | null
          whatsapp_instance_id: string | null
          zadarma_caller_id: string | null
          zadarma_enabled: boolean | null
          zadarma_sip: string | null
          zadarma_sip_password: string | null
        }
        Insert: {
          auth_user_id?: string | null
          availability_status?: string
          avatar_url?: string | null
          created_at?: string | null
          current_activity?: string | null
          current_activity_at?: string | null
          current_activity_meta?: Json | null
          email: string
          focus_mode_config?: Json | null
          focus_mode_enabled?: boolean | null
          google_access_token?: string | null
          google_calendar_connected?: boolean | null
          google_calendar_sync_token?: string | null
          google_calendar_watch_channel_id?: string | null
          google_calendar_watch_expiration?: string | null
          google_calendar_watch_resource_id?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_superadmin?: boolean | null
          name: string
          paused_at?: string | null
          paused_reason?: string | null
          phone?: string | null
          role?: string
          sub_role?: string | null
          team?: string | null
          telnyx_caller_id?: string | null
          telnyx_enabled?: boolean | null
          tenant_id?: string
          twilio_caller_id?: string | null
          twilio_enabled?: boolean | null
          updated_at?: string | null
          wavoip_device_id?: string | null
          whatsapp_instance_id?: string | null
          zadarma_caller_id?: string | null
          zadarma_enabled?: boolean | null
          zadarma_sip?: string | null
          zadarma_sip_password?: string | null
        }
        Update: {
          auth_user_id?: string | null
          availability_status?: string
          avatar_url?: string | null
          created_at?: string | null
          current_activity?: string | null
          current_activity_at?: string | null
          current_activity_meta?: Json | null
          email?: string
          focus_mode_config?: Json | null
          focus_mode_enabled?: boolean | null
          google_access_token?: string | null
          google_calendar_connected?: boolean | null
          google_calendar_sync_token?: string | null
          google_calendar_watch_channel_id?: string | null
          google_calendar_watch_expiration?: string | null
          google_calendar_watch_resource_id?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_superadmin?: boolean | null
          name?: string
          paused_at?: string | null
          paused_reason?: string | null
          phone?: string | null
          role?: string
          sub_role?: string | null
          team?: string | null
          telnyx_caller_id?: string | null
          telnyx_enabled?: boolean | null
          tenant_id?: string
          twilio_caller_id?: string | null
          twilio_enabled?: boolean | null
          updated_at?: string | null
          wavoip_device_id?: string | null
          whatsapp_instance_id?: string | null
          zadarma_caller_id?: string | null
          zadarma_enabled?: boolean | null
          zadarma_sip?: string | null
          zadarma_sip_password?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_wavoip_device_id_fkey"
            columns: ["wavoip_device_id"]
            isOneToOne: false
            referencedRelation: "wavoip_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_whatsapp_instance_id_fkey"
            columns: ["whatsapp_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_config: {
        Row: {
          api_key: string | null
          background_color: string | null
          commission_config: Json | null
          commission_type: string | null
          company_name: string
          created_at: string | null
          custom_domain: string | null
          default_pipeline_id: string | null
          favicon_url: string | null
          features: Json | null
          id: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          tenant_id: string
          text_color: string | null
          updated_at: string | null
        }
        Insert: {
          api_key?: string | null
          background_color?: string | null
          commission_config?: Json | null
          commission_type?: string | null
          company_name: string
          created_at?: string | null
          custom_domain?: string | null
          default_pipeline_id?: string | null
          favicon_url?: string | null
          features?: Json | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tenant_id: string
          text_color?: string | null
          updated_at?: string | null
        }
        Update: {
          api_key?: string | null
          background_color?: string | null
          commission_config?: Json | null
          commission_type?: string | null
          company_name?: string
          created_at?: string | null
          custom_domain?: string | null
          default_pipeline_id?: string | null
          favicon_url?: string | null
          features?: Json | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tenant_id?: string
          text_color?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_email_config: {
        Row: {
          app_url: string | null
          company_address: string | null
          company_name: string | null
          created_at: string | null
          domain_verified: boolean | null
          from_email: string | null
          from_name: string | null
          is_active: boolean | null
          reply_to: string | null
          resend_api_key: string | null
          resend_webhook_secret: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          app_url?: string | null
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          domain_verified?: boolean | null
          from_email?: string | null
          from_name?: string | null
          is_active?: boolean | null
          reply_to?: string | null
          resend_api_key?: string | null
          resend_webhook_secret?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          app_url?: string | null
          company_address?: string | null
          company_name?: string | null
          created_at?: string | null
          domain_verified?: boolean | null
          from_email?: string | null
          from_name?: string | null
          is_active?: boolean | null
          reply_to?: string | null
          resend_api_key?: string | null
          resend_webhook_secret?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tenant_sales_config: {
        Row: {
          cadence_rules: Json
          closer_accept_required: boolean
          closer_daily_call_target: number | null
          closer_distribution_config_id: string | null
          closer_pipeline_id: string | null
          created_at: string
          has_sdr_closer_split: boolean
          id: string
          meeting_prep_window_minutes: number
          noshow_auto_return: boolean
          noshow_return_after_hours: number | null
          retry_cooldown_minutes: number
          sdr_daily_call_target: number | null
          sdr_pipeline_id: string | null
          sla_minutes: number
          stage_role_mapping: Json | null
          task_grace_minutes: number
          tenant_id: string
          transfer_auto_assign_closer: boolean
          transfer_required_fields: Json
          updated_at: string
        }
        Insert: {
          cadence_rules?: Json
          closer_accept_required?: boolean
          closer_daily_call_target?: number | null
          closer_distribution_config_id?: string | null
          closer_pipeline_id?: string | null
          created_at?: string
          has_sdr_closer_split?: boolean
          id?: string
          meeting_prep_window_minutes?: number
          noshow_auto_return?: boolean
          noshow_return_after_hours?: number | null
          retry_cooldown_minutes?: number
          sdr_daily_call_target?: number | null
          sdr_pipeline_id?: string | null
          sla_minutes?: number
          stage_role_mapping?: Json | null
          task_grace_minutes?: number
          tenant_id: string
          transfer_auto_assign_closer?: boolean
          transfer_required_fields?: Json
          updated_at?: string
        }
        Update: {
          cadence_rules?: Json
          closer_accept_required?: boolean
          closer_daily_call_target?: number | null
          closer_distribution_config_id?: string | null
          closer_pipeline_id?: string | null
          created_at?: string
          has_sdr_closer_split?: boolean
          id?: string
          meeting_prep_window_minutes?: number
          noshow_auto_return?: boolean
          noshow_return_after_hours?: number | null
          retry_cooldown_minutes?: number
          sdr_daily_call_target?: number | null
          sdr_pipeline_id?: string | null
          sla_minutes?: number
          stage_role_mapping?: Json | null
          task_grace_minutes?: number
          tenant_id?: string
          transfer_auto_assign_closer?: boolean
          transfer_required_fields?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_sales_config_closer_distribution_config_id_fkey"
            columns: ["closer_distribution_config_id"]
            isOneToOne: false
            referencedRelation: "lead_distribution_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_sales_config_closer_pipeline_id_fkey"
            columns: ["closer_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_sales_config_sdr_pipeline_id_fkey"
            columns: ["sdr_pipeline_id"]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_sales_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          deal_id: string | null
          deal_payment_id: string | null
          id: string
          lead_id: string | null
          payment_method: string | null
          payment_platform: string | null
          product_id: string | null
          product_name: string | null
          status: string
          tenant_id: string
          transaction_date: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          deal_id?: string | null
          deal_payment_id?: string | null
          id?: string
          lead_id?: string | null
          payment_method?: string | null
          payment_platform?: string | null
          product_id?: string | null
          product_name?: string | null
          status?: string
          tenant_id?: string
          transaction_date?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          deal_id?: string | null
          deal_payment_id?: string | null
          id?: string
          lead_id?: string | null
          payment_method?: string | null
          payment_platform?: string | null
          product_id?: string | null
          product_name?: string | null
          status?: string
          tenant_id?: string
          transaction_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals_with_vehicle"
            referencedColumns: ["deal_id"]
          },
          {
            foreignKeyName: "transactions_deal_payment_id_fkey"
            columns: ["deal_payment_id"]
            isOneToOne: false
            referencedRelation: "deal_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      twilio_call_logs: {
        Row: {
          call_history_id: string | null
          call_sid: string
          call_status: string
          caller_id: string | null
          created_at: string | null
          direction: string | null
          duration: number | null
          error_code: string | null
          error_message: string | null
          from_number: string | null
          id: string
          parent_call_sid: string | null
          raw_params: Json | null
          sip_response_code: string | null
          team_member_id: string | null
          timestamp: string | null
          to_number: string | null
        }
        Insert: {
          call_history_id?: string | null
          call_sid: string
          call_status: string
          caller_id?: string | null
          created_at?: string | null
          direction?: string | null
          duration?: number | null
          error_code?: string | null
          error_message?: string | null
          from_number?: string | null
          id?: string
          parent_call_sid?: string | null
          raw_params?: Json | null
          sip_response_code?: string | null
          team_member_id?: string | null
          timestamp?: string | null
          to_number?: string | null
        }
        Update: {
          call_history_id?: string | null
          call_sid?: string
          call_status?: string
          caller_id?: string | null
          created_at?: string | null
          direction?: string | null
          duration?: number | null
          error_code?: string | null
          error_message?: string | null
          from_number?: string | null
          id?: string
          parent_call_sid?: string | null
          raw_params?: Json | null
          sip_response_code?: string | null
          team_member_id?: string | null
          timestamp?: string | null
          to_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "twilio_call_logs_call_history_id_fkey"
            columns: ["call_history_id"]
            isOneToOne: false
            referencedRelation: "call_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "twilio_call_logs_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          body: string | null
          category: string | null
          color: string | null
          condition: string | null
          created_at: string | null
          description: string | null
          doors: number | null
          fabric_year: number | null
          features: Json | null
          fipe: string | null
          fuel: string | null
          full_plate: string | null
          gear: string | null
          hp: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          is_sold: boolean | null
          last_seen_at: string | null
          last_updated_at: string | null
          location_city: string | null
          location_country: string | null
          location_state: string | null
          make: string | null
          mileage: number | null
          model: string | null
          motor: string | null
          negotiation: string | null
          neighborhood: string | null
          plate: string | null
          price: number | null
          promotion_price: number | null
          published_at: string | null
          raw_xml: string | null
          regular_price: number | null
          seller: string
          tenant_id: string
          title: string
          updated_at: string | null
          url: string | null
          version: string | null
          video: string | null
          year: number | null
          zip_code: string | null
        }
        Insert: {
          body?: string | null
          category?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          doors?: number | null
          fabric_year?: number | null
          features?: Json | null
          fipe?: string | null
          fuel?: string | null
          full_plate?: string | null
          gear?: string | null
          hp?: string | null
          id: string
          images?: Json | null
          is_active?: boolean | null
          is_sold?: boolean | null
          last_seen_at?: string | null
          last_updated_at?: string | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          make?: string | null
          mileage?: number | null
          model?: string | null
          motor?: string | null
          negotiation?: string | null
          neighborhood?: string | null
          plate?: string | null
          price?: number | null
          promotion_price?: number | null
          published_at?: string | null
          raw_xml?: string | null
          regular_price?: number | null
          seller: string
          tenant_id?: string
          title: string
          updated_at?: string | null
          url?: string | null
          version?: string | null
          video?: string | null
          year?: number | null
          zip_code?: string | null
        }
        Update: {
          body?: string | null
          category?: string | null
          color?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          doors?: number | null
          fabric_year?: number | null
          features?: Json | null
          fipe?: string | null
          fuel?: string | null
          full_plate?: string | null
          gear?: string | null
          hp?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_sold?: boolean | null
          last_seen_at?: string | null
          last_updated_at?: string | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          make?: string | null
          mileage?: number | null
          model?: string | null
          motor?: string | null
          negotiation?: string | null
          neighborhood?: string | null
          plate?: string | null
          price?: number | null
          promotion_price?: number | null
          published_at?: string | null
          raw_xml?: string | null
          regular_price?: number | null
          seller?: string
          tenant_id?: string
          title?: string
          updated_at?: string | null
          url?: string | null
          version?: string | null
          video?: string | null
          year?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      wa_communities: {
        Row: {
          community_jid: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          instance_id: string
          invite_link: string | null
          member_count: number
          metadata: Json
          name: string
          picture_url: string | null
          updated_at: string
        }
        Insert: {
          community_jid?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          instance_id: string
          invite_link?: string | null
          member_count?: number
          metadata?: Json
          name: string
          picture_url?: string | null
          updated_at?: string
        }
        Update: {
          community_jid?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          instance_id?: string
          invite_link?: string | null
          member_count?: number
          metadata?: Json
          name?: string
          picture_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wa_communities_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_community_campaign_items: {
        Row: {
          campaign_id: string
          capacity: number
          clicks: number
          community_id: string
          created_at: string
          filled_at: string | null
          id: string
          position: number
          status: string
        }
        Insert: {
          campaign_id: string
          capacity?: number
          clicks?: number
          community_id: string
          created_at?: string
          filled_at?: string | null
          id?: string
          position: number
          status?: string
        }
        Update: {
          campaign_id?: string
          capacity?: number
          clicks?: number
          community_id?: string
          created_at?: string
          filled_at?: string | null
          id?: string
          position?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "wa_community_campaign_items_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "wa_community_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_community_campaign_items_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "wa_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_community_campaigns: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          fallback_url: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          total_clicks: number
          updated_at: string
          webinar_config_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          fallback_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          total_clicks?: number
          updated_at?: string
          webinar_config_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          fallback_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          total_clicks?: number
          updated_at?: string
          webinar_config_id?: string | null
        }
        Relationships: []
      }
      wa_community_groups: {
        Row: {
          community_id: string
          created_at: string
          description: string | null
          group_jid: string | null
          id: string
          invite_link: string | null
          is_default: boolean
          member_count: number
          metadata: Json
          name: string
          picture_url: string | null
          type: string
          updated_at: string
        }
        Insert: {
          community_id: string
          created_at?: string
          description?: string | null
          group_jid?: string | null
          id?: string
          invite_link?: string | null
          is_default?: boolean
          member_count?: number
          metadata?: Json
          name: string
          picture_url?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          community_id?: string
          created_at?: string
          description?: string | null
          group_jid?: string | null
          id?: string
          invite_link?: string | null
          is_default?: boolean
          member_count?: number
          metadata?: Json
          name?: string
          picture_url?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wa_community_groups_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "wa_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_message_sequences: {
        Row: {
          community_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          trigger: string
          updated_at: string
        }
        Insert: {
          community_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          trigger?: string
          updated_at?: string
        }
        Update: {
          community_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          trigger?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wa_message_sequences_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "wa_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_scheduled_messages: {
        Row: {
          attempts: number
          community_id: string | null
          content: string | null
          created_at: string
          created_by: string | null
          enrollment_id: string | null
          error: string | null
          id: string
          instance_id: string
          media_url: string | null
          message_type: string
          metadata: Json
          scheduled_for: string
          sent_at: string | null
          sequence_id: string | null
          sequence_step_id: string | null
          status: string
          target_group_id: string | null
          target_jid: string
          whatsapp_message_id: string | null
        }
        Insert: {
          attempts?: number
          community_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          enrollment_id?: string | null
          error?: string | null
          id?: string
          instance_id: string
          media_url?: string | null
          message_type?: string
          metadata?: Json
          scheduled_for: string
          sent_at?: string | null
          sequence_id?: string | null
          sequence_step_id?: string | null
          status?: string
          target_group_id?: string | null
          target_jid: string
          whatsapp_message_id?: string | null
        }
        Update: {
          attempts?: number
          community_id?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          enrollment_id?: string | null
          error?: string | null
          id?: string
          instance_id?: string
          media_url?: string | null
          message_type?: string
          metadata?: Json
          scheduled_for?: string
          sent_at?: string | null
          sequence_id?: string | null
          sequence_step_id?: string | null
          status?: string
          target_group_id?: string | null
          target_jid?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wa_scheduled_messages_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "wa_communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_scheduled_messages_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "wa_sequence_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_scheduled_messages_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_scheduled_messages_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "wa_message_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_scheduled_messages_sequence_step_id_fkey"
            columns: ["sequence_step_id"]
            isOneToOne: false
            referencedRelation: "wa_sequence_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_scheduled_messages_target_group_id_fkey"
            columns: ["target_group_id"]
            isOneToOne: false
            referencedRelation: "wa_community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_sequence_enrollments: {
        Row: {
          completed_at: string | null
          current_step: number
          enrolled_at: string
          id: string
          member_jid: string | null
          member_name: string | null
          member_phone: string | null
          metadata: Json
          next_run_at: string | null
          sequence_id: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          current_step?: number
          enrolled_at?: string
          id?: string
          member_jid?: string | null
          member_name?: string | null
          member_phone?: string | null
          metadata?: Json
          next_run_at?: string | null
          sequence_id: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          current_step?: number
          enrolled_at?: string
          id?: string
          member_jid?: string | null
          member_name?: string | null
          member_phone?: string | null
          metadata?: Json
          next_run_at?: string | null
          sequence_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "wa_sequence_enrollments_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "wa_message_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      wa_sequence_steps: {
        Row: {
          content: string | null
          created_at: string
          delay_unit: string
          delay_value: number
          id: string
          media_url: string | null
          message_type: string
          metadata: Json
          sequence_id: string
          step_order: number
          target_group_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          delay_unit?: string
          delay_value?: number
          id?: string
          media_url?: string | null
          message_type?: string
          metadata?: Json
          sequence_id: string
          step_order: number
          target_group_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          delay_unit?: string
          delay_value?: number
          id?: string
          media_url?: string | null
          message_type?: string
          metadata?: Json
          sequence_id?: string
          step_order?: number
          target_group_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wa_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "wa_message_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wa_sequence_steps_target_group_id_fkey"
            columns: ["target_group_id"]
            isOneToOne: false
            referencedRelation: "wa_community_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      wavoip_devices: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string | null
          phone_number: string | null
          status: string | null
          team_member_id: string | null
          tenant_id: string
          token: string
          updated_at: string | null
          webhook_configured: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          phone_number?: string | null
          status?: string | null
          team_member_id?: string | null
          tenant_id?: string
          token: string
          updated_at?: string | null
          webhook_configured?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          phone_number?: string | null
          status?: string | null
          team_member_id?: string | null
          tenant_id?: string
          token?: string
          updated_at?: string | null
          webhook_configured?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "wavoip_devices_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wavoip_devices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      webinar_config: {
        Row: {
          created_at: string | null
          event_date: string | null
          id: string
          tenant_id: string
          title: string | null
        }
        Insert: {
          created_at?: string | null
          event_date?: string | null
          id?: string
          tenant_id?: string
          title?: string | null
        }
        Update: {
          created_at?: string | null
          event_date?: string | null
          id?: string
          tenant_id?: string
          title?: string | null
        }
        Relationships: []
      }
      whatsapp_cloud_templates: {
        Row: {
          category: string
          components: Json
          created_at: string | null
          created_by: string | null
          id: string
          internal_tags: string[]
          language: string
          meta_template_id: string | null
          meta_waba_id: string | null
          name: string
          rejection_reason: string | null
          status: string
          tenant_id: string
          updated_at: string | null
          variables_count: number | null
        }
        Insert: {
          category: string
          components?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          internal_tags?: string[]
          language?: string
          meta_template_id?: string | null
          meta_waba_id?: string | null
          name: string
          rejection_reason?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          variables_count?: number | null
        }
        Update: {
          category?: string
          components?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          internal_tags?: string[]
          language?: string
          meta_template_id?: string | null
          meta_waba_id?: string | null
          name?: string
          rejection_reason?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string | null
          variables_count?: number | null
        }
        Relationships: []
      }
      whatsapp_group_members: {
        Row: {
          group_id: string | null
          id: string
          is_admin: boolean | null
          joined_at: string | null
          lead_id: string | null
          metadata: Json | null
          name: string | null
          phone: string
          tenant_id: string
        }
        Insert: {
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          joined_at?: string | null
          lead_id?: string | null
          metadata?: Json | null
          name?: string | null
          phone: string
          tenant_id?: string
        }
        Update: {
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          joined_at?: string | null
          lead_id?: string | null
          metadata?: Json | null
          name?: string | null
          phone?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_group_members_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_group_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_groups: {
        Row: {
          created_at: string | null
          description: string | null
          group_jid: string
          group_type: string | null
          id: string
          instance_id: string | null
          is_active: boolean | null
          metadata: Json | null
          name: string | null
          owner_jid: string | null
          participant_count: number | null
          photo_url: string | null
          purposes: string[] | null
          tenant_id: string
          updated_at: string | null
          whatsapp_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          group_jid: string
          group_type?: string | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          owner_jid?: string | null
          participant_count?: number | null
          photo_url?: string | null
          purposes?: string[] | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          group_jid?: string
          group_type?: string | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          owner_jid?: string | null
          participant_count?: number | null
          photo_url?: string | null
          purposes?: string[] | null
          tenant_id?: string
          updated_at?: string | null
          whatsapp_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_groups_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_groups_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_instances: {
        Row: {
          api_key: string | null
          api_url: string | null
          bypass_disconnect: boolean | null
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          phone_number: string | null
          purpose: string
          status: string | null
          teams: string[] | null
          tenant_id: string
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          api_key?: string | null
          api_url?: string | null
          bypass_disconnect?: boolean | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone_number?: string | null
          purpose?: string
          status?: string | null
          teams?: string[] | null
          tenant_id?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_key?: string | null
          api_url?: string | null
          bypass_disconnect?: boolean | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone_number?: string | null
          purpose?: string
          status?: string | null
          teams?: string[] | null
          tenant_id?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_instances_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_messages: {
        Row: {
          content: string | null
          created_at: string | null
          edited_at: string | null
          group_id: string | null
          id: string
          instance_id: string | null
          is_deleted: boolean | null
          is_edited: boolean | null
          is_from_me: boolean | null
          lead_id: string | null
          media_url: string | null
          message_id: string
          message_type: string | null
          metadata: Json | null
          reactions: Json | null
          remote_jid: string | null
          sender_name: string | null
          sender_phone: string | null
          sent_at: string
          status: string | null
          tenant_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          group_id?: string | null
          id?: string
          instance_id?: string | null
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_from_me?: boolean | null
          lead_id?: string | null
          media_url?: string | null
          message_id: string
          message_type?: string | null
          metadata?: Json | null
          reactions?: Json | null
          remote_jid?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          sent_at: string
          status?: string | null
          tenant_id?: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          group_id?: string | null
          id?: string
          instance_id?: string | null
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_from_me?: boolean | null
          lead_id?: string | null
          media_url?: string | null
          message_id?: string
          message_type?: string | null
          metadata?: Json | null
          reactions?: Json | null
          remote_jid?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          sent_at?: string
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_task_bot_config: {
        Row: {
          ai_prompt: string
          auto_assign_to_sender: boolean | null
          bot_mention_id: string
          context_messages_count: number | null
          created_at: string | null
          default_task_type: string | null
          enabled_group_ids: string[] | null
          id: string
          instance_id: string | null
          is_active: boolean | null
          name: string
          notify_on_creation: boolean | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          ai_prompt?: string
          auto_assign_to_sender?: boolean | null
          bot_mention_id: string
          context_messages_count?: number | null
          created_at?: string | null
          default_task_type?: string | null
          enabled_group_ids?: string[] | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          name?: string
          notify_on_creation?: boolean | null
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          ai_prompt?: string
          auto_assign_to_sender?: boolean | null
          bot_mention_id?: string
          context_messages_count?: number | null
          created_at?: string | null
          default_task_type?: string | null
          enabled_group_ids?: string[] | null
          id?: string
          instance_id?: string | null
          is_active?: boolean | null
          name?: string
          notify_on_creation?: boolean | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_task_bot_config_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_task_bot_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_task_bot_logs: {
        Row: {
          action_taken: string | null
          ai_response: Json | null
          config_id: string | null
          context_messages: Json | null
          created_at: string | null
          error: string | null
          group_id: string | null
          id: string
          response_message: string | null
          sender_name: string | null
          sender_phone: string | null
          task_id: string | null
          tenant_id: string
          trigger_content: string | null
          trigger_message_id: string | null
        }
        Insert: {
          action_taken?: string | null
          ai_response?: Json | null
          config_id?: string | null
          context_messages?: Json | null
          created_at?: string | null
          error?: string | null
          group_id?: string | null
          id?: string
          response_message?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          task_id?: string | null
          tenant_id?: string
          trigger_content?: string | null
          trigger_message_id?: string | null
        }
        Update: {
          action_taken?: string | null
          ai_response?: Json | null
          config_id?: string | null
          context_messages?: Json | null
          created_at?: string | null
          error?: string | null
          group_id?: string | null
          id?: string
          response_message?: string | null
          sender_name?: string | null
          sender_phone?: string | null
          task_id?: string | null
          tenant_id?: string
          trigger_content?: string | null
          trigger_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_task_bot_logs_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_task_bot_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_task_bot_logs_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_task_bot_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_template_tags: {
        Row: {
          color: string
          created_at: string | null
          icon: string | null
          id: string
          label: string
          position: number
          slug: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          label: string
          position?: number
          slug: string
          tenant_id?: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          label?: string
          position?: number
          slug?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      deals_with_vehicle: {
        Row: {
          deal_id: string | null
          vehicle_id: string | null
          vehicle_image: string | null
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_price: number | null
          vehicle_title: string | null
          vehicle_year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      v_ai_agent_dashboard: {
        Row: {
          active_conversations: number | null
          agent_id: string | null
          agent_name: string | null
          failed_in_queue: number | null
          is_active: boolean | null
          paused_conversations: number | null
          pending_in_queue: number | null
          tenant_id: string | null
          total_conversations: number | null
          total_messages_sent: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_sales_agents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _agent_blacklist_tables: { Args: never; Returns: string[] }
      agent_change_stage: {
        Args: {
          p_agent_id: string
          p_allow_regression?: boolean
          p_deal_id: string
          p_reason?: string
          p_session_id?: string
          p_stage_id?: string
          p_stage_name?: string
        }
        Returns: Json
      }
      agent_check_availability: {
        Args: {
          p_buffer_minutes?: number
          p_closer_ids: string[]
          p_days_ahead?: number
          p_duration_minutes?: number
          p_max_slots?: number
          p_working_hour_end?: string
          p_working_hour_start?: string
        }
        Returns: Json
      }
      agent_complete_task: {
        Args: { p_agent_id?: string; p_task_id: string }
        Returns: Json
      }
      agent_confirm_meeting: {
        Args: {
          p_activity_id: string
          p_agent_id: string
          p_session_id?: string
        }
        Returns: Json
      }
      agent_create_deal: {
        Args: {
          p_agent_id: string
          p_lead_id: string
          p_pipeline_id?: string
          p_title?: string
          p_user_id?: string
          p_value?: number
        }
        Returns: Json
      }
      agent_create_from_template: {
        Args: {
          p_color?: string
          p_created_by?: string
          p_credential_id?: string
          p_description?: string
          p_emoji?: string
          p_name: string
          p_slug: string
          p_template_id: string
          p_vars?: Json
        }
        Returns: string
      }
      agent_create_job: {
        Args: {
          p_agent_id: string
          p_channel: string
          p_external_id: string
          p_poll_config: Json
          p_provider?: string
          p_resume_context?: Json
          p_session_id: string
          p_tool_name: string
        }
        Returns: Json
      }
      agent_create_lead: {
        Args: {
          p_agent_id: string
          p_create_deal?: boolean
          p_deal_title?: string
          p_email?: string
          p_name: string
          p_phone?: string
          p_source?: string
          p_user_id?: string
        }
        Returns: Json
      }
      agent_create_task: {
        Args: {
          p_agent_id: string
          p_description?: string
          p_due_at?: string
          p_name: string
          p_priority?: string
          p_responsavel_id?: string
          p_user_id?: string
        }
        Returns: Json
      }
      agent_describe_function: { Args: { p_fn_name: string }; Returns: Json }
      agent_describe_table: {
        Args: { p_table: string; p_user_id?: string }
        Returns: Json
      }
      agent_execute_readonly: {
        Args: { p_sql: string; p_user_id?: string }
        Returns: Json
      }
      agent_get_credential_data: {
        Args: { p_owner_user_id?: string; p_provider_type: string }
        Returns: Json
      }
      agent_jobs_mark_timeouts: { Args: never; Returns: number }
      agent_list_notes: {
        Args: {
          p_agent_id: string
          p_limit?: number
          p_search?: string
          p_tag?: string
        }
        Returns: Json
      }
      agent_list_tables: {
        Args: { p_user_id?: string }
        Returns: {
          comment: string
          row_count_estimate: number
          table_name: string
        }[]
      }
      agent_mark_deal_lost: {
        Args: {
          p_agent_id: string
          p_deal_id: string
          p_reason: string
          p_session_id?: string
        }
        Returns: Json
      }
      agent_qualify_lead: {
        Args: {
          p_agent_id: string
          p_authority?: string
          p_criteria_used?: Json
          p_icp_decision?: string
          p_lead_id: string
          p_llm_input?: Json
          p_llm_model?: string
          p_llm_output?: Json
          p_monthly_revenue_max?: number
          p_monthly_revenue_min?: number
          p_need_score?: number
          p_potential_revenue?: number
          p_reason?: string
          p_revenue_confidence?: string
          p_revenue_notes?: string
          p_session_id?: string
          p_timeline_months?: number
        }
        Returns: Json
      }
      agent_read_note: {
        Args: { p_agent_id: string; p_title: string }
        Returns: Json
      }
      agent_reminder_complete: {
        Args: { p_reminder_id: string }
        Returns: Json
      }
      agent_reminders_due: {
        Args: never
        Returns: {
          agent_id: string
          channel: string
          created_at: string
          error: string | null
          fire_at: string
          id: string
          message: string
          repeat_every_minutes: number | null
          repeat_until: string | null
          resume_context: Json
          sent_at: string | null
          session_id: string | null
          status: string
          times_fired: number
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_reminders"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      agent_reschedule_meeting: {
        Args: {
          p_activity_id: string
          p_agent_id: string
          p_new_start_at: string
          p_reason?: string
          p_session_id?: string
        }
        Returns: Json
      }
      agent_resolve_tenant: { Args: { p_user_id?: string }; Returns: string }
      agent_route_lookup: {
        Args: { p_channel: string; p_ctx?: Json; p_instance_id: string }
        Returns: {
          agent_id: string
          agent_slug: string
          deployment_id: string
          match_used: Json
          priority: number
        }[]
      }
      agent_save_note: {
        Args: {
          p_agent_id: string
          p_content: string
          p_mode?: string
          p_tags?: string[]
          p_title: string
          p_user_id: string
        }
        Returns: Json
      }
      agent_schedule_followup: {
        Args: {
          p_agent_id: string
          p_lead_id: string
          p_message_brief: string
          p_reason?: string
          p_scheduled_for: string
          p_session_id?: string
        }
        Returns: Json
      }
      agent_schedule_meeting: {
        Args: {
          p_agent_id: string
          p_closer_id: string
          p_duration_minutes?: number
          p_lead_id: string
          p_notes?: string
          p_session_id?: string
          p_start_at: string
          p_title?: string
        }
        Returns: Json
      }
      agent_schedule_reminder: {
        Args: {
          p_agent_id: string
          p_channel: string
          p_deal_id?: string
          p_fire_at: string
          p_instance_id?: string
          p_lead_id?: string
          p_message: string
          p_recipient?: string
          p_repeat_every_minutes?: number
          p_repeat_until?: string
          p_session_id: string
          p_user_id?: string
        }
        Returns: Json
      }
      agent_search_notes: {
        Args: {
          p_agent_id: string
          p_query: string
          p_query_embedding?: string
          p_top_k?: number
        }
        Returns: Json
      }
      agent_skill_get_vehicle: {
        Args: { p_user_id?: string; p_vehicle_id?: string }
        Returns: Json
      }
      agent_skill_list_vehicles: {
        Args: {
          p_body?: string
          p_fuel?: string
          p_limit?: number
          p_make?: string
          p_model?: string
          p_price_max?: number
          p_price_min?: number
          p_search?: string
          p_user_id?: string
          p_year_min?: number
        }
        Returns: Json
      }
      agent_skill_my_deals: {
        Args: { p_days_min?: number; p_stage?: string; p_user_id: string }
        Returns: {
          days_in_stage: number
          id: string
          lead_name: string
          stage: string
          status: string
          title: string
          value: number
        }[]
      }
      agent_skill_my_hot_leads: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          created_at: string
          id: string
          name: string
          phone: string
          temperature: string
          temperature_reason: string
        }[]
      }
      agent_skill_my_pipeline_summary: {
        Args: { p_pipeline_id?: string; p_user_id: string }
        Returns: {
          avg_days_in_stage: number
          deal_count: number
          stage: string
          total_value: number
        }[]
      }
      agent_skill_notify_human: {
        Args: {
          p_agent_id: string
          p_reason: string
          p_session_id: string
          p_user_id: string
        }
        Returns: string
      }
      agent_skill_now_br: {
        Args: never
        Returns: {
          date_br: string
          now_br: string
          time_br: string
          weekday: string
        }[]
      }
      agent_team_roster: {
        Args: never
        Returns: {
          is_active: boolean
          member_id: string
          name: string
          phone: string
          role: string
        }[]
      }
      agent_update_lead: {
        Args: {
          p_agent_id: string
          p_lead_id: string
          p_patch: Json
          p_reason?: string
          p_session_id?: string
        }
        Returns: Json
      }
      agents_search_archival: {
        Args: {
          p_agent_id: string
          p_k?: number
          p_query_embedding: string
          p_user_id: string
        }
        Returns: Json
      }
      agents_working_memory_merge: {
        Args: { p_patch: Json; p_session_id: string }
        Returns: Json
      }
      assign_conversation_agent: {
        Args: { p_agent_id: string; p_conversation_key: string }
        Returns: undefined
      }
      ativar_leads_no_playbook: {
        Args: { lead_ids: string[]; max_leads?: number }
        Returns: {
          id: string
          name: string
        }[]
      }
      auto_move_deal_to_em_contato: {
        Args: { p_lead_id: string; p_tenant_id?: string }
        Returns: undefined
      }
      bulk_transfer_deals:
        | {
            Args: {
              p_include_no_rep?: boolean
              p_source_pipeline_id?: string
              p_source_sales_rep_id?: string
              p_source_stage_id?: string
              p_target_pipeline_id?: string
              p_target_sales_rep_id?: string
              p_target_stage_id?: string
              p_tenant_id: string
              p_transfer_leads_too?: boolean
              p_transferred_by?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_created_after?: string
              p_created_before?: string
              p_include_no_rep?: boolean
              p_source_pipeline_id?: string
              p_source_sales_rep_id?: string
              p_source_stage_id?: string
              p_target_pipeline_id?: string
              p_target_sales_rep_id?: string
              p_target_stage_id?: string
              p_tenant_id: string
              p_transfer_leads_too?: boolean
              p_transferred_by?: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_created_after?: string
              p_created_before?: string
              p_include_no_rep?: boolean
              p_source_pipeline_id?: string
              p_source_sales_rep_id?: string
              p_source_stage_id?: string
              p_specific_deal_ids?: string[]
              p_target_pipeline_id?: string
              p_target_sales_rep_id?: string
              p_target_stage_id?: string
              p_tenant_id: string
              p_transfer_leads_too?: boolean
              p_transferred_by?: string
            }
            Returns: Json
          }
      calculate_wait_minutes: { Args: { wait_start: string }; Returns: number }
      claim_queue_messages: {
        Args: { p_batch_size?: number }
        Returns: {
          attempts: number | null
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string
          max_attempts: number | null
          message_content: string | null
          message_id: string | null
          message_metadata: Json | null
          processed_at: string | null
          result: Json | null
          scheduled_for: string
          status: string | null
          tenant_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "ai_agent_message_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      claim_scheduled_followups: {
        Args: { p_batch_size?: number }
        Returns: {
          agent_id: string | null
          attempts: number
          context_note: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          lead_id: string
          scheduled_at: string
          status: string
          tenant_id: string
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "ai_agent_scheduled_followups"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      clear_tenant_from_jwt: { Args: never; Returns: undefined }
      count_deals_for_transfer:
        | {
            Args: {
              p_include_no_rep?: boolean
              p_source_pipeline_id?: string
              p_source_sales_rep_id?: string
              p_source_stage_id?: string
              p_tenant_id: string
            }
            Returns: number
          }
        | {
            Args: {
              p_created_after?: string
              p_created_before?: string
              p_include_no_rep?: boolean
              p_source_pipeline_id?: string
              p_source_sales_rep_id?: string
              p_source_stage_id?: string
              p_tenant_id: string
            }
            Returns: number
          }
      create_impersonation_token: {
        Args: { target_member_id: string }
        Returns: string
      }
      dispatch_meta_ads_sync: { Args: never; Returns: undefined }
      enqueue_message_for_ai_agent: {
        Args: {
          p_debounce_seconds?: number
          p_lead_id: string
          p_message_content: string
          p_message_id: string
        }
        Returns: string
      }
      find_lead_by_phone: { Args: { p_phone: string }; Returns: string }
      find_lead_by_phone_suffix:
        | {
            Args: { p_suffix: string }
            Returns: {
              email: string
              id: string
              name: string
              original_source: string
              phone: string
              sales_rep_id: string
              source: string
              utm_campaign: string
              utm_content: string
              utm_medium: string
              utm_source: string
            }[]
          }
        | {
            Args: { p_suffix: string; p_tenant_id?: string }
            Returns: {
              email: string
              id: string
              name: string
              original_source: string
              phone: string
              sales_rep_id: string
              source: string
              utm_campaign: string
              utm_content: string
              utm_medium: string
              utm_source: string
            }[]
          }
      get_ai_agent_status_for_lead: {
        Args: { p_lead_id: string }
        Returns: {
          agent_name: string
          conversation_status: string
          has_agent: boolean
          is_paused: boolean
          last_processed_at: string
          messages_sent: number
          pause_reason: string
          paused_by_name: string
        }[]
      }
      get_avg_first_response_time: {
        Args: { p_end?: string; p_start?: string }
        Returns: {
          avg_hours: number
          sample_size: number
        }[]
      }
      get_call_analytics: {
        Args: {
          p_date_from?: string
          p_date_to?: string
          p_team_member_id?: string
        }
        Returns: Json
      }
      get_campaign_audience_count:
        | { Args: { p_filters: Json }; Returns: number }
        | { Args: { p_filters: Json; p_tenant_id: string }; Returns: number }
      get_conversation_messages: {
        Args: {
          p_group_id?: string
          p_instance_id?: string
          p_lead_id?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          content: string
          created_at: string
          edited_at: string
          group_id: string
          id: string
          instance_id: string
          instance_name: string
          instance_team: string
          is_deleted: boolean
          is_edited: boolean
          is_from_me: boolean
          lead_id: string
          media_url: string
          message_id: string
          message_type: string
          metadata: Json
          reactions: Json
          remote_jid: string
          sender_name: string
          sender_phone: string
          sent_at: string
          status: string
        }[]
      }
      get_conversation_notes: {
        Args: { p_group_id?: string; p_lead_id?: string }
        Returns: {
          content: string
          created_at: string
          created_by: string
          created_by_name: string
          id: string
          is_pinned: boolean
          note_type: string
        }[]
      }
      get_cs_inbox_with_metrics:
        | {
            Args: {
              p_health_filter?: string
              p_hide_handled?: boolean
              p_instance_id?: string
              p_limit?: number
              p_only_pending?: boolean
              p_only_with_tasks?: boolean
              p_product_filter?: string
              p_search?: string
              p_sla_filter?: string
              p_sort_mode?: string
            }
            Returns: {
              assigned_agent_id: string
              assigned_agent_name: string
              contact_phone: string
              conversation_id: string
              conversation_name: string
              conversation_type: string
              group_id: string
              handled_at: string
              handled_reason: string
              health_score: number
              health_status: string
              instance_id: string
              instance_name: string
              is_from_me: boolean
              is_handled: boolean
              last_message: string
              last_message_at: string
              last_sender_name: string
              lead_company_name: string
              lead_id: string
              lead_job_title: string
              lead_photo_url: string
              lead_products: string[]
              organization_id: string
              organization_name: string
              pending_reply: boolean
              pending_tasks_count: number
              sla_status: string
              unread_count: number
              wait_minutes: number
            }[]
          }
        | {
            Args: {
              p_funnel_filter?: string
              p_health_filter?: string
              p_hide_handled?: boolean
              p_instance_id?: string
              p_limit?: number
              p_only_pending?: boolean
              p_only_with_tasks?: boolean
              p_pipeline_id?: string
              p_product_filter?: string
              p_search?: string
              p_sla_filter?: string
              p_sort_mode?: string
              p_stage_id?: string
              p_team_filter?: string
            }
            Returns: {
              assigned_agent_id: string
              assigned_agent_name: string
              contact_phone: string
              conversation_id: string
              conversation_name: string
              conversation_type: string
              group_id: string
              handled_at: string
              handled_reason: string
              health_score: number
              health_status: string
              instance_id: string
              instance_name: string
              is_from_me: boolean
              is_handled: boolean
              last_message: string
              last_message_at: string
              last_sender_name: string
              lead_company_name: string
              lead_id: string
              lead_intent_cash: boolean
              lead_intent_finance_no_entry: boolean
              lead_intent_trade_in: boolean
              lead_job_title: string
              lead_negotiation_type: string
              lead_photo_url: string
              lead_products: string[]
              lead_vehicle_of_interest: Json
              organization_id: string
              organization_name: string
              pending_reply: boolean
              pending_tasks_count: number
              sla_status: string
              unread_count: number
              wait_minutes: number
            }[]
          }
      get_daily_activity_summary: {
        Args: { p_date?: string; p_team_member_id?: string }
        Returns: {
          calls_count: number
          deals_created: number
          leads_created: number
          messages_received: number
          messages_sent: number
          tasks_completed: number
        }[]
      }
      get_email_audience_count:
        | { Args: { p_filters?: Json }; Returns: number }
        | { Args: { p_filters?: Json; p_tenant_id: string }; Returns: number }
      get_focus_stage_mapping: {
        Args: { p_pipeline_id: string; p_tenant_id: string }
        Returns: Json
      }
      get_inbox_dashboard_metrics:
        | {
            Args: { p_instance_id?: string }
            Returns: {
              avg_wait_minutes: number
              critical_count: number
              max_wait_minutes: number
              ok_count: number
              resolved_today: number
              total_conversations: number
              total_pending: number
              warning_count: number
            }[]
          }
        | {
            Args: { p_instance_id: string; p_team_filter: string }
            Returns: {
              avg_wait_minutes: number
              critical_count: number
              max_wait_minutes: number
              ok_count: number
              resolved_today: number
              total_conversations: number
              total_pending: number
              warning_count: number
            }[]
          }
      get_instagram_inbox: {
        Args: {
          p_account_id?: string
          p_assigned_to?: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_stage_slug?: string
          p_status?: string
        }
        Returns: {
          account_id: string
          assigned_to: string
          created_at: string
          id: string
          last_client_message_at: string
          last_message: string
          last_message_at: string
          lead_id: string
          lead_instagram: string
          lead_name: string
          lead_phone: string
          participant_name: string
          participant_profile_pic: string
          participant_username: string
          stage_color: string
          stage_id: string
          stage_name: string
          stage_position: number
          stage_slug: string
          status: string
          thread_id: string
          total_messages: number
          unread_count: number
        }[]
      }
      get_last_interaction_by_leads: {
        Args: { p_lead_ids: string[] }
        Returns: {
          is_from_me: boolean
          last_interaction: string
          lead_id: string
        }[]
      }
      get_lead_by_phone: {
        Args: { p_phone: string }
        Returns: {
          company_name: string
          email: string
          id: string
          name: string
          phone: string
          sales_score: number
        }[]
      }
      get_next_distribution_member:
        | {
            Args: { p_config_id: string; p_require_availability?: boolean }
            Returns: string
          }
        | {
            Args: {
              p_config_id: string
              p_require_availability?: boolean
              p_tenant_id?: string
            }
            Returns: string
          }
      get_next_franchise_member: {
        Args: { p_campaign_id: string; p_city?: string }
        Returns: string
      }
      get_response_templates: {
        Args: { p_category?: string; p_team?: string }
        Returns: {
          category: string
          content: string
          id: string
          name: string
          shortcut: string
          usage_count: number
        }[]
      }
      get_sales_performance: {
        Args: { p_date_from?: string; p_date_to?: string }
        Returns: {
          deals_count: number
          lost_count: number
          team_member_id: string
          team_member_name: string
          total_revenue: number
          won_count: number
        }[]
      }
      get_social_seller_funnel_stats: {
        Args: { p_account_id?: string }
        Returns: {
          conversation_count: number
          stage_color: string
          stage_name: string
          stage_position: number
          stage_slug: string
          unread_count: number
        }[]
      }
      get_stale_leads_never_contacted: {
        Args: never
        Returns: {
          deal_created_at: string
          deal_id: string
          deal_pipeline_stage_id: string
          deal_sales_rep_id: string
          deal_updated_at: string
          lead_email: string
          lead_id: string
          lead_name: string
          lead_phone: string
          rep_name: string
          waiting_hours: number
        }[]
      }
      get_team_member_by_email: {
        Args: { user_email: string }
        Returns: {
          auth_user_id: string | null
          availability_status: string
          avatar_url: string | null
          created_at: string | null
          current_activity: string | null
          current_activity_at: string | null
          current_activity_meta: Json | null
          email: string
          focus_mode_config: Json | null
          focus_mode_enabled: boolean | null
          google_access_token: string | null
          google_calendar_connected: boolean | null
          google_calendar_sync_token: string | null
          google_calendar_watch_channel_id: string | null
          google_calendar_watch_expiration: string | null
          google_calendar_watch_resource_id: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          id: string
          is_active: boolean | null
          is_superadmin: boolean | null
          name: string
          paused_at: string | null
          paused_reason: string | null
          phone: string | null
          role: string
          sub_role: string | null
          team: string | null
          telnyx_caller_id: string | null
          telnyx_enabled: boolean | null
          tenant_id: string
          twilio_caller_id: string | null
          twilio_enabled: boolean | null
          updated_at: string | null
          wavoip_device_id: string | null
          whatsapp_instance_id: string | null
          zadarma_caller_id: string | null
          zadarma_enabled: boolean | null
          zadarma_sip: string | null
          zadarma_sip_password: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "team_members"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_tenant_branding: {
        Args: { lookup_domain?: string; lookup_name?: string }
        Returns: {
          background_color: string
          company_name: string
          custom_domain: string
          favicon_url: string
          logo_url: string
          primary_color: string
          secondary_color: string
          text_color: string
        }[]
      }
      get_tenant_id: { Args: never; Returns: string }
      get_tenant_options_for_email: {
        Args: { user_email: string }
        Returns: {
          tenant_id: string
          tenant_name: string
        }[]
      }
      get_tenant_sales_config: {
        Args: { p_tenant_id: string }
        Returns: {
          cadence_rules: Json
          closer_accept_required: boolean
          closer_daily_call_target: number | null
          closer_distribution_config_id: string | null
          closer_pipeline_id: string | null
          created_at: string
          has_sdr_closer_split: boolean
          id: string
          meeting_prep_window_minutes: number
          noshow_auto_return: boolean
          noshow_return_after_hours: number | null
          retry_cooldown_minutes: number
          sdr_daily_call_target: number | null
          sdr_pipeline_id: string | null
          sla_minutes: number
          stage_role_mapping: Json | null
          task_grace_minutes: number
          tenant_id: string
          transfer_auto_assign_closer: boolean
          transfer_required_fields: Json
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "tenant_sales_config"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_unread_messages_by_leads: {
        Args: { p_lead_ids: string[] }
        Returns: {
          lead_id: string
          unread_count: number
        }[]
      }
      get_user_by_email: {
        Args: { p_email: string }
        Returns: {
          email: string
          id: string
        }[]
      }
      health_check: { Args: never; Returns: Json }
      increment_campaign_counter: {
        Args: { p_campaign_id: string; p_field: string }
        Returns: undefined
      }
      increment_email_campaign_counter: {
        Args: { p_campaign_id: string; p_field: string }
        Returns: undefined
      }
      increment_training_view_count: {
        Args: { case_id: string }
        Returns: undefined
      }
      is_any_admin: { Args: never; Returns: boolean }
      is_superadmin: { Args: never; Returns: boolean }
      is_tenant_admin: { Args: never; Returns: boolean }
      link_auth_user_to_team_member: {
        Args: { user_email: string }
        Returns: undefined
      }
      list_available_vehicles: {
        Args: { p_limit?: number; p_pipeline_id?: string; p_search?: string }
        Returns: {
          color: string
          condition: string
          id: string
          image: string
          make: string
          mileage: number
          model: string
          price: number
          seller: string
          title: string
          year: number
        }[]
      }
      log_ai_agent_event: {
        Args: {
          p_agent_id?: string
          p_conversation_id?: string
          p_event_type: string
          p_lead_id: string
          p_message: string
          p_metadata?: Json
          p_reason?: string
        }
        Returns: string
      }
      mark_conversation_handled: {
        Args: {
          p_group_id?: string
          p_handled_by?: string
          p_lead_id?: string
          p_notes?: string
          p_reason?: string
        }
        Returns: Json
      }
      normalize_phone_last8: { Args: { p_phone: string }; Returns: string }
      pipeline_for_vehicle: { Args: { p_seller: string }; Returns: string }
      populate_campaign_leads:
        | { Args: { p_campaign_id: string }; Returns: number }
        | {
            Args: { p_campaign_id: string; p_tenant_id: string }
            Returns: number
          }
      populate_email_campaign_leads:
        | { Args: { p_campaign_id: string }; Returns: number }
        | {
            Args: { p_campaign_id: string; p_tenant_id: string }
            Returns: number
          }
      process_ai_agent_queue: { Args: never; Returns: undefined }
      release_agent_lock: { Args: { p_lead_id: string }; Returns: undefined }
      search_leads_focus: {
        Args: { rep_id?: string; search_term: string }
        Returns: {
          capital_disponivel: string
          city_name: string
          company_name: string
          deal_pipeline_stage_id: string
          deal_stage_name: string
          email: string
          id: string
          name: string
          phone: string
          sales_score: number
          sales_stage: string
          state: string
        }[]
      }
      select_tenant_for_user: {
        Args: { target_tenant_id: string }
        Returns: Json
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      try_acquire_agent_lock: {
        Args: { p_lead_id: string; p_lock_duration?: string }
        Returns: boolean
      }
      unaccent: { Args: { "": string }; Returns: string }
      unmark_conversation_handled: {
        Args: { p_group_id?: string; p_lead_id?: string }
        Returns: Json
      }
      update_sla_status: { Args: never; Returns: undefined }
      use_response_template: {
        Args: { p_template_id: string }
        Returns: undefined
      }
    }
    Enums: {
      contact_status: "lead" | "qualified" | "customer" | "churned"
      contact_type: "person" | "company"
      cs_status: "active" | "paused" | "churned"
      health_status: "healthy" | "alert" | "risk"
      interaction_type:
        | "call"
        | "message"
        | "email"
        | "meeting"
        | "support"
        | "feedback"
        | "other"
      journey_stage:
        | "pending_onboard"
        | "onboarding"
        | "monitoring_7d"
        | "ongoing"
        | "at_risk"
        | "churned"
      member_role:
        | "owner"
        | "admin"
        | "member"
        | "viewer"
        | "sponsor"
        | "champion"
        | "executor"
      member_status: "active" | "invited" | "inactive" | "removed"
      objective_status: "pending" | "in_progress" | "completed" | "cancelled"
      onboarding_status: "pending" | "in_progress" | "completed" | "skipped"
      organization_status: "active" | "churned" | "paused" | "trial"
      organization_type: "individual" | "company" | "agency"
      sentiment: "positive" | "neutral" | "negative"
      touchpoint_channel:
        | "whatsapp"
        | "zoom"
        | "email"
        | "phone"
        | "in_app"
        | "other"
      touchpoint_type:
        | "onboarding"
        | "checkin"
        | "support"
        | "training"
        | "review"
        | "renewal"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_status: ["lead", "qualified", "customer", "churned"],
      contact_type: ["person", "company"],
      cs_status: ["active", "paused", "churned"],
      health_status: ["healthy", "alert", "risk"],
      interaction_type: [
        "call",
        "message",
        "email",
        "meeting",
        "support",
        "feedback",
        "other",
      ],
      journey_stage: [
        "pending_onboard",
        "onboarding",
        "monitoring_7d",
        "ongoing",
        "at_risk",
        "churned",
      ],
      member_role: [
        "owner",
        "admin",
        "member",
        "viewer",
        "sponsor",
        "champion",
        "executor",
      ],
      member_status: ["active", "invited", "inactive", "removed"],
      objective_status: ["pending", "in_progress", "completed", "cancelled"],
      onboarding_status: ["pending", "in_progress", "completed", "skipped"],
      organization_status: ["active", "churned", "paused", "trial"],
      organization_type: ["individual", "company", "agency"],
      sentiment: ["positive", "neutral", "negative"],
      touchpoint_channel: [
        "whatsapp",
        "zoom",
        "email",
        "phone",
        "in_app",
        "other",
      ],
      touchpoint_type: [
        "onboarding",
        "checkin",
        "support",
        "training",
        "review",
        "renewal",
        "other",
      ],
    },
  },
} as const
