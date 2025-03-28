'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 bg-zinc-50 dark:bg-zinc-900 mt-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Left side form */}
            <div className="flex-1 max-w-lg mx-auto lg:mx-0">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Home
              </Link>

              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                  Welcome <span className="text-primary">Back</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-300">
                  Log in to your account to continue your outreach journey
                </p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center sm:text-left">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Don't have an account yet?{' '}
                  <Link
                    href="/"
                    className="text-primary hover:underline"
                  >
                    Start here
                  </Link>
                </p>
              </div>
            </div>

            {/* Right side content */}
            <motion.div
              className="hidden lg:flex flex-1 flex-col bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  Benefits of Outreach Agent
                </h2>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Unlock these features when you log in to your account
                </p>
              </div>

              <ul className="space-y-4 flex-1">
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                      Automated Follow-up Sequences
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Set up personalized email sequences that run automatically
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                      Performance Analytics
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Track open rates, click-through rates, and response metrics
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                      CRM Integration
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Connect with your existing CRM to sync contacts and data
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                      AI-powered Templates
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Generate effective outreach messages with our AI assistant
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {/* User avatars */}
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium border-2 border-white dark:border-zinc-800">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white dark:border-zinc-800">
                      SA
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white dark:border-zinc-800">
                      MP
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      1,000+ professionals
                    </span>{' '}
                    use Outreach Agent daily
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}