# Análise do ERP Checkered + Roadmap para o CRM AI-First Totex

> **O que é este documento:** análise do sistema **Checkered** (ERP para lojas de
> veículos, observado na conta "Cardoso Veículos") a partir de 41 prints, cruzada
> com o que o **crm-aifirst-totex já tem hoje**, com estimativa de esforço e um
> roadmap faseado de implementação.
>
> **Documentos relacionados:**
> - `documentacao-telas.md` — referência detalhada, tela por tela, do Checkered.
>
> **Importante:** o objetivo é entender as **funcionalidades** de uma loja de
> veículos para construir o **nosso próprio** sistema. Funcionalidades (estoque,
> troca, financeiro) não são protegidas — são o "feijão com arroz" do setor. Não
> copiamos design nem código de terceiros.

---

## 1. O que é o Checkered, em uma frase

É um **ERP + CRM + vitrine** para **lojas de veículos** (revendas). Cobre o ciclo
completo: capta o lead → mostra o estoque numa vitrine pública → faz test drive →
avalia o carro de troca → vende → emite nota fiscal → faz pós-venda (revisão, IPVA,
NPS) → e ainda fecha o caixa (financeiro, DRE, conciliação bancária).

É um produto **vertical** (especializado em um nicho) e **maduro**: tem fiscal,
Open Finance, marketplaces, LGPD, assinatura digital. É bastante coisa.

---

## 2. Mapa completo dos módulos do Checkered

### 2.1 Operação de vendas
| Módulo | O que faz |
|--------|-----------|
| **Dashboard** | KPIs de estoque (disponíveis, vendidos, reservados, alertas +60d), vitrine, meta do mês, saúde do estoque, SLA de leads, test drive, ranking, pós-venda. Widgets configuráveis. |
| **Leads** | Captação e gestão de leads, com SLA de primeiro contato. |
| **Auto-atribuição de Leads** | Distribui leads automaticamente: rodízio (round-robin), carga balanceada ou aleatório. SLA padrão 60 min (amarelo = perto de vencer, vermelho = vencido). |
| **Vendas** | Registro e histórico de vendas. KPIs: vendas concluídas, receita total. |
| **Comissões** | Comissão por vendedor e por indicação. |
| **Metas de Vendas** | Meta por loja e por vendedor. |

### 2.2 Estoque de veículos (o coração)
| Módulo | O que faz |
|--------|-----------|
| **Estoque (Veículos)** | Lista com filtros por status (Em Estoque / Reservado / Vendido) e origem. |
| **Novo Veículo** | Cadastro extenso: básico, técnico, financeiro + **50+ opcionais** agrupados (Conforto, Exterior, Performance, Segurança, Tecnologia). |
| **Giro & Encalhados** | Semáforo por tempo parado: **Verde 0-30d / Amarelo 31-60d / Laranja 61-90d / Encalhado >90d**. |
| **Sugestão de Remarcação** | Desconto automático sugerido por faixa de giro (ex: 2% / 5% / 8%), com teto acumulado (padrão 20%). |
| **Recondicionamento & Margem** | Margem alvo (%) que calcula o valor máximo de oferta na troca; catálogo de itens de recondicionamento que viram despesas previstas do veículo. |
| **Origens de veículo** | Particular, Troca, Locadora, Leilão (3 tipos), Frota, Repasse. |

### 2.3 Troca / Avaliação
| Módulo | O que faz |
|--------|-----------|
| **Avaliações de Troca** | Lista (recebidas/enviadas). |
| **Nova Avaliação de Troca** | Formulário com dois veículos (o de troca + referência), **"cliente pediu" × "loja ofertou"**, condições e observações. Ao converter, os itens de recondicionamento viram despesa do veículo no estoque. |

