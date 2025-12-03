import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MS Technologies And Digital Solutions Pvt Ltd</title>
        <meta name="description" content="Read our privacy policy to understand how MS Technologies And Digital Solutions Pvt Ltd collects, uses, and protects your personal information." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto prose prose-invert"
          >
            <h1 className="text-4xl font-display font-bold text-foreground mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-6">Last updated: December 3, 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to MS Technologies And Digital Solutions Pvt Ltd ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Register for an account</li>
                <li>Make a purchase or booking</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in promotions or surveys</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                This information may include: name, email address, phone number, billing address, payment information, and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Process and fulfill your orders and service requests</li>
                <li>Send you important updates about your account and services</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for secure transactions</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground">
                <strong>MS Technologies And Digital Solutions Pvt Ltd</strong><br />
                Owner: Malaak Saab<br />
                Email: support@mstechnologies.company<br />
                Phone: +923259479471<br />
                Address: Totanobandi, Pakistan (34.856030, 72.219945)
              </p>
            </section>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;