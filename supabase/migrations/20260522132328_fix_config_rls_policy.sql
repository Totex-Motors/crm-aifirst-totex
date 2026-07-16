-- Drop the existing policy that depends on is_tenant_admin() (which can fail
-- when the JWT is stale/expired because auth.uid() returns null)
DROP POLICY IF EXISTS config_admin_all ON public.config;

-- Allow any authenticated user to read config
CREATE POLICY config_select ON public.config
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow writes only to team members with role='admin'
-- Uses auth.uid() directly without tenant_id dependency,
-- since the config table itself has no tenant_id column
CREATE POLICY config_admin_write ON public.config
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE auth_user_id = auth.uid()
        AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE auth_user_id = auth.uid()
        AND role = 'admin'
    )
  );
