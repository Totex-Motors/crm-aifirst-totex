# Documentação do ERP Checkered — Cardoso Veículos
## Parte 1 (páginas 1 a 41 do PDF)

> Sistema: **Checkered** (checkered.com.br)  
> Conta documentada: **Cardoso Veículos**  
> Faixa documentada: todas as 41 páginas disponíveis no PDF

---

## Índice de Módulos

1. [Dashboard](#1-dashboard)
2. [Personalizar Dashboard](#2-personalizar-dashboard)
3. [Vendas](#3-vendas)
4. [Menu Principal / Navegação](#4-menu-principal--navegação)
5. [Pós-venda (Lembretes)](#5-pós-venda--lembretes)
6. [Agenda de Test Drive](#6-agenda-de-test-drive)
7. [Conciliação Bancária](#7-conciliação-bancária)
8. [Financeiro — DRE](#8-financeiro--dre-demonstração-do-resultado)
9. [Financeiro — Fluxo de Caixa Projetado](#9-financeiro--fluxo-de-caixa-projetado)
10. [Relatório por Origem](#10-relatório-por-origem)
11. [Relatório de Vendas](#11-relatório-de-vendas)
12. [Relatório de NPS](#12-relatório-de-nps)
13. [Meus Relatórios (Relatórios Personalizados)](#13-meus-relatórios--relatórios-personalizados)
14. [Funil de Conversão & ROI por Origem](#14-funil-de-conversão--roi-por-origem)
15. [Auditoria](#15-auditoria)
16. [Avaliações de Troca](#16-avaliações-de-troca)
17. [Nova Avaliação de Troca](#17-nova-avaliação-de-troca)
18. [Indicação de Clientes B2C — Configuração do Programa](#18-indicação-de-clientes-b2c--configuração-do-programa)
19. [Indicações de Clientes — Lista](#19-indicações-de-clientes--lista)
20. [Veículos — Estoque (Lista)](#20-veículos--estoque-lista)
21. [Novo Veículo (Formulário de Cadastro)](#21-novo-veículo--formulário-de-cadastro)
22. [Giro & Encalhados](#22-giro--encalhados)
23. [Sugestão de Remarcação por Giro (Configuração)](#23-sugestão-de-remarcação-por-giro--configuração)
24. [Documentação — Checklists](#24-documentação--checklists)
25. [Templates de Documentação](#25-templates-de-documentação)
26. [Procuração](#26-procuração)
27. [Gerar Documentos de Venda](#27-gerar-documentos-de-venda)
28. [Assinatura Digital](#28-assinatura-digital)
29. [Configurações de Empresa](#29-configurações-de-empresa)
30. [Usuários da Loja](#30-usuários-da-loja)
31. [Perfis de Acesso](#31-perfis-de-acesso)
32. [Google Reviews na Vitrine](#32-google-reviews-na-vitrine)
33. [Configurações da Vitrine](#33-configurações-da-vitrine)
34. [Configurações Fiscais](#34-configurações-fiscais)
35. [Dados de Recebimento (Chaves PIX)](#35-dados-de-recebimento--chaves-pix)
36. [Campanhas de Nutrição](#36-campanhas-de-nutrição)
37. [Nova Campanha de Nutrição (Formulário)](#37-nova-campanha-de-nutrição--formulário)
38. [Configurações — Pós-venda (Geral)](#38-configurações--pós-venda-geral)
39. [NPS Pós-venda (Configuração)](#39-nps-pós-venda--configuração)
40. [Metas de Vendas (Configuração)](#40-metas-de-vendas--configuração)
41. [Auto-atribuição de Leads](#41-auto-atribuição-de-leads)
42. [Filiais (Unidades)](#42-filiais-unidades)
43. [Recondicionamento & Margem](#43-recondicionamento--margem)
44. [Mídia & Investimento](#44-mídia--investimento)
45. [Conformidade LGPD](#45-conformidade-lgpd)
46. [Contas Bancárias (Open Finance / Pluggy)](#46-contas-bancárias--open-finance--pluggy)
47. [Integrações com Marketplaces](#47-integrações-com-marketplaces)
48. [Assinatura Digital — Autentique](#48-assinatura-digital--autentique)
49. [Minha Assinatura (Plano)](#49-minha-assinatura--plano)

---

## 1. Dashboard

**Propósito:** Visão geral do estoque e desempenho do time. Tela inicial após login.

### Cards de métricas (KPIs)
| KPI | Descrição |
|-----|-----------|
| Disponíveis para Venda | Quantidade de veículos atualmente em estoque disponíveis |
| Vendidos este Mês | Total de veículos vendidos no mês corrente |
| Reservados | Veículos com reserva ativa |
| Alertas (+ 60 dias) | Veículos parados há mais de 60 dias |

### Seções do Dashboard
- **Vitrine do Estoque** — lista de veículos disponíveis com campo de busca por placa ou modelo (campo de pesquisa livre)
- **Meta do Mês** — exibe meta configurada; link "Definir agora" se não houver meta; link "Configurar →"
- **Saúde do Estoque** — link "Ver tudo →"
  - Idade média (dias)
  - Giro médio (90d)
  - Distribuição por cor de status: Verde, Amarelo, Laranja, Encalhado
- **Score de Performance** — exibe score quando há leads registrados
- **SLA de Leads** — link "Configurar →"
  - SLA configurado (ex: 1h)
  - Cumprimento (%)
  - Subcards: No prazo / Pós-venda / Vencido
- **Test Drive** — link "Abrir agenda"
  - Últimos 7 dias (quantidade)
  - Conversão (30d) em percentual
  - Próximos agendamentos
- **Ranking do Mês** — ranking de vendedores por vendas no mês
- **Parados há mais de 60 dias** — lista de veículos encalhados
- **Pós-venda** — link "Ver tudo →"
  - Lembretes do mês (enviados / concluídos)
  - Clientes opt-out (não recebem lembretes)
  - Canal E-mail: percentual (enviados/abertos)
  - Canal WhatsApp: percentual (enviados/abertos)
  - Próximos vencimentos (30d)

### Botões e ações
- **Personalizar** — abre painel lateral de personalização do dashboard (p-02)
- **Editor layout** (dentro da seção Vitrine do Estoque)
- **Configurar →** (Meta do Mês, SLA de Leads)
- **Ver tudo →** (Saúde do Estoque, Pós-venda)
- **Abrir agenda** (Test Drive)
- **Definir agora** (Meta do Mês, quando vazia)

### Barra de navegação inferior (mobile)
Estoque | Leads | Agenda | WhatsApp | Mais

---

## 2. Personalizar Dashboard

**Propósito:** Painel lateral (drawer) para ativar/desativar e reordenar os widgets do Dashboard.

### Lista de widgets configuráveis (com toggle on/off)
- KPIs do topo (Disponíveis, Vendidos, Reservados, Alertas)
- Vitrine do Estoque
- Meta do Mês
- Saúde do Estoque
- Score de Performance
- SLA de Leads
- Test Drive
- Ranking do Mês
- Parados há mais de 60 dias
- Pós-venda
- (outros widgets visíveis mas não legíveis na resolução)

### Botão
- **Salvar layout**

---

## 3. Vendas

**Propósito:** Registro e histórico de vendas realizadas.

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| Vendas Concluídas | Quantidade total de vendas registradas |
| Receita Total | Valor total de vendas em R$ |

### Estado vazio
- Mensagem: "Nenhuma venda registrada. Comece registrando a primeira venda."
- Botão: **+ Registrar Venda**

### Botão principal
- **+ Nova Venda** (canto superior direito)

---

## 4. Menu Principal / Navegação

**Propósito:** Menu lateral de navegação geral do sistema (sidebar).

### Itens do menu (em ordem de exibição)
- Dashboard
- Vendas
- Pós-venda
- Agenda Test Drive
- Conciliação Bancária
- Financeiro ▶ (submenu)
- Relatórios ▶ (submenu)
- Auditoria
- Avaliações de Troca
- Leads
- Comissões
- Indicações de clientes
- Cadastros ▶ (submenu)
- Documentação ▶ (submenu)
- Documentos ▶ (submenu)
- Configurações ▶ (submenu)
- Minha Conta
- Integrações ▶ (submenu)
- Assinatura
- WhatsApp ▶ (submenu)
- Suporte

### Cabeçalho
- Logo da loja (Cardoso Veículos — Powered by Checkered)
- Links de acesso rápido: **Super Vitrine** | **Ver Site da Loja** | **[M]** (inicial do usuário) | **Sair**

---

## 5. Pós-venda — Lembretes

**Propósito:** Gestão de lembretes de revisão, IPVA e financiamento para clientes pós-venda.

### Filtros
- Dropdown de status: **Todos** (opções: Todos, outros não visíveis)
- Aba **Tipos**: Todos
- Busca textual (campo livre)

### Estado vazio
- "Nenhum lembrete encontrado."

### Botão
- **Atualizar**

---

## 6. Agenda de Test Drive

**Propósito:** Acompanhar e gerenciar os test drives da loja.

### Abas de visualização
- **Lista** | **Calendário**

### Filtros
- Dropdown: **Todos status**

### Botão
- **+ Novo agendamento**

### Estado vazio
- "Nenhum test drive encontrado. Clique em Novo agendamento para começar."

---

## 7. Conciliação Bancária

**Propósito:** Confirmar matches automáticos do extrato com lançamentos do sistema.

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| Conciliado | Percentual de transações conciliadas (ex: 0%) |
| Total no banco | Valor total das transações do extrato bancário |
| Total no sistema | Valor total dos lançamentos no sistema |
| Total no sistema (linha adicional) | (campo duplicado na tela — pode ser versão anterior) |
| Divergência | Diferença entre banco e sistema |

### Abas
- **Pendentes** (aba ativa por padrão)

### Seções
- **Extrato bancário** — exibe transações importadas do banco; estado vazio: "Nenhuma transação. Conecte uma conta bancária em Configurações → Contas bancárias."
- **Candidatos para match** — "Selecione uma transação à esquerda para ver candidatos."

---

## 8. Financeiro — DRE (Demonstração do Resultado)

**Propósito:** Demonstração do resultado financeiro do período.

### Filtros/abas
- Abas de período (não totalmente visíveis na resolução)
- Filtro de Filial e Loja de Emissão

### Cards de métricas do topo
| KPI | Descrição |
|-----|-----------|
| Receitas | R$ valor |
| Lucro Líquido | R$ valor |

### Seção: Resultado Líquido — 12 meses
- Gráfico de linha (resultado líquido ao longo dos 12 meses)

### Tabela DRE 12 meses (R$)
Colunas de meses (não legíveis individualmente) e linhas de categorias financeiras (parcialmente visíveis):
- (+) Receitas
- (-) Deduções
- = Receita Líquida
- (-) Custos
- = Lucro Bruto
- (-) Despesas
- = EBITDA
- (-) outros itens
- = Resultado Líquido

---

## 9. Financeiro — Fluxo de Caixa Projetado

**Propósito:** Projeção de 90 dias com saldo acumulado e projeção diária. Permite visualizar entradas e saídas futuras com base nos lançamentos programados.

### Filtros/Ações
- Seletor de período
- Botões: **Aplicar** | **CSV**

### Cards de métricas do topo
| KPI | Descrição |
|-----|-----------|
| Total Entradas | R$ valor |
| Total Saídas | R$ valor (destacado em vermelho quando negativo) |
| Saldo Atual | R$ valor |
| Maior Saldo | R$ valor |

### Seção: Saldo acumulado projetado
- Gráfico de área (saldo acumulado ao longo dos dias projetados)

### Seção: Projeção diária
Tabela com colunas:
- **Data**
- **Entradas**
- **Saídas**
- **Saldo do Dia**
- **Saldo Acumulado**

---

## 10. Relatório por Origem

**Propósito:** Análise de performance agrupada pela origem do veículo (de onde veio: particular, leilão, etc.).

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| ORIGENS | Quantidade de origens distintas |
| TOTAL VEÍCULOS | Total de veículos nas origens |
| ROI MÉDIO GERAL | ROI médio em percentual |
| GIRO MÉDIO | Média de dias para vender |

### Tabela
Colunas:
- **Origem**
- **Qtd**
- **Margem Média**
- **Giro (Dias)**
- **ROI Médio**

---

## 11. Relatório de Vendas

**Propósito:** Análise de vendas e comissões por período.

### Filtros de período
- Mês Atual | Mês Anterior | Últimos 30 dias | Ano Atual | Todo Período | Personalizado

### Filtros adicionais
- Dropdown **Todas as formas** (forma de pagamento)

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| TOTAL DE VENDAS | Quantidade de vendas |
| RECEITA LÍQUIDA | R$ valor |
| TICKET MÉDIO | R$ valor |
| LUCRO TOTAL | R$ valor (destacado) |
| COMISSÃO TOTAL | R$ valor (destacado) |
| MARGEM MÉDIA | Percentual |

### Tabela
- Seção **Vendas** (lista de vendas do período)
- Estado vazio: "Nenhuma venda no período. Ajuste os filtros ou período para ver mais resultados."

---

## 12. Relatório de NPS

**Propósito:** Acompanhar a satisfação dos clientes pós-venda via NPS (Net Promoter Score).

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| NPS ATUAL | Valor do NPS (traço quando não há dados) |
| RESPOSTAS | Quantidade de respostas de X enviadas |
| PROMOTORES | Clientes com nota 9-10 |
| DETRATORES | Clientes com nota 0-6 |

### Seção: Distribuição de notas
- Gráfico de barras horizontais com notas de 0 a 10 e contagem de cada nota

### Seção: Respostas
- Filtros: **Todas notas** (dropdown) | **Todos** (dropdown)
- Botão de refresh
- Lista de respostas individuais

---

## 13. Meus Relatórios — Relatórios Personalizados

**Propósito:** Criar, salvar e agendar relatórios personalizados.

### Estado vazio
- "Nenhum relatório salvo ainda. Crie seu primeiro relatório personalizado."
- Botão: **+ Novo relatório**

### Formulário "Novo relatório" (modal/página)

**Seção 1 — Identificação**
- Nome (ex: "Vendas por vendedor")
- Descrição (opcional)

**Seção 2 — Entidade & Filtros**
- Entidade (dropdown — ex: "Vendas")
- Período (dropdown — ex: "Mês atual")
- Filtros: linha de filtro com campos: [campo] [operador] [valor] + botão remover; botão **+ Adicionar filtro**

**Seção 3 — Agrupamento & Métricas**
- Agrupar por (checkboxes):
  - ID | Data da venda | Tipo | Pagamento | Vendedor | Origem | Veículo | Cliente
- Métricas (linhas configuráveis): [Contagem] [ID] [alias — opcional] + botão remover; botão **+ Adicionar métrica**

**Seção 4 — Visualização & Agendamento**
- Visualização (dropdown — ex: "Tabela")
- Agendamento (dropdown — ex: "Não agendar")
- Destinatários (campo de texto — e-mails separados por vírgula)

---

## 14. Funil de Conversão & ROI por Origem

**Propósito:** Relatório mostrando o funil completo: Investimento → Leads → Qualificados → Propostas → Vendas → Receita → Lucro → ROI, agrupado por origem/canal.

### Filtros de período
- De: [data] | Até: [data] (seletores de data)

### Cards de métricas do topo
| KPI | Descrição |
|-----|-----------|
| Investimento | R$ valor |
| Leads | Quantidade (X qualificados) |
| Vendas | Quantidade (X propostas) |
| Receita | R$ (Lucro líquido: R$) |
| ROI Total | Percentual |
| Conversão Leads → Vendas | Percentual |
| Ticket médio | R$ valor |
| CPL médio | R$ valor |

### Seção: Funil por origem
- Gráfico de barras: cada barra mostra investimento (vermelho) vs receita (verde) por canal

### Tabela detalhada
Colunas: Canal | Invest. | Leads | Qualif. | Propostas | Vendas | Receita | Lucro | ROI

---

## 15. Auditoria

**Propósito:** Histórico de ações realizadas no sistema (log de auditoria).

### Filtros de período
- Hoje | 7 dias | **30 dias** (padrão ativo) | Personalizado | Todos

### Filtros adicionais
- **Área do sistema** (dropdown com opções):
  - Todas as áreas ✓
  - Acesso
  - Veículos
  - Vendas
  - Financeiro
  - Fiscal
  - Perfis de Acesso
  - Usuários
  - Membros
- **Tipo de ação** (dropdown — ex: "Todas as ações")
- **Usuário** (campo de busca livre — "Buscar por usuário...")

### Tabela de eventos
Colunas:
- **DATA/HORA**
- **USUÁRIO**
- **O QUE ACONTECEU**

Exemplo de registro: `29/05/2026 14:42 | Marcos leite | Entrou no sistema — Marcos fez login`

Rodapé: indicador de total de eventos ("1-1 de 1 evento")

### Ações adicionais
- Botão de configurações (ícone "..." no topo direito)

---

## 16. Avaliações de Troca

**Propósito:** Registro e gestão de avaliações de veículos recebidos em troca.

### Filtros (visíveis mas com pouca resolução)
- Filtros de status
- Filtros de período
- Filtros adicionais (não legíveis completamente)

### Botão
- **+ Nova avaliação** (ou equivalente)

### Estado vazio
- "Nenhuma avaliação encontrada."

---

## 17. Nova Avaliação de Troca

**Propósito:** Formulário para registrar a avaliação de um veículo trazido pelo cliente para troca.

### Seção: Cliente
- **Cliente cadastrado** — campo de busca: "Buscar Cliente por nome, CPF ou CNPJ..."
- **Nome do cliente (se não cadastrado)** — campo de texto livre

### Seção: Identificação do veículo (campos duplicados — provável para dois veículos: o do cliente e o da loja)
- **Placa** *(obrigatório)*
- **Marca**
- **Modelo** *(obrigatório)*
- **Versão**
- **Ano modelo** *(obrigatório)* — padrão: 2026
- **Ano fab.**
- (bloco repetido para segundo veículo:)
  - Marca
  - Modelo *(obrigatório)*
  - Versão
  - Ano modelo *(obrigatório)* — padrão: 2026
  - Ano fab.
- **Quilometragem**
- **Cor**
- **Combustível** (dropdown — "Selecione")
- **Câmbio** (dropdown — "Selecione")
- **Chassi**
- **Renavam**

### Seção: Valores
- **Cliente pediu** — campo R$ (padrão: R$ 0,00)
- **Loja ofertou** — campo R$ (padrão: R$ 0,00)

### Seção: Observações
- **Condições do veículo (avarias, retrabalhos)** — textarea
- **Observações gerais** — textarea

---

## 18. Indicação de Clientes B2C — Configuração do Programa

**Propósito:** Configurar o programa de indicação que permite a clientes finais indicarem amigos via link único.

### Seção: Programa
- Toggle **Programa ativo** (on/off)
- **Tipo de recompensa** (dropdown — ex: "Valor fixo (R$)")
- **Valor da recompensa** — campo numérico (em reais)
- **Elegibilidade do indicador (meses desde a última compra)** — campo numérico (0 = qualquer cliente; ex: 24 = só quem comprou nos últimos 24 meses)
- **Mensagem padrão de WhatsApp** — textarea com template editável (ex: "Olá! Acabei de comprar meu carro nesta loja e recomendo muito. Acesse {{link}} e fale com eles, é só dizer que foi indicação minha!")

### Seção: Convite pós-venda (opcional)
- Toggle **Enviar convite após a venda** (on/off)
- **Quantos dias após a venda** — campo numérico (padrão: 15)

---

## 19. Indicações de Clientes — Lista

**Propósito:** Exibir as indicações geradas por clientes finais (B2C).

### Botão
- **Exportar CSV**

### Filtros
- Dropdown **Todos os status**
- Dropdown (não legível — provavelmente por período ou canal)
- Dropdown (não legível)
- Campo de busca: "Buscar por nome, telefone ou código..."

### Estado vazio
- "Nenhuma indicação encontrada."
- Link: **Configurar programa**

---

## 20. Veículos — Estoque (Lista)

**Propósito:** Cadastro e gestão do estoque de veículos.

### Botões principais
- **Giro & Encalhados** (ícone de gráfico)
- **+ Novo Veículo**

### Filtros
- Campo de busca: "Buscar por placa ou modelo..."
- Dropdown **Todos os status**:
  - Todos os status ✓
  - Em Estoque
  - Reservado
  - Vendido
- Dropdown **Todas as origens**:
  - Todas as origens ✓
  - Particular
  - Troca
  - Locadora
  - Leilão (Pequena Monta)
  - Leilão (Média Monta)
  - Leilão (Financeira)
  - Frota
  - Repasse

### Estado vazio
- "Nenhum veículo encontrado. Comece adicionando o primeiro veículo ao estoque."
- Botão: **+ Adicionar Veículo**

---

## 21. Novo Veículo — Formulário de Cadastro

**Propósito:** Adicionar um novo veículo ao estoque.

### Seção: Informações Básicas
- **Placa** — ex: ABC-1234
- **Marca** *(obrigatório)* — ex: Fiat, Toyota, Volkswagen
- **Modelo** *(obrigatório)* — ex: El, Civic, 2.0 EXS
- **Versão** — ex: XL, GT, Sport, Touring, LTZ
- **Categoria** (dropdown — ex: "Selecione a categoria")
- **Tipo de Veículo** (dropdown — ex: "Veículos e tipo")
- **Ano do Modelo** *(obrigatório)* — campo numérico
- **Ano de Fabricação** — ex: 2020
- **Quilometragem** *(obrigatório)* — campo numérico + botão de IA (sugestão automática)
- **Chassi** (opcional) — número do chassi
- **Blindagem** (opcional) — RENAVAM do veículo

### Seção: Especificações Técnicas
- **Combustível** *(obrigatório)* (dropdown — ex: "Selecione a combustível")
- **Câmbio** *(obrigatório)* (dropdown — ex: "Selecione o câmbio")
- **Direção** (dropdown — ex: "Selecione a direção")
- **Cor** — ex: Prata, Prata, Branco
- **MOTORIZAÇÃO** — ex: 1.0, 1.6 Turbo, V8
- **Potência do Motor** — ex: 8.0 Flex / 2.0 WV
- **Portas** (dropdown — ex: "2 portas")
- Checkbox: **Possui GNV**

### Seção: Financeiro & Aquisição
- **Status** (dropdown — ex: "Em Estoque")
- **Valor de Compra (R$)** — campo monetário
- **Valor de Venda (R$)** — campo monetário
- **Comissão por Indicação (opcional) (%)** — texto de ajuda: "Ex: R$ 50,00 — automaticamente o valor mínimo da loja"
- **Origem** (dropdown — ex: "Particular")
- **Tipo de Aquisição** (dropdown — ex: "À Vista")
- **Data de Entrada** — campo de data (ex: 25/09/2024)

### Seção: Opcionais do Veículo

**CONFORTO** (checkboxes):
- Ar condicionado
- Ar digital/dual zone
- Banco com memória
- Banco aquecido
- Chave presença/UB
- Banco de couro
- Direção hidráulica
- Partida por botão
- RETROVISOR ELÉTRICO
- Retrovisor elétrico (?)
- Vidro elétrico
- Volante multifuncional

**EXTERIOR** (checkboxes):
- Engate
- Faróis caixa
- Farol automático
- Farol de LED
- Parabrisa aquecido
- Rodas de liga leve
- Sensor de Freio
- Teto panorâmico
- Teto solar

**PERFORMANCE** (checkboxes):
- Câmera CVT
- Câmbio automático
- Partida AWP
- Suspensão esportiva
- Tração 4×4
- Tração AWD
- Turbo

**SEGURANÇA** (checkboxes):
- ABS
- Airbag lateral
- Airbag Frontal
- Airbag traseiro
- Alarme
- Assistência de saída em rampa
- Câmera de estacionamento lateral
- Controle de tração
- Câmera de ré
- Freio abs de ponto niap
- ISOFIX
- Piloto automático adaptativo
- Sensor de estacionamento dianteiro
- Sensor de estacionamento traseiro
- Trava elétrica

**TECNOLOGIA** (checkboxes):
- Android Auto
- Apple CarPlay
- Bluetooth
- Carregador por indução
- Central multimídia
- Entrada USB
- GPS
- Head up Display
- Painel digital
- Som premium

### Botão
- **Salvar Veículo**

---

## 22. Giro & Encalhados

**Propósito:** Acompanhar a idade do estoque e remarcar veículos parados. Subpágina acessada via botão "Giro & Encalhados" na tela de Veículos.

### Botão
- **Regras de remarcação**

### Cards de métricas
| KPI | Descrição |
|-----|-----------|
| Estoque ativo | Quantidade total de veículos em estoque |
| Idade média | Média em dias |
| Giro médio (50d) | Percentual de vendas |
| Encalhados (> 90d) | Quantidade de veículos parados há mais de 90 dias |

### Seção: Sugestões automáticas de remarcação
- Status: "desativadas" (com link para ativar em Configurações → Giro & Remarcação)

### Seção: Sugestões adiadas
- Lista de veículos com sugestão de remarcação adiada

### Seção: Distribuição por faixa (4 cards coloridos)
- **Verde (0-30d)** — quantidade
- **Amarelo (31-90d)** — quantidade (laranja no display)
- **Laranja (91-90d)** — quantidade
- **Encalhado (> 90d)** — quantidade (vermelho no display)

### Seção: Veículos no estoque
- Filtro dropdown **Todas as faixas**
- Tabela de veículos com sua faixa de idade

---

## 23. Sugestão de Remarcação por Giro — Configuração

**Propósito:** Configurar as regras automáticas de remarcação de preço conforme tempo de estoque.

### Seção: Regras de Remarcação
- Toggle para ativar/desativar sugestões automáticas

### Campos de configuração de faixas
- **Faixa Amarela** — campo de dias de início e fim
- **Faixa Laranja** — campo de dias de início e fim
- **Percentual de desconto** (campo numérico por faixa)
- **Tipo de desconto sugerido** (dropdown — tipo de ajuste: percentual fixo, por tabela FIPE, etc.)

### Botão
- **Salvar**

### Seção: E-mail mensal de remarcação
- Toggle para ativar envio de e-mail mensal

### Seção: Relatório de remarcação por e-mail
- Toggle para ativar relatório
- **Receber e-mail**
- Campos do e-mail (cabeçalho, título, assunto, corpo — parcialmente visíveis)

### Botão
- **Salvar GIR** (Salvar GIR/Configuração)

---

## 24. Documentação — Checklists

**Propósito:** Checklists de entrada e saída por veículo (documentos necessários na compra e na venda).

### Filtros
- Dropdown de status: **Pendentes**
- Dropdown de urgência: **Mais urgentes**
- Dropdown de responsáveis: **Todos responsáveis**
- Seletor de período: **Qualquer período**
- Toggle: **Somente vencidos**

### Abas
- **Entrada** | **Saída** | **Todos**

### Estado vazio
- "0 checklists encontrados"
- "Nenhum checklist pendente"

### Botão
- **Templates** (filtro para modelos de checklist)

---

## 25. Templates de Documentação

**Propósito:** Gerenciar modelos de checklist de entrada e saída de veículos.

### Botões
- **Restaurar padrões**
- **+ Novo template**

### Padrões automáticos (pré-configurados pelo sistema)

**Entrada (Compra)** — 8 itens:
1. Receber documento do veículo (CRV/CRLV)
2. Solicitar documentos do vendedor (RG/CPF)
3. Verificar multas e débitos (DETRAN)
4. Verificar KM no painel
5. Vistoria do carro
6. Fazer ATPVE completo
7. Reconhecimento de firma
8. Pagamento realizado ao vendedor

**Saída (Venda/Transferência)** — 14 itens (continuação visível):
1. Esperando recibo chegar
2. Solicitar todos os documentos do cliente
3. Fazer ATPVE completo
4. Fazer procuração (caso não vá transferir)
5. Vistoria do carro (item 8)
6. Reconhecimento de firma (item 9)
7. Entregar na mão do despachante (item 10)
8. Taxa Detran (item 11)
9. Se financiando, inclusão de gravame (item 12)
10. Pagamento despachante (item 13)
11. Guardar documento novo enviado pelo despachante na nuvem (item 14, parcialmente visível)

### Ações por template
- Ícone de estrela (favoritar/padrão)
- Ícone de edição
- Ícone de exclusão

---

## 26. Procuração

**Propósito:** Gerar procurações para veículos vendidos usando modelo personalizado.

### Estado (sem modelo configurado)
- "Modelo de procuração não configurado. Para gerar procurações, configure seu modelo personalizado com os marcadores {{variável}} da sua loja."
- Botão: **Configurar modelo de procuração**

### Seção: Selecionar Veículo
- Campo de busca: "Filtrar por placa, marca ou modelo..."
- Dropdown: "— Selecione um veículo —"

### Estado vazio
- "Nenhum veículo cadastrado. Adicione veículos ao estoque primeiro."

---

## 27. Gerar Documentos de Venda

**Propósito:** Geração de documentos relacionados à venda (contrato, recibo, etc.) a partir de um modelo configurado.

### Fluxo
1. Selecionar veículo de destino
2. Configurar parâmetros do documento (modelo personalizado com marcadores {{variável}})
3. Gerar documento

*(tela com baixa resolução — detalhes parcialmente visíveis)*

---

## 28. Assinatura Digital

**Propósito:** Gestão de assinaturas digitais de documentos.

*(tela com baixa resolução — seção de configuração/autenticação visível, sem campos legíveis)*

---

## 29. Configurações de Empresa

**Propósito:** Dados cadastrais da empresa exibidos na loja/sistema.

### Seção: Dados da Empresa
- **Nome da empresa** — campo de texto
- **CNPJ** — campo de texto (formato: XX.XXX.XXX/XXXX-XX)
- **Telefone** — campo de texto
- **E-mail** — campo de texto
- **Site** (opcional)
- **CEP** — campo de texto (formato: 00000-000)
- **Logradouro** — campo de texto
- **Número** — campo de texto
- **Complemento** — campo de texto
- **Bairro** — campo de texto
- **Cidade** — campo de texto
- **Estado** (dropdown — UF)

### Botão
- **Salvar Dados**

### Seção: Modelos de documento
- **Formato de documento** (abas — ex: Formato de entrada / Formato de saída / etc.)
- Configuração de templates de documentos para impressão

*(resolução baixa — demais campos não legíveis completamente)*

---

## 30. Usuários da Loja

**Propósito:** Gerenciar quem tem acesso ao sistema.

### Botões
- **Criar usuário**
- **Convidar via link**

### Seção: Membros
- Lista de membros ativos com:
  - Avatar/inicial
  - Nome
  - E-mail
  - Role/perfil (ex: "Proprietário")
  - Ícone de chave (permissões)

### Seção: Convites pendentes
- Exibe convites enviados e não aceitos
- Nota: "Links de convite ativo expiram após 7 dias."

---

## 31. Perfis de Acesso

**Propósito:** Gerenciar os perfis padrão da loja e suas permissões.

### Botão
- **+ Novo perfil**

### Perfis padrão (4 pré-configurados)
| Perfil | Membros |
|--------|---------|
| Operacional | 0 membros |
| Vendedor | 0 membros |
| Financeiro | 0 membros |
| Gerente | 0 membros |

### Ações por perfil
- Ícone de configuração de permissões
- Ícone de exclusão

---

## 32. Google Reviews na Vitrine

**Propósito:** Conectar o perfil do Google Business para exibir nota e avaliações reais na vitrine pública.

### Aviso
- Alerta de "Chave da Google Places API ausente" com instrução para adicionar variável `GOOGLE_PLACES_API_KEY` nos Secrets do projeto.

### Seção: Configurar Place ID
- **Place ID da loja no Google** — campo de texto (ex: ChIJ....)
- Botões: **Buscar dados** | **Salvar**
- Link externo: developers.google.com/maps/place-id

### Seção: Configuração atual
- Exibe Place ID configurado (ou "Nenhum Place ID configurado.")
- Nota: "A sincronização automática roda diariamente às 04:00 (horário de Brasília)."

---

## 33. Configurações da Vitrine

**Propósito:** Editar as informações exibidas na vitrine pública da loja (site público do Checkered).

### Seção: Identidade Visual
- **Logo atual da sua loja** — preview da imagem + botões: **Trocar logo** | **Remover**
- Dimensão recomendada: PNG ou JPG — máx. 5 MB

### Seção: Contato (aparece duas vezes na tela — possível scroll)
- **WhatsApp** — campo no formato internacional sem espaços (ex: 5579999999999)
- **Telefone** (opcional) — campo de texto

### Seção: Localização
- **Cidade** — campo de texto (ex: Aracaju)
- **Estado** — dropdown (ex: UF)
- **CEP** (opcional) — campo de texto (ex: 49000-000)
- **Logradouro** — campo de texto (ex: Av. Principal)
- **Número** — campo de texto (ex: 123)
- **Bairro** (opcional) — campo de texto (ex: Centro)

### Seção: Super Vitrine
- Toggle **Ativo** — "Seus veículos aparecem no Super Vitrine"
- Link: "Acesse a Super Vitrine pública" → Ver Super Vitrine

### Seção: Indicações Recebidas
- Configure quais fontes de indicação a loja aceita e o valor mínimo de comissão por venda concluída.
- **Entre Loja (B2B):** toggle "Aceitando Indicações — Outras lojas podem indicar clientes para seus veículos"
- **Da Plataforma (Checkered):** toggle "Aceitando Indicações — A Checkered pode indicar clientes para seus veículos"
- **Comissão mínima por indicação concluída** — campo R$ (ex: R$ 500,00)
- Nota: "Lançado automaticamente como despesa da venda ao registrar a venda. Valor mínimo: R$ 50."
- Botão: **Salvar configurações de indicações**

### Seção: Alertas de Estoque
- Define quantos dias um veículo pode ficar parado em cada faixa antes de mudar de status:
  - **Venda (Vd)** — campo em dias (ex: 30)
  - **Amarelo (Am)** — campo em dias (ex: 60)
  - **Laranja (Lj)** — campo em dias (ex: 90)
- Nota: "Antes do limite, tenta o voto do mercado como **Encalhado**."
- Botão: **Salvar alertas de estoque**

### Seção: Galeria — Conheça Nossa Loja
- Grade de 6 fotos (Foto 1 a Foto 6) com opção de upload
- Nota: "Tamanho máximo para cada arquivo: (X) MBs. Tamanho máximo: (X) MBs."

---

## 34. Configurações Fiscais

**Propósito:** Dados tributários da empresa para emissão de Notas Fiscais.

### Aviso
- "CNPJ não preenchido. A emissão de Notas Fiscais ficará bloqueada até que o CNPJ seja informado."

### Seção: Dados Fiscais
- **CNPJ** *(obrigatório)* — campo: 00.000.000/0000-00
- **Razão Social** — campo de texto
- **Inscrição Estadual** — campo: IE
- **Inscrição Municipal** — campo: IM
- **Regime Tributário** (dropdown — ex: "Não informado")

### Seção: Endereço
- **Logradouro** — ex: Rua, Av., etc.
- **Número** — campo: Nº
- **Complemento** — ex: Apto, sala, bloco...
- **Bairro** — campo
- **Cidade** — campo
- **Estado** (dropdown — UF)
- **CEP** — formato: 00000-000

### Botão
- **Salvar configurações**

### Seção: Certificado Digital A1
- **Arquivo .pfx ou .p12** (upload)
- **Enviar certificado**: botão **Escolher arquivo** | "Nenhum arquivo escolhido"
- **Senha do certificado** — campo de texto (com toggle mostrar/ocultar)
- Botão: **Enviar certificado**

### Seção: Integração NFe.io
- Status: "Indisponível"
- Aviso: "Nenhum token NFe.io disponível. Cadastre um token próprio abaixo ou contate o suporte Checkered para habilitar o token global da plataforma."
- Status da conexão:
  - Conexão com NFe.io
  - Empresa vinculada à NFe.io
  - Certificado digital A1 válido
- Botões: **Sincronizar empresa** | **Reenviar certificado**

### Seção: Token NFe.io próprio (white-label)
- **Cole aqui o token da sua conta NFe.io** — campo de texto (com toggle mostrar/ocultar)
- Botão: **Salvar token próprio**

---

## 35. Dados de Recebimento — Chaves PIX

**Propósito:** Gerenciar chaves PIX para receber saques de comissões.

### Seção: Chaves PIX Cadastradas
Formulário para adicionar chave:
- **Tipo de chave** (dropdown — ex: "CPF"; opções prováveis: CPF, CNPJ, E-mail, Telefone, Chave aleatória)
- **Chave PIX** — campo de texto
- **Apelido (opcional)** — ex: "Conta principal"
- Botões: **Cancelar** | **Adicionar chave**

---

## 36. Campanhas de Nutrição

**Propósito:** Criar sequências automáticas de mensagens por WhatsApp e e-mail para nutrir leads. Os passos são enviados respeitando a janela de 24h do WhatsApp e o horário comercial (9h–19h, segunda a sábado).

### Botão
- **+ Nova Campanha**

### Estado vazio
- "Nenhuma campanha cadastrada. Clique em 'Nova Campanha' para começar."

---

## 37. Nova Campanha de Nutrição — Formulário

**Propósito:** Configurar uma nova campanha de sequência de mensagens automáticas.

> Variáveis disponíveis no corpo: `{{nome}}`, `{{veiculo}}`, `{{marca}}`, `{{modelo}}`

### Campos principais
- **Nome** — ex: "Pós-cotação SUVs"
- Toggle **Ativa** (on/off)

### Seção: Segmentação
*Leads que atendem a estas regras serão inscritos automaticamente.*
- **Origens (vazio = todas)** — seleção múltipla de tags: Vitrine | Marketplace | Admin | WhatsApp
- **Possui veículo de interesse?** (dropdown — ex: "Tanto faz")
- **Marcas (separadas por vírgula)** — campo de texto livre (ex: Toyota, Honda)
- **Mensagem do lead contém** — campo de texto (opcional, ex: "financiamento")

### Seção: Passos da sequência
*D+N conta a partir da data de inscrição do lead.*
- Botão **+ Adicionar passo**
- **Passo #1** (expansível):
  - **Dias após inscrição** — campo numérico (ex: 1)
  - **Canal** (dropdown — ex: "WhatsApp")
  - **Template aprovado (para mandar convenio fora da janela de 24h)** — dropdown
  - **Template aprovado (dentro da janela de 24h)** — campo/dropdown separado
  - **Conteúdo** — textarea com o corpo da mensagem (ex: "Olá {{nome}}! Tudo bem?")
- Botões: **Cancelar** | **Salvar**

---

## 38. Configurações — Pós-venda (Geral)

**Propósito:** Configurações gerais da automação de pós-venda (lembretes de revisão, IPVA, financiamento).

### Seção: Pós-venda geral
- Toggle **Ativar pós-venda**
- Toggle **Notificação por WhatsApp**
- Toggle **Notificação por e-mail**

### Configurações de intervalo de lembretes
- **Intervalo de revisão** — campo numérico (meses)
- **Intervalo de IPVA** — campo numérico (meses)
- Outros campos de intervalo (não legíveis completamente)

### Seção: Modelos de mensagem
- Campos de template para WhatsApp e e-mail (não legíveis completamente)

*(resolução baixa — detalhes parcialmente visíveis)*

---

## 39. NPS Pós-venda — Configuração

**Propósito:** Configurar o envio automático de pesquisa NPS após cada venda.

### Seção: Status
- Toggle **Ativar NPS automático** — "Quando ativado, novas vendas elegíveis serão pesquisadas automaticamente no dia configurado."

### Seção: Quando enviar
- **Dias após a venda** — campo numérico (formato D+X; padrão: 30; nota: "Padrão recomendado: D+30 da venda.")
- **Canal preferido** (dropdown — ex: "WhatsApp + e-mail...")

### Seção: Pergunta
*Personalize a pergunta principal e o comentário opcional. Deixe em branco para usar o padrão NPS clássico.*
- **Pergunta principal (0-10)** — textarea (padrão: "De 0 a 10, qual a chance de você indicar nossa loja a um amigo?")
- **Pergunta de comentário (opcional)** — textarea (padrão: "O que mais pesou na sua decisão? (opcional)")

---

## 40. Metas de Vendas — Configuração

**Propósito:** Configurar metas mensais de vendas para o time.

### Seção: Metas gerais
- Toggle **Ativar metas**
- **Meta do mês** — campo numérico
- Toggle **Notificação por WhatsApp quando meta atingida**

### Seção: Metas por vendedor
- Campos para configurar meta individual por vendedor (não legíveis completamente)

### Configurações de display
- **Mostrar ranking de vendas** — toggle
- Outras opções (não legíveis)

### Seção: Formatos de alerta
*(não legível completamente)*

*(resolução baixa — página completa não totalmente legível)*

---

## 41. Auto-atribuição de Leads

**Propósito:** Distribuir automaticamente os novos leads entre os vendedores ativos.

### Seção: Configuração geral
- Texto: "Quando ativa, todo novo lead recebido (vitrine ou indicação aprovada) é atribuído automaticamente a um vendedor elegível."
- Toggle **Auto-atribuição** — "Quando ativo, novos leads são atribuídos sem ação manual."

### Seção: Modo de distribuição (radio buttons)
- **Rodízio (round-robin)** *(selecionado por padrão)* — "Distribui leads em sequência entre todos os vendedores elegíveis."
- **Carga balanceada** — "Atribui ao vendedor com menos leads em aberto no momento."
- **Aleatório** — "Sorteia um vendedor entre os elegíveis a cada novo lead."

### Seção: SLA de primeiro contato (minutos)
- Texto: "Tempo máximo para o vendedor atribuído entrar em contato. Os leads próximos do prazo aparecem em amarelo e os vencidos em vermelho."
- Campo numérico (padrão: 60 minutos)

### Seção: Vendedores elegíveis
- Checkbox: **Todos os vendedores ativos**

### Seção: Notificar o vendedor atribuído
- Toggle **Por e-mail**

---

## 42. Filiais (Unidades)

**Propósito:** Cadastrar as unidades físicas da loja. Veículos, vendas, leads e despesas podem ser segmentados por filial; usuários podem ter acesso restrito a uma ou mais unidades.

### Botão
- **+ Nova filial**

### Lista de filiais
- Cada filial exibe: nome | tipo (ex: Matriz) | endereço (ou "Sem endereço cadastrado")
- Ícone de edição por filial

### Exemplo visível
- **Matriz** — Matriz — Sem endereço cadastrado

---

## 43. Recondicionamento & Margem

**Propósito:** Catálogo de itens de custo de recondicionamento e configuração de margem alvo usada nas avaliações de troca.

### Seção: Margem alvo
- Texto: "Margem desejada sobre o preço de venda final. Usada para sugerir o valor a oferecer pelo veículo recebido."
- **Margem (%)** — campo numérico (padrão: 15)
- Botão: **Salvar margem**

### Seção: Catálogo de itens de recondicionamento
- Texto: "Estes itens ficam disponíveis para marcação na avaliação de troca. Ao converter em estoque, viram despesas previstas do veículo."
- **Categoria** — campo de texto (ex: "Mecânica")
- **Descrição** — campo de texto (ex: "Troca de pastilhas")
- **Valor padrão** — campo monetário (ex: R$ 0,00)
- Botão: **+ Adicionar**
- Estado vazio: "Nenhum item cadastrado ainda."

---

## 44. Mídia & Investimento

**Propósito:** Cadastrar o investimento mensal por canal de marketing para apurar o ROI no relatório Funil & ROI.

### Seção: Novo lançamento
- Texto: "Cada combinação canal + mês é única — lançamentos novos sobrescrevem o valor anterior."
- Botão: **Importar CSV**
- **Canal** (dropdown — ex: "Meta Ads (Facebook/Instagram)")
- **Mês** (dropdown — ex: "maio de 2026")
- **Valor (R$)** — campo numérico (padrão: 0)
- **Observação** — textarea
- Botão: **Salvar lançamento**

### Seção: Histórico
- Investimentos cadastrados
- Filtro: **Filtrar mês** (dropdown)
- Estado vazio: "Nenhum investimento cadastrado."

### Seção: Alertas de ROI
- Texto: "Notificação diária quando o ROI por canal estiver abaixo do limite definido."
- Toggle **Alertas ativados**
- **Limite ROI (%)** — campo numérico (padrão: 50)
- **Janela (dias)** — campo numérico (padrão: 30)
- **Investimento mínimo (R$)** — campo numérico (padrão: 100)
- **Canais de notificação** — "Quem recebe: usuários da loja com permissão `mídia_manage` (proprietários sempre incluídos)."
  - Toggle **Enviar por e-mail** (ativo)
  - Toggle **Enviar por WhatsApp** (inativo)

---

## 45. Conformidade LGPD

**Propósito:** Gerenciar solicitações de titulares de dados, política de privacidade e registro de consentimentos.

### Abas
- **Solicitações** | **Política de Privacidade**

### Aba: Solicitações
- Prazo legal de atendimento: **15 dias (art. 19 LGPD)**
- Botão: **+ Nova solicitação manual**
- Estado vazio: "Nenhuma solicitação registrada."
- Botão externo: **Ver política pública**

### Modal: Nova solicitação LGPD
- **Tipo** — botões de seleção: **Exportação** | **Exclusão**
- **E-mail do solicitante** *(obrigatório)*
- **Nome**
- **CPF**
- **Notas** — textarea
- Botões: **Cancelar** | **Registrar**

---

## 46. Contas Bancárias — Open Finance / Pluggy

**Propósito:** Conectar contas bancárias via Open Finance (Pluggy) para conciliar o extrato com os lançamentos do sistema.

### Seção: Conectar nova conta
- Botão: **Conectar conta** — "Clique em Conectar conta para abrir o widget Pluggy Connect e autorizar o acesso ao seu banco. O ItemId é obtido automaticamente após a autenticação."

### Modo sandbox (visível quando Pluggy não está configurado)
- **Item ID** — campo de texto (ex: abc123-...)
- **Banco** — campo de texto (ex: Itaú)
- **Conta** — dropdown (ex: Conta corrente)
- Botão: **Conectar (sandbox)**

### Seção: Conexões ativas
- Lista de contas bancárias conectadas
- Estado vazio: "Nenhuma conta bancária conectada ainda."

---

## 47. Integrações com Marketplaces

**Propósito:** Conectar o estoque a portais de anúncio de veículos.

### Marketplaces listados (parcialmente visíveis, baixa resolução):
- OLX
- Webmotors
- iCarros
- Mercado Livre
- MeuCarroNovo (estimado)
- (outros)

Cada item exibe:
- Nome do marketplace
- Status (ex: "Desconectado")
- Link de acesso à integração
- URL de webhook

*(resolução muito baixa — detalhes não completamente legíveis)*

---

## 48. Assinatura Digital — Autentique

**Propósito:** Configurar integração com o serviço de assinatura digital Autentique.

### Campos visíveis
- **Autenticação** — campo de API token
- **Ambiente** (radio/dropdown) — Produção / Sandbox

*(resolução baixa — detalhes parcialmente visíveis)*

---

## 49. Minha Assinatura — Plano

**Propósito:** Exibir o plano atual do cliente no Checkered e data de renovação.

### Campos exibidos
- **Plano** — ex: "Plano Básico"
- **Período** — ex: "Mensal" / "Anual"
- **Data de renovação** — ex: 04/06/2026
- **Valor** — R$ (não legível completamente)

### Seção: Cobranças de Bônus (visível parcialmente)
- Histórico de cobranças adicionais

---

## Notas sobre Regras de Negócio Notáveis

### Cálculo de Margem / Valor de Oferta na Troca
- O campo **Margem alvo (%)** em Recondicionamento & Margem é usado para sugerir automaticamente o valor máximo a oferecer pelo veículo em troca, descontando o custo de recondicionamento previsto.

### Giro & Encalhados — Faixas de Cor
- **Verde** (0–30 dias): veículo em giro saudável
- **Amarelo** (31–90 dias): atenção
- **Laranja** (91–90 dias): alerta de encalhamento
- **Encalhado** (> 90 dias): venda bloqueada/sugestão automática de remarcação

### SLA de Leads
- Configurável em horas; leads próximos do vencimento ficam em amarelo, vencidos em vermelho.
- Relatório de cumprimento: No prazo | Pós-venda | Vencido.

### Automação de Lembretes Pós-venda
- Horário de envio: 9h–19h, segunda a sábado
- Canais: WhatsApp (respeitando janela de 24h; usa template aprovado fora da janela) + e-mail
- Sequências configuráveis por dia (D+N a partir da inscrição do lead)

### NPS — Critério de Promotores/Detratores
- Promotores: notas 9–10
- Detratores: notas 0–6
- Passivos: notas 7–8 (implícito pelo padrão NPS)

### Comissão por Indicação
- Valor mínimo da plataforma: R$ 50,00
- Lançado automaticamente como despesa da venda ao registrá-la
- Indicações B2B (entre lojas) e da plataforma têm toggles separados

### Relatório de Vendas — Métricas calculadas
- Receita Líquida, Lucro Total, Comissão Total e Margem Média são calculados automaticamente a partir das vendas registradas

### Campanha de Nutrição — Variáveis disponíveis
- `{{nome}}`, `{{veiculo}}`, `{{marca}}`, `{{modelo}}`

### Funil & ROI — Fluxo completo
- Investimento → Leads → Qualificados → Propostas → Vendas → Receita → Lucro → ROI
- CPL médio (Custo por Lead) é calculado automaticamente

### Certificado Digital e NFe.io
- O sistema suporta emissão de NF-e via NFe.io com token próprio (white-label) ou token global da plataforma Checkered
- Certificado digital A1 (.pfx ou .p12) é obrigatório para assinar eletronicamente

### Conciliação Bancária
- Integração via Open Finance (Pluggy) — autorização OAuth no banco
- Match automático de transações do extrato com lançamentos do sistema

### Super Vitrine
- Catálogo público compartilhado entre todas as lojas parceiras Checkered
- Toggle individual por loja para participar ou não
