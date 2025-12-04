-- Enable realtime for profiles table
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Enable realtime for user_roles table  
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_roles;

-- Enable realtime for visitor_sessions (if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'visitor_sessions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
  END IF;
END $$;

-- Enable realtime for page_views (if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'page_views'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;
  END IF;
END $$;

-- Enable realtime for site_events (if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'site_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_events;
  END IF;
END $$;