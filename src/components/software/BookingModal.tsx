import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateBooking, BookingFormData } from '@/hooks/useServiceBooking';
import { SoftwareService } from '@/hooks/useSoftwareServices';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: SoftwareService | null;
}

const budgetOptions = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not sure yet',
];

const timelineOptions = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3-6 months',
  '6+ months',
  'Flexible',
];

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    service_id: service?.id || null,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    company_name: '',
    project_details: '',
    budget_range: '',
    timeline: '',
  });
  const [ticketId, setTicketId] = useState<string | null>(null);

  const createBooking = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_email || !formData.project_details) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await createBooking.mutateAsync({
        ...formData,
        service_id: service?.id || null,
      });
      setTicketId(result.ticket_id);
      toast.success('Booking submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      service_id: null,
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      company_name: '',
      project_details: '',
      budget_range: '',
      timeline: '',
    });
    setTicketId(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-foreground">
                {ticketId ? 'Booking Confirmed!' : 'Book Service'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {ticketId ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-4">
                  Your booking has been submitted successfully.
                </p>
                <div className="glass-card p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Your Ticket ID</p>
                  <p className="text-xl font-mono font-bold text-primary">{ticketId}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Save this ticket ID to track your booking status. We'll contact you within 24 hours.
                </p>
                <Button variant="neon" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {service && (
                  <div className="glass-card p-3 mb-4">
                    <p className="text-sm text-muted-foreground">Selected Service</p>
                    <p className="font-semibold text-foreground">{service.title}</p>
                    {service.price_range && (
                      <p className="text-sm text-primary">{service.price_range}</p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Name *</label>
                    <Input
                      placeholder="Your name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="bg-muted/50 border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="bg-muted/50 border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                    <Input
                      placeholder="+92 300 1234567"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Company</label>
                    <Input
                      placeholder="Company name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Budget Range</label>
                    <Select
                      value={formData.budget_range}
                      onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                    >
                      <SelectTrigger className="bg-muted/50 border-border">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Timeline</label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger className="bg-muted/50 border-border">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Project Details *</label>
                  <Textarea
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                    value={formData.project_details}
                    onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                    className="bg-muted/50 border-border min-h-[120px]"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={handleClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="neon"
                    className="flex-1"
                    disabled={createBooking.isPending}
                  >
                    {createBooking.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Booking
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
