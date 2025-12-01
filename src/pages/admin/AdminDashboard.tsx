import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  Package,
  TrendingUp,
  MessageSquare,
  Settings,
  FileText,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { title: 'Total Users', value: '2,847', change: '+12.5%', trend: 'up', icon: Users },
  { title: 'Total Bookings', value: '1,234', change: '+8.2%', trend: 'up', icon: Calendar },
  { title: 'Total Revenue', value: 'PKR 4.5M', change: '+23.1%', trend: 'up', icon: DollarSign },
  { title: 'Pending Tasks', value: '18', change: '-5.4%', trend: 'down', icon: FileText },
];

const recentBookings = [
  { id: 'BK001', customer: 'Ahmed Khan', service: 'iPhone Unlock', status: 'Pending', amount: 'PKR 2,500' },
  { id: 'BK002', customer: 'Sara Ali', service: 'Web Development', status: 'In Progress', amount: 'PKR 150,000' },
  { id: 'BK003', customer: 'Bilal Sheikh', service: 'Instagram Followers', status: 'Completed', amount: 'PKR 8,000' },
  { id: 'BK004', customer: 'Fatima Zahra', service: 'Investment Plan', status: 'Approved', amount: 'PKR 500,000' },
];

const quickLinks = [
  { icon: Package, title: 'Manage Services', href: '/admin/services', desc: 'Add, edit, or remove services' },
  { icon: Users, title: 'User Management', href: '/admin/users', desc: 'View and manage users' },
  { icon: MessageSquare, title: 'Bookings', href: '/admin/bookings', desc: 'Handle booking requests' },
  { icon: TrendingUp, title: 'Investments', href: '/admin/investments', desc: 'Manage investment plans' },
  { icon: FileText, title: 'SEO Settings', href: '/admin/seo', desc: 'Optimize site SEO' },
  { icon: Settings, title: 'Settings', href: '/admin/settings', desc: 'System configuration' },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">MS</span>
              </div>
              <span className="font-heading font-semibold text-foreground">Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">View Site</Button>
            </Link>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.title} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">Recent Bookings</h2>
                <Link to="/admin/bookings">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-4 text-sm font-medium text-primary">{booking.id}</td>
                        <td className="py-4 text-sm text-foreground">{booking.customer}</td>
                        <td className="py-4 text-sm text-muted-foreground">{booking.service}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                            booking.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                            booking.status === 'Approved' ? 'bg-purple-500/20 text-purple-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-right text-foreground">{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-card p-6">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link key={link.title} to={link.href}>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{link.title}</div>
                        <div className="text-xs text-muted-foreground">{link.desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
