-- Create visitor_sessions table for real-time tracking
CREATE TABLE public.visitor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  landing_page TEXT,
  current_page TEXT,
  user_id UUID,
  is_active BOOLEAN DEFAULT true,
  page_views INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_views table for detailed analytics
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  time_on_page INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_events table for tracking actions
CREATE TABLE public.site_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admins can view all, public can insert
CREATE POLICY "Admins can manage visitor_sessions" ON public.visitor_sessions
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert visitor_sessions" ON public.visitor_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update their own session" ON public.visitor_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Admins can manage page_views" ON public.page_views
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert page_views" ON public.page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage site_events" ON public.site_events
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert site_events" ON public.site_events
  FOR INSERT WITH CHECK (true);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_events;

-- Create indexes for performance
CREATE INDEX idx_visitor_sessions_active ON public.visitor_sessions(is_active, last_activity);
CREATE INDEX idx_visitor_sessions_created ON public.visitor_sessions(created_at);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_site_events_session ON public.site_events(session_id);
CREATE INDEX idx_site_events_type ON public.site_events(event_type);