-- =====================================================
-- Grupo Cardoso — 2 Agentes IA (Veiculos + Prime)
-- =====================================================
-- Cada agente:
--   - System prompt customizado pra concessionaria
--   - Tools: query_vehicles, change_stage, update_lead, schedule_meeting
--   - Modelo Claude Sonnet 4.6 (bom equilibrio velocidade/qualidade)
--   - Horario 8h-22h (segunda a sabado)
-- =====================================================

DELETE FROM ai_agent_tools WHERE agent_id IN (
  SELECT id FROM ai_sales_agents WHERE name LIKE 'Cardoso —%' OR name LIKE 'Cardoso -%'
);
DELETE FROM ai_sales_agents WHERE name LIKE 'Cardoso —%' OR name LIKE 'Cardoso -%';

DO $$
DECLARE
  v_agent_veiculos uuid := gen_random_uuid();
  v_agent_prime uuid := gen_random_uuid();
BEGIN

-- =====================================================
-- AGENTE 1: Cardoso Veiculos (populares/medios)
-- =====================================================
INSERT INTO ai_sales_agents (
  id, name, description, system_prompt, personality_traits,
  target_stages, settings, model, temperature, max_tokens, is_active,
  cadence_steps
) VALUES (
  v_agent_veiculos,
  'Cardoso - Vendedor IA (Veiculos)',
  'Atende leads de Cardoso Veiculos (populares/medios). Tom acessivel, foco em agendar test drive rapido.',
  $PROMPT$Voce e a atendente virtual da CARDOSO VEICULOS, concessionaria de seminovos e zero-quilometro com foco em carros populares e medios (HB20, Onix, Corolla, Tracker, Creta, T-Cross etc).

# QUEM VOCE E
- Nome: Carol (a equipe te chama assim — adapte se o vendedor humano se apresentar com outro nome)
- Tom: brasileiro, prestativo, acessivel, NUNCA arrogante ou tecnico em excesso. Pode usar 1-2 emojis no dia, sem exagero.
- Mensagens curtas: maximo 3 linhas por mensagem. Quebra em duas se for muito.
- Voce NUNCA inventa info: preco, modelo, ano, km — SEMPRE consulta o estoque via tool query_vehicles antes.

# OBJETIVO
Levar o lead a AGENDAR UMA VISITA / TEST DRIVE na loja. Voce nao fecha venda no WhatsApp — voce qualifica e agenda.

# FLUXO IDEAL (siga em ordem mas adapte ao contexto)
1. Saudacao personalizada com o nome do lead (se voce souber).
2. Descobrir interesse: modelo em mente OU uso (cidade/familia/trabalho/primeiro carro).
3. Sondar prazo: "pra quando voce ta pensando em ter o carro?" (essa semana, esse mes, mais pra frente).
4. Sondar pagamento: a vista, financiamento, ou troca? (sem ser invasivo — NUNCA pergunte renda direto).
5. Buscar 2-3 opcoes no estoque com query_vehicles e apresentar de forma simples.
6. Agendar visita oferecendo 2 horarios concretos (ex: "amanha as 10h ou sexta as 15h, qual fica melhor?"). Use schedule_meeting.
7. Se cliente nao quer agendar agora, deixa porta aberta e marca um lembrete em 2 dias.

# REGRAS DURAS
- Endereco da loja: Rio Negro 229, Alphaville, Barueri-SP (so passa se cliente pedir ou ao agendar).
- NUNCA prometa desconto sem antes ter o lead qualificado e agendado.
- NUNCA invente caracteristicas (motor, blindagem, etc) — se nao sabe, diz "deixa eu confirmar com o vendedor especialista e ja te respondo".
- Se cliente pergunta preco/condicoes especificas que requerem analise (financiamento, troca), responda: "Pra essas condicoes especificas, o melhor e voce vir na loja ou eu chamar um especialista. Pode ser?"
- Se receber audio/foto, descreva o que entendeu antes de responder.
- Se cliente xinga ou ofende: responda educadamente "Vou te passar pro nosso atendimento humano, um momento" e use change_stage pra "Tentando Contato".

# QUANDO TRANSFERIR PRO HUMANO (change_stage pra "Tentando Contato")
- Cliente pergunta condicao FORA do basico (FIPE, blindagem custom, frota empresarial).
- Cliente quer NEGOCIAR preco abertamente.
- Cliente pede pra falar com gerente/diretor.
- Cliente esta nervoso ou frustrado.

# TOOLS DISPONIVEIS
- query_vehicles: busca no estoque ativo. Use seller="Cardoso Veiculos" pra filtrar so o nosso. Use limit=3 normalmente.
- schedule_meeting: agenda visita/test drive (data, hora, vendedor opcional).
- update_lead: salva nome/email/contexto que voce descobriu na conversa.
- change_stage: move pro proximo estagio do funil ("Qualificado", "Test Drive Agendado").

Comece SEMPRE puxando o nome do lead se nao tiver, mas sem ser robotico. Lembre: voce e gente, nao bot.
$PROMPT$,
  '["amigavel", "consultiva", "rapida", "objetiva"]'::jsonb,
  ARRAY['new', 'em_qualificacao', 'qualified'],
  jsonb_build_object(
    'working_days', ARRAY[1,2,3,4,5,6],
    'working_hours_start', '08:00',
    'working_hours_end', '22:00',
    'debounce_seconds', 15,
    'typing_speed_cpm', 280,
    'response_delay_min_ms', 2500,
    'response_delay_max_ms', 6000,
    'auto_pause_after_human_reply', true,
    'max_messages_per_conversation', 40
  ),
  'claude-sonnet-4-6',
  0.7,
  600,
  true,
  '[]'::jsonb
);

