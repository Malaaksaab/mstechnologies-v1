import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ServiceFilters } from '@/components/software/ServiceFilters';
import { ServiceCard } from '@/components/software/ServiceCard';
import { BookingModal } from '@/components/software/BookingModal';
import { useSoftwareServices, SoftwareService, SoftwareCategory } from '@/hooks/useSoftwareServices';

const Software = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SoftwareCategory | null>(null);
  const [selectedService, setSelectedService] = useState<SoftwareService | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: services, isLoading, error } = useSoftwareServices(selectedCategory, searchQuery);

  const handleBook = (service: SoftwareService) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-12">
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
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button variant="neon" size="lg" onClick={() => setIsBookingOpen(true)}>
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button variant="cyber" size="lg">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Filters & Search */}
        <section className="container mx-auto px-4 mb-12">
          <ServiceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            resultCount={services?.length || 0}
          />
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 mb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading services...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">Failed to load services</p>
              <Button variant="cyber" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onBook={handleBook}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No services found matching your criteria</p>
              <Button
                variant="cyber"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
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
            <Button variant="neon" size="xl" onClick={() => setIsBookingOpen(true)}>
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        service={selectedService}
      />
    </div>
  );
};

export default Software;
