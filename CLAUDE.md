# CRM AI-First — Template Comercial (Alunos IA na Pratica)

---

## ⚠️ DETECCAO DE PRIMEIRO USO (LEIA ANTES DE QUALQUER RESPOSTA)

**Se o arquivo `.setup-complete` NAO existir na raiz do projeto, o aluno esta abrindo
o projeto pela primeira vez.** Nesse caso, IGNORE a primeira mensagem do aluno (seja
"oi", "ajuda", "começar", "o que faço", "???", ou qualquer outra coisa) e execute
IMEDIATAMENTE a skill `/setup-projeto`.

Comece respondendo assim:

> "Opa, beleza? Vi que você acabou de baixar o CRM. Vou te guiar na configuração
> do zero — é tranquilo, só seguir os passos. Antes de começar, deixa eu conferir
> se você já tem as contas necessárias..."

E ai dispara o fluxo da skill `/setup-projeto`.

**Ao final do setup, crie o arquivo `.setup-complete`** (`touch .setup-complete`)
pra essa deteccao nao repetir.

Se `.setup-complete` JA existir, siga o fluxo normal da conversa.

---

## O que e este projeto

CRM comercial AI-first **focado no nicho automotivo (revendas de veiculos)**.
So funcionalidades de vendas: pipeline, inbox WhatsApp, agente de IA, coach em
tempo real, treinamento e gestao basica de time.

**Numeros (jul/2026):** 40 paginas | ~16 pastas de componentes | 84 hooks |
69 Edge Functions | 45 migrations | 289 tabelas no banco.

> As contagens acima ja estiveram desatualizadas por meses. Se for citar numero,
> **conte** (`ls src/pages/*.tsx | wc -l`) em vez de confiar nesta linha.

## Nicho automotivo (IMPORTANTE)

Este CRM foi adaptado de um template B2B genérico para **revenda de veiculos**.
As convencoes do nicho:

- **"Negociacao"** é o termo de UI para o antigo "Deal" (a camada fisica do banco
  continua `deals`/`deal_id` — NAO renomear tabelas/colunas).
- Cada negociacao é vinculada a um **veiculo do estoque** (`deals.vehicle_id` →
  tabela `vehicles`), nao a um "produto".
- **Qualificacao automotiva** substitui o BANT B2B. Colunas boolean no lead:
  `intent_buy_only`, `intent_trade_in`, `intent_finance_no_entry`, `intent_cash`,
  `intent_sell`, `intent_special_search` + `vehicle_of_interest` (jsonb) +
  `negotiation_type` (text). O helper `_shared/automotive.ts` mapeia a extracao
  da IA nesses campos, usado por agente, analise de call/conversa e formulario
  de agendamento. NAO reintroduzir empresa/faturamento/funcionarios/webinar.

## Stack

- **Frontend**: React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + shadcn/ui + Lucide Icons
- **Estado**: TanStack Query v5 + React Hook Form + Zod
- **Backend**: Supabase (PostgreSQL + Edge Functions Deno + Realtime + Auth + RLS)
- **IA**:
  - Anthropic Claude — agente vendedor, scoring, mensagens, briefings
  - Google Gemini — coach real-time, analise de chamadas
  - OpenAI — Whisper (transcricao)
- **WhatsApp**: UAZAPI (multi-instancia, QR Code) + WhatsApp Cloud API (oficial Meta)
- **Telefonia**: WaVoIP + Soniox (transcricao real-time)
- **Calendario**: Google Calendar (OAuth2)
- **Deploy**: Vercel (auto-deploy via GitHub)

## Modulos ativos

Ficam em `/configuracoes > Modulos`.

