'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SignupForm from '@/components/auth/SignupForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    
    // If no email in localStorage, redirect to home page
    if (!storedEmail) {
      router.push('/');
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  // Don't render content if email is not available
  if (!email) {
    return null; // Return nothing while redirecting
  }

  const benefits = [
    "AI-powered outreach sequences",
    "Smart scheduling based on recipient behavior",
    "Automated personalized follow-ups",
    "Detailed analytics dashboard",
    "Team collaboration tools",
    "CRM integration"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-7/12 bg-white dark:bg-zinc-800 rounded-xl shadow-md p-8"
            >
              <div className="mb-8">
                <Link href="/" className="inline-block mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent">
                    Outreach Agent
                  </span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                  Create your account
                </h1>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Start using Outreach Agent to improve your sales
                </p>
              </div>

              <SignupForm />
            </motion.div>

            {/* Right column - Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-5/12 lg:sticky lg:top-32"
            >
              <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-8 text-white mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Our plan includes:
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                      <CheckCircle size={18} className="text-white mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 border border-zinc-200 dark:border-zinc-700">
                <h3 className="text-lg font-medium mb-4 text-zinc-900 dark:text-white">
                  What our customers say
                </h3>
                
                <blockquote className="text-zinc-600 dark:text-zinc-300 mb-4">
                  "Outreach Agent has completely transformed our sales process. We've increased our response rates by 35% and cut down on manual follow-ups by 80%."
                </blockquote>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Christine Rodriguez</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Sales Director, TechGrowth Inc.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}