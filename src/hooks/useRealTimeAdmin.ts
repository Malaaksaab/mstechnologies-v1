import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveUser {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  roles: { role: string }[];
  isOnline: boolean;
  lastSeen: string;
}

export interface TrafficData {
  totalVisitors: number;
  activeNow: number;
  todayVisitors: number;
  weekVisitors: number;
  monthVisitors: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: { path: string; views: number }[];
  topReferrers: { source: string; count: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  browserBreakdown: { browser: string; count: number; percentage: number }[];
  osBreakdown: { os: string; count: number; percentage: number }[];
  hourlyTraffic: { hour: string; visitors: number; pageViews: number }[];
  geographicData: { country: string; visitors: number }[];
}

export const useRealTimeAdmin = () => {
  const [users, setUsers] = useState<LiveUser[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchUsers = useCallback(async () => {
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id, role');

      const { data: sessions } = await supabase
        .from('visitor_sessions')
        .select('user_id, last_activity, is_active')
        .not('user_id', 'is', null);

      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();

      const enrichedUsers: LiveUser[] = (profiles || []).map(profile => {
        const userRoles = (roles || []).filter(r => r.user_id === profile.user_id);
        const userSession = (sessions || []).find(s => s.user_id === profile.user_id);
        const isOnline = userSession ? 
          new Date(userSession.last_activity) >= new Date(twoMinutesAgo) && userSession.is_active : 
          false;

        return {
          ...profile,
          roles: userRoles,
          isOnline,
          lastSeen: userSession?.last_activity || profile.updated_at || profile.created_at,
        };
      });

      setUsers(enrichedUsers);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  const fetchTrafficData = useCallback(async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();

      // Parallel fetch
      const [
        { count: totalVisitors },
        { data: activeSessions },
        { count: todayCount },
        { count: weekCount },
        { count: monthCount },
        { count: totalPageViews },
        { data: allSessions },
        { data: pageViewsData },
      ] = await Promise.all([
        supabase.from('visitor_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('visitor_sessions').select('*').gte('last_activity', twoMinutesAgo),
        supabase.from('visitor_sessions').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
        supabase.from('visitor_sessions').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
        supabase.from('visitor_sessions').select('*', { count: 'exact', head: true }).gte('created_at', monthAgo),
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.from('visitor_sessions').select('*').gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(500),
        supabase.from('page_views').select('*').gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(1000),
      ]);

      // Calculate device breakdown
      const deviceCounts: Record<string, number> = {};
      const browserCounts: Record<string, number> = {};
      const osCounts: Record<string, number> = {};
      const countryCounts: Record<string, number> = {};
      const referrerCounts: Record<string, number> = {};

      (allSessions || []).forEach(session => {
        const device = session.device_type || 'Unknown';
        const browser = session.browser || 'Unknown';
        const os = session.os || 'Unknown';
        const country = session.country || 'Unknown';
        const referrer = session.referrer ? new URL(session.referrer).hostname : 'Direct';

        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
        osCounts[os] = (osCounts[os] || 0) + 1;
        countryCounts[country] = (countryCounts[country] || 0) + 1;
        referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
      });

      const totalSessions = allSessions?.length || 1;

      // Calculate page popularity
      const pageCounts: Record<string, number> = {};
      (pageViewsData || []).forEach(pv => {
        pageCounts[pv.page_path] = (pageCounts[pv.page_path] || 0) + 1;
      });

      // Hourly traffic for last 24 hours
      const hourlyTraffic = Array.from({ length: 24 }, (_, i) => {
        const hour = new Date();
        hour.setHours(hour.getHours() - (23 - i));
        const hourStart = new Date(hour);
        hourStart.setMinutes(0, 0, 0);
        const hourEnd = new Date(hourStart);
        hourEnd.setHours(hourEnd.getHours() + 1);

        const visitors = (allSessions || []).filter(s => {
          const created = new Date(s.created_at);
          return created >= hourStart && created < hourEnd;
        }).length;

        const views = (pageViewsData || []).filter(pv => {
          const created = new Date(pv.created_at);
          return created >= hourStart && created < hourEnd;
        }).length;

        return {
          hour: hourStart.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }),
          visitors,
          pageViews: views,
        };
      });

      // Calculate avg session duration
      const sessionsWithDuration = (allSessions || []).filter(s => s.page_views > 1);
      const avgDuration = sessionsWithDuration.length > 0 
        ? sessionsWithDuration.reduce((sum, s) => {
            const duration = new Date(s.last_activity).getTime() - new Date(s.created_at).getTime();
            return sum + duration;
          }, 0) / sessionsWithDuration.length / 1000 / 60 // in minutes
        : 0;

      // Bounce rate (single page sessions)
      const singlePageSessions = (allSessions || []).filter(s => s.page_views === 1).length;
      const bounceRate = totalSessions > 0 ? (singlePageSessions / totalSessions) * 100 : 0;

      setTrafficData({
        totalVisitors: totalVisitors || 0,
        activeNow: activeSessions?.length || 0,
        todayVisitors: todayCount || 0,
        weekVisitors: weekCount || 0,
        monthVisitors: monthCount || 0,
        pageViews: totalPageViews || 0,
        avgSessionDuration: Math.round(avgDuration * 10) / 10,
        bounceRate: Math.round(bounceRate * 10) / 10,
        topPages: Object.entries(pageCounts)
          .map(([path, views]) => ({ path, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10),
        topReferrers: Object.entries(referrerCounts)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        deviceBreakdown: Object.entries(deviceCounts)
          .map(([device, count]) => ({ 
            device, 
            count, 
            percentage: Math.round((count / totalSessions) * 100) 
          }))
          .sort((a, b) => b.count - a.count),
        browserBreakdown: Object.entries(browserCounts)
          .map(([browser, count]) => ({ 
            browser, 
            count, 
            percentage: Math.round((count / totalSessions) * 100) 
          }))
          .sort((a, b) => b.count - a.count),
        osBreakdown: Object.entries(osCounts)
          .map(([os, count]) => ({ 
            os, 
            count, 
            percentage: Math.round((count / totalSessions) * 100) 
          }))
          .sort((a, b) => b.count - a.count),
        hourlyTraffic,
        geographicData: Object.entries(countryCounts)
          .map(([country, visitors]) => ({ country, visitors }))
          .sort((a, b) => b.visitors - a.visitors)
          .slice(0, 10),
      });

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    }
  }, []);

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      const { data: existing } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
      } else {
        await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
      }

      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error updating role:', error);
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Delete user role first
      await supabase.from('user_roles').delete().eq('user_id', userId);
      // Delete profile
      await supabase.from('profiles').delete().eq('user_id', userId);
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTrafficData();

    // Set up real-time subscriptions
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchUsers)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_roles' }, fetchUsers)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'visitor_sessions' }, fetchTrafficData)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'page_views' }, fetchTrafficData)
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Refresh data periodically
    const interval = setInterval(() => {
      fetchUsers();
      fetchTrafficData();
    }, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchUsers, fetchTrafficData]);

  return {
    users,
    trafficData,
    isConnected,
    lastUpdated,
    fetchUsers,
    fetchTrafficData,
    updateUserRole,
    deleteUser,
  };
};
