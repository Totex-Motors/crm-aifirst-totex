-- =====================================================
-- Grupo Cardoso — Configuracao 1/4: Pipelines + Estagios
-- =====================================================

DO $$
DECLARE
  v_pv_id uuid := gen_random_uuid();
  v_pp_id uuid := gen_random_uuid();
BEGIN

-- 1) PIPELINE: Cardoso Veiculos (populares/medios, ticket ~85k, 0KM popular)
INSERT INTO sales_pipelines (id, name, description, position, is_default, is_active)
VALUES (v_pv_id, 'Cardoso Veiculos', 'Seminovos populares/medios e linha 0KM popular. Ticket medio R$ 85k.', 1, true, true);

-- Estagios de Veiculos (jornada classica de concessionaria)
INSERT INTO sales_pipeline_stages (pipeline_id, name, position, color, description, is_won, is_lost) VALUES
  (v_pv_id, 'Novo Lead',          1, 'gray',     'Lead acabou de entrar (WhatsApp/site/ads). Aguardando primeira abordagem.', false, false),
  (v_pv_id, 'Tentando Contato',   2, 'yellow',   'SDR tentando contato ativo. Maximo 3 tentativas em 48h.', false, false),
  (v_pv_id, 'Qualificado',        3, 'blue',     'BANT validado: tem perfil, oferta e prazo de compra confirmados.', false, false),
  (v_pv_id, 'Test Drive Agendado',4, 'purple',   'Visita marcada na loja com data/hora confirmadas.', false, false),
  (v_pv_id, 'Test Drive Realizado',5,'indigo',   'Cliente fez test drive. Vendedor tomou conta do atendimento.', false, false),
  (v_pv_id, 'Proposta Enviada',   6, 'orange',   'Proposta formal enviada (carro escolhido + condicoes).', false, false),
  (v_pv_id, 'Em Negociacao',      7, 'amber',    'Cliente em fase de barganha (valor, troca, financiamento).', false, false),
  (v_pv_id, 'Venda Fechada',      8, 'green',    'Contrato assinado e veiculo entregue.', true, false),
  (v_pv_id, 'Perdido',            9, 'red',      'Cliente desistiu, foi pra concorrencia ou nao se qualificou.', false, true);

-- 2) PIPELINE: Cardoso Prime (luxo/premium/blindados/esportivos, ticket alto)
INSERT INTO sales_pipelines (id, name, description, position, is_default, is_active)
VALUES (v_pp_id, 'Cardoso Prime', 'Seminovos premium/luxo/super luxo/blindados/esportivos e 0KM premium. Ticket alto, ciclo maior.', 2, false, true);

-- Estagios de Prime (jornada estendida com pre-qualificacao financeira e visita curatorial)
INSERT INTO sales_pipeline_stages (pipeline_id, name, position, color, description, is_won, is_lost) VALUES
  (v_pp_id, 'Novo Lead',              1,  'gray',     'Lead acabou de entrar. Tratamento premium desde o primeiro contato.', false, false),
  (v_pp_id, 'Pre-Qualificacao',       2,  'slate',    'SDR valida perfil financeiro e seriedade antes de envolver vendedor senior.', false, false),
  (v_pp_id, 'Tentando Contato',       3,  'yellow',   'Sequencia de contato consultivo (WhatsApp + ligacao).', false, false),
  (v_pp_id, 'Qualificado',            4,  'blue',     'BANT premium: ticket compativel, decisor identificado, prazo definido.', false, false),
  (v_pp_id, 'Agendamento Showroom',   5,  'cyan',     'Visita ao showroom marcada com vendedor senior (atendimento exclusivo).', false, false),
  (v_pp_id, 'Visita Showroom',        6,  'teal',     'Cliente conheceu opcoes no showroom (curadoria personalizada).', false, false),
  (v_pp_id, 'Test Drive Agendado',    7,  'purple',   'Test drive de carro especifico marcado.', false, false),
  (v_pp_id, 'Test Drive Realizado',   8,  'indigo',   'Test drive feito, carro de interesse validado.', false, false),
  (v_pp_id, 'Proposta Customizada',   9,  'orange',   'Proposta sob medida (financiamento, seguro, troca, blindagem, acessorios).', false, false),
  (v_pp_id, 'Analise de Credito',     10, 'pink',     'Em analise de financiamento/credito ou alinhando pagamento a vista.', false, false),
  (v_pp_id, 'Negociacao Final',       11, 'amber',    'Ajustes finais antes da assinatura (condicoes, prazo de entrega).', false, false),
  (v_pp_id, 'Venda Fechada',          12, 'green',    'Contrato assinado e veiculo entregue.', true, false),
  (v_pp_id, 'Perdido',                13, 'red',      'Cliente desistiu, foi pra concorrencia, ou credito reprovado.', false, true);

END $$;

-- Retorno pra confirmar
SELECT p.name AS pipeline, p.is_default, COUNT(s.id) AS qtd_estagios
FROM sales_pipelines p
LEFT JOIN sales_pipeline_stages s ON s.pipeline_id = p.id
GROUP BY p.id, p.name, p.is_default
ORDER BY p.position;
