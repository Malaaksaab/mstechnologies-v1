import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const generateSessionId = () => {
  const stored = sessionStorage.getItem('visitor_session_id');
  if (stored) return stored;
  const newId = `vs_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  sessionStorage.setItem('visitor_session_id', newId);
  return newId;
};

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  
  // Device type
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
    deviceType = /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile';
  }
  
  // Browser
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
  
  // OS
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  return { deviceType, browser, os };
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);
  const pageStartTime = useRef<number>(Date.now());
  const lastPath = useRef<string>('');

  useEffect(() => {
    const initSession = async () => {
      const sessionId = generateSessionId();
      sessionIdRef.current = sessionId;
      
      const { deviceType, browser, os } = getDeviceInfo();
      
      // Check if session exists
      const { data: existingSession } = await supabase
        .from('visitor_sessions')
        .select('id')
        .eq('session_id', sessionId)
        .single();
      
      if (!existingSession) {
        // Create new session
        await supabase.from('visitor_sessions').insert({
          session_id: sessionId,
          user_agent: navigator.userAgent,
          device_type: deviceType,
          browser,
          os,
          referrer: document.referrer || null,
          landing_page: location.pathname,
          current_page: location.pathname,
        });
      }
    };
    
    initSession();
    
    // Update session activity every 30 seconds
    const interval = setInterval(async () => {
      if (sessionIdRef.current) {
        await supabase
          .from('visitor_sessions')
          .update({ 
            last_activity: new Date().toISOString(),
            is_active: true 
          })
          .eq('session_id', sessionIdRef.current);
      }
    }, 30000);
    
    // Mark session as inactive on page unload
    const handleUnload = () => {
      if (sessionIdRef.current) {
        navigator.sendBeacon(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${sessionIdRef.current}`,
          JSON.stringify({ is_active: false })
        );
      }
    };
    
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  useEffect(() => {
    if (!sessionIdRef.current) return;
    
    const trackPageView = async () => {
      // Track time on previous page
      if (lastPath.current && lastPath.current !== location.pathname) {
        const timeOnPage = Math.round((Date.now() - pageStartTime.current) / 1000);
        await supabase.from('page_views').insert({
          session_id: sessionIdRef.current!,
          page_path: lastPath.current,
          page_title: document.title,
          time_on_page: timeOnPage,
        });
      }
      
      // Update current page
      await supabase
        .from('visitor_sessions')
        .update({ 
          current_page: location.pathname,
          page_views: await getPageViewCount(),
          last_activity: new Date().toISOString()
        })
        .eq('session_id', sessionIdRef.current!);
      
      lastPath.current = location.pathname;
      pageStartTime.current = Date.now();
    };
    
    const getPageViewCount = async () => {
      const { count } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', sessionIdRef.current!);
      return (count || 0) + 1;
    };
    
    trackPageView();
  }, [location.pathname]);

  const trackEvent = async (eventType: string, eventData?: Record<string, unknown>) => {
    if (!sessionIdRef.current) return;
    
    await supabase.from('site_events').insert([{
      session_id: sessionIdRef.current,
      event_type: eventType,
      event_data: JSON.parse(JSON.stringify(eventData || {})),
      page_path: location.pathname,
    }]);
  };

  return { trackEvent };
};