### Comercial (ON por padrao)
- Cockpit do vendedor (visao diaria, ligacoes, hot leads)
- Dashboard comercial (pipeline metrics, ranking, alertas)
- Pipeline Kanban (drag & drop, estagios configuraveis, multi-pipeline)
- Leads com Scoring IA + Qualificacao automotiva (intencao de compra)
- Negociacoes (vinculadas ao veiculo do estoque, com pagamentos e comissoes)
- Inbox WhatsApp comercial (UAZAPI + Cloud API, multi-instancia)
- Telefonia (chamadas VoIP com transcricao real-time)
- **Agente IA autonomo** (responde leads via WhatsApp 24/7)
- **Coach IA real-time** (sugestoes durante chamadas)
- Reunioes + Google Calendar (gravacao e resumo com IA)
- Automacoes + Cadencias de follow-up (sequencias de mensagem)
- Comissoes
- Playbooks e Scripts de vendas
- **Treinamento + Roleplay com IA**
- Materiais de venda
- Agenda
- Workspace

### Gestao Basica (ON por padrao)
- Tarefas
- Calendario da equipe
- Reunioes

### Telefonia VoIP (OFF por padrao)
- Ativa dispositivos WaVoIP
- Gravacao automatica + transcricao Soniox

### Analytics Avancado (OFF por padrao)
- Dashboards detalhados adicionais

## Configuracoes Unificadas

Todas as configs em `/configuracoes` com sidebar de navegacao.

### Secoes:
- **Geral**: Modulos ON/OFF, Perfil, Aparencia (tema), Google Calendar
- **Integracoes**: API Keys (todas as chaves), WhatsApp (UAZAPI), Telefonia VoIP
- **Comercial**: Pipeline (estagios), Templates de Analise, Produtos, Materiais,
  Playbooks, Comissoes, Automacoes
- **IA & Bots**: Agente de Vendas, Coach
- **Equipe**: Membros do Time (CRUD + vinculacao WhatsApp), Treinamento
- **Notificacoes**: Regras, Bot de Tarefas

### WhatsApp (UAZAPI) via UI:
- Admin configura URL + Admin Token em API Keys
- Cria instancias direto pela UI (so precisa do nome)
- Gera QR Code e conecta
- Vincula membros a instancias (1 instancia = N membros)
- Webhook configurado automaticamente

## Estrutura de arquivos

```
src/
|- pages/           -> 40 paginas
|- components/      -> 16 pastas de componentes
|  |- ui/           -> shadcn/ui base
|  |- sales/        -> Componentes do comercial (pipeline, deals, leads, ai/, payments/, dashboard/)
|  |- inbox/        -> Inbox (WhatsApp chat, conversas)
|  |- coach/        -> Coach IA playbooks
|  |- cockpit/      -> Cockpit de vendas
|  |- funnel/       -> Funil visual
|  |- agenda/       -> Componentes da agenda
|  |- calls/        -> Telefonia (chamadas, gravacoes, coach)
|  |- meeting/      -> Reunioes (transcricao, painel global)
|  |- tasks/        -> Tarefas
|  |- timeline/     -> Timeline de lead/deal
|  |- products/     -> Produtos
|  |- settings/     -> Secoes da pagina de configuracoes
|  |- shared/       -> Componentes compartilhados
|  |- layout/       -> AppSidebar, AppLayout
|  |- focus-mode/   -> Modo foco
|- hooks/           -> 84 hooks (React Query)
|- contexts/        -> Auth, Call, Meeting, FocusMode, DemoMode, Theme
|- types/           -> Tipagens TypeScript
|- lib/             -> Utilitarios (Supabase client, etc)
|- services/        -> Servicos (Google Calendar, WhatsApp)

supabase/
|- functions/       -> 69 Edge Functions
|- migrations/      -> 45 migrations SQL
|- cleanup_unused_tables.sql  -> Script para dropar tabelas dos modulos removidos
```

## Edge Functions (69)

### IA (nucleo)
- `ai-sales-agent` — Agente IA que responde leads via WhatsApp
- `coach-suggestion` — Coach IA real-time durante chamadas
- `analyze-conversation` — Analise de conversas
- `analyze-sales-call` — Analise de chamadas
- `calculate-lead-score` — Score IA de leads
- `chat-manager` — Gerenciador de chat IA
- `generate-briefing` — Briefings automaticos de leads
- `generate-sales-message` — Geracao de mensagens personalizadas
- `extract-lead-from-image` — OCR de leads via print
- `save-lead-insights`, `template-extractor`, `suggest-proposal`
- `roleplay-session`, `roleplay-evaluate` — Treinamento com IA

