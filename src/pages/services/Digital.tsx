import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Unlock,
  Shield,
  Download,
  Cpu,
  Apple,
  Wrench,
  FileCode,
  ArrowRight,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const digitalServices = [
  {
    icon: Unlock,
    title: 'FRP Unlocking',
    desc: 'Factory Reset Protection bypass for all Android devices',
    price: 'From $15',
    features: ['Samsung FRP', 'Xiaomi FRP', 'Oppo/Vivo FRP', 'Huawei FRP'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Unlock',
    desc: 'Network unlocking for all major brands and carriers',
    price: 'From $10',
    features: ['iPhone Unlock', 'Samsung Unlock', 'Carrier Unlock', 'IMEI Clean'],
  },
  {
    icon: Cpu,
    title: 'Android Flashing',
    desc: 'Stock ROM flashing, custom ROMs, and boot repair',
    price: 'From $20',
    features: ['Stock ROM', 'Custom ROM', 'Root/Unroot', 'Bootloader'],
  },
  {
    icon: Apple,
    title: 'iPhone Bypass',
    desc: 'iCloud bypass, MDM removal, and activation lock solutions',
    price: 'From $25',
    features: ['iCloud Bypass', 'MDM Remove', 'Activation Lock', 'Hello Screen'],
  },
  {
    icon: Shield,
    title: 'Apple ID Services',
    desc: 'Apple ID creation, recovery, and account services',
    price: 'From $30',
    features: ['ID Creation', 'Account Recovery', 'Region Change', 'Find My Off'],
  },
  {
    icon: FileCode,
    title: 'Gmail Services',
    desc: 'Gmail account creation and recovery services',
    price: 'From $5',
    features: ['Account Creation', 'Phone Verified', 'Bulk Accounts', 'Recovery'],
  },
  {
    icon: Wrench,
    title: 'Device Repairs',
    desc: 'Software-based repairs and troubleshooting',
    price: 'From $15',
    features: ['Boot Loop Fix', 'Brick Recovery', 'IMEI Repair', 'Baseband Fix'],
  },
  {
    icon: Download,
    title: 'Firmware Library',
    desc: 'Access to our extensive firmware database',
    price: 'From $5',
    features: ['All Brands', 'Latest Versions', 'Flash Tools', 'Tutorials'],
  },
];

const Digital = () => {
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
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Digital Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Unlock Your </span>
              <span className="gradient-text">Device's Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Professional mobile unlocking, FRP bypass, firmware solutions, 
              and device repair services for all major brands.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="neon" size="lg">
                  Book Service
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="cyber" size="lg">
                  Check IMEI Status
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Supported Brands */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-center text-lg font-heading text-muted-foreground mb-6">Supported Brands</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'OnePlus', 'Realme', 'Google', 'Motorola', 'Nokia', 'LG'].map((brand) => (
                <div key={brand} className="px-4 py-2 glass-card text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  {brand}
                </div>
              ))}
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
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{service.desc}</p>
                <div className="text-primary font-bold mb-4">{service.price}</div>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-foreground">How It </span>
              <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Submit Request', desc: 'Fill out our booking form with device details and IMEI' },
              { step: '02', title: 'Get Quote', desc: 'Receive instant pricing and estimated completion time' },
              { step: '03', title: 'Payment', desc: 'Pay securely via bank transfer or mobile payment' },
              { step: '04', title: 'Service Done', desc: 'Receive unlock code or remote service completion' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-display font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
              Need Help With Your Device?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for a free consultation. We'll diagnose your issue and provide the best solution.
            </p>
            <Link to="/contact">
              <Button variant="neon" size="xl">
                Get Free Diagnosis
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

export default Digital;
