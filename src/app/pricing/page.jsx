'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('yearly'); // 'monthly' or 'yearly'

  // FAQ items
  const faqItems = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing period. When downgrading, the new rate will apply to your next billing cycle."
    },
    {
      question: "Do you offer any discounts?",
      answer: "We offer a 20% discount for annual billing. We also have special pricing for startups, non-profits, and educational institutions. Contact our sales team to learn more."
    },
    {
      question: "How do you count contacts?",
      answer: "Contacts are counted as unique email addresses in your account. If you have the same contact in multiple campaigns, they are only counted once toward your plan limit."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "If you exceed your contact or campaign limits, we'll notify you and provide options to upgrade your plan. We won't suddenly cut off your service or charge you without warning."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel, your plan will remain active until the end of your current billing period."
    }
  ];

  // Pricing plans
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small teams getting started with outreach",
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        { name: "5,000 contacts", included: true },
        { name: "5 active campaigns", included: true },
        { name: "Email templates", included: true },
        { name: "Basic analytics", included: true },
        { name: "Email support", included: true },
        { name: "API access", included: false },
        { name: "Custom branding", included: false },
        { name: "Team collaboration", included: false },
        { name: "Advanced automations", included: false },
        { name: "Dedicated success manager", included: false },
      ],
      ctaText: "Start Free Trial",
      ctaLink: "/signup/starter",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing teams that need more advanced features and higher limits",
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        { name: "25,000 contacts", included: true },
        { name: "20 active campaigns", included: true },
        { name: "Email templates", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "API access", included: true },
        { name: "Custom branding", included: true },
        { name: "Team collaboration", included: true },
        { name: "Advanced automations", included: false },
        { name: "Dedicated success manager", included: false },
      ],
      ctaText: "Start Free Trial",
      ctaLink: "/signup/professional",
      popular: true
    },
    {
      name: "Business",
      description: "For larger organizations that need advanced features and higher limits",
      monthlyPrice: 249,
      yearlyPrice: 199,
      features: [
        { name: "100,000 contacts", included: true },
        { name: "Unlimited campaigns", included: true },
        { name: "Email templates", included: true },
        { name: "Custom analytics dashboard", included: true },
        { name: "Priority phone, email & chat support", included: true },
        { name: "API access", included: true },
        { name: "Custom branding", included: true },
        { name: "Team collaboration", included: true },
        { name: "Advanced automations", included: true },
        { name: "Dedicated success manager", included: true },
      ],
      ctaText: "Start Free Trial",
      ctaLink: "/signup/business",
      popular: false
    }
  ];

  // Special plan for agencies
  const agencyPlan = {
    name: "Agency",
    description: "For marketing agencies managing multiple client accounts",
    features: [
      "White-label client portal",
      "Multi-account management",
      "Client billing integration",
      "Team roles and permissions",
      "Dedicated account manager",
      "Unlimited campaigns",
      "Priority support"
    ],
    ctaText: "Contact Sales",
    ctaLink: "/contact-sales",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8">
                Choose the plan that's right for you and start connecting with your prospects today.
              </p>

              {/* Billing toggle */}
              <div className="flex justify-center items-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    billingPeriod === 'yearly' ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                  role="switch"
                  aria-checked={billingPeriod === 'yearly'}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      billingPeriod === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`flex items-center text-sm font-medium ${billingPeriod === 'yearly' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  Yearly 
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Save 20%
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-10 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`bg-white dark:bg-zinc-800 rounded-xl shadow-sm border ${
                    plan.popular 
                      ? 'border-primary relative z-10 md:scale-110 shadow-md' 
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                      <div className="inline-block bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-2 min-h-12">{plan.description}</p>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-extrabold">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                          /month
                        </span>
                      </div>
                      {billingPeriod === 'yearly' && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Billed annually (${plan.yearlyPrice * 12}/year)
                        </p>
                      )}
                    </div>

                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          )}
                          <span className={`ml-3 ${feature.included ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-500 dark:text-zinc-500'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        href={plan.ctaLink}
                        className={`block w-full py-3 px-4 rounded-lg text-center font-medium ${
                          plan.popular
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600'
                        } transition-colors`}
                      >
                        {plan.ctaText}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Agency Plan */}
            <motion.div
              className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="md:flex items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">{agencyPlan.name} Plan</h3>
                  <p className="text-white/80 mb-4 md:mb-0">{agencyPlan.description}</p>
                </div>
                <Link
                  href={agencyPlan.ctaLink}
                  className="block md:inline-block py-3 px-6 bg-white text-blue-600 rounded-lg font-medium hover:bg-zinc-100 transition-colors"
                >
                  {agencyPlan.ctaText}
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agencyPlan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <span className="ml-3 text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Enterprise Solution</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                Need a custom solution for your organization? We offer enterprise plans with custom features, 
                dedicated support, and tailored onboarding.
              </p>
              <Link
                href="/enterprise"
                className="inline-block py-3 px-6 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg font-medium hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">{item.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Still have questions?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Contact our support team
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Start your 14-day free trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/" 
                  className="bg-white text-primary hover:bg-zinc-100 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-primary/20 hover:bg-primary/30 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-white/20"
                >
                  Schedule a Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}