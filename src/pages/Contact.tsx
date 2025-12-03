import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Contact = () => {
  const { toast } = useToast();
  const { data: settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-foreground">Contact </span>
              <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can help transform your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">Email Us</h3>
                <a href={`mailto:${settings?.company_email || 'support@mstechnologies.company'}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {settings?.company_email || 'support@mstechnologies.company'}
                </a>
              </div>

              <div className="glass-card p-6">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">Call Us</h3>
                <a href={`tel:${settings?.company_phone || '+923259479471'}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {settings?.company_phone || '+923259479471'}
                </a>
              </div>

              <div className="glass-card p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">Visit Us</h3>
                <p className="text-muted-foreground">
                  {settings?.company_address || 'Pakistan'}
                </p>
              </div>

              <div className="glass-card p-6">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground">
                  Mon - Sat: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 relative">
                <div className="hud-corner hud-corner-tl -top-1 -left-1" />
                <div className="hud-corner hud-corner-tr -top-1 -right-1" />
                <div className="hud-corner hud-corner-bl -bottom-1 -left-1" />
                <div className="hud-corner hud-corner-br -bottom-1 -right-1" />

                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                  Send us a message
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Service Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="investment">Investment Solutions</option>
                      <option value="software">Software Development</option>
                      <option value="social-media">Social Media Marketing</option>
                      <option value="digital">Digital Solutions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-muted-foreground mb-2">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="neon" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Check, text: 'Fast Response' },
                  { icon: Check, text: 'Free Consultation' },
                  { icon: Check, text: 'Expert Team' },
                ].map((feature, index) => (
                  <div key={index} className="glass-card p-4 flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