### WhatsApp
- `whatsapp-webhook` (UAZAPI)
- `whatsapp-cloud-webhook` (Meta Cloud API)
- `send-whatsapp-cloud` (envio Cloud API)
- `whatsapp-task-assistant` — Bot de tarefas
- `sync-whatsapp-groups`, `sync-whatsapp-status`, `sync-missed-messages`
- `whatsapp-group`, `process-scheduled-messages`, `process-message-sequences`

### Telefonia
- `process-call-recording`, `process-call-transcription`
- `soniox-token` (transcricao real-time)
- `wavoip-webhook`

### Google Calendar
- `sync-google-calendar`, `google-calendar-webhook`
- `setup-calendar-watch`, `renew-calendar-watches`
- `create-calendar-event`, `send-meeting-email`
- `book-meeting`, `extract-meeting-datetime`
- `process-team-meeting`

### Automacoes / Alertas / Notificacoes
- `process-automation-rules`
- `check-hot-leads`, `check-sales-alerts`, `check-pending-meetings`
- `process-noshow-followup`
- `daily-sales-digest`
- `process-notification-event`, `process-notification-rules`
- `process-task-reminders`

### Utilitarios
- `calculate-commission`
- `manage-team-member`, `sync-member-data`
- `batch-fetch-avatars`, `migrate-profile-photos`
- `health-check`

## Chaves de integracao

Configurar pela UI em **Configuracoes > Integracoes > API Keys**.
As edge functions leem via `getIntegrationKey()` da tabela `config`.

| Servico | Chave | Uso | Obrigatoria? |
|---------|-------|-----|-------------|
| Anthropic | ANTHROPIC_API_KEY | Agente IA, scoring, briefing, mensagens | Sim (core) |
| OpenAI | OPENAI_API_KEY | Transcricao Whisper, chat manager | Sim (audio) |
| Google Gemini | GEMINI_API_KEY | Coach real-time, analise chamadas | Sim (coach) |
| UAZAPI | UAZAPI_ADMIN_URL + UAZAPI_ADMIN_TOKEN | WhatsApp multi-instancia | Sim (WhatsApp) |
| WhatsApp Cloud | WHATSAPP_CLOUD_TOKEN | WhatsApp oficial Meta | Opcional |
| Soniox | SONIOX_API_KEY | Transcricao real-time | Sim (telefonia) |
| WaVoIP | WAVOIP_API_KEY | Chamadas VoIP | Sim (telefonia) |
| Google Calendar | GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET | Reunioes (OAuth2) | Opcional |

## Rotas principais

- `/` -> redireciona para `/comercial`
- `/comercial` -> Dashboard comercial
- `/comercial/cockpit` -> Cockpit de vendas (tempo real)
- `/comercial/pipeline` -> Pipeline Kanban
- `/comercial/leads` -> Lista de leads
- `/comercial/leads/:id` -> Detalhe do lead (com WhatsApp, chamadas, deals, tarefas, IA)
- `/comercial/negociacoes` -> Negociacoes (vinculadas ao veiculo do estoque)
- `/comercial/negociacoes/:id` -> Detalhe da negociacao (com pagamentos, comissoes)
- `/comercial/inbox` -> Inbox WhatsApp
- `/comercial/agenda` -> Agenda comercial
- `/comercial/workspace` -> Sales Workspace
- `/comercial/produtos` -> Produtos
- `/comercial/comissoes` -> Comissoes
- `/comercial/playbook` -> Scripts de venda
- `/comercial/materiais` -> Materiais de venda
- `/comercial/treinamento` -> Treinamento com IA (roleplay)
- `/meu-whatsapp` -> Vendedor gerencia o WhatsApp dele (UAZAPI + WaVoIP)
- `/gestao/tarefas` -> Tarefas
- `/gestao/calendario` -> Calendario do time
- `/gestao/reunioes` -> Reunioes
- `/configuracoes` -> Configuracoes unificadas
- `/agendar` -> Pagina publica de agendamento

