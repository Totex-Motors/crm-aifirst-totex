-- =====================================================
-- Grupo Cardoso — Configuracao 5/X: Time (Admin + placeholders)
-- =====================================================
-- Vincula o usuario logado (marcovend@gmail.com) como ADMIN
-- e cria placeholders pros demais cargos. O cliente preenche
-- nome real + email depois pela UI ou pede pra eu atualizar.
-- =====================================================

-- 1) ADMIN — usuario logado
INSERT INTO team_members (email, name, role, team, auth_user_id, is_active)
VALUES ('marcovend@gmail.com', 'Marcos (Admin)', 'admin', 'gestao',
        '9c31f9d4-03af-449a-9395-6aa182686bc6', true)
ON CONFLICT (email, tenant_id) DO UPDATE SET
  role = 'admin',
  auth_user_id = EXCLUDED.auth_user_id,
  is_active = true;

-- 2) GERENTE GERAL (1 vaga)
INSERT INTO team_members (email, name, role, team, is_active) VALUES
  ('gerente@cardosogrupo.com.br', '[PREENCHER] Gerente Geral', 'admin', 'gestao', true)
ON CONFLICT (email, tenant_id) DO NOTHING;

-- 3) SUPERVISORES (1 por marca)
INSERT INTO team_members (email, name, role, team, is_active) VALUES
  ('supervisor.veiculos@cardosogrupo.com.br', '[PREENCHER] Supervisor Cardoso Veiculos', 'admin', 'comercial', true),
  ('supervisor.prime@cardosogrupo.com.br',    '[PREENCHER] Supervisor Cardoso Prime',    'admin', 'comercial', true)
ON CONFLICT (email, tenant_id) DO NOTHING;

-- 4) SDRs (2 vagas iniciais — escalavel pra 3 facil)
INSERT INTO team_members (email, name, role, team, is_active) VALUES
  ('sdr1@cardosogrupo.com.br', '[PREENCHER] SDR 1', 'sdr', 'comercial', true),
  ('sdr2@cardosogrupo.com.br', '[PREENCHER] SDR 2', 'sdr', 'comercial', true)
ON CONFLICT (email, tenant_id) DO NOTHING;

-- 5) VENDEDORES CARDOSO VEICULOS (4 vagas)
INSERT INTO team_members (email, name, role, team, is_active) VALUES
  ('vendedor.veiculos1@cardosogrupo.com.br', '[PREENCHER] Vendedor Veiculos 1', 'comercial', 'comercial', true),
  ('vendedor.veiculos2@cardosogrupo.com.br', '[PREENCHER] Vendedor Veiculos 2', 'comercial', 'comercial', true),
  ('vendedor.veiculos3@cardosogrupo.com.br', '[PREENCHER] Vendedor Veiculos 3', 'comercial', 'comercial', true),
  ('vendedor.veiculos4@cardosogrupo.com.br', '[PREENCHER] Vendedor Veiculos 4', 'comercial', 'comercial', true)
ON CONFLICT (email, tenant_id) DO NOTHING;

-- 6) VENDEDORES CARDOSO PRIME (4 vagas — total 8 vendedores)
INSERT INTO team_members (email, name, role, team, is_active) VALUES
  ('vendedor.prime1@cardosogrupo.com.br', '[PREENCHER] Vendedor Prime 1', 'closer', 'comercial', true),
  ('vendedor.prime2@cardosogrupo.com.br', '[PREENCHER] Vendedor Prime 2', 'closer', 'comercial', true),
  ('vendedor.prime3@cardosogrupo.com.br', '[PREENCHER] Vendedor Prime 3', 'closer', 'comercial', true),
  ('vendedor.prime4@cardosogrupo.com.br', '[PREENCHER] Vendedor Prime 4', 'closer', 'comercial', true)
ON CONFLICT (email, tenant_id) DO NOTHING;

-- Confirma + totais por cargo
SELECT role, team, COUNT(*) AS qtd
FROM team_members
GROUP BY role, team
ORDER BY role, team;
