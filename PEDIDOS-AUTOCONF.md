# Integração Autoconf → CRM AI-First

> Documento gerado a partir da inspeção do sistema Autoconf
> (https://app.autoconf.com.br/lead/atendimento) e da doc oficial
> (https://autoconf.com.br/api/, https://api.autoconf.com.br/doc).
>
> **Conta inspecionada:** Marcos / Cardoso Veículos

---

## TL;DR — O que o Autoconf já oferece

O Autoconf tem 3 mecanismos de integração prontos:

1. **Webhook de Leads** (PUSH) — envia POST pro nosso CRM quando:
   - Lead novo chega (`type: "novo"`)
   - Lead vira venda (`type: "sucesso"`)
   - Lead é perdido (`type: "insucesso"`)
2. **API RESTful** (PULL) — `https://api.autoconf.com.br`, autenticação Bearer + `revenda_token`. Doc no Postman: https://documenter.getpostman.com/view/8067914/TzRPkA86
3. **Feed de Estoque** (JSON/XML) — útil pra sincronizar o catálogo de veículos pro CRM e dar contexto ao agente IA.

Pra migrar os leads (objetivo principal), **a peça central é o WEBHOOK**.
A API REST serve pra fazer backfill histórico e atualização bidirecional.

---

## 1. Payload do webhook (CONFIRMADO)

### Lead novo (`type: "novo"`)
```json
{
  "type": "novo",
  "date": "2021-03-16 13:31:08",
  "lead_id": 123456,
  "lead_source": null,           // Portal/origem: "WebMotors", "Mercado Livre", "Mobiauto", "Olx", "Na Pista", "Autoline", "Site"
  "lead_source_slug": null,      // slug: "webmotors", "mercado-livre", etc.
  "lead_medium": "Whatsapp",     // Meio: "WhatsApp", "Telefone", "Email", "Chat"
  "lead_medium_slug": "whatsapp",
  "lead_content": null,          // Conteúdo: "Orgânico", "Anúncio", etc.
  "lead_content_slug": null,
  "lead_campaign": null,         // Campanha (se UTM)
  "lead_campaign_slug": null,
  "name": "João da Silva",
  "email": null,
  "mobile_phone": "4199999999",
  "phone": null,
  "negotiation_type": null,      // "Compra", "Venda", "Troca", "Financiamento"
  "negotiation_type_slug": null,
  "interested_in_vehicle": null, // objeto do veículo (estrutura a confirmar)
  "evaluated_vehicles": []       // array de veículos avaliados (troca)
}
```

### Lead ganho (`type: "sucesso"`)
Mesmo payload + campos extras:
- `reason`: motivo do sucesso (geralmente null)
- `creates_rescue_lead`: null

### Lead perdido (`type: "insucesso"`)
Mesmo payload + campos extras:
- `reason`: "Outro motivo" — motivo da perda
- `creates_rescue_lead`: true/false — se gerou lead de resgate

---

## 2. Mapeamento Autoconf → tabela `leads` do nosso CRM

| Campo Autoconf | Campo CRM (`leads`) | Observação |
|----|----|----|
| `lead_id` | `external_id` | Chave de deduplicação. Adicionar coluna se não tiver. |
| `name` | `nome` | OK |
| `email` | `email` | OK |
| `mobile_phone` | `telefone` / `whatsapp` | Normalizar pra E.164 (+55…). Webhook manda sem DDI. |
| `phone` | `telefone_fixo` | OK |
| `lead_source` | `source` | "WebMotors", "Mercado Livre", etc. |
| `lead_source_slug` | `source_slug` | Útil pra filtros. |
| `lead_medium` | `medium` | WhatsApp/Telefone/Email |
| `lead_content` | `content` | Orgânico/Pago |
| `lead_campaign` | `campaign` | UTM da campanha |
| `negotiation_type` | `negotiation_type` | Compra/Venda/Troca |
| `interested_in_vehicle` | `vehicle_of_interest` (JSON) | Marca/modelo/ano/preço |
| `evaluated_vehicles` | `evaluated_vehicles` (JSON) | Veículos do cliente (troca) |
| `date` | `created_at` (lead na origem) | Manter timestamp original |
| `type` | `sales_stage` | novo→`novo`, sucesso→`ganho`, insucesso→`perdido` |
| `reason` (insucesso) | `lost_reason` | Motivo da perda |

> O webhook do Autoconf manda o telefone sem DDI (ex: `4199999999`). Vamos prefixar com `+55` na edge function de recepção.

---

## 3. Lista de PEDIDOS pra mandar pro Suporte do Autoconf

Copia e cola pro chat/ticket deles:

---

> **Olá, time Autoconf!**
>
> Sou Marcos da **Cardoso Veículos** (CNPJ/Revenda: _[preencher]_) e estou
> integrando os leads do Autoconf com um CRM próprio que estamos construindo.
> Já vi a doc pública em https://autoconf.com.br/api/ e vou precisar das
> informações abaixo pra concluir a integração:
>
> **A) Webhook de leads**
> 1. Por favor, **habilitem o webhook** para a minha revenda apontando para a URL:
>    `https://<meu-projeto-supabase>.supabase.co/functions/v1/autoconf-webhook`
>    (vou enviar a URL definitiva quando o endpoint estiver no ar).
> 2. Confirmem se posso receber os **3 eventos**: `novo`, `sucesso` e `insucesso`.
> 3. Vocês têm também eventos de **atualização** (mudança de etapa, transferência
>    de atendente, agendamento, recontato)? Se sim, qual o payload?
> 4. O webhook tem **header de autenticação** (HMAC/token compartilhado/Bearer)
>    pra eu validar que a requisição veio realmente do Autoconf?
> 5. **Política de retry e timeout**: quantas tentativas em caso de erro 5xx?
>    Qual o timeout?
> 6. **Dedup**: o `lead_id` é único por revenda, certo? Posso usar como
>    identificador idempotente?
> 7. Quando `interested_in_vehicle` está preenchido, qual o **schema completo**
>    desse objeto? (Marca, modelo, versão, ano, KM, placa, preço, FIPE, fotos?)
> 8. Mesmo para `evaluated_vehicles[]` — qual o schema de cada item?
> 9. Existe webhook quando o lead recebe **mensagem** (chat/WhatsApp), ou só
>    quando muda de status?
>
> **B) API RESTful (pra backfill histórico)**
> 10. Por favor, **emitam um Bearer Token** e o `revenda_token` da Cardoso Veículos
>     pra eu acessar `https://api.autoconf.com.br` (mencionado na doc).
> 11. **Endpoint pra listar leads históricos**: precisa puxar todos os leads
>     dos últimos 12 meses pra popular o CRM novo. Qual o método, parâmetros
>     (paginação, filtros por data/status) e limite de rate-limit?
> 12. **Endpoint pra atualizar status do lead** no Autoconf (pra eventualmente
>     sincronizar de volta quando trabalharmos o lead no nosso CRM)?
> 13. **Endpoint de tags**: como adicionar/remover tags via API?
> 14. **Endpoint de agendamento/visita**: dá pra criar agendamento via API?
> 15. **Endpoint do feed de estoque** autenticado (não só o público de modelo)?
>     Precisamos sincronizar o estoque real pra alimentar o agente IA.
>
> **C) Limites operacionais**
> 16. **Volume médio** de leads que minha revenda recebe por dia
>     (pra dimensionar o webhook).
> 17. Vocês têm **ambiente de sandbox** pra eu testar antes de jogar em prod?
> 18. Algum **WAF/whitelist** de IP de origem dos webhooks pra eu liberar
>     na minha edge function?
>
> Obrigado! Aguardo retorno pra alinhar.
>
> _Marcos – Cardoso Veículos_