## Convencoes de codigo

- UI em portugues brasileiro
- Componentes: shadcn/ui + Tailwind
- Estado: React Query (useQuery/useMutation)
- Forms: React Hook Form + Zod
- Notificacoes: Sonner (toast)
- Icones: Lucide React
- Imports: alias `@/` (ex: `@/components/ui/button`)
- Edge Functions: Deno + imports de `jsr:` e `npm:`
- **Paginas sao lazy**: toda pagina entra no `App.tsx` como
  `React.lazy(() => import(...))` sob um unico `Suspense`. Import estatico de
  pagina volta a inchar o chunk de entrada. So Login/ForgotPassword/
  ResetPassword/NotFound sao eager (precisam do primeiro paint).
- **Nunca chame API externa do browser com token da instancia.** Fica na edge
  function (o token nao sai do servidor). Ja houve caso de `MyWhatsApp` chamar a
  Graph API da Meta direto do cliente, duplicando um edge function que ja existia.
- **Nao ignore `error` do Supabase.** `const { data } = await supabase...` sem
  checar `error` transforma query quebrada em `data` null silencioso — foi assim
  que varios bugs passaram meses despercebidos.

## Multi-Tenant e Permissoes

- Tenant ID via JWT `app_metadata.tenant_id`
- RLS em todas as tabelas via `get_tenant_id()`

### Roles:
- **admin** — Acesso total
- **comercial/closer** — Vendedor (pipeline, leads, WhatsApp, telefonia)
- **sdr** — Pre-vendedor (leads, ligacoes)

## Tabela `config` (configuracoes via UI)

Chave-valor na tabela `config` (`key TEXT UNIQUE`, `value TEXT`).
Usada para:
- API keys das integracoes
- `enabled_modules` — JSON com os modulos ativos
- Preferencias do tenant

Frontend salva via upsert com `onConflict: "key"`.
Edge functions leem via `getIntegrationKey(key)`.

## Automacoes de Pipeline (sales_automation_rules)

O sistema de automacao move leads automaticamente no pipeline baseado em eventos.
Regras configuradas em **Configuracoes > Comercial > Automacoes**.

### Trigger types disponiveis:
| Trigger | Quando dispara | Onde dispara |
|---------|---------------|--------------|
| `task_created` | Tarefa criada | `useTasks.ts` |
| `task_completed` | Tarefa concluida | `useTasks.ts` |
| `deal_created` | Deal criado | `useSalesDeals.ts` |
| `deal_stage_changed` | Deal mudou de estagio | `useSalesDeals.ts` |
| `lead_replied` | Lead respondeu no WhatsApp | `whatsapp-webhook` (edge fn) |
| `meeting_scheduled` | Reuniao/call agendada | `useTasks.ts` |
| `meeting_completed` | Reuniao finalizada com sucesso | `TranscriptionPanel.tsx` + `useTasks.ts` |
| `meeting_no_show` | Lead nao compareceu | `TranscriptionPanel.tsx` + `useTasks.ts` |
| `lead_score_changed` | Score do lead mudou | (sem call site ainda) |
| `days_in_stage` | Lead parado N dias no estagio | (cron — nao configurado) |

### Regras padrao ativas:
1. Lead respondeu → Em Qualificacao (so se estiver em Novo Lead ou Tentando Contato)
2. Reuniao agendada → Reuniao Agendada (so se estiver antes dessa etapa)
3. Reuniao realizada → Reuniao Realizada (so se estiver antes)
4. No-show → No-show

### Action `move_deal_stage`:
Atualiza `deals.pipeline_stage_id` + `leads.pipeline_stage_id` + `leads.etapa_funil` + `leads.sales_stage`.
Config: `target_stage_id` (obrigatorio), `only_if_position_less_than` (guard de posicao).

