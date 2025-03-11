'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BusinessSignupForm from '@/components/auth/BusinessSignupForm';
import { useAuth } from '@/context/AuthContext';

export default function BusinessSignupPage() {
  const { email } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If no email is present in context, redirect to home page
    if (!email) {
      router.push('/');
    }
  }, [email, router]);

  // Don't render the page content if email is not available
  if (!email) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="min-h-screen flex flex-center dark:bg-neutral-900">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Join <span className="text-primary">Instantly Relevant</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Create your business account to find the perfect marketing agency
            </p>
          </div>

          <div className="w-full dark:bg-neutral-800 rounded-lg sm:rounded-xl">
            <BusinessSignupForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
