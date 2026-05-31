
DROP POLICY IF EXISTS "Anyone can submit a resume request" ON public.resume_requests;
REVOKE INSERT, SELECT ON public.resume_requests FROM anon, authenticated;