---

## 4. Próximos passos no nosso CRM (depois do retorno deles)

1. Criar edge function `autoconf-webhook` no Supabase.
2. Migration: adicionar colunas `external_id`, `external_source`, `source_slug`,
   `medium`, `content`, `campaign`, `negotiation_type`, `vehicle_of_interest`,
   `evaluated_vehicles`, `lost_reason` na tabela `leads`.
3. Mapear `lead_source_slug` do Autoconf → coluna `source` no CRM, normalizando
   pros valores que já temos.
4. Job de backfill (one-shot) consumindo a API REST pra puxar histórico.
5. UI em `/configuracoes > Integrações > API Keys` pra guardar `revenda_token`
   e Bearer (seguindo o padrão `getIntegrationKey()`).

---

## 5. Origens disponíveis no Autoconf (lista vista no filtro)

Esses são os valores possíveis do campo `lead_source` que o webhook vai mandar:

**Portais:** WebMotors, Mercado Livre, Mobiauto, Olx, Na Pista, Autoline,
iCarros, Karvi, Meu Carro Novo, Usadosbr, Marketplace

**Mídias pagas/orgânicas:** Google, Facebook, Instagram, TikTok, Facebook
Ads, Instagram Ads, Tráfego Pago

**Próprias:** Site, Loja, Telefone, WhatsApp, Email Marketing, SMS, Chat,
Indicação, Passante, Showroom, Landing Page, Outdoor, Panfleto, Totem

**Internas Autoconf:** Crm, Duotalk, My business, Aniversariante, Carteira,
Resgate, Prospecção, Financiamento Integrado, Consignação Carro