## Gate de tipos (baseline)

`npm run typecheck` roda `tsc --noEmit` e compara com uma baseline congelada
(`.typecheck-baseline.json`): **falha so em erro NOVO**, fora da baseline. O CI
(`.github/workflows/typecheck.yml`) roda isso em todo PR — a regressao de tipos
trava a revisao, sem tocar no build de deploy do Vercel.

Ha ~360 erros conhecidos na baseline (dividas herdadas: interfaces locais que
divergem do schema, narrowing de `string` pra uniao da app). Ao corrigir alguns,
rode `npm run typecheck:update` pra baseline **encolher** — ela nunca deve crescer.

## Schema vs codigo — LEIA ANTES DE MEXER EM QUERY

O banco e o repositorio ja estiveram muito dessincronizados. Boa parte foi
corrigida em jul/2026, mas o padrao pode voltar. O que ficou de licao:

### Os tipos gerados sao a fonte da verdade, nao o codigo

`src/types/database.types.ts` e gerado do banco:

```bash
npx supabase gen types typescript --project-id <ref> --schema public > src/types/database.types.ts
```

Quando ele esta desatualizado, o TypeScript **para de reclamar de query quebrada**:
o Postgrest devolve `SelectQueryError` e o erro some. Em jul/2026 o arquivo cobria
83 das 289 tabelas, e isso escondia varios bugs reais em producao — selects de
coluna inexistente que devolviam 400, com o codigo ignorando `error` e seguindo
com `data` null. Se for mexer em query, **regenere os tipos antes**.

### Antes de criar tabela, cheque se ela ja existe com outro nome

Ja aconteceu de o codigo consultar tabela que nunca existiu enquanto a
equivalente estava ao lado:

- `whatsapp_templates` **nao existe** — a tabela e `whatsapp_cloud_templates`.
  Corpo e botoes nao sao colunas: derivam de `components` (formato cru da Meta)
  via `src/lib/whatsappTemplate.ts`.
- `sales_deals` **nao existe** — e `deals`.

### Tabelas fantasma: zeradas em jul/2026

Nenhuma tabela consultada pelo codigo esta faltando no banco. Foram removidas
(codigo morto ou feature sem schema): `content_agent_config`, `ceo_bot_config`,
`agents_personas`, `cs_checkins`, `sales_activities`, `project_funnels`,
`support_conversations`, `farming_reasons`, `scheduled_messages` e o modulo
Instagram. E foram criadas: `transactions`, `deal_payment_audit_log`,
`deal_negotiation_details`, `roleplay_sessions`, `sales_training_cases`,
`whatsapp_template_tags`.

**Antes de adicionar `.from('<tabela>')`, confirme que ela existe** nos tipos
gerados. O padrao que se repetiu a sessao inteira: interface local declara campo
que o banco nao tem, um `.insert({ ...input })` leva o campo junto, e o Postgrest
recusa com PGRST204 — quebrando a feature toda.

Colunas fantasma que ainda restam (legado B2B, no `leads`/`organizations`):
`leads.landing_page`, `leads.company`, `leads.dia_do_playbook`,
`leads.partner_lead_id`, `organizations.health_score`, `organizations.employee_count`,
`organizations.challenges`, `call_history.call_session_id`.

### `scheduled_messages` vs `wa_scheduled_messages`

Nao sao a mesma coisa. `wa_scheduled_messages` **existe** e e a fila de
campanhas/sequencias de comunidade (`target_jid`, `community_id`,
`enrollment_id`, `scheduled_for`), consumida pelo cron de
`process-scheduled-messages`. O `scheduled_messages` que o front usava era
"agendar mensagem pra este lead" (`lead_id`, `phone`, `scheduled_at`) — outra
feature, que nunca teve tabela e foi removida. **Nao confundir as duas.**

### O modulo Instagram foi removido (jul/2026)

