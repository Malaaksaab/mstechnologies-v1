import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, TrendingUp, Calendar, DollarSign, Shield, Clock, Percent } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  { name: 'Starter', minAmount: 10000, maxAmount: 100000, rate: 1.5, duration: '3-6 months' },
  { name: 'Growth', minAmount: 100000, maxAmount: 500000, rate: 2.0, duration: '6-12 months' },
  { name: 'Premium', minAmount: 500000, maxAmount: 5000000, rate: 2.5, duration: '12-24 months' },
  { name: 'Enterprise', minAmount: 5000000, maxAmount: 50000000, rate: 3.0, duration: '24-36 months' },
];

const Calculator = () => {
  const [amount, setAmount] = useState(500000);
  const [months, setMonths] = useState(12);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  const monthlyProfit = (amount * selectedPlan.rate) / 100;
  const dailyProfit = monthlyProfit / 30;
  const totalProfit = monthlyProfit * months;
  const totalReturn = amount + totalProfit;
  const effectiveRate = ((totalProfit / amount) * 100).toFixed(2);

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
              <CalcIcon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Investment Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-foreground">Calculate Your </span>
              <span className="gradient-text">Investment Returns</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plan your financial future with our transparent profit calculator. 
              Real-time calculations, guaranteed rates, secure investments.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plans Selection */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Select Investment Plan
              </h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedPlan.name === plan.name
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/50 glass-card'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-semibold text-foreground">{plan.name}</span>
                      <span className="text-primary font-bold">{plan.rate}%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PKR {plan.minAmount.toLocaleString()} - {plan.maxAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{plan.duration}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 relative">
                <div className="hud-corner hud-corner-tl -top-1 -left-1" />
                <div className="hud-corner hud-corner-tr -top-1 -right-1" />
                <div className="hud-corner hud-corner-bl -bottom-1 -left-1" />
                <div className="hud-corner hud-corner-br -bottom-1 -right-1" />

                {/* Deposit Amount */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <DollarSign className="w-4 h-4" />
                    Deposit Amount (PKR)
                  </label>
                  <input
                    type="range"
                    min={selectedPlan.minAmount}
                    max={selectedPlan.maxAmount}
                    step="10000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">
                      Min: PKR {selectedPlan.minAmount.toLocaleString()}
                    </span>
                    <div className="text-3xl font-display font-bold neon-text">
                      PKR {amount.toLocaleString()}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Max: PKR {selectedPlan.maxAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    Investment Duration (Months)
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="1"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">3 months</span>
                    <div className="text-3xl font-display font-bold neon-text-aqua">
                      {months} Months
                    </div>
                    <span className="text-sm text-muted-foreground">36 months</span>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                      Daily Profit
                    </div>
                    <div className="text-xl font-heading font-bold text-foreground">
                      PKR {dailyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Monthly Profit
                    </div>
                    <div className="text-xl font-heading font-bold text-secondary">
                      PKR {monthlyProfit.toLocaleString()}
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Percent className="w-3 h-3" />
                      Total Profit
                    </div>
                    <div className="text-xl font-heading font-bold text-primary">
                      PKR {totalProfit.toLocaleString()}
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Percent className="w-3 h-3" />
                      Effective Rate
                    </div>
                    <div className="text-xl font-heading font-bold text-neon-purple">
                      {effectiveRate}%
                    </div>
                  </div>
                </div>

                {/* Total Return */}
                <div className="glass-card p-6 bg-primary/5 border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Return at Maturity</div>
                      <div className="text-4xl font-display font-bold gradient-text">
                        PKR {totalReturn.toLocaleString()}
                      </div>
                    </div>
                    <Link to="/services/investment">
                      <Button variant="neon" size="lg">
                        Start Investing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Shield, text: 'Secure & Insured' },
                  { icon: Clock, text: '24/7 Access' },
                  { icon: TrendingUp, text: 'Guaranteed Returns' },
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

export default Calculator;
