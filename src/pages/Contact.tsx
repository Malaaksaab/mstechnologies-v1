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
import { z } from 'zod';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useFormThrottle } from '@/hooks/useFormThrottle';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  service: z.string().max(100, 'Service must be less than 100 characters').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

const Contact = () => {
  const { toast } = useToast();
  const { data: settings } = useSiteSettings();
  const { canSubmit, cooldownRemaining, recordSubmission } = useFormThrottle({
    minInterval: 5000,
    maxSubmissions: 3,
    timeWindow: 300000, // 5 minutes
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    if (!canSubmit) {
      toast({
        title: "Please wait",
        description: `You can submit again in ${Math.ceil(cooldownRemaining / 1000)} seconds.`,
        variant: "destructive",
      });
      return;
    }

    if (!recordSubmission()) {
      toast({
        title: "Too many submissions",
        description: "Please wait a few minutes before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate a unique ticket ID
      const ticketId = `CNT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      // Save to database
      const { error } = await supabase.from('service_bookings').insert([{
        ticket_id: ticketId,
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim(),
        customer_phone: formData.phone?.trim() || null,
        service_type: 'contact',
        project_details: `Service Interest: ${formData.service || 'General Inquiry'}\n\nMessage:\n${formData.message.trim()}`,
        status: 'pending',
      }]);

      if (error) throw error;
      
      toast({
        title: "Message Sent Successfully!",
        description: `Your ticket ID is ${ticketId}. We'll get back to you within 24 hours.`,
      });
      
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | MS Technologies And Digital Solutions Pvt Ltd</title>
        <meta name="description" content="Get in touch with MS Technologies And Digital Solutions. Contact us for software development, digital marketing, investment solutions, and technical support." />
      </Helmet>
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
                  <a href={`mailto:${settings?.company_email || 'info@mstechnologies.company'}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {settings?.company_email || 'info@mstechnologies.company'}
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
                      <label className="block text-sm text-muted-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${errors.name ? 'border-destructive' : 'border-border'} focus:border-primary focus:outline-none transition-colors text-foreground`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-primary focus:outline-none transition-colors text-foreground`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${errors.phone ? 'border-destructive' : 'border-border'} focus:border-primary focus:outline-none transition-colors text-foreground`}
                        placeholder="+92 300 1234567"
                      />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Service Interested In</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      >
                        <option value="">Select a service</option>
                        <option value="Investment Solutions">Investment Solutions</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="Digital Solutions">Digital Solutions</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-muted-foreground mb-2">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${errors.message ? 'border-destructive' : 'border-border'} focus:border-primary focus:outline-none transition-colors text-foreground resize-none`}
                      placeholder="Tell us about your project or inquiry..."
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="neon" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting || !canSubmit}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : !canSubmit ? (
                      <>Wait {Math.ceil(cooldownRemaining / 1000)}s</>
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
    </>
  );
};

export default Contact;