O front tinha `components/sales/instagram/` (11 arquivos), `useInstagram` e
`useInstagramProfile`, e um seletor WhatsApp/Instagram no `SalesLeadDetail` —
mas `instagram_profiles`, `instagram_stories` e `instagram_feed_posts` nunca
existiram, entao o painel so dava erro. O `cleanup_unused_tables.sql` ja mandava
dropar o modulo; o front e que nao tinha acompanhado.

Sobraram no banco (nao sao fantasma): `leads.instagram`, `leads.instagram_id` e
`instagram_messages`. As duas colunas de lead seguem em uso no formulario.
`instagram_messages` ficou orfa — o `cleanup_unused_tables.sql` a dropa.

**Nao reintroduzir Instagram sem criar as tabelas antes.**

### Nome de migration: SEMPRE timestamp de 14 digitos

`20260716_foo.sql` (8 digitos) colide com `20260716010000_bar.sql` (14) e o CLI
**nao consegue parear local com remoto**, recusando o push com "Remote migration
versions not found in local migrations directory". Use
`YYYYMMDDHHMMSS_nome.sql`.

### Migration precisa ser idempotente

Boa parte do schema ja foi aplicada fora do CLI (SQL Editor), entao um push
re-aplica DDL existente. Regra:

- `CREATE TABLE` / `CREATE INDEX` → `IF NOT EXISTS`
- `INSERT` de seed → `ON CONFLICT DO NOTHING` ou `WHERE NOT EXISTS`
- **`CREATE POLICY` nao aceita `IF NOT EXISTS`** → sempre
  `DROP POLICY IF EXISTS <nome>` antes, inclusive do nome novo
- `ADD CONSTRAINT` → `DROP CONSTRAINT IF EXISTS <nome>` antes
- Funcao → `CREATE OR REPLACE` + `SET search_path = public, pg_catalog`

RLS por tenant, no padrao do projeto (o `(SELECT ...)` evita reavaliar por linha):

```sql
CREATE POLICY tenant_all_<tabela> ON public.<tabela>
  FOR ALL TO authenticated
  USING (tenant_id = (SELECT public.get_tenant_id()))
  WITH CHECK (tenant_id = (SELECT public.get_tenant_id()));
```

### `vehicles` e os scripts `setup-cardoso-*`

A tabela central do nicho ficou meses sem migration de origem: era criada so pelo
script avulso `setup-cardoso-9-vehicles.sql`, e um setup do zero rodando so as
migrations ficava sem estoque. Corrigido em `20260719000000_vehicles.sql`.

**A URL do feed XML NAO vai na migration.** O script avulso gravava a URL do S3
do Grupo Cardoso hardcoded em `config.VEHICLE_FEED_URL`; ela e chave de
integracao, configurada em `/configuracoes > Integracoes` e lida via
`requireIntegrationKey()`.

Os outros `setup-cardoso-*.sql` na raiz sao **dados de um cliente** (pipelines,
produtos, playbooks, time, veiculos de teste), nao schema de template. Se algum
deles criar estrutura que o codigo precisa, essa estrutura pertence a uma
migration — o dado do cliente, nao.

### FK com nome load-bearing

Embeds do Postgrest usam o nome da constraint. Se renomear, o embed quebra:

- `deal_payment_audit_log_changed_by_fkey` → `useNegociacaoPayments`
- `sales_training_cases_lead_id_fkey` / `_sales_rep_id_fkey` → `useSalesTrainingCases`

### Tipos que enganam

- `products.id` e **TEXT**, nao UUID (e `deals.product_id` acompanha).
- `roleplay_sessions.persona_id` e **TEXT**: as personas sao slugs hardcoded
  (`roberto_cetico`, `ana_preco`), nao vem de tabela.

## Limpeza do banco

O script `supabase/cleanup_unused_tables.sql` contem os `DROP TABLE` das
tabelas dos modulos que foram removidos (CS, RH, Financeiro, Eventos,
Instagram, NFSe, Knowledge Base, Organograma, etc). Rodar no SQL Editor do
Supabase para remover as tabelas orfaos do banco atual.

