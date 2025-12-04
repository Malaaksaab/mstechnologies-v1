import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Eye, 
  Activity, 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet,
  Clock,
  TrendingUp,
  RefreshCw,
  Wifi,
  WifiOff,
  MousePointer,
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface VisitorSession {
  id: string;
  session_id: string;
  ip_address: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  current_page: string | null;
  page_views: number;
  is_active: boolean;
  created_at: string;
  last_activity: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
}

interface SiteEvent {
  id: string;
  session_id: string;
  event_type: string;
  event_data: unknown;
  page_path: string | null;
  created_at: string;
}

interface PageView {
  id: string;
  session_id: string;
  page_path: string;
  page_title: string | null;
  time_on_page: number;
  created_at: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

const AdminMonitoring = () => {
  const [activeVisitors, setActiveVisitors] = useState<VisitorSession[]>([]);
  const [allSessions, setAllSessions] = useState<VisitorSession[]>([]);
  const [recentEvents, setRecentEvents] = useState<SiteEvent[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    activeNow: 0,
    totalPageViews: 0,
    avgSessionDuration: 0,
  });

  useEffect(() => {
    fetchData();
    
    // Set up realtime subscriptions
    const sessionsChannel = supabase
      .channel('visitor-sessions-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'visitor_sessions' 
      }, () => {
        fetchSessions();
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    const eventsChannel = supabase
      .channel('site-events-changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'site_events' 
      }, (payload) => {
        setRecentEvents(prev => [payload.new as SiteEvent, ...prev.slice(0, 49)]);
      })
      .subscribe();

    const pageViewsChannel = supabase
      .channel('page-views-changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'page_views' 
      }, (payload) => {
        setPageViews(prev => [payload.new as PageView, ...prev.slice(0, 99)]);
      })
      .subscribe();

    // Refresh active status every 15 seconds
    const interval = setInterval(fetchSessions, 15000);

    return () => {
      supabase.removeChannel(sessionsChannel);
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(pageViewsChannel);
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchSessions(), fetchEvents(), fetchPageViews()]);
  };

  const fetchSessions = async () => {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    
    // Fetch active sessions (activity in last 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { data: active } = await supabase
      .from('visitor_sessions')
      .select('*')
      .gte('last_activity', twoMinutesAgo)
      .order('last_activity', { ascending: false });
    
    // Fetch all recent sessions
    const { data: all } = await supabase
      .from('visitor_sessions')
      .select('*')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(100);
    
    // Get total counts
    const { count: totalVisitors } = await supabase
      .from('visitor_sessions')
      .select('*', { count: 'exact', head: true });
    
    const { count: totalPageViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    setActiveVisitors(active || []);
    setAllSessions(all || []);
    setStats(prev => ({
      ...prev,
      totalVisitors: totalVisitors || 0,
      activeNow: active?.length || 0,
      totalPageViews: totalPageViews || 0,
    }));
  };

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('site_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    setRecentEvents(data || []);
  };

  const fetchPageViews = async () => {
    const { data } = await supabase
      .from('page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    setPageViews(data || []);
  };

  const getDeviceIcon = (type: string | null) => {
    switch (type?.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Calculate device distribution
  const deviceStats = allSessions.reduce((acc, session) => {
    const device = session.device_type || 'unknown';
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deviceData = Object.entries(deviceStats).map(([name, value]) => ({ name, value }));

  // Calculate browser distribution
  const browserStats = allSessions.reduce((acc, session) => {
    const browser = session.browser || 'Unknown';
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserData = Object.entries(browserStats).map(([name, value]) => ({ name, value }));

  // Calculate page popularity
  const pageStats = pageViews.reduce((acc, pv) => {
    acc[pv.page_path] = (acc[pv.page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pageData = Object.entries(pageStats)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Hourly traffic data
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (23 - i));
    const hourStart = new Date(hour);
    hourStart.setMinutes(0, 0, 0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    
    const visitors = allSessions.filter(s => {
      const created = new Date(s.created_at);
      return created >= hourStart && created < hourEnd;
    }).length;
    
    return {
      hour: hourStart.toLocaleTimeString('en-US', { hour: '2-digit' }),
      visitors
    };
  });

  return (
    <AdminLayout 
      title="Real-Time Monitoring" 
      description="Monitor website traffic, visitors, and events in real-time"
    >
      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
          {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isConnected ? 'Connected - Real-time updates active' : 'Disconnected'}
        </div>
        <Button variant="outline" size="sm" onClick={fetchData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats.activeNow}</div>
            <p className="text-xs text-muted-foreground">visitors on site</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalVisitors}</div>
            <p className="text-xs text-muted-foreground">all time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPageViews}</div>
            <p className="text-xs text-muted-foreground">total pages viewed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allSessions.length}</div>
            <p className="text-xs text-muted-foreground">in last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList>
          <TabsTrigger value="live">Live Visitors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active Visitors ({activeVisitors.length})
              </CardTitle>
              <CardDescription>Currently browsing your website</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Browser / OS</TableHead>
                      <TableHead>Current Page</TableHead>
                      <TableHead>Pages Viewed</TableHead>
                      <TableHead>Last Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeVisitors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No active visitors at the moment
                        </TableCell>
                      </TableRow>
                    ) : (
                      activeVisitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(visitor.device_type)}
                              <span className="capitalize">{visitor.device_type || 'Unknown'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{visitor.browser || 'Unknown'}</div>
                              <div className="text-muted-foreground text-xs">{visitor.os || 'Unknown OS'}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{visitor.current_page || '/'}</Badge>
                          </TableCell>
                          <TableCell>{visitor.page_views}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-green-500">
                              <Clock className="w-3 h-3" />
                              {formatTimeAgo(visitor.last_activity)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>Landing Page</TableHead>
                      <TableHead>Referrer</TableHead>
                      <TableHead>Started</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(session.device_type)}
                            <span className="capitalize">{session.device_type || 'Unknown'}</span>
                          </div>
                        </TableCell>
                        <TableCell>{session.browser || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{session.current_page || '/'}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {session.referrer || 'Direct'}
                        </TableCell>
                        <TableCell>{formatTimeAgo(session.created_at)}</TableCell>
                        <TableCell>
                          {session.is_active ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Ended</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Over Time (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={browserData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pageData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Bar dataKey="views" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="w-5 h-5" />
                Recent Events
              </CardTitle>
              <CardDescription>User interactions and actions tracked on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {recentEvents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No events recorded yet. Events will appear here as users interact with your site.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <MousePointer className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge>{event.event_type}</Badge>
                            <span className="text-xs text-muted-foreground">{formatTimeAgo(event.created_at)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Page: {event.page_path || '/'}
                          </p>
                          {event.event_data && typeof event.event_data === 'object' && Object.keys(event.event_data as object).length > 0 && (
                            <pre className="text-xs bg-background rounded p-2 mt-2 overflow-auto">
                              {JSON.stringify(event.event_data, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Page Views Log
              </CardTitle>
              <CardDescription>Detailed log of all page views</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Time on Page</TableHead>
                      <TableHead>Viewed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageViews.map((pv) => (
                      <TableRow key={pv.id}>
                        <TableCell>
                          <Badge variant="outline">{pv.page_path}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{pv.page_title || '-'}</TableCell>
                        <TableCell>
                          {pv.time_on_page > 0 ? `${pv.time_on_page}s` : '-'}
                        </TableCell>
                        <TableCell>{formatTimeAgo(pv.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminMonitoring;
