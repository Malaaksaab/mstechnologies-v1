import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock, DollarSign, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateBooking, BookingFormData } from '@/hooks/useServiceBooking';
import { toast } from 'sonner';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    description: string;
    features: string[];
    min_price?: number | null;
    max_price?: number | null;
    price_unit?: string | null;
    delivery_time?: string | null;
    supported_devices?: string[];
  } | null;
  serviceType: 'software' | 'social_media' | 'digital';
}

export const ServiceDetailModal = ({ isOpen, onClose, service, serviceType }: ServiceDetailModalProps) => {
  const [step, setStep] = useState<'details' | 'booking'>('details');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    company_name: '',
    project_details: '',
    budget_range: '',
    timeline: '',
    quantity: 1
  });

  const createBooking = useCreateBooking();

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    const bookingData: BookingFormData = {
      service_id: service.id,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone || undefined,
      company_name: formData.company_name || undefined,
      project_details: `${formData.project_details}\n\nSelected Features: ${selectedFeatures.join(', ') || 'All features'}\nQuantity: ${formData.quantity}`,
      budget_range: formData.budget_range || undefined,
      timeline: formData.timeline || undefined
    };

    createBooking.mutate(bookingData, {
      onSuccess: (ticketId) => {
        toast.success(`Booking submitted! Ticket ID: ${ticketId}`);
        onClose();
        setStep('details');
        setSelectedFeatures([]);
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          company_name: '',
          project_details: '',
          budget_range: '',
          timeline: '',
          quantity: 1
        });
      },
      onError: (error) => {
        toast.error('Failed to submit booking. Please try again.');
      }
    });
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display gradient-text">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        {step === 'details' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Price Range */}
            {(service.min_price || service.max_price) && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  ${service.min_price} - ${service.max_price}
                </span>
                {service.price_unit && (
                  <span className="text-muted-foreground">({service.price_unit})</span>
                )}
              </div>
            )}

            {/* Delivery Time */}
            {service.delivery_time && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Delivery: {service.delivery_time}</span>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>

            {/* Supported Devices */}
            {service.supported_devices && service.supported_devices.length > 0 && (
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Supported Devices</h3>
                <div className="flex flex-wrap gap-2">
                  {service.supported_devices.map((device) => (
                    <span key={device} className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground">
                      {device}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features Selection */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                Features Included
              </h3>
              <div className="grid gap-2">
                {service.features.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-lg glass-card hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              variant="neon"
              size="lg"
              className="w-full"
              onClick={() => setStep('booking')}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Now
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStep('details')}
              className="mb-4"
            >
              ← Back to Details
            </Button>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Full Name *</label>
                <Input
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email *</label>
                <Input
                  name="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Phone</label>
                <Input
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Company</label>
                <Input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            {serviceType === 'social_media' && (
              <div>
                <label className="text-sm text-muted-foreground">Quantity</label>
                <Input
                  name="quantity"
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-muted-foreground">Budget Range</label>
              <Input
                name="budget_range"
                value={formData.budget_range}
                onChange={handleInputChange}
                placeholder="e.g., $100 - $500"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Timeline</label>
              <Input
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="e.g., ASAP, 1 week, etc."
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Project Details *</label>
              <Textarea
                name="project_details"
                value={formData.project_details}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Please describe your requirements..."
                className="mt-1"
              />
            </div>

            {selectedFeatures.length > 0 && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Selected Features:</p>
                <p className="text-foreground">{selectedFeatures.join(', ')}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="neon"
              size="lg"
              className="w-full"
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Order'
              )}
            </Button>
          </motion.form>
        )}
      </DialogContent>
    </Dialog>
  );
};
