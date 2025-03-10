// src/app/page.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroForm from '@/components/HeroForm';

export default function Home() {
  const [email, setEmail] = useState('');

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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
              Find Your{' '}
              <span className="text-primary">Perfect Marketing Agency</span>{' '}
              Match Instantly
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8">
              Connect with verified marketing agencies tailored to your specific
              needs, budget, and industry. No more guesswork, just results.
            </p>

            <HeroForm />

            <div className="mt-8 flex items-center text-sm text-neutral-500">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
