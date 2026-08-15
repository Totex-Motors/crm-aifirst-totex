# INSTALL — Instagram Oficial (API Meta)

> **Este arquivo é pro CLAUDE CODE executar.** Aluno: descompacte o zip na raiz
> do seu projeto CRM e diga ao Claude: **"instala o instagram oficial"**.

Instala inbox + agente de IA + campanhas comentário→DM pela **API oficial da
Meta** (`graph.instagram.com`, flavor "Instagram API with Instagram Login" —
Standard Access, **sem App Review** pra operar a própria conta).

## Pré-requisitos (confira ANTES de começar)

1. CRM AI-First instalado e rodando (Supabase linkado via `supabase link`).
2. **Plataforma de Agentes** instalada (tabelas `agents_registry`/`agents_sessions`
   e function `agent-runner`). Sem ela, só o modo "mensagem fixa" funciona —
   instale o `agents-platform-pack` primeiro se quiser o agente de IA.
3. Conta do Instagram **Profissional** (Criador basta — não precisa de Página
   do Facebook) e **pública**.
4. Supabase plano free: máximo **100 edge functions**. Este pack adiciona 5.
   Confira com `supabase functions list | wc -l` antes.

## Passo 1 — Migrations (na ordem)

Aplique via `supabase db push` copiando os arquivos para `supabase/migrations/`
com prefixo de data atual, OU rode no SQL Editor na ordem:

1. `migrations/0000_prereq.sql` — compatibilidade com CRMs antigos (no-op em CRM novo)
2. `migrations/0001_instagram_automacao.sql` — schema completo
3. `migrations/0002_agent_template.sql` — template do agente no ecossistema /agentes
4. `migrations/0003_crons.sql` — define `ig_setup_crons()` e tenta agendar

## Passo 2 — Edge functions

Copie as pastas de `edge-functions/` para `supabase/functions/` do projeto
(NÃO sobrescreva `_shared/` se já existir — compare antes; os arquivos daqui
são retrocompatíveis).

Adicione ao `supabase/config.toml` o conteúdo de `config-toml.snippet`
(⚠️ sem isso, qualquer deploy futuro reseta o verify_jwt e os crons levam 401
em silêncio — erro clássico).

Deploy:

São só **5 functions** (consolidadas por perfil: os 4 crons viram actions de
`instagram-crons`, os 3 utilitários viram actions de `instagram-tools` — menos
slots do teto de 100 do plano free, menos cold start):

```bash
for f in instagram-webhook instagram-send-dm instagram-list-media \
         instagram-crons instagram-tools; do
  supabase functions deploy "$f"
done
```

## Passo 3 — Patch do agent-runner (se a plataforma de agentes já existia)

Versões antigas do `agent-runner` **ignoram a credencial cadastrada na UI** e
só leem a chave de variável de ambiente — o usuário cadastra a chave em
/agentes/credenciais, vincula no agente, e recebe "ANTHROPIC_API_KEY ausente".

Aplique os 2 arquivos de `agent-runner-patch/` em
`supabase/functions/agent-runner/lib/providers/` (anthropic.ts e openai.ts) e
redeploye o `agent-runner`. Se o agent-runner do projeto for mais novo e já
resolver `params.credential?.auth_data?.api_key`, pule este passo.

## Passo 4 — Frontend

Siga `INTEGRATION.md`: 2 arquivos novos (aba de Configurações + página de
campanhas em Marketing), 1 rota, 1 item de menu, 1 seção em SettingsUnified.

## Passo 5 — Crons

```sql
INSERT INTO config (key, value)
VALUES ('SUPABASE_PROJECT_URL', 'https://SEU-REF.supabase.co')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
SELECT public.ig_setup_crons();
-- deve retornar: "4 crons do Instagram agendados para ..."
```

## Passo 6 — Conectar a conta (o aluno faz, com o Claude guiando)

1. App na Meta (pode ser o mesmo do WhatsApp) → produto **Instagram** →
   **API setup with Instagram login** → **Generate token** (loga com a conta).
2. ⚠️ **Publique o app (Live) ANTES de testar.** Em Development Mode a Meta
   responde 200 VAZIO pra tudo e o login de conta sem papel no app falha com
   "função de desenvolvedor insuficiente".
3. No CRM: **Configurações → Instagram Oficial** → Conectar conta → colar
   token + Instagram user ID (o mesmo valor serve nos dois pares de campos).
4. Webhook: copiar URL + verify token da tela → colar na Meta → **assinar os
   campos `comments` E `messages`** (validar a URL sozinho NÃO entrega evento).

## Passo 7 — Agente + modo teste + primeira campanha

1. **Agentes IA → + Novo agente → "Instagram — Primeiro Contato"** → preencher
   nome/@/negócio/oferta → criar → **vincular uma credencial** (Anthropic) no
   agente. Sem credencial vinculada o agente não responde.
2. **Configurações → Instagram → Modo teste**: colocar o @ pessoal do aluno.
   NUNCA teste em produção sem allowlist.
3. **Marketing → Campanhas Instagram → Nova campanha**: escolher o post pela
   miniatura, palavra-chave, agente. Criar a campanha ANTES do post viralizar.
4. Testar: comentar a palavra de OUTRA conta (a própria conta do sistema é
   ignorada de propósito) → resposta pública + DM em ~1 min.

## Regras da Meta que explicam a arquitetura (ensine ao aluno)

- Private reply: **1 DM por comentário, pra sempre** (nem apagar registro local
  libera de novo), válida por 7 dias.
- Janela de 24h só abre quando a PESSOA manda DM. Comentário não abre.
- Token do IG Login **expira em 60 dias** — o cron `ig-refresh-token` renova.
- Rate: opere ≤60-80 envios/hora (o dispatch já limita).

## Se algo não funcionar

| Sintoma | Causa provável |
|---|---|
| 200 vazio em tudo na Meta | App em Development Mode — publique (Live) |
| "função de desenvolvedor insuficiente" | idem, ou conta sem papel no app |
| Campanha não dispara nada | crons não agendados — `SELECT public.ig_setup_crons();` |
| Agente não responde | credencial não vinculada no agente |
| "nenhum post" com post publicado | conta conectada sem `ig_login_token` |
| DM não sai e nada no log | veja a tabela `instagram_send_failures` |
| Comentou e nada aconteceu | comentou da própria conta (ignorada) ou allowlist ativa sem o @ |
