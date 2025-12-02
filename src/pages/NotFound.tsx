import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | MS Technologies</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="text-[150px] md:text-[200px] font-display font-bold gradient-text leading-none">404</div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Search className="w-16 h-16 text-primary/50" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-8"
            >
              Oops! The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Link to="/">
                <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Services', href: '/services/software' },
                  { name: 'Investment', href: '/services/investment' },
                  { name: 'About', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-4 py-2 rounded-lg bg-muted/50 text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
