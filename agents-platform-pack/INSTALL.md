# INSTALL — Plataforma de Agentes IA (para o Claude Code executar)

Você (Claude) vai instalar a Plataforma de Agentes num CRM AI-First já
funcionando. O usuário NÃO é técnico — conduza com linguagem simples,
confirme cada etapa, e NUNCA pule a ordem abaixo.

## O que esta plataforma é

Agentes de IA "funcionários digitais" dentro do CRM: multi-provider
(Anthropic/OpenAI/Codex/Gemini...), multi-canal (chat web, WhatsApp,
Telegram, botão flutuante), com ferramentas que operam o CRM de verdade
(criar lead, tarefa, agendar reunião, cobrar time no grupo), memória,
rotinas automáticas e 5 templates prontos.

## Pré-requisitos (verifique ANTES de começar)

1. CRM AI-First instalado e funcionando (migrations base aplicadas, login ok)
2. `supabase` CLI logado na conta DONA do projeto (`supabase login`)
3. Projeto linkado (`supabase link --project-ref <ref>`)
4. Você sabe a PROJECT_URL (ex: `https://xxxx.supabase.co`) e tem acesso
   ao dashboard pra pegar a service_role key quando precisar

⚠️ Se o CRM base não estiver instalado, PARE e rode o setup do CRM primeiro.

---

## ORDEM DE INSTALAÇÃO (não mude!)

### Passo 0 — Check de compatibilidade do schema (RODE PRIMEIRO)

As tools do agente operam o CRM (criar lead, tarefa, agendar). Elas esperam
o schema padrão do CRM AI-First. Rode este SQL e confira que TODAS as linhas
retornam `true`:

```sql
SELECT
  to_regclass('public.leads')                 IS NOT NULL AS tem_leads,
  to_regclass('public.deals')                 IS NOT NULL AS tem_deals,
  to_regclass('public.company_activities')    IS NOT NULL AS tem_atividades,
  to_regclass('public.team_members')          IS NOT NULL AS tem_time,
  to_regclass('public.sales_pipelines')       IS NOT NULL AS tem_pipelines,
  to_regclass('public.sales_pipeline_stages') IS NOT NULL AS tem_etapas,
  to_regclass('public.config')                IS NOT NULL AS tem_config,
  EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='deals' AND column_name='pipeline_stage_id') AS deals_ok,
  EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='company_activities' AND column_name='responsavel_id') AS atividades_ok,
  EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='team_members' AND column_name='phone') AS time_ok,
  EXISTS (SELECT 1 FROM pg_proc WHERE proname='get_tenant_id') AS tenant_fn_ok;
```

- **Tudo true** → prossiga pro Passo 1.
- **Algum false** → o CRM base está incompleto ou foi customizado. NÃO
  prossiga às cegas: identifique o que falta (provavelmente migrations base
  do CRM não aplicadas) e resolva primeiro. Se o projeto foi customizado
  (tabela renomeada), adapte as funções do 0003 que referenciam essa tabela
  antes de aplicar.

### Passo 1 — Migrations (na ordem, uma por vez)

Aplique via MCP Supabase (`apply_migration`) ou SQL Editor, NESTA ordem:

```
migrations/0001_agents_platform.sql      ← tabelas base (14)
migrations/0002_platform_upgrades.sql    ← +3 tabelas, recorrência, bucket vision
migrations/0003_agents_functions.sql     ← 42 funções + triggers + permissões
migrations/0004_seed_catalog_providers.sql ← 9 providers + 39 skills
migrations/0005_seed_templates.sql       ← 5 templates de agentes prontos
```

**NÃO aplique o 0006 ainda** — ele precisa de placeholders trocados (Passo 4).

Validação do Passo 1 (rode e confira):

```sql
SELECT
  (SELECT count(*) FROM pg_tables WHERE tablename LIKE 'agents_%' OR tablename LIKE 'agent_%') AS tabelas,   -- esperado: 17
  (SELECT count(*) FROM agents_skill_catalog) AS skills,                                                      -- esperado: >= 39
  (SELECT count(*) FROM agents_registry WHERE is_template) AS templates;                                      -- esperado: 5
```

### Passo 2 — Edge Functions