---

# ONBOARDING — INSTRUCOES PARA O CLAUDE CODE

IMPORTANTE: O usuario deste projeto pode NAO ser tecnico. Guie passo a passo,
linguagem simples, como um professor paciente.

REGRAS DE COMUNICACAO:
- Fale como se estivesse ensinando um amigo. Sem jargoes.
- Explique UMA coisa de cada vez.
- Quando pedir pra ele fazer algo no navegador, diga EXATAMENTE onde clicar.
- Sempre confirme que ele conseguiu antes de ir pro proximo passo.
- Use analogias do dia a dia quando possivel.
- Responda SEMPRE em portugues brasileiro.

## Skills disponiveis (use-as!)

Ao iniciar qualquer configuracao, **USE AS SKILLS** em `.claude/skills/`:

- **`/setup-projeto`** — Orquestra TODO o setup do zero (Supabase, migrations,
  edge functions, API keys, WhatsApp, agente). Use quando o aluno diz "configurar",
  "setup", "primeira vez", "instalar", "como configuro".
- **`/criar-agente-ia`** — Entrevista o aluno sobre o negocio dele e cria um
  agente de vendas customizado (system prompt, tools, horario). Use depois do
  setup, quando ele quer ter o "vendedor IA" respondendo no WhatsApp.

Essas skills ja tem o fluxo completo — nao reinvente.

## Fluxo de configuracao (ordem CRITICA)

**A ordem importa.** Algumas etapas dependem de outras:

1. **Pre-requisitos**: Node >= 18, npm, supabase CLI >= 2.70
2. **Projeto Supabase** criado (region sa-east-1)
3. **MCP Supabase conectado** (`claude mcp add ... supabase https://mcp.supabase.com/mcp`)
4. **`.env` local** preenchido (URL + anon key via MCP)
5. **`npm install`**
6. **Migrations aplicadas NA ORDEM**:
   - `000_base_schema.sql` — schema completo
   - `001_post_baseline_fixes.sql` — 18 FKs, 16 RPCs, trigger IA, ai_agent_chat_events, storage buckets, realtime
   - Demais migrations (`20250126_*` em ordem alfabetica)
   - **Atualizar `config.SUPABASE_PROJECT_URL`** com a URL real (sai do placeholder `__REPLACE_WITH_PROJECT_URL__`)
   - `002_ai_agent_crons.sql` — POR ULTIMO (depende da URL real)
7. **Email confirmation OFF** em Auth > Providers > Email
8. **`supabase login`** na conta dona do projeto
9. **Deploy edge functions** (webhooks com `--no-verify-jwt`, resto normal)
10. **`npm run dev`** → criar conta no CRM → login
11. **Configuracoes > API Keys** (Anthropic + Gemini no minimo)
12. **Criar instancia WhatsApp** (SO depois de funcoes deployadas!)
13. **Vincular membro do time** a instancia
14. **Criar agente IA** (via `/criar-agente-ia`)
15. **Teste E2E**: msg do celular pessoal → agente responde

## Armadilhas conhecidas (NAO caia nelas)

