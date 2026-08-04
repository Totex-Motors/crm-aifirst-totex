-- Semeia a tool de AGENDAMENTO no catálogo de skills do agente v2
-- (agents_skill_catalog). Ela aponta pro adaptador agent-tool-schedule, que
-- traduz o contrato v2 pro da book-meeting e deriva o lead pela sessão.
-- Idempotente: ON CONFLICT (slug) atualiza.

INSERT INTO public.agents_skill_catalog (
  slug, display_name, description, category, emoji, provider,
  parameters_schema, action_type, action_config, default_usage_mode, is_recommended
) VALUES (
  'agendar_reuniao',
  'Agendar visita / test drive',
  'Verifica horários livres e agenda uma visita/test drive para o lead. '
    || 'Fluxo: 1) chame com action="check_availability" para receber os dias e horários '
    || 'disponíveis; 2) confirme um horário com o cliente; 3) chame com action="book" e '
    || 'slot_datetime (ISO 8601, fuso America/Sao_Paulo) para agendar. O telefone do lead '
    || 'é resolvido automaticamente pela conversa — não invente telefone.',
  'vendas',
  '📅',
  'crm',
  '{
    "type": "object",
    "properties": {
      "action": {
        "type": "string",
        "enum": ["check_availability", "book"],
        "description": "check_availability lista horários; book agenda no slot escolhido"
      },
      "slot_datetime": {
        "type": "string",
        "description": "Horário escolhido em ISO 8601 (ex: 2026-08-06T14:00:00-03:00). Obrigatório para book."
      },
      "email": { "type": "string", "description": "E-mail do lead (opcional)" },
      "vehicle_interest": { "type": "string", "description": "Veículo de interesse (opcional)" },
      "negotiation": {
        "type": "string",
        "enum": ["a_vista", "financiamento", "troca", "indefinido"],
        "description": "Forma de negociação (opcional)"
      }
    },
    "required": ["action"]
  }'::jsonb,
  'edge_function',
  '{ "name": "agent-tool-schedule" }'::jsonb,
  'always',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  emoji = EXCLUDED.emoji,
  provider = EXCLUDED.provider,
  parameters_schema = EXCLUDED.parameters_schema,
  action_type = EXCLUDED.action_type,
  action_config = EXCLUDED.action_config,
  default_usage_mode = EXCLUDED.default_usage_mode,
  is_recommended = EXCLUDED.is_recommended;