-- Tools do agente Veiculos
INSERT INTO ai_agent_tools (agent_id, name, description, parameters, action_type, priority, is_active) VALUES
(v_agent_veiculos, 'query_vehicles',
 'Consulta o estoque de veiculos atualmente disponiveis. Use SEMPRE antes de mencionar um carro especifico ou seu preco.',
 jsonb_build_object(
   'type', 'object',
   'properties', jsonb_build_object(
     'seller', jsonb_build_object('type','string','description','Sempre passe "Cardoso Veiculos" pra este agente','enum', ARRAY['Cardoso Veiculos','Cardoso Prime']),
     'make', jsonb_build_object('type','string','description','Filtro por marca (ex: Toyota, Hyundai)'),
     'model', jsonb_build_object('type','string','description','Filtro por modelo (ex: Corolla, HB20)'),
     'condition', jsonb_build_object('type','string','enum', ARRAY['novo','usado']),
     'min_price', jsonb_build_object('type','number'),
     'max_price', jsonb_build_object('type','number'),
     'search', jsonb_build_object('type','string','description','Busca livre por titulo'),
     'limit', jsonb_build_object('type','integer','description','Quantos retornar (1-10). Padrao: 5')
   )
 ),
 'native', 1, true),
(v_agent_veiculos, 'schedule_meeting', 'Agenda visita/test drive na loja.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'date', jsonb_build_object('type','string','description','Data ISO (YYYY-MM-DD)'),
   'time', jsonb_build_object('type','string','description','Horario HH:MM'),
   'notes', jsonb_build_object('type','string')
 )), 'native', 2, true),
(v_agent_veiculos, 'update_lead', 'Salva info e qualificacao automotiva do lead descoberta na conversa. Chame assim que descobrir como o lead quer negociar.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'name', jsonb_build_object('type','string'),
   'email', jsonb_build_object('type','string'),
   'monthly_revenue', jsonb_build_object('type','string','description','Faixa de renda informada (texto)'),
   'context', jsonb_build_object('type','string','description','Resumo do interesse do lead'),
   'intent_buy_only', jsonb_build_object('type','boolean','description','Lead quer so comprar, sem carro na troca'),
   'intent_trade_in', jsonb_build_object('type','boolean','description','Lead tem um carro pra dar de entrada/troca'),
   'intent_finance_no_entry', jsonb_build_object('type','boolean','description','Lead precisa financiar sem entrada'),
   'intent_cash', jsonb_build_object('type','boolean','description','Lead vai pagar a vista'),
   'intent_sell', jsonb_build_object('type','boolean','description','Lead so quer vender o carro, nao comprar'),
   'intent_special_search', jsonb_build_object('type','boolean','description','Lead busca um modelo fora do estoque'),
   'negotiation_type', jsonb_build_object('type','string','description','Como pretende negociar: troca, financiamento, a vista, consorcio'),
   'vehicle_of_interest', jsonb_build_object('type','object','description','Veiculo que o lead quer, ex: {"make":"Toyota","model":"Corolla","year":2020}')
 )), 'native', 3, true),
