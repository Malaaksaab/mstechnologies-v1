import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code, 
  Share2, 
  Smartphone, 
  TrendingUp,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const navItems = [
  { icon: LayoutDashboard, title: 'Dashboard', href: '/admin' },
  { icon: Code, title: 'Software Services', href: '/admin/software' },
  { icon: Share2, title: 'Social Media', href: '/admin/social-media' },
  { icon: Smartphone, title: 'Digital Services', href: '/admin/digital' },
  { icon: TrendingUp, title: 'Investment Plans', href: '/admin/investments' },
];

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">MS</span>
              </div>
              <span className="font-heading font-semibold text-foreground">Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 pt-16 lg:pt-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setSidebarOpen(false)}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
