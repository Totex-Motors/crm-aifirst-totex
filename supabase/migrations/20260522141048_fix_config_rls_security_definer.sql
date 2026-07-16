-- Helper function that bypasses RLS on team_members (SECURITY DEFINER)
-- Checks if the current auth.uid() has role='admin' in any tenant
CREATE OR REPLACE FUNCTION public.is_any_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.team_members
    WHERE auth_user_id = auth.uid()
      AND role = 'admin'
  )
$$;

-- Rebuild config policies using the new function
DROP POLICY IF EXISTS config_select ON public.config;
DROP POLICY IF EXISTS config_admin_write ON public.config;

CREATE POLICY config_select ON public.config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY config_admin_write ON public.config
  FOR ALL
  TO authenticated
  USING (is_any_admin())
  WITH CHECK (is_any_admin());
