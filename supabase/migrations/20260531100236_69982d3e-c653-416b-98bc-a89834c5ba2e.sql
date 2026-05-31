
CREATE TABLE public.resume_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.resume_requests TO anon, authenticated;
GRANT ALL ON public.resume_requests TO service_role;

ALTER TABLE public.resume_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public site) to submit a résumé request
CREATE POLICY "Anyone can submit a resume request"
ON public.resume_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
