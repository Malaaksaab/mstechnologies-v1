import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ShoppingCart, TrendingUp, 
  ArrowUpRight, ArrowDownRight,
  Code, Share2, Smartphone, Briefcase, FileText, Settings, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalBookings: number;
  totalServices: number;
  totalBlogPosts: number;
  totalCareers: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalServices: 0,
    totalBlogPosts: 0,
    totalCareers: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { count: bookingsCount } = await supabase
        .from('service_bookings')
        .select('*', { count: 'exact', head: true });

      const { count: softwareCount } = await supabase
        .from('software_services')
        .select('*', { count: 'exact', head: true });
      
      const { count: socialCount } = await supabase
        .from('social_media_services')
        .select('*', { count: 'exact', head: true });
      
      const { count: digitalCount } = await supabase
        .from('digital_services')
        .select('*', { count: 'exact', head: true });

      const { count: blogCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

      const { count: careersCount } = await supabase
        .from('careers')
        .select('*', { count: 'exact', head: true });

      const { data: bookings } = await supabase
        .from('service_bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalBookings: bookingsCount || 0,
        totalServices: (softwareCount || 0) + (socialCount || 0) + (digitalCount || 0),
        totalBlogPosts: blogCount || 0,
        totalCareers: careersCount || 0
      });
      setRecentBookings(bookings || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Bookings', value: stats.totalBookings, icon: ShoppingCart, trend: '+12%', trendUp: true, color: 'from-blue-500 to-cyan-500' },
    { title: 'Active Services', value: stats.totalServices, icon: Briefcase, trend: '+8%', trendUp: true, color: 'from-purple-500 to-pink-500' },
    { title: 'Blog Posts', value: stats.totalBlogPosts, icon: FileText, trend: '+5%', trendUp: true, color: 'from-green-500 to-emerald-500' },
    { title: 'Open Positions', value: stats.totalCareers, icon: Users, trend: '0%', trendUp: true, color: 'from-orange-500 to-amber-500' },
  ];

  const quickActions = [
    { title: 'Software Services', href: '/admin/software', icon: Code, description: 'Manage software services' },
    { title: 'Social Media', href: '/admin/social-media', icon: Share2, description: 'Manage social services' },
    { title: 'Digital Solutions', href: '/admin/digital', icon: Smartphone, description: 'Manage digital services' },
    { title: 'Investments', href: '/admin/investments', icon: TrendingUp, description: 'Manage investment plans' },
    { title: 'Blog Posts', href: '/admin/blog', icon: FileText, description: 'Manage blog content' },
    { title: 'Careers', href: '/admin/careers', icon: Users, description: 'Manage job listings' },
    { title: 'Bookings', href: '/admin/bookings', icon: Calendar, description: 'View bookings' },
    { title: 'Settings', href: '/admin/settings', icon: Settings, description: 'Site settings' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout title="Dashboard" description="Overview of your website performance">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{loading ? '...' : stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trendUp ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className={stat.trendUp ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>{stat.trend}</span>
                    <span className="text-muted-foreground text-sm">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.href} to={action.href}>
                    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer">
                      <action.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-medium text-foreground text-sm">{action.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-2">View All <ArrowUpRight className="w-4 h-4" /></Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : recentBookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No bookings yet</div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{booking.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.service_type} • {booking.ticket_id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span>
                        <span className="text-sm text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
