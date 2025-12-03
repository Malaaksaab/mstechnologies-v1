import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle,
  Copy,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  account_details: Record<string, string>;
  instructions: string | null;
  icon_name: string | null;
  is_active: boolean;
  display_order: number | null;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  serviceName: string;
  onPaymentComplete: (paymentMethod: string, transactionId: string) => void;
}

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  serviceName, 
  onPaymentComplete 
}: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [transactionId, setTransactionId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch payment methods from database
  const { data: paymentMethods, isLoading } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data as PaymentMethod[];
    },
    enabled: isOpen
  });

  const selectedPayment = paymentMethods?.find(m => m.id === selectedMethod);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction ID');
      return;
    }
    if (!senderName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPaymentComplete(selectedMethod, transactionId);
    toast.success('Payment submitted for verification!');
    setIsSubmitting(false);
    onClose();
  };

  // Set default payment method when data loads
  if (paymentMethods?.length && !selectedMethod) {
    setSelectedMethod(paymentMethods[0].id);
  }

  if (!isOpen) return null;

  const domesticMethods = paymentMethods?.filter(m => m.type === 'domestic') || [];
  const internationalMethods = paymentMethods?.filter(m => m.type === 'international') || [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">Complete Payment</h2>
              <p className="text-sm text-muted-foreground">{serviceName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Amount */}
            <div className="text-center py-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">PKR {amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">≈ ${(amount / 280).toFixed(2)} USD</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : paymentMethods?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No payment methods available. Please contact support.
              </div>
            ) : (
              <>
                {/* Payment Methods */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Select Payment Method</Label>
                  
                  {/* Domestic */}
                  {domesticMethods.length > 0 && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Pakistani Methods
                      </p>
                      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                          {domesticMethods.map((method) => (
                            <div key={method.id}>
                              <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                              <Label
                                htmlFor={method.id}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedMethod === method.id 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <span className="text-2xl">{method.icon_name === 'jazzcash' ? '🎵' : method.icon_name === 'easypaisa' ? '📱' : '🏦'}</span>
                                <span className="font-medium">{method.name}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </>
                  )}

                  {/* International */}
                  {internationalMethods.length > 0 && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        International Methods
                      </p>
                      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {internationalMethods.map((method) => (
                            <div key={method.id}>
                              <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                              <Label
                                htmlFor={method.id}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedMethod === method.id 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <span className="text-2xl">{method.icon_name === 'paypal' ? '💳' : method.icon_name === 'crypto' ? '₿' : '🌍'}</span>
                                <span className="font-medium">{method.name}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </>
                  )}
                </div>

                {/* Payment Details */}
                {selectedPayment && (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Payment Details</span>
                    </div>
                    
                    {Object.entries(selectedPayment.account_details).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{value}</span>
                          <button onClick={() => copyToClipboard(value)} className="p-1 hover:bg-muted rounded">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {selectedPayment.instructions && (
                      <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                        {selectedPayment.instructions}
                      </p>
                    )}
                  </div>
                )}

                {/* Transaction Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="senderName">Your Name</Label>
                    <Input
                      id="senderName"
                      placeholder="Enter your full name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionId">Transaction ID / Reference</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter transaction ID after payment"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  onClick={handleSubmit} 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting || !selectedMethod}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirm Payment
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your payment will be verified within 24 hours. You'll receive a confirmation email once verified.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