### 2.4 Pós-venda & relacionamento
| Módulo | O que faz |
|--------|-----------|
| **Pós-venda (Lembretes)** | Revisão, IPVA, financiamento. Abas Entrada/Saída/Todos. |
| **NPS Pós-venda** | Disparo automático **D+30**, pergunta NPS 0-10 customizável, canais WhatsApp + e-mail. |
| **Campanhas de Nutrição** | Sequências WhatsApp/e-mail segmentadas por origem, marca, veículo de interesse. Respeitam janela de 24h do WhatsApp e horário comercial. |
| **Indicação de Clientes (B2C)** | Programa de indicação com link único, recompensa em R$ (mín. R$ 50), elegibilidade por tempo desde a última compra, convite pós-venda. |
| **Google Reviews** | Avaliações do Google na vitrine (via Place ID, sync diário). |

### 2.5 Agenda
| Módulo | O que faz |
|--------|-----------|
| **Agenda de Test Drive** | Lista e calendário de agendamentos, com status. |

### 2.6 Vitrine pública (site da loja)
| Módulo | O que faz |
|--------|-----------|
| **Configurações da Vitrine** | Identidade (logo, contato), localização, "Super Vitrine", indicações B2B, alertas de estoque, galeria de fotos. |
| **Site público / Super Vitrine** | A loja online onde o cliente vê o estoque e inicia troca/contato (foi o link original: `/store/cardosoveiculos/trocas/nova`). |

### 2.7 Financeiro
| Módulo | O que faz |
|--------|-----------|
| **Financeiro — Resultado do Período** | KPIs: investido em estoque, margem potencial, lucro realizado, ticket médio, despesas fixas. |
| **DRE** | Demonstração de resultado, gráfico de 12 meses + tabela mensal. |
| **Fluxo de Caixa Projetado** | Projeção diária de 90 dias com saldo acumulado. |
| **Conciliação Bancária** | Casa o extrato do banco com os lançamentos do sistema, via **Open Finance (Pluggy)**. |
| **Contas Bancárias** | Conexão de contas via Open Finance (Pluggy), modo sandbox. |
| **Dados de Recebimento (PIX)** | Cadastro de chaves PIX. |

### 2.8 Fiscal & Documentos
| Módulo | O que faz |
|--------|-----------|
| **Configurações Fiscais** | CNPJ, regime tributário, **certificado digital A1 (.pfx/.p12)**, integração **NFe.io** (emissão de NF-e), suporte white-label. |
| **Documentação (Checklists)** | Checklist de Entrada (8 itens) e Saída (14 itens: ATPVE, DETRAN, reconhecimento de firma, gravame, despachante…) por veículo. |
| **Documentos** | Procuração (modelo com marcadores `{{variavel}}`), gerar documentos de venda. |
| **Assinatura Digital** | Integração **Autentique** para assinar documentos. |

### 2.9 Relatórios & BI
| Módulo | O que faz |
|--------|-----------|
| **Relatório por Origem** | ROI médio, giro e margem por origem de aquisição. |
| **Relatório de Vendas** | Filtros de período e forma de pagamento; 6 KPIs. |
| **Relatório de NPS** | Distribuição 0-10, promotores × detratores. |
| **Funil de Conversão & ROI por Origem** | Investimento → Leads → Qualificados → Propostas → Vendas → Receita → Lucro → ROI, com CPL médio por canal. |
| **Construtor de Relatórios** | Builder de 4 passos (entidade, filtros, agrupamentos, visualização) com agendamento por e-mail. |
| **Mídia & Investimento** | Investimento mensal por canal para calcular ROI; alertas de ROI baixo. |

### 2.10 Administração & Compliance
| Módulo | O que faz |
|--------|-----------|
| **Configurações de Empresa** | Dados cadastrais + modelos de documentos. |
| **Usuários da Loja** | CRUD de usuários, convite por link (expira em 7 dias). |
| **Perfis de Acesso** | 4 perfis padrão: Operacional, Vendedor, Financeiro, Gerente. |
| **Filiais (Unidades)** | Multi-unidade com acesso restrito por filial. |
| **Auditoria** | Log de todas as ações por área (Acesso, Veículos, Vendas, Financeiro, Fiscal, Perfis, Usuários, Membros), tipo e usuário. |
| **Conformidade LGPD** | Solicitações de exportação/exclusão, prazo legal de 15 dias (art. 19). |
| **Minha Assinatura** | Plano e cobrança da própria loja (SaaS). |

