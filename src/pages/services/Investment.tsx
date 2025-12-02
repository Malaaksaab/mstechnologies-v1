import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Clock, Calculator, Users, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInvestmentPlans, InvestmentPlan } from '@/hooks/useInvestmentPlans';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { useCreateBooking } from '@/hooks/useServiceBooking';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Investment = () => {
  const { data: plans, isLoading } = useInvestmentPlans();
  const { user } = useAuth();
  const createBooking = useCreateBooking();
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const formatCurrency = (n: number) => new Intl.NumberFormat('en-PK').format(n);

  const handleInvest = (plan: InvestmentPlan) => {
    if (!user) {
      toast.error('Please sign in to invest');
      return;
    }
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = async (paymentMethod: string, transactionId: string) => {
    if (!selectedPlan || !user) return;
    
    try {
      await createBooking.mutateAsync({
        service_id: null,
        customer_name: user.email?.split('@')[0] || 'Customer',
        customer_email: user.email || '',
        project_details: `Investment Plan: ${selectedPlan.name} | Payment Method: ${paymentMethod} | Transaction ID: ${transactionId} | Amount: PKR ${formatCurrency(selectedPlan.min_deposit)}`,
        budget_range: `PKR ${formatCurrency(selectedPlan.min_deposit)} - ${formatCurrency(selectedPlan.max_deposit)}`,
      });
      toast.success('Investment submitted! We will verify your payment shortly.');
    } catch (error) {
      toast.error('Failed to submit investment. Please contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Investment Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6"><span className="text-foreground">Grow Your </span><span className="gradient-text">Wealth</span></h1>
            <p className="text-xl text-muted-foreground mb-8">Secure fixed deposit plans with competitive returns and guaranteed profits.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/calculator"><Button variant="neon" size="lg"><Calculator className="w-5 h-5" />Calculate Returns</Button></Link>
              <Link to="/contact"><Button variant="cyber" size="lg">Start Investing</Button></Link>
            </div>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-4 gap-6">
            {[{ icon: Shield, title: '100% Capital Protection' }, { icon: TrendingUp, title: 'Guaranteed Profits' }, { icon: Clock, title: '24/7 Support' }, { icon: Users, title: 'Expert Management' }].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><f.icon className="w-7 h-7 text-primary" /></div>
                <h3 className="text-lg font-heading font-semibold text-foreground">{f.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12"><span className="text-foreground">Investment </span><span className="gradient-text">Plans</span></h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans?.map((plan, i) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative glass-card p-6 ${plan.is_popular ? 'border-primary' : ''}`}>
                  {plan.is_popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Most Popular</div>}
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-4xl font-display font-bold gradient-text mb-1">{plan.profit_rate}%</div>
                  <div className="text-sm text-muted-foreground mb-4">Monthly Return</div>
                  <div className="space-y-2 mb-6">
                    <div className="text-sm"><span className="text-muted-foreground">Min: </span><span className="text-foreground font-medium">PKR {formatCurrency(plan.min_deposit)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Max: </span><span className="text-foreground font-medium">PKR {formatCurrency(plan.max_deposit)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Duration: </span><span className="text-foreground font-medium">{plan.duration_months} months</span></div>
                  </div>
                  <ul className="space-y-2 mb-6">{plan.features.slice(0, 5).map((f) => <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-primary flex-shrink-0" />{f}</li>)}</ul>
                  <Button 
                    variant={plan.is_popular ? "neon" : "outline"} 
                    className="w-full"
                    onClick={() => handleInvest(plan)}
                  >
                    Invest Now<ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          amount={selectedPlan.min_deposit}
          serviceName={`${selectedPlan.name} Investment Plan`}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default Investment;
