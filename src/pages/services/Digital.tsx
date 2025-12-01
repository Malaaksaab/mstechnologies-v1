import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ArrowRight, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ServiceFilters } from '@/components/services/ServiceFilters';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceDetailModal } from '@/components/services/ServiceDetailModal';
import { useDigitalServices, DigitalService, DigitalCategory, digitalCategoryLabels } from '@/hooks/useDigitalServices';

const Digital = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DigitalCategory | null>(null);
  const [selectedService, setSelectedService] = useState<DigitalService | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: services, isLoading, error } = useDigitalServices(selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 mb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Digital Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Unlock Your </span>
              <span className="gradient-text">Device's Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">FRP unlock, iPhone bypass, Apple ID services, Android flashing & more.</p>
            <div className="flex flex-wrap items-center justify-center gap-4"><Link to="/contact"><Button variant="neon" size="lg">Book Service<ArrowRight className="w-5 h-5" /></Button></Link></div>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <div className="glass-card p-8">
            <h3 className="text-center text-lg font-heading text-muted-foreground mb-6">Supported Brands</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'OnePlus', 'Google', 'Motorola'].map((b) => <div key={b} className="px-4 py-2 glass-card text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{b}</div>)}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <ServiceFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={digitalCategoryLabels} resultCount={services?.length || 0} />
        </section>

        <section className="container mx-auto px-4 mb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /><span className="ml-3 text-muted-foreground">Loading...</span></div>
          ) : error ? (
            <div className="text-center py-20"><p className="text-destructive mb-4">Failed to load</p><Button variant="cyber" onClick={() => window.location.reload()}>Retry</Button></div>
          ) : services?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, i) => <ServiceCard key={service.id} service={service} index={i} onClick={() => { setSelectedService(service); setIsDetailOpen(true); }} />)}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-muted-foreground mb-4">No services found</p><Button variant="cyber" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>Clear Filters</Button></div>
          )}
        </section>

        <section className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center glass-card p-12 bg-primary/5 border-primary/30">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Need Help With Your Device?</h2>
            <Link to="/contact"><Button variant="neon" size="xl">Get Free Diagnosis<ArrowRight className="w-5 h-5" /></Button></Link>
          </motion.div>
        </section>
      </main>
      <Footer />
      <ServiceDetailModal isOpen={isDetailOpen} onClose={() => { setIsDetailOpen(false); setSelectedService(null); }} service={selectedService} serviceType="digital" />
    </div>
  );
};

export default Digital;
