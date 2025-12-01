import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowRight, Loader2, Users, Eye, Heart, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ServiceFilters } from '@/components/services/ServiceFilters';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceDetailModal } from '@/components/services/ServiceDetailModal';
import { useSocialMediaServices, SocialMediaService, SocialMediaCategory, socialMediaCategoryLabels } from '@/hooks/useSocialMediaServices';

const SocialMedia = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SocialMediaCategory | null>(null);
  const [selectedService, setSelectedService] = useState<SocialMediaService | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: services, isLoading, error } = useSocialMediaServices(selectedCategory, searchQuery);

  const handleServiceClick = (service: SocialMediaService) => {
    setSelectedService(service);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 mb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Share2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Social Media Marketing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Amplify Your </span>
              <span className="gradient-text">Social Presence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Buy followers, views, likes & grow your brand across all platforms.</p>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ icon: Users, value: '10M+', label: 'Followers' }, { icon: Eye, value: '50M+', label: 'Views' }, { icon: Heart, value: '25M+', label: 'Engagements' }, { icon: TrendingUp, value: '5000+', label: 'Campaigns' }].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-display font-bold neon-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <ServiceFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={socialMediaCategoryLabels} resultCount={services?.length || 0} />
        </section>

        <section className="container mx-auto px-4 mb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /><span className="ml-3 text-muted-foreground">Loading...</span></div>
          ) : error ? (
            <div className="text-center py-20"><p className="text-destructive mb-4">Failed to load</p><Button variant="cyber" onClick={() => window.location.reload()}>Retry</Button></div>
          ) : services?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, i) => <ServiceCard key={service.id} service={service} index={i} onClick={() => handleServiceClick(service)} />)}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-muted-foreground mb-4">No services found</p><Button variant="cyber" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>Clear Filters</Button></div>
          )}
        </section>

        <section className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center glass-card p-12 bg-primary/5 border-primary/30">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Ready to Go Viral?</h2>
            <Link to="/contact"><Button variant="neon" size="xl">Get Started<ArrowRight className="w-5 h-5" /></Button></Link>
          </motion.div>
        </section>
      </main>
      <Footer />
      <ServiceDetailModal isOpen={isDetailOpen} onClose={() => { setIsDetailOpen(false); setSelectedService(null); }} service={selectedService} serviceType="social_media" />
    </div>
  );
};

export default SocialMedia;
