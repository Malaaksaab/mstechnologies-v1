import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | MS Technologies And Digital Solutions Pvt Ltd</title>
        <meta name="description" content="Learn about how MS Technologies And Digital Solutions Pvt Ltd uses cookies and similar technologies to improve your browsing experience." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto prose prose-invert"
          >
            <h1 className="text-4xl font-display font-bold text-foreground mb-8">Cookie Policy</h1>
            <p className="text-muted-foreground mb-6">Last updated: December 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">Performance Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website's performance and user experience.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">Functional Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">Marketing Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Cookies</h2>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>To remember your preferences and settings</li>
                <li>To keep you signed in to your account</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To improve our services and user experience</li>
                <li>To deliver relevant content and advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings menu</li>
                <li><strong>Delete Cookies:</strong> You can delete cookies that have already been stored on your device</li>
                <li><strong>Private Browsing:</strong> Use private or incognito mode to prevent cookies from being stored</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Please note that disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services that set cookies on our behalf, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Analytics services for website performance tracking</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Updates to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us at:<br />
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

export default CookiePolicy;