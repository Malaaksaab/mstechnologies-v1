import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | MS Technologies And Digital Solutions Pvt Ltd</title>
        <meta name="description" content="Read our terms of service to understand the rules and regulations governing the use of MS Technologies And Digital Solutions Pvt Ltd services." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto prose prose-invert"
          >
            <h1 className="text-4xl font-display font-bold text-foreground mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-6">Last updated: December 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using the services provided by MS Technologies And Digital Solutions Pvt Ltd ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-4">MS Technologies And Digital Solutions Pvt Ltd provides:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Software Development:</strong> Custom software, web applications, mobile apps, POS systems, and management systems</li>
                <li><strong>Social Media Services:</strong> Account growth, engagement services, and verified account sales</li>
                <li><strong>Digital Solutions:</strong> Device unlocking, FRP removal, Apple ID services, and technical support</li>
                <li><strong>Investment Plans:</strong> Various investment opportunities with competitive returns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Provide accurate and complete information when using our services</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use our services for any fraudulent or illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                All payments are processed securely through our approved payment methods including JazzCash, Easypaisa, bank transfer, and international payment options. Prices are subject to change without notice. Refunds are handled on a case-by-case basis according to our refund policy. For investment services, returns are subject to market conditions and the terms of the specific investment plan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality of our services are owned by MS Technologies And Digital Solutions Pvt Ltd and are protected by international copyright, trademark, and other intellectual property laws. Custom software developed for clients becomes the property of the client upon full payment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, MS Technologies And Digital Solutions Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Service Delivery</h2>
              <p className="text-muted-foreground mb-4">
                Delivery times vary by service. We strive to meet estimated delivery times but cannot guarantee exact completion dates. Clients will receive a unique ticket ID for tracking their orders. Communication regarding service progress will be sent via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to terminate or suspend your access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or website notification. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these Terms shall be resolved in the courts of Pakistan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, contact us at:<br />
                <strong>MS Technologies And Digital Solutions Pvt Ltd</strong><br />
                Owner: Malaak Saab<br />
                Email: info@mstechnologies.company<br />
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

export default TermsOfService;