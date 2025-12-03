import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const footerLinks = {
  services: [
    { name: 'Investment Solutions', href: '/services/investment' },
    { name: 'Software Development', href: '/services/software' },
    { name: 'Social Media Marketing', href: '/services/social-media' },
    { name: 'Digital Solutions', href: '/services/digital' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  support: [
    { name: 'Help Center', href: '/contact' },
    { name: 'Investment Calculator', href: '/calculator' },
    { name: 'Service Booking', href: '/services/software' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export const Footer = () => {
  const { data: settings } = useSiteSettings();

  return (
    <footer className="relative bg-background border-t border-border/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">Subscribe to our newsletter for the latest updates, tips, and exclusive offers.</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-muted/50"
              />
              <Button type="submit" className="gap-2">
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20" />
                <span className="font-display text-2xl font-bold gradient-text">MS</span>
              </div>
              <div>
                <span className="font-heading text-xl font-semibold text-foreground block">MS Technologies</span>
                <span className="text-xs text-muted-foreground">{settings?.company_tagline || 'And Digital Solutions Pvt Ltd'}</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted partner for innovative digital solutions, investment opportunities, and technology services. Empowering businesses worldwide since 2020.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`mailto:${settings?.company_email || 'support@mstechnologies.company'}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {settings?.company_email || 'support@mstechnologies.company'}
              </a>
              <a href={`tel:${settings?.company_phone || '+923259479471'}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {settings?.company_phone || '+923259479471'}
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{settings?.company_address || 'Pakistan'}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings?.company_name || 'MS Technologies And Digital Solutions Pvt Ltd'}. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={settings?.social_links?.[social.name.toLowerCase()] || social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
