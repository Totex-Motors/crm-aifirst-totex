# ONBOARDING — Primeiros passos com os Agentes (para o Claude conduzir)

Depois da instalação, conduza o usuário (empresário, NÃO técnico) por esta
conversa. Linguagem simples, uma coisa de cada vez, confirme antes de seguir.

## 1. O cérebro (credencial de modelo) — obrigatório

Pergunte qual ele tem:
- **"Tenho ChatGPT Plus/Pro"** → OpenAI Codex (roda "de graça" — paga só a
  assinatura). Caminho: /agentes/credenciais → + Adicionar → OpenAI Codex →
  seguir os 3 passos da tela (instalar codex CLI, login, colar auth.json)
- **"Quero o caminho mais simples"** → Anthropic. Criar key em
  console.anthropic.com/settings/keys → colar
- O nome da credencial é opcional (usa o nome do provider)

## 2. O primeiro agente — comece pelo CEO

/agentes → **+ Novo agente** → template **Assistente Geral (CEO)** →
preencher nome do agente, nome do usuário e empresa → Criar.
Depois: Config → aba Modelo → escolher a credencial → Salvar.

Teste junto com ele no chat: *"quantos leads temos? e deals abertos?"*
O agente consulta o banco real e responde. Esse é o momento "uau" — deixe
o usuário fazer mais 2-3 perguntas.

## 3. Apresente os outros 4 templates (crie conforme o interesse)

| Template | Pra quê | Precisa de |
|---|---|---|
| ✍️ Conteúdo | carrosséis e posts prontos | credencial BoraPostar (opcional) |
| 📊 Tráfego | analisa e otimiza Meta Ads | credencial Meta Ads (System User Token) |
| 🧑‍💼 Gestor de Time | cobra pendências no grupo do WhatsApp | credencial UAZAPI + telefones do time |
| 💆 Atendente | atende leads no WhatsApp 24/7 | editar serviços/preços no prompt |

Regra de ouro: **um agente por vez**, começando pela maior dor do negócio.

## 4. Canais (quando ele quiser ir além do chat)

- **WhatsApp**: aba Canais do agente → + WhatsApp → escolher a instância →
  ligar o card "Roteador WhatsApp V2". Avise: a partir daí o agente V2
  responde os leads daquela instância (dá pra desligar a qualquer momento).
- **Telegram**: criar bot no @BotFather → colar token na aba Canais →
  Conectar → /start no bot. Modo "Por convite" = aprova quem pode falar.
- **Botão flutuante**: aba Canais → + Botão flutuante → a bolha aparece
  no CRM inteiro.

## 5. Rotinas (proatividade)

Ensine que é só PEDIR no chat: *"toda manhã às 9h me manda o resumo do
pipeline no WhatsApp"* → o agente agenda sozinho (lembrete recorrente).
Mínimo de intervalo configurável na aba Modelo (padrão 5 min).

## 6. Avisos importantes

- Cada mensagem do agente gasta tokens do provider escolhido (Codex = grátis
  com assinatura; Anthropic = centavos por conversa)
- Ações que mexem em dinheiro/dados pedem confirmação (tools com aprovação)
- O agente NUNCA inventa: consulta o banco. Se não sabe, fala que não sabe.
