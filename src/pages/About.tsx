import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Award,
  Target,
  Lightbulb,
  Heart,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
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
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Innovating </span>
              <span className="gradient-text">Since Day One</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              MS Technologies And Digital Solutions Pvt Ltd is a leading technology company 
              providing comprehensive digital solutions across Pakistan and beyond.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Clients Served' },
              { value: '1000+', label: 'Projects Completed' },
              { value: '50+', label: 'Team Members' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-4xl font-display font-bold neon-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <Target className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower businesses and individuals with innovative technology solutions that drive 
                growth, efficiency, and digital transformation. We strive to be the bridge between 
                traditional business and the digital future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <Lightbulb className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the most trusted technology partner in South Asia, known for excellence, 
                innovation, and unwavering commitment to client success. We envision a world where 
                technology empowers everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-foreground">Our Core </span>
              <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Integrity', desc: 'We operate with honesty and transparency in all our dealings' },
              { icon: Award, title: 'Excellence', desc: 'We strive for the highest quality in everything we do' },
              { icon: Users, title: 'Collaboration', desc: 'We believe in the power of teamwork and partnership' },
              { icon: TrendingUp, title: 'Innovation', desc: 'We continuously evolve and embrace new technologies' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
                <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Leadership
                </h2>
                <p className="text-muted-foreground mb-6">
                  Founded by Malaak Saab, MS Technologies was built on the vision of making 
                  cutting-edge technology accessible to businesses of all sizes. With over 15 years 
                  of experience in the tech industry, our leadership team brings together expertise 
                  in software development, digital marketing, and financial technology.
                </p>
                <p className="text-muted-foreground">
                  The "MS" in our name represents our founder's initials and our commitment to 
                  providing "Maximum Solutions" for our clients' digital needs.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-6xl font-display font-bold gradient-text">MS</span>
                  </div>
                </div>
              </div>
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
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how MS Technologies can help transform your business 
              with our innovative solutions.
            </p>
            <Link to="/contact">
              <Button variant="neon" size="xl">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
