import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '#',
    children: [
      { name: 'Investment Solutions', href: '/services/investment', description: 'Smart investment plans with guaranteed returns' },
      { name: 'Software Development', href: '/services/software', description: 'Custom software & app development' },
      { name: 'Social Media Marketing', href: '/services/social-media', description: 'Grow your social presence' },
      { name: 'Digital Solutions', href: '/services/digital', description: 'Device unlocking & tech services' },
    ]
  },
  { name: 'Calculator', href: '/calculator' },
  { 
    name: 'Company', 
    href: '#',
    children: [
      { name: 'About Us', href: '/about', description: 'Learn about our mission' },
      { name: 'Careers', href: '/careers', description: 'Join our team' },
      { name: 'Blog', href: '/blog', description: 'Latest news and insights' },
      { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
    ]
  },
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
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
          : "bg-transparent"
      )}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative w-12 h-12 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
            <span className="font-display text-2xl font-bold gradient-text relative z-10">MS</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-semibold text-foreground block">MS Technologies</span>
            <span className="text-xs text-muted-foreground">Digital Solutions</span>
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
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  activeDropdown === item.name 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}>
                  {item.name}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    activeDropdown === item.name && "rotate-180"
                  )} />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    location.pathname === item.href 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 glass-card p-2 rounded-xl border border-border/50 shadow-xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-3 text-sm rounded-lg hover:bg-primary/10 transition-colors group"
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{child.name}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{child.description}</span>
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
          <Link to="/contact">
            <Button variant="ghost" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Free Consultation
            </Button>
          </Link>
          <Link to="/services/software">
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
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
                      <span className="text-sm font-semibold text-foreground">{item.name}</span>
                      <div className="pl-4 space-y-2 border-l-2 border-primary/20">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block text-sm font-medium transition-colors",
                        location.pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Free Consultation</Button>
                </Link>
                <Link to="/services/software">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