- ❌ Criar instancia UAZAPI ANTES dos webhooks estarem no ar → msgs nao chegam
- ❌ Aplicar `002_ai_agent_crons` com `SUPABASE_PROJECT_URL` no placeholder → cron chama URL invalida
- ❌ Pular `001_post_baseline_fixes` → perde 18 FKs (embeds 400) + 16 RPCs (404s)
- ❌ Pular `20260415000001_call_recordings_bucket.sql` → upload de gravacoes de chamada falha com 400
- ❌ Hardcode de API keys / Client IDs / Phone Number IDs em codigo → **regra inviolavel**, use `getIntegrationKey()` em `_shared/config.ts` + UI `/configuracoes`
- ❌ Hardcode de URL UAZAPI (ex: `your-uazapi-instance.uazapi.com`) → **regra inviolavel**, use `instance.api_url` ou `config.UAZAPI_ADMIN_URL`
- ❌ Cadastrar so `WHATSAPP_CLOUD_TOKEN` sem `WHATSAPP_PHONE_NUMBER_ID` (ou vice-versa) → Cloud API precisa dos DOIS
- ❌ Usar `/status` da UAZAPI (health check) em vez de `/instance/status` (status da instancia)
- ❌ Esquecer de desativar Email Confirm → aluno nao consegue logar em contas de teste
- ❌ Agente IA nao responder audio/imagem → tem que ter `GEMINI_API_KEY` (Whisper so pega audio, nao imagem)
- ❌ Confiar no `database.types.ts` sem regenerar → tipos velhos escondem query quebrada (ver "Schema vs codigo")
- ❌ Migration com versao de 8 digitos (`20260716_foo.sql`) → colide com as de 14 e trava o `db push`
- ❌ `CREATE POLICY` sem `DROP POLICY IF EXISTS` do nome novo → push aborta com 42710 ao re-aplicar
- ❌ `supabase migration repair --status reverted` sem olhar antes → a coluna `statements` de
  `supabase_migrations.schema_migrations` pode ser a **unica copia** do SQL daquela migration.
  Extraia (`supabase db dump --data-only --schema supabase_migrations`, precisa de Docker) antes de apagar.
- ❌ Assumir que `npm run build` valida tipos → ele roda so `vite build`. Pra tipos,
  `npm run typecheck` (gate com baseline) ou `npx tsc --noEmit -p tsconfig.app.json`.
- ❌ Importar pagina estaticamente no `App.tsx` → todas sao `React.lazy` sob um `Suspense`.
  Import estatico volta a inchar o chunk de entrada (ja foi 5,7 MB).

## Estrategia de midia do agente

- **Audio**: UAZAPI transcreve via Whisper se `OPENAI_API_KEY` estiver configurada; fallback pra Gemini multimodal com `GEMINI_API_KEY`
- **Imagem**: Gemini Vision descreve o conteudo (`describeImageViaGemini`) e popula `content` com texto — o agente "ve" a imagem via descricao
- **Sem chave de midia**: agente recebe `[Audio]` / `[Imagem]` vazio e pode alucinar ("nao consigo ver") — ensinar o aluno a cadastrar Gemini logo de cara

## Treinamento com IA (`/comercial/treinamento`)

Duas features independentes na mesma pagina:

**Roleplay (simulador de call).** As 5 personas sao **hardcoded** em
`DEFAULT_PERSONAS` (`useRoleplaySession.ts`) e ja estao no nicho automotivo
(comprador cetico de SUV, negociadora que compara com a FIPE, etc). As edge
functions `roleplay-session` e `roleplay-evaluate` **nao tocam o banco** — sao
proxies de LLM. O banco so entra no fim: `roleplay_sessions` guarda transcricao,
avaliacao, `score` (o `nota_geral`, 0-100) e `verdict` (o `veredicto`:
sim/nao/talvez).

**Biblioteca de casos.** Casos reais salvos de chamadas e reunioes em
`sales_training_cases`. O fluxo de alimentar existe em 4 pontos, todos via
`SaveToTrainingModal`: `CallEndedModal`, `CallDetailModal`,
`MeetingSummaryModal` e o botao "Novo Caso" da propria pagina.

O roleplay **nao depende** da biblioteca: `startSession` recebe persona, nao caso.

## Visibilidade de eventos do agente

Tabela `ai_agent_chat_events` loga TUDO que o agente faz ou deixa de fazer:
- `skipped_out_of_hours`, `skipped_human_active_cooldown`, `skipped_max_messages`,
  `skipped_conversation_paused`, `replied`, `error`
Frontend le essa tabela no chat interno pra mostrar "por que nao respondeu".

---

# MCP SUPABASE

## Metodo recomendado — OAuth

```bash
claude mcp add --transport http supabase https://mcp.supabase.com/mcp
```
Na primeira utilizacao de uma ferramenta `mcp__supabase__*`, abre navegador
pra OAuth automaticamente.
