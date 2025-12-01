import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Calculator,
  FileText,
  Users,
  ChevronRight,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const investmentPlans = [
  {
    name: 'Starter Plan',
    minDeposit: '10,000',
    maxDeposit: '100,000',
    rate: '1.5%',
    duration: '3-6 months',
    features: ['Daily profit accrual', 'Monthly withdrawals', 'Basic dashboard', 'Email support'],
    popular: false,
  },
  {
    name: 'Growth Plan',
    minDeposit: '100,000',
    maxDeposit: '500,000',
    rate: '2.0%',
    duration: '6-12 months',
    features: ['Daily profit accrual', 'Weekly withdrawals', 'Advanced analytics', 'Priority support', 'Referral bonus'],
    popular: true,
  },
  {
    name: 'Premium Plan',
    minDeposit: '500,000',
    maxDeposit: '5,000,000',
    rate: '2.5%',
    duration: '12-24 months',
    features: ['Daily profit accrual', 'Anytime withdrawals', 'Full dashboard', 'Dedicated manager', 'Exclusive events'],
    popular: false,
  },
  {
    name: 'Enterprise Plan',
    minDeposit: '5,000,000',
    maxDeposit: '50,000,000+',
    rate: '3.0%',
    duration: '24-36 months',
    features: ['Real-time profits', 'Instant withdrawals', 'Custom solutions', 'VIP manager', 'Board meetings'],
    popular: false,
  },
];

const Investment = () => {
  const [activeTab, setActiveTab] = useState('plans');

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
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Investment Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Grow Your </span>
              <span className="gradient-text">Wealth</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Secure fixed deposit plans with competitive returns. Transparent rates, 
              real-time tracking, and guaranteed profits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/calculator">
                <Button variant="neon" size="lg">
                  <Calculator className="w-5 h-5" />
                  Calculate Returns
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="cyber" size="lg">
                  Start Investing
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Secure Deposits', desc: 'Bank-grade security and insurance for all investments' },
              { icon: Clock, title: 'Real-time Tracking', desc: 'Monitor your profits daily with live dashboards' },
              { icon: Users, title: 'Expert Management', desc: 'Professional fund managers handling your portfolio' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Investment Plans */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-foreground">Investment </span>
              <span className="gradient-text">Plans</span>
            </h2>
            <p className="text-muted-foreground">Choose the plan that fits your financial goals</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-6 ${plan.popular ? 'border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="text-4xl font-display font-bold gradient-text mb-1">{plan.rate}</div>
                <div className="text-sm text-muted-foreground mb-4">Monthly Return</div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Min: </span>
                    <span className="text-foreground font-medium">PKR {plan.minDeposit}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Max: </span>
                    <span className="text-foreground font-medium">PKR {plan.maxDeposit}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Duration: </span>
                    <span className="text-foreground font-medium">{plan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button variant={plan.popular ? "neon" : "outline"} className="w-full">
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto px-4">
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
              { step: '01', title: 'Register', desc: 'Create your account and complete KYC verification' },
              { step: '02', title: 'Choose Plan', desc: 'Select an investment plan that suits your goals' },
              { step: '03', title: 'Deposit', desc: 'Make your initial deposit via bank transfer' },
              { step: '04', title: 'Earn', desc: 'Watch your profits grow daily in your dashboard' },
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
      </main>

      <Footer />
    </div>
  );
};

export default Investment;
