import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '#',
    children: [
      { name: 'Investment Solutions', href: '/services/investment' },
      { name: 'Software Development', href: '/services/software' },
      { name: 'Social Media Marketing', href: '/services/social-media' },
      { name: 'Digital Solutions', href: '/services/digital' },
    ]
  },
  { name: 'Calculator', href: '/calculator' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50" 
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <span className="font-display text-xl font-bold gradient-text">MS</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-semibold text-foreground">MS Technologies</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.children ? (
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 glass-card p-2 rounded-xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" size="sm">Admin</Button>
          </Link>
          <Link to="/contact">
            <Button variant="cyber" size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block text-sm text-muted-foreground hover:text-primary"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-sm font-medium text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/admin">
                  <Button variant="outline" className="w-full">Admin Panel</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="neon" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
