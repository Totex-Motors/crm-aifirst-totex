---
name: install-instagram-oficial
description: >
  Instala o acelerador de Instagram Oficial (API Meta) no CRM do aluno:
  inbox, agente de IA, campanhas comentário→DM, cutucão e renovação de token.
  Use quando o aluno disser "instala o instagram", "instalar instagram oficial",
  "configurar automação de instagram" ou tiver descompactado o
  instagram-oficial-pack na raiz do projeto.
---

# Instalar Instagram Oficial

O passo a passo completo está em `instagram-oficial-pack/INSTALL.md` — siga na
ordem, sem pular. Regras de conduta:

1. O aluno NÃO é técnico. Linguagem de empresário: nada de "edge function",
   "migration", "RLS". Fale "robô", "banco", "instalação".
2. UMA pergunta por vez. Confirme cada etapa antes da próxima.
3. Os passos 6 e 7 (Meta + conta) são DO ALUNO com você guiando tela a tela —
   tokens são colados por ELE na interface do CRM, nunca no chat.
4. Antes de qualquer teste real: allowlist com o @ pessoal dele. Sem exceção.
5. Ao final: rode o teste E2E (comentar de outra conta → pública + DM) e SÓ
   declare instalado quando ver a DM chegar.
6. Se falhar, consulte a tabela de sintomas no fim do INSTALL.md antes de
   improvisar.
