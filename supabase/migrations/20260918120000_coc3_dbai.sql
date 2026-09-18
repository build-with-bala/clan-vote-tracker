-- COC 3.0 includes the DBAI batch. Existing projects apply this before importing.
ALTER TYPE public.batch_type ADD VALUE IF NOT EXISTS 'DBAI';

-- Voter deletion is an authenticated administrator action.
CREATE POLICY "Admins can delete voters"
ON public.voter_registry FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