**a)** Copie as pastas de `functions/` pro projeto-alvo:

```
functions/agent-runner/        → supabase/functions/agent-runner/
functions/agent-jobs-poller/   → supabase/functions/agent-jobs-poller/
functions/agents-codex-import/ → supabase/functions/agents-codex-import/
functions/generate-embedding/  → supabase/functions/generate-embedding/
functions/telegram-webhook/    → supabase/functions/telegram-webhook/
```

**b)** Adicione o conteúdo de `config-templates/config.toml.snippet` ao
`supabase/config.toml` do projeto-alvo (se as entradas não existirem).

**c)** Deploy (CLI, na raiz do projeto-alvo):

```bash
supabase functions deploy agent-runner --no-verify-jwt
supabase functions deploy agent-jobs-poller --no-verify-jwt
supabase functions deploy agents-codex-import --no-verify-jwt
supabase functions deploy generate-embedding --no-verify-jwt
supabase functions deploy telegram-webhook --no-verify-jwt
```

⚠️ O agent-runner tem MUITOS arquivos (lib/providers, lib/tools) — o deploy
via CLI funciona; deploy inline via MCP pode estourar tamanho. Use o CLI.

### Passo 3 — Patch do WhatsApp (porteiro V2)

Siga `functions/whatsapp-webhook-patch/PATCH.md` — copia 1 arquivo pra
dentro do whatsapp-webhook existente e adiciona ~15 linhas no index.ts.
Depois redeploy do whatsapp-webhook.

O roteador nasce DESLIGADO (flag `agent_platform_v2_enabled=false`) —
o WhatsApp do CRM continua 100% como era. Liga depois pela UI.

### Passo 4 — Cron do poller (POR ÚLTIMO no banco!)

**a)** Abra `migrations/0006_cron_poller.sql`
**b)** Substitua `__SUPABASE_PROJECT_URL__` pela URL real do projeto (sem barra final)
**c)** Substitua `__SERVICE_ROLE_KEY__` pela service_role key
   (Dashboard → Settings → API → service_role). Peça pro usuário colar —
   NUNCA chute esse valor.
**d)** Aplique a migration.

Validação: `SELECT jobname, active FROM cron.job WHERE jobname='agent-jobs-poller';`
→ deve retornar 1 linha com active=true.

### Passo 5 — Frontend

Siga `frontend/INTEGRATION.md` (7 itens: módulo, deps, tailwind, rotas,
sidebar, FloatingAgentHost, validação tsc+build).

### Passo 6 — Teste E2E (NÃO PULE)

1. `npm run dev` → abrir `/agentes` → a lista aparece vazia (templates ficam
   escondidos — aparecem no "+ Novo agente") ✓
2. **Credencial**: `/agentes/credenciais` → + Adicionar → cadastrar uma
   credencial de MODELO (Anthropic API key é o caminho mais simples;
   OpenAI Codex se o usuário tem ChatGPT Plus — instruções na tela)
3. **Criar 1º agente**: `/agentes` → + Novo agente → escolher template
   "Assistente Geral (CEO)" → preencher nome/empresa → Criar
4. Na config do agente → aba Modelo → selecionar a credencial criada → Salvar
5. **Conversar**: abrir o chat do agente → perguntar "quantos leads temos?"
   → ele deve consultar o banco e responder com o número real
6. Se respondeu com dado real → ✅ INSTALAÇÃO COMPLETA

## Armadilhas conhecidas (não caia)

- ❌ Aplicar 0006 com placeholder → cron chama URL inválida pra sempre
- ❌ Esquecer o plugin @tailwindcss/typography → markdown do chat não renderiza
- ❌ Rotas `:slug` ANTES das fixas → /agentes/credenciais quebra
- ❌ Deploy do agent-runner sem --no-verify-jwt → webhooks/cron tomam 401
- ❌ Criar agente sem credential vinculada no Modelo → erro "Credencial não encontrada"
- ❌ MCP deploy inline do agent-runner → estoura tamanho; use CLI

## Depois de instalado

Conduza o usuário pelo `ONBOARDING.md` (criar credenciais, conhecer os 5
templates, ligar WhatsApp/Telegram se quiser).
