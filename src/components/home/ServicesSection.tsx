import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Code, 
  Share2, 
  Smartphone,
  ArrowRight,
  Hexagon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: TrendingUp,
    title: 'Investment Solutions',
    description: 'Fixed deposits and investment plans with competitive profit rates. Real-time calculators and secure fund management.',
    href: '/services/investment',
    color: 'from-primary to-neon-aqua',
    features: ['Fixed Deposits', 'Profit Calculator', 'KYC Verification', 'Transaction History'],
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Custom software solutions including web apps, mobile apps, ERP systems, and enterprise-grade SaaS platforms.',
    href: '/services/software',
    color: 'from-neon-aqua to-secondary',
    features: ['Web Applications', 'Mobile Apps', 'ERP Systems', 'Custom APIs'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Comprehensive SMM services including YouTube promotions, Instagram growth, and targeted ad campaigns.',
    href: '/services/social-media',
    color: 'from-secondary to-neon-purple',
    features: ['YouTube Promotion', 'Instagram Growth', 'Facebook Marketing', 'Content Creation'],
  },
  {
    icon: Smartphone,
    title: 'Digital Solutions',
    description: 'Mobile unlocking, FRP bypass, device repairs, and firmware solutions for all major brands.',
    href: '/services/digital',
    color: 'from-neon-purple to-neon-pink',
    features: ['FRP Unlocking', 'iPhone Bypass', 'Firmware Updates', 'Device Repairs'],
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hexagon-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Hexagon className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Comprehensive </span>
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From investment management to cutting-edge software development, we provide end-to-end digital transformation services.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.href} className="block group">
                <div className="glass-card-hover p-8 h-full relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/contact">
            <Button variant="cyber" size="lg">
              Get Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
