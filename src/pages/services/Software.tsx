import { motion } from 'framer-motion';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Monitor,
  Database,
  Cloud,
  Layers,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  { icon: Globe, title: 'Website Development', desc: 'Custom responsive websites with modern frameworks', features: ['React/Next.js', 'WordPress', 'E-commerce', 'Landing Pages'] },
  { icon: Layers, title: 'Web Applications', desc: 'Full-stack web apps with robust backends', features: ['SaaS Platforms', 'Dashboards', 'Portals', 'CRM Systems'] },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform mobile applications', features: ['iOS Apps', 'Android Apps', 'React Native', 'Flutter'] },
  { icon: Monitor, title: 'Desktop Software', desc: 'Windows, Mac, and Linux desktop applications', features: ['Electron Apps', 'Native Apps', 'POS Systems', 'Tools'] },
  { icon: Database, title: 'ERP Systems', desc: 'Enterprise resource planning solutions', features: ['Inventory', 'HR Management', 'Accounting', 'Supply Chain'] },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Cloud infrastructure and DevOps services', features: ['AWS/Azure', 'CI/CD', 'Microservices', 'Serverless'] },
  { icon: ShoppingCart, title: 'E-commerce', desc: 'Online stores and marketplace platforms', features: ['Shopify', 'WooCommerce', 'Custom Carts', 'Payment Integration'] },
  { icon: Code, title: 'Custom APIs', desc: 'RESTful and GraphQL API development', features: ['API Design', 'Integration', 'Documentation', 'Maintenance'] },
];

const Software = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Software Development</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Build </span>
              <span className="gradient-text">Tomorrow's</span>
              <br />
              <span className="text-foreground">Software Today</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From concept to deployment, we build scalable software solutions 
              that drive business growth and digital transformation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="neon" size="lg">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="cyber" size="lg">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-foreground">Our </span>
              <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground">Comprehensive software solutions for every business need</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
              <span className="text-foreground">Technologies We </span>
              <span className="gradient-text">Use</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Flutter', 'Swift', 'Kotlin'].map((tech) => (
                <div key={tech} className="glass-card p-4 text-center hover:border-primary/50 transition-colors">
                  <span className="text-sm font-medium text-muted-foreground">{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass-card p-12 bg-primary/5 border-primary/30"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us about your project and get a free consultation with our expert team.
            </p>
            <Link to="/contact">
              <Button variant="neon" size="xl">
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Software;
