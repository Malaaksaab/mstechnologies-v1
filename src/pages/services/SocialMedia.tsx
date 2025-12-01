import { motion } from 'framer-motion';
import { 
  Share2, 
  Youtube, 
  Instagram, 
  Facebook,
  Twitter,
  Linkedin,
  TrendingUp,
  Users,
  Eye,
  Heart,
  ArrowRight,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const smmServices = [
  {
    icon: Youtube,
    title: 'YouTube Services',
    color: 'from-red-500 to-red-600',
    services: [
      { name: 'YouTube Views', price: 'From $5/1K', desc: 'Real human views with high retention' },
      { name: 'Subscribers', price: 'From $15/1K', desc: 'Genuine subscribers with activity' },
      { name: 'Watch Hours', price: 'From $20/1K', desc: 'For monetization eligibility' },
      { name: 'Likes & Comments', price: 'From $3/1K', desc: 'Boost engagement metrics' },
    ],
  },
  {
    icon: Instagram,
    title: 'Instagram Growth',
    color: 'from-pink-500 to-purple-600',
    services: [
      { name: 'Followers', price: 'From $8/1K', desc: 'Country-targeted real followers' },
      { name: 'Likes', price: 'From $2/1K', desc: 'Fast delivery on posts' },
      { name: 'Reels Views', price: 'From $3/1K', desc: 'Boost reel visibility' },
      { name: 'Story Views', price: 'From $1/1K', desc: 'Increase story reach' },
    ],
  },
  {
    icon: Facebook,
    title: 'Facebook Marketing',
    color: 'from-blue-500 to-blue-600',
    services: [
      { name: 'Page Likes', price: 'From $10/1K', desc: 'Build page authority' },
      { name: 'Post Engagement', price: 'From $5/1K', desc: 'Likes, comments, shares' },
      { name: 'Group Members', price: 'From $15/1K', desc: 'Targeted group growth' },
      { name: 'Video Views', price: 'From $4/1K', desc: 'Increase video reach' },
    ],
  },
  {
    icon: Twitter,
    title: 'Twitter/X Services',
    color: 'from-sky-400 to-sky-500',
    services: [
      { name: 'Followers', price: 'From $12/1K', desc: 'Quality Twitter followers' },
      { name: 'Retweets', price: 'From $5/1K', desc: 'Amplify your reach' },
      { name: 'Likes', price: 'From $3/1K', desc: 'Boost tweet engagement' },
      { name: 'Views', price: 'From $2/1K', desc: 'Tweet impression boost' },
    ],
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Optimization',
    color: 'from-blue-600 to-blue-700',
    services: [
      { name: 'Connections', price: 'From $20/500', desc: 'Industry professionals' },
      { name: 'Post Likes', price: 'From $10/500', desc: 'Professional engagement' },
      { name: 'Profile Views', price: 'From $15/1K', desc: 'Increase visibility' },
      { name: 'Company Followers', price: 'From $25/1K', desc: 'Build company presence' },
    ],
  },
];

const SocialMedia = () => {
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
              <Share2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Social Media Marketing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Amplify Your </span>
              <span className="gradient-text">Social Presence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive SMM services to grow your audience, increase engagement, 
              and build your brand across all major platforms.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="neon" size="lg">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '10M+', label: 'Followers Delivered' },
              { icon: Eye, value: '50M+', label: 'Views Generated' },
              { icon: Heart, value: '25M+', label: 'Engagements' },
              { icon: TrendingUp, value: '5000+', label: 'Campaigns Run' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-display font-bold neon-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services by Platform */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-foreground">Platform </span>
              <span className="gradient-text">Services</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {smmServices.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                    <platform.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground">{platform.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {platform.services.map((service) => (
                    <div key={service.name} className="glass-card p-4 hover:border-primary/50 transition-colors">
                      <div className="font-heading font-semibold text-foreground mb-1">{service.name}</div>
                      <div className="text-primary font-medium mb-2">{service.price}</div>
                      <div className="text-sm text-muted-foreground">{service.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mb-20">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
              <span className="text-foreground">Why Choose </span>
              <span className="gradient-text">Our SMM Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Real Human Engagement', desc: 'No bots. Only genuine users from targeted regions.' },
                { title: 'Fast & Secure Delivery', desc: 'Quick turnaround with gradual, natural growth.' },
                { title: 'Country Targeting', desc: 'Target specific countries and demographics.' },
                { title: 'Refill Guarantee', desc: 'Free refills if followers drop within warranty.' },
                { title: '24/7 Support', desc: 'Round-the-clock customer support for all orders.' },
                { title: 'Competitive Pricing', desc: 'Best rates in the market with bulk discounts.' },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              Ready to Go Viral?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for custom packages and bulk pricing. Let's grow your social presence together.
            </p>
            <Link to="/contact">
              <Button variant="neon" size="xl">
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SocialMedia;
