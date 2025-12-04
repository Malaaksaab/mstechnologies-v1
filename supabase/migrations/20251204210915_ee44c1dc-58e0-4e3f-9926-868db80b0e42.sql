-- Create admin access logs table for security monitoring
CREATE TABLE public.admin_access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_access_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Admins can view access logs"
ON public.admin_access_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert logs (needed for login tracking before admin check)
CREATE POLICY "Anyone can insert access logs"
ON public.admin_access_logs
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_admin_access_logs_user_id ON public.admin_access_logs(user_id);
CREATE INDEX idx_admin_access_logs_created_at ON public.admin_access_logs(created_at DESC);