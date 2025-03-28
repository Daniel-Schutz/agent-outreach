'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroForm from '@/components/auth/HeroForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle, BarChart, Mail, Clock, Users } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const features = [
    {
      icon: <Mail size={24} className="text-primary" />,
      title: "Smart Email Campaigns",
      description: "Automate personalized email sequences that feel human and drive engagement with your prospects."
    },
    {
      icon: <Clock size={24} className="text-primary" />,
      title: "Optimal Timing",
      description: "AI-powered algorithms send your emails at the perfect time to maximize open rates and responses."
    },
    {
      icon: <BarChart size={24} className="text-primary" />,
      title: "Advanced Analytics",
      description: "Track performance with detailed metrics and A/B testing to continuously improve your campaigns."
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team to create, approve, and manage outreach campaigns."
    },
  ];

  const testimonials = [
    {
      quote: "Outreach Agent has transformed our prospecting process. We've seen a 40% increase in response rates since implementing it.",
      author: "Sarah Johnson",
      position: "Director of Sales, TechFlow Inc."
    },
    {
      quote: "The AI-powered timing feature is a game-changer. Our emails now consistently get opened and we're booking more meetings than ever.",
      author: "Michael Chen",
      position: "Growth Lead, Startup Boost"
    },
    {
      quote: "Setting up personalized campaigns used to take days. With Outreach Agent, we can launch highly targeted campaigns in hours.",
      author: "Jessica Williams",
      position: "Marketing Manager, Scale Solutions"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-zinc-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] dark:stroke-zinc-700/40" aria-hidden="true">
              <defs>
                <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Left Content */}
              <motion.div 
                className="flex-1 max-w-2xl" 
                variants={itemVariants}
              >
                <span className="inline-block text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-6">
                  Introducing Outreach Agent
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Automate Your <span className="text-primary">Outreach</span> Without Losing the <span className="text-primary">Human Touch</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                  Build relationships at scale with AI-powered email campaigns that feel personal and drive results. Connect with your prospects when they're most likely to engage.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="/" 
                    className="btn-primary py-3 px-6"
                  >
                    Get Started Free
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link 
                    href="/demo" 
                    className="btn-outline py-3 px-6"
                  >
                    Request a Demo
                  </Link>
                </div>

                <div className="flex items-center gap-8 text-sm">
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Form */}
              <motion.div 
                className="w-full max-w-md bg-white dark:bg-zinc-800/60 backdrop-blur-sm rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-700"
                variants={itemVariants}
              >
                <HeroForm />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 border-t border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                Trusted by 3,000+ companies worldwide
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 opacity-70">
              {/* Logos would go here - using placeholders */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need for Effective Outreach
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Our platform combines powerful automation with personalization to help you connect with prospects in a meaningful way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="card card-hover p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="w-12 h-12 flex-center rounded-lg bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Join thousands of businesses that use Outreach Agent to connect with their prospects and grow their business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="card card-hover p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                  </svg>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-300">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
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
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}