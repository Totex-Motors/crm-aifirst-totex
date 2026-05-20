-- =====================================================
-- Grupo Cardoso — Configuracao 3/4: Playbooks/Scripts
-- =====================================================
-- Scripts profissionais de concessionaria, adaptados pra
-- canal digital (WhatsApp) que e o entry point hoje.
-- =====================================================

DELETE FROM sales_playbooks WHERE name LIKE 'Cardoso —%' OR name LIKE 'Cardoso -%';

-- 1) ABERTURA SDR — Primeiro contato no WhatsApp
INSERT INTO sales_playbooks (name, description, steps, is_active) VALUES
('Cardoso - Abertura SDR (Veiculos)',
 'Script de primeiro contato pra leads que chegam via WhatsApp interessados em Veiculos (popular/medio). Foco: humanizar, gerar conexao e agendar visita.',
 '[
   {
     "step": 1,
     "title": "Saudacao personalizada",
     "instruction": "Cumprimente pelo nome. Se vier de campanha, mencione a origem (ex: ''vi que voce viu o anuncio do HB20'').",
     "exemplo": "Oi {{lead.name}}! Aqui e a {{sdr.name}} da Cardoso Veiculos. Vi que voce demonstrou interesse no nosso estoque. Posso te ajudar a achar o carro certo? 🚗"
   },
   {
     "step": 2,
     "title": "Descobrir o modelo de interesse",
     "instruction": "Ja tem um modelo em mente? Se sim, explora detalhes. Se nao, qualifica por uso (cidade, viagem, familia).",
     "exemplo": "Voce ja tem algum modelo em mente, ou ta procurando algo pra um uso especifico? Pra trabalho, familia, primeiro carro?"
   },
   {
     "step": 3,
     "title": "Sondar urgencia e prazo",
     "instruction": "Pergunta natural sobre quando pretende comprar (essa semana, mes, ate quando?).",
     "exemplo": "Show. E pra quando voce ta pensando em ter o carro novo? Essa semana ou e mais pra frente?"
   },
   {
     "step": 4,
     "title": "Validar perfil financeiro (sem ser invasivo)",
     "instruction": "Pergunta indireta: ''voce ja tem um carro pra trocar?'' ou ''pensa em entrada + financiamento ou a vista?''. Nunca pergunta renda direta.",
     "exemplo": "Voce ja tem um carro de troca, ou pensa em entrada + financiamento? Pra eu te mostrar opcoes que fazem sentido."
   },
   {
     "step": 5,
     "title": "Agendar visita / test drive",
     "instruction": "Com BANT minimo (modelo + prazo + perfil financeiro), agenda visita. Oferece 2 horarios proximos (ancoragem).",
     "exemplo": "Show, {{lead.name}}, faz o seguinte: tenho amanha as 10h ou na sexta as 15h pra voce vir conhecer ao vivo e fazer um test drive. Qual fica melhor?"
   },
   {
     "step": 6,
     "title": "Se nao agendou — proximo contato",
     "instruction": "Se cliente nao tem prazo definido, cadastra cadencia de 3 contatos em 7 dias (D+2, D+5, D+7).",
     "exemplo": "Tranquilo! Vou te mandar 2-3 opcoes que combinam com o que voce falou. Qualquer duvida me chama, ta?"
   }
 ]'::jsonb,
 true),

-- 2) ABERTURA SDR PRIME — Tom consultivo, foco em conexao premium
('Cardoso - Abertura SDR (Prime)',
 'Script de primeiro contato pra leads de Cardoso Prime (luxo/premium). Tom consultivo, sem pressao, focado em conexao de longo prazo. Maior cuidado com qualificacao financeira antes de envolver vendedor senior.',
 '[
   {
     "step": 1,
     "title": "Saudacao consultiva",
     "instruction": "Cumprimente formal pelo nome. Posiciona Cardoso Prime como referencia em alto padrao. Nunca usa emoji excessivo.",
     "exemplo": "Boa tarde, {{lead.name}}. Aqui e {{sdr.name}} da Cardoso Prime. Vi seu interesse em nosso portfolio. Em que posso te ajudar?"
   },
   {
     "step": 2,
     "title": "Mapear interesse e perfil",
     "instruction": "Pergunta aberta sobre o tipo de veiculo (premium/luxo/super luxo/blindado/esportivo). Identifica se e troca, complementacao de garagem, primeiro carro premium.",
     "exemplo": "Voce ja tem um modelo em mente ou ta avaliando opcoes? E pra uso pessoal, executivo, ou um segundo carro pra garagem?"
   },
   {
     "step": 3,
     "title": "Validacao financeira indireta",
     "instruction": "Pergunta indireta sobre forma de pagamento. ''A vista ou financiamento?'' E o suficiente. Se for financiamento, valida banco/instituicao pra acelerar credito.",
     "exemplo": "Pra ja te direcionar ao melhor atendimento: voce pensa em a vista, financiamento ou consorcio? Trabalha com algum banco especifico?"
   },
   {
     "step": 4,
     "title": "Repassar pra vendedor senior",
     "instruction": "Apos pre-qualificacao, encaminha pro vendedor Prime designado e agenda visita curatorial no showroom. NAO tenta vender — apenas conecta.",
     "exemplo": "Otimo, {{lead.name}}. Vou te conectar com o {{vendedor.name}}, especialista em {{produto.categoria}}, que vai te receber pessoalmente. Posso agendar uma visita exclusiva ao showroom amanha as 16h ou sexta as 11h?"
   }
 ]'::jsonb,
 true),