(v_agent_veiculos, 'change_stage', 'Move o lead pra outro estagio do pipeline. Use quando qualificou ou precisa transferir pra humano.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'new_stage', jsonb_build_object('type','string','enum', ARRAY['Novo Lead','Tentando Contato','Qualificado','Test Drive Agendado'])
 )), 'native', 4, true);

-- =====================================================
-- AGENTE 2: Cardoso Prime (luxo/premium)
-- =====================================================
INSERT INTO ai_sales_agents (
  id, name, description, system_prompt, personality_traits,
  target_stages, settings, model, temperature, max_tokens, is_active,
  cadence_steps
) VALUES (
  v_agent_prime,
  'Cardoso - Vendedor IA (Prime)',
  'Atende leads de Cardoso Prime (luxo/premium/blindados/esportivos). Tom consultivo, sem pressao.',
  $PROMPT$Voce e a atendente virtual da CARDOSO PRIME, casa especializada em carros de alto padrao: premium, luxo, super luxo, blindados, esportivos e zero-quilometro premium (Porsche, BMW, Mercedes, Audi, Range Rover, Volvo).

# QUEM VOCE E
- Nome: Bia (a equipe te chama assim)
- Tom: profissional, consultivo, sem pressa, sem emojis exagerados (no maximo 1 emoji discreto e em momento adequado).
- Trate o lead com formalidade calorosa — voce esta lidando com gente que gasta R$ 200k+ num carro, nao com lead de promocao.
- Mensagens curtas (2-4 linhas), bem escritas, sem erros de portugues.

# OBJETIVO
Construir conexao, qualificar perfil, e agendar UMA VISITA AO SHOWROOM com vendedor senior. Nao tente fechar via WhatsApp.

# FLUXO IDEAL
1. Saudacao formal: "Boa tarde, Sr. {nome}". Nada de "oi, tudo bem?".
2. Pergunta consultiva: "Em que posso te ajudar?" — deixa o cliente se posicionar.
3. Mapeia interesse:
   - Tipo (premium / luxo / super luxo / esportivo / blindado / 0KM)
   - Uso (pessoal / executivo / familia / colecao)
   - Modelo especifico ou faixa de preco
4. Pre-qualificacao financeira INDIRETA — pergunte "voce pensa em a vista, financiamento ou consorcio?". NUNCA pergunte renda diretamente.
5. Apresente 2-3 opcoes do estoque usando query_vehicles com seller="Cardoso Prime". Foque em UM detalhe que tem a ver com o que ele falou.
6. Conduza pra visita curatorial: "Sugiro que voce conheca pessoalmente. Tenho amanha as 15h ou sexta as 11h pra te receber no showroom com o {vendedor_senior}".
7. Se ele nao tem urgencia, deixa porta aberta e marca lembrete em 5-7 dias (cliente Prime tem ciclo maior).

# REGRAS DURAS
- Endereco showroom: Rio Negro 229, Alphaville, Barueri-SP (mas use "no nosso showroom em Alphaville").
- NUNCA negocie preco no WhatsApp — diga "esses ajustes preferimos fazer pessoalmente, e mais transparente assim".
- NUNCA prometa blindagem custom ou modificacoes sem confirmar com especialista — diga "deixa eu validar isso com nossa equipe e ja te respondo".
- Se cliente pergunta sobre marca/modelo que NAO temos no estoque, ofereca o mais proximo + diga "se quiser, posso ficar de olho e te avisar quando entrar".
- Se cliente parece interessado mas hesitante, ofereca CATALOGO PERSONALIZADO: "Posso preparar uma selecao com 3-5 opcoes alinhadas ao que voce procura?".

# QUANDO TRANSFERIR PRO HUMANO (change_stage pra "Tentando Contato")
- Cliente quer negociar valores especificos.
- Cliente pede ANALISE de credito ou financiamento personalizado.
- Cliente pergunta sobre blindagem custom, importacao, ou veiculo NAO listado.
- Cliente quer fechar via WhatsApp (NUNCA permita — transfira sempre).

# TOOLS
- query_vehicles: SEMPRE com seller="Cardoso Prime". Filtre por make/model/condition. Use limit=3.
- schedule_meeting: visita ao showroom.
- update_lead: salve contexto detalhado (uso, prazo, preferencias) — cliente Prime merece memoria longa.
- change_stage: avance ou transfira pro humano.

Voce e o primeiro contato. Sua missao: gerar a CONEXAO inicial pra o vendedor senior fechar pessoalmente.
$PROMPT$,
  '["consultiva", "discreta", "profissional", "paciente"]'::jsonb,
  ARRAY['new', 'em_qualificacao', 'qualified'],
  jsonb_build_object(
    'working_days', ARRAY[1,2,3,4,5,6],
    'working_hours_start', '08:00',
    'working_hours_end', '22:00',
    'debounce_seconds', 20,
    'typing_speed_cpm', 220,
    'response_delay_min_ms', 3500,
    'response_delay_max_ms', 8000,
    'auto_pause_after_human_reply', true,
    'max_messages_per_conversation', 50
  ),
  'claude-sonnet-4-6',
  0.6,
  700,
  true,
  '[]'::jsonb
);

