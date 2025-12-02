import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/three/HeroScene';

export const HeroSection = () => {
  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '1000+', label: 'Projects Done' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>
      
      {/* HUD Corners */}
      <div className="absolute top-20 left-4 w-32 h-32 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-20 right-4 w-32 h-32 border-r-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-32 h-32 border-l-2 border-b-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-20 right-4 w-32 h-32 border-r-2 border-b-2 border-primary/30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Welcome to the Future of Digital Services</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6"
          >
            <span className="text-foreground">Transform Your</span>
            <br />
            <span className="gradient-text">Digital Future</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Empowering businesses with cutting-edge software solutions, social media growth, 
            digital services, and smart investment opportunities.
          </motion.p>

          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              { icon: Zap, text: 'Fast Delivery' },
              { icon: Shield, text: '100% Secure' },
              { icon: Globe, text: 'Global Service' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border/50">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/services/software">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 px-8">
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="gap-2 border-primary/50 hover:bg-primary/10 px-8">
                Book Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
