-- =====================================================
-- Grupo Cardoso — Configuracao 2/4: Categorias de Veiculos
-- =====================================================
-- Cada categoria = uma linha de produto. Carros individuais
-- entram depois como "deals" associados a um lead.
-- =====================================================

-- Limpa antes (idempotente)
DELETE FROM products WHERE id LIKE 'cv-%' OR id LIKE 'cp-%';

-- CARDOSO VEICULOS (4 categorias)
INSERT INTO products (id, name, slug, description, category, price, primary_color, is_active, settings) VALUES
  ('cv-popular-seminovo',   'Populares Seminovo',  'cv-popular-seminovo',
   'Hatch e sedan populares seminovos. Linha de entrada (HB20, Onix, Ka, Argo, Mobi).',
   'Cardoso Veiculos', 55000,  '#3B82F6', true, '{"ticket_medio":55000, "ciclo_dias":15}'::jsonb),

  ('cv-medio-seminovo',     'Medios Seminovo',     'cv-medio-seminovo',
   'Sedans medios e SUVs compactos seminovos (Cruze, Corolla, Tracker, T-Cross, Creta).',
   'Cardoso Veiculos', 85000,  '#2563EB', true, '{"ticket_medio":85000, "ciclo_dias":20}'::jsonb),

  ('cv-popular-0km',        'Populares 0KM',       'cv-popular-0km',
   'Linha popular zero-quilometro direto da fabrica (Mobi, Ka, Onix, HB20).',
   'Cardoso Veiculos', 75000,  '#1D4ED8', true, '{"ticket_medio":75000, "ciclo_dias":25}'::jsonb),

  ('cv-medio-0km',          'Medios 0KM',          'cv-medio-0km',
   'Sedans e SUVs medios zero-quilometro (Tracker, T-Cross, Creta, Corolla).',
   'Cardoso Veiculos', 115000, '#1E40AF', true, '{"ticket_medio":115000, "ciclo_dias":30}'::jsonb);

-- CARDOSO PRIME (6 categorias)
INSERT INTO products (id, name, slug, description, category, price, primary_color, is_active, settings) VALUES
  ('cp-premium-seminovo',   'Premium Seminovo',    'cp-premium-seminovo',
   'Premium seminovo (Audi A3/A4, BMW 320i, Mercedes C-Class, Volvo XC40).',
   'Cardoso Prime', 220000,  '#7C3AED', true, '{"ticket_medio":220000, "ciclo_dias":35}'::jsonb),

  ('cp-luxo-seminovo',      'Luxo Seminovo',       'cp-luxo-seminovo',
   'Luxo seminovo (BMW X5/M340i, Mercedes GLC/E-Class, Audi Q5, Range Rover Sport).',
   'Cardoso Prime', 380000,  '#6D28D9', true, '{"ticket_medio":380000, "ciclo_dias":45}'::jsonb),

  ('cp-super-luxo',         'Super Luxo Seminovo', 'cp-super-luxo',
   'Super luxo (Porsche Cayenne/Panamera, Mercedes S/GLE, BMW X7, Range Rover Vogue).',
   'Cardoso Prime', 650000,  '#5B21B6', true, '{"ticket_medio":650000, "ciclo_dias":60}'::jsonb),

  ('cp-esportivo',          'Esportivos Seminovo', 'cp-esportivo',
   'Esportivos seminovos (Porsche 911, BMW M3/M4, Mercedes-AMG, Audi RS).',
   'Cardoso Prime', 580000,  '#4C1D95', true, '{"ticket_medio":580000, "ciclo_dias":55}'::jsonb),

  ('cp-blindado',           'Blindados',           'cp-blindado',
   'Veiculos blindados nivel III ou III-A (factory blindado ou aftermarket certificado).',
   'Cardoso Prime', 480000,  '#7E22CE', true, '{"ticket_medio":480000, "ciclo_dias":50}'::jsonb),

  ('cp-premium-0km',        'Premium 0KM',         'cp-premium-0km',
   'Premium/Luxo zero-quilometro direto da concessionaria oficial.',
   'Cardoso Prime', 420000,  '#8B5CF6', true, '{"ticket_medio":420000, "ciclo_dias":60}'::jsonb);

-- Confirma
SELECT category, COUNT(*) AS qtd, AVG(price)::int AS ticket_medio_categoria
FROM products
WHERE category IN ('Cardoso Veiculos', 'Cardoso Prime')
GROUP BY category
ORDER BY category;
