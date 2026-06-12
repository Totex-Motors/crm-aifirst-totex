---
name: install-agents-platform
description: >
  Instala a Plataforma de Agentes IA no CRM AI-First. Use SEMPRE que o
  usuário pedir pra instalar a plataforma de agentes, agents platform,
  "instala os agentes", "plataforma de agentes", "agentes IA do pack",
  ou quando existir a pasta agents-platform-pack/ na raiz do projeto e
  o usuário mencionar instalação. Orquestra: migrations na ordem certa,
  edge functions via CLI, patch do whatsapp-webhook, cron com placeholders,
  frontend (rotas+sidebar+tailwind) e teste E2E guiado.
---

# Instalar a Plataforma de Agentes IA

Você vai instalar a plataforma seguindo o `agents-platform-pack/INSTALL.md`
à risca. O usuário NÃO é técnico.

## Regras de condução

1. Leia `agents-platform-pack/INSTALL.md` INTEIRO antes de começar
2. Siga a ordem EXATA: migrations 0001→0005 → functions → patch whatsapp →
   cron 0006 (placeholders!) → frontend → teste E2E
3. Após CADA passo, rode a validação indicada e mostre o resultado
4. A service_role key do cron: PEÇA pro usuário colar (Dashboard →
   Settings → API). Nunca invente.
5. Linguagem de empresário: "banco de dados" e não "migration RLS DDL"
6. Se algo falhar, leia o erro, corrija e tente de novo — não pule etapa
7. Ao final, conduza o `ONBOARDING.md` (credencial → 1º agente → teste real)

## Checklist final (todos ✓ antes de declarar sucesso)

- [ ] 17 tabelas, ≥39 skills, 5 templates no banco
- [ ] 5 edge functions deployadas (--no-verify-jwt)
- [ ] whatsapp-webhook patcheado e redeployado (flag V2 = off)
- [ ] cron agent-jobs-poller ativo (com URL/key reais, sem placeholder)
- [ ] tsc --noEmit e npm run build passando
- [ ] /agentes abre; + Novo agente lista os 5 templates
- [ ] 1º agente criado a partir de template respondeu pergunta com dado real do banco
