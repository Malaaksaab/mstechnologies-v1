import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export const CTASection = () => {
  const { data: settings } = useSiteSettings();
  
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 hexagon-pattern opacity-30" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
            <span className="text-foreground">Ready to </span>
            <span className="gradient-text">Transform</span>
            <br />
            <span className="text-foreground">Your Business?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Partner with MS Technologies for innovative solutions that drive growth. 
            Let's build something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="neon" size="xl" className="group">
                <MessageSquare className="w-5 h-5" />
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={`tel:${settings?.company_phone || '+923259479471'}`}>
              <Button variant="cyber" size="xl">
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {['Enterprise Ready', 'Secure & Compliant', '24/7 Support', 'Global Reach'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