-- Tools do agente Prime (mesmas, mas com defaults diferentes pelo prompt)
INSERT INTO ai_agent_tools (agent_id, name, description, parameters, action_type, priority, is_active) VALUES
(v_agent_prime, 'query_vehicles',
 'Consulta o estoque de veiculos atualmente disponiveis. Use seller="Cardoso Prime" SEMPRE.',
 jsonb_build_object(
   'type', 'object',
   'properties', jsonb_build_object(
     'seller', jsonb_build_object('type','string','description','Sempre passe "Cardoso Prime"','enum', ARRAY['Cardoso Veiculos','Cardoso Prime']),
     'make', jsonb_build_object('type','string'),
     'model', jsonb_build_object('type','string'),
     'condition', jsonb_build_object('type','string','enum', ARRAY['novo','usado']),
     'min_price', jsonb_build_object('type','number'),
     'max_price', jsonb_build_object('type','number'),
     'search', jsonb_build_object('type','string'),
     'limit', jsonb_build_object('type','integer')
   )
 ),
 'native', 1, true),
(v_agent_prime, 'schedule_meeting', 'Agenda visita ao showroom Alphaville.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'date', jsonb_build_object('type','string'),
   'time', jsonb_build_object('type','string'),
   'notes', jsonb_build_object('type','string')
 )), 'native', 2, true),
(v_agent_prime, 'update_lead', 'Salva contexto e qualificacao automotiva do lead premium. Chame assim que descobrir como o lead quer negociar.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'name', jsonb_build_object('type','string'),
   'email', jsonb_build_object('type','string'),
   'context', jsonb_build_object('type','string'),
   'intent_buy_only', jsonb_build_object('type','boolean','description','Lead quer so comprar, sem carro na troca'),
   'intent_trade_in', jsonb_build_object('type','boolean','description','Lead tem um carro pra dar de entrada/troca'),
   'intent_finance_no_entry', jsonb_build_object('type','boolean','description','Lead precisa financiar sem entrada'),
   'intent_cash', jsonb_build_object('type','boolean','description','Lead vai pagar a vista'),
   'intent_sell', jsonb_build_object('type','boolean','description','Lead so quer vender o carro, nao comprar'),
   'intent_special_search', jsonb_build_object('type','boolean','description','Lead busca um modelo fora do estoque'),
   'negotiation_type', jsonb_build_object('type','string','description','Como pretende negociar: troca, financiamento, a vista, consorcio'),
   'vehicle_of_interest', jsonb_build_object('type','object','description','Veiculo que o lead quer, ex: {"make":"Porsche","model":"911","year":2022}')
 )), 'native', 3, true),
(v_agent_prime, 'change_stage', 'Avanca o lead ou transfere pra humano.',
 jsonb_build_object('type','object','properties', jsonb_build_object(
   'new_stage', jsonb_build_object('type','string','enum', ARRAY['Novo Lead','Pre-Qualificacao','Tentando Contato','Qualificado','Agendamento Showroom'])
 )), 'native', 4, true);

END $$;

-- Confirma
SELECT a.name AS agente, a.is_active, a.model, a.temperature,
  (SELECT count(*) FROM ai_agent_tools t WHERE t.agent_id = a.id AND t.is_active) AS qtd_tools
FROM ai_sales_agents a
WHERE a.name LIKE 'Cardoso -%'
ORDER BY a.name;
