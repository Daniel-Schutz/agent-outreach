'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Calendar, 
  BarChart, 
  Users, 
  Bot, 
  Zap, 
  Globe, 
  Layers, 
  Shield, 
  Check,
  MessageSquare,
  Database,
  LineChart,
  Settings,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function FeaturesPage() {
  // Main feature categories with their sub-features
  const featureCategories = [
    {
      title: "Smart Email Campaigns",
      icon: <Mail size={24} className="text-primary" />,
      description: "Create and manage personalized email sequences that resonate with your recipients",
      features: [
        "AI-powered personalization at scale",
        "Drag-and-drop campaign builder",
        "Smart scheduling based on recipient behavior",
        "Dynamic content insertion",
        "A/B testing capabilities"
      ]
    },
    {
      title: "Advanced Analytics",
      icon: <BarChart size={24} className="text-primary" />,
      description: "Track performance metrics and gain actionable insights to improve your outreach",
      features: [
        "Real-time open and click tracking",
        "Conversion funnels and attribution",
        "Campaign comparison tools",
        "Custom report builder",
        "Export capabilities for deeper analysis"
      ]
    },
    {
      title: "AI Assistant",
      icon: <Bot size={24} className="text-primary" />,
      description: "Let AI help you craft the perfect messages and optimize your outreach strategy",
      features: [
        "AI-driven email writing suggestions",
        "Response predictions",
        "Sentiment analysis of replies",
        "Subject line optimization",
        "Content improvement recommendations"
      ]
    },
    {
      title: "Team Collaboration",
      icon: <Users size={24} className="text-primary" />,
      description: "Work seamlessly with your team to create and manage outreach campaigns",
      features: [
        "Role-based permissions",
        "Team performance analytics",
        "Shared templates library",
        "Approval workflows",
        "Activity logs and audit trails"
      ]
    }
  ];

  // Additional features in a different format
  const additionalFeatures = [
    {
      title: "Automation Workflows",
      icon: <Zap size={20} />,
      description: "Create complex automation rules based on recipient behavior and campaign performance"
    },
    {
      title: "CRM Integration",
      icon: <Database size={20} />,
      description: "Seamlessly connect with popular CRM platforms like Salesforce, HubSpot, and Pipedrive"
    },
    {
      title: "Multi-Channel Support",
      icon: <Globe size={20} />,
      description: "Extend your outreach beyond email with SMS, social, and direct mail integration"
    },
    {
      title: "Template Library",
      icon: <Layers size={20} />,
      description: "Access a vast library of proven templates for various industries and use cases"
    },
    {
      title: "Advanced Security",
      icon: <Shield size={20} />,
      description: "Enterprise-grade security with SOC 2 compliance, data encryption, and 2FA"
    },
    {
      title: "API Access",
      icon: <Settings size={20} />,
      description: "Build custom integrations with our comprehensive API and developer tools"
    },
    {
      title: "Live Chat Support",
      icon: <MessageSquare size={20} />,
      description: "Get help when you need it with our responsive support team available via chat"
    },
    {
      title: "Performance Insights",
      icon: <LineChart size={20} />,
      description: "Receive AI-powered recommendations to improve your campaign performance"
    }
  ];

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
                Powerful Features for <span className="text-primary">Effective Outreach</span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8">
                Our comprehensive suite of tools helps you connect with your prospects, nurture relationships, and drive conversions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="btn-primary py-3 px-6"
                >
                  View Pricing
                </Link>
                <Link
                  href="/demo"
                  className="btn-outline py-3 px-6"
                >
                  Request a Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need for Successful Outreach
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Outreach Agent combines powerful automation with personalization to help you connect with prospects in a meaningful way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featureCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex-center mr-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-300 mb-6">{category.description}</p>
                  
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                More Powerful Features
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Explore the additional capabilities that make Outreach Agent the complete solution for your outreach needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(0.8, index * 0.05) }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Seamless Integrations
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Connect Outreach Agent with your favorite tools and platforms for a smooth workflow.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="flex-center aspect-square bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  viewport={{ once: true }}
                >
                  <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/integrations" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                View all integrations
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
                Ready to Transform Your Outreach Strategy?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of successful businesses that use Outreach Agent to connect with their prospects and grow their business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/" 
                  className="bg-white text-primary hover:bg-zinc-100 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-primary/20 hover:bg-primary/30 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-white/20"
                >
                  Request a Demo
                </Link>
              </div>
              <div className="mt-6 text-white/80 text-sm">
                <div className="flex items-center justify-center">
                  <PhoneCall size={16} className="mr-2" />
                  <span>Want to talk to sales? Call us at +1 (555) 123-4567</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}