### 2.11 Integrações
| Integração | Para quê |
|------------|----------|
| **Marketplaces** | OLX, Webmotors, iCarros, Mercado Livre, Mobiauto, MercadoAutos/MeuCarroNovo, Ibbx — publicar o estoque. |
| **Open Finance (Pluggy)** | Extrato bancário / conciliação. |
| **NFe.io** | Emissão de nota fiscal. |
| **Autentique** | Assinatura digital. |
| **Google Places** | Reviews na vitrine. |
| **WhatsApp** | Atendimento e campanhas. |

---

## 3. Checkered × o que VOCÊ já tem (crm-aifirst-totex)

A boa notícia: **o seu CRM já tem a espinha dorsal**. Olhando o código, você já
tem modelo de veículo, leads, deals, pagamentos, comissões, WhatsApp+IA, e-mail
marketing, NPS, automações, tarefas e agenda. Muita coisa do Checkered é
**adaptar o que existe**, não criar do zero.

Legenda de esforço: 🟢 Baixo · 🟡 Médio · 🔴 Alto

| Módulo do Checkered | Você já tem? | O que falta | Esforço |
|---------------------|-------------|-------------|---------|
| Estoque de veículos | **Parcial** — `useVehicles` já tem modelo completo (marca, FIPE, placa, km, fotos, preço, localização, features) | Telas de CRUD próprias + status estoque/reservado/vendido + opcionais categorizados | 🟡 |
| Giro & Encalhados + remarcação | ❌ | Cálculo de dias em estoque + faixas de cor + sugestão de desconto | 🟡 |
| Avaliação de Troca | ❌ (mas há pipeline/leads pra encaixar) | Formulário "cliente pediu × loja ofertou" + conversão em estoque com despesas | 🟡 |
| Leads + scoring | ✅ (scoring IA, BANT) | Auto-atribuição round-robin + SLA visual | 🟢 |
| Vendas / Deals | ✅ (`useSalesDeals`, pagamentos, comissões) | "Vestir" para veículos | 🟢 |
| Comissões | ✅ (`useCommissions`) | Comissão por indicação | 🟢 |
| Metas de vendas | **Parcial** (dashboards) | Tela de meta por loja/vendedor | 🟢 |
| Pós-venda (revisão/IPVA) | **Parcial** (automações, cadências, tarefas) | Gatilhos específicos (revisão, IPVA, financiamento) | 🟢 |
| NPS | ✅ (migrations de NPS + schedule) | Disparo D+30 + tela de relatório | 🟢 |
| Campanhas de nutrição | ✅ (e-mail marketing, campanhas, automações WhatsApp) | Segmentação por marca/veículo | 🟢 |
| Indicação B2C | ❌ (mas há `usePartnerLeads`) | Link único + recompensa + elegibilidade | 🟡 |
| Agenda Test Drive | **Parcial** (agenda, Google Calendar, reuniões) | Adaptar para "test drive" | 🟢 |
| Vitrine pública | **Parcial** (`src/pages/public`) | Loja online com estoque + início de troca | 🔴 |
| Financeiro (DRE, Fluxo Caixa) | **Parcial** (`useTransactions`) | DRE, fluxo de caixa projetado, despesas fixas | 🔴 |
| Conciliação bancária (Open Finance) | ❌ | Integração Pluggy + matching | 🔴 |
| Fiscal (NF-e) | ❌ | Integração NFe.io + certificado A1 | 🔴 |
| Documentos / Checklists | ❌ | Checklists entrada/saída + geração de docs | 🟡 |
| Assinatura digital | ❌ | Integração Autentique | 🟡 |
| Marketplaces (OLX/Webmotors…) | ❌ | Uma integração por marketplace | 🔴 |
| Relatórios / Funil ROI | **Parcial** (dashboards) | Funil por origem + builder + relatório por origem | 🟡 |
| Auditoria (log) | ❌ | Infra de log de ações | 🟡 |
| Perfis de acesso / Filiais | **Parcial** (multi-tenant, roles admin/comercial/sdr) | Perfis Operacional/Financeiro/Gerente + filiais | 🟡 |
| LGPD | ❌ | Exportação/exclusão de dados | 🟡 |
| Google Reviews | ❌ | Integração Google Places | 🟢 |

