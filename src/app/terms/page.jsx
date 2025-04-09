'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 text-center">
                Last Updated: April 4, 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
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
                  Welcome to Autonomi. These Terms of Service ("Terms") govern your access to and use of the Autonomi website and services, including any content, functionality, and services offered on or through getautonomi.com (the "Service").
                </p>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to use our Service. By agreeing to these Terms, you represent and warrant that you are at least 18 years of age.
                </p>

                <h2>3. Your Account</h2>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>
                <p>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>

                <h2>4. Subscription and Payment</h2>
                <p>
                  Some features of the Service require a subscription. You agree to pay all fees or charges to your account based on the fees, charges, and billing terms in effect at the time a fee or charge is due and payable.
                </p>
                <p>
                  You are responsible for all charges incurred under your account, including applicable taxes, and all subscriptions purchased by you or anyone you allow to use your account.
                </p>

                <h2>5. Content and Intellectual Property Rights</h2>
                <p>
                  You retain ownership of any intellectual property rights that you hold in the content you create, upload, or post using our Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media.
                </p>
                <p>
                  Autonomi retains all right, title, and interest in and to the Service, including all related intellectual property rights. The Service is protected by copyright, trademark, and other laws. You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material from our Service without prior written consent.
                </p>

                <h2>6. Prohibited Uses</h2>
                <p>
                  You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
                </p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform or participate in any unlawful acts.</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.</li>
                  <li>To submit false or misleading information.</li>
                  <li>To upload or transmit viruses or any other type of malicious code.</li>
                  <li>To interfere with or circumvent the security features of the Service.</li>
                </ul>

                <h2>7. Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
                <p>
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>

                <h2>8. Limitation of Liability</h2>
                <p>
                  In no event shall Autonomi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ol type="a">
                  <li>Your access to or use of or inability to access or use the Service;</li>
                  <li>Any conduct or content of any third party on the Service;</li>
                  <li>Any content obtained from the Service; and</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                </ol>

                <h2>9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States and the District of Columbia, without regard to its conflict of law provisions.
                </p>

                <h2>10. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
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