-- 3) QUALIFICACAO BANT (Cars)
('Cardoso - Qualificacao BANT Automotiva',
 'Framework de qualificacao adaptado pra venda de carros. Aplicar em ambas marcas (Veiculos e Prime) durante primeira conversa.',
 '[
   {
     "step": 1,
     "title": "B - Budget (perfil financeiro)",
     "instruction": "Descobrir forma de pagamento (a vista, financiamento, consorcio, troca). Faixa de entrada que pode dar. Renda comprovada pra credito.",
     "checklist": ["Forma de pagamento", "Valor de entrada disponivel", "Tem carro pra troca?", "Score/restricao? (pergunta indireta)"]
   },
   {
     "step": 2,
     "title": "A - Authority (decisor)",
     "instruction": "O lead e o decisor ou tem influenciador (conjuge, pai/mae, socio)? Importante pra Prime onde decisao costuma envolver familia.",
     "checklist": ["Lead e o decisor?", "Conjuge/familia participa da decisao?", "Pra Prime: tem socio ou contador envolvido?"]
   },
   {
     "step": 3,
     "title": "N - Need (necessidade real)",
     "instruction": "Pra que precisa do carro: uso urbano, viagem, familia, executivo, blindagem por seguranca? Sentimentos por tras (status, conforto, praticidade)?",
     "checklist": ["Uso principal", "Frequencia de uso", "Motivacao emocional (familia/status/trabalho)", "Recursos imprescindiveis (cambio aut, ar dig, blindagem)"]
   },
   {
     "step": 4,
     "title": "T - Timeline (urgencia)",
     "instruction": "Quando pretende efetivar a compra? Distingue ''quero hoje'' de ''to so olhando''. Urgencia define cadencia de followup.",
     "checklist": ["Hoje/esta semana = urgencia alta", "Esse mes = urgencia media", "Daqui 2-3 meses = nutrition", "Sem prazo = newsletter/desqualifica"]
   }
 ]'::jsonb,
 true),

-- 4) AGENDAMENTO DE TEST DRIVE
('Cardoso - Agendamento de Test Drive',
 'Roteiro pra fechar visita/test drive na loja. Usado depois que lead foi qualificado.',
 '[
   {
     "step": 1,
     "title": "Confirma modelo de interesse",
     "instruction": "Reafirma o modelo/categoria que o lead se interessou. Reforce 1 benefício especifico (estoque imediato, condição etc).",
     "exemplo": "{{lead.name}}, separei aqui o {{produto.name}} que voce mencionou. Ja confirmei que ta disponivel pra test drive."
   },
   {
     "step": 2,
     "title": "Oferece 2 horarios (ancoragem)",
     "instruction": "Sempre oferece 2 horarios em momentos distintos. Nunca pergunte ''quando da pra voce'' (gera procrastinacao).",
     "exemplo": "Tenho amanha as 10h ou sexta as 15h. Qual fica melhor pra voce?"
   },
   {
     "step": 3,
     "title": "Confirma endereco e instrucoes",
     "instruction": "Manda endereco da loja, link no Google Maps, e instrucoes (estacionamento, com quem falar).",
     "exemplo": "Perfeito! Te aguardo {{horario}}. Endereco: {{loja.endereco}}. Pode chegar e perguntar pelo {{vendedor.name}}, ja vou te avisar."
   },
   {
     "step": 4,
     "title": "Confirmacao 24h antes",
     "instruction": "D-1 do test drive: mensagem confirmando presenca. Se nao responder em 2h, ligacao.",
     "exemplo": "Oi {{lead.name}}! Confirmando nossa visita amanha as {{horario}}. Posso contar com voce? 👍"
   }
 ]'::jsonb,
 true),

-- 5) CONTORNO DE OBJECOES
('Cardoso - Contorno de Objecoes',
 'Respostas pra objecoes comuns na venda de carros. Use quando lead apresenta resistencia em qualquer etapa.',
 '[
   {
     "objecao": "Tao caro / Achei mais barato em outro lugar",
     "resposta": "Entendo {{lead.name}}. Posso te perguntar: o carro do concorrente tem revisao em dia, IPVA quitado, garantia, e procedencia validada? Aqui na Cardoso, alem do veiculo, voce leva: laudo cautelar, garantia de 3 meses motor/cambio, e troca de oleo na entrega. So pra comparar com o mesmo nivel.",
     "principio": "Reframe valor x preco. Nunca abaixa preco sem antes vender valor."
   },
   {
     "objecao": "Vou pensar / Quero falar com minha esposa primeiro",
     "resposta": "Faz sentido! Sugiro: posso ja deixar o carro reservado por 24h pra voces? Sem compromisso. Assim voce decide com calma e tem certeza que o carro tá esperando.",
     "principio": "Reserva ancora compromisso sem pressao. Gera escassez positiva."
   },
   {
     "objecao": "Meu credito ta complicado / Tenho restricao",
     "resposta": "Tranquilo, isso e mais comum do que voce imagina. Temos 6 bancos parceiros, cada um com perfil diferente. Topa eu fazer uma analise inicial sem afetar seu score? Em 10 min ja te digo o que e possivel.",
     "principio": "Tira a vergonha. Posiciona como consultor financeiro, nao vendedor."
   },
   {
     "objecao": "Vou esperar a fipe / O mercado cair",
     "resposta": "Boa observacao. Mas tem 2 fatores que jogam contra esperar: 1) o carro que voce ta procurando pode sair antes; 2) financiamento ta com taxa boa agora, tende a subir. Se tiver fim de mes (meta), consigo condicao especial pra fechar essa semana. Ja olhou?",
     "principio": "Urgencia genuina sem manipulacao. Mostra custo de oportunidade."
   },
   {
     "objecao": "PRIME: Quero esperar o lancamento novo",
     "resposta": "Faz sentido pensar no lancamento. Mas tem 2 coisas a considerar: 1) lancamentos chegam com agio de 15-25% nos primeiros 6 meses; 2) o {{produto.name}} atual tem desvalorizacao baixissima e voce pega com menos R$ {{economia}}k que o novo. Quer que eu te mostre a comparacao detalhada por escrito?",
     "principio": "Pro publico Prime: dados, nao pressao. Mostra calculo racional."
   }
 ]'::jsonb,
 true),

-- 6) FOLLOWUP DE NO-SHOW
('Cardoso - Followup de No-Show',
 'Sequencia pra reengajar lead que faltou no test drive ou visita agendada. Ativada automaticamente pelo trigger meeting_no_show.',
 '[
   {
     "step": 1,
     "title": "D+0 (mesmo dia, fim do dia)",
     "instruction": "Tom acolhedor, sem cobranca. Reabre porta.",
     "exemplo": "Oi {{lead.name}}! Senti sua falta hoje. Imagino que apareceu algo. Quer remarcar pra essa semana ainda? Tenho amanha as 14h ou sabado as 10h."
   },
   {
     "step": 2,
     "title": "D+2 (dois dias depois)",
     "instruction": "Se nao respondeu D+0, manda uma novidade ou condicao limitada.",
     "exemplo": "{{lead.name}}, fim de mes ta chegando e a gente ta com uma condicao especial pra fechar essa semana no {{produto.name}}. Quer dar uma olhada antes de acabar?"
   },
   {
     "step": 3,
     "title": "D+5 (ultima tentativa)",
     "instruction": "Se ainda nao respondeu, deixa porta aberta sem pressao. Move pra nutrition.",
     "exemplo": "Oi {{lead.name}}, vou parar de te cobrar! Quando quiser conhecer o carro, e so chamar. Boa semana 👍"
   }
 ]'::jsonb,
 true);

-- Confirma
SELECT name, jsonb_array_length(steps) AS qtd_passos
FROM sales_playbooks
WHERE name LIKE 'Cardoso -%'
ORDER BY name;