**Resumo:** das ~25 áreas, você já tem **~10 prontas ou quase**, **~8 são esforço
médio** e **~5 são as "pesadas"** (vitrine, financeiro, Open Finance, fiscal,
marketplaces) — justamente as que dependem de integrações externas e regulação.

---

## 4. Roadmap recomendado (faseado)

> Princípio: **entregar valor cedo** e deixar as integrações pesadas pro final.

### 🟢 Fase 1 — Núcleo da loja de veículos (2-4 semanas)
O que transforma o CRM atual num "CRM de revenda" de verdade. Aproveita 80% do que existe.
1. **Estoque de veículos** — telas de CRUD sobre o modelo `useVehicles` que já existe (status, fotos, opcionais).
2. **Avaliação de Troca** — formulário "cliente pediu × loja ofertou" → entra como lead/deal no pipeline.
3. **Agenda de Test Drive** — adaptar a agenda existente.
4. **Auto-atribuição de leads** + SLA — round-robin sobre os leads que já existem.

### 🟢 Fase 2 — Pós-venda & retenção (1-2 semanas)
Quase tudo já existe; é configurar e dar a cara de veículos.
5. **Pós-venda** (lembretes de revisão/IPVA) via automações existentes.
6. **NPS D+30** — já há base de NPS.
7. **Campanhas de nutrição** segmentadas — já há e-mail/WhatsApp marketing.
8. **Indicação B2C** — link + recompensa.

### 🟡 Fase 3 — Gestão & inteligência (2-4 semanas)
9. **Giro & Encalhados** + sugestão de remarcação.
10. **Relatórios**: funil de conversão & ROI por origem, relatório por origem.
11. **Auditoria** (log de ações).
12. **Perfis de acesso** (Operacional/Financeiro/Gerente) + **Filiais**.
13. **Metas de vendas**.

### 🔴 Fase 4 — Vitrine pública (3-5 semanas)
14. **Site/vitrine** com estoque público + início de troca/contato (gera leads de verdade).

### 🔴 Fase 5 — Financeiro & integrações pesadas (sob demanda, cada uma é um projeto)
15. **Financeiro** (DRE, fluxo de caixa, despesas fixas).
16. **Conciliação bancária** (Open Finance / Pluggy).
17. **Fiscal** (NF-e via NFe.io + certificado A1).
18. **Marketplaces** (OLX, Webmotors, iCarros, Mercado Livre…) — uma por vez.
19. **Assinatura digital** (Autentique) + **Documentos/Checklists**.
20. **LGPD** (exportação/exclusão).

---

## 5. Minha recomendação honesta

1. **Não recrie o Checkered inteiro.** Ele tem ~6 anos de produto especializado.
   Reconstruir fiscal + Open Finance + 7 marketplaces do zero é caro e demorado —
   e essas partes você pode até **integrar** em vez de construir (ex: usar NFe.io,
   Pluggy e Autentique direto, que é o que o próprio Checkered faz).

2. **Comece pela Fase 1 + 2.** Em ~1 mês você tem um CRM de revenda funcional
   (estoque + troca + test drive + pós-venda) montado sobre o que já existe,
   com o **diferencial que o Checkered não tem: agente de IA e coach** que você
   já domina.

3. **As "pesadas" (Fase 4-5) entram por ROI**, não por completude. Vitrine pública
   provavelmente vale mais que fiscal no começo (gera lead). Fiscal e Open Finance
   só quando houver volume que justifique.

---

## 6. Próximos passos sugeridos

- [ ] Você escolhe por onde começar (sugiro **Estoque + Avaliação de Troca** da Fase 1).
- [ ] Eu desenho o **plano técnico** dessa primeira entrega (tabelas no Supabase, telas, hooks) encaixando no padrão do projeto.
- [ ] Implementamos incremental, sempre na branch de trabalho, com você validando cada parte.

> _Documento gerado a partir de 41 prints do Checkered (conta "Cardoso Veículos").
> Sem cópia de código/design de terceiros — apenas análise funcional para
> construção de produto próprio._
