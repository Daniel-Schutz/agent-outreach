'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-center mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 text-center">
                Last Updated: April 4, 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2>1. Introduction</h2>
                <p>
                  At Autonomi, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
                </p>

                <h2>2. Information We Collect</h2>
                <p>
                  We collect information in the following ways:
                </p>

                <h3>2.1. Information You Provide to Us</h3>
                <p>
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul>
                  <li>Register for an account</li>
                  <li>Contact us about our services</li>
                  <li>Complete forms on our website</li>
                  <li>Request a demo or consultation</li>
                  <li>Provide information for custom solutions</li>
                </ul>
                <p>
                  This information may include your name, email address, phone number, billing information, and business details.
                </p>

                <h3>2.2. Information We Collect Automatically</h3>
                <p>
                  When you visit our website or use our services, we automatically collect certain information about your device and usage. This information includes:
                </p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Time zone setting</li>
                  <li>Pages viewed and how you navigate our website</li>
                  <li>Features you use and the time you spend using them</li>
                </ul>

                <h3>2.3. Information from Third Parties</h3>
                <p>
                  We may receive information about you from third parties such as business partners, service providers, and analytics providers. This may include information about your usage of other websites or services.
                </p>

                <h2>3. How We Use Your Information</h2>
                <p>
                  We use the information we collect for various purposes, including:
                </p>
                <ul>
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing your requests and managing your account</li>
                  <li>Sending you service-related notifications</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Sending you marketing communications (if you have opted in)</li>
                  <li>Developing custom AI solutions for your business needs</li>
                  <li>Protecting against unauthorized access and fraud</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2>4. How We Share Your Information</h2>
                <p>
                  We may share your personal information with:
                </p>
                <ul>
                  <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as payment processing, data analysis, email delivery, and customer service.</li>
                  <li><strong>Business Partners:</strong> Companies with whom we partner to offer joint services or promotions.</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process, to protect our rights, or to protect the safety of our users.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties.
                </p>

                <h2>5. Cookies and Similar Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to collect and use information about you and your device. Cookies are small data files placed on your device that help us improve our services and your experience.
                </p>
                <p>
                  You can control cookies through your browser settings. Please note that if you disable cookies, some features of our website may not function properly.
                </p>

                <h2>6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Despite our efforts, no security system is impenetrable, and we cannot guarantee the security of your information.
                </p>

                <h2>7. Your Privacy Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </p>
                <ul>
                  <li>Right to access the personal information we hold about you</li>
                  <li>Right to rectification of inaccurate information</li>
                  <li>Right to erasure of your personal information</li>
                  <li>Right to restrict or object to processing of your information</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided at the end of this policy.
                </p>

                <h2>8. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from children. If we learn that we have collected personal information from a child, we will delete it promptly.
                </p>

                <h2>9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We will take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
                </p>

                <h2>10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p>
                  Email: <a href="mailto:issac@getautonomi.com">issac@getautonomi.com</a><br />
                  Address: 1220 3rd St NE, Suite 1213, Washington, DC 20002, United States
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 