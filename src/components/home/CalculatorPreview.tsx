import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CalculatorPreview = () => {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const profitRate = 2.5; // 2.5% monthly

  const monthlyProfit = (amount * profitRate) / 100;
  const totalProfit = monthlyProfit * months;
  const totalReturn = amount + totalProfit;

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Investment Calculator</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-foreground">Calculate Your </span>
              <span className="gradient-text">Returns</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our real-time profit calculator to see potential returns on your investment. 
              Transparent rates, secure deposits, and guaranteed growth.
            </p>

            <div className="space-y-6">
              {[
                { icon: DollarSign, text: 'Competitive profit rates up to 2.5% monthly' },
                { icon: Calendar, text: 'Flexible investment periods from 3 to 36 months' },
                { icon: TrendingUp, text: 'Daily profit accumulation with monthly payouts' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/calculator">
                <Button variant="neon" size="lg">
                  Open Full Calculator
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 relative">
              {/* HUD corners */}
              <div className="hud-corner hud-corner-tl -top-1 -left-1" />
              <div className="hud-corner hud-corner-tr -top-1 -right-1" />
              <div className="hud-corner hud-corner-bl -bottom-1 -left-1" />
              <div className="hud-corner hud-corner-br -bottom-1 -right-1" />

              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                Profit Calculator
              </h3>

              {/* Deposit Amount */}
              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Deposit Amount (PKR)
                </label>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="text-2xl font-display font-bold neon-text mt-2">
                  PKR {amount.toLocaleString()}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <label className="block text-sm text-muted-foreground mb-2">
                  Investment Duration (Months)
                </label>
                <input
                  type="range"
                  min="3"
                  max="36"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="text-2xl font-display font-bold neon-text-aqua mt-2">
                  {months} Months
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <div className="text-sm text-muted-foreground mb-1">Monthly Profit</div>
                  <div className="text-xl font-heading font-bold text-secondary">
                    PKR {monthlyProfit.toLocaleString()}
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Profit</div>
                  <div className="text-xl font-heading font-bold text-primary">
                    PKR {totalProfit.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 glass-card p-6 bg-primary/5 border-primary/30">
                <div className="text-sm text-muted-foreground mb-1">Total Return at Maturity</div>
                <div className="text-3xl font-display font-bold gradient-text">
                  PKR {totalReturn